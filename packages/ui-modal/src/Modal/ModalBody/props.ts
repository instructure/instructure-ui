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
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type {
  AsElementType,
  ModalBodyTheme,
  OtherHTMLAttributes,
  UIElement
} from '@instructure/shared-types'

type ModalBodyOwnProps = {
  children?: React.ReactNode
  padding?: Spacing
  elementRef?: (element: UIElement | null) => void
  as?: AsElementType
  variant?: 'default' | 'inverse'
  overflow?: 'scroll' | 'fit'
}

type PropKeys = keyof ModalBodyOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type ModalBodyProps = ModalBodyOwnProps &
  WithStyleProps<ModalBodyTheme, ModalBodyStyle> &
  OtherHTMLAttributes<ModalBodyOwnProps>

type ModalBodyStyle = ComponentStyle<'modalBody'>

type ModalBodyState = {
  isFirefox: boolean
}
const allowedProps: AllowedPropKeys = [
  'children',
  'padding',
  'elementRef',
  'as',
  'variant',
  'overflow'
]

export type { ModalBodyProps, ModalBodyState, ModalBodyStyle }
export { allowedProps }
