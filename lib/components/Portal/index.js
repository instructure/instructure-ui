import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import shallowEqual from '../../util/shallowEqual'

/**
---
category: utilities
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
          <Typography>
            <p>{lorem.paragraph()}</p>
            <div ref={(c) => this._mountNode = c}></div>
            <p>{lorem.paragraph()}</p>
          </Typography>
        </div>
      )
    }
  }

  <Example />
  ```
**/
export default class Portal extends Component {
  static defaultProps = {
    open: false
  };

  /* eslint-disable react/require-default-props */
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
     * The children to be rendered within the `<Portal />`
     */
    children: PropTypes.node,

    /**
     * An element or a function returning an element to use as the mount node
     * for the `<Portal />` (defaults to `document.body`)
     */
    mountNode: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ])
  };
  /* eslint-enable react/require-default-props */

  componentDidMount () {
    this.renderPortal(this.props)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(shallowEqual(this.props, nextProps) &&
      shallowEqual(this.state, nextState)
    )
  }

  componentWillReceiveProps (nextProps) {
    this.renderPortal(nextProps)
  }

  componentWillUnmount () {
    this.removePortal()
  }

  render () {
    return null
  }

  renderPortal (props) {
    const mountNode = this.mountNode
    let children = props.children

    // Notify that subtree has been rendered if props ask for it
    const handleMount = () => {
      if (typeof props.onOpen === 'function') {
        props.onOpen()
      }
    }

    // Wrap text in a span since subtree will only render a single top-level node
    if (typeof children === 'string' && children.length > 0) {
      children = <span>{children}</span>
    }

    // Render subtree if Portal is open and has children to render
    if (props.open && React.Children.count(children) > 0) {
      // Create node if it doesn't already exist
      if (!this._node) {
        this._node = document.createElement('span')
      }

      // Append node to container if it isn't already
      if (this._node.parentNode !== mountNode) {
        mountNode.appendChild(this._node)
      }

      ReactDOM.unstable_renderSubtreeIntoContainer(this, children, this._node, handleMount)
    } else {
      // Close the portal
      if (this.removePortal() &&
          typeof props.onClose === 'function') {
        props.onClose()
      }
    }
  }

  removePortal () {
    let unmounted

    if (this._node) {
      unmounted = ReactDOM.unmountComponentAtNode(this._node)
      this._node.parentNode && this._node.parentNode.removeChild(this._node)
      this._node = null
    }

    return unmounted
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
