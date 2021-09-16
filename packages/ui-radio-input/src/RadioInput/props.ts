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

import type { PropValidators, RadioInputTheme } from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type RadioInputOwnProps = {
  label: React.ReactNode
  value?: string | number
  id?: string
  name?: string
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  variant?: 'simple' | 'toggle'
  size?: 'small' | 'medium' | 'large'
  context?: 'success' | 'warning' | 'danger' | 'off'
  inline?: boolean
  onClick?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
}

type PropKeys = keyof RadioInputOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type RadioInputProps = RadioInputOwnProps &
  WithStyleProps<RadioInputTheme, RadioInputStyle>

type RadioInputStyle = ComponentStyle<
  'radioInput' | 'input' | 'control' | 'facade' | 'label'
>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  /**
   * Whether or not to disable the input
   */
  disabled: PropTypes.bool,
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly: PropTypes.bool,
  variant: PropTypes.oneOf(['simple', 'toggle']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  context: PropTypes.oneOf(['success', 'warning', 'danger', 'off']),
  inline: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'label',
  'value',
  'id',
  'name',
  'checked',
  'disabled',
  'readOnly',
  'variant',
  'size',
  'context',
  'inline',
  'onClick',
  'onChange'
]

export type { RadioInputProps, RadioInputStyle }
export { propTypes, allowedProps }
