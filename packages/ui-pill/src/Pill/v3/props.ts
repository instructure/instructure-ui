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
  Spacing,
  ComponentStyle,
  NewThemeOverrideProp
} from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type {
  AsElementType,
  OtherHTMLAttributes,
  Renderable
} from '@instructure/shared-types'

const pillSizeToIconSize = {
  'x-small': 'xs',
  small: 'xs',
  medium: 'sm',
  large: 'sm'
} as const

type PillOwnProps = {
  as?: AsElementType
  /**
   * The status colors (`primary`, `info`, `success`, `warning`, `error`) convey
   * meaning, the accent colors (`stone`, `sky`, `orange`, `aurora`, `plum`,
   * `violet`, `sea`) are for categorization.
   */
  color?:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'stone'
    | 'sky'
    | 'orange'
    | 'aurora'
    | 'plum'
    | 'violet'
    | 'sea'
  /**
   * The size of the Pill. The icon is sized to match.
   */
  size?: keyof typeof pillSizeToIconSize
  /**
   * Provides a reference to the underlying HTML element
   */
  elementRef?: (element: Element | null) => void
  /**
   * Valid values are `0`, `none`, `auto`, and Spacing token values,
   * see https://instructure.design/layout-spacing. Apply these values via
   * familiar CSS-like shorthand. For example, `margin="general.spaceMd auto"`.
   */
  margin?: Spacing
  children: React.ReactNode

  /**
   * Adds a status label to the left of the main text.
   */
  statusLabel?: string

  /**
   * An icon displayed before the text. InstUI icons are sized and colored
   * automatically.
   */
  renderIcon?: Renderable
}
type PropKeys = keyof PillOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PillProps = PillOwnProps &
  NewThemeOverrideProp<ReturnType<NewComponentTypes['Pill']>> &
  OtherHTMLAttributes<PillOwnProps>

type PillStyle = ComponentStyle<
  'pill' | 'text' | 'maxWidth' | 'status' | 'icon'
>

type PillStyleParams = Required<Pick<PillProps, 'color' | 'size'>>

const allowedProps: AllowedPropKeys = [
  'as',
  'children',
  'color',
  'size',
  'elementRef',
  'margin',
  'statusLabel',
  'renderIcon'
]

export type { PillProps, PillStyle, PillStyleParams }
export { allowedProps, pillSizeToIconSize }
