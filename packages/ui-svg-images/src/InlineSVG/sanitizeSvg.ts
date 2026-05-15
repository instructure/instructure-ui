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

import DOMPurify from 'dompurify'

// Sanitize a full `<svg>...</svg>` string. DOMPurify only operates when a DOM
// is available (i.e. in the browser); on the server it returns empty so unsafe
// content never lands in SSR output. Callers should pass the complete SVG —
// outer attributes are filtered in the same pass as the inner content.
function sanitizeSvg(src: string) {
  if (typeof src !== 'string' || src === '') return src
  if (!DOMPurify.isSupported) return ''
  DOMPurify.setConfig({ USE_PROFILES: { svg: true, svgFilters: true } })
  return DOMPurify.sanitize(src)
}

export default sanitizeSvg
export { sanitizeSvg }
