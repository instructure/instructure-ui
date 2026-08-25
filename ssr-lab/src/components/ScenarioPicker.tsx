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

import { useState } from 'react'
import { RISK_LABELS, SCENARIOS, type RiskKind } from '@/scenarios/meta'

const GROUPS: { risk: RiskKind; heading: string; hint: string }[] = [
  {
    risk: 'custom',
    heading: 'Your own page',
    hint: 'Edit src/scenarios/custom.tsx and reload — it is already registered, so there is nothing to wire up. Rerun `npm run build && npm start` after each edit if you want trustworthy numbers.'
  },
  {
    risk: 'two-pass-styles',
    heading: 'Two-pass styles',
    hint: 'These recompute their styles after mount, so the server sends down different CSS than the one the browser ends up using.'
  },
  {
    risk: 'both',
    heading: 'Two-pass styles + DOM measurement',
    hint: 'Both causes at once — these tend to move the most.'
  },
  {
    risk: 'dom-measurement',
    heading: 'DOM measurement',
    hint: 'These measure the space available to them, which is impossible on the server.'
  },
  {
    risk: 'suite',
    heading: 'Assembled pages',
    hint: 'Several components on one page, the way they would appear on a real screen.'
  }
]

export function ScenarioPicker() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (slug: string) =>
    setSelected((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    )

  const mixHref = `/mix?${selected.map((slug) => `c=${slug}`).join('&')}`

  return (
    <>
      {GROUPS.map((group) => (
        <section key={group.risk}>
          <h2>{group.heading}</h2>
          <div className="group">
            <p className="group__hint">{group.hint}</p>
            <ul className="list">
              {SCENARIOS.filter((scenario) => scenario.risk === group.risk).map(
                (scenario) => (
                  <li key={scenario.slug}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected.includes(scenario.slug)}
                        onChange={() => toggle(scenario.slug)}
                      />
                      <span>
                        {/* A plain anchor, not next/link: a client-side
                            transition would skip the server render entirely,
                            leaving nothing to measure. Every scenario has to be
                            reached by a full page load. */}
                        <a href={`/s/${scenario.slug}`}>{scenario.title}</a>
                        <span className="baseline"> {scenario.baseline}</span>
                        <span className="note"> — {scenario.note}</span>
                      </span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
      ))}

      <div className="actions">
        {selected.length > 0 ? (
          <a className="button" href={mixHref}>
            Open {selected.length} selected on one page
          </a>
        ) : (
          <span className="button" aria-disabled="true">
            Tick components to assemble a page
          </span>
        )}
        {selected.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setSelected([])}
          >
            Clear selection
          </button>
        )}
      </div>

      <p className="group__hint" style={{ marginTop: '1.5rem' }}>
        Three ways to test something of your own. <strong>Write it</strong>:
        edit <code>src/scenarios/custom.tsx</code>, which is already registered
        as the scratch page above. <strong>Combine existing ones</strong>: tick
        several and use the button, or type the URL by hand as{' '}
        <code>/mix?c=text-input&amp;c=table</code>. <strong>Keep it</strong>: if
        a case is worth saving, copy the scratch page to{' '}
        <code>src/scenarios/&lt;name&gt;.tsx</code> and add one line to{' '}
        <code>loaders.ts</code> plus one entry to <code>meta.ts</code>.
      </p>
      <p className="group__hint">
        The {RISK_LABELS['dom-measurement']} and{' '}
        {RISK_LABELS['two-pass-styles']} groups move for different reasons, so
        they are worth looking at separately.
      </p>
    </>
  )
}
