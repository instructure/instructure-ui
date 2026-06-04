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

// Use a dedicated DOMPurify instance instead of the shared singleton so our
// HTML profile never leaks onto the global instance other code relies on, and
// our validation stays correct even if someone else mutates the singleton via
// setConfig(). `window` is guarded for SSR; passing `undefined` yields an
// unsupported instance, in which case we fall back to `ssrSafeHref`.
const purify = createDOMPurify(
  typeof window === 'undefined' ? undefined : window
)

if (purify.isSupported) {
  purify.setConfig({ USE_PROFILES: { html: true } })
}

const SAFE_SCHEMES = [
  'http:',
  'https:',
  'ftp:',
  'ftps:',
  'mailto:',
  'tel:',
  'sms:',
  'callto:',
  'cid:',
  'xmpp:',
  'webcal:',
  'feed:',
  'geo:'
]

// Extract the scheme from a URL-ish value, or `null` if it has none.
function extractScheme(value: string): string | null {
  const normalized = value.replace(/[\t\n\r]/g, '').trim()
  const schemeMatch = normalized.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/)
  return schemeMatch ? schemeMatch[1].toLowerCase() + ':' : null
}

// (tag, attr) pairs that may legitimately carry a `data:` URI — matches
// DOMPurify's defaults so the SSR fallback doesn't reject inline images that
// the browser path would allow.
const DATA_URI_TAGS: ReadonlyArray<[string, string]> = [
  ['img', 'src'],
  ['source', 'src'],
  ['source', 'srcset'],
  ['video', 'poster']
]

// SSR fallback: DOMPurify only operates when a DOM is available. When it
// isn't, validate the scheme directly so server-rendered components don't
// silently drop every href.
function ssrSafeHref(value: string, tag: string, attr: string): boolean {
  const normalized = value.replace(/[\t\n\r]/g, '').trim()
  if (normalized === '') return true
  const firstChar = normalized.charAt(0)
  if (firstChar === '#' || firstChar === '/' || firstChar === '?') return true
  const scheme = extractScheme(normalized)
  if (!scheme) return true
  if (SAFE_SCHEMES.includes(scheme)) return true
  if (
    scheme === 'data:' &&
    DATA_URI_TAGS.some(([t, a]) => t === tag && a === attr)
  ) {
    return true
  }
  return false
}

/**
 * ---
 * category: utilities/utils
 * ---
 * Validates an attribute value and returns it only when the value is safe to
 * render. Delegates to `DOMPurify.isValidAttribute` in the browser; falls back
 * to a minimal scheme allow-list under SSR.
 *
 * @module safeHref
 *
 * @param href The value to validate
 * @param tag Element name the value will be applied to (e.g. `'a'`, `'img'`)
 * @param attr Attribute name (e.g. `'href'`, `'src'`)
 * @returns The original value if safe, `undefined` if blocked
 */
function safeHref(
  href: string | null | undefined,
  tag: string,
  attr: string
): string | undefined {
  if (href == null) return undefined
  const value = String(href)

  // Pre-check our scheme allowlist before DOMPurify, since DOMPurify's default
  // ALLOWED_URI_REGEXP rejects schemes like `webcal:` that we treat as safe.
  const scheme = extractScheme(value)
  if (scheme && SAFE_SCHEMES.includes(scheme)) return href

  const isSafe = purify.isSupported
    ? purify.isValidAttribute(tag, attr, value)
    : ssrSafeHref(value, tag, attr)

  if (!isSafe) {
    console.error(
      `[InstUI] Blocked unsafe ${tag} ${attr}: ` +
        `${value.slice(0, 80)}${value.length > 80 ? '…' : ''}`
    )
    return undefined
  }
  return href
}

export default safeHref
export { safeHref }
