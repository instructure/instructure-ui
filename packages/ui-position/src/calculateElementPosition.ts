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

import {
  getBoundingClientRect,
  getScrollParents,
  getOffsetParents,
  canUseDOM,
  findDOMNode,
  ownerDocument,
  ownerWindow
} from '@instructure/ui-dom-utils'
import type { RectType } from '@instructure/ui-dom-utils'
import { mirrorPlacement } from './mirrorPlacement'
// @ts-expect-error will be needed for fix in the `offsetToPx` method
import { px } from '@instructure/ui-utils'

import type {
  PlacementPropValues,
  PlacementValues,
  PositionConstraint,
  PositionMountNode,
  ElementPosition,
  PositionElement,
  Size,
  Overflow,
  Offset
} from './PositionPropTypes'
import type { UIElement } from '@instructure/shared-types'

type PlacementValuesWithoutOffscreen = Exclude<PlacementValues, 'offscreen'>

type PlacementPropValuesWithoutOffscreen = Exclude<
  PlacementPropValues,
  'offscreen'
>
type PlacementValuesWithoutOffscreenArray = [
  PlacementValuesWithoutOffscreen,
  PlacementValuesWithoutOffscreen
]

type Options = {
  placement?: PlacementPropValues
  offsetX?: string | number
  offsetY?: string | number
  constrain?: PositionConstraint
  container?: PositionMountNode
  over?: boolean
}

function calculateElementPosition(
  element?: PositionElement,
  target?: PositionElement,
  options: Options = {}
): ElementPosition {
  if (!element || options.placement === 'offscreen') {
    // hide offscreen content at the bottom of the DOM from screenreaders
    // unless content is contained somewhere else
    const hide = !options.container && element
    return {
      placement: options.placement,
      style: {
        left: '-9999em',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        display: hide ? 'none' : null
      }
    }
  }

  const pos = new PositionData(element, target, options)

  return {
    placement: pos.placement,
    style: pos.style
  }
}

class PositionedElement {
  constructor(
    element: UIElement,
    placement?:
      | PlacementPropValuesWithoutOffscreen
      | PlacementValuesWithoutOffscreenArray,
    offset: Offset<string | number | undefined> = { top: 0, left: 0 }
  ) {
    this.node = findDOMNode(element)

    if (typeof placement === 'string') {
      this.placement = parsePlacement(placement)
    } else if (Array.isArray(placement)) {
      this.placement = placement
    } else {
      this.placement = ['bottom', 'center']
    }

    this.rect = getBoundingClientRect(this.node)

    this._offset = offsetToPx(offset, this.size, this.node)
  }

  node?: Node | Window | null
  placement: PlacementValuesWithoutOffscreenArray
  rect: RectType
  _offset: Offset<string | number>

  get width() {
    return this.rect.width
  }

  get height() {
    return this.rect.height
  }

  get size() {
    return {
      width: this.width,
      height: this.height
    }
  }

  get position() {
    return {
      top: this.rect.top,
      left: this.rect.left
    }
  }

  get hasVerticalPlacement() {
    return ['top', 'bottom'].indexOf(this.placement[0]) >= 0
  }

  get hasHorizontalPlacement() {
    return ['start', 'end'].indexOf(this.placement[0]) >= 0
  }

  get shouldStretchVertically() {
    return this.placement[1] === 'stretch' && this.hasVerticalPlacement
  }

  get shouldStretchHorizontally() {
    return this.placement[1] === 'stretch' && this.hasHorizontalPlacement
  }

  get mirroredPlacement() {
    return mirrorPlacement(
      this.placement
    ) as PlacementValuesWithoutOffscreenArray
  }

  calculateOffset(placement: PlacementValuesWithoutOffscreenArray) {
    const offsetMap: Record<PlacementValuesWithoutOffscreen, string | 0> = {
      top: 0,
      start: 0,
      center: '50%',
      bottom: '100%',
      end: '100%',
      stretch: 0
    }

    let [first, second] = placement

    if (['start', 'end'].indexOf(first) >= 0) {
      ;[first, second] = [second, first]
    }

    let top: string | 0 = 0
    let left: string | 0 = 0

    if (typeof offsetMap[first] !== 'undefined') {
      top = offsetMap[first]
    }

    if (typeof offsetMap[second] !== 'undefined') {
      left = offsetMap[second]
    }

    return addOffsets([
      offsetToPx({ top, left }, this.size, this.node),
      parseOffset(this._offset, this.placement)
    ])
  }

