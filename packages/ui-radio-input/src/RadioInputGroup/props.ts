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

  /**
   * value to set on initial render
   */
  defaultValue?: string | number

  /**
   * the selected value (must be accompanied by an `onChange` prop)
   */
  value?: string | number // TODO: controllable( PropTypes.oneOfType([PropTypes.string, PropTypes.number]) )

  /**
   * when used with the `value` prop, the component will not control its own state
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void

  disabled?: boolean

  /**
   * works just like disabled but keeps the same styles as if it were active
   */
  readOnly?: boolean

  /**
   * Array of objects with shape: `{
   *   text: ReactNode,
   *   type: One of: ['error', 'hint', 'success', 'screenreader-only']
   * }`
   */
  messages?: FormMessage[]

  variant?: 'simple' | 'toggle' // TODO: split toggle out to its own component

  size?: 'small' | 'medium' | 'large'

  layout?: 'stacked' | 'columns' | 'inline'

  /**
   * any children (ones that aren't `RadioInput` are passed through)
   */
  children?: React.ReactNode
}

type PropKeys = keyof RadioInputGroupOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type RadioInputGroupProps = RadioInputGroupOwnProps &
  OtherHTMLAttributes<RadioInputGroupOwnProps>

type RadioInputGroupState = {
  value?: string | number
}

const propTypes: PropValidators<PropKeys> = {
  name: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: controllable(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  messages: PropTypes.arrayOf(FormPropTypes.message),
  children: PropTypes.node,
  variant: PropTypes.oneOf(['simple', 'toggle']),
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

export type { RadioInputGroupProps, RadioInputGroupState }
export { propTypes, allowedProps }
