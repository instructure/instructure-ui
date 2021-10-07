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
import { ThemeablePropTypes } from '@instructure/emotion'

import { ListItem } from './ListItem'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  PropValidators,
  ListTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'

type ListOwnProps = {
  children?: React.ReactNode // TODO: oneOf([ListItem])
  as?: 'ul' | 'ol'
  delimiter?: 'none' | 'dashed' | 'solid'
  isUnstyled?: boolean
  margin?: Spacing
  size?: 'small' | 'medium' | 'large'
  itemSpacing?:
    | 'none'
    | 'xxx-small'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof ListOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ListProps = ListOwnProps &
  WithStyleProps<ListTheme, ListStyle> &
  OtherHTMLAttributes<ListOwnProps>

type ListStyle = ComponentStyle<'list'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * Only accepts `<List.Item>` as a child
   */
  children: ChildrenPropTypes.oneOf([ListItem]),
  as: PropTypes.oneOf(['ul', 'ol']),
  /**
   * One of: none, dashed, solid
   */
  delimiter: PropTypes.oneOf(['none', 'dashed', 'solid']),
  /**
   * When set, renders the List Items without a list style type.
   */
  isUnstyled: PropTypes.bool,
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Sets the margin separating each ListItem.
   */
  itemSpacing: PropTypes.oneOf([
    'none',
    'xxx-small',
    'xx-small',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large'
  ]),
  /**
   * provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'as',
  'delimiter',
  'isUnstyled',
  'margin',
  'size',
  'itemSpacing',
  'elementRef'
]

export type { ListProps, ListStyle }
export { propTypes, allowedProps }
