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

import type { PositionMountNode } from '@instructure/ui-position'
import type { BidirectionalProps } from '@instructure/ui-i18n'

export type DrawerTrayPlacement = 'start' | 'end'

export type DrawerLayoutTrayOwnProps = {
  label: string
  render?: (...args: any[]) => any
  placement?: DrawerTrayPlacement
  open?: boolean
  onOpen?: (...args: any[]) => any
  onClose?: (...args: any[]) => any
  border?: boolean
  shadow?: boolean
  onTransition?: (...args: any[]) => any
  onEnter?: (...args: any[]) => any
  onEntering?: (...args: any[]) => any
  onEntered?: (...args: any[]) => any
  onExit?: (...args: any[]) => any
  onExiting?: (...args: any[]) => any
  onExited?: (...args: any[]) => any
  contentRef?: (...args: any[]) => any
  mountNode?: PositionMountNode
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  onDismiss?: (...args: any[]) => any
  shouldContainFocus?: boolean
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  shouldCloseOnEscape?: boolean
  makeStyles?: (...args: any[]) => any
  styles?: any
}

export type DrawerLayoutTrayProps = DrawerLayoutTrayOwnProps &
  BidirectionalProps

export type DrawerLayoutTrayState = {
  transitioning: boolean
  portalOpen: boolean
}

export type DrawerLayoutTrayStyleProps = {
  placement: DrawerTrayPlacement
}
