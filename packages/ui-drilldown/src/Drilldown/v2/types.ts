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
 * Framework-neutral primitives for the v2 Drilldown. This file has no runtime
 * imports — every symbol is either a type or a `const` of plain data — so it
 * can be consumed from non-React contexts (e.g. @instructure/ui-web-core's
 * Lit-based Drilldown) without pulling React into the bundle.
 *
 * React-flavored composite types (the ones that pull in ReactNode, Renderable,
 * WithStyleProps, View/Popover props, etc.) live in ./props.ts.
 *
 * The `Neutral*Data` shapes below are the boundary between the React-children
 * walk and the pure selection/navigation logic in ./behavior.ts: each adapter
 * is responsible for producing this plain data (React from `Children` +
 * `matchComponentTypes`, Lit from its `pages` property), then the behavior
 * reducers operate on it without any framework knowledge.
 */

export type DrilldownSelectableType = 'single' | 'multiple'

// Structurally identical to the canonical `DrilldownOptionValue` in
// ./DrilldownOption/props.ts, redeclared here so the neutral layer carries no
// React import. The two are interchangeable via structural typing.
export type DrilldownOptionValue = string | number | undefined

// groupId -> (optionId -> optionValue) for every selectable group
export type SelectedGroupOptionsMap = {
  [groupId: string]: Map<string, DrilldownOptionValue>
}

// ---------------------------------------------------------------------------
// Plain-data shapes — the React-children -> pure-data boundary
// ---------------------------------------------------------------------------

export type NeutralOptionData = {
  optionId: string
  value: DrilldownOptionValue
  // per-option `defaultSelected` boolean (uncontrolled); `false` force-deselects
  defaultSelected?: boolean
}

export type NeutralGroupData = {
  groupId: string
  selectableType?: DrilldownSelectableType
  // controlled selection — when an array, it is the absolute source of truth
  selectedOptions?: DrilldownOptionValue[]
  // uncontrolled group-level defaults
  defaultSelected?: DrilldownOptionValue[]
  options: NeutralOptionData[]
}

export type NeutralPageData = {
  pageId: string
  groups: NeutralGroupData[]
}

// ---------------------------------------------------------------------------
// Style inputs
// ---------------------------------------------------------------------------

// Narrow contract for what styles.ts actually reads. Keeps the style generator
// decoupled from any React-flavored composite prop type.
export type DrilldownStyleInputs = {
  hasHighlightedOption: boolean
}

// ---------------------------------------------------------------------------
// Generic core props
// ---------------------------------------------------------------------------

// The framework-neutral subset of the Drilldown's own props. Generic on the
// renderable / children types so each adapter can pin them:
//   React:  DrilldownCorePropsOf<Renderable, ReactNode>
//   Lit:    DrilldownCorePropsOf<unknown, unknown> (or TemplateResult)
// Trigger / Popover / View render concerns intentionally live only in the
// React props.ts, not here.
export type DrilldownCorePropsOf<_TRenderable, TChildren = _TRenderable> = {
  rootPageId: string
  children?: TChildren
  id?: string
  label?: string
  disabled?: boolean
  rotateFocus?: boolean
}

export const allowedProps = [
  'rootPageId',
  'children',
  'id',
  'label',
  'disabled',
  'rotateFocus'
] as const

export type DrilldownAllowedPropKey = (typeof allowedProps)[number]
