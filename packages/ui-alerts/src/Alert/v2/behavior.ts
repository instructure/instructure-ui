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
 * Framework-neutral behavior for the v2 Alert. No React, no JSX. The React
 * adapter wires these into class lifecycle methods; the future Lit adapter in
 * @instructure/ui-web-core wires them into custom-element lifecycle hooks.
 *
 * Whatever isn't here lives in the rendering layer per framework:
 *   - JSX/HTML output, the Transition wrapper, ScreenReaderContent / View /
 *     CloseButton composition (React),
 *   - Per-framework reactivity / state management (React this.state,
 *     Lit's @property),
 *   - Per-framework portal / declarative-shadow-DOM concerns.
 */

import keycode from 'keycode'
import { logError as error } from '@instructure/console'

import type {
  AlertLiveRegion,
  AlertLiveRegionPoliteness,
  AlertVariant
} from './types'

// ---------------------------------------------------------------------------
// Live region resolution + ARIA lifecycle
// ---------------------------------------------------------------------------

// Duck-type check for a DOM element node. Preserved verbatim from the original
// React Alert (it intentionally accepts only `nodeType === 1`).
const isDOMNode = (n: Element | null | undefined): boolean =>
  !!n && typeof n === 'object' && n.nodeType === 1

export const resolveLiveRegion = (
  value: AlertLiveRegion | undefined
): Element | null => {
  const resolved = typeof value === 'function' ? value() : value
  return isDOMNode(resolved as Element | null) ? (resolved as Element) : null
}

// Owns the ARIA attribute lifecycle on the consumer-provided live region.
// Does NOT render screen-reader content itself — `appendContent` returns an
// empty wrapper div and the calling adapter populates it (React: portal a
// `<ScreenReaderContent>`; Lit: set textContent / append children).
//
// `getRegion`, `getPoliteness`, and `getAtomic` are callbacks (not snapshots)
// so the controller always sees the consumer's current values; the original
// React Alert read `this.props.*` at call-time of `initLiveRegion`, and the
// `refresh` path can fire after the consumer's props have changed.
export class AlertLiveRegionController {
  constructor(
    private readonly getRegion: () => Element | null,
    private readonly getPoliteness: () => AlertLiveRegionPoliteness,
    private readonly getAtomic: () => boolean
  ) {}

  init(): void {
    const liveRegion = this.getRegion()
    if (!liveRegion) return

    error(
      liveRegion.getAttribute('role') === 'alert',
      `[Alert] live region must have role='alert' set on page load in order to announce content`
    )

    liveRegion.setAttribute('aria-live', this.getPoliteness())
    // indicates what notifications the user agent will trigger when the
    // accessibility tree within a live region is modified.
    // additions: elements are added, text: Text content is added
    liveRegion.setAttribute('aria-relevant', 'additions text')
    liveRegion.setAttribute('aria-atomic', String(this.getAtomic()))
  }

  // Accessibility attributes must be removed for the deletion of the node
  // and then reapplied because JAWS/IE will not respect the "aria-relevant"
  // attribute and read when the node is deleted if the attributes are in
  // place. The React Alert called this `removeScreenreaderAlert`.
  refresh(contentId: string): void {
    const liveRegion = this.getRegion()
    if (!liveRegion) return

    const div = document.getElementById(contentId)
    if (!div) return

    liveRegion.removeAttribute('aria-live')
    liveRegion.removeAttribute('aria-relevant')
    liveRegion.removeAttribute('aria-atomic')

    this.init()
  }

  // Appends an empty wrapper div with the given id to the live region and
  // returns it. The caller is responsible for inserting the screen-reader
  // content into the returned element.
  appendContent(contentId: string): HTMLDivElement | null {
    const liveRegion = this.getRegion()
    if (!liveRegion) return null

    const div = document.createElement('div')
    div.setAttribute('id', contentId)
    liveRegion.appendChild(div)
    return div
  }
}

// ---------------------------------------------------------------------------
// Auto-dismiss timer
// ---------------------------------------------------------------------------

export type DismissTimer = {
  arm: () => void
  clear: () => void
}

// Mirrors the original `_timeouts` + `handleTimeout` + `clearTimeouts` trio.
// `arm()` is a no-op when ms <= 0, matching the React Alert's guard.
export const createDismissTimer = (
  ms: number,
  onTimeout: () => void
): DismissTimer => {
  const handles: ReturnType<typeof setTimeout>[] = []
  return {
    arm() {
      if (ms > 0) handles.push(setTimeout(onTimeout, ms))
    },
    clear() {
      handles.forEach((h) => clearTimeout(h))
      handles.length = 0
    }
  }
}

// ---------------------------------------------------------------------------
// Keyboard handling
// ---------------------------------------------------------------------------

// Pure predicate so adapters can call from any event shape (React's
// SyntheticEvent, a raw DOM KeyboardEvent, etc.) — only `keyCode` is read.
export const shouldCloseOnKey = (
  event: { keyCode: number },
  hasCloseButton: boolean
): boolean => hasCloseButton && event.keyCode === keycode.codes.esc

// ---------------------------------------------------------------------------
// Screen-reader content shape
// ---------------------------------------------------------------------------

export type ScreenReaderContentDescription<TChildren> = {
  label: string
  children: TChildren
}

// Produces the data the adapter needs to populate the wrapper div returned by
// `AlertLiveRegionController.appendContent`. The shape mirrors the React
// Alert's <ScreenReaderContent>{label} {children}</ScreenReaderContent>: a
// label string followed by the original children. Each adapter renders
// these into the SR wrapper in its own framework-appropriate way.
export const describeScreenReaderContent = <TChildren>(props: {
  variantScreenReaderLabel?: string
  children?: TChildren
}): ScreenReaderContentDescription<TChildren | undefined> => ({
  label: props.variantScreenReaderLabel ?? '',
  children: props.children
})

// ---------------------------------------------------------------------------
// Variant → icon-name map (no SVG content, no framework refs)
// ---------------------------------------------------------------------------

// Adapters resolve these names to their own icon implementations:
//   React adapter:  XCircleInstUIIcon (component) from @instructure/ui-icons
//   Lit adapter:    <instui-icon-x-circle> (custom element) rendering SVG
// Keeping just the names here avoids dragging icon source-of-truth into the
// behavior layer while still pinning the variant→icon contract.
export const variantIconName = {
  error: 'XCircleInstUIIcon',
  info: 'InfoInstUIIcon',
  success: 'CircleCheckInstUIIcon',
  warning: 'TriangleAlertInstUIIcon'
} as const satisfies Record<AlertVariant, string>

export type AlertVariantIconName = (typeof variantIconName)[AlertVariant]
