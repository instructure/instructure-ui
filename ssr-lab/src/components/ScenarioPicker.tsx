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
import Link from 'next/link'
import { RISK_LABELS, SCENARIOS, type RiskKind } from '@/scenarios/meta'

const GROUPS: { risk: RiskKind; heading: string; hint: string }[] = [
  {
    risk: 'two-pass-styles',
    heading: 'Két-passzos stílus',
    hint: 'Ezek a komponensek a mount után újraszámolják a stílusukat, tehát a szerver egy másik CSS-t küld le, mint amit a böngésző végül használ.'
  },
  {
    risk: 'both',
    heading: 'Két-passzos stílus + DOM-mérés',
    hint: 'A két hibaforrás együtt — itt a legnagyobb az elmozdulás.'
  },
  {
    risk: 'dom-measurement',
    heading: 'DOM-mérés',
    hint: 'Ezek megmérik a rendelkezésre álló helyet, amit a szerveren nem tudnak megtenni.'
  },
  {
    risk: 'suite',
    heading: 'Összeállított oldalak',
    hint: 'Több komponens egy oldalon, ahogy egy valódi képernyőn lennének.'
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
                        <Link href={`/s/${scenario.slug}`}>
                          {scenario.title}
                        </Link>
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
          <Link className="button" href={mixHref}>
            {selected.length} kiválasztott megnyitása egy oldalon
          </Link>
        ) : (
          <span className="button" aria-disabled="true">
            Jelölj ki komponenseket az összeállításhoz
          </span>
        )}
        {selected.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setSelected([])}
          >
            Kijelölés törlése
          </button>
        )}
      </div>

      <p className="group__hint" style={{ marginTop: '1.5rem' }}>
        Egyetlen komponens: kattints a nevére. Saját összeállítás: jelöld be
        többet, vagy írd be kézzel az URL-t{' '}
        <code>/mix?c=text-input&amp;c=table</code> formában. Ugyanezt lehet egy
        új fájllal is: <code>src/scenarios/&lt;nev&gt;.tsx</code>, majd egy sor
        a <code>loaders.ts</code>-be és a <code>meta.ts</code>-be. Az{' '}
        {RISK_LABELS['dom-measurement']} és a {RISK_LABELS['two-pass-styles']}{' '}
        kategória más okból ugrik, ezért érdemes külön vizsgálni őket.
      </p>
    </>
  )
}
