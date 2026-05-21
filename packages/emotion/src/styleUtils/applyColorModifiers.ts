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
import { colorToHsla } from '@instructure/ui-color-utils'

type ModifyColor = {
  value: string
  modify: {
    type: 'lighten' | 'darken'
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

const formatHsla = (h: number, s: number, l: number, a: number): string => {
  const hh = Math.round(h)
  const ss = +(s * 100).toFixed(2)
  const ll = +(l * 100).toFixed(2)
  return a < 1
    ? `hsla(${hh}, ${ss}%, ${ll}%, ${a})`
    : `hsl(${hh}, ${ss}%, ${ll}%)`
}

/**
 * Resolves a component theme object by applying color modifiers to any entries
 * shaped as `{ value, modify: { type, value } }`. Entries with `modify.type` of
 * `'darken'` or `'lighten'` are transformed in HSL space using the same math
 * Tokens Studio applies (`space: "hsl"`): `amount` is a 0–1 fraction of the
 * remaining distance to black/white. Plain string values and unrecognized
 * modifier types are passed through unchanged.
 *
 * @param componentTheme - Theme map whose values are either plain CSS color strings
 *   or `ModifyColor` objects describing a base color and a darken/lighten modifier.
 * @returns A new theme object with the same keys, where modifier objects have been
 *   collapsed to their final resolved color string.
 */
const applyColorModifiers = (
  componentTheme: Record<string, string | ModifyColor> | undefined | null
) => {
  if (componentTheme == null) return {}
  return Object.keys(componentTheme).reduce<Record<string, string>>(
    (res, k) => {
      const entry = componentTheme[k]
      if (typeof entry === 'object' && entry !== null) {
        const { value, modify } = entry
        if (modify.type === 'darken' || modify.type === 'lighten') {
          const { h, s, l, a } = colorToHsla(value)
          const newL = modifyLightness(l, modify.value, modify.type)
          return { ...res, [k]: formatHsla(h, s, newL, a) }
        }
        return { ...res, [k]: value }
      }
      return { ...res, [k]: entry }
    },
    {}
  )
}

export default applyColorModifiers
export { applyColorModifiers }
