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

import { FormMessage } from '@instructure/ui-form-field'
import { PlacementPropValues } from '@instructure/ui-position'

export type DateInputProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  renderLabel: React.ReactNode | ((...args: any[]) => any)
  value?: any // TODO: controllable(PropTypes.string)
  size?: 'small' | 'medium' | 'large'
  placeholder?: string
  onChange?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  interaction?: 'enabled' | 'disabled' | 'readonly'
  isRequired?: boolean
  isInline?: boolean
  assistiveText?: string
  layout?: 'stacked' | 'inline'
  width?: string
  inputRef?: (...args: any[]) => any
  messages?: FormMessage[]
  placement?: PlacementPropValues
  isShowingCalendar?: boolean
  onRequestValidateDate?: (...args: any[]) => any
  onRequestShowCalendar?: (...args: any[]) => any
  onRequestHideCalendar?: (...args: any[]) => any
  onRequestSelectNextDay?: (...args: any[]) => any
  onRequestSelectPrevDay?: (...args: any[]) => any
  onRequestRenderNextMonth?: (...args: any[]) => any
  onRequestRenderPrevMonth?: (...args: any[]) => any
  renderNavigationLabel?: ((...args: any[]) => any) | React.ReactNode
  renderWeekdayLabels: (((...args: any[]) => any) | React.ReactNode)[]
  renderNextMonthButton?: ((...args: any[]) => any) | React.ReactNode
  renderPrevMonthButton?: ((...args: any[]) => any) | React.ReactNode
}
