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
import { ThemeablePropTypes } from '@instructure/emotion'

import { PaginationButton } from './PaginationButton'

import type { Spacing, WithStyleProps } from '@instructure/emotion'
import type { AsElementType, PropValidators } from '@instructure/shared-types'

type PaginationOwnProps = {
  children?: React.ReactNode // TODO: oneof([PaginationButton])
  disabled?: boolean
  label?: React.ReactNode
  labelNext?: string
  labelPrev?: string
  variant?: 'full' | 'compact'
  margin?: Spacing
  as?: AsElementType
  elementRef?: (...args: any[]) => any
  shouldHandleFocus?: boolean
}

type PropKeys = keyof PaginationOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PaginationProps = PaginationOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * children of type Pagination.Page
   */
  children: Children.oneOf([PaginationButton]),
  /**
   * Disables interaction with all pages
   */
  disabled: PropTypes.bool,
  /**
   * Visible label for component
   */
  label: PropTypes.node,
  /**
   * Accessible label for next button
   */
  labelNext: PropTypes.string,
  /**
   * Accessible label for previous button
   */
  labelPrev: PropTypes.string,
  /**
   * The compact variant truncates the page navigation to show only the first,
   * last, and pages immediately surrounding the current page. Fewer than 5 pages,
   * no next/previous arrow buttons will be shown, and all pages will be listed
   */
  variant: PropTypes.oneOf(['full', 'compact']),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  /**
   * the element type to render as
   */
  as: PropTypes.elementType,
  /**
   * provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func,
  /**
   * For accessibility, Pagination sets focus on the first or last Pagination.Pages,
   * respectively, when the Previous or Next arrow buttons are removed from the DOM.
   * Set this property to `false` to prevent this behavior.
   */
  shouldHandleFocus: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'children',
  'disabled',
  'label',
  'labelNext',
  'labelPrev',
  'variant',
  'margin',
  'as',
  'elementRef',
  'shouldHandleFocus'
]

export type { PaginationProps }
export { propTypes, allowedProps }
