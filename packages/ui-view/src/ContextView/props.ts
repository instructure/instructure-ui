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
import { PositionPropTypes } from '@instructure/ui-position'

import type {
  AsElementType,
  PropValidators,
  ContextViewTheme
} from '@instructure/shared-types'
import type { PlacementPropValues } from '@instructure/ui-position'
import type {
  Shadow,
  Spacing,
  Stacking,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type ContextViewOwnProps = {
  as?: AsElementType
  elementRef?: (...args: any[]) => any
  height?: string | number
  width?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  children?: React.ReactNode
  textAlign?: 'start' | 'center' | 'end'
  background?: 'default' | 'inverse'
  debug?: boolean
  margin?: Spacing
  padding?: Spacing
  shadow?: Shadow
  stacking?: Stacking
  placement?: PlacementPropValues
}

type PropKeys = keyof ContextViewOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ContextViewProps = ContextViewOwnProps &
  WithStyleProps<ContextViewTheme, ContextViewStyle>

type ContextViewStyle = ComponentStyle<
  | 'contextView'
  | 'contextView__content'
  | 'contextView__arrow'
  | 'arrowSize'
  | 'arrowBorderWidth'
>

const propTypes: PropValidators<PropKeys> = {
  /**
   * The element to render as the component root
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

  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The children to render inside the `<ContextView />`
   */
  children: PropTypes.node,

  /**
   * Designates the text alignment within the `<ContextView />`
   */
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Controls the shadow depth for the `<ContextView />`
   */
  shadow: ThemeablePropTypes.shadow,

  /**
   * Controls the z-index depth for the `<ContextView />`
   */
  stacking: ThemeablePropTypes.stacking,

  /**
   * Designates the background style of the `<ContextView />`
   */
  background: PropTypes.oneOf(['default', 'inverse']),

  /**
   * Specifies how the arrow for `<ContextView />` will be rendered.
   * Ex. `placement="top"` will render with an arrow pointing down.
   */
  placement: PositionPropTypes.placement,

  /**
   * Activate an outline around the component to make building your
   * layout easier
   */
  debug: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'as',
  'elementRef',
  'margin',
  'padding',
  'height',
  'width',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'children',
  'textAlign',
  'shadow',
  'stacking',
  'background',
  'placement',
  'debug'
]

export type { ContextViewProps, ContextViewStyle }
export { propTypes, allowedProps }
