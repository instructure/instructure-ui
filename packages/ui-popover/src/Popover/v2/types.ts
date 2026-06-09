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
 * Framework-neutral primitives for the v2 Popover. This file has no runtime
 * imports — every symbol is a type or a `const` of plain data — so it can be
 * consumed from non-React contexts (e.g. @instructure/ui-web-core's Lit-based
 * Popover) without pulling React into the bundle.
 *
 * The show/hide state machine + trigger/placement helpers that operate on these
 * types live in ./behavior.ts. React-flavored composite types (ReactNode,
 * Renderable, WithStyleProps, Position/Dialog props, etc.) live in ./props.ts.
 */

// `PlacementPropValues` is a type-only import (erased at runtime) from the
// already-React-free ui-position package; reusing it avoids drift with the
// positioning util the adapters delegate to.
import type { PlacementPropValues } from '@instructure/ui-position'
import type { StyleObject } from '@instructure/emotion'

export type PopoverPlacement = PlacementPropValues

export type PopoverTrigger = 'click' | 'hover' | 'focus'
export type PopoverTriggerProp = PopoverTrigger | PopoverTrigger[]

export type PopoverColor = 'primary' | 'primary-inverse'

// Narrow contract for what styles.ts actually reads off the component theme.
// Keeps the style generator decoupled from any React-flavored theme type.
export type PopoverStyleInputs = {
  borderColor: string
  borderRadius: string
}

// Emotion-style object returned by generateStyle. `StyleObject` is a type-only
// import so this stays runtime-import-free.
export type PopoverStyle = {
  borderRadius: string
  borderColor: string
  scrollContainer: StyleObject
}

// Generic on the renderable / children types so each adapter can pin them:
//   React:  PopoverCorePropsOf<Renderable, ReactNode>
//   Lit:    PopoverCorePropsOf<unknown, unknown>
// Position/Dialog/View render concerns live only in the React props.ts.
export type PopoverCorePropsOf<TRenderable, TChildren = TRenderable> = {
  isShowingContent?: boolean
  defaultIsShowingContent?: boolean
  on?: PopoverTriggerProp
  placement?: PopoverPlacement
  offsetX?: string | number
  offsetY?: string | number
  withArrow?: boolean
  color?: PopoverColor
  id?: string
  shouldRenderOffscreen?: boolean
  shouldContainFocus?: boolean
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  shouldCloseOnEscape?: boolean
  shouldFocusContentOnTriggerBlur?: boolean
  shouldSetAriaExpanded?: boolean
  renderTrigger?: TRenderable
  children?: TChildren
}

export const allowedProps = [
  'isShowingContent',
  'defaultIsShowingContent',
  'on',
  'placement',
  'offsetX',
  'offsetY',
  'withArrow',
  'color',
  'id',
  'shouldRenderOffscreen',
  'shouldContainFocus',
  'shouldReturnFocus',
  'shouldCloseOnDocumentClick',
  'shouldCloseOnEscape',
  'shouldFocusContentOnTriggerBlur',
  'shouldSetAriaExpanded',
  'renderTrigger',
  'children'
] as const

export type PopoverAllowedPropKey = (typeof allowedProps)[number]
