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

import { mirrorPlacement } from './mirrorPlacement'

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
function calculateElementPosition(element, target, options) {
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
        top: '0',
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
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  constructor(element, placement, offset = { top: 0, left: 0 }) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'node' does not exist on type 'Positioned... Remove this comment to see the full error message
    this.node = findDOMNode(element)

    if (typeof placement === 'string') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'placement' does not exist on type 'Posit... Remove this comment to see the full error message
      this.placement = parsePlacement(placement)
    } else if (Array.isArray(placement)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'placement' does not exist on type 'Posit... Remove this comment to see the full error message
      this.placement = placement
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'placement' does not exist on type 'Posit... Remove this comment to see the full error message
      this.placement = ['bottom', 'center']
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rect' does not exist on type 'Positioned... Remove this comment to see the full error message
    this.rect = getBoundingClientRect(this.node)

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_offset' does not exist on type 'Positio... Remove this comment to see the full error message
    this._offset = offsetToPx(offset, this.size)
  }

  get width() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rect' does not exist on type 'Positioned... Remove this comment to see the full error message
    return this.rect.width
  }

  get height() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rect' does not exist on type 'Positioned... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'rect' does not exist on type 'Positioned... Remove this comment to see the full error message
      top: this.rect.top,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'rect' does not exist on type 'Positioned... Remove this comment to see the full error message
      left: this.rect.left
    }
  }

  get hasVerticalPlacement() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'placement' does not exist on type 'Posit... Remove this comment to see the full error message
    return ['top', 'bottom'].indexOf(this.placement[0]) >= 0
  }

  get hasHorizontalPlacement() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'placement' does not exist on type 'Posit... Remove this comment to see the full error message
    return ['start', 'end'].indexOf(this.placement[0]) >= 0
  }

  get shouldStretchVertically() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'placement' does not exist on type 'Posit... Remove this comment to see the full error message
    return this.placement[1] === 'stretch' && this.hasVerticalPlacement
  }

  get shouldStretchHorizontally() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'placement' does not exist on type 'Posit... Remove this comment to see the full error message
    return this.placement[1] === 'stretch' && this.hasHorizontalPlacement
  }

  get mirroredPlacement() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return mirrorPlacement(this.placement)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'placement' implicitly has an 'any' type... Remove this comment to see the full error message
  calculateOffset(placement) {
    const offsetMap = {
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

    let top = 0
    let left = 0

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof offsetMap[first] !== 'undefined') {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      top = offsetMap[first]
    }

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof offsetMap[second] !== 'undefined') {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      left = offsetMap[second]
    }

    return addOffsets([
      offsetToPx({ top, left }, this.size),
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_offset' does not exist on type 'Positio... Remove this comment to see the full error message
      parseOffset(this._offset, this.placement)
    ])
  }

  get scrollParentsOffset() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'node' does not exist on type 'Positioned... Remove this comment to see the full error message
    const parents = getScrollParents(this.node)

    let offsetY = 0
    let offsetX = 0

    for (let i = 1; i < parents.length; i++) {
      const parent = parents[i]
      const child = parents[i - 1]

      offsetY =
        offsetY +
        (this.normalizeScrollTop(parent) - this.normalizeScrollTop(child))
      offsetX = offsetX + (parent.scrollLeft - child.scrollLeft)
    }

    return { top: offsetY, left: offsetX }
  }

  get positionedParentsOffset() {
    // If the element container is within a positioned
    // element, it will position absolutely with respect to that
    // ancestor. We calculate the offset between the child and
    // positioned parent so we can negate that distance
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'node' does not exist on type 'Positioned... Remove this comment to see the full error message
    const parents = getOffsetParents(this.node)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'node' does not exist on type 'Positioned... Remove this comment to see the full error message
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

    return { top: offsetY, left: offsetX }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  normalizeScrollTop(element) {
    // Account for cross browser differences with scrollTop attribute on the
    // body element https://bugs.chromium.org/p/chromium/issues/detail?id=766938
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'node' does not exist on type 'Positioned... Remove this comment to see the full error message
    return ownerDocument(this.node).body === element ? 0 : element.scrollTop
  }
}

class PositionData {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  constructor(element, target, options) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Positio... Remove this comment to see the full error message
    this.options = options || {}

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Positio... Remove this comment to see the full error message
    const { container, constrain, placement, over } = this.options

