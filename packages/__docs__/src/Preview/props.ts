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
  Spacing,
  Border
} from '@instructure/shared-types'
import PropTypes from 'prop-types'
import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'
import { MainDocsData } from '../../buildScripts/DataTypes'

type PreviewOwnProps = {
  code: string
  render?: boolean
  language: string
  fullscreen?: boolean
  frameless?: boolean
  inverse?: boolean
  rtl?: boolean
  background?:
    | 'checkerboard'
    | 'checkerboard-inverse'
    | 'inverse'
    | 'light'
    | 'none'
  themeKey?: keyof MainDocsData['themes']
  themes?: MainDocsData['themes']
  error?: string
}

type PropKeys = keyof PreviewOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PreviewProps = PreviewOwnProps & WithStyleProps<PreviewTheme, PreviewStyle>

type PreviewTheme = {
  padding: Spacing['small']
  borderRadius: Border['radiusMedium']
  backgroundColorLight: Colors['backgroundLightest']
  backgroundColorInverse: Colors['backgroundDarkest']
  borderWidth: Border['widthSmall']
  borderColor: string
  gradientCheckerboardSize: string
  gradientCheckerboard: string
  gradientCheckerboardInverse: string
  fontFamilyError: 'Menlo, Consolas, Monaco, "Andale Mono", monospace'
  fontSizeError: Typography['fontSizeSmall']
  backgroundError: Colors['backgroundDanger']
  colorError: Colors['textLightest']
  toolbarColor: Colors['textLightest']
  toolbarBackground: string
}
export type PreviewStyle = ComponentStyle<'preview' | 'previewError' | 'error'>

const propTypes: PropValidators<PropKeys> = {
  code: PropTypes.string.isRequired,
  render: PropTypes.bool,
  language: PropTypes.string.isRequired,
  fullscreen: PropTypes.bool,
  frameless: PropTypes.bool,
  inverse: PropTypes.bool,
  rtl: PropTypes.bool,
  background: PropTypes.oneOf([
    'checkerboard',
    'checkerboard-inverse',
    'inverse',
    'light',
    'none'
  ]),
  themes: PropTypes.object,
  themeKey: PropTypes.string
}
type PreviewState = {
  error: string | null
  elToRender: React.ReactElement | null
}
const allowedProps: AllowedPropKeys = [
  'code',
  'render',
  'language',
  'fullscreen',
  'frameless',
  'inverse',
  'rtl',
  'background',
  'themes',
  'themeKey'
]
export type { PreviewProps, PreviewTheme, PreviewState }
export { propTypes, allowedProps }
