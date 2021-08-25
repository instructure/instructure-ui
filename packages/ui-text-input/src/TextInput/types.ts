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
import { InteractionType } from '@instructure/ui-react-utils'
import { FormMessage } from '@instructure/ui-form-field'

export type TextInputProps = {
  renderLabel?: React.ReactNode | ((...args: any[]) => any)
  type?: 'text' | 'email' | 'url' | 'tel' | 'search' | 'password'
  id?: string
  value?: any // TODO: controllable(PropTypes.string)
  defaultValue?: string
  interaction?: InteractionType
  messages?: FormMessage[]
  size?: 'small' | 'medium' | 'large'
  textAlign?: 'start' | 'center'
  width?: string
  htmlSize?: string | number
  display?: 'inline-block' | 'block'
  shouldNotWrap?: boolean
  placeholder?: string
  isRequired?: boolean
  inputRef?: (...args: any[]) => any
  inputContainerRef?: (...args: any[]) => any
  renderBeforeInput?: React.ReactNode | ((...args: any[]) => any)
  renderAfterInput?: React.ReactNode | ((...args: any[]) => any)
  onChange?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  makeStyles?: (...args: any[]) => any
  styles?: any
}

export type TextInputState = {
  hasFocus: boolean
}

export type TextInputStyleProps = {
  disabled: boolean
  invalid: boolean
  focused: TextInputState['hasFocus']
}
