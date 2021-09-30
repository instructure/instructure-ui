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
import React, { Children, Component, ReactElement } from 'react'

import { View } from '@instructure/ui-view'
import { passthroughProps, safeCloneElement } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { InlineListItem } from './InlineListItem'

import { propTypes, allowedProps } from './props'
import type { InlineListProps } from './props'

/**
---
category: components
---
**/
@testable()
class InlineList extends Component<InlineListProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    children: null,
    itemSpacing: 'none',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    as: 'ul',
    margin: 'none',
    delimiter: 'none',
    size: 'medium'
  }

  static Item = InlineListItem

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
    this.props.elementRef?.(el)
  }

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      if (!child) return // ignore null, falsy children

      return safeCloneElement(child as ReactElement, {
        delimiter: this.props.delimiter,
        size: this.props.size,
        spacing: this.props.itemSpacing
      })
    })
  }

  render() {
    const { as, margin, elementRef, ...rest } = this.props

    return (
      <View
        {...passthroughProps(rest)}
        as={as}
        margin={margin}
        padding="0"
        elementRef={this.handleRef}
        display="block"
      >
        {this.renderChildren()}
      </View>
    )
  }
}

export default InlineList
export { InlineList }
