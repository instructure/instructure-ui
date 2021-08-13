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

import PropTypes from 'prop-types'

import { element } from '@instructure/ui-prop-types'
import { RectType } from '@instructure/ui-dom-utils'
import React from 'react'

const placementPropValues = [
  'top',
  'end',
  'bottom',
  'start',
  'top start',
  'start top',
  'start center',
  'start bottom',
  'bottom start',
  'bottom center',
  'bottom end',
  'end bottom',
  'end center',
  'end top',
  'top end',
  'top center',
  'center end',
  'center start',
  'top stretch',
  'bottom stretch',
  'end stretch',
  'start stretch',
  'offscreen'
] as const

const constraintPropValues = [
  'window',
  'scroll-parent',
  'parent',
  'none'
] as const

const PositionPropTypes = {
  /**
   * The placement of the content in relation to the trigger
   */
  placement: PropTypes.oneOf(placementPropValues),
  /**
   * An element or a function returning an element to use as the mount node
   */
  mountNode: PropTypes.oneOfType([element, PropTypes.func]),
  /**
   * The parent in which to constrain a placement
   */
  constrain: PropTypes.oneOfType([
    element,
    PropTypes.func,
    PropTypes.oneOf(constraintPropValues)
  ])
}

/**
 * The placement of the content in relation to the trigger
 */
export type PlacementPropValues = typeof placementPropValues[number]

/**
 * An element or a function returning an element to use as the mount node
 */
export type PositionMountNode = Element | (() => Element)

/**
 * The parent in which to constrain a placement
 */
export type PositionConstraint =
  | PositionMountNode
  | typeof constraintPropValues[number]

export type PlacementValues =
  | 'top'
  | 'start'
  | 'end'
  | 'bottom'
  | 'center'
  | 'stretch'
  | 'offscreen'

export type PlacementValueArray = [PlacementValues, PlacementValues]

export type ElementPosition = {
  placement?: PlacementPropValues
  style: {
    top?: 0
    left?: '-9999em' | 0
    overflow?: 'hidden'
    position?: 'absolute'
    display?: 'none' | null
    minWidth?: number | null
    minHeight?: number | null
    transform?: string
  }
}

export type PositionElement =
  | Node
  | Window
  | React.ReactElement
  | React.Component
  | ((...args: any[]) => Node | Window | null | undefined)
  | null

export type Offset<Type extends number | string = number> = {
  top: Type
  left: Type
}

export type Size = Pick<RectType, 'width' | 'height'>
export type Overflow = Pick<RectType, 'top' | 'bottom' | 'left' | 'right'>

export default PositionPropTypes
export {
  /**
   * ---
   * category: utilities/position
   * ---
   * Custom prop types for `ui-position` components.
   * @module PositionPropTypes
   */
  PositionPropTypes
}
