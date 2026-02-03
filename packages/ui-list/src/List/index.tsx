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

import { Children, Component, ReactElement } from 'react'

import { View } from '@instructure/ui-view'
import { passthroughProps, safeCloneElement } from '@instructure/ui-react-utils'
import { withStyle_11_5 as withStyle } from '@instructure/emotion'

import { ListItem } from './ListItem'
import generateStyle from './styles'
import { allowedProps } from './props'
import type { ListProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle)
class List extends Component<ListProps> {
  static readonly componentId = 'List'

  static allowedProps = allowedProps
  static defaultProps = {
    as: 'ul',
    delimiter: 'none',
    isUnstyled: false,
    size: 'medium',
    itemSpacing: 'none'
  }

  static Item = ListItem

  ref: Element | null = null

  handleRef = (el: Element | null) => {
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

  renderChildren() {
    return Children.map(this.props.children, (child) => {
      if (!child) return // ignore null, falsy children

      return safeCloneElement(child as ReactElement, {
        isUnstyled: this.props.isUnstyled,
        delimiter: this.props.delimiter,
        size: this.props.size,
        spacing: this.props.itemSpacing
      })
    })
  }

  render() {
    const { as, margin, isUnstyled, elementRef, styles, ...rest } = this.props

    return (
      <View
        {...passthroughProps(rest)}
        css={styles?.list}
        as={as}
        margin={margin}
        elementRef={this.handleRef}
        display="block"
        data-cid="List"
      >
        {this.renderChildren()}
      </View>
    )
  }
}

export default List
export { List, ListItem }