  get scrollParentsOffset() {
    const parents = getScrollParents(this.node)

    let offsetY = 0
    let offsetX = 0

    for (let i = 1; i < parents.length; i++) {
      const parent = parents[i]
      const child = parents[i - 1]

      if (parent) {
        offsetY =
          offsetY +
          (this.normalizeScrollTop(parent) - this.normalizeScrollTop(child))
        offsetX =
          offsetX +
          ((parent as Element).scrollLeft - (child as Element).scrollLeft)
      }
    }

    return { top: offsetY, left: offsetX } as Offset
  }

  get positionedParentsOffset() {
    // If the element container is within a positioned
    // element, it will position absolutely with respect to that
    // ancestor. We calculate the offset between the child and
    // positioned parent so we can negate that distance
    const parents = getOffsetParents(this.node)
    const doc = ownerDocument(this.node)

    // If there is more than one parent, the offset on the
    // documentElement should be calculated appropriately.
    // Otherwise we need to explictly account for that offset
    let offsetY =
      parents.length > 1 ? 0 : getBoundingClientRect(doc.documentElement).top
    let offsetX = 0
    let scrollY = 0

    for (let i = 1; i < parents.length; i++) {
      const parent = getBoundingClientRect(parents[i])
      const child = getBoundingClientRect(parents[i - 1])

      offsetY = offsetY + (child.top - parent.top)
      offsetX = offsetX + (child.left - parent.left)

      if (parents[i] === doc.body) {
        // accounts for any margin on body
        offsetY = offsetY + parent.top
        offsetX = offsetX + parent.left
      }

      scrollY = scrollY + this.normalizeScrollTop(parents[i])
    }
    // Account for any scrolling on positioned parents
    // Without this, unnecessary scroll offset could be applied
    // to our target element
    offsetY = offsetY + scrollY

    return { top: offsetY, left: offsetX } as Offset
  }

  normalizeScrollTop(element: Node | Window | null) {
    // Account for cross browser differences with scrollTop attribute on the
    // body element https://bugs.chromium.org/p/chromium/issues/detail?id=766938
    return ownerDocument(this.node).body === element
      ? 0
      : (element as Element).scrollTop
  }
}

class PositionData {
  constructor(
    element?: PositionElement,
    target?: PositionElement,
    options?: Options
  ) {
    this.options = options || {}

    const { container, constrain, placement, over } = this.options

    if (!element || placement === 'offscreen') return

    this.container = container || ownerDocument(element).body

    this.element = new PositionedElement(element, placement, {
      top: this.options.offsetY,
      left: this.options.offsetX
    })

    this.target = new PositionedElement(
      target || this.container,
      over ? this.element.placement : this.element.mirroredPlacement
    )

    if (constrain === 'window') {
      this.constrainTo(ownerWindow(element))
    } else if (constrain === 'scroll-parent') {
      this.constrainTo(getScrollParents(this.target.node)[0])
    } else if (constrain === 'parent') {
      this.constrainTo(this.container)
    } else if (typeof constrain === 'function') {
      this.constrainTo(findDOMNode(constrain.call(null)))
    } else if (typeof constrain === 'object') {
      this.constrainTo(findDOMNode(constrain))
    }
  }

  options: Options
  container?: PositionMountNode
  element!: PositionedElement
  target!: PositionedElement

  get offset(): Offset {
    const { top, left } = this.target.calculateOffset(this.element.placement)

    const offset = addOffsets([
      this.element.calculateOffset(this.target.placement),
      this.element.scrollParentsOffset,
      this.element.positionedParentsOffset
    ])

    return {
      top: top - offset.top,
      left: left - offset.left
    }
  }

  get placement() {
    return formatPlacement(this.element.placement)
  }

  get minWidth() {
    return this.element.shouldStretchVertically ? this.target.width : null
  }

  get minHeight() {
    return this.element.shouldStretchHorizontally ? this.target.height : null
  }

  get position() {
    const win = ownerWindow(this.target.node)

    let { left, top } = addOffsets([this.target.position, this.offset])

    if (canUseDOM && win?.matchMedia) {
      const retina =
        win.matchMedia('only screen and (min-resolution: 1.3dppx)').matches ||
        win.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)')
          .matches
      if (!retina) {
        left = Math.round(left)
        top = Math.round(top)
      }
    }

