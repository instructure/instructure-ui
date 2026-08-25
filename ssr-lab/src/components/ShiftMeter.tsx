'use client'

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

import { useCallback, useEffect, useRef, useState } from 'react'
import type { LabState } from '@/lib/instrumentation'
import { SCENARIO_ELEMENT_ID } from '@/lib/constants'

declare global {
  interface Window {
    __ssrLab?: LabState
  }
}

// Google's Core Web Vitals thresholds for CLS.
const GOOD = 0.1
const NEEDS_IMPROVEMENT = 0.25

// How long nothing may move before the page counts as settled and the panel is
// allowed to draw its report.
const SETTLE_MS = 1200

function verdict(cls: number) {
  if (cls <= GOOD) return { text: 'good', color: '#0b874b' }
  if (cls <= NEEDS_IMPROVEMENT)
    return { text: 'needs improvement', color: '#c47f00' }
  return { text: 'poor', color: '#c5283d' }
}

/**
 * The measurement panel. Deliberately built from plain DOM elements and
 * `position: fixed` instead of InstUI components: it must not contribute any
 * layout shift of its own, and it must stay readable even when the scenario
 * under test renders something broken.
 */
export function ShiftMeter() {
  // The panel renders nothing on the server and nothing on the first client
  // render either. That is not cosmetic: if the server rendered no panel and the
  // client rendered one, React would report a hydration mismatch and re-create
  // the whole tree from scratch — which is itself a huge layout shift, and would
  // make every number this panel reports meaningless.
  const [mounted, setMounted] = useState(false)
  const [, forceRender] = useState(0)
  const [currentHeight, setCurrentHeight] = useState<number | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [copied, setCopied] = useState(false)
  // The panel only draws its report once the page has stopped moving. While a
  // measurement is in flight it stays a fixed-size box, because a panel whose
  // own content grows pushes its own rows around, and the browser reports those
  // as layout shifts too. Those entries mix into the same score as the
  // component's, and the browser gives one score per entry — there is no way to
  // subtract the panel's share afterwards. Staying still is the only fix.
  const [settled, setSettled] = useState(false)
  const settleTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    setMounted(true)

    const state = window.__ssrLab
    if (!state) return

    // This effect is the first moment React is in control of the DOM, so it is
    // as close to "hydration finished" as we can get from inside React.
    if (state.hydratedAt === null) {
      state.hydratedAt = Math.round(performance.now())
    }

    const restartSettleTimer = () => {
      window.clearTimeout(settleTimer.current)
      settleTimer.current = window.setTimeout(() => setSettled(true), SETTLE_MS)
    }
    restartSettleTimer()

    state.onUpdate = () => {
      forceRender((n) => n + 1)
      setSettled(false)
      restartSettleTimer()
    }

    const element = document.getElementById(SCENARIO_ELEMENT_ID)
    if (!element) {
      forceRender((n) => n + 1)
      return () => {
        state.onUpdate = null
        window.clearTimeout(settleTimer.current)
      }
    }

    const measure = () =>
      setCurrentHeight(Math.round(element.getBoundingClientRect().height))
    measure()

    const resizeObserver = new ResizeObserver(() => {
      measure()
      restartSettleTimer()
    })
    resizeObserver.observe(element)

    return () => {
      state.onUpdate = null
      resizeObserver.disconnect()
      window.clearTimeout(settleTimer.current)
    }
  }, [])

  const state = mounted ? window.__ssrLab : undefined

  const buildReport = useCallback(() => {
    if (!state) return ''
    const lines = [
      `page: ${window.location.pathname}${window.location.search}`,
      `CLS: ${state.cls.toFixed(4)} (${verdict(state.cls).text})`,
      `height: server HTML ${
        state.preHydrationHeight ?? '?'
      }px -> after fonts ${
        state.heightAfterFonts ?? '?'
      }px -> after hydration ${currentHeight ?? '?'}px`,
      `timing: fonts ${state.fontsReadyAt ?? '?'}ms, hydration ${
        state.hydratedAt ?? '?'
      }ms`,
      `shifts: ${state.shifts.length}`
    ]
    state.shifts.forEach((shift) => {
      lines.push(`  +${shift.value.toFixed(4)} @${shift.at}ms`)
      shift.sources.forEach((source) => {
        lines.push(
          `    ${source.label}  dy ${source.dy}px  dx ${source.dx}px  dHeight ${source.dHeight}px`
        )
      })
    })
    return lines.join('\n')
  }, [state, currentHeight])

  const copyReport = () => {
    navigator.clipboard.writeText(buildReport()).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    })
  }

  if (!state) return null

  if (!settled) {
    return (
      <aside
        id="ssr-lab-meter"
        className="meter meter--waiting"
        aria-label="Layout shift measurement"
      >
        <strong>Measuring…</strong>
      </aside>
    )
  }

  const cls = state.cls
  const { text: verdictText, color: verdictColor } = verdict(cls)
  const ssrHeight = state.preHydrationHeight
  const fontHeight = state.heightAfterFonts

  // Split the total height change into the part the web fonts caused and the
  // part hydration caused, so the two are not blamed on each other.
  const fontDelta =
    ssrHeight !== null && fontHeight !== null ? fontHeight - ssrHeight : null
  const hydrationBase = fontHeight ?? ssrHeight
  const hydrationDelta =
    hydrationBase !== null && currentHeight !== null
      ? currentHeight - hydrationBase
      : null

  // If the bundle beat the fonts, the font snapshot is not trustworthy as a
  // "before hydration" baseline and the split below is meaningless.
  const fontsAfterHydration =
    state.fontsReadyAt !== null &&
    state.hydratedAt !== null &&
    state.fontsReadyAt > state.hydratedAt

  const signed = (value: number) => (value > 0 ? `+${value}` : `${value}`)

  return (
    <aside
      id="ssr-lab-meter"
      className="meter"
      aria-label="Layout shift measurement"
    >
      <header className="meter__head">
        <strong>Layout shift</strong>
        <button
          type="button"
          className="meter__button"
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </header>

      {!collapsed && (
        <>
          {state.unsupported && (
            <p className="meter__warning">
              This browser cannot measure layout shift. Use Chrome or Edge.
            </p>
          )}

          <div className="meter__score" style={{ color: verdictColor }}>
            {cls.toFixed(4)}
            <span className="meter__verdict">CLS &middot; {verdictText}</span>
          </div>

          <dl className="meter__facts">
            <dt>server HTML</dt>
            <dd>{ssrHeight ?? '?'}px</dd>

            <dt>after fonts</dt>
            <dd>
              {fontHeight ?? '?'}px
              {fontDelta !== null && fontDelta !== 0 && (
                <span className="meter__neutral"> ({signed(fontDelta)}px)</span>
              )}
            </dd>

            <dt>after hydration</dt>
            <dd>
              {currentHeight ?? '?'}px
              {hydrationDelta !== null && hydrationDelta !== 0 && (
                <strong className="meter__delta">
                  {' '}
                  ({signed(hydrationDelta)}px)
                </strong>
              )}
            </dd>

            <dt>Timing</dt>
            <dd>
              fonts {state.fontsReadyAt ?? '?'}ms &middot; hydration{' '}
              {state.hydratedAt ?? '?'}ms
            </dd>

            <dt>Shifts</dt>
            <dd>{state.shifts.length}</dd>
          </dl>

          {fontsAfterHydration && (
            <p className="meter__warning">
              The fonts settled after hydration, so the split above is not
              reliable. Turn on network throttling so the fonts are guaranteed
              to arrive before the JS.
            </p>
          )}

          {state.shifts.length > 0 && (
            <ol className="meter__shifts">
              {state.shifts.map((shift, shiftIndex) => (
                <li key={`${shift.at}-${shiftIndex}`}>
                  <span className="meter__shiftValue">
                    +{shift.value.toFixed(4)}
                  </span>
                  <span className="meter__shiftTime">@{shift.at}ms</span>
                  <ul>
                    {shift.sources.length === 0 && (
                      <li className="meter__source">
                        (the browser reported no moved element)
                      </li>
                    )}
                    {shift.sources.map((source, sourceIndex) => (
                      <li
                        key={`${source.label}-${sourceIndex}`}
                        className="meter__source"
                      >
                        <code>{source.label}</code>
                        {source.dy !== 0 && <span> dy {source.dy}px</span>}
                        {source.dx !== 0 && <span> dx {source.dx}px</span>}
                        {source.dHeight !== 0 && (
                          <span> dH {source.dHeight}px</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          )}

          <footer className="meter__foot">
            <button
              type="button"
              className="meter__button"
              onClick={copyReport}
            >
              {copied ? 'Copied' : 'Copy report'}
            </button>
            <button
              type="button"
              className="meter__button"
              onClick={() => window.location.reload()}
            >
              Re-measure
            </button>
          </footer>
        </>
      )}
    </aside>
  )
}
