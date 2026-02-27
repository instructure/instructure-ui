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

import React from 'react'
import type {
  OtherHTMLAttributes,
  PickPropsWithExceptions
} from '@instructure/shared-types'
import type { IconButtonProps } from '@instructure/ui-buttons'

type PaginationArrowDirections = 'first' | 'prev' | 'next' | 'last'

type PaginationNavigationOwnProps = {
  direction?: PaginationArrowDirections
  label: string
  buttonRef?: (element: Element | null) => void
  onClick?: (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLInputElement>
  ) => void
}

type PropKeys = keyof PaginationNavigationOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PaginationNavigationProps =
  // We pass almost all the props to IconButton
  PickPropsWithExceptions<
    IconButtonProps,
    | 'size'
    | 'withBackground'
    | 'withBorder'
    | 'screenReaderLabel'
    | 'rel'
    | 'elementRef'
    | 'margin'
  > &
    PaginationNavigationOwnProps &
    OtherHTMLAttributes<PaginationNavigationOwnProps>
const allowedProps: AllowedPropKeys = [
  'direction',
  'label',
  'buttonRef'

  // we don't want to pass onClick
  // 'onClick'
]

export type { PaginationNavigationProps, PaginationArrowDirections }
export { allowedProps }
