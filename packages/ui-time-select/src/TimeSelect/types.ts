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
import { FormMessage } from '@instructure/ui-form-field'
import {
  PlacementPropValues,
  PositionConstraint
} from '@instructure/ui-position'

export type TimeSelectProps = {
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  defaultToFirstOption?: boolean
  value?: any // TODO: controllable(I18nPropTypes.iso8601, 'onChange'),
  defaultValue?: string
  id?: string
  format?: string
  step?: 5 | 10 | 15 | 20 | 30 | 60
  interaction?: 'enabled' | 'disabled' | 'readonly'
  placeholder?: string
  isRequired?: boolean
  isInline?: boolean
  width?: string
  optionsMaxWidth?: string
  visibleOptionsCount?: number
  messages?: FormMessage[]
  placement?: PlacementPropValues
  constrain?: PositionConstraint
  onChange?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onShowOptions?: (...args: any[]) => any
  onHideOptions?: (...args: any[]) => any
  inputRef?: (...args: any[]) => any
  listRef?: (...args: any[]) => any
  renderEmptyOption?: React.ReactNode | ((...args: any[]) => any)
  renderBeforeInput?: React.ReactNode | ((...args: any[]) => any)
  renderAfterInput?: React.ReactNode | ((...args: any[]) => any)
  locale?: string
  timezone?: string
}
