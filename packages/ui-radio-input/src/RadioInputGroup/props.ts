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

import { controllable } from '@instructure/ui-prop-types'
import { FormPropTypes } from '@instructure/ui-form-field'

import type { FormMessage } from '@instructure/ui-form-field'
import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type RadioInputGroupOwnProps = {
  name: string
  description: React.ReactNode
  defaultValue?: string | number
  value?: any // TODO: controllable( PropTypes.oneOfType([PropTypes.string, PropTypes.number]) )
  onChange?: (...args: any[]) => any
  disabled?: boolean
  readOnly?: boolean
  messages?: FormMessage[]
  variant?: 'simple' | 'toggle'
  size?: 'small' | 'medium' | 'large'
  layout?: 'stacked' | 'columns' | 'inline'
  children?: React.ReactNode
}

type PropKeys = keyof RadioInputGroupOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type RadioInputGroupProps = RadioInputGroupOwnProps &
  OtherHTMLAttributes<RadioInputGroupOwnProps>

const propTypes: PropValidators<PropKeys> = {
  name: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  /**
   * value to set on initial render
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * the selected value (must be accompanied by an `onChange` prop)
   */
  value: controllable(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  /**
   * when used with the `value` prop, the component will not control its own state
   */
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  /** works just like disabled but keeps the same styles as if it were active */
  readOnly: PropTypes.bool,
  /**
   * object with shape: `{
   * text: PropTypes.string,
   * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
   *   }`
   */
  messages: PropTypes.arrayOf(FormPropTypes.message),
  /**
   * any children (ones that aren't `RadioInput` are passed through)
   */
  children: PropTypes.node,
  variant: PropTypes.oneOf(['simple', 'toggle']), // TODO: split toggle out to its own component
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  layout: PropTypes.oneOf(['stacked', 'columns', 'inline'])
}

const allowedProps: AllowedPropKeys = [
  'name',
  'description',
  'defaultValue',
  'value',
  'onChange',
  'disabled',
  'readOnly',
  'messages',
  'children',
  'variant',
  'size',
  'layout'
]

export type { RadioInputGroupProps }
export { propTypes, allowedProps }