    return { left, top } as Offset
  }

  get style(): ElementPosition['style'] {
    // when rendered offscreen first, element has no dimension on first calculation,
    // so we hide it offscreen until measurements are completed
    const { width, height } = this.element.size
    const elementNotFullyRendered = width === 0 && height === 0

    return {
      top: 0,
      left: elementNotFullyRendered ? '-9999em' : 0,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      position: 'absolute',
      transform: `translateX(${this.position.left}px) translateY(${this.position.top}px) translateZ(0)`
    }
  }

  overflow(element: PositionElement): Overflow {
    const parentWindow = ownerWindow(element)
    const elementBounds = getBoundingClientRect(element)
    const windowBounds = getBoundingClientRect(parentWindow)
    const offsets = addOffsets([this.target.position, this.offset])
    const parentOffset: Offset = {
      top:
        this.element.positionedParentsOffset.top +
        this.element.scrollParentsOffset.top,
      left:
        this.element.positionedParentsOffset.left +
        this.element.scrollParentsOffset.left
    }

    let left = offsets.left + parentOffset.left
    let right = offsets.left + this.element.width + parentOffset.left

    let top = offsets.top + parentOffset.top
    let bottom = offsets.top + this.element.height + parentOffset.top

    // adjust for vertical placements
    if (this.element.placement[0] === 'bottom') {
      top -= this.element.height + this.target.height
    } else if (this.element.placement[0] === 'top') {
      bottom += this.element.height + this.target.height
    }

    if (this.element.placement[1] === 'start') {
      left -= this.element.width - this.target.width
    } else if (this.element.placement[1] === 'end') {
      right += this.element.width - this.target.width
    }

    // adjust for horizontal placements
    if (this.element.placement[1] === 'top') {
      top -= this.element.height - this.target.height
    } else if (this.element.placement[1] === 'bottom') {
      bottom += this.element.height - this.target.height
    }

    if (this.element.placement[0] === 'end') {
      left -= this.element.width + this.target.width
    } else if (this.element.placement[0] === 'start') {
      right += this.element.width + this.target.width
    }

    const bounds =
      element === parentWindow
        ? elementBounds
        : {
            top: windowBounds.top + elementBounds.top,
            bottom: elementBounds.top + elementBounds.height,
            left: windowBounds.left + elementBounds.left,
            right: elementBounds.left + elementBounds.width
          }

    return {
      top: top < bounds.top ? bounds.top - top : 0,
      bottom: bottom > bounds.bottom ? bottom - bounds.bottom : 0,
      left: left < bounds.left ? bounds.left - left : 0,
      right: right > bounds.right ? right - bounds.right : 0
    }
  }

  constrainTo(element?: PositionElement) {
    if (!element) return

    const overflow = this.overflow(element)
    const oob = {
      top: overflow.top > 0,
      bottom: overflow.bottom > 0,
      left: overflow.left > 0,
      right: overflow.right > 0
    }

    if (this.element.hasVerticalPlacement) {
      if (this.element.placement[1] !== 'stretch') {
        if (oob.left && oob.right) {
          this.element.placement[1] = 'center'
          this.target.placement[1] = 'center'
        } else if (oob.left) {
          this.element.placement[1] = 'start'
          this.target.placement[1] = 'start'
        } else if (oob.right) {
          this.element.placement[1] = 'end'
          this.target.placement[1] = 'end'
        }
      }

      if (oob.top && oob.bottom) {
        // if top and bottom bounds broken
        if (overflow.bottom < overflow.top) {
          // more room on bottom, position below
          this.element.placement[0] = 'bottom'
          this.target.placement[0] = 'top'
        } else if (overflow.bottom > overflow.top) {
          // more room on top, position above
          this.element.placement[0] = 'top'
          this.target.placement[0] = 'bottom'
        }
      } else if (oob.top) {
        // if top bound broken, position below
        this.element.placement[0] = 'bottom'
        this.target.placement[0] = 'top'
      } else if (oob.bottom) {
        // if bottom bound broken, position above
        this.element.placement[0] = 'top'
        this.target.placement[0] = 'bottom'
      }
    } else if (this.element.hasHorizontalPlacement) {
      if (oob.top && oob.bottom) {
        this.element.placement[1] = 'center'
        this.target.placement[1] = 'center'
      } else if (oob.top) {
        this.element.placement[1] = 'top'
        this.target.placement[1] = 'top'
      } else if (oob.bottom) {
        this.element.placement[1] = 'bottom'
        this.target.placement[1] = 'bottom'
      }

      if (oob.left && oob.right) {
        // if left and right bounds broken
        if (overflow.left > overflow.right) {
          // more room at end, position after
          this.element.placement[0] = 'end'
          this.target.placement[0] = 'start'
        } else if (overflow.left < overflow.right) {
          // more room at start, position before
          this.element.placement[0] = 'start'
          this.target.placement[0] = 'end'
        }
      } else {
        if (oob.left) {
          this.element.placement[0] = 'end'
          this.target.placement[0] = 'start'
        } else if (oob.right) {
          this.element.placement[0] = 'start'
          this.target.placement[0] = 'end'
        }
      }
    }
  }
}

