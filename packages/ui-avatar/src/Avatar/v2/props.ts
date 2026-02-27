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

import { SyntheticEvent } from 'react'

import type {
  Spacing,
  ComponentStyle,
  ThemeOverrideValue
} from '@instructure/emotion'
import type {
  AsElementType,
  OtherHTMLAttributes,
  Renderable
} from '@instructure/shared-types'

const avatarSizeToIconSize = {
  'xx-small': 'xs',
  'x-small': 'xs',
  small: 'sm',
  medium: 'md',
  large: 'lg',
  'x-large': 'xl',
  'xx-large': '2xl'
} as const

type AvatarOwnProps = {
  /**
   * The name to display. It will be automatically converted to initials.
   */
  name: string
  /**
   * URL of the image to display as the background image
   */
  src?: string
  /**
   * Accessible label
   */
  alt?: string
  size?: keyof typeof avatarSizeToIconSize
  color?:
    | 'accent1'
    | 'accent2'
    | 'accent3'
    | 'accent4'
    | 'accent5'
    | 'accent6'
    | 'ai'
  /**
   * In inverse color mode the background and text/icon colors are inverted
   */
  hasInverseColor?: boolean
  /**
   * `auto` only shows a border when there is no source image. This prop can force to always or never show that border.
   */
  showBorder?: 'auto' | 'always' | 'never'
  shape?: 'circle' | 'rectangle'
  display?: 'inline' | 'block'
  /**
   * Valid values are `0`, `none`, `auto`, and Spacing token values,
   * see https://instructure.design/layout-spacing. Apply these values via
   * familiar CSS-like shorthand. For example, `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Callback fired when the avatar image has loaded.
   * `event` can be `undefined`, if its already loaded when the page renders
   * (can happen in SSR)
   */
  onImageLoaded?: (event?: SyntheticEvent) => void
  /**
   * The element type to render as
   */
  as?: AsElementType
  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void
  /**
   * An icon, or function that returns an icon that gets displayed. If the `src` prop is provided, `src` will have priority.
   * When using Lucide icons, Avatar will automatically pass the appropriate size and color props based on the Avatar's size and color.
   */
  renderIcon?: Renderable
}

export type AvatarState = {
  loaded: boolean
}

type PropKeys = keyof AvatarOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type AvatarProps = AvatarOwnProps & {
  themeOverride?: ThemeOverrideValue
} & OtherHTMLAttributes<AvatarOwnProps>

type AvatarStyle = ComponentStyle<'avatar' | 'image'>

const allowedProps: AllowedPropKeys = [
  'name',
  'src',
  'alt',
  'size',
  'color',
  'hasInverseColor',
  'shape',
  'margin',
  'display',
  'onImageLoaded',
  'renderIcon',
  'showBorder'
]

export type { AvatarProps, AvatarStyle }
export { allowedProps, avatarSizeToIconSize }
