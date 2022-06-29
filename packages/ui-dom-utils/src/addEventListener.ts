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

import { findDOMNode } from './findDOMNode'

type ReactEvent = <T extends Event>(event: T) => void

/**
 * ---
 * category: utilities/DOM
 * ---
 * Wrapper function for DOM addEventListener
 * @module addEventListener
 * @param { Node | Window } el - DOM node which will have the event listener attached
 * @param { string } event - a string specifying the event name ('click', 'focus', etc)
 * @param { React.EventHandler<React.SyntheticEvent<any, any>> } handler - function to run when event occurs
 * @param { boolean } capture - should the event be executed in the capturing or bubbling phase
 * @returns {{ remove(): void }} a method to remove the event listener
 */
function addEventListener(
  el: Node | Window,
  event: keyof WindowEventMap,
  handler: React.EventHandler<React.SyntheticEvent<any, any>>,
  capture?: boolean
) {
  const node = el === window || el === document ? el : findDOMNode(el)
  node?.addEventListener(event, handler as ReactEvent, capture)

  return {
    remove() {
      node?.removeEventListener(event, handler as ReactEvent, capture)
    }
  }
}

export default addEventListener
export { addEventListener }
