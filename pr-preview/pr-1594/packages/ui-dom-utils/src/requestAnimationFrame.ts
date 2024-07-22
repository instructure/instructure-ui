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

import { canUseDOM } from './canUseDOM'

type RequestAnimationFrameType = { cancel: () => void }

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * If DOM is usable, returns a function wrapper for
 * window.requestAnimationFrame. Otherwise sets
 * a manual timeout.
 * @module requestAnimationFrame
 *
 * @returns {function} requestAnimationFrame takes a callback function as an argument and returns a cancel method
 */
const requestAnimationFrame = (function () {
  let requestAnimationFrame

  /* istanbul ignore else  */
  if (
    canUseDOM &&
    window.requestAnimationFrame &&
    window.cancelAnimationFrame
  ) {
    requestAnimationFrame = (cb: FrameRequestCallback) => {
      const id = window.requestAnimationFrame(cb)
      return {
        cancel: () => window.cancelAnimationFrame(id)
      }
    }
  } else {
    /* https://github.com/component/raf */
    let prev = new Date().getTime()

    requestAnimationFrame = (cb: FrameRequestCallback) => {
      const curr = new Date().getTime()
      const ms = Math.max(0, 16 - (curr - prev))
      const req = setTimeout(cb, ms)
      prev = curr
      return {
        cancel: () => clearTimeout(req)
      }
    }
  }

  return requestAnimationFrame
})()

export default requestAnimationFrame
export { requestAnimationFrame }
export type { RequestAnimationFrameType }
