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

import type { ReactNode } from 'react'
import type { ComponentStyle, NewThemeOverrideProp } from '@instructure/emotion'
import type { OtherHTMLAttributes } from '@instructure/shared-types'
import type { NewComponentTypes } from '@instructure/ui-themes'

type CardOwnProps = {
  /**
   * The content to be rendered inside the Card
   */
  children?: ReactNode
  /**
   * `base` renders a background, border color, and shadow. `nested` is
   * meant to be placed inside a `base` Card and omits the background,
   * border color, and shadow.
   */
  variant?: 'base' | 'nested'
  /**
   * Scales padding and border radius. For `variant="base"` only, `size`
   * also applies min-/max-width breakpoints: `sm` applies a max-width, `md`
   * applies a min- and max-width, and `lg` applies a min-width. `nested`
   * doesn't enforce a width — its available space is already constrained
   * by its parent `base` Card.
   */
  size?: 'sm' | 'md' | 'lg'
}

type PropKeys = keyof CardOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type CardProps = CardOwnProps &
  NewThemeOverrideProp<ReturnType<NewComponentTypes['Card']>> &
  OtherHTMLAttributes<CardOwnProps>

type CardStyle = ComponentStyle<'card'>

const allowedProps: AllowedPropKeys = ['children', 'variant', 'size']

export type { CardProps, CardStyle }
export { allowedProps }