function addOffsets(offsets: Offset[]) {
  return offsets.reduce(
    (sum, offset) => {
      return {
        top: sum.top + offset.top,
        left: sum.left + offset.left
      }
    },
    { top: 0, left: 0 }
  )
}

function parseOffset(
  offset: Offset<number | string>,
  placement: PlacementValuesWithoutOffscreenArray
) {
  let { top, left } = offset

  if (typeof left === 'string') {
    left = parseFloat(left)
  }

  if (typeof top === 'string') {
    top = parseFloat(top)
  }

  if (placement[0] === 'bottom') {
    top = 0 - top
  }

  if (placement[0] === 'end') {
    left = 0 - left
  }

  return {
    top,
    left
  } as Offset
}

function offsetToPx(
  offset: Offset<string | number | undefined>,
  size: Size,
  // @ts-expect-error will be needed for the TODO below
  node?: Node | Window | null // eslint-disable-line
) {
  let { left, top } = offset

  if (typeof left === 'string') {
    if (left.indexOf('%') !== -1) {
      left = (parseFloat(left) / 100) * size.width
    } else {
      // TODO this fixes INSTUI-3505, but it is a breaking change, so uncomment it in V9 with the appropriate release notes
      // left = px(left, node)
    }
  }

  if (typeof top === 'string') {
    if (top.indexOf('%') !== -1) {
      top = (parseFloat(top) / 100) * size.height
    } else {
      // TODO this fixes INSTUI-3505, but it is a breaking change, so uncomment it in V9 with the appropriate release notes
      // top = px(top, node)
    }
  }

  return { top, left } as Offset
}

function sortPlacement(placement: PlacementValuesWithoutOffscreenArray) {
  let [first, second] = placement

  if (first === 'center' || first === 'stretch') {
    ;[first, second] = [second, first]
  }
  return [first, second] as PlacementValuesWithoutOffscreenArray
}

function parsePlacement(placement: PlacementPropValues) {
  let parsed = placement.split(' ') as PlacementValuesWithoutOffscreenArray

  if ((parsed as Partial<PlacementValuesWithoutOffscreenArray>).length === 1) {
    parsed = [placement as PlacementValuesWithoutOffscreen, 'center']
  }

  return sortPlacement(parsed)
}

function formatPlacement(placement: PlacementValuesWithoutOffscreenArray) {
  return placement.join(' ') as PlacementPropValuesWithoutOffscreen
}

export default calculateElementPosition
export {
  /**
   * ---
   * category: utilities/position
   * ---
   *
   * Calculate the coordinates to attach an element
   * to a designated target with specified constraints
   * @module
   * @param {ReactComponent|DomNode} el - component or DOM node
   * @param {DomNode} target - the target DOM node
   * @param {Object} options - constraints for the positioning
   * @param {string} options.placement - designates where the element will be attached
   *  ('top', 'bottom', 'left', 'right', 'top left' etc.)
   * @param {DomNode} options.container - DOM node where the element is contained
   * @param {boolean} options.over - whether or not you want the element to position over the target
   * @param {string} options.constrain - if the element should be constrained to 'window',
   *  'scroll-parent', 'parent', or 'none'
   * @param {string|number} options.offsetX - the horizontal offset for the positioned element
   * @param {string|number} options.offsetY - the vertical offset for the positioned element
   * @returns {Object} object containing style with the calculated position in the 'transform'
   *  property
   */
  calculateElementPosition,
  parsePlacement
}
