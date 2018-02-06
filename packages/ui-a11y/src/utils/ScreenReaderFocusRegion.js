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

import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'

/**
 * ---
 * category: utilities/a11y
 * ---
 * @module ScreenReaderFocusRegion
 * Utility that hides all DOM elements outside of a specified node. Used,
 * for example, in overlay components where we want to restrict the screen
 * readers to the overlay content
 */
class ScreenReaderFocusRegion {
  constructor () {
    this._nodes = []
  }

  /**
   * Hide all elements outside of a specified node
   * @param {ReactComponent|DomNode} el - component or DOM node we want to isolate
   * @param {Function|DomNode|Array} ignore - An element, function returning an element, or array of elements
   *  that will be ignored and will not receive aria-hidden
   */
  isolateRegion (el, ignore) {
    let node = findDOMNode(el)

    if (node) {
      while (node && node.nodeType === 1 && node.tagName !== 'BODY') {
        const screenReaderFocusRegionNode = new ScreenReaderFocusRegionNode(node, ignore)
        screenReaderFocusRegionNode.isolateRegion()
        this._nodes.push(screenReaderFocusRegionNode)

        node = node.parentNode
      }
    }
  }

  /**
   * Restore all elements back to their unhidden state
   */
  openRegion () {
    this._nodes.forEach((pathNode) => {
      pathNode.openRegion()
    })
    this._nodes = []
  }
}

class ScreenReaderFocusRegionNode {
  constructor (pathChild, ignore) {
    this._child = pathChild
    this._parent = pathChild.parentElement
    this._ignore = Array.isArray(ignore) ? ignore : [findDOMNode(ignore)]
    this._parentAttributes = []
    this._hiddenNodes = []
    this._observer = null
  }

  onMutation = (records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((addedNode) => {
        this.hideNode(addedNode)
      })

      record.removedNodes.forEach((removedNode) => {
        // Node has been removed from the DOM, make sure it is
        // removed from our list of hidden nodes as well
        const index = this._hiddenNodes.indexOf(removedNode)
        if (index >= 0) {
          this._hiddenNodes.splice(index, 1)
        }
      })
    })
  }

  hideNode (node) {
    const shouldHideNode = (
      node &&
      node.nodeType === 1 &&
      node !== this._child &&
      node.getAttribute('aria-hidden') !== 'true' &&
      this._hiddenNodes.indexOf(node) === -1 &&
      this._ignore.indexOf(node) === -1
    )

    if (shouldHideNode) {
      node.setAttribute('aria-hidden', 'true')
      this._hiddenNodes.push(node)
    }
  }

  muteParentAttributes () {
    // When we are trapping screen reader focus on an element that
    // is deep inside the DOM, we can't apply aria-hidden to the
    // parents, so parent regions will be read if they have a role
    // and/or aria-label assigned. To optimize SR ux we remove the role,
    // aria-label, and aria-hidden attrs temporarily when the region
    // is focused, and then we restore them when focus is lost.
    const muteAttributes = [
      'role',
      'aria-label',
      'aria-hidden'
    ]

    muteAttributes.forEach((attribute) => {
      const pathParentAttribute = this._parent.getAttribute(attribute)

      if (pathParentAttribute !== null) {
        this._parentAttributes.push([attribute, pathParentAttribute])
        this._parent.removeAttribute(attribute)
      }
    })
  }

  unmuteParentAttributes () {
    this._parentAttributes.forEach((pathParentAttribute) => {
      this._parent.setAttribute(pathParentAttribute[0], pathParentAttribute[1] || '')
    })
    this._parentAttributes = []
  }

  isolateRegion () {
    this._observer = new MutationObserver(this.onMutation)
    this._observer.observe(this._parent, { childList: true })

    this.muteParentAttributes()

    Array.prototype.slice.call(this._parent.childNodes).forEach((child) => {
      this.hideNode(child)
    })
  }

  openRegion () {
    this._observer.disconnect()
    this._observer = null

    this._hiddenNodes.forEach((node) => {
      node.removeAttribute('aria-hidden')
    })
    this._hiddenNodes = []

    this.unmuteParentAttributes()
  }
}

export default ScreenReaderFocusRegion
