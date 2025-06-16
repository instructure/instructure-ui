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
import PropTypes from 'prop-types'

import { Children } from '@instructure/ui-prop-types'

import { PaginationButton } from './PaginationButton'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  AsElementType,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { PaginationPageProps } from './PaginationButton/props'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
type ChildPage = React.ReactElement<PaginationPageProps>

type PaginationOwnProps = {
  // this won't filter the children completely well,
  // it will allow simple elements (e.g. `<div>`) and components with compatible props
  // TODO: find a better way to type Children.oneOf([PaginationButton])
  /**
   * children of type Pagination.Page
   */
  children?: ChildPage | ChildPage[]

  /**
   * Disables interaction with all pages
   */
  disabled?: boolean

  /**
   * Displays "jump to first" and "jump to last" buttons. Always turned on with `input` variant.
   */
  withFirstAndLastButton?: boolean

  /**
   * Displays the unavailable navigation buttons as disabled instead of hiding them. Always turned on with `input` variant.
   */
  showDisabledButtons?: boolean

  /**
   * Visible label for component
   */
  label?: React.ReactNode

  /**
   * Accessible label for next button
   */
  labelNext?: string

  /**
   * Accessible label for previous button
   */
  labelPrev?: string

  /**
   * Accessible label for "jump to first" button
   */
  labelFirst?: string

  /**
   * Accessible label for "jump to last" button
   */
  labelLast?: string

  /**
   * Label for number input
   *
   * (__only__ for `input` variant)
   */
  labelNumberInput?: (totalPageNumber: number) => React.ReactNode

  /**
   * ScreenReaderLabel for number input
   *
   * (__only__ for `input` variant)
   */
  screenReaderLabelNumberInput?: (
    currentPage: number,
    totalPageNumber: number
  ) => string

  /**
   * ScreenReaderLabel for page number buttons
   *
   * (__only__ for `full` and `compact variants)
   */
  screenReaderLabelPageButton?: (
    currentPage: number,
    totalPageNumber: number
  ) => string

  /**
   * The compact variant truncates the page navigation to show only the first,
   * last, and pages immediately surrounding the current page. Fewer than 5 pages,
   * no next/previous arrow buttons will be shown, and all pages will be listed
   */
  variant?: 'full' | 'compact' | 'input'

  /**
   * Spacing token values can be found here: [Spacing Tokens](https://instructure.design/#layout-spacing/%23Tokens)
   *
   * Apply these values via familiar CSS-like shorthand. For example: `margin="space8 0 space12"`.
   */
  margin?: Spacing

  /**
   * the element type to render as
   */
  as?: AsElementType

  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void

  /**
   * provides a reference to the html input element
   *
   * (__only__ for `input` variant)
   */
  inputRef?: (inputElement: HTMLInputElement | null) => void

  /**
   * For accessibility, Pagination sets focus on the first or last Pagination.Pages, respectively, when the Previous or Next arrow buttons are removed from the DOM.
   * Set this property to `false` to prevent this behavior.
   */
  shouldHandleFocus?: boolean

  /**
   * The total number of pages
   */
  totalPageNumber?: number

  /**
   * The current page number
   */
  currentPage?: number

  /**
   * The number of pages to display before and after the current page
   */
  siblingCount?: number

  /**
   * The number of always visible pages at the beginning and end
   * of the pagination component
   * */
  boundaryCount?: number

  /**
   * Called when page number is changed
   */
  onPageChange?: (next: number, prev: number) => void

  /**
   * Renders the visible pages
   */
  renderPageIndicator?: (
    pageIndex: number,
    currentPage: number
  ) => React.ReactNode

  /**
   * The ellipsis
   * (e.g. "...")
   */
  ellipsis?: React.ReactNode
}

type PropKeys = keyof PaginationOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PaginationProps = PaginationOwnProps &
  WithStyleProps<null, PaginationStyle> &
  OtherHTMLAttributes<PaginationOwnProps> &
  WithDeterministicIdProps

type PaginationStyle = ComponentStyle<
  'pagination' | 'pages' | 'pageIndicatorList'
>

const propTypes: PropValidators<PropKeys> = {
  children: Children.oneOf([PaginationButton]),
  disabled: PropTypes.bool,
  withFirstAndLastButton: PropTypes.bool,
  showDisabledButtons: PropTypes.bool,
  label: PropTypes.node,
  labelNext: PropTypes.string,
  labelPrev: PropTypes.string,
  labelFirst: PropTypes.string,
  labelLast: PropTypes.string,
  labelNumberInput: PropTypes.func,
  screenReaderLabelNumberInput: PropTypes.func,
  screenReaderLabelPageButton: PropTypes.func,
  variant: PropTypes.oneOf(['full', 'compact', 'input']),
  margin: PropTypes.string,
  as: PropTypes.elementType,
  elementRef: PropTypes.func,
  inputRef: PropTypes.func,
  shouldHandleFocus: PropTypes.bool,
  totalPageNumber: PropTypes.number,
  currentPage: PropTypes.number,
  siblingCount: PropTypes.number,
  boundaryCount: PropTypes.number,
  onPageChange: PropTypes.func,
  renderPageIndicator: PropTypes.func,
  ellipsis: PropTypes.node
}

const allowedProps: AllowedPropKeys = [
  'children',
  'disabled',
  'withFirstAndLastButton',
  'showDisabledButtons',
  'label',
  'labelNext',
  'labelPrev',
  'labelFirst',
  'labelLast',
  'labelNumberInput',
  'screenReaderLabelNumberInput',
  'screenReaderLabelPageButton',
  'variant',
  'margin',
  'as',
  'elementRef',
  'inputRef',
  'shouldHandleFocus',
  'totalPageNumber',
  'currentPage',
  'onPageChange',
  'siblingCount',
  'boundaryCount',
  'renderPageIndicator',
  'ellipsis'
]

type PaginationSnapshot = {
  lastFocusedButton?: HTMLButtonElement
}

export type { PaginationProps, PaginationStyle, PaginationSnapshot, ChildPage }
export { propTypes, allowedProps }
