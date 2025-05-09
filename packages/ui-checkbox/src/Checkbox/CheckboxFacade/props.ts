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

import type {
  PropValidators,
  CheckboxFacadeTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type CheckboxFacadeOwnProps = {
  children: React.ReactNode
  checked?: boolean
  focused?: boolean
  hovered?: boolean
  size?: 'small' | 'medium' | 'large'
  /**
   * Visual state showing that child checkboxes are a combination of checked and unchecked
   */
  indeterminate?: boolean
  /**
   * Indicate if the parent component (`Checkbox`) is invalid to set the style accordingly.
   */
  invalid?: boolean
}

type PropKeys = keyof CheckboxFacadeOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CheckboxFacadeProps = CheckboxFacadeOwnProps &
  WithStyleProps<CheckboxFacadeTheme, CheckboxFacadeStyle>

type CheckboxFacadeStyle = ComponentStyle<'checkboxFacade' | 'facade' | 'label'>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  focused: PropTypes.bool,
  hovered: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  indeterminate: PropTypes.bool,
  invalid: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'children',
  'checked',
  'focused',
  'hovered',
  'size',
  'indeterminate'
]

export type { CheckboxFacadeProps, CheckboxFacadeStyle }
export { propTypes, allowedProps }
