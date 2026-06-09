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
 * Framework-neutral behavior for the v2 Menu. No React, no JSX, no runtime
 * imports. Pure helpers for the (distributed) selection model and the DOM-focus
 * roving math. The React adapter and the Lit adapter (@instructure/ui-web-core)
 * both wire these into their own state + lifecycle.
 *
 * What lives here:  the value-array reducer, the controlled/uncontrolled
 *                   resolvers, the radio/checkbox type, the roving-index math.
 * What does NOT:    firing onSelect, setState/requestUpdate, MenuContext
 *                   registration, DOM .focus(), rendering.
 *
 * Note: Menu's selection is distributed (an array per group, a boolean per
 * standalone item), NOT a centralized map like Drilldown. These helpers reflect
 * that — there is intentionally no single selection reducer.
 */

import type { MenuGroupSelection, NeutralMenuItem } from './types'

// Pure core of MenuItemGroup.updateSelected (minus the onSelect fire):
//   - radio (!allowMultiple): start from [] then set the one value
//   - checkbox (allowMultiple): toggle the value in/out
//   - radio cannot deselect to empty: keep the previous selection
export const updateGroupSelection = (
  items: MenuGroupSelection,
  value: string | number,
  selected: boolean,
  allowMultiple: boolean
): MenuGroupSelection => {
  let updated = allowMultiple ? [...items] : []
  const location = updated.indexOf(value)

  if (selected === true && location < 0) {
    updated.push(value)
  } else if (selected === false && location !== -1) {
    updated.splice(location, 1)
  } else if (!allowMultiple && updated.length < 1) {
    // don't allow nothing selected if it's not allowMultiple/checkbox
    updated = [...items]
  }

  return updated
}

// MenuItem.get selected: controlled prop wins, else the uncontrolled state.
export const resolveItemSelected = (
  controlled: boolean | undefined,
  stateSelected: boolean | undefined
): boolean =>
  typeof controlled === 'undefined' ? !!stateSelected : !!controlled

// MenuItemGroup.get selected: controlled wins; either branch returns a copy.
export const resolveGroupSelectedValues = (
  controlled: MenuGroupSelection | undefined,
  stateSelected: MenuGroupSelection | undefined
): MenuGroupSelection => {
  if (
    typeof controlled === 'undefined' &&
    typeof stateSelected === 'undefined'
  ) {
    return []
  }
  return typeof controlled === 'undefined'
    ? [...(stateSelected as MenuGroupSelection)]
    : [...controlled]
}

// The group decides its items' role/type.
export const itemTypeForGroup = (
  allowMultiple?: boolean
): 'checkbox' | 'radio' => (allowMultiple ? 'checkbox' : 'radio')

// Roving-focus index math from Menu.moveFocus. Returns the next index, or null
// when there are no items. Preserves the quirk: while nothing is focused
// (currentIndex < 0), pressing up forces current=0 → wraps to the LAST item,
// while pressing down lands on the first item.
export const nextFocusIndex = (
  currentIndex: number,
  count: number,
  step: number
): number | null => {
  if (count <= 0) return null
  const current = currentIndex < 0 && step < 0 ? 0 : currentIndex
  return (current + count + step) % count
}

// Neutral form of MenuItemGroup.selectedFromChildren, for the Lit producer
// (which has plain `items` data). The React adapter keeps its JSX-walking
// version. Returns the initial selected-values array for an uncontrolled group.
export const computeInitialGroupSelection = (
  items: NeutralMenuItem[],
  allowMultiple: boolean | undefined,
  defaultSelected?: MenuGroupSelection
): MenuGroupSelection => {
  if (defaultSelected && defaultSelected.length > 0) {
    return allowMultiple ? [...defaultSelected] : [defaultSelected[0]]
  }

  const selected: MenuGroupSelection = []
  items.forEach((item, index) => {
    const value = item.value ?? index
    if ((selected.length === 0 || allowMultiple) && item.defaultSelected) {
      selected.push(value)
    }
  })
  return selected
}
