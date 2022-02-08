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
import type {
  PropValidators,
  Border,
  Typography
} from '@instructure/shared-types'
import PropTypes from 'prop-types'

type PlaygroundOwnProps = {
  styles?: PlaygroundStyle
  title: string
  code: string
  language: string
  render: boolean
  background:
    | 'checkerboard'
    | 'checkerboard-inverse'
    | 'light'
    | 'inverse'
    | 'none'
  readOnly?: boolean
}

type PropKeys = keyof PlaygroundOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PlaygroundProps = PlaygroundOwnProps &
  WithStyleProps<PlaygroundTheme, PlaygroundStyle>

type PlaygroundStyle = ComponentStyle<'playground' | 'close'>
type PlaygroundTheme = {
  editorBorderRadius: Border['radiusMedium']
  fontSize: Typography['fontSizeMedium']
}
const propTypes: PropValidators<PropKeys> = {
  styles: PropTypes.object,
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  render: PropTypes.bool,
  background: PropTypes.oneOf([
    'checkerboard',
    'checkerboard-inverse',
    'light',
    'inverse',
    'none'
  ]),
  readOnly: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'background',
  'code',
  'language',
  'readOnly',
  'render',
  'styles',
  'title'
]

export type PlaygroundState = {
  defaultCode: string
  code: string
  fullscreen: boolean
  showCode: boolean
  rtl: boolean
}
export type { PlaygroundProps, PlaygroundStyle, PlaygroundTheme }
export { propTypes, allowedProps }
