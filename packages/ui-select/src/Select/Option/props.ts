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

type SelectOptionOwnProps = {
  id: string
  isHighlighted?: boolean
  isSelected?: boolean
  isDisabled?: boolean
  renderBeforeLabel?: React.ReactNode | ((...args: any[]) => any)
  renderAfterLabel?: React.ReactNode | ((...args: any[]) => any)
  children?: React.ReactNode
}

type PropKeys = keyof SelectOptionOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SelectOptionProps = SelectOptionOwnProps &
  OtherHTMLAttributes<SelectOptionOwnProps>

const propTypes: PropValidators<PropKeys> = {
  /**
   * The id for the option.
   */
  id: PropTypes.string.isRequired,
  /**
   * Whether or not this option is highlighted.
   */
  isHighlighted: PropTypes.bool,
  /**
   * Whether or not this option is selected.
   */
  isSelected: PropTypes.bool,
  /**
   * Whether or not this option is disabled.
   */
  isDisabled: PropTypes.bool,
  /**
   * Content to display before the option label, such as an icon.
   */
  renderBeforeLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Content to display after the option label, such as an icon.
   */
  renderAfterLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Content to display as the option label.
   */
  children: PropTypes.node
}

const allowedProps: AllowedPropKeys = [
  'id',
  'isHighlighted',
  'isSelected',
  'isDisabled',
  'renderBeforeLabel',
  'renderAfterLabel',
  'children'
]

export type { SelectOptionProps }
export { propTypes, allowedProps }
