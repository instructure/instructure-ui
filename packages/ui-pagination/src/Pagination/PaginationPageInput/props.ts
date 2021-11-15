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

import PropTypes from 'prop-types'

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type {
  PaginationPageInputTheme,
  PropValidators
} from '@instructure/shared-types'
import React from 'react'

type PaginationPageInputOwnProps = {
  /**
   * The number of pages in total
   */
  numberOfPages: number
  /**
   * The index of the current page
   */
  currentPageIndex: number
  /**
   * Fires when a new page index is selected
   */
  onChange: (event: Event, pageIndex: number) => void
  /**
   * ScreenReaderLabel for number input
   */
  screenReaderLabel: (currentPage: number, numberOfPages: number) => string
  /**
   * Label for number input
   */
  label?: (numberOfPages: number) => React.ReactNode
  /**
   * Disables interaction with the input
   */
  disabled?: boolean
  /**
   * provides a reference to the underlying html root element
   */
  inputRef?: (element: Element | null) => void
}

type PropKeys = keyof PaginationPageInputOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PaginationPageInputProps = PaginationPageInputOwnProps &
  WithStyleProps<PaginationPageInputTheme, PaginationPageInputStyle>

type PaginationPageInputStyle = ComponentStyle<
  'paginationPageInput' | 'numberInput' | 'inputLabel'
>

type PaginationPageInputState = {
  number: number
  value: string
}

const propTypes: PropValidators<PropKeys> = {
  numberOfPages: PropTypes.number.isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  screenReaderLabel: PropTypes.func.isRequired,
  label: PropTypes.func,
  disabled: PropTypes.bool,
  inputRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'numberOfPages',
  'currentPageIndex',
  'onChange',
  'screenReaderLabel',
  'label',
  'disabled',
  'inputRef'
]

export type {
  PaginationPageInputProps,
  PaginationPageInputStyle,
  PaginationPageInputState
}
export { propTypes, allowedProps }
