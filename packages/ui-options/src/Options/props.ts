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

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'

import type { AsElementType, PropValidators } from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'

type OptionsOwnProps = {
  as?: AsElementType
  role?: string
  elementRef?: (...args: any[]) => any
  renderLabel?: React.ReactNode | ((...args: any[]) => any)
  children?: React.ReactNode
}

type PropKeys = keyof OptionsOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type OptionsProps = OptionsOwnProps & WithStyleProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * Element type to render as
   */
  as: PropTypes.elementType,
  /**
   * The aria role of the element
   */
  role: PropTypes.string,
  /**
   * The the actual list element
   */
  elementRef: PropTypes.func,
  /**
   * Content to render as a label. Mostly for when the component is nested
   */
  renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: ChildrenPropTypes.oneOf(['Options', 'Item', 'Separator'])
}

const allowedProps: AllowedPropKeys = [
  'as',
  'role',
  'elementRef',
  'renderLabel',
  'children'
]

export type { OptionsProps }
export { propTypes, allowedProps }
