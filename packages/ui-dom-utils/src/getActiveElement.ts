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

import { isDefinedCustomElement } from './isDefinedCustomElement'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Get the active element of the specified document
 * @module getActiveElement
 * @param { Document } doc - document by default or user specified doc
 * @return { Element | null } the active element
 */
function getActiveElement(doc?: Document) {
  const activeElement = (doc || document).activeElement

  // TODO make it detect embedded iframes:
  // https://stackoverflow.com/questions/25420219/find-focused-element-in-document-with-many-iframes
  const contentDocument =
    activeElement && (activeElement as HTMLIFrameElement).contentDocument
  if (contentDocument && contentDocument.activeElement) {
    return contentDocument.activeElement
  }
  //check if activeElement is a custom element or not
  if (activeElement && isDefinedCustomElement(activeElement)) {
    return activeElement.shadowRoot!.activeElement
  }

  return activeElement
}

export default getActiveElement
export { getActiveElement }
