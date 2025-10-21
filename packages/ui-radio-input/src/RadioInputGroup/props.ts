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

import type {
  WithStyleProps,
  ComponentStyle,
  Spacing
} from '@instructure/emotion'
import type { FormMessage } from '@instructure/ui-form-field'
import type {
  OtherHTMLAttributes,
  RadioInputGroupTheme
} from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type RadioInputGroupOwnProps = {
  /**
   * This prop sets the
   * [same low level HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#defining_a_radio_group)
   *
   * **Must be unique across the DOM** otherwise groups will interfere with
   * each other
   */
  name: string

  /**
   * The text above the radio group. Use `ScreenReaderContent` if you don't want it to be visible.
   */
  description: React.ReactNode

  /**
   * value to set on initial render
   */
  defaultValue?: string | number

  /**
   * the selected value (must be accompanied by an `onChange` prop)
   */
  value?: string | number

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
   *   type: One of: ['error', 'newError', 'hint', 'success', 'screenreader-only']
   * }`
   */
  messages?: FormMessage[]

  variant?: 'simple' | 'toggle'

  size?: 'small' | 'medium' | 'large'

  layout?: 'stacked' | 'columns' | 'inline'

  /**
   * any children (ones that aren't `RadioInput` are passed through)
   */
  children?: React.ReactNode

  /**
   * Setting this to `true` adds and asterisk after the description (group label). It does not cause any behavioural change.
   */
  isRequired?: boolean

  /**
   * Margin around the component. Accepts a `Spacing` token. See token values and example usage in [this guide](https://instructure.design/#layout-spacing).
   */
  margin?: Spacing
}

type PropKeys = keyof RadioInputGroupOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type RadioInputGroupProps = RadioInputGroupOwnProps &
  WithStyleProps<RadioInputGroupTheme, RadioInputGroupStyle> &
  OtherHTMLAttributes<RadioInputGroupOwnProps> &
  WithDeterministicIdProps

type RadioInputGroupState = {
  value?: string | number
}

type RadioInputGroupStyle = ComponentStyle<'invalidAsterisk'>
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
  'layout',
  'isRequired',
  'margin'
]

export type { RadioInputGroupProps, RadioInputGroupState, RadioInputGroupStyle }
export { allowedProps }
