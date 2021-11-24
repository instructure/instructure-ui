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
import { FocusRegionOptions } from './FocusRegionOptions'

class ScreenReaderFocusRegion {
  private _parents: HTMLElement[] = []
  private _nodes: Element[] = []
  private _liveRegion: (Element | undefined)[]
  private _contextElement: Element | Node | null
  private _options: FocusRegionOptions
  private _observer: MutationObserver | null = null
  private _attributes: [Element, string, string][] = []

  constructor(
    element: Element | Node | null,
    options: FocusRegionOptions = {
      shouldContainFocus: true,
      liveRegion: []
    }
  ) {
    const liveRegion =
      typeof options.liveRegion === 'function'
        ? options.liveRegion()
        : options.liveRegion
    this._liveRegion = Array.isArray(liveRegion) ? liveRegion : [liveRegion]
    this._contextElement = element
    this._options = options
  }

  updateElement(element: Element | Node) {
    this._contextElement = element
  }

  muteNode(node: Element) {
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
          this._attributes.push([node, attribute, value])
          node.removeAttribute(attribute)
        }
      })
      this._observer!.observe(node, { childList: true })
    }
  }

  hideNodes(nodes: Element[]) {
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
        this._parents.indexOf(node as HTMLElement) === -1 &&
        this._nodes.indexOf(node) === -1 &&
        this._liveRegion.indexOf(node) === -1 &&
        !this._contextElement!.contains(node)
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

  hideNode(node: Element) {
    if (node.getAttribute('aria-hidden') !== 'true') {
      node.setAttribute('aria-hidden', 'true')
      this._nodes.push(node)
    }
  }

  handleDOMMutation = (records: MutationRecord[]) => {
    records.forEach((record) => {
      const addedNodes = Array.from(record.addedNodes) as Element[]
      const removedNodes = Array.from(record.removedNodes) as Element[]

      this.hideNodes(addedNodes)

      removedNodes.forEach((removedNode) => {
        // Node has been removed from the DOM, make sure it is
        // removed from our list of hidden nodes as well
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

  restoreNode(removedNode: Element) {
    const index = this._nodes.indexOf(removedNode)

    if (index >= 0) {
      removedNode.removeAttribute('aria-hidden')
      this._nodes.splice(index, 1)
    }
  }

  parseIframeBodies(node: Element): HTMLElement[] {
    if (!node) return []
    let iframes: HTMLIFrameElement[] = []
    if (node.tagName.toLowerCase() === 'iframe') {
      iframes.push(node as HTMLIFrameElement)
    } else {
      if (node.getElementsByTagName) {
        iframes = Array.from(node.getElementsByTagName('iframe'))
      }
    }
    return iframes
      .map((iframe) => {
        let body = null
        try {
          body = iframe.contentDocument!.body
        } catch (e: unknown) {
          warn(
            false,
            `[ui-a11y] could not find a document for iframe: ${e} ${iframe}`
          )
        }
        return body
      })
      .filter((body) => body !== null) as HTMLElement[]
  }

  activate() {
    if (!this._options.shouldContainFocus) {
      return
    }
    this._observer = new MutationObserver(this.handleDOMMutation)
    let node = this._contextElement
    while (
      node &&
      node.nodeType === Node.ELEMENT_NODE &&
      (node as Element).tagName.toLowerCase() !== 'body'
    ) {
      const parent = node.parentElement
      if (parent) {
        this._parents.push(parent)
        this.muteNode(parent)
        this.hideNodes(Array.prototype.slice.call(parent.childNodes))
      }
      node = node.parentNode as Element // should never be null, will default to doc element
    }
  }

  deactivate() {
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

export default ScreenReaderFocusRegion
export {
  /**
   * ---
   * category: utilities/a11y
   * ---
   *
   * Utility that hides all DOM elements outside of a specified node. Used,
   * for example, in overlay components where we want to restrict the screen
   * readers to the overlay content.
   * @module ScreenReaderFocusRegion
   */
  ScreenReaderFocusRegion
}
