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
  ContextViewTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { PlacementPropValues } from '@instructure/ui-position'
import type {
  Shadow,
  Spacing,
  Stacking,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'

type ContextViewOwnProps = {
  as?: AsElementType
  elementRef?: (element: Element | null) => void
  height?: string | number
  width?: string | number
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  children?: React.ReactNode
  textAlign?: 'start' | 'center' | 'end'
  background?: 'default' | 'inverse'
  debug?: boolean
  margin?: Spacing
  padding?: Spacing
  shadow?: Shadow
  stacking?: Stacking
  placement?: PlacementPropValues
  borderColor?: string
}

type PropKeys = keyof ContextViewOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ContextViewProps = ContextViewOwnProps &
  WithStyleProps<ContextViewTheme, ContextViewStyle> &
  OtherHTMLAttributes<ContextViewOwnProps>

type ContextViewStyle = ComponentStyle<
  'contextView' | 'contextView__content' | 'contextView__arrow'
> & {
  arrowSize: string | 0
  arrowBorderWidth: string | 0
  borderRadius: string
}
const allowedProps: AllowedPropKeys = [
  'as',
  'elementRef',
  'margin',
  'padding',
  'height',
  'width',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'children',
  'textAlign',
  'shadow',
  'stacking',
  'background',
  'placement',
  'debug',
  'borderColor'
]

export type { ContextViewProps, ContextViewStyle }
export { allowedProps }
