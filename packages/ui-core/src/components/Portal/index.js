import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import shallowEqual from '@instructure/ui-utils/lib/shallowEqual'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'

/**
---
category: components/utilities
---
  The `<Portal/>` component allows you to render a subtree into a DOM element.

  ```js_example
  class Example extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        isPortalOpen: false
      }
    }

    handleButtonClick = () => {
      this.setState({
        isPortalOpen: !this.state.isPortalOpen
      })
    };

    render () {
      return (
        <div>
          <Button onClick={this.handleButtonClick}>
            {this.state.isPortalOpen ? 'Close' : 'Open'} the Portal
          </Button>
          <Portal
            mountNode={() => this._mountNode}
            open={this.state.isPortalOpen}
          >
            <ContextBox>
              <p>Greetings from the portal!</p>
            </ContextBox>
          </Portal>
          <Text>
            <p>{lorem.paragraph()}</p>
            <div ref={(c) => this._mountNode = c}></div>
            <p>{lorem.paragraph()}</p>
          </Text>
        </div>
      )
    }
  }

  <Example />
  ```
**/
@deprecated('3.0.0', {
  container: 'mountNode',
  isOpen: 'open',
  onReady: 'onOpen'
})
export default class Portal extends Component {
  static propTypes = {
    /**
     * Wheter or not the `<Portal />` is open
     */
    open: PropTypes.bool,

    /**
     * Callback fired when `<Portal />` content has been mounted in the DOM
     */
    onOpen: PropTypes.func,

    /**
     * Callback fired when `<Portal />` has been unmounted from the DOM
     */
    onClose: PropTypes.func,

    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Portal />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([CustomPropTypes.element, PropTypes.func]),
    /**
     * Insert the element at the 'top' of the mountNode or at the 'bottom'
     */
    insertAt: PropTypes.oneOf(['bottom', 'top']),

    /**
     * The children to be rendered within the `<Portal />`
     */
    children: PropTypes.node
  }

  static defaultProps = {
    open: false,
    insertAt: 'bottom',
    onOpen: () => {},
    onClose: () => {},
    mountNode: null,
    children: null
  }

  componentDidMount () {
    this.renderPortal(this.props)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(shallowEqual(this.props, nextProps) && shallowEqual(this.state, nextState))
  }

  componentWillReceiveProps (nextProps) {
    this.renderPortal(nextProps)
  }

  componentWillUnmount () {
    this.removePortal(this.props)
  }

  render () {
    return null
  }

  renderPortal (props) {
    const isInitialMount = !this._node
    const mountNode = this.mountNode

    let children = props.children

    // Notify that subtree has been rendered if props ask for it
    const handleMount = () => {
      // Only fire onOpen if Portal was closed and is now open
      if ((isInitialMount || (!this.props.open && props.open)) && typeof props.onOpen === 'function') {
        props.onOpen()
      }
    }

    // Wrap text in a span since subtree will only render a single top-level node
    if (typeof children === 'string' && children.length > 0) {
      children = (
        <span>
          {children}
        </span>
      )
    }

    // Render subtree if Portal is open and has children to render
    if (props.open && React.Children.count(children) > 0) {
      // Create node if it doesn't already exist
      if (!this._node) {
        this._node = document.createElement('span')
      }

      // Append node to container if it isn't already
      if (this._node.parentNode !== mountNode) {
        if (this.props.insertAt === 'bottom') {
          mountNode.appendChild(this._node)
        } else {
          mountNode.insertBefore(this._node, mountNode.firstChild)
        }
      }

      ReactDOM.unstable_renderSubtreeIntoContainer(this, children, this._node, handleMount)
    } else {
      this.removePortal(props)
    }
  }

  removePortal (props) {
    let unmounted

    if (this._node) {
      unmounted = ReactDOM.unmountComponentAtNode(this._node)
      this._node.parentNode && this._node.parentNode.removeChild(this._node)
      this._node = null
    }

    if (unmounted && typeof props.onClose === 'function') {
      props.onClose()
    }
  }

  get mountNode () {
    let mountNode

    if (typeof this.props.mountNode === 'function') {
      mountNode = ReactDOM.findDOMNode(this.props.mountNode.call(null)) // eslint-disable-line react/no-find-dom-node
    } else if (this.props.mountNode) {
      mountNode = ReactDOM.findDOMNode(this.props.mountNode) // eslint-disable-line react/no-find-dom-node
    }

    if (!mountNode || !mountNode.nodeName) {
      mountNode = document.body
    }

    return mountNode
  }

  get node () {
    return this._node
  }
}
