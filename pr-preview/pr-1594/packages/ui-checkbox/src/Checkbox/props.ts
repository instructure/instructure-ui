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

import { FormPropTypes } from '@instructure/ui-form-field'
import { controllable } from '@instructure/ui-prop-types'

import type { FormMessage } from '@instructure/ui-form-field'
import type {
  CheckboxFacadeTheme,
  OtherHTMLAttributes,
  PropValidators,
  ToggleFacadeTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type CheckboxOwnProps = {
  label: React.ReactNode
  id?: string
  value?: string | number
  /**
   * Array of objects with shape: `{
   *   text: ReactNode,
   *   type: One of: ['error', 'hint', 'success', 'screenreader-only']
   *   }`
   */
  messages?: FormMessage[]
  /* whether to set the input to checked or not on initial render */
  defaultChecked?: boolean
  /**
   * whether the input is checked or not (must be accompanied by an `onChange` prop)
   */
  checked?: boolean // TODO: controllable(PropTypes.bool, 'onChange', 'defaultChecked')
  /**
   * when used with the `checked` prop, the component will not control its own state
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onMouseOver?: (e: React.MouseEvent<HTMLInputElement>) => void
  onMouseOut?: (e: React.MouseEvent<HTMLInputElement>) => void
  /**
   * Whether or not to disable the checkbox
   */
  disabled?: boolean
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly?: boolean
  /**
   * Visual state showing that child checkboxes are a combination of checked and unchecked
   */
  indeterminate?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'simple' | 'toggle'
  inline?: boolean
  labelPlacement?: 'top' | 'start' | 'end'
}

type PropKeys = keyof CheckboxOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CheckboxProps = CheckboxOwnProps &
  WithStyleProps<CheckboxFacadeTheme | ToggleFacadeTheme, CheckboxStyle> &
  OtherHTMLAttributes<CheckboxOwnProps> & WithDeterministicIdProps

type CheckboxStyle = ComponentStyle<'checkbox' | 'input' | 'control'>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.node.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  messages: PropTypes.arrayOf(FormPropTypes.message),
  defaultChecked: PropTypes.bool,
  checked: controllable(PropTypes.bool, 'onChange', 'defaultChecked'),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  indeterminate: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['simple', 'toggle']),
  inline: PropTypes.bool,
  labelPlacement: PropTypes.oneOf(['top', 'start', 'end'])
}

const allowedProps: AllowedPropKeys = [
  'label',
  'id',
  'value',
  'messages',
  'defaultChecked',
  'checked',
  'onChange',
  'onKeyDown',
  'onFocus',
  'onBlur',
  'onMouseOver',
  'onMouseOut',
  'disabled',
  'readOnly',
  'indeterminate',
  'size',
  'variant',
  'inline',
  'labelPlacement'
]

type CheckboxState = {
  focused: boolean
  hovered: boolean
  checked?: boolean
}

export type { CheckboxProps, CheckboxStyle, CheckboxState }
export { propTypes, allowedProps }
