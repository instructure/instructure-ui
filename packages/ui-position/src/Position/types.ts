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

import {
  PositionConstraint,
  PositionMountNode,
  PlacementPropValues,
  ElementPosition
} from '../PositionPropTypes'

import { WithStyleProps } from '@instructure/emotion'

type Props = {
  /**
   * The node to use as the position target
   */
  renderTarget?: React.ReactNode | ((...args: any[]) => React.ReactNode)

  /**
   * The target to be used when not using `renderTarget`
   */
  target?: PositionMountNode

  /**
   * The placement of the content in relation to the target
   */
  placement: PlacementPropValues

  /**
   * An element or a function returning an element to use as the mount node
   * for the `<Position />` (defaults to `document.body`)
   */
  mountNode?: PositionMountNode

  /**
   * Insert the element at the 'top' of the mountNode or at the 'bottom'
   */
  insertAt?: 'bottom' | 'top'

  /**
   * The parent in which to constrain the placement.
   * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
   * or a function returning an element
   */
  constrain?: PositionConstraint

  /**
   * The horizontal offset for the positioned content
   */
  offsetX?: string | number

  /**
   * The vertical offset for the positioned content
   */
  offsetY?: string | number

  /**
   * An id will be generated if not provided
   */
  id?: string

  /**
   * Whether or not position of the target should be tracked or just set statically on render
   */
  shouldTrackPosition?: boolean

  /**
   * Whether or not you want the content to position over the target
   */
  shouldPositionOverTarget?: boolean

  /**
   * Callback fired when the position changes
   */
  onPositionChanged?: (position: Position) => any

  /**
   * Callback fired when `<Position />` content has been mounted and is initially positioned
   */
  onPositioned?: (position: Position) => any

  /**
   * The content to be positioned
   */
  children?: React.ReactNode
} & WithStyleProps

type State = {
  positioned: boolean
} & ElementPosition

type Position = ElementPosition['style'] & {
  placement: ElementPosition['placement']
}

export type { Props, State }
