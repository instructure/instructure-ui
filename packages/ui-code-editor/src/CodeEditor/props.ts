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

import type { PropValidators, CodeEditorTheme } from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type CodeEditorOwnProps = {
  label: string
  language?:
    | 'sh'
    | 'js'
    | 'json'
    | 'javascript'
    | 'jsx'
    | 'shell'
    | 'css'
    | 'html'
    | 'markdown'
    | 'yaml'
    | 'yml'
    | 'bash'
  readOnly?: boolean
  onChange?: (...args: any[]) => any
  options?: any
  attachment?: 'bottom' | 'top'
  value?: string
}

type PropKeys = keyof CodeEditorOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CodeEditorProps = CodeEditorOwnProps &
  WithStyleProps<CodeEditorTheme, CodeEditorStyle>

type CodeEditorStyle = ComponentStyle<'codeEditor' | 'globalStyles'>

const propTypes: PropValidators<PropKeys> = {
  label: PropTypes.string.isRequired,
  language: PropTypes.oneOf([
    'sh',
    'js',
    'json',
    'javascript',
    'jsx',
    'shell',
    'css',
    'html',
    'markdown',
    'yaml',
    'yml',
    'bash'
  ]),
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.object,
  attachment: PropTypes.oneOf(['bottom', 'top']),
  /**
   * the selected value (when controlled via the `onChange` prop)
   */
  value: PropTypes.string
}

const allowedProps: AllowedPropKeys = [
  'label',
  'language',
  'readOnly',
  'onChange',
  'options',
  'attachment',
  'value'
]

export type { CodeEditorProps, CodeEditorStyle }
export { propTypes, allowedProps }
