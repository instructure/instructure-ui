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

import PropTypes from 'prop-types'

import { ThemeablePropTypes } from '@instructure/emotion'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  AsElementType,
  BillboardTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import type { ViewProps } from '@instructure/ui-view'
import React, { MouseEvent } from 'react'
import { Renderable } from '@instructure/shared-types'
type HeroIconSize = 'medium' | 'x-large' | 'large'
type BillboardOwnProps = {
  /**
   * Provide an <Img> component or Instructure Icon for the hero image
   */
  hero?: React.ReactElement | ((iconSize: HeroIconSize) => React.ReactElement)
  /**
   * If you're using an icon, this prop will size it. Also sets the font-size
   * of the headline and message.
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * the element type to render as
   */
  as?: AsElementType
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  /**
   * The headline for the Billboard. Is styled as an h1 element by default
   */
  heading?: string
  /**
   * Choose the appropriately semantic tag for the heading
   */
  headingAs?: 'h1' | 'h2' | 'h3' | 'span'
  /**
   * Choose the font-size for the heading (see the Heading component)
   */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4'
  /**
   * Instructions or information for the Billboard. Note: you should not pass
   * interactive content to this prop if you are also providing an `href` or
   * `onClick`. That would cause the Billboard to render as a button or link
   * and would result in nested interactive content.
   */
  message?: Renderable
  /**
   * If you add an onClick prop, the Billboard renders as a clickable button
   */
  onClick?: (e: MouseEvent<ViewProps>) => void
  /**
   * If `href` is provided, Billboard will render as a link
   */
  href?: string
  /**
   * Whether or not to disable the billboard
   */
  disabled?: boolean
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly?: boolean
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
}

type PropKeys = keyof BillboardOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type BillboardProps = BillboardOwnProps &
  WithStyleProps<BillboardTheme, BillboardStyle> &
  OtherHTMLAttributes<BillboardOwnProps>

type BillboardStyle = ComponentStyle<
  'billboard' | 'content' | 'hero' | 'heading' | 'message'
>

const propTypes: PropValidators<PropKeys> = {
  hero: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  as: PropTypes.elementType,
  elementRef: PropTypes.func,
  heading: PropTypes.string,
  headingAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'span']),
  headingLevel: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  margin: ThemeablePropTypes.spacing
}

const allowedProps: AllowedPropKeys = [
  'hero',
  'size',
  'as',
  'elementRef',
  'heading',
  'headingAs',
  'headingLevel',
  'message',
  'onClick',
  'href',
  'disabled',
  'readOnly',
  'margin'
]

export type { BillboardProps, BillboardStyle, HeroIconSize }
export { propTypes, allowedProps }
