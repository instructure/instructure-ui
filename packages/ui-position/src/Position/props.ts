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

import { PositionPropTypes } from '../PositionPropTypes'

import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { PropValidators, PositionTheme } from '@instructure/shared-types'
import type {
  PositionConstraint,
  PositionMountNode,
  PlacementPropValues,
  ElementPosition
} from '../PositionPropTypes'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import { Renderable } from '@instructure/shared-types'

type PositionOwnProps = {
  /**
   * The node to use as the position target
   */
  renderTarget?: Renderable

  /**
   * The target to be used when not using `renderTarget`
   */
  target?: PositionMountNode

  /**
   * The placement of the content in relation to the target
   */
  placement?: PlacementPropValues

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
   * One of?: 'window', 'scroll-parent', 'parent', 'none', an element,
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
  onPositionChanged?: (position: PositionObject) => void

  /**
   * Callback fired when `<Position />` content has been mounted and is initially positioned
   */
  onPositioned?: (position: PositionObject) => void

  /**
   * The content to be positioned
   */
  children?: React.ReactNode

  /**
   * Set the CSS `display` property on the outermost `<span>` container element
   */
  containerDisplay?: 'inline-block' | 'block'

  /**
   * Provides a reference to the underlying HTML root element (the target)
   */
  elementRef?: (element: Element | null) => void
}

type PositionState = {
  positioned: boolean
} & ElementPosition

type PositionStyle = ComponentStyle<'position' | 'zIndex'>

type PositionObject = ElementPosition['style'] & {
  placement: ElementPosition['placement']
}

type PropKeys = keyof PositionOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PositionProps = PositionOwnProps &
  WithStyleProps<PositionTheme, PositionStyle> &
  WithDeterministicIdProps

const propTypes: PropValidators<PropKeys> = {
  renderTarget: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  target: PropTypes.oneOfType([element, PropTypes.func]),
  placement: PositionPropTypes.placement,
  mountNode: PositionPropTypes.mountNode,
  insertAt: PropTypes.oneOf(['bottom', 'top']),
  constrain: PositionPropTypes.constrain,
  offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  shouldTrackPosition: PropTypes.bool,
  shouldPositionOverTarget: PropTypes.bool,
  onPositionChanged: PropTypes.func,
  onPositioned: PropTypes.func,
  children: PropTypes.node,
  containerDisplay: PropTypes.oneOf(['inline-block', 'block']),
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'renderTarget',
  'target',
  'placement',
  'mountNode',
  'insertAt',
  'constrain',
  'offsetX',
  'offsetY',
  'id',
  'shouldTrackPosition',
  'shouldPositionOverTarget',
  'onPositionChanged',
  'onPositioned',
  'children',
  'containerDisplay',
  'elementRef'
]

export type { PositionProps, PositionState, PositionStyle, PositionObject }
export { propTypes, allowedProps }
