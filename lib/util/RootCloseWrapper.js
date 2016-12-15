import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import addEventListener from 'react-overlays/lib/utils/addEventListener'
import createChainedFunction from 'react-overlays/lib/utils/createChainedFunction'
import ownerDocument from 'react-overlays/lib/utils/ownerDocument'

import safeCloneElement from './safeCloneElement'

const CLICK_WAS_INSIDE = '__click_was_inside'

let counter = 0

function isLeftClickEvent (event) {
  return event.button === 0
}

function isModifiedEvent (event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

function getSuppressRootClose () {
  const id = CLICK_WAS_INSIDE + '_' + counter++
  return {
    id,
    suppressRootClose (event) {
      // Tag the native event to prevent the root close logic on document click.
      // This seems safer than using event.nativeEvent.stopImmediatePropagation(),
      // which is only supported in IE >= 9.
      event.nativeEvent[id] = true // eslint-disable-line no-param-reassign
    }
  }
}

class RootCloseWrapper extends Component {

  static propTypes = {
    onRootClose: PropTypes.func.isRequired,

    /**
     * Passes the suppress click handler directly to the child component instead
     * of placing it on a wrapping div. Only use when you can be sure the child
     * properly handle the click event.
     */
    noWrap: PropTypes.bool,
    children: PropTypes.node
  }

  constructor (props) {
    super(props)

    const { id, suppressRootClose } = getSuppressRootClose()

    this._suppressRootId = id

    this._suppressRootCloseHandler = suppressRootClose
  }

  componentDidMount () {
    const doc = ownerDocument(this)

    this._onDocumentClickListener =
      addEventListener(doc, 'click', this.handleDocumentClick)

    this._onDocumentKeyupListener =
      addEventListener(doc, 'keyup', this.handleDocumentKeyUp)
  }

  componentWillUnmount () {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove()
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove()
    }
  }

  handleDocumentClick = (e) => {
    // This is now the native event.
    if (e[this._suppressRootId]) {
      return
    }

    if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
      return
    }

    this.props.onRootClose(e)
  }

  handleDocumentKeyUp = (e) => {
    if (e.keyCode === 27) {
      this.props.onRootClose(e)
    }
  }

  getWrappedDOMNode () {
    // We can't use a ref to identify the wrapped child, since we might be
    // stealing the ref from the owner, but we know exactly the DOM structure
    // that will be rendered, so we can just do this to get the child's DOM
    // node for doing size calculations in OverlayMixin.
    const node = ReactDOM.findDOMNode(this)
    return this.props.noWrap ? node : node.firstChild
  }

  render () {
    const {
      noWrap,
      children
    } = this.props

    const child = Children.only(children)

    if (noWrap) {
      return safeCloneElement(child, {
        onClick: createChainedFunction(this._suppressRootCloseHandler, child.props.onClick)
      })
    }

    // Wrap the child in a new element, so the child won't have to handle
    // potentially combining multiple onClick listeners.

    /* eslint-disable
      jsx-a11y/onclick-has-role,
      jsx-a11y/onclick-has-focus,
      jsx-a11y/click-events-have-key-events
    */
    return (
      <div onClick={this._suppressRootCloseHandler}>
        {child}
      </div>
    )
    /* eslint-enable
      jsx-a11y/onclick-has-role,
      jsx-a11y/onclick-has-focus,
      jsx-a11y/click-events-have-key-events
    */
  }
}

export default RootCloseWrapper
