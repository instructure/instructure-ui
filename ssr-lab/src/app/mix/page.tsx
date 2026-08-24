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

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ScenarioFrame } from '@/components/ScenarioFrame'
import { LOADERS } from '@/scenarios/loaders'
import { findScenario } from '@/scenarios/meta'

export const dynamic = 'force-dynamic'

/**
 * Renders several scenarios on one page, chosen with repeated `c` query params:
 *
 *   /mix?c=text-input&c=table&c=truncate-text
 *
 * The measurement panel reports one CLS for the whole page, which is the number
 * that matters when the question is "how bad is a real page", not "how bad is
 * this one component".
 */
export default async function MixPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const raw = params.c
  const requested = Array.isArray(raw) ? raw : raw ? [raw] : []

  const selected = requested
    .map((slug) => ({
      slug,
      meta: findScenario(slug),
      Scenario: LOADERS[slug]
    }))
    .filter((entry) => entry.meta && entry.Scenario)

  if (selected.length === 0) notFound()

  return (
    <>
      <Link href="/" className="scenario__back">
        &larr; lista
      </Link>
      <ScenarioFrame
        title={`Összeállítás: ${selected
          .map((entry) => entry.meta!.title)
          .join(' + ')}`}
      >
        {selected.map(({ slug, Scenario }) => (
          <div key={slug} style={{ marginBottom: '3rem' }}>
            <Scenario />
          </div>
        ))}
      </ScenarioFrame>
    </>
  )
}
