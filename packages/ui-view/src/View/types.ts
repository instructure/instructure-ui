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
import {
  ThemeablePropValues,
  WithStyleProps,
  CSSObject
} from '@instructure/emotion'
export type ViewProps = WithStyleProps & {
  /**
   * The element to render as the component root, `span` by default
   */
  as?: React.ReactElement | string
  /**
   * provides a reference to the underlying html element
   */
  elementRef?: (...args: any[]) => any
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
   * Designates the text alignment within the `<View />`
   */
  textAlign?: 'start' | 'center' | 'end'
  /**
   * Sets the color of the View border
   */
  borderColor?:
    | 'transparent'
    | 'primary'
    | 'secondary'
    | 'brand'
    | 'info'
    | 'success'
    | 'warning'
    | 'alert'
    | 'danger'
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
   * Manually control if the `View` should display a focus outline. When left undefined (which is the default)
   * the focus outline will display automatically if the `View` is focusable and receives focus. Note: the focus
   * outline only will display when the `position` prop is set to `relative`.
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

  dir?: any // TODO: PropTypes.oneOf(Object.values(bidirectional.DIRECTION)),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: keyof typeof ThemeablePropValues.SPACING
  /**
   * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
   */
  padding?: keyof typeof ThemeablePropValues.SPACING
  /**
   * Accepts the familiar CSS shorthand to designate border widths corresponding
   * to edges
   */
  borderWidth?: keyof typeof ThemeablePropValues.BORDER_WIDTHS
  /**
   * Accepts `small`, `medium`, `large`, `circle`, and `pill`. Border radius can be
   * assigned to individual corners in CSS shorthand style (e.g., `"medium large none pill"`).
   */
  borderRadius?: keyof typeof ThemeablePropValues.BORDER_RADII
  /**
   * Controls the shadow depth for the `<View />`
   */
  shadow?: keyof typeof ThemeablePropValues.SHADOW_TYPES

  /**
   * Controls the z-index depth for the `<View />`
   */
  stacking?: keyof typeof ThemeablePropValues.STACKING_TYPES
  /**
   * Specify a mouse cursor to use when hovering over the `<View />`
   */
  cursor?: any
  className?: string
  style?: CSSObject
  // View seems to accept all kind of other props from other components for example:
  // `role` from the Avatar component
  // TODO: investigate how to resolve this better
  [key: string]: unknown
}

export type AllowedPropKeys = Readonly<Array<keyof ViewProps>>

export const allowedProps: AllowedPropKeys = [
  'as',
  'background',
  'borderColor',
  'borderRadius',
  'borderWidth',
  'cursor',
  'className',
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
  'makeStyles',
  'margin',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflowX',
  'overflowY',
  'padding',
  'position',
  'shadow',
  'shouldAnimateFocus',
  'stacking',
  'style',
  'styles',
  'textAlign',
  'width',
  'withFocusOutline',
  'withVisualDebug'
]
