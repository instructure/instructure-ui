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
import type { PropValidators } from '@instructure/shared-types'
import { ThemeablePropTypes } from '@instructure/emotion'
import type { Spacing } from '@instructure/emotion'

type ContentWrapOwnProps = {
  children?: typeof PropTypes.node
  maxWidth?: string | number | undefined
  padding?: Spacing | undefined
}

type PropKeys = keyof ContentWrapOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ContentWrapProps = ContentWrapOwnProps

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node,
  maxWidth: PropTypes.string,
  padding: ThemeablePropTypes.spacing
}

const allowedProps: AllowedPropKeys = ['children', 'maxWidth', 'padding']
export type { ContentWrapProps, AllowedPropKeys }
export { propTypes, allowedProps }
