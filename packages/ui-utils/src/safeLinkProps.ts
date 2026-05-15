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

import { safeHref } from './safeHref.js'

/**
 * ---
 * category: utilities/utils
 * ---
 * Centralizes the security-related normalization for link-rendering
 * components: validates `href`, and supplies a safe default `rel` when
 * `target="_blank"` is in use.
 *
 * @module safeLinkProps
 */
type SafeLinkInput = {
  href?: string | null
  target?: string
  rel?: string
  tag: string
  attr: string
}

type SafeLinkOutput = {
  href: string | undefined
  target: string | undefined
  rel: string | undefined
}

function safeLinkProps(input: SafeLinkInput): SafeLinkOutput {
  const { target, rel, tag, attr } = input
  const href = safeHref(input.href, tag, attr)
  const finalRel =
    target === '_blank' && rel == null ? 'noopener noreferrer' : rel
  return { href, target, rel: finalRel }
}

export default safeLinkProps
export { safeLinkProps }
