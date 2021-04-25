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

import { logWarn as warn } from '@instructure/console'

class ScreenReaderFocusRegion {
  constructor(
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
    element,
    options = {
      shouldContainFocus: true,
      liveRegion: []
    }
  ) {
    const liveRegion =
      typeof options.liveRegion === 'function'
        ? // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
          options.liveRegion()
        : options.liveRegion
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_liveRegion' does not exist on type 'Scr... Remove this comment to see the full error message
    this._liveRegion = Array.isArray(liveRegion) ? liveRegion : [liveRegion]
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_contextElement' does not exist on type ... Remove this comment to see the full error message
    this._contextElement = element
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Screen... Remove this comment to see the full error message
    this._options = options
  }

  _observer = null
  _attributes = []
  _nodes = []
  _parents = []

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  updateElement(element) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_contextElement' does not exist on type ... Remove this comment to see the full error message
    this._contextElement = element
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  muteNode(node) {
    if (node && node.tagName.toLowerCase() !== 'script') {
      // When we are trapping screen reader focus on an element that
      // is deep inside the DOM, we can't apply aria-hidden to the
      // parents, so parent regions will be read if they have a role
      // and/or aria-label assigned. To optimize SR ux we remove the role,
      // aria-label, and aria-hidden attrs temporarily when the region
      // is focused, and then we restore them when focus is lost.
      ;[
        'role',
        'aria-label',
        'aria-hidden' // this should never happen right?
      ].forEach((attribute) => {
        const value = node.getAttribute(attribute)

        if (value !== null) {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          this._attributes.push([node, attribute, value])
          node.removeAttribute(attribute)
        }
      })

      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._observer.observe(node, { childList: true })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nodes' implicitly has an 'any' type.
  hideNodes(nodes) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
    nodes.forEach((node) => {
      const ariaLive =
        typeof node.getAttribute === 'function' &&
        node.getAttribute('aria-live')?.toLowerCase()
      if (
        node &&
        node.nodeType === 1 &&
        node.tagName.toLowerCase() !== 'script' &&
        ariaLive !== 'assertive' &&
        ariaLive !== 'polite' &&
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        this._parents.indexOf(node) === -1 &&
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        this._nodes.indexOf(node) === -1 &&
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_liveRegion' does not exist on type 'Scr... Remove this comment to see the full error message
        this._liveRegion.indexOf(node) === -1 &&
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_contextElement' does not exist on type ... Remove this comment to see the full error message
        !this._contextElement.contains(node)
      ) {
        if (node.tagName.toLowerCase() !== 'iframe') {
          this.hideNode(node)
        }

        const iframeBodies = this.parseIframeBodies(node)

        iframeBodies.forEach((iframeBody) => {
          this.hideNode(iframeBody)
        })
      }
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  hideNode(node) {
    if (node.getAttribute('aria-hidden') !== 'true') {
      node.setAttribute('aria-hidden', 'true')
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
      this._nodes.push(node)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'records' implicitly has an 'any' type.
  handleDOMMutation = (records) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'record' implicitly has an 'any' type.
    records.forEach((record) => {
      const addedNodes = Array.from(record.addedNodes)
      const removedNodes = Array.from(record.removedNodes)

      this.hideNodes(addedNodes)

      removedNodes.forEach((removedNode) => {
        // Node has been removed from the DOM, make sure it is
        // removed from our list of hidden nodes as well
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        if (removedNode.tagName.toLowerCase() !== 'iframe') {
          this.restoreNode(removedNode)
        }

        const iframeBodies = this.parseIframeBodies(removedNode)
        iframeBodies.forEach((iframeBody) => {
          this.restoreNode(iframeBody)
        })
      })
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'removedNode' implicitly has an 'any' ty... Remove this comment to see the full error message
  restoreNode(removedNode) {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    const index = this._nodes.indexOf(removedNode)

    if (index >= 0) {
      removedNode.removeAttribute('aria-hidden')
      this._nodes.splice(index, 1)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  parseIframeBodies(node) {
    if (!node) return []

    let iframes = []

    if (node.tagName.toLowerCase() === 'iframe') {
      iframes.push(node)
    } else {
      if (node.getElementsByTagName) {
        iframes = Array.from(node.getElementsByTagName('iframe'))
      }
    }

    return iframes
      .map((iframe) => {
        let body = null
        try {
          body = iframe.contentDocument.body
        } catch (e) {
          // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 3.
          warn(
            false,
            `[ui-a11y] could not find a document for iframe: ${e}`,
            iframe
          )
        }
        return body
      })
      .filter((body) => body !== null)
  }

  activate() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Screen... Remove this comment to see the full error message
    if (!this._options.shouldContainFocus) {
      return
    }

    // @ts-expect-error ts-migrate(2322) FIXME: Type 'MutationObserver' is not assignable to type ... Remove this comment to see the full error message
    this._observer = new MutationObserver(this.handleDOMMutation)

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_contextElement' does not exist on type ... Remove this comment to see the full error message
    let node = this._contextElement

    while (
      node &&
      node.nodeType === 1 &&
      node.tagName.toLowerCase() !== 'body'
    ) {
      const parent = node.parentElement // can be null

      if (parent) {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        this._parents.push(parent)

        this.muteNode(parent)

        this.hideNodes(Array.prototype.slice.call(parent.childNodes))
      }

      node = node.parentNode // should never be null, will default to doc element
    }
  }

  deactivate() {
    if (this._observer) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this._observer.disconnect()
      this._observer = null
    }

    this._nodes.forEach((node) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeAttribute' does not exist on type ... Remove this comment to see the full error message
      node.removeAttribute('aria-hidden')
    })
    this._nodes = []

    this._attributes.forEach((attribute) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setAttribute' does not exist on type 'ne... Remove this comment to see the full error message
      attribute[0].setAttribute(attribute[1], attribute[2] || '')
    })
    this._attributes = []

    this._parents = []
  }
}

export default ScreenReaderFocusRegion
export {
  /**
   * ---
   * category: utilities/a11y
   * ---
   * @module ScreenReaderFocusRegion
   * Utility that hides all DOM elements outside of a specified node. Used,
   * for example, in overlay components where we want to restrict the screen
   * readers to the overlay content
   */
  ScreenReaderFocusRegion
}
