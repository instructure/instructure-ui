/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { bindElementToUtilities } from './bindElementToUtilities'

class ReactComponentWrapper {
  mount (element, options) {
    this.unmount()

    const { type, ref, props } = element
    const Wrapper = createMountWrapper(element, options)

    this._mountNode = document.createElement('div')
    this._mountNode.setAttribute('data-ui-test-utils', 'true')
    document.body.appendChild(this._mountNode)

    return new Promise((resolve, reject) => {
      let wrapper
      try {
        ReactDOM.render(
          React.createElement(Wrapper, {
            Component: type,
            props: { ...props, ...options.props },
            context: options.context,
            ref: (el) => {
              if (el && typeof wrapper === 'undefined') {
                const DOMNode = el.getDOMNode()
                const utils = (DOMNode instanceof Element) ? bindElementToUtilities(DOMNode, options.customMethods) : {}

                wrapper = el
                resolve({
                  setProps (newProps, callback) {
                    wrapper.setChildProps(newProps, callback)
                  },
                  setContext (newContext, callback)  {
                    wrapper.setChildContext(newContext, callback)
                  },
                  getDOMNode () {
                    return wrapper.getDOMNode()
                  },
                  ...utils
                })
              }
              if (typeof ref === 'function') {
                ref(el)
              }
            }
          }),
          this._mountNode
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  unmount () {
    if (this._mountNode) {
      ReactDOM.unmountComponentAtNode(this._mountNode)
      this._mountNode && this._mountNode.remove()
    }
  }
}

function createMountWrapper (element, options = {}) {
  class WrapperComponent extends React.Component {
    static propTypes = {
      Component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
      props: PropTypes.object.isRequired,
      context: PropTypes.object
    }

    static defaultProps = {
      context: null
    }

    constructor (...args) {
      super(...args)
      const { props, context } = this.props
      this.state = {
        mount: true,
        props,
        context,
      }
    }

    getDOMNode () {
      return ReactDOM.findDOMNode(this)
    }

    setChildProps (newProps, callback) {
      const { props: oldProps } = this.state
      const props = { ...oldProps, ...newProps }
      this.setState({ props }, callback)
    }

    setChildContext (newContext, callback) {
      const { context: oldContext } = this.state
      const context = { ...oldContext, ...newContext }
      this.setState({ context }, callback)
    }

    render () {
      const { Component } = this.props
      const { mount, props } = this.state
      if (!mount) return null
      return (
        <Component {...props} />
      )
    }
  }

  if (options.context && (element.type.contextTypes || options.childContextTypes)) {
    const childContextTypes = {
      ...element.type.contextTypes,
      ...options.childContextTypes,
    }

    WrapperComponent.prototype.getChildContext = function getChildContext() {
      return this.state.context
    }
    WrapperComponent.childContextTypes = childContextTypes
  }

  return WrapperComponent
}

export default new ReactComponentWrapper()
