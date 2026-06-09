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

import { describe, it, expect, vi } from 'vitest'

import {
  computeInitialSelectionMap,
  computeControlledSelectionUpdate,
  reduceGroupSelection,
  selectedValuesInGroup,
  reduceGoToPage,
  reduceHighlight,
  previousPageId
} from '../v2/behavior'
import type { NeutralPageData, SelectedGroupOptionsMap } from '../v2/types'

// These exercise the framework-neutral single source of truth that both the
// React Drilldown and the Lit <instui-drilldown> consume.

describe('Drilldown behavior (framework-neutral)', () => {
  describe('computeInitialSelectionMap', () => {
    it('controlled selectedOptions wins over defaults', () => {
      const pages: NeutralPageData[] = [
        {
          pageId: 'p1',
          groups: [
            {
              groupId: 'g1',
              selectableType: 'multiple',
              selectedOptions: ['b'],
              defaultSelected: ['a'],
              options: [
                { optionId: 'oa', value: 'a', defaultSelected: true },
                { optionId: 'ob', value: 'b' }
              ]
            }
          ]
        }
      ]
      const map = computeInitialSelectionMap(pages)
      expect([...map.g1.values()]).toEqual(['b'])
    })

    it('per-option defaultSelected===false force-deselects despite group default', () => {
      const pages: NeutralPageData[] = [
        {
          pageId: 'p1',
          groups: [
            {
              groupId: 'g1',
              selectableType: 'multiple',
              defaultSelected: ['a', 'b'],
              options: [
                { optionId: 'oa', value: 'a', defaultSelected: false },
                { optionId: 'ob', value: 'b' }
              ]
            }
          ]
        }
      ]
      const map = computeInitialSelectionMap(pages)
      expect([...map.g1.values()]).toEqual(['b'])
    })

    it('skips groups without a selectableType', () => {
      const pages: NeutralPageData[] = [
        {
          pageId: 'p1',
          groups: [
            {
              groupId: 'nav',
              options: [{ optionId: 'o1', value: undefined }]
            }
          ]
        }
      ]
      const map = computeInitialSelectionMap(pages)
      expect(map.nav).toBeUndefined()
    })

    it('reports an error for single-select groups with >1 default and leaves the group empty', () => {
      const onError = vi.fn()
      const pages: NeutralPageData[] = [
        {
          pageId: 'p1',
          groups: [
            {
              groupId: 'g1',
              selectableType: 'single',
              defaultSelected: ['a', 'b'],
              options: [
                { optionId: 'oa', value: 'a' },
                { optionId: 'ob', value: 'b' }
              ]
            }
          ]
        }
      ]
      const map = computeInitialSelectionMap(pages, onError)
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError.mock.calls[0][0]).toContain(
        'only one default item selected'
      )
      expect(map.g1.size).toBe(0)
    })
  })

  describe('reduceGroupSelection', () => {
    const base: SelectedGroupOptionsMap = { g1: new Map([['oa', 'a']]) }

    it('multiple: adds when not present', () => {
      const next = reduceGroupSelection(base, {
        groupId: 'g1',
        optionId: 'ob',
        value: 'b',
        selectableType: 'multiple'
      })
      expect([...next.g1.values()]).toEqual(['a', 'b'])
      // original is not mutated
      expect([...base.g1.values()]).toEqual(['a'])
    })

    it('multiple: removes when already present (toggle off)', () => {
      const next = reduceGroupSelection(base, {
        groupId: 'g1',
        optionId: 'oa',
        value: 'a',
        selectableType: 'multiple'
      })
      expect([...next.g1.values()]).toEqual([])
    })

    it('single: replaces the whole group (radio)', () => {
      const next = reduceGroupSelection(base, {
        groupId: 'g1',
        optionId: 'ob',
        value: 'b',
        selectableType: 'single'
      })
      expect([...next.g1.entries()]).toEqual([['ob', 'b']])
    })
  })

  describe('selectedValuesInGroup', () => {
    it('returns all values, or [] for an unknown group', () => {
      const map: SelectedGroupOptionsMap = {
        g1: new Map([
          ['oa', 'a'],
          ['ob', 'b']
        ])
      }
      expect(selectedValuesInGroup(map, 'g1')).toEqual(['a', 'b'])
      expect(selectedValuesInGroup(map, 'nope')).toEqual([])
    })
  })

  describe('computeControlledSelectionUpdate', () => {
    const pages: NeutralPageData[] = [
      {
        pageId: 'p1',
        groups: [
          {
            groupId: 'g1',
            selectableType: 'multiple',
            selectedOptions: ['a'],
            options: [
              { optionId: 'oa', value: 'a' },
              { optionId: 'ob', value: 'b' }
            ]
          }
        ]
      }
    ]

    it('flags changed when the controlled prop diverges from state', () => {
      const { next, changed } = computeControlledSelectionUpdate(pages, {
        g1: new Map([['ob', 'b']])
      })
      expect(changed).toBe(true)
      expect([...next.g1.entries()]).toEqual([['oa', 'a']])
    })

    it('flags unchanged when state already matches the controlled prop', () => {
      const { changed } = computeControlledSelectionUpdate(pages, {
        g1: new Map([['oa', 'a']])
      })
      expect(changed).toBe(false)
    })
  })

  describe('reduceGoToPage', () => {
    it('pushes a new page onto history', () => {
      const result = reduceGoToPage(['root'], 'sub', true)
      expect(result).toEqual({
        history: ['root', 'sub'],
        prevPageId: 'root',
        newPageId: 'sub'
      })
    })

    it('truncates history when navigating back to an earlier page', () => {
      const result = reduceGoToPage(['root', 'a', 'b'], 'a', true)
      expect('history' in result && result.history).toEqual(['root', 'a'])
    })

    it('warns when the page does not exist', () => {
      const result = reduceGoToPage(['root'], 'missing', false)
      expect('warning' in result && result.warning).toContain("doesn't exist")
    })

    it('warns when no id is provided', () => {
      const result = reduceGoToPage(['root'], '', true)
      expect('warning' in result && result.warning).toContain('no page id')
    })
  })

  describe('reduceHighlight', () => {
    const ids = ['a', 'b', 'c']

    it('highlights the first option when nothing is highlighted', () => {
      expect(
        reduceHighlight({
          activeOptionIds: ids,
          highlightedOptionId: undefined,
          rotateFocus: true
        })
      ).toBe('a')
    })

    it('moves by direction', () => {
      expect(
        reduceHighlight({
          activeOptionIds: ids,
          highlightedOptionId: 'a',
          direction: 1,
          rotateFocus: true
        })
      ).toBe('b')
    })

    it('wraps to the end when rotateFocus and moving past the start', () => {
      expect(
        reduceHighlight({
          activeOptionIds: ids,
          highlightedOptionId: 'a',
          direction: -1,
          rotateFocus: true
        })
      ).toBe('c')
    })

    it('does not wrap when rotateFocus is false', () => {
      expect(
        reduceHighlight({
          activeOptionIds: ids,
          highlightedOptionId: 'c',
          direction: 1,
          rotateFocus: false
        })
      ).toBeUndefined()
    })

    it('honors a directly requested id', () => {
      expect(
        reduceHighlight({
          activeOptionIds: ids,
          highlightedOptionId: 'a',
          requestedId: 'c',
          direction: 1,
          rotateFocus: true
        })
      ).toBe('c')
    })
  })

  describe('previousPageId', () => {
    it('returns the second-to-last page id, or undefined on the root', () => {
      expect(previousPageId(['root', 'a'])).toBe('root')
      expect(previousPageId(['root'])).toBeUndefined()
    })
  })
})
