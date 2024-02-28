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

import { IconButton } from '@instructure/ui-buttons'
import { PresentationContent } from '@instructure/ui-a11y-content'
import { Tooltip } from '@instructure/ui-tooltip'
import {
  IconArrowOpenStartSolid,
  IconArrowOpenEndSolid,
  IconArrowDoubleStartSolid,
  IconArrowDoubleEndSolid
} from '@instructure/ui-icons'
import { testable } from '@instructure/ui-testable'

import type { PaginationNavigationProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: Pagination
id: Pagination.Navigation
---
**/
@testable()
class PaginationArrowButton extends Component<PaginationNavigationProps> {
  static readonly componentId = 'Pagination.Navigation'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {}

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  get margin() {
    switch (this.props.direction) {
      case 'first':
        return '0 xx-small 0 0'
      case 'last':
        return '0 0 0 xx-small'
      default:
        return undefined
    }
  }

  get Icon() {
    switch (this.props.direction) {
      case 'first':
        return IconArrowDoubleStartSolid
      case 'prev':
        return IconArrowOpenStartSolid
      case 'next':
        return IconArrowOpenEndSolid
      case 'last':
        return IconArrowDoubleEndSolid
      default:
        return null
    }
  }

  render() {
    const { label, direction, buttonRef, ...props } = this.props

    return (
      <Tooltip
        elementRef={this.handleRef}
        on={['hover', 'focus']}
        renderTip={<PresentationContent>{label}</PresentationContent>}
      >
        <IconButton
          {...props}
          size="small"
          withBackground={false}
          withBorder={false}
          screenReaderLabel={label}
          rel={props.href || props.to ? direction : undefined}
          elementRef={buttonRef}
          margin={this.margin}
        >
          {this.Icon}
        </IconButton>
      </Tooltip>
    )
  }
}

export default PaginationArrowButton
export { PaginationArrowButton }
