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
 * Framework-neutral primitives for the v2 Menu. No runtime imports — every
 * symbol is a type or a `const` of plain data — so non-React contexts (e.g.
 * @instructure/ui-web-core's Lit Menu) can consume it without pulling React.
 *
 * The selection + roving-focus helpers that operate on these types live in
 * ./behavior.ts. React-flavored composite types live in ./props.ts.
 *
 * Menu's selection is intentionally DISTRIBUTED (a value array per group +
 * a boolean per standalone item), not a single centralized map like Drilldown —
 * the `Neutral*` shapes + behavior helpers reflect that.
 */

export type MenuItemType = 'button' | 'checkbox' | 'radio' | 'flyout'
export type MenuItemValue = string | number | undefined

// The selected-values array a selectable group tracks.
export type MenuGroupSelection = (string | number)[]

// ---------------------------------------------------------------------------
// Plain-data `items`-config shapes — the children/markup -> pure-data boundary.
// Each adapter produces these (React from JSX children, Lit from its `items`
// property); the behavior helpers + Lit renderer consume them.
// ---------------------------------------------------------------------------

export type NeutralMenuItem = {
  id: string
  label: string
  type?: Exclude<MenuItemType, 'flyout'>
  value?: string | number
  disabled?: boolean
  defaultSelected?: boolean
  href?: string
  // presence of `items` makes this a flyout submenu trigger
  items?: NeutralMenuNode[]
}

export type NeutralMenuGroup = {
  groupId: string
  label?: string
  allowMultiple?: boolean
  // controlled selection — wins over defaults
  selected?: MenuGroupSelection
  // uncontrolled group-level defaults
  defaultSelected?: MenuGroupSelection
  items: NeutralMenuItem[]
}

export type NeutralMenuSeparator = {
  separator: true
  id: string
}

export type NeutralMenuNode =
  | NeutralMenuItem
  | NeutralMenuGroup
  | NeutralMenuSeparator

// ---------------------------------------------------------------------------
// Narrow style inputs (only what each styles.ts reads off props)
// ---------------------------------------------------------------------------

export type MenuStyleInputs = {
  maxHeight?: string | number
}

export type MenuItemStyleInputs = {
  type?: MenuItemType
  disabled?: boolean
  selected?: boolean
}

// ---------------------------------------------------------------------------
// Generic core props
// ---------------------------------------------------------------------------

export type MenuCorePropsOf<TChildren> = {
  children?: TChildren
  label?: string
  disabled?: boolean
  shouldHideOnSelect?: boolean
  placement?: string
  offsetX?: string | number
  offsetY?: string | number
  withArrow?: boolean
}

export const allowedProps = [
  'children',
  'label',
  'disabled',
  'shouldHideOnSelect',
  'placement',
  'offsetX',
  'offsetY',
  'withArrow'
] as const

export type MenuAllowedPropKey = (typeof allowedProps)[number]
