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
  Colors,
  Typography,
  Spacing,
  Border
} from '@instructure/shared-types'

import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'

import type { MainDocsData } from '../../buildScripts/DataTypes.mjs'

type PreviewOwnProps = {
  code: string
  language: string
  fullscreen?: boolean
  frameless?: boolean
  inverse?: boolean
  rtl?: boolean
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
  backgroundColor: Colors['contrasts']['white1010']
  borderWidth: Border['widthSmall']
  borderColor: string
  fontFamilyError: 'Menlo, Consolas, Monaco, "Andale Mono", monospace'
  fontSizeError: Typography['fontSizeSmall']
  backgroundError: Colors['contrasts']['red4570']
  colorError: Colors['contrasts']['white1010']
}
export type PreviewStyle = ComponentStyle<'preview' | 'previewError' | 'error'>

type PreviewState = {
  error: string | null
}
const allowedProps: AllowedPropKeys = [
  'code',
  'language',
  'fullscreen',
  'frameless',
  'inverse',
  'rtl',
  'themes',
  'themeKey'
]
export type { PreviewProps, PreviewTheme, PreviewState }
export { allowedProps }
