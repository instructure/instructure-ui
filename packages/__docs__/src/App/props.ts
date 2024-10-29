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
import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'
import type {
  MainIconsData,
  MainDocsData,
  ProcessedFile
} from '../../buildScripts/DataTypes.mts'
import type { DocDataType } from '../Document/props'

type AppOwnProps = {
  trayWidth: number
}

type PropKeys = keyof AppOwnProps
type AllowedPropKeys = Readonly<Array<PropKeys>>
type AppProps = AppOwnProps & WithStyleProps<AppTheme, AppStyle>

const propTypes = {
  trayWidth: PropTypes.number
}
const allowedProps: AllowedPropKeys = ['trayWidth']

type AppStyle = ComponentStyle<
  | 'app'
  | 'content'
  | 'legacyVersionAlert'
  | 'hamburger'
  | 'inlineNavigation'
  | 'globalStyles'
>

type AppTheme = {
  background: string
  color: string
  fontFamily: string
  fontFamilyMonospace: string
  lineHeight: string | number
  fontWeight: number
  codeBorderRadius: string | 0
  codeBackground: string
  shadow: string
  quotePadding: string
  quoteMargin: string
  borderWidth: string | 0
  borderStyle: string
  borderColor: string
  menuToggleZIndex: number
  navBorderColor: string
  navBorderWidth: string | 0
}

type LayoutSize = 'small' | 'medium' | 'large' | 'x-large'

type AppState = {
  themeKey?: string
  docsData: MainDocsData | null
  iconsData: MainIconsData | null
  layout: LayoutSize
  showMenu: boolean
  key?: string
  versionsData: any
  // changelog.md read from the JSON file
  changelogData?: DocData
  // the currently shown document
  currentDocData?: DocData
}

type DocData = ProcessedFile & {
  componentInstance: any
  children: DocDataType[]
}

export type { AppProps, AppState, DocData, LayoutSize, AppStyle, AppTheme }
export { propTypes, allowedProps }
