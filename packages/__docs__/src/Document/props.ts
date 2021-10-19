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
import { DocPropType } from '../propTypes'
import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'
import type {
  PropValidators,
  BaseThemeVariables
} from '@instructure/shared-types'

type DocType = {
  id: string
  description: string
  srcUrl: string
  srcPath: string
  esPath: string
  displayName: string
  packageName: string
  children: any[]
  sections: any[]
  legacyGitBranch: any
  params: any
  returns: any
  methods: any
  props: any
  title: string
  extension: string
  componentInstance?: any
}

type DocumentOwnProps = {
  doc: DocType
  description: string
  themeVariables?: BaseThemeVariables
  repository?: string
  layout?: string
}

type PropKeys = keyof DocumentOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DocumentProps = DocumentOwnProps &
  WithStyleProps<DocumentTheme, DocumentStyle>

const propTypes: PropValidators<PropKeys> = {
  doc: DocPropType.isRequired,
  description: PropTypes.string,
  themeVariables: PropTypes.object,
  repository: PropTypes.string,
  layout: PropTypes.string
}

type DocumentStyle = ComponentStyle<'githubCornerColor'>
type DocumentTheme = {
  githubCornerColor: string
}
const allowedProps: AllowedPropKeys = [
  'description',
  'doc',
  'layout',
  'repository',
  'themeVariables'
]
export { propTypes, allowedProps }
export type { DocumentProps, DocType, DocumentStyle, DocumentTheme }
