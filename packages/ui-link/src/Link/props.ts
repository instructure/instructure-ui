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
  ToProp,
  AsElementType,
  PropValidators,
  LinkTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { ViewOwnProps } from '@instructure/ui-view'

type LinkOwnProps = {
  /**
   * The text and/or icon displayed by the link
   */
  children: React.ReactNode

  /**
   * Sets the link's `href` attribute
   */
  href?: string

  /**
   * Designates Link's text color to accommodate light and dark backgrounds
   */
  color?: 'link' | 'link-inverse'

  /**
   * Provides a reference to the underlying HTML element
   */
  elementRef?: (element: Element | null) => void

  /**
   * The element type to render as (will default to `<a>` if href is provided)
   */
  as?: AsElementType

  /**
   * The ARIA role of the element.
   */
  role?: string

  /**
   * If the Link has an onClick handler but is not a button element,
   * force ARIA role to be "button".
   */
  forceButtonRole?: boolean

  /**
   * Determines if the link is enabled or disabled
   */
  interaction?: 'enabled' | 'disabled'

  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing

  /**
   * Add an SVG icon to the Link. Do not add icons directly as
   * children.
   */
  renderIcon?: (() => React.ReactNode) | React.ReactNode

  /**
   * Place the icon before or after the text in the Link.
   */
  iconPlacement?: 'start' | 'end'

  /**
   * Set the CSS display property of the Link element. 'auto' sets no display property.
   */
  display?: 'auto' | 'block' | 'inline-block' | 'flex' | 'inline-flex'

  /**
   * Set `false` to remove default underline if Link does not appear inline with text
   */
  isWithinText?: boolean

  /**
   * Fires when the Link is clicked
   */
  onClick?: (event: React.MouseEvent<ViewOwnProps>) => void

  /**
   * Fires when the Link gains focus
   */
  onFocus?: (event: React.FocusEvent<ViewOwnProps>) => void

  /**
   * Fires when the Link loses focus
   */
  onBlur?: (event: React.FocusEvent<ViewOwnProps>) => void
}

export type LinkStyleProps = {
  containsTruncateText: boolean
  hasVisibleChildren: boolean
}

type PropKeys = keyof LinkOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type LinkState = {
  hasFocus: boolean
}

type LinkProps = LinkOwnProps &
  WithStyleProps<LinkTheme, LinkStyle> &
  OtherHTMLAttributes<LinkOwnProps> &
  ToProp

type LinkStyle = ComponentStyle<'link' | 'icon'>

const propTypes: PropValidators<PropKeys> = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  color: PropTypes.oneOf(['link', 'link-inverse']),
  elementRef: PropTypes.func,
  as: PropTypes.elementType,
  role: PropTypes.string,
  forceButtonRole: PropTypes.bool,
  interaction: PropTypes.oneOf(['enabled', 'disabled']),
  margin: ThemeablePropTypes.spacing,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  iconPlacement: PropTypes.oneOf(['start', 'end']),
  display: PropTypes.oneOf([
    'auto',
    'block',
    'inline-block',
    'flex',
    'inline-flex'
  ]),
  isWithinText: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'href',
  'color',
  'elementRef',
  'as',
  'role',
  'forceButtonRole',
  'interaction',
  'margin',
  'renderIcon',
  'iconPlacement',
  'display',
  'isWithinText',
  'onClick',
  'onFocus',
  'onBlur'
]

export type { LinkProps, LinkState, LinkStyle }
export { propTypes, allowedProps }
