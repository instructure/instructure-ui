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
import type { ViewProps } from '@instructure/ui-view/latest'
import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { OtherHTMLAttributes, Renderable } from '@instructure/shared-types'

type TagOwnProps = {
  className?: string
  text: string | React.ReactNode
  /**
   * Whether or not to disable the tag
   */
  disabled?: boolean
  /**
   * Works just like disabled but keeps the same styles as if it were active
   */
  readOnly?: boolean
  /**
   * Providing this prop renders a close button and makes the Tag dismissible.
   * The value is used as the close button's screen reader label.
   * Clicking the close button calls `onDismiss`.
   */
  renderDismissButtonLabel?: Renderable
  /**
   * Called when the close button is clicked.
   */
  onDismiss?: (event: React.MouseEvent<ViewProps & Element>) => void
  /**
   * Add an SVG icon to the left of the Tag text. Do not add icons directly as
   * children. When using Lucide icons, Tag will automatically pass the
   * appropriate size prop based on the Tag's `size`.
   */
  renderIcon?: Renderable
  /**
   * If you provide an `href`, the Tag body renders as a link (`<a>`).
   */
  href?: string
  /**
   * Valid values are `0`, `none`, `auto`, and Spacing token values,
   * see https://instructure.design/layout-spacing. Apply these values via
   * familiar CSS-like shorthand. For example, `margin="general.spaceMd auto"`.
   */
  margin?: Spacing
  /**
   * If you add an onClick prop, Tag renders as a clickable button
   */
  onClick?: (event: React.MouseEvent<ViewProps & Element>) => void
  /**
   * Provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  size?: 'small' | 'medium' | 'large'
}

type PropKeys = keyof TagOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type TagProps = TagOwnProps &
  WithStyleProps<ReturnType<NewComponentTypes['Tag']>, TagStyle> &
  OtherHTMLAttributes<TagOwnProps>

type TagStyle = ComponentStyle<
  'tag' | 'body' | 'text' | 'leadIcon' | 'closeButton' | 'closeIcon'
>
const allowedProps: AllowedPropKeys = [
  'className',
  'text',
  'disabled',
  'readOnly',
  'renderDismissButtonLabel',
  'onDismiss',
  'renderIcon',
  'href',
  'margin',
  'onClick',
  'elementRef',
  'size'
]

export type { TagProps, TagStyle }
export { allowedProps }
