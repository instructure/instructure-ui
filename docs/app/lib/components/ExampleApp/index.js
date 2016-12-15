import React, { Component } from 'react'

import windowMessageListener, { origin } from 'instructure-ui/lib/util/windowMessageListener'
import ReactDOM from 'react-dom'
import { ownerWindow, ownerDocument } from 'dom-helpers'

import { override, after } from '../../util/monkey-patch'
import ComponentExample from '../ComponentExample'

const _createElement = React.createElement

const messageHandler = function (message) {
  try {
    if (message && this.state) {
      this.setState({
        ...this.state,
        ...message
      })
    }
  } catch (e) {
    // TODO: prevent 'TypeErrors' in IE
  }
}

@windowMessageListener(messageHandler)
export default class ExampleApp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      code: null,
      themeKey: null,
      variant: null
    }

    const overrideComponentInstance = (instance) => {
      override(instance, 'componentDidMount', after(this.handleComponentChange))
      override(instance, 'componentDidUpdate', after(this.handleComponentChange))
    }

    React.createElement = function () {
      const el = _createElement.apply(this, arguments)

      if (el._owner && el._owner._instance) {
        overrideComponentInstance(el._owner._instance)
      }

      return el
    }
  }

  componentDidMount () {
    const win = ownerWindow(ReactDOM.findDOMNode(this))

    if (win.parent) {
      windowMessageListener.postMessage(win.parent, {
        isMounted: true
      }, origin(ReactDOM.findDOMNode(this)))
    }
  }

  handleComponentChange = () => {
    const node = ReactDOM.findDOMNode(this)
    const win = ownerWindow(node)
    const doc = ownerDocument(node)

    if (win.parent) {
      // need to use scrollHeight of body element to handle components that render into portals
      const owner = doc.body
      win.setTimeout(function () {
        windowMessageListener.postMessage(win.parent, {
          contentHeight: owner.scrollHeight
        }, origin(node))
      }, 0)
    }
  }

  render () {
    const { variant, code, themeKey } = this.state
    return <ComponentExample variant={variant} code={code} themeKey={themeKey} />
  }
}
