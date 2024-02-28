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
  ToggleFacadeTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type ToggleFacadeOwnProps = {
  children: React.ReactNode
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  focused?: boolean
  size?: 'small' | 'medium' | 'large'
  labelPlacement?: 'top' | 'start' | 'end'
}

type PropKeys = keyof ToggleFacadeOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ToggleFacadeProps = ToggleFacadeOwnProps &
  WithStyleProps<ToggleFacadeTheme, ToggleFacadeStyle>

type ToggleFacadeStyle = ComponentStyle<
  'toggleFacade' | 'facade' | 'icon' | 'iconToggle' | 'iconSVG' | 'label'
>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  focused: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  labelPlacement: PropTypes.oneOf(['top', 'start', 'end'])
}

const allowedProps: AllowedPropKeys = [
  'children',
  'checked',
  'disabled',
  'readOnly',
  'focused',
  'size',
  'labelPlacement'
]

export type { ToggleFacadeProps, ToggleFacadeStyle }
export { propTypes, allowedProps }
