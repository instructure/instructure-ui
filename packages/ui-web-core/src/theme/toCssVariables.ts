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

export type TokenTree = { [key: string]: TokenTree | string | number | boolean }

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype

// Recursive deep merge. `source` wins. Neither input is mutated.
// Matches the behavior the InstUI emotion runtime relies on for overrides,
// per [[Semantic-token merge bug]] — shallow merge here would silently drop
// whole branches of the token tree.
export const mergeDeep = <T extends Record<string, unknown>>(
  target: T,
  source?: Partial<T>
): T => {
  if (!source) return { ...target }
  const out: Record<string, unknown> = { ...target }
  for (const key of Object.keys(source)) {
    const srcVal = (source as Record<string, unknown>)[key]
    const tgtVal = out[key]
    if (isPlainObject(srcVal) && isPlainObject(tgtVal)) {
      out[key] = mergeDeep(
        tgtVal as Record<string, unknown>,
        srcVal as Record<string, unknown>
      )
    } else if (srcVal !== undefined) {
      out[key] = srcVal
    }
  }
  return out as T
}

// Flattens a nested token tree to `{ '--prefix-key-subkey': value }`.
// Skips `undefined` and function values; CSS doesn't accept them and themes
// in `@instructure/ui-themes/themes/newThemeTokens` store derivation logic as
// functions that callers must evaluate before passing in here.
export const flattenToCssVars = (
  tree: TokenTree,
  prefix = ''
): Record<string, string | number> => {
  const out: Record<string, string | number> = {}
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}-${key}` : `--${key}`
    if (value === undefined || typeof value === 'function') continue
    if (isPlainObject(value)) {
      Object.assign(out, flattenToCssVars(value as TokenTree, path))
    } else {
      out[path] = value as string | number
    }
  }
  return out
}

// Wraps a flat CSS-var map into a `:root { ... }` rule string ready to be
// dropped into a <style> tag.
export const cssVarsToRootRule = (
  vars: Record<string, string | number>
): string => {
  const lines = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`)
  return `:root {\n${lines.join('\n')}\n}`
}
