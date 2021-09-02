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

import { FormPropTypes } from '@instructure/ui-form-field'
import {
  controllable,
  Children as ChildrenPropTypes
} from '@instructure/ui-prop-types'

import type { FormMessage } from '@instructure/ui-form-field'
import type { PropValidators } from '@instructure/shared-types'

import { Checkbox } from '../Checkbox'

type CheckboxGroupOwnProps = {
  children?: React.ReactNode // TODO: oneOf([Checkbox])
  name: string
  description: React.ReactNode
  defaultValue?: any[]
  value?: any // TODO: controllable(PropTypes.array)
  onChange?: (...args: any[]) => any
  disabled?: boolean
  readOnly?: boolean
  messages?: FormMessage[]
  size?: 'small' | 'medium' | 'large'
  layout?: 'stacked' | 'columns' | 'inline'
}

type PropKeys = keyof CheckboxGroupOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CheckboxGroupProps = CheckboxGroupOwnProps

const propTypes: PropValidators<PropKeys> = {
  name: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  /**
   * value to set on initial render
   */
  defaultValue: PropTypes.array,
  /**
   * the selected values (must be accompanied by an `onChange` prop)
   */
  value: controllable(PropTypes.array),
  /**
   * when used with the `value` prop, the component will not control its own state
   */
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  /**
   * object with shape: `{
    text: PropTypes.string,
    type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
      }`
   */
  messages: PropTypes.arrayOf(FormPropTypes.message),
  /**
   * children of type `Checkbox`
   */
  children: ChildrenPropTypes.oneOf([Checkbox]),
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
  'size',
  'layout'
]

export type { CheckboxGroupProps }
export { propTypes, allowedProps }
