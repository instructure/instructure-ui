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

import type { Spacing } from '@instructure/emotion'
import { SyntheticEvent } from 'react'
import { AsElementType } from '@instructure/shared-types'

export type AvatarProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
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
  size:
    | 'auto'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
  color:
    | 'default' // = brand
    | 'shamrock'
    | 'barney'
    | 'crimson'
    | 'fire'
    | 'licorice'
    | 'ash'
  shape: 'circle' | 'rectangle'
  display: 'inline-block' | 'block'
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Callback fired when the avatar image has loaded
   */
  onImageLoaded: (event: SyntheticEvent) => void
  /**
   * The element type to render as
   */
  as?: AsElementType
  /**
   * Provides a reference to the underlying html element
   */
  elementRef?: (element: HTMLElement | null) => void
}

export type AvatarState = {
  loaded: boolean
}
