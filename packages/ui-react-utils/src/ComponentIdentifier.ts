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

import React, { Component, ComponentType, ReactElement, ReactNode } from 'react'
import PropTypes from 'prop-types'

import { matchComponentTypes } from './matchComponentTypes'
import { ensureSingleChild } from './ensureSingleChild'
import deprecated from './deprecated'

// TODO delete this class, its not used anywhere, see livegrep
/**
---
category: utilities/react
---
Abstract component identifier. Helpful for picking out a specific child.

  ```js
  class App extends Component {
    render () {
      const title = pick(Title, this.props.children)
      const content = pick(Content, this.props.children)

      return (
        <div>
          {title}
          <ContextView>
            {content}
          </ContextView>
         </div>
     )
    }
  }

  class Title extends ComponentIdentifier { static displayName = 'Title' }
  class Content extends ComponentIdentifier { static displayName = 'Content' }

  ReactDOM.render(
    <App>
      <Title><h2>Hello World!</h2></Title>
      <Content><div>This text gets decorated within `App`.</div></Content>
    </App>,
    document.getElementById('container')
  )
  ```
  @module ComponentIdentifier
**/
@deprecated(
  '8.0.0',
  undefined,
  'This component will be removed in InstUI 9.0 since its not used.'
)
class ComponentIdentifier<P> extends Component<P> {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  static pick = (component: ComponentType, children: ReactNode) => {
    let result

    React.Children.forEach(children, (child) => {
      if (matchComponentTypes(child, [component])) {
        result = child
      }
    })

    return result
  }

  render() {
    const { children, ...props } = this.props

    return ensureSingleChild(children as ReactElement, props)
  }
}

export default ComponentIdentifier
export {
  /**
   *
   * Pick a specific child component from a component's children
   *
   * @param {Component} component The component to look for
   * @param {Array} children The child components to look through
   * @return {Component} The matching component if found, otherwise undefined
   */
  ComponentIdentifier
}
