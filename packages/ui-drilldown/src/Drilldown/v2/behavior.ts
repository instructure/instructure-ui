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
 * Framework-neutral behavior for the v2 Drilldown. No React, no JSX, no runtime
 * imports. Every function here is a pure reducer over plain data — the React
 * adapter (./index.tsx) and the Lit adapter (@instructure/ui-web-core) both feed
 * these the same `Neutral*Data` shapes and wire the results into their own
 * reactivity/lifecycle.
 *
 * What lives here:  selection state machine, controlled-prop sync, page-history
 *                   navigation, keyboard highlight index math.
 * What does NOT:    walking React children / parsing a DOM tree into NeutralPageData
 *                   (adapter), calling setState / requestUpdate (adapter), DOM focus
 *                   (adapter), emitting console warnings (adapter supplies the sink),
 *                   rendering (adapter).
 */

import type {
  DrilldownOptionValue,
  DrilldownSelectableType,
  NeutralPageData,
  SelectedGroupOptionsMap
} from './types'

// ---------------------------------------------------------------------------
// Selection — initial map
// ---------------------------------------------------------------------------

/**
 * Builds the initial `SelectedGroupOptionsMap` from plain page/group/option
 * data, establishing the selection state with a clear precedence:
 *
 * 1. Controlled: if a group has an array `selectedOptions`, it is the absolute
 *    source of truth and `defaultSelected` is ignored.
 * 2. Uncontrolled: otherwise a per-option `defaultSelected === false` force-
 *    deselects, then a per-option `defaultSelected === true` or the group-level
 *    `defaultSelected` array selects.
 *
 * Single-select groups receiving more than one selected/default value are
 * invalid: `onError` is invoked with the message and the group is left empty
 * (mirroring the original React behavior, which bailed out of that group).
 */
export const computeInitialSelectionMap = (
  pages: NeutralPageData[],
  onError?: (message: string) => void
): SelectedGroupOptionsMap => {
  const selectedGroupOptionsMap: SelectedGroupOptionsMap = {}

  pages.forEach((page) => {
    page.groups.forEach((group) => {
      const {
        groupId,
        selectableType,
        selectedOptions,
        defaultSelected = [],
        options
      } = group

      if (!selectableType) return

      selectedGroupOptionsMap[groupId] = new Map()

      if (selectableType === 'single') {
        if (Array.isArray(selectedOptions) && selectedOptions.length > 1) {
          onError?.(
            `Radio type selectable groups can have only one item selected! Group "${groupId}" has multiple values: [${selectedOptions.join(
              ', '
            )}]!`
          )
          return
        }
        if (defaultSelected.length > 1) {
          onError?.(
            `Radio type selectable groups can have only one default item selected! Group "${groupId}" has multiple values: [${defaultSelected.join(
              ', '
            )}]!`
          )
          return
        }
      }

      options.forEach((option) => {
        const {
          optionId,
          value: optionValue,
          defaultSelected: optionDefault
        } = option

        if (optionValue == null) return

        let isSelected = false
        if (Array.isArray(selectedOptions)) {
          isSelected = selectedOptions.includes(optionValue)
        } else if (optionDefault === false) {
          isSelected = false
        } else {
          const isGroupDefaultSelected = defaultSelected.includes(optionValue)
          isSelected = Boolean(optionDefault) || isGroupDefaultSelected
        }

        if (isSelected) {
          selectedGroupOptionsMap[groupId].set(optionId, optionValue)
        }
      })
    })
  })

  return selectedGroupOptionsMap
}

// ---------------------------------------------------------------------------
// Selection — controlled prop sync
// ---------------------------------------------------------------------------

type MapEntries = [string, DrilldownOptionValue][]

const normalizeMap = (map: Map<string, DrilldownOptionValue>): MapEntries =>
  Array.from(map.entries())

// Positional compare of normalized entries — equivalent to the original
// `deepEqual` over the entry arrays for these primitive [id, value] pairs,
// without dragging @instructure/ui-utils into the neutral layer.
const entriesEqual = (a: MapEntries, b: MapEntries): boolean => {
  if (a.length !== b.length) return false
  return a.every(([aId, aVal], i) => aId === b[i][0] && aVal === b[i][1])
}

/**
 * Recomputes the selection map for every controlled group (one that has both a
 * `selectableType` and an array `selectedOptions`) so the prop always wins over
 * internal state. Returns the next map plus whether anything actually changed,
 * so the adapter can skip a re-render when nothing moved.
 */
export const computeControlledSelectionUpdate = (
  pages: NeutralPageData[],
  current: SelectedGroupOptionsMap
): { next: SelectedGroupOptionsMap; changed: boolean } => {
  const next: SelectedGroupOptionsMap = { ...current }
  let changed = false

  pages.forEach((page) => {
    page.groups.forEach((group) => {
      const { groupId, selectableType, selectedOptions, options } = group

      if (!selectableType || !Array.isArray(selectedOptions)) return

      const newGroupMap = new Map<string, DrilldownOptionValue>()
      options.forEach((option) => {
        if (selectedOptions.includes(option.value)) {
          newGroupMap.set(option.optionId, option.value)
        }
      })

      const currentGroupMap = current[groupId] || new Map()

      if (
        !entriesEqual(normalizeMap(newGroupMap), normalizeMap(currentGroupMap))
      ) {
        next[groupId] = newGroupMap
        changed = true
      }
    })
  })

  return { next, changed }
}

