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
import {
  colorToHsla,
  color2hex,
  colorToHex8
} from '@instructure/ui-color-utils'

type ModifyColor = {
  value: string
  modify: {
    type: 'lighten' | 'darken' | 'alpha'
    value: number
  }
}

// Matches Tokens Studio's HSL modifier math: move L by `amount` (0–1) of the
// remaining distance toward the endpoint, so the step shrinks as it approaches
// black/white and never overshoots.
const modifyLightness = (
  l: number,
  amount: number,
  type: 'darken' | 'lighten'
): number =>
  type === 'darken'
    ? Math.max(0, l - l * amount)
    : Math.min(1, l + (1 - l) * amount)

const formatColor = (h: number, s: number, l: number, a: number): string => {
  const hsla = `hsla(${Math.round(h)}, ${+(s * 100).toFixed(2)}%, ${+(
    l * 100
  ).toFixed(2)}%, ${a})`
  return a < 1 ? colorToHex8(hsla) : color2hex(hsla)
}

const isModifyColor = (val: unknown): val is ModifyColor =>
  typeof val === 'object' &&
  val !== null &&
  typeof (val as ModifyColor).value === 'string' &&
  typeof (val as ModifyColor).modify === 'object' &&
  (val as ModifyColor).modify !== null

const resolveModifyColor = ({ value, modify }: ModifyColor): string => {
  if (modify.type === 'darken' || modify.type === 'lighten') {
    const { h, s, l, a } = colorToHsla(value)
    const newL = modifyLightness(l, modify.value, modify.type)
    return formatColor(h, s, newL, a)
  }
  if (modify.type === 'alpha') {
    const { h, s, l } = colorToHsla(value)
    const newA = Math.min(1, Math.max(0, Number(modify.value)))
    return formatColor(h, s, l, newA)
  }
  return value
}

/**
 * Resolves a component theme object by applying color modifiers to any entries
 * shaped as `{ value, modify: { type, value } }`. Entries with `modify.type` of
 * `'darken'` or `'lighten'` are transformed in HSL space using the same math
 * Tokens Studio applies (`space: "hsl"`): `amount` is a 0–1 fraction of the
 * remaining distance to black/white. Entries with `modify.type` of `'alpha'`
 * have their alpha channel replaced by `modify.value` (clamped to 0–1), matching
 * Tokens Studio's `alpha` modifier. Plain values and unrecognized modifier types
 * are passed through unchanged. Nested plain objects are walked recursively so
 * modifiers anywhere in the tree get resolved.
 *
 * @param componentTheme - Theme map whose values can be CSS strings, `ModifyColor`
 *   objects, or nested theme objects containing the same.
 * @returns A new theme object mirroring the input shape, with every `ModifyColor`
 *   collapsed to its final resolved color string.
 */
const applyColorModifiers = (
  componentTheme: Record<string, unknown> | undefined | null
): Record<string, unknown> => {
  if (componentTheme == null) return {}
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(componentTheme)) {
    const entry = componentTheme[key]
    if (isModifyColor(entry)) {
      result[key] = resolveModifyColor(entry)
    } else if (
      typeof entry === 'object' &&
      entry !== null &&
      !Array.isArray(entry)
    ) {
      result[key] = applyColorModifiers(entry as Record<string, unknown>)
    } else {
      result[key] = entry
    }
  }
  return result
}

export default applyColorModifiers
export { applyColorModifiers }
