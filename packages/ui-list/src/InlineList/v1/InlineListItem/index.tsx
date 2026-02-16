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

import { Component } from 'react'

import { View } from '@instructure/ui-view'
import { passthroughProps } from '@instructure/ui-react-utils'

import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type { InlineListItemProps } from './props'

/**
---
parent: InlineList
id: InlineList.Item
---
**/
@withStyle(generateStyle, generateComponentTheme)
class InlineListItem extends Component<InlineListItemProps> {
  static readonly componentId = 'InlineList.Item'

  static allowedProps = allowedProps
  static defaultProps = {
    padding: 'none',
    spacing: 'none',
    delimiter: 'none',
    size: 'medium',
    lastPlaceholder: false
  }

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

  render() {
    const {
      delimiter,
      size,
      margin,
      padding,
      elementRef,
      children,
      spacing,
      styles,
      lastPlaceholder,
      ...rest
    } = this.props

    return (
      <View
        {...passthroughProps(rest)}
        css={styles?.inlineListItem}
        as="li"
        margin={margin}
        padding={padding}
        display="inline-block"
        maxWidth="100%"
        elementRef={this.handleRef}
        data-cid="InlineListItem"
      >
        {children}
        {!lastPlaceholder && (
          <span css={styles?.delimiter} aria-hidden="true" />
        )}
      </View>
    )
  }
}

export default InlineListItem
export { InlineListItem }
