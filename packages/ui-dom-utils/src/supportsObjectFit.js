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

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Performs simple test to determine the browser supports CSS object-fit.
 *
 * https://caniuse.com/#feat=object-fit
 *
 * @module
 * @returns {boolean} true if object-fit is supported
 */
function supportsObjectFit () {
  if (!canUseDOM) {
    return false
  } else {
    // Detect browser support for object-fit
    // Don't need to sniff for Edge 16 bc it supports object-fit for <img>
    return ('objectFit' in document.documentElement.style) !== false
  }
}

export default supportsObjectFit
export { supportsObjectFit }
