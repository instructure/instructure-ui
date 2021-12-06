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

/** @jsx jsx */
import React, { Component } from 'react'

import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'
import { IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { BreadcrumbLink } from './BreadcrumbLink'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { BreadcrumbProps } from './props'

/**
---
category: components
---
@tsProps
**/

@withStyle(generateStyle, generateComponentTheme)
@testable()
class Breadcrumb extends Component<BreadcrumbProps> {
  static readonly componentId = 'Breadcrumb'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    size: 'medium',
    children: null
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }
  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  static Link = BreadcrumbLink

  renderChildren() {
    const { styles, children } = this.props
    const numChildren = React.Children.count(children)
    const inlineStyle = {
      maxWidth: `${Math.floor(100 / numChildren)}%`
    }
    return React.Children.map(children, (child, index) => {
      return (
        <li css={styles?.crumb} style={inlineStyle}>
          {child}
          {index < numChildren - 1 && (
            <IconArrowOpenEndSolid color="auto" css={styles?.separator} />
          )}
        </li>
      )
    })
  }

  render() {
    const { styles } = this.props

    return (
      <View
        role="navigation"
        as="div"
        margin={this.props.margin}
        aria-label={this.props.label}
        elementRef={this.handleRef}
      >
        <ol css={styles?.breadcrumb}>{this.renderChildren()}</ol>
      </View>
    )
  }
}

export default Breadcrumb
export { Breadcrumb, BreadcrumbLink }