    if (!element || placement === 'offscreen') return

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Posit... Remove this comment to see the full error message
    this.container = container || ownerDocument(element).body

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    this.element = new PositionedElement(element, placement, {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Positio... Remove this comment to see the full error message
      top: this.options.offsetY,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Positio... Remove this comment to see the full error message
      left: this.options.offsetX
    })

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
    this.target = new PositionedElement(
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Posit... Remove this comment to see the full error message
      target || this.container,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      over ? this.element.placement : this.element.mirroredPlacement
    )

    if (constrain === 'window') {
      this.constrainTo(ownerWindow(element))
    } else if (constrain === 'scroll-parent') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
      this.constrainTo(getScrollParents(this.target.node)[0])
    } else if (constrain === 'parent') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type 'Posit... Remove this comment to see the full error message
      this.constrainTo(this.container)
    } else if (typeof constrain === 'function') {
      this.constrainTo(findDOMNode(constrain.call(null)))
    } else if (typeof constrain === 'object') {
      this.constrainTo(findDOMNode(constrain))
    }
  }

  get offset() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
    const { top, left } = this.target.calculateOffset(this.element.placement)

    const offset = addOffsets([
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      this.element.calculateOffset(this.target.placement),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      this.element.scrollParentsOffset,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      this.element.positionedParentsOffset
    ])

    return {
      top: top - offset.top,
      left: left - offset.left
    }
  }

  get placement() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    return formatPlacement(this.element.placement)
  }

  get minWidth() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    return this.element.shouldStretchVertically ? this.target.width : null
  }

  get minHeight() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    return this.element.shouldStretchHorizontally ? this.target.height : null
  }

  get position() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
    const win = ownerWindow(this.target.node)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
    let { left, top } = addOffsets([this.target.position, this.offset])

    if (canUseDOM && win.matchMedia) {
      const retina =
        win.matchMedia('only screen and (min-resolution: 1.3dppx)').matches ||
        win.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)')
          .matches
      if (!retina) {
        left = Math.round(left)
        top = Math.round(top)
      }
    }

    return { left, top }
  }

  get style() {
    // when rendered offscreen first, element has no dimension on first calculation,
    // so we hide it offscreen until measurements are completed
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  overflow(element) {
    const parentWindow = ownerWindow(element)
    const elementBounds = getBoundingClientRect(element)
    const windowBounds = getBoundingClientRect(parentWindow)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
    const offsets = addOffsets([this.target.position, this.offset])
    const parentOffset = {
      top:
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
        this.element.positionedParentsOffset.top +
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
        this.element.scrollParentsOffset.top,
      left:
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
        this.element.positionedParentsOffset.left +
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
        this.element.scrollParentsOffset.left
    }

    let left = offsets.left + parentOffset.left
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    let right = offsets.left + this.element.width + parentOffset.left

    let top = offsets.top + parentOffset.top
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    let bottom = offsets.top + this.element.height + parentOffset.top

    // adjust for vertical placements
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    if (this.element.placement[0] === 'bottom') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      top -= this.element.height + this.target.height
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    } else if (this.element.placement[0] === 'top') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      bottom += this.element.height + this.target.height
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    if (this.element.placement[1] === 'start') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      left -= this.element.width - this.target.width
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    } else if (this.element.placement[1] === 'end') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      right += this.element.width - this.target.width
    }

    // adjust for horizontal placements
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    if (this.element.placement[1] === 'top') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      top -= this.element.height - this.target.height
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    } else if (this.element.placement[1] === 'bottom') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      bottom += this.element.height - this.target.height
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    if (this.element.placement[0] === 'end') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      left -= this.element.width + this.target.width
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    } else if (this.element.placement[0] === 'start') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'bottom' does not exist on type '{ top: n... Remove this comment to see the full error message
      bottom: bottom > bounds.bottom ? bottom - bounds.bottom : 0,
      left: left < bounds.left ? bounds.left - left : 0,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'right' does not exist on type '{ top: nu... Remove this comment to see the full error message
      right: right > bounds.right ? right - bounds.right : 0
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  constrainTo(element) {
    if (!element) return

    const overflow = this.overflow(element)
    const oob = {
      top: overflow.top > 0,
      bottom: overflow.bottom > 0,
      left: overflow.left > 0,
      right: overflow.right > 0
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    if (this.element.hasVerticalPlacement) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
      if (this.element.placement[1] !== 'stretch') {
        if (oob.left && oob.right) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
          this.element.placement[1] = 'center'
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
          this.target.placement[1] = 'center'
        } else if (oob.left) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
          this.element.placement[1] = 'start'
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
          this.target.placement[1] = 'start'
        } else if (oob.right) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
          this.element.placement[1] = 'end'
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
          this.target.placement[1] = 'end'
        }
      }

      if (oob.top && oob.bottom) {
        // if top and bottom bounds broken
        if (overflow.bottom < overflow.top) {
          // more room on bottom, position below
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
          this.element.placement[0] = 'bottom'
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
          this.target.placement[0] = 'top'
        } else if (overflow.bottom > overflow.top) {
          // more room on top, position above
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
          this.element.placement[0] = 'top'
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
          this.target.placement[0] = 'bottom'
        }
      } else if (oob.top) {
        // if top bound broken, position below
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
        this.element.placement[0] = 'bottom'
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
        this.target.placement[0] = 'top'
      } else if (oob.bottom) {
        // if bottom bound broken, position above
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
        this.element.placement[0] = 'top'
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
        this.target.placement[0] = 'bottom'
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
    } else if (this.element.hasHorizontalPlacement) {
      if (oob.top && oob.bottom) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
        this.element.placement[1] = 'center'
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
        this.target.placement[1] = 'center'
      } else if (oob.top) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
        this.element.placement[1] = 'top'
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
        this.target.placement[1] = 'top'
      } else if (oob.bottom) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
        this.element.placement[1] = 'bottom'
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
        this.target.placement[1] = 'bottom'
      }

      if (oob.left && oob.right) {
        // if left and right bounds broken
        if (overflow.left > overflow.right) {
          // more room at end, position after
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
          this.element.placement[0] = 'end'
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
          this.target.placement[0] = 'start'
        } else if (overflow.left < overflow.right) {
          // more room at start, position before
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
          this.element.placement[0] = 'start'
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
          this.target.placement[0] = 'end'
        }
      } else {
        if (oob.left) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
          this.element.placement[0] = 'end'
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
          this.target.placement[0] = 'start'
        } else if (oob.right) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'Positio... Remove this comment to see the full error message
          this.element.placement[0] = 'start'
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'Position... Remove this comment to see the full error message
          this.target.placement[0] = 'end'
        }
      }
    }
  }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'offsets' implicitly has an 'any' type.
