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

import { describe, it, expect } from 'vitest'

import {
  updateGroupSelection,
  resolveItemSelected,
  resolveGroupSelectedValues,
  itemTypeForGroup,
  nextFocusIndex,
  computeInitialGroupSelection
} from '../v2/behavior'

// Exercises the framework-neutral selection + roving-focus helpers that both
// the React Menu and the Lit <instui-menu> consume.

describe('Menu behavior (framework-neutral)', () => {
  describe('updateGroupSelection', () => {
    it('radio: selecting replaces the whole selection', () => {
      expect(updateGroupSelection(['a'], 'b', true, false)).toEqual(['b'])
    })
    it('radio: cannot deselect to empty (keeps previous)', () => {
      expect(updateGroupSelection(['a'], 'a', false, false)).toEqual(['a'])
    })
    it('checkbox: adds when not present', () => {
      expect(updateGroupSelection(['a'], 'b', true, true)).toEqual(['a', 'b'])
    })
    it('checkbox: removes when present', () => {
      expect(updateGroupSelection(['a', 'b'], 'a', false, true)).toEqual(['b'])
    })
    it('checkbox: can deselect down to empty', () => {
      expect(updateGroupSelection(['a'], 'a', false, true)).toEqual([])
    })
    it('does not mutate the input array', () => {
      const input = ['a']
      updateGroupSelection(input, 'b', true, true)
      expect(input).toEqual(['a'])
    })
  })

  describe('resolveItemSelected', () => {
    it('controlled prop wins', () => {
      expect(resolveItemSelected(true, false)).toBe(true)
      expect(resolveItemSelected(false, true)).toBe(false)
    })
    it('falls back to uncontrolled state when prop undefined', () => {
      expect(resolveItemSelected(undefined, true)).toBe(true)
      expect(resolveItemSelected(undefined, undefined)).toBe(false)
    })
  })

  describe('resolveGroupSelectedValues', () => {
    it('returns [] when both undefined', () => {
      expect(resolveGroupSelectedValues(undefined, undefined)).toEqual([])
    })
    it('controlled wins (copy)', () => {
      const controlled = ['a']
      const out = resolveGroupSelectedValues(controlled, ['b'])
      expect(out).toEqual(['a'])
      expect(out).not.toBe(controlled)
    })
    it('falls back to state (copy)', () => {
      expect(resolveGroupSelectedValues(undefined, ['x', 'y'])).toEqual([
        'x',
        'y'
      ])
    })
  })

  describe('itemTypeForGroup', () => {
    it('checkbox when allowMultiple, radio otherwise', () => {
      expect(itemTypeForGroup(true)).toBe('checkbox')
      expect(itemTypeForGroup(false)).toBe('radio')
      expect(itemTypeForGroup(undefined)).toBe('radio')
    })
  })

  describe('nextFocusIndex', () => {
    it('moves forward and wraps to start', () => {
      expect(nextFocusIndex(0, 3, 1)).toBe(1)
      expect(nextFocusIndex(2, 3, 1)).toBe(0)
    })
    it('moves backward and wraps to end', () => {
      expect(nextFocusIndex(0, 3, -1)).toBe(2)
    })
    it('unfocused (-1) + up wraps to the last item (the quirk)', () => {
      // step<0 forces current=0, then (0 + 3 - 1) % 3 = 2
      expect(nextFocusIndex(-1, 3, -1)).toBe(2)
    })
    it('unfocused (-1) + down lands on the first item', () => {
      // current stays -1, (-1 + 3 + 1) % 3 = 0
      expect(nextFocusIndex(-1, 3, 1)).toBe(0)
    })
    it('returns null when there are no items', () => {
      expect(nextFocusIndex(0, 0, 1)).toBeNull()
    })
  })

  describe('computeInitialGroupSelection', () => {
    const items = [
      { id: 'a', label: 'A', value: 'a' },
      { id: 'b', label: 'B', value: 'b', defaultSelected: true },
      { id: 'c', label: 'C', value: 'c', defaultSelected: true }
    ]
    it('group-level defaultSelected wins (radio takes first)', () => {
      expect(computeInitialGroupSelection(items, false, ['c'])).toEqual(['c'])
    })
    it('group-level defaultSelected (multiple keeps all)', () => {
      expect(computeInitialGroupSelection(items, true, ['a', 'b'])).toEqual([
        'a',
        'b'
      ])
    })
    it('radio: first defaultSelected item only', () => {
      expect(computeInitialGroupSelection(items, false)).toEqual(['b'])
    })
    it('checkbox: all defaultSelected items', () => {
      expect(computeInitialGroupSelection(items, true)).toEqual(['b', 'c'])
    })
  })
})
