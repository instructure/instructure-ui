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
  resolveShown,
  resolveShowIntent,
  resolveHideIntent,
  resolveToggleIntent,
  resolveActiveTriggers,
  isTooltip,
  resolvePlacement
} from '../v2/behavior'
import type { PopoverPlacement } from '../v2/types'

// Exercises the framework-neutral show/hide state machine that both the React
// Popover and the Lit <instui-popover> consume.

describe('Popover behavior (framework-neutral)', () => {
  describe('resolveShown', () => {
    it('uses internal state when uncontrolled (isShowingContent undefined)', () => {
      expect(resolveShown(undefined, true)).toBe(true)
      expect(resolveShown(undefined, false)).toBe(false)
      expect(resolveShown(undefined, undefined)).toBe(false)
    })
    it('uses the controlled prop when defined', () => {
      expect(resolveShown(true, false)).toBe(true)
      expect(resolveShown(false, true)).toBe(false)
    })
  })

  describe('resolveShowIntent', () => {
    it('uncontrolled: set state true, fire show', () => {
      expect(resolveShowIntent(false)).toEqual({
        setStateShown: true,
        fireShow: true
      })
    })
    it('controlled: do not touch state, fire show', () => {
      expect(resolveShowIntent(true)).toEqual({
        setStateShown: null,
        fireShow: true
      })
    })
  })

  describe('resolveHideIntent (the timing-critical matrix)', () => {
    it('uncontrolled + was showing: set state false, fire hide', () => {
      expect(
        resolveHideIntent({ isControlled: false, currentShown: true })
      ).toEqual({ setStateShown: false, fireHide: true })
    })
    it('uncontrolled + was hidden: set state false, do NOT fire hide', () => {
      expect(
        resolveHideIntent({ isControlled: false, currentShown: false })
      ).toEqual({ setStateShown: false, fireHide: false })
    })
    it('controlled + showing: do not touch state, fire hide', () => {
      expect(
        resolveHideIntent({ isControlled: true, currentShown: true })
      ).toEqual({ setStateShown: null, fireHide: true })
    })
    it('controlled + hidden: do not touch state, do NOT fire hide', () => {
      expect(
        resolveHideIntent({ isControlled: true, currentShown: false })
      ).toEqual({ setStateShown: null, fireHide: false })
    })
  })

  describe('resolveToggleIntent', () => {
    it('shown -> hide, hidden -> show', () => {
      expect(resolveToggleIntent(true)).toBe('hide')
      expect(resolveToggleIntent(false)).toBe('show')
    })
  })

  describe('resolveActiveTriggers', () => {
    it('maps a single trigger string', () => {
      expect(resolveActiveTriggers('click')).toMatchObject({
        click: true,
        hover: false,
        focus: false
      })
    })
    it('maps an array of triggers', () => {
      expect(resolveActiveTriggers(['click', 'focus'])).toMatchObject({
        click: true,
        hover: false,
        focus: true
      })
    })
    it('returns a warning only for hover-only', () => {
      expect(resolveActiveTriggers('hover').warning).toContain('"hover"')
      expect(resolveActiveTriggers(['hover', 'focus']).warning).toBeUndefined()
      expect(resolveActiveTriggers('click').warning).toBeUndefined()
    })
    it('handles undefined', () => {
      expect(resolveActiveTriggers(undefined)).toMatchObject({
        click: false,
        hover: false,
        focus: false
      })
    })
  })

  describe('isTooltip', () => {
    it('true only when offscreen + no focus management', () => {
      expect(
        isTooltip({
          shouldRenderOffscreen: true,
          shouldReturnFocus: false,
          shouldContainFocus: false,
          shouldFocusContentOnTriggerBlur: false
        })
      ).toBe(true)
    })
    it('false when any focus management is on, or not offscreen', () => {
      expect(
        isTooltip({ shouldRenderOffscreen: true, shouldContainFocus: true })
      ).toBe(false)
      expect(
        isTooltip({ shouldRenderOffscreen: true, shouldReturnFocus: true })
      ).toBe(false)
      expect(
        isTooltip({
          shouldRenderOffscreen: true,
          shouldFocusContentOnTriggerBlur: true
        })
      ).toBe(false)
      expect(isTooltip({ shouldRenderOffscreen: false })).toBe(false)
    })
  })

  describe('resolvePlacement', () => {
    // a stub mirror that flips start<->end horizontally
    const mirror = (p: PopoverPlacement): PopoverPlacement =>
      (p === 'top start'
        ? 'top end'
        : p === 'top end'
          ? 'top start'
          : p) as PopoverPlacement

    it('passes placement through in LTR', () => {
      expect(
        resolvePlacement(
          { placement: 'top start', isRtl: false, shown: true },
          mirror
        )
      ).toBe('top start')
    })
    it('mirrors horizontally in RTL', () => {
      expect(
        resolvePlacement(
          { placement: 'top start', isRtl: true, shown: true },
          mirror
        )
      ).toBe('top end')
    })
    it('forces offscreen when hidden + shouldRenderOffscreen', () => {
      expect(
        resolvePlacement(
          {
            placement: 'top start',
            isRtl: false,
            shown: false,
            shouldRenderOffscreen: true
          },
          mirror
        )
      ).toBe('offscreen')
    })
    it('keeps placement when shown even with shouldRenderOffscreen', () => {
      expect(
        resolvePlacement(
          {
            placement: 'bottom center',
            isRtl: false,
            shown: true,
            shouldRenderOffscreen: true
          },
          mirror
        )
      ).toBe('bottom center')
    })
  })
})
