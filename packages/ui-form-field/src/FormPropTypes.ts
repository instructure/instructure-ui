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

import React from 'react'
import PropTypes from 'prop-types'

const formMessageTypePropType = PropTypes.oneOf([
  'error',
  'newError',
  'hint',
  'success',
  'screenreader-only'
])
const formMessageChildPropType = PropTypes.node

type FormMessageType =
  | 'newError'
  | 'error'
  | 'hint'
  | 'success'
  | 'screenreader-only'
// TODO it will be easier if this would be just a string
/**
 * The text to display in the form message
 */
type FormMessageChild = React.ReactNode

const FormPropTypes = {
  message: PropTypes.shape({
    type: formMessageTypePropType,
    text: formMessageChildPropType
  })
}

type FormMessage = {
  type: FormMessageType
  text: FormMessageChild
}

export default FormPropTypes
export { FormPropTypes, formMessageTypePropType, formMessageChildPropType }
export type { FormMessage, FormMessageType, FormMessageChild }
