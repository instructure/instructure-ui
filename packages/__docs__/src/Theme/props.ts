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
import type {
  PropValidators,
  Colors,
  Typography,
  BaseTheme
} from '@instructure/shared-types'
import PropTypes from 'prop-types'
import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'

type ThemeOwnProps = {
  themeKey: string
  variables: BaseTheme
  requirePath: string
}

type PropKeys = keyof ThemeOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ThemeProps = ThemeOwnProps & WithStyleProps<ThemeTheme, ThemeStyle>

type ThemeTheme = {
  convertedValueTextColor: Colors['contrasts']['grey100100']
  convertedValueFontSize: Typography['fontSizeSmall']
}
export type ThemeStyle = ComponentStyle<'convertedValue'>

const propTypes: PropValidators<PropKeys> = {
  themeKey: PropTypes.string.isRequired,
  variables: PropTypes.object.isRequired,
  requirePath: PropTypes.string.isRequired
}

const allowedProps: AllowedPropKeys = ['themeKey', 'variables', 'requirePath']
export type { ThemeProps, ThemeTheme }
export { propTypes, allowedProps }
