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

import { METER_ELEMENT_ID, SCENARIO_ELEMENT_ID } from './constants'

/**
 * Two tiny scripts that are inlined into the server-rendered HTML.
 *
 * They have to be plain strings rather than imported modules, because both of
 * them must run *before* React's bundle executes. Anything written as a normal
 * client component would only run after hydration has already happened, which
 * is exactly the moment we are trying to measure.
 */

/**
 * Goes into `<head>`, so it is the first thing the browser executes.
 *
 * Starts a PerformanceObserver for `layout-shift` entries. Every entry the
 * browser reports is a piece of content that moved without a user interaction
 * causing it — which is what "layout jump" means in numbers. The score of one
 * entry is `impact fraction * distance fraction`; the sum of the scores is CLS
 * (Cumulative Layout Shift).
 *
 * Each entry also carries `sources`: the actual DOM nodes that moved, with
 * their old and new rectangles. We turn those into a human readable label using
 * the emotion class name, which conveniently ends with the style's `label:`
 * value — e.g. `css-1abcde-formFieldLayout__label` tells us it was
 * FormFieldLayout's label element.
 */
export const OBSERVER_SCRIPT = `
(function () {
  var state = {
    cls: 0,
    shifts: [],
    preHydrationHeight: null,
    heightAfterFonts: null,
    fontsReadyAt: null,
    hydratedAt: null,
    onUpdate: null
  }
  window.__ssrLab = state

  function describe(node) {
    if (!node || node.nodeType !== 1) return '(removed node)'
    var tag = node.tagName.toLowerCase()
    var className = typeof node.className === 'string' ? node.className : ''
    // emotion class names look like "css-<hash>-<styleLabel>"
    var match = className.match(/css-[a-z0-9]+-([A-Za-z0-9_-]+)/)
    if (match) return tag + '.' + match[1]
    if (node.id) return tag + '#' + node.id
    return tag
  }

  function round(n) {
    return Math.round(n * 10) / 10
  }

  function measureScenario() {
    var el = document.getElementById('${SCENARIO_ELEMENT_ID}')
    return el ? Math.round(el.getBoundingClientRect().height) : null
  }
  state.measureScenario = measureScenario

  // The measurement panel is position:fixed, but a fixed element still produces
  // layout-shift entries when it moves. Anything inside it is the lab's own
  // chrome and must not count towards the score of the component under test.
  function insideMeter(node) {
    var el = node && node.nodeType === 1 ? node : null
    while (el) {
      if (el.id === '${METER_ELEMENT_ID}') return true
      el = el.parentElement
    }
    return false
  }

  // Web fonts swap in after the HTML is parsed and change text metrics, which
  // moves content on its own. Recording the height once the fonts have settled
  // separates that from what hydration does: under network throttling the fonts
  // are always in place long before React's bundle arrives.
  //
  // Records once, and only when there is something to measure. With a warm font
  // cache there may be no pending font load at all, in which case this resolves
  // while the body is still being parsed and the scenario element does not exist
  // yet — hence the second attempt from the snapshot script below.
  function recordFontHeight() {
    if (state.heightAfterFonts !== null) return
    var height = measureScenario()
    if (height === null) return
    state.heightAfterFonts = height
    if (typeof state.onUpdate === 'function') state.onUpdate()
  }
  state.recordFontHeight = recordFontHeight

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      state.fontsReadyAt = Math.round(performance.now())
      recordFontHeight()
    })
  } else {
    // No Font Loading API: treat the fonts as settled so the fallbacks below
    // still produce a number rather than leaving the field empty.
    state.fontsReadyAt = 0
  }

  // Last resort. The load event fires after every subresource, fonts included,
  // and on a throttled connection it still lands well before the React bundle.
  // If both paths above missed, this one cannot: the document is fully parsed.
  window.addEventListener('load', function () {
    if (state.fontsReadyAt === null) {
      state.fontsReadyAt = Math.round(performance.now())
    }
    recordFontHeight()
  })

  try {
    var observer = new PerformanceObserver(function (list) {
      list.getEntries().forEach(function (entry) {
        // A shift right after a click/keypress is the user's own fault, not ours.
        if (entry.hadRecentInput) return

        var sources = entry.sources || []
        var ownChrome =
          sources.length > 0 &&
          Array.prototype.every.call(sources, function (source) {
            return insideMeter(source.node)
          })
        if (ownChrome) return

        state.cls += entry.value
        state.shifts.push({
          at: Math.round(entry.startTime),
          value: entry.value,
          sources: (entry.sources || []).map(function (source) {
            var before = source.previousRect
            var after = source.currentRect
            return {
              label: describe(source.node),
              dx: round(after.x - before.x),
              dy: round(after.y - before.y),
              dWidth: round(after.width - before.width),
              dHeight: round(after.height - before.height)
            }
          })
        })

        if (typeof state.onUpdate === 'function') state.onUpdate()
      })
    })
    // buffered:true replays entries that happened before this callback existed
    observer.observe({ type: 'layout-shift', buffered: true })
  } catch (error) {
    state.unsupported = true
  }
})()
`

/**
 * Rendered directly *after* the scenario markup, still inside `<body>`.
 *
 * Inline scripts run while the HTML is being parsed, and React's bundle is
 * loaded with `defer`/`async`, so this runs at a point where the DOM contains
 * exactly the server-rendered output and nothing has hydrated yet. That makes
 * it the only reliable place to record how tall the SSR-only page was.
 */
export const preHydrationSnapshotScript = (elementId: string) => `
(function () {
  var el = document.getElementById('${elementId}')
  var state = window.__ssrLab
  if (!el || !state) return

  if (state.preHydrationHeight === null) {
    state.preHydrationHeight = Math.round(el.getBoundingClientRect().height)
  }

  // If the fonts had already settled before this markup was parsed — a warm
  // cache makes that the normal case — then the height just taken is also the
  // after-fonts height, and the fonts.ready handler had nothing to measure.
  if (state.fontsReadyAt !== null && typeof state.recordFontHeight === 'function') {
    state.recordFontHeight()
  }
})()
`

export type ShiftSource = {
  label: string
  dx: number
  dy: number
  dWidth: number
  dHeight: number
}

export type Shift = {
  at: number
  value: number
  sources: ShiftSource[]
}

export type LabState = {
  cls: number
  shifts: Shift[]
  /** Height of the scenario in the server HTML, before web fonts and before React. */
  preHydrationHeight: number | null
  /** Same height once the web fonts have swapped in, still before hydration. */
  heightAfterFonts: number | null
  fontsReadyAt: number | null
  hydratedAt: number | null
  measureScenario?: () => number | null
  recordFontHeight?: () => void
  onUpdate: (() => void) | null
  unsupported?: boolean
}
