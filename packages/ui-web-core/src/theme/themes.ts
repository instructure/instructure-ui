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

import { canvas, canvasHighContrast, dark, light } from '@instructure/ui-themes'

import { mergeDeep, type TokenTree } from './toCssVariables'

// The four InstUI themes ship as composed objects from `@instructure/ui-themes`
// — `{ newTheme: { primitives, semantics, sharedTokens, components }, ...legacy }`.
// We only consume the newTheme branch; everything else (legacy color object,
// brand variables, etc.) is for React-side compatibility.
const rawOf = (theme: { newTheme: unknown }) => theme.newTheme

export type ThemeName =
  | 'defaultTheme'
  | 'contrastTheme'
  | 'darkTheme'
  | 'lightTheme'

// The shape we expect from `@instructure/ui-themes/themes/newThemeTokens`.
// `semantics`, `sharedTokens`, and each entry under `components` are functions
// in the source — they must be evaluated in dependency order before the
// resulting tree can be flattened into CSS variables.
type RawTheme = {
  primitives: TokenTree
  semantics: (primitives: TokenTree) => TokenTree
  sharedTokens: (semantics: TokenTree) => TokenTree
  components: Record<string, (semantics: TokenTree) => TokenTree>
}

export type InstUIWebTheme = {
  isEnabled: boolean
  raw: RawTheme
}

// Token overrides arrive from custom-*-theme attributes as parsed JSON. They
// can shadow any branch of the resolved token tree. `isEnabled` is consumed
// upstream (see ThemeProvider), so it's stripped before being passed here.
export type ThemeOverrides = {
  primitives?: Partial<TokenTree>
  semantics?: Partial<TokenTree>
  sharedTokens?: Partial<TokenTree>
  components?: Record<string, Partial<TokenTree>>
}

// The flat result that gets handed to the CSS-var flattener. `components` is
// kept namespaced so a `components.Button.background` token becomes
// `--components-Button-background` rather than colliding with semantics.
export type ResolvedTheme = {
  primitives: TokenTree
  semantics: TokenTree
  sharedTokens: TokenTree
  components: TokenTree
}

const evaluateComponents = (
  components: RawTheme['components'],
  semantics: TokenTree
): TokenTree => {
  const out: TokenTree = {}
  for (const [name, fn] of Object.entries(components)) {
    if (typeof fn !== 'function') continue
    try {
      out[name] = fn(semantics) as TokenTree
    } catch {
      // Some components throw when called with mismatched semantics shape
      // (e.g. dark/contrast themes that don't override every component); we
      // skip those rather than refuse to render the whole theme.
      continue
    }
  }
  return out
}

// Resolves a raw theme (with derivation functions) plus optional overrides
// into the flat `{primitives, semantics, sharedTokens, components}` tree the
// flattener consumes. Mirrors the order InstUI's emotion runtime uses in
// `useStyleNew.ts`.
export const resolveTheme = (
  raw: RawTheme,
  overrides?: ThemeOverrides
): ResolvedTheme => {
  const primitives = mergeDeep(raw.primitives, overrides?.primitives)

  const semantics = mergeDeep(
    raw.semantics?.(primitives) ?? {},
    overrides?.semantics
  )

  const sharedTokens = mergeDeep(
    raw.sharedTokens?.(semantics) ?? {},
    overrides?.sharedTokens
  )

  const components = mergeDeep(
    evaluateComponents(raw.components ?? {}, semantics),
    overrides?.components as TokenTree | undefined
  )

  return { primitives, semantics, sharedTokens, components }
}

// `isEnabled` defaults mirror tastysoft's pattern: default and light are
// always on; contrast and dark opt in based on system preference cookies set
// by the provider on first paint.
export const themes: Record<ThemeName, InstUIWebTheme> = {
  defaultTheme: { isEnabled: true, raw: rawOf(canvas) as RawTheme },
  contrastTheme: {
    isEnabled: false,
    raw: rawOf(canvasHighContrast) as RawTheme
  },
  darkTheme: { isEnabled: false, raw: rawOf(dark) as RawTheme },
  lightTheme: { isEnabled: true, raw: rawOf(light) as RawTheme }
}
