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
const createRoot = async () => {
  return import('react-dom/client')
}
import PropTypes from 'prop-types'

// copied from React 18's source
interface Root {
  render(children: React.ReactNode): void
  unmount(): void
}

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
    // wrapping props and destructuring is a workaround to silence the
    // "It is not recommended to assign props directly to state" warning
    this.state = { ...this.props }
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
  private _root?: Root = undefined

  async mount(
    element: React.ComponentElement<Record<string, unknown>, React.Component>,
    options: { props?: Record<string, unknown>; strictMode?: boolean } = {}
  ) {
    const { type, ref, props } = element
    const shouldWrapInStrictMode = options.strictMode ?? true

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
            return new Promise((resolve, reject) => {
              let error: unknown
              // this timeout is needed because of some failing DrawerTray tests
              setTimeout(() => {
                try {
                  wrapper.setChildProps(newProps)
                } catch (e) {
                  // catch unhandled errors
                  error = e
                }
                // this timeout is needed because prop changes are only a frame
                // later applied in React 18
                setTimeout(() => {
                  if (error) {
                    reject(error)
                  } else {
                    resolve(result)
                  }
                })
              })
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

    return new Promise<WrappedRef>((resolve, reject) => {
      createRoot()
        .then((res) => {
          let err: unknown
          try {
            this._root = res!.createRoot(this._mountNode!)
            this._root.render(
              shouldWrapInStrictMode ? (
                <React.StrictMode>{WrappedElement}</React.StrictMode>
              ) : (
                WrappedElement
              )
            )
          } catch (error) {
            err = error
          }
          // this timeout is needed because Root.render() seems to cause
          // prop validation to be emitted a frame later
          setTimeout(() => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
        })
        .catch(() => {
          // react-dom/client does not exist, its React 16 or 17
          let error: unknown
          setTimeout(() => {
            try {
              ReactDOM.render(
                shouldWrapInStrictMode ? (
                  <React.StrictMode>{WrappedElement}</React.StrictMode>
                ) : (
                  WrappedElement
                ),
                this._mountNode
              )
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
    })
  }

  unmount() {
    try {
      let result = true
      if (this._mountNode) {
        if (this._root) {
          this._root.unmount()
        } else {
          result = ReactDOM.unmountComponentAtNode(this._mountNode)
        }
        this._mountNode.remove()
      }
      return result
    } catch (err) {
      console.error('Failed to unmount React wrapper', err)
      throw err
    }
  }
}

const reactComponentWrapper = new ReactComponentWrapper()

export { reactComponentWrapper as ReactComponentWrapper }
