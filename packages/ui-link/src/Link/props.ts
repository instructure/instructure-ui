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
  PropValidators,
  LinkTheme
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type LinkOwnProps = {
  children: React.ReactNode
  href?: string
  color?: 'link' | 'link-inverse'
  elementRef?: (...args: any[]) => any
  as?: AsElementType
  interaction?: 'enabled' | 'disabled'
  margin?: Spacing
  renderIcon?: ((...args: any[]) => any) | React.ReactNode
  iconPlacement?: 'start' | 'end'
  display?: 'auto' | 'block' | 'inline-block' | 'flex' | 'inline-flex'
  isWithinText?: boolean
  onClick?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
}

export type LinkStyleProps = {
  containsTruncateText: boolean
  hasVisibleChildren: boolean
}

type PropKeys = keyof LinkOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type LinkProps = LinkOwnProps & WithStyleProps<LinkTheme, LinkStyle>

type LinkStyle = ComponentStyle<'link' | 'icon'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * The text and/or icon displayed by the link
   */
  children: PropTypes.node.isRequired,
  /**
   * Sets the link's `href` attribute
   */
  href: PropTypes.string,
  /**
   * Designates Link's text color to accommodate light and dark backgrounds
   */
  color: PropTypes.oneOf(['link', 'link-inverse']),
  /**
   * Provides a reference to the underlying HTML element
   */
  elementRef: PropTypes.func,
  /**
   * The element type to render as (will default to `<a>` if href is provided)
   */
  as: PropTypes.elementType,
  /**
   * Determines if the link is enabled or disabled
   */
  interaction: PropTypes.oneOf(['enabled', 'disabled']),
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin: ThemeablePropTypes.spacing,
  /**
   * Add an SVG icon to the Link. Do not add icons directly as
   * children.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /**
   * Place the icon before or after the text in the Link.
   */
  iconPlacement: PropTypes.oneOf(['start', 'end']),
  /**
   * Set the CSS display property of the Link element. 'auto' sets no display property.
   */
  display: PropTypes.oneOf([
    'auto',
    'block',
    'inline-block',
    'flex',
    'inline-flex'
  ]),
  /**
   * Set `false` to remove default underline if Link does not appear inline with text
   */
  isWithinText: PropTypes.bool,
  /**
   * Fires when the Link is clicked
   */
  onClick: PropTypes.func,
  /**
   * Fires when the Link gains focus
   */
  onFocus: PropTypes.func,
  /**
   * Fires when the Link loses focus
   */
  onBlur: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'children',
  'href',
  'color',
  'elementRef',
  'as',
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

export type { LinkProps, LinkStyle }
export { propTypes, allowedProps }
