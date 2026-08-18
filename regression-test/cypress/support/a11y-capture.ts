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

/**
 * Turns axe's raw output into something the visual-diff report can show to a
 * designer.
 *
 * axe tells you a rule id and a CSS selector. Neither means much to someone
 * reading a screenshot, so while the page is still on screen we also grab, per
 * violating element:
 *
 * - its **bounding box** in page coordinates, so the report can draw a numbered
 *   box over exactly that spot on the screenshot;
 * - a **human-readable label** (`button "Save changes"`) to name it in prose;
 * - the **color-contrast numbers** axe already computed, so the report can show
 *   swatches and a ratio instead of a paragraph of prose.
 *
 * The result is consumed by `ui-scripts visual-diff --a11y`.
 */

import type { NodeResult, Result } from 'axe-core'

export type A11yRect = { x: number; y: number; w: number; h: number }

export type A11yContrast = {
  fg: string
  bg: string
  ratio: number
  expected: number
  fontSize?: string
  fontWeight?: string
}

export type CapturedNode = {
  target: string
  html: string
  summary: string
  label: string
  rect: A11yRect | null
  contrast: A11yContrast | null
}

export type CapturedViolation = {
  id: string
  impact: string | null
  help: string
  helpUrl: string
  nodes: CapturedNode[]
}

export type CapturedPage = {
  page: { w: number; h: number }
  violations: CapturedViolation[]
}

const MAX_LABEL_TEXT = 60

/**
 * axe returns a selector per DOM level, and an array-of-arrays when the element
 * is inside a shadow root. Flatten to a single descendant selector — good
 * enough to re-find light-DOM elements, which is all InstUI renders.
 */
export function flattenTarget(target: unknown[]): string {
  return target
    .map((t) => (Array.isArray(t) ? t.join(' ') : String(t)))
    .join(' ')
}

/**
 * Name an element the way a person would point at it: what kind of thing it is,
 * plus whatever text identifies it. Falls back to the tag name alone for
 * elements with no text (an icon, an empty container) rather than inventing
 * something.
 */
export function describeElement(el: Element): string {
  const tag = el.tagName.toLowerCase()
  const role = el.getAttribute('role')
  const kind = role ? `${tag} (role=${role})` : tag
  const text = (
    el.getAttribute('aria-label') ||
    el.getAttribute('alt') ||
    el.getAttribute('title') ||
    (el as HTMLElement).innerText ||
    el.textContent ||
    ''
  )
    .replace(/\s+/g, ' ')
    .trim()
  if (!text) return kind
  const clipped =
    text.length > MAX_LABEL_TEXT ? `${text.slice(0, MAX_LABEL_TEXT)}…` : text
  return `${kind} “${clipped}”`
}

/**
 * Pull the contrast numbers out of the check axe actually ran. `expectedContrastRatio`
 * comes back as a string like `"4.5:1"`.
 */
export function contrastOf(node: NodeResult): A11yContrast | null {
  const check = [...(node.any ?? []), ...(node.all ?? [])].find(
    (c) => c.id === 'color-contrast' || c.id === 'color-contrast-enhanced'
  )
  const data = check?.data as
    | {
        fgColor?: string
        bgColor?: string
        contrastRatio?: number
        expectedContrastRatio?: string
        fontSize?: string
        fontWeight?: string
      }
    | undefined
  if (!data?.fgColor || !data.bgColor || typeof data.contrastRatio !== 'number')
    return null
  return {
    fg: data.fgColor,
    bg: data.bgColor,
    ratio: data.contrastRatio,
    expected: parseFloat(data.expectedContrastRatio ?? '4.5'),
    fontSize: data.fontSize,
    fontWeight: data.fontWeight
  }
}

/**
 * Bounding box in document coordinates. The screenshots are captured with
 * `capture: 'fullPage'`, whose origin is the top-left of the document, so the
 * scroll offset has to be folded in — `getBoundingClientRect` is
 * viewport-relative.
 */
export function rectOf(el: Element, win: Window): A11yRect | null {
  const r = el.getBoundingClientRect()
  if (!r.width && !r.height) return null
  return {
    x: Math.round(r.left + win.scrollX),
    y: Math.round(r.top + win.scrollY),
    w: Math.round(r.width),
    h: Math.round(r.height)
  }
}

/**
 * Dimensions the rects were measured against, so the report can express every
 * box as a percentage and have it hold at any rendered size. Width is the
 * layout viewport (fullPage screenshots grow downward, never sideways).
 */
export function pageSizeOf(win: Window): { w: number; h: number } {
  const el = win.document.documentElement
  return {
    w: el.clientWidth,
    h: Math.max(el.scrollHeight, el.clientHeight)
  }
}

/** Serialize one axe run against the page that is currently rendered. */
export function captureViolations(
  violations: Result[],
  win: Window
): CapturedPage {
  return {
    page: pageSizeOf(win),
    violations: violations.map((v) => ({
      id: v.id,
      impact: v.impact ?? null,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.map((node) => {
        const target = flattenTarget(node.target)
        let el: Element | null = null
        try {
          el = win.document.querySelector(target)
        } catch {
          // A selector axe can produce but querySelector can't parse (shadow
          // DOM paths, mostly). The finding still reports; it just won't get a
          // box on the screenshot.
        }
        return {
          target,
          html: node.html,
          summary: node.failureSummary ?? '',
          label: el ? describeElement(el) : '',
          rect: el ? rectOf(el, win) : null,
          contrast: contrastOf(node)
        }
      })
    }))
  }
}
