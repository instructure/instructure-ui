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

import type {
  AsElementType,
  PropValidators,
  OptionsItemTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type OptionsItemOwnProps = {
  as?: AsElementType
  variant?: 'default' | 'highlighted' | 'selected' | 'disabled'
  role?: string
  renderBeforeLabel?: React.ReactNode | ((...args: any[]) => any)
  renderAfterLabel?: React.ReactNode | ((...args: any[]) => any)
  children?: React.ReactNode | ((...args: any[]) => React.ReactNode)
}

type PropKeys = keyof OptionsItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type OptionsItemProps = OptionsItemOwnProps &
  WithStyleProps<OptionsItemTheme, OptionsItemStyle> &
  OtherHTMLAttributes<OptionsItemOwnProps>

type OptionsItemStyle = ComponentStyle<
  'item' | 'container' | 'content' | 'contentBefore' | 'contentAfter'
>

const propTypes: PropValidators<PropKeys> = {
  /**
   * Element type to render as
   */
  as: PropTypes.elementType,
  /**
   * The style variant of the item
   */
  variant: PropTypes.oneOf(['default', 'highlighted', 'selected', 'disabled']),
  /**
   * The aria role of the element
   */
  role: PropTypes.string,
  /**
   * Content to render before the label
   * (if you pass a function, it has the `props` as its parameter)
   */
  renderBeforeLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Content to render after the label
   * (if you pass a function, it has the `props` as its parameter)
   */
  renderAfterLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

const allowedProps: AllowedPropKeys = [
  'as',
  'variant',
  'role',
  'renderBeforeLabel',
  'renderAfterLabel',
  'children'
]

export type { OptionsItemProps, OptionsItemStyle }
export { propTypes, allowedProps }
