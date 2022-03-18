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

import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'
import type { PropValidators, Breakpoints } from '@instructure/shared-types'
import PropTypes from 'prop-types'

type IconsOwnProps = {
  selectedFormat: string
  formats: Record<string, any>
  packageName: string
}

type PropKeys = keyof IconsOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type IconsProps = IconsOwnProps & WithStyleProps<IconsTheme, IconsStyle>

const propTypes: PropValidators<PropKeys> = {
  selectedFormat: PropTypes.string.isRequired,
  formats: PropTypes.object.isRequired,
  packageName: PropTypes.string.isRequired
}

const allowedProps: AllowedPropKeys = [
  'formats',
  'packageName',
  'selectedFormat'
]

type IconsStyle = ComponentStyle<'header' | 'glyphs'>

type IconsTheme = {
  gridMaxWidth: Breakpoints['xLarge']
  gridBreakpoint: Breakpoints['small']
}
type IconsState = {
  query: string
  name: string | null
  variant: string | null
  glyph: Record<string, any> | null
  rtl: boolean
}
export type { IconsStyle, IconsTheme }
export type { IconsProps, IconsState }
export { allowedProps, propTypes }
