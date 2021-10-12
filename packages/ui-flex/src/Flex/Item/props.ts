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

import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  AsElementType,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type FlexItemOwnProps = {
  children?: React.ReactNode
  as?: AsElementType
  elementRef?: (element: Element | null) => void
  margin?: Spacing
  padding?: Spacing
  align?: 'center' | 'start' | 'end' | 'stretch'
  direction?: 'row' | 'column'
  textAlign?: 'start' | 'center' | 'end'
  overflowX?: 'auto' | 'hidden' | 'visible'
  overflowY?: 'auto' | 'hidden' | 'visible'
  shouldGrow?: boolean
  shouldShrink?: boolean
  size?: string
  withVisualDebug?: boolean
}

type PropKeys = keyof FlexItemOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type FlexItemProps = FlexItemOwnProps &
  WithStyleProps<null, FlexItemStyle> &
  OtherHTMLAttributes<FlexItemOwnProps>

type FlexItemStyle = ComponentStyle<'flexItem'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * The children to render inside the Item`
   */
  children: PropTypes.node,
  /**
   * the element type to render as
   */
  as: PropTypes.elementType,
  /**
   * provides a reference to the underlying html root element
   */
  elementRef: PropTypes.func,
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  /**
   * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
   */
  padding: ThemeablePropTypes.spacing,
  /**
   * overrides the parent Flex's alignItems prop, if needed
   */
  align: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
  /**
   * Inherits from the parent Flex component
   */
  direction: PropTypes.oneOf(['row', 'column']),
  /**
   * Designates the text alignment inside the Item
   */
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * Handles horizontal overflow
   */
  overflowX: PropTypes.oneOf(['auto', 'hidden', 'visible']),
  /**
   * Handles vertical overflow
   */
  overflowY: PropTypes.oneOf(['auto', 'hidden', 'visible']),
  /**
   * Should the FlexItem grow to fill any available space?
   */
  shouldGrow: PropTypes.bool,
  /**
   * Should the FlexItem shrink (stopping at its `size`)?
   */
  shouldShrink: PropTypes.bool,
  /**
   * Sets the base size of the FlexItem (width if direction is `row`; height if direction is `column`)
   */
  size: PropTypes.string,
  /**
   * Places dashed lines around the component's borders to help debug your layout
   */
  withVisualDebug: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'children',
  'as',
  'elementRef',
  'margin',
  'padding',
  'align',
  'direction',
  'textAlign',
  'overflowX',
  'overflowY',
  'shouldGrow',
  'shouldShrink',
  'size',
  'withVisualDebug'
]

export type { FlexItemProps, FlexItemStyle }
export { propTypes, allowedProps }
