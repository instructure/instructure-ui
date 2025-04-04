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
import PropTypes from 'prop-types'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  AsElementType,
  AvatarTheme,
  OtherHTMLAttributes,
  PropValidators
} from '@instructure/shared-types'
import { Renderable } from '@instructure/shared-types'

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
  size?:
    | 'auto'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
  color?:
    | 'default' // = brand
    | 'shamrock'
    | 'barney'
    | 'crimson'
    | 'fire'
    | 'licorice'
    | 'ash'
  /**
   * In inverse color mode the background and text/icon colors are inverted
   */
  hasInverseColor?: boolean
  /**
   * `auto` only shows a border when there is no source image. This prop can force to always or never show that border.
   */
  showBorder?: 'auto' | 'always' | 'never'
  shape?: 'circle' | 'rectangle'
  display?: 'inline-block' | 'block'
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Callback fired when the avatar image has loaded
   */
  onImageLoaded?: (event: SyntheticEvent) => void
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
   */
  renderIcon?: Renderable
}

export type AvatarState = {
  loaded: boolean
}

type PropKeys = keyof AvatarOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type AvatarProps = AvatarOwnProps &
  WithStyleProps<AvatarTheme, AvatarStyle> &
  OtherHTMLAttributes<AvatarOwnProps>

type AvatarStyle = ComponentStyle<
  'avatar' | 'initials' | 'loadImage' | 'iconSVG'
>

const propTypes: PropValidators<PropKeys> = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf([
    'auto',
    'xx-small',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large'
  ]),
  color: PropTypes.oneOf([
    'default',
    'shamrock',
    'barney',
    'crimson',
    'fire',
    'licorice',
    'ash'
  ]),
  hasInverseColor: PropTypes.bool,
  showBorder: PropTypes.oneOf(['auto', 'always', 'never']),
  shape: PropTypes.oneOf(['circle', 'rectangle']),
  margin: PropTypes.string,
  display: PropTypes.oneOf(['inline-block', 'block']),
  onImageLoaded: PropTypes.func,
  as: PropTypes.elementType,
  elementRef: PropTypes.func,
  renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

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
  'as',
  'elementRef',
  'renderIcon',
  'showBorder'
]

export type { AvatarProps, AvatarStyle }
export { propTypes, allowedProps }
