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
export default class ScreenReaderFocusRegion {
  constructor (element, options = {
    shouldContainFocus: true,
    liveRegion: []
  }) {
    this._liveRegion = Array.isArray(options.liveRegion) ? options.liveRegion : [findDOMNode(options.liveRegion)]
    this._contextElement = findDOMNode(element)
    this._options = options
  }

  _observer = null
  _attributes = []
  _nodes = []
  _parents = []

  muteNode (node) {
    if (node) {
      // When we are trapping screen reader focus on an element that
      // is deep inside the DOM, we can't apply aria-hidden to the
      // parents, so parent regions will be read if they have a role
      // and/or aria-label assigned. To optimize SR ux we remove the role,
      // aria-label, and aria-hidden attrs temporarily when the region
      // is focused, and then we restore them when focus is lost.
      [
        'role',
        'aria-label',
        'aria-hidden' // this should never happen right?
      ].forEach((attribute) => {
        const value = node.getAttribute(attribute)

        if (value !== null) {
          this._attributes.push([node, attribute, value])
          node.removeAttribute(attribute)
        }
      })

      this._observer.observe(node, { childList: true })
    }
  }

  hideNode (node) {
    if (
      node &&
      node.nodeType === 1 &&
      node !== this._contextElement &&
      node.getAttribute('aria-hidden') !== 'true' &&
      this._parents.indexOf(node) === -1 &&
      this._nodes.indexOf(node) === -1 &&
      this._liveRegion.indexOf(node) === -1
    ) {
      node.setAttribute('aria-hidden', 'true')
      this._nodes.push(node)
    }
  }

  handleDOMMutation = (records) => {
    records.forEach((record) => {
      Array.from(record.addedNodes).forEach((addedNode) => {
        this.hideNode(addedNode)
      })

      record.removedNodes.forEach((removedNode) => {
        // Node has been removed from the DOM, make sure it is
        // removed from our list of hidden nodes as well
        const index = this._nodes.indexOf(removedNode)
        if (index >= 0) {
          this._nodes.splice(index, 1)
        }
      })
    })
  }

  setup () {
    if (!this._options.shouldContainFocus) {
      return
    }

    this._observer = new MutationObserver(this.handleDOMMutation)

    let node = this._contextElement

    while (node && node.nodeType === 1 && node.tagName !== 'BODY') {
      const parent = node.parentElement // can be null

      if (parent) {
        this._parents.push(parent)

        this.muteNode(parent)

        Array.prototype.slice.call(parent.childNodes)
          .forEach((child) => {
            this.hideNode(child)
          })
      }

      node = node.parentNode // should never be null, will default to doc element
    }
  }

  teardown () {
    if (this._observer) {
      this._observer.disconnect()
      this._observer = null
    }

    this._nodes.forEach((node) => {
      node.removeAttribute('aria-hidden')
    })
    this._nodes = []

    this._attributes.forEach((attribute) => {
      attribute[0].setAttribute(attribute[1], attribute[2] || '')
    })
    this._attributes = []

    this._parents = []
  }
}
