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

import { type InputHTMLAttributes } from 'react'
import type { FormMessage } from '@instructure/ui-form-field'
import type { OtherHTMLAttributes } from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

import { Checkbox } from '../Checkbox'
import type { CheckboxProps } from '../Checkbox/props'

type CheckboxChild = React.ComponentElement<CheckboxProps, Checkbox>

type CheckboxGroupOwnProps = {
  children?: CheckboxChild[] // TODO: oneOf([Checkbox])
  name: string
  description: React.ReactNode
  defaultValue?: (string | number)[]
  value?: (string | number)[] // TODO: controllable(PropTypes.array)
  onChange?: (value: (string | number)[]) => void
  disabled?: boolean
  readOnly?: boolean
  messages?: FormMessage[]
  size?: 'small' | 'medium' | 'large'
  layout?: 'stacked' | 'columns' | 'inline'
}

type PropKeys = keyof CheckboxGroupOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CheckboxGroupProps = CheckboxGroupOwnProps &
  OtherHTMLAttributes<
    CheckboxGroupOwnProps,
    InputHTMLAttributes<CheckboxGroupOwnProps & Element>
  > &
  WithDeterministicIdProps
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

type CheckboxGroupState = {
  value: (string | number)[]
}
export type { CheckboxGroupProps, CheckboxGroupState, CheckboxChild }
export { allowedProps }