function addOffsets(offsets) {
  return offsets.reduce(
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
    (sum, offset) => {
      return {
        top: sum.top + offset.top,
        left: sum.left + offset.left
      }
    },
    { top: 0, left: 0 }
  )
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'offset' implicitly has an 'any' type.
function parseOffset(offset, placement) {
  let { top, left } = offset

  if (placement[0] === 'bottom') {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    top = 0 - parseFloat(top, 10)
  }

  if (placement[0] === 'end') {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    left = 0 - parseFloat(left, 10)
  }

  return {
    top,
    left
  }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'offset' implicitly has an 'any' type.
function offsetToPx(offset, size) {
  let { left, top } = offset

  if (typeof left === 'string' && left.indexOf('%') !== -1) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    left = (parseFloat(left, 10) / 100) * size.width // eslint-disable-line no-mixed-operators
  } else {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    left = parseFloat(left, 10)
  }

  if (typeof top === 'string' && top.indexOf('%') !== -1) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    top = (parseFloat(top, 10) / 100) * size.height // eslint-disable-line no-mixed-operators
  } else {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    top = parseFloat(top, 10)
  }

  return { top, left }
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'placement' implicitly has an 'any' type... Remove this comment to see the full error message
function sortPlacement(placement) {
  let [first, second] = placement

  if (first === 'center' || first === 'stretch') {
    ;[first, second] = [second, first]
  }
  return [first, second]
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'placement' implicitly has an 'any' type... Remove this comment to see the full error message
function parsePlacement(placement) {
  let parsed = placement.split(' ')

  if (parsed.length === 1) {
    parsed = [placement, 'center']
  }

  return sortPlacement(parsed)
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'placement' implicitly has an 'any' type... Remove this comment to see the full error message
function formatPlacement(placement) {
  return placement.join(' ')
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
