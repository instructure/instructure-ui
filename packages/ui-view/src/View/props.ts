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

import { cursor as cursorPropTypes } from '@instructure/ui-prop-types'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'
import type { Cursor } from '@instructure/ui-prop-types'
import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  AsElementType,
  OtherHTMLAttributes,
  PropValidators,
  ViewTheme
} from '@instructure/shared-types'
import type {
  WithStyleProps,
  Spacing,
  BorderWidth,
  BorderRadii,
  Shadow,
  Stacking,
  ComponentStyle,
  StyleObject
} from '@instructure/emotion'

type BorderColor =
  | string
  | 'transparent'
  | 'primary'
  | 'secondary'
  | 'brand'
  | 'info'
  | 'success'
  | 'warning'
  | 'alert'
  | 'danger'

type ViewOwnProps = {
  /**
   * The element to render as the component root, `span` by default
   */
  as?: AsElementType
  /**
   * provides a reference to the underlying html element
   */
  elementRef?: (element: Element | null) => void
  /**
   * By default the display prop is 'auto', meaning it takes on the
   * display rules of the html element it's rendered as (see `as` prop).
   */
  display?:
    | 'auto'
    | 'inline'
    | 'block'
    | 'inline-block'
    | 'flex'
    | 'inline-flex'
  overflowX?: 'auto' | 'hidden' | 'visible'
  overflowY?: 'auto' | 'hidden' | 'visible'
  height?: string | number
  width?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  /**
   * The children to render inside the <View />
   */
  children?: React.ReactNode
  /**
   * Designates the text alignment within the `<View />`
   */
  textAlign?: 'start' | 'center' | 'end'
  /**
   * Sets the color of the View border.
   * Accepts a color string value (e.g., "#FFFFFF", "red") or one of the predefined theme color options.
   */
  borderColor?: BorderColor
  /**
   * Designates the background style of the `<View />`
   */
  background?:
    | 'transparent'
    | 'primary'
    | 'secondary'
    | 'primary-inverse'
    | 'brand'
    | 'info'
    | 'alert'
    | 'success'
    | 'danger'
    | 'warning'
  /**
   * Specify a value for the CSS position property. Use `relative` if `focusable` will be true.
   */
  position?: 'static' | 'absolute' | 'relative' | 'sticky' | 'fixed'
  /**
   * The `left` CSS property in left-to-right interfaces. Will not do anything if `position === "static"`.
   */
  insetInlineStart?: string
  /**
   * The `right` CSS property in left-to-right interfaces. Will not do anything if `position === "static"`.
   */
  insetInlineEnd?: string
  /**
   * The `top` CSS property. Will not do anything if `position === "static"`.
   */
  insetBlockStart?: string
  /**
   * The `bottom` CSS property. Will not do anything if `position === "static"`.
   */
  insetBlockEnd?: string
  /**
   * Manually control if the `View` should display a focus outline.
   *
   * When left `undefined` (which is the default) the focus outline will display
   * automatically if the `View` is focusable and receives focus.
   */
  withFocusOutline?: boolean
  /**
   * Determines whether the focus outline displays offset or inset from the focused View
   */
  focusPosition?: 'offset' | 'inset'
  /**
   * Determines the color of the focus outline
   */
  focusColor?: 'info' | 'inverse' | 'success' | 'danger'
  /**
   * Determines if the focus ring should animate when it appears
   */
  shouldAnimateFocus?: boolean
  /**
   * Activate a dotted outline around the component to make building your
   * layout easier
   */
  withVisualDebug?: boolean

  dir?: 'ltr' | 'rtl'
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
   */
  padding?: Spacing
  /**
   * Accepts the familiar CSS shorthand to designate border widths corresponding
   * to edges
   */
  borderWidth?: BorderWidth
  /**
   * Accepts `small`, `medium`, `large`, `circle`, and `pill`. Border radius can be
   * assigned to individual corners in CSS shorthand style (e.g., `"medium large none pill"`).
   * Also accepts valid CSS length values like `1rem` or `12px`
   */
  borderRadius?: BorderRadii
  /**
   * Controls the shadow depth for the `<View />`
   */
  shadow?: Shadow

  /**
   * Controls the z-index depth for the `<View />`
   */
  stacking?: Stacking
  /**
   * Specify a mouse cursor to use when hovering over the `<View />`
   */
  cursor?: Cursor
  /**
   * Sets what a browser does when reaching the boundary of a scrolling area.
   * Valid values are `auto`, `contain`, `none`.
   */
  overscrollBehavior?: 'auto' | 'contain' | 'none'
  /**
   * DEPRECATED, this prop does nothing. Use the focusOutlineOffset theme
   * variable
   *
   * Sets the radius of the focus border ring.
   *
   * For offset type, the given value is increased by the difference between the focus ring' offset and the focus ring's width.
   *
   * For inset type, the given value is decreased by the sum of the focus ring' offset and the focus ring's width.
   */
  focusRingBorderRadius?: string
  /**
   * Display the focus ring when any of the descendants is focused.
   * (uses the [:focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)
   * CSS selector)
   */
  focusWithin?: boolean
}

