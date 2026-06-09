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

/*
 * Shared bridge from InstUI's emotion-style objects to a CSS string for the Lit
 * web components. Lit ships no runtime CSS-in-JS, so each component's
 * `generateStyle` (which returns the same nested-object shape emotion consumes
 * in React) is serialized to a `<style>` string scoped to the shadow root.
 *
 * Promoted out of the POC Alert so multiple components (Alert, Drilldown, ...)
 * share one converter — the source of truth for the "emotion object -> CSS"
 * step. The converter is a superset of the original Alert-only version: it also
 * (a) skips scalar section values (e.g. Drilldown's `headerActionColor`, which
 * the component reads directly rather than emitting as a rule), and (b) expands
 * nested `&`-selectors (e.g. `'&:focus::before'`) into their own rules.
 */

// CSS properties that take unitless numeric values; matches the subset emotion
// considers unitless. `margin: -1` becomes `-1px`; `order: 1` stays `1`.
const UNITLESS = new Set([
  'animationIterationCount',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'columns',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'gridRow',
  'gridRowEnd',
  'gridRowSpan',
  'gridRowStart',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnSpan',
  'gridColumnStart',
  'fontWeight',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom'
])

export const camelToKebab = (s: string): string =>
  s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

export const toCssValue = (key: string, value: unknown): string => {
  if (typeof value === 'number' && !UNITLESS.has(key) && value !== 0) {
    return `${value}px`
  }
  return String(value)
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

// Returns the flat declarations of a block plus any nested selector blocks
// (keys whose value is itself an object, e.g. `'&:focus::before'`).
const splitBlock = (
  block: Record<string, unknown>
): { declarations: string; nested: [string, Record<string, unknown>][] } => {
  const declarations: string[] = []
  const nested: [string, Record<string, unknown>][] = []

  for (const [key, value] of Object.entries(block)) {
    // emotion's `label` is a debug marker, not a real declaration
    if (key === 'label' || value === undefined || value === null) continue

    if (isPlainObject(value)) {
      nested.push([key, value])
    } else {
      declarations.push(`  ${camelToKebab(key)}: ${toCssValue(key, value)};`)
    }
  }

  return { declarations: declarations.join('\n'), nested }
}

/**
 * Takes the section→declarations map returned by a `generateStyle` function and
 * emits a CSS string scoped to the shadow root. Section names become class
 * selectors on the rendered elements. Scalar sections (a section whose value is
 * a plain string/number rather than a declarations object) are skipped — the
 * component reads those directly. Nested `&`-selectors are expanded against the
 * section's class selector.
 */
export const styleObjectToCss = (sections: Record<string, unknown>): string => {
  const rules: string[] = []

  for (const [section, block] of Object.entries(sections)) {
    if (!isPlainObject(block)) continue

    const { declarations, nested } = splitBlock(block)
    rules.push(`.${section} {\n${declarations}\n}`)

    for (const [selector, nestedBlock] of nested) {
      // `&` refers to the section's own class selector
      const resolvedSelector = selector.replace(/&/g, `.${section}`)
      const { declarations: nestedDeclarations } = splitBlock(nestedBlock)
      rules.push(`${resolvedSelector} {\n${nestedDeclarations}\n}`)
    }
  }

  return rules.join('\n')
}
