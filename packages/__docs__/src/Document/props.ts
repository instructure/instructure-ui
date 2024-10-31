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
import { DocData } from '../App/props'

type DocDataType = DocData & { legacyGitBranch?: string }

type DocumentOwnProps = {
  doc: DocDataType
  description: string
  themeVariables?: BaseThemeVariables
  repository?: string
  layout?: 'small' | 'medium' | 'large' | 'x-large'
}

type PropKeys = keyof DocumentOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DocumentProps = DocumentOwnProps & WithStyleProps<null, DocumentStyle>

const propTypes: PropValidators<PropKeys> = {
  doc: DocPropType.isRequired,
  description: PropTypes.string,
  themeVariables: PropTypes.object,
  repository: PropTypes.string,
  layout: PropTypes.oneOf(['small', 'medium', 'large', 'x-large'])
}

type DocumentStyle = ComponentStyle<'githubCornerOctoArm' | 'githubCorner'>

type DocumentState = {
  selectedDetailsTabIndex: number
  pageRef: HTMLDivElement | null
}

const allowedProps: AllowedPropKeys = [
  'description',
  'doc',
  'layout',
  'repository',
  'themeVariables'
]

export { propTypes, allowedProps }
export type { DocumentProps, DocumentStyle, DocumentState, DocDataType }
