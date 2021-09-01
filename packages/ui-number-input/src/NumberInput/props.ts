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

import type { FormMessage } from '@instructure/ui-form-field'
import type { InteractionType } from '@instructure/ui-react-utils'

export type NumberInputProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  id?: string
  interaction?: InteractionType
  messages?: FormMessage[]
  placeholder?: string
  isRequired?: boolean
  showArrows?: boolean
  size?: 'medium' | 'large'
  value?: string | number
  width?: string
  display?: 'inline-block' | 'block'
  inputRef?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
  onDecrement?: (...args: any[]) => any
  onIncrement?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  inputMode?: 'numeric' | 'decimal' | 'tel'
}

export type NumberInputState = {
  hasFocus: boolean
}

export type NumberInputStyleProps = NumberInputState & {
  interaction: InteractionType
  invalid: boolean
}
