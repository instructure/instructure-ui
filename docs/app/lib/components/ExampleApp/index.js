import React, { Component } from 'react'
import { windowMessageListener } from 'instructure-ui'
import { override, after } from '../../util/monkey-patch'
import ComponentExample from '../ComponentExample'

import '../../util/load-globals'

const _createElement = React.createElement

const messageHandler = function (message) {
  if (message) {
    this.setState({
      ...this.state,
      ...message
    })
  }
}

@windowMessageListener(messageHandler)
export default class ExampleApp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      code: null,
      brand: null,
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
    if (window.parent) {
      windowMessageListener.postMessage(window.parent, {
        isMounted: true
      })
    }
  }

  handleComponentChange = () => {
    if (window.parent) {
      // need to use scrollHeight of body element to handle components that render into portals
      const owner = document.body
      window.setTimeout(function () {
        windowMessageListener.postMessage(window.parent, {
          contentHeight: owner.scrollHeight
        })
      }, 0)
    }
  }

  render () {
    const { variant, code, brand } = this.state
    return <ComponentExample variant={variant} code={code} brand={brand} />
  }
}
