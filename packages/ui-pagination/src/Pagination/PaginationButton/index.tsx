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

import { BaseButton } from '@instructure/ui-buttons'
import { omitProps } from '@instructure/ui-react-utils'

import { allowedProps } from './props'
import type { PaginationPageProps } from './props'

/**
---
parent: Pagination
id: Pagination.Page
---
**/

class PaginationButton extends Component<PaginationPageProps> {
  static readonly componentId = 'Pagination.Page'

  static allowedProps = allowedProps
  static defaultProps = {
    current: false
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  render() {
    const exclude = this.props.current ? ['onClick', 'href'] : []

    const props = omitProps(this.props, PaginationButton.allowedProps, exclude)

    // wrapped in an unstyled <li> for better a11y
    return (
      <li style={{ all: 'unset' }}>
        <BaseButton
          color="primary"
          data-cid="PaginationButton"
          withBackground={this.props.current}
          withBorder={this.props.current}
          {...props}
          aria-current={this.props.current ? 'page' : undefined}
          elementRef={this.handleRef}
          {...(this.props.screenReaderLabel
            ? { 'aria-label': this.props.screenReaderLabel }
            : {})}
        >
          {this.props.children}
        </BaseButton>
      </li>
    )
  }
}

export default PaginationButton
export { PaginationButton }
