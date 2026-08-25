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

import type { ReactNode } from 'react'
import { preHydrationSnapshotScript } from '@/lib/instrumentation'
import { SCENARIO_ELEMENT_ID } from '@/lib/constants'

/**
 * Wraps the scenario markup and drops the pre-hydration snapshot script right
 * after it, so the script sees the finished server-rendered subtree.
 *
 * This is a server component on purpose — it renders no interactive markup, and
 * keeping it on the server means the `<script>` ends up in the streamed HTML
 * rather than being re-created during hydration.
 */
export function ScenarioFrame({
  title,
  warning,
  children
}: {
  title: string
  warning?: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <div className="scenario">
        <p className="scenario__title">{title}</p>
        {/* Deliberately outside the measured element: it is static markup, so it
            shifts the scenario's starting position but never its height, and it
            cannot contribute to the numbers the panel reports. */}
        {warning && <div className="scenario__warning">{warning}</div>}
        <div id={SCENARIO_ELEMENT_ID}>{children}</div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: preHydrationSnapshotScript(SCENARIO_ELEMENT_ID)
        }}
      />
    </>
  )
}