// ---------------------------------------------------------------------------
// Selection — toggle reducer
// ---------------------------------------------------------------------------

/**
 * Pure toggle of a single option's selection within its group:
 *   - multiple + already selected -> remove (checkbox toggle off)
 *   - multiple                    -> add (checkbox toggle on)
 *   - single                      -> replace the whole group with this one (radio)
 * Returns a brand-new top-level object with a new group Map so reactive layers
 * see an identity change.
 */
export const reduceGroupSelection = (
  map: SelectedGroupOptionsMap,
  args: {
    groupId: string
    optionId: string
    value: DrilldownOptionValue
    selectableType: DrilldownSelectableType
  }
): SelectedGroupOptionsMap => {
  const { groupId, optionId, value, selectableType } = args

  let newGroupMap = new Map(map[groupId])

  if (selectableType === 'multiple' && Boolean(map[groupId]?.has(optionId))) {
    // toggle off, if already selected
    newGroupMap.delete(optionId)
  } else {
    if (selectableType === 'multiple') {
      // "checkbox"
      newGroupMap.set(optionId, value)
    } else if (selectableType === 'single') {
      // "radio"
      newGroupMap = new Map()
      newGroupMap.set(optionId, value)
    }
  }

  return {
    ...map,
    [groupId]: newGroupMap
  }
}

// The array of all currently-selected values in a group. The selection
// callbacks ALWAYS receive this array (even for single-select groups), so the
// `value`-as-array contract lives in exactly one place.
export const selectedValuesInGroup = (
  map: SelectedGroupOptionsMap,
  groupId: string
): DrilldownOptionValue[] => (map[groupId] ? [...map[groupId].values()] : [])

// ---------------------------------------------------------------------------
// Navigation — page history
// ---------------------------------------------------------------------------

export type GoToPageResult =
  | { history: string[]; prevPageId: string; newPageId: string }
  | { warning: string }

/**
 * Pure page-history reducer. `pageExists` is supplied by the adapter (React
 * checks its `pageMap`, Lit its `pages` property). On any invalid input a
 * `{ warning }` is returned so the adapter can emit it via its own logger;
 * otherwise the next history array + prev/new page ids are returned.
 */
export const reduceGoToPage = (
  history: string[],
  newPageId: string,
  pageExists: boolean
): GoToPageResult => {
  if (!newPageId) {
    return {
      warning: `Cannot go to page because there was no page id provided.`
    }
  }

  if (typeof newPageId !== 'string') {
    return {
      warning: `Cannot go to page because parameter newPageId has to be string (valid page id). Current newPageId is "${typeof newPageId}".`
    }
  }

  if (!pageExists) {
    return {
      warning: `Cannot go to page because page with id: "${newPageId}" doesn't exist.`
    }
  }

  const nextHistory = [...history]

  // the last page id in the history is the current one,
  // it will become the "prevPage"
  const prevPageId = nextHistory[nextHistory.length - 1]
  const idxInHistory = nextHistory.indexOf(newPageId)

  if (idxInHistory < 0) {
    // if it is not in the page history, we have to add it
    nextHistory.push(newPageId)
  } else {
    // if it was already in the history, we go back to that page,
    // and clear the rest from the history
    nextHistory.splice(idxInHistory + 1, nextHistory.length - 1)
  }

  return { history: nextHistory, prevPageId, newPageId }
}

// The id of the page that "back" would navigate to, or undefined on the root.
export const previousPageId = (history: string[]): string | undefined =>
  history[history.length - 2]

// ---------------------------------------------------------------------------
// Keyboard — highlight index math
// ---------------------------------------------------------------------------

/**
 * Computes the next highlighted option id from the current one and a navigation
 * intent. Pure index math only — the adapter is responsible for (a) validating
 * that a directly-requested id actually exists before passing it as
 * `requestedId`, and (b) applying state + moving DOM focus to the returned id.
 *
 * Returns `undefined` for a no-op (e.g. nothing highlighted yet and no
 * direction), in which case the adapter should do nothing.
 */
export const reduceHighlight = (args: {
  activeOptionIds: string[]
  highlightedOptionId: string | undefined
  requestedId?: string
  direction?: -1 | 1
  rotateFocus: boolean
}): string | undefined => {
  const {
    activeOptionIds,
    highlightedOptionId,
    requestedId,
    direction,
    rotateFocus
  } = args

  // if a valid id was requested directly, use it
  let highlightId = requestedId

  if (!highlightId) {
    if (!highlightedOptionId) {
      // nothing highlighted yet, highlight first option
      highlightId = activeOptionIds[0]
    } else if (direction) {
      // if it has direction, find next id based on it
      const index = activeOptionIds.indexOf(highlightedOptionId)
      const newIndex = index + direction

      highlightId = index > -1 ? activeOptionIds[newIndex] : undefined

      if (rotateFocus) {
        const lastOptionsIndex = activeOptionIds.length - 1

        if (newIndex < 0) {
          highlightId = activeOptionIds[lastOptionsIndex]
        }
        if (newIndex > lastOptionsIndex) {
          highlightId = activeOptionIds[0]
        }
      }
    }
  }

  return highlightId
}
