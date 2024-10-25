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
import { Component } from 'react'

import { debounce } from '@instructure/debounce'
import type { Debounced } from '@instructure/debounce'
import { getBoundingClientRect } from '@instructure/ui-dom-utils'
import { omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type {
  DrawerLayoutContentProps,
  DrawerLayoutContentStyleProps
} from './props'

/**
---
parent: DrawerLayout
id: DrawerLayout.Content
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class DrawerContent extends Component<DrawerLayoutContentProps> {
  static readonly componentId = 'DrawerLayout.Content'

  static locatorAttribute = 'data-drawer-content'
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    role: 'region'
  }

  ref: HTMLDivElement | null = null

  get _content() {
    console.warn(
      '_content property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  private _resizeListener?: ResizeObserver

  private _debounced?: Debounced<NonNullable<typeof this.props.onSizeChange>>

  componentDidMount() {
    const rect = getBoundingClientRect(this.ref)
    const origSize = {
      width: rect.width
    }
    // set initial size
    if (typeof this.props.onSizeChange === 'function') {
      this.props.onSizeChange({ width: rect.width, height: rect.height })

      // listen for changes to size
      this._debounced = debounce(this.props.onSizeChange, 100, {
        leading: false,
        trailing: true
      })
    }

    this._resizeListener = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const size = {
          width: entry.contentRect.width
        }
        if (size.width !== origSize.width) {
          this._debounced?.(size)
        }
      }
    })

    this._resizeListener.observe(this.ref!)

    this.props.makeStyles?.(this.makeStyleProps(false))
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStyleProps(true))
  }

  componentWillUnmount() {
    this._resizeListener?.disconnect()

    this._debounced?.cancel()
  }

  makeStyleProps = (
    shouldTransition: DrawerLayoutContentStyleProps['shouldTransition']
  ): DrawerLayoutContentStyleProps => {
    return { shouldTransition }
  }

  handleContentRef = (node: HTMLDivElement | null) => {
    this.ref = node

    if (typeof this.props.contentRef === 'function') {
      this.props.contentRef(node)
    }
  }

  render() {
    const { style, label, role } = this.props

    return (
      <div
        {...omitProps(this.props, DrawerContent.allowedProps)}
        role={role}
        style={style}
        ref={this.handleContentRef}
        aria-label={label}
        css={this.props.styles?.drawerContent}
      >
        {this.props.children}
      </div>
    )
  }
}

export default DrawerContent
export { DrawerContent }
