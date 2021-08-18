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

import { Shadow, Stacking } from '@instructure/emotion'
import React from 'react'
import {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'
import { BidirectionalProps } from '@instructure/ui-i18n'

export type PopoverOwnProps = {
  isShowingContent?: boolean
  defaultIsShowingContent?: boolean
  on?: ('click' | 'hover' | 'focus') | ('click' | 'hover' | 'focus')[]
  withArrow?: boolean
  color?: 'primary' | 'primary-inverse'
  shadow?: Shadow
  stacking?: Stacking
  contentRef?: (...args: any[]) => any
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  screenReaderLabel?: string
  offsetX?: string | number
  offsetY?: string | number
  placement: PlacementPropValues
  constrain?: PositionConstraint
  mountNode?: PositionMountNode
  positionTarget?: PositionMountNode
  insertAt?: 'bottom' | 'top'
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  id?: string
  shouldAlignArrow?: boolean
  shouldTrackPosition?: boolean
  shouldRenderOffscreen?: boolean
  shouldContainFocus?: boolean
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  shouldCloseOnEscape?: boolean
  shouldFocusContentOnTriggerBlur?: boolean
  onShowContent?: (...args: any[]) => any
  onHideContent?: (...args: any[]) => any
  onPositioned?: (...args: any[]) => any
  onPositionChanged?: (...args: any[]) => any
  onClick?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  onKeyUp?: (...args: any[]) => any
  onMouseOver?: (...args: any[]) => any
  onMouseOut?: (...args: any[]) => any
  renderTrigger?: React.ReactNode | ((...args: any[]) => any)
}

export type PopoverProps = PopoverOwnProps & BidirectionalProps
