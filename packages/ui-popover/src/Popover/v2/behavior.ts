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
 * Framework-neutral behavior for the v2 Popover. No React, no JSX, no runtime
 * imports. Pure helpers describing the controlled/uncontrolled show/hide state
 * machine, trigger-interaction mapping, tooltip detection and RTL/offscreen
 * placement resolution. The React adapter (./index.tsx) and the Lit adapter
 * (@instructure/ui-web-core) both wire these into their own state + lifecycle.
 *
 * What lives here:  the decisions (set state? fire callback? which triggers?).
 * What does NOT:     calling setState/requestUpdate, rendering, DOM focus,
 *                    positioning (delegated to @instructure/ui-position),
 *                    focus management (delegated to FocusRegion), logging.
 */

import type { PopoverPlacement, PopoverTriggerProp } from './types'

// The active visibility, given the controlled prop and the uncontrolled state.
// Mirrors the React `shown` getter (index.tsx:316-320).
export const resolveShown = (
  isShowingContent: boolean | undefined,
  stateShown: boolean | undefined
): boolean =>
  typeof isShowingContent === 'undefined' ? !!stateShown : isShowingContent

// `setStateShown: null` means "don't touch internal state" (controlled mode).
export type ShowHideIntent = {
  setStateShown: boolean | null
  fireShow?: boolean
  fireHide?: boolean
}

// Mirrors `show` (index.tsx:326-331): uncontrolled flips state to true; the
// callback always fires.
export const resolveShowIntent = (isControlled: boolean): ShowHideIntent => ({
  setStateShown: isControlled ? null : true,
  fireShow: true
})

// Mirrors `hide` (index.tsx:333-348). `currentShown` is the PRE-transition
// visibility (React reads it from the functional setState snapshot; the Lit
// adapter reads `this.shown` synchronously before mutating). The callback fires
// only when the popover was actually showing.
export const resolveHideIntent = (args: {
  isControlled: boolean
  currentShown: boolean
}): ShowHideIntent => {
  const { isControlled, currentShown } = args
  return {
    setStateShown: isControlled ? null : false,
    fireHide: currentShown
  }
}

// Mirrors `toggle` (index.tsx:350-356).
export const resolveToggleIntent = (currentShown: boolean): 'show' | 'hide' =>
  currentShown ? 'hide' : 'show'

// Which interaction handlers the `on` prop activates (index.tsx:455-476). The
// hover-only warning is returned (not logged) so the adapter owns the sink.
export const resolveActiveTriggers = (
  on: PopoverTriggerProp | undefined
): { click: boolean; hover: boolean; focus: boolean; warning?: string } => {
  const has = (t: 'click' | 'hover' | 'focus') => !!on && on.indexOf(t) > -1
  return {
    click: has('click'),
    hover: has('hover'),
    focus: has('focus'),
    warning:
      on === 'hover'
        ? '[Popover] Specifying only the `"hover"` trigger limits the visibility' +
          ' of the Popover to just mouse users. Consider also including the `"focus"` trigger ' +
          'so that touch and keyboard only users can see the Popover content as well.'
        : undefined
  }
}

// Tooltip mode = offscreen-rendered with no focus management (index.tsx:171-178).
export const isTooltip = (p: {
  shouldRenderOffscreen?: boolean
  shouldReturnFocus?: boolean
  shouldContainFocus?: boolean
  shouldFocusContentOnTriggerBlur?: boolean
}): boolean =>
  !!p.shouldRenderOffscreen &&
  !p.shouldReturnFocus &&
  !p.shouldContainFocus &&
  !p.shouldFocusContentOnTriggerBlur

// Resolves the effective placement (index.tsx:286-297): mirror horizontally for
// RTL, then force 'offscreen' while hidden if shouldRenderOffscreen. The mirror
// fn is injected (a binding of mirrorHorizontalPlacement) so this stays free of
// ui-position runtime imports.
export const resolvePlacement = (
  args: {
    placement?: PopoverPlacement
    isRtl: boolean
    shown: boolean
    shouldRenderOffscreen?: boolean
  },
  mirror: (placement: PopoverPlacement) => PopoverPlacement
): PopoverPlacement | undefined => {
  const { placement, isRtl, shown, shouldRenderOffscreen } = args
  let resolved = placement
  if (isRtl && resolved) {
    resolved = mirror(resolved)
  }
  return !shown && shouldRenderOffscreen ? 'offscreen' : resolved
}
