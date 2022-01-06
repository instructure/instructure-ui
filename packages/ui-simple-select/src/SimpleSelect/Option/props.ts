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

import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type OptionProps = {
  id: SimpleSelectOptionOwnProps['id']
  isDisabled: SimpleSelectOptionOwnProps['isDisabled']
  isSelected: boolean
  isHighlighted: boolean
  children: SimpleSelectOptionOwnProps['children']
}

type RenderSimpleSelectOptionLabel =
  | React.ReactNode
  | ((args: OptionProps) => React.ReactNode)

type SimpleSelectOptionOwnProps = {
  /**
   * The id for the option.
   */
  id: string
  /**
   * The value for the option.
   */
  value: string | number
  /**
   * Whether or not this option is disabled.
   */
  isDisabled?: boolean
  /**
   * Content to display as the option label.
   */
  children?: string
  /**
   * Content to display before the option label, such as an icon.
   */
  renderBeforeLabel?: RenderSimpleSelectOptionLabel
  /**
   * Content to display after the option label, such as an icon.
   */
  renderAfterLabel?: RenderSimpleSelectOptionLabel
}

type PropKeys = keyof SimpleSelectOptionOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SimpleSelectOptionProps = SimpleSelectOptionOwnProps &
  OtherHTMLAttributes<SimpleSelectOptionOwnProps>

const propTypes: PropValidators<PropKeys> = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isDisabled: PropTypes.bool,
  renderBeforeLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderAfterLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.string
}

const allowedProps: AllowedPropKeys = [
  'id',
  'value',
  'isDisabled',
  'renderBeforeLabel',
  'renderAfterLabel',
  'children'
]

export type { SimpleSelectOptionProps, RenderSimpleSelectOptionLabel }
export { propTypes, allowedProps }
