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
import type {
  AsElementType,
  HeadingTheme,
  OtherHTMLAttributes,
  Renderable
} from '@instructure/shared-types'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type HeadingLevel<U extends keyof React.JSX.IntrinsicElements> = U

type HeadingOwnProps = {
  /**
   * transforms heading into an `ai` variant
   */
  aiVariant?: 'stacked' | 'horizontal' | 'iconOnly'
  /**
   * The text content of the Heading
   */
  children?: React.ReactNode // TODO: childrenOrValue or is it even needed?
  /**
   * Add a top- or bottom-border to the Heading
   */
  border?: 'none' | 'top' | 'bottom'
  /**
   * The font color to render, NOTE: `ai` color is deprecated. Use the `aiVariant` prop instead
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'primary-inverse'
    | 'secondary-inverse'
    | 'inherit'
    | 'primary-on'
    | 'secondary-on'
    | 'ai'
  /**
   * The level of the heading in the DOM: h1 is largest; h6 is smallest.
   */
  level?: HeadingLevel<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> | 'reset'
  /**
   * What DOM element is output is determined in the following order:
   * 1. (deprecated) If `variant` is set, then use the `level` prop, if that's
   * not set use `<h1>`-`<h6>` based on the `variant` prop's value
   * 2. The value of the `as` prop
   * 3. The value of the `level` prop
   * 4. `<h2>`
   */
  as?: AsElementType
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Provides a ref to the underlying HTML element
   */
  elementRef?: (element: Element | null) => void
  /**
   * An icon, or function that returns an icon that gets displayed before the text.
   */
  renderIcon?: Renderable
  /**
   * Sets appearance of the heading. Will also set its heading level, if not
   * specified by the `level` prop (deprecated, not recommended!)
   */
  variant?:
    | 'titlePageDesktop'
    | 'titlePageMobile'
    | 'titleSection'
    | 'titleCardSection'
    | 'titleModule'
    | 'titleCardLarge'
    | 'titleCardRegular'
    | 'titleCardMini'
    | 'label'
    | 'labelInline'
}

type PropKeys = keyof HeadingOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type HeadingProps = HeadingOwnProps &
  WithStyleProps<HeadingTheme, HeadingStyle> &
  OtherHTMLAttributes<HeadingOwnProps>

type HeadingStyle = ComponentStyle<
  'heading' | 'igniteAI' | 'igniteAIStacked' | 'igniteAIHorizontal' | 'withIcon'
>
const allowedProps: AllowedPropKeys = [
  'aiVariant',
  'border',
  'children',
  'color',
  'level',
  'as',
  'margin',
  'elementRef',
  'variant'
]

export type { HeadingProps, HeadingStyle }
export { allowedProps }
