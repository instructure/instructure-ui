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
 * Framework-neutral primitives for the v2 Alert. This file has no runtime
 * imports — every symbol is either a type or a `const` of plain data — so it
 * can be consumed from non-React contexts (e.g. @instructure/ui-web-core's
 * Lit-based Alert) without pulling React into the bundle.
 *
 * React-flavored composite types (the ones that pull in ReactNode, Renderable,
 * WithStyleProps, etc.) live in ./props.ts.
 */

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export type AlertTransition = 'none' | 'fade'

export type AlertLiveRegionPoliteness = 'polite' | 'assertive'

export type AlertLiveRegion =
  | Element
  | null
  | (() => Element | null | undefined)

// Narrow contract for what styles.ts actually reads off props. Keeps the
// style generator decoupled from any React-flavored composite prop type.
export type AlertStyleInputs = {
  variant?: AlertVariant
  hasShadow: boolean
}

// Generic on the renderable / children types so each adapter can pin them:
//   React:  AlertCorePropsOf<Renderable, ReactNode>
//   Lit:    AlertCorePropsOf<unknown, unknown> (or TemplateResult)
export type AlertCorePropsOf<TRenderable, TChildren = TRenderable> = {
  children?: TChildren
  variant?: AlertVariant
  variantScreenReaderLabel?: string
  liveRegion?: AlertLiveRegion
  liveRegionPoliteness?: AlertLiveRegionPoliteness
  isLiveRegionAtomic?: boolean
  screenReaderOnly?: boolean
  timeout?: number
  renderCloseButtonLabel?: TRenderable
  onDismiss?: () => void
  transition?: AlertTransition
  open?: boolean
  hasShadow: boolean
  renderCustomIcon?: TRenderable
}

export type AlertState = {
  open: boolean
}

// Keys allowed by `passthroughProps` filtering. The list mirrors what's
// historically lived on the React Alert as `allowedProps`; consumers of the
// neutral types can read this directly without the React layer.
export const allowedProps = [
  'children',
  'variant',
  'margin',
  'liveRegion',
  'liveRegionPoliteness',
  'isLiveRegionAtomic',
  'screenReaderOnly',
  'timeout',
  'renderCloseButtonLabel',
  'onDismiss',
  'transition',
  'open',
  'hasShadow',
  'renderCustomIcon'
] as const

export type AlertAllowedPropKey = (typeof allowedProps)[number]
