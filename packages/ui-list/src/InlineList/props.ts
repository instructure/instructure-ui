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
import { InlineListItem } from './InlineListItem'

import type { Spacing } from '@instructure/emotion'
import type {
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'

type InlineListOwnProps = {
  /**
   * Only accepts `<InlineList.Item>` as a child
   */
  children?: InlineListItem
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  as?: 'ul' | 'ol'
  margin?: Spacing
  size?: 'small' | 'medium' | 'large'
  delimiter?: 'none' | 'pipe' | 'slash' | 'arrow'
  /**
   * Sets the margin separating each ListItem.
   */
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
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof InlineListOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type InlineListProps = InlineListOwnProps &
  OtherHTMLAttributes<InlineListOwnProps>

const propTypes: PropValidators<PropKeys> = {
  children: ChildrenPropTypes.oneOf([InlineListItem]),
  as: PropTypes.oneOf(['ul', 'ol']),
  margin: ThemeablePropTypes.spacing,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  delimiter: PropTypes.oneOf(['none', 'pipe', 'slash', 'arrow']),
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
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'as',
  'margin',
  'size',
  'delimiter',
  'itemSpacing',
  'elementRef'
]

export type { InlineListProps }
export { propTypes, allowedProps }
