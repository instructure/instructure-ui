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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { IconButton } from '@instructure/ui-buttons'
import { PresentationContent } from '@instructure/ui-a11y-content'
import { Tooltip } from '@instructure/ui-tooltip'
import {
  IconArrowOpenStartSolid,
  IconArrowOpenEndSolid
} from '@instructure/ui-icons'
import { testable } from '@instructure/ui-testable'

type Props = {
  direction?: 'next' | 'prev'
  label: string | React.ReactNode
  buttonRef?: (...args: any[]) => any
}

/**
---
parent: Pagination
id: Pagination.Navigation
---
**/
@testable()
class PaginationArrowButton extends Component<Props> {
  static propTypes = {
    direction: PropTypes.oneOf(['next', 'prev']),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    buttonRef: PropTypes.func
  }

  static defaultProps = {
    direction: undefined,
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    buttonRef: (el) => {}
  }

  render() {
    const { label, direction, buttonRef, ...props } = this.props
    const Icon =
      direction === 'prev' ? IconArrowOpenStartSolid : IconArrowOpenEndSolid
    return (
      <Tooltip
        on={['hover', 'focus']}
        renderTip={<PresentationContent>{label}</PresentationContent>}
      >
        <IconButton
          {...props}
          size="small"
          withBackground={false}
          withBorder={false}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          screenReaderLabel={label}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'href' does not exist on type '{ children... Remove this comment to see the full error message
          rel={props.href || props.to ? direction : null}
          elementRef={buttonRef}
        >
          {Icon}
        </IconButton>
      </Tooltip>
    )
  }
}

export default PaginationArrowButton
export { PaginationArrowButton }
