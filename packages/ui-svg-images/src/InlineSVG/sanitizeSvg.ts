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

import createDOMPurify from 'dompurify'

// Use a dedicated DOMPurify instance instead of the shared singleton so that
// our SVG profile never leaks onto the global instance other code relies on,
// and our sanitization stays correct even if someone else mutates the
// singleton via setConfig(). `window` is guarded for SSR; passing `undefined`
// yields an unsupported instance whose `sanitize` we never reach.
const purify = createDOMPurify(
  typeof window === 'undefined' ? undefined : window
)

// Restrict <use> references to same-document fragments like #my-symbol, hooks
// are per-instance
if (purify.isSupported) {
  purify.addHook('afterSanitizeAttributes', (node) => {
    if (node.nodeName?.toLowerCase() !== 'use') return

    for (const attribute of ['href', 'xlink:href']) {
      const value = node.getAttribute(attribute)
      if (value !== null && !value.trim().startsWith('#')) {
        node.removeAttribute(attribute)
      }
    }
  })
}

type SanitizeSvgOptions = {
  allowUseElement?: boolean
}

// Sanitize a full `<svg>...</svg>` string; pass the complete SVG.
// Outer attributes are filtered alongside the inner content.
// DOMPurify needs a DOM, so SSR returns empty instead.
function sanitizeSvg(src: string, options?: SanitizeSvgOptions) {
  if (typeof src !== 'string' || src === '') return src
  if (!purify.isSupported) return ''

  const config: Record<string, unknown> = {
    USE_PROFILES: { svg: true, svgFilters: true }
  }

  if (options?.allowUseElement) {
    config.ADD_TAGS = ['use']
    config.ADD_ATTR = ['href', 'xlink:href']
  }

  return purify.sanitize(src, config as Parameters<typeof purify.sanitize>[1])
}

export default sanitizeSvg
export { sanitizeSvg }
