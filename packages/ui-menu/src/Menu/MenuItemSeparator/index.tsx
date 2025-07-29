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

import { withStyle } from '@instructure/emotion'
import { testable } from '@instructure/ui-testable'
import { omitProps } from '@instructure/ui-react-utils'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type { MenuSeparatorProps } from './props'

/**
---
parent: Menu
id: Menu.Separator
---
@module MenuItemSeparator
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class MenuItemSeparator extends Component<MenuSeparatorProps> {
  static readonly componentId = 'Menu.Separator'

  static allowedProps = allowedProps

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

  render() {
    const props = omitProps(this.props, MenuItemSeparator.allowedProps)
    // role="separator" would fit better here, but it causes NVDA to stop the
    // MenuItem count after it
    return (
      <div
        {...props}
        role="presentation"
        css={this.props.styles?.menuItemSeparator}
        ref={this.handleRef}
      />
    )
  }
}

export default MenuItemSeparator
export { MenuItemSeparator }
