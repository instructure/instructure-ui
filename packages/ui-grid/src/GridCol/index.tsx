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

import { omitProps } from '@instructure/ui-react-utils'

import { withStyle } from '@instructure/emotion'
import { logWarn as warn } from '@instructure/console'

import generateStyle from './styles'

import { allowedProps } from './props'
import type { GridColProps } from './props'

/**
---
parent: Grid
id: Grid.Col
---
**/
@withStyle(generateStyle)
class GridCol extends Component<GridColProps> {
  static readonly componentId = 'Grid.Col'

  static allowedProps = allowedProps
  static defaultProps = {
    textAlign: 'inherit',
    children: null,
    isLastCol: false,
    isLastRow: false
  }

  ref: HTMLSpanElement | null = null

  handleRef = (el: HTMLSpanElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  widthCheck() {
    const { width } = this.props
    let shouldWarn = false
    if (width) {
      if (typeof width === 'number' && width <= 0) {
        shouldWarn = true
      }

      if (typeof width === 'object') {
        Object.keys(width).forEach((breakpoint) => {
          //@ts-expect-error Ts doesn't understand Object.keys properly
          if (typeof width[breakpoint] === 'number' && width[breakpoint] <= 0) {
            shouldWarn = true
          }
        })
      }
    }
    if (shouldWarn) {
      warn(false, 'Col width must be positive!')
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
    this.widthCheck()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
    this.widthCheck()
  }

  render() {
    const { children, styles } = this.props

    const props = omitProps(this.props, GridCol.allowedProps)

    return (
      <span {...props} ref={this.handleRef} css={styles?.gridCol}>
        {children}
      </span>
    )
  }
}

export default GridCol
export { GridCol }
