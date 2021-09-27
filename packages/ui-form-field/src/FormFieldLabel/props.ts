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
  AsElementType,
  PropValidators,
  FormFieldLabelTheme
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type FormFieldLabelOwnProps = {
  as?: AsElementType
  children: React.ReactNode
}

type PropKeys = keyof FormFieldLabelOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FormFieldLabelProps = FormFieldLabelOwnProps &
  WithStyleProps<FormFieldLabelTheme, FormFieldLabelStyle>

type FormFieldLabelStyle = ComponentStyle<'formFieldLabel'>

const propTypes: PropValidators<PropKeys> = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired
}

const allowedProps: AllowedPropKeys = ['as', 'children']

export type { FormFieldLabelProps, FormFieldLabelStyle }
export { propTypes, allowedProps }
