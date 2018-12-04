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
import React, {  Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { getOwnerDocument } from './helpers'

class ReactComponentWrapper {
  mount (element, options = {}) {
    const { type, ref, props } = element
    const Wrapper = createMountWrapper(element, options)
    const doc = getOwnerDocument(element)

    this.unmount()

    this._mountNode = doc.createElement('div')
    this._mountNode.setAttribute('data-ui-test-utils', 'true')

    doc.body.appendChild(this._mountNode)

    let result, rendered

    const wrapperRef = (wrapper) => {
      if (wrapper && !rendered) {
        result = {
          setProps (newProps) {
            return doAsync(() => { wrapper.setChildProps(newProps) })
          },
          setContext (newContext)  {
            return doAsync(() => { wrapper.setChildContext(newContext) })
          },
          getDOMNode () {
            return wrapper.getDOMNode()
          }
        }
        rendered = true
      }
      if (typeof ref === 'function') {
        ref(wrapper)
      }
    }

    const Element = React.createElement(Wrapper, {
      Component: type,
      props: { ...props, ...options.props },
      context: options.context,
      ref: wrapperRef
    })

    const doAsync = (actionFn) => {
      return new Promise((resolve, reject) => {
        let error
        setTimeout(() => {
          try {
            actionFn()
          } catch (e) {
            // catch unhandeled errors
            error = e
          }

          if (error) {
            return reject(error)
          } else {
            return resolve(result)
          }
        })
      })
    }

    return doAsync(() => {
      ReactDOM.render(Element, this._mountNode)
    })
  }

  unmount () {
    let result
    if (this._mountNode) {
      result = ReactDOM.unmountComponentAtNode(this._mountNode)
      this._mountNode && this._mountNode.remove()
    }
    return result
  }
}

function createMountWrapper (element, options = {}) {
  class WrapperComponent extends Component {
    static propTypes = {
      Component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
      props: PropTypes.object.isRequired,
      context: PropTypes.object
    }

    static defaultProps = {
      context: {}
    }

    constructor (...args) {
      super(...args)
      const { props, context } = this.props
      this.state = {
        props,
        context
      }
    }

    getDOMNode () {
      try {
        return ReactDOM.findDOMNode(this)
      } catch (e) {
        console.warn(`[ui-test-utils] ${e}`)
        return null
      }
    }

    setChildProps (newProps) {
      const { props: oldProps } = this.state
      const props = { ...oldProps, ...newProps }
      return new Promise(resolve => this.setState({ props }, resolve))
    }

    setChildContext (newContext) {
      const { context: oldContext } = this.state
      const context = { ...oldContext, ...newContext }
      return new Promise(resolve => this.setState({ context }, resolve))
    }

    render () {
      const { Component } = this.props
      const { props } = this.state

      const {
        componentRef,
        ...componentProps
      } = props

      return (
        <Component ref={componentRef} {...componentProps} />
      )
    }
  }

  if (element.type.contextTypes) {
    const childContextTypes = {
      ...element.type.contextTypes
    }

    WrapperComponent.prototype.getChildContext = function getChildContext () {
      return this.state.context
    }

    WrapperComponent.childContextTypes = childContextTypes
  }

  return WrapperComponent
}

export default new ReactComponentWrapper()