type PropKeys = keyof ViewOwnProps

type ViewProps = ViewOwnProps &
  WithStyleProps<ViewTheme, ViewStyle> &
  OtherHTMLAttributes<ViewOwnProps>

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ViewStyle = ComponentStyle<'view'> & {
  inlineStyles: StyleObject
}

const propTypes: PropValidators<PropKeys> = {
  as: PropTypes.elementType,
  elementRef: PropTypes.func,
  display: PropTypes.oneOf([
    'auto',
    'inline',
    'block',
    'inline-block',
    'flex',
    'inline-flex'
  ]),
  overflowX: PropTypes.oneOf(['auto', 'hidden', 'visible']),
  overflowY: PropTypes.oneOf(['auto', 'hidden', 'visible']),
  margin: PropTypes.string,
  padding: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  textAlign: PropTypes.oneOf(['start', 'center', 'end']),
  borderWidth: ThemeablePropTypes.borderWidth,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  background: PropTypes.oneOf([
    'transparent',
    'primary',
    'secondary',
    'primary-inverse',
    'brand',
    'info',
    'alert',
    'success',
    'danger',
    'warning'
  ]),
  shadow: ThemeablePropTypes.shadow,
  stacking: ThemeablePropTypes.stacking,
  cursor: cursorPropTypes,
  position: PropTypes.oneOf([
    'static',
    'absolute',
    'relative',
    'sticky',
    'fixed'
  ]),
  insetInlineStart: PropTypes.string,
  insetInlineEnd: PropTypes.string,
  insetBlockStart: PropTypes.string,
  insetBlockEnd: PropTypes.string,
  withFocusOutline: PropTypes.bool,
  focusPosition: PropTypes.oneOf(['offset', 'inset']),
  focusColor: PropTypes.oneOf(['info', 'inverse', 'success', 'danger']),
  shouldAnimateFocus: PropTypes.bool,
  withVisualDebug: PropTypes.bool,
  dir: PropTypes.oneOf(Object.values(textDirectionContextConsumer.DIRECTION)),
  overscrollBehavior: PropTypes.oneOf(['auto', 'contain', 'none']),
  focusRingBorderRadius: PropTypes.string,
  focusWithin: PropTypes.bool
}

// This variable will be attached as static property on the `View` component
// so we don't rely on the `PropTypes` validators for our internal logic.
// This means on prod builds the consuming applications can safely delete propTypes.
const allowedProps: AllowedPropKeys = [
  'as',
  'background',
  'borderColor',
  'borderRadius',
  'borderWidth',
  'children',
  'cursor',
  'dir',
  'display',
  'elementRef',
  'focusColor',
  'focusPosition',
  'height',
  'insetBlockEnd',
  'insetBlockStart',
  'insetInlineEnd',
  'insetInlineStart',
  'margin',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflowX',
  'overflowY',
  'overscrollBehavior',
  'padding',
  'position',
  'shadow',
  'shouldAnimateFocus',
  'stacking',
  'textAlign',
  'width',
  'withFocusOutline',
  'withVisualDebug',
  'focusRingBorderRadius',
  'focusWithin'
]

export { propTypes, allowedProps }
export type { ViewProps, ViewOwnProps, ViewStyle, BorderColor }
