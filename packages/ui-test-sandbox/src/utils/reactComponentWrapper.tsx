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

interface WrapperProp extends React.ComponentProps<React.ElementType> {
  Component: React.ElementType
  props: Record<string, unknown>
}

export interface WrappedRef {
  setProps: (newProps: Record<string, unknown>) => Promise<unknown>
  getDOMNode: () => Element
}

class WrapperComponent extends React.Component<WrapperProp, WrapperProp> {
  static propTypes = {
    Component: PropTypes.elementType.isRequired,
    props: PropTypes.object.isRequired
  }

  constructor(props: WrapperProp) {
    super(props)
    this.state = this.props
  }

  getDOMNode() {
    try {
      return ReactDOM.findDOMNode(this)
    } catch (e) {
      console.warn(`[ui-test-utils] ${e}`)
      return null
    }
  }

  setChildProps(newProps: Record<string, unknown>) {
    const { props: oldProps } = this.state
    const props = { ...oldProps, ...newProps }
    return new Promise((resolve) =>
      this.setState({ props }, resolve as (value?: unknown) => void)
    )
  }

  render() {
    const { Component } = this.props
    const { props } = this.state
    const { componentRef, ...componentProps } = props
    return <Component ref={componentRef} {...componentProps} />
  }
}

class ReactComponentWrapper {
  private _mountNode: HTMLDivElement | null = null

  mount(
    element: React.ComponentElement<Record<string, unknown>, React.Component>,
    options: { props?: Record<string, unknown> } = {}
  ) {
    const { type, ref, props } = element

    this.unmount()

    this._mountNode = document.createElement('div')
    this._mountNode.setAttribute('data-ui-test-utils', 'true')

    document.body.appendChild(this._mountNode)

    let result: WrappedRef
    let rendered: boolean

    const wrapperRef = (wrapper: WrapperComponent) => {
      if (wrapper && !rendered) {
        result = {
          setProps(newProps: Record<string, unknown>) {
            return doAsync(() => {
              wrapper.setChildProps(newProps)
            })
          },
          getDOMNode(): Element {
            // TODO make this work properly. It can return null!
            return wrapper.getDOMNode() as Element
          }
        }
        rendered = true
      }
      if (typeof ref === 'function') {
        ref(wrapper)
      }
    }

    const WrappedElement = (
      <WrapperComponent
        Component={type}
        props={{ ...props, ...options.props }}
        ref={wrapperRef}
      />
    )

    const doAsync = (actionFn: () => void): Promise<WrappedRef> => {
      return new Promise((resolve, reject) => {
        let error: unknown
        setTimeout(() => {
          try {
            actionFn()
          } catch (e) {
            // catch unhandled errors
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
      ReactDOM.render(WrappedElement, this._mountNode)
    })
  }

  unmount() {
    return new Promise((resolve, reject) => {
      try {
        let result
        if (this._mountNode) {
          result = ReactDOM.unmountComponentAtNode(this._mountNode)
          this._mountNode && this._mountNode.remove()
        }
        resolve(result)
      } catch (err) {
        reject(err)
      }
    })
  }
}

const reactComponentWrapper = new ReactComponentWrapper()

export { reactComponentWrapper as ReactComponentWrapper }
