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

import { Component, Children } from 'react'

import { error } from '@instructure/console'
import { omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle } from '@instructure/emotion'

import { TopNavBarContext } from '../TopNavBarContext'
import type { ItemChild, TopNavBarItemProps } from '../TopNavBarItem/props'

import generateStyle from './styles'

import { allowedProps } from './props'
import type { TopNavBarUserProps } from './props'

/**
---
parent: TopNavBar
id: TopNavBar.User
---
@module TopNavBarUser
**/
@withStyle(generateStyle, null)
@testable()
class TopNavBarUser extends Component<TopNavBarUserProps> {
  static readonly componentId = 'TopNavBar.User'

  static allowedProps = allowedProps
  static defaultProps = {}

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  ref: HTMLDivElement | null = null

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get content() {
    const children = Children.toArray(this.props.children) as ItemChild[]

    const allowedVariants: TopNavBarItemProps['variant'][] = [
      'default',
      'button',
      'avatar'
    ]

    return Children.map(children, (child) => {
      const { id, variant } = child.props

      if (variant && !allowedVariants.includes(variant)) {
        error(
          false,
          `Item with id "${id}" has "${variant}" variant, but only the following variants are allowed in <TopNavBarUser>: ${allowedVariants.join(
            ', '
          )}.`
        )
        return null
      }

      return child
    })
  }

  render() {
    const { styles } = this.props

    if (!this.content || this.content.length === 0) {
      return null
    }

    if (this.context.layout === 'smallViewport') {
      // in smallViewport mode it is rendered as a Drilldown
      return null
    }

    return (
      <div
        {...omitProps(this.props, allowedProps)}
        ref={this.handleRef}
        css={styles?.topNavBarUser}
      >
        {this.content}
      </div>
    )
  }
}

export { TopNavBarUser }
export default TopNavBarUser
