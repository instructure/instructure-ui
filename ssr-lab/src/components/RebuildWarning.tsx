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

/**
 * Shown above the scratch page. `npm start` serves the last build, so reloading
 * after an edit silently shows — and measures — the previous version of the
 * file. That failure is quiet enough to waste a lot of time, hence the banner.
 *
 * Rendered outside the measured element by `ScenarioFrame`, and static, so it
 * cannot affect the reported height or CLS.
 */
export function RebuildWarning() {
  return (
    <>
      <strong>Rebuild after every edit.</strong> <code>npm start</code> serves
      the last <code>npm run build</code>, so a reload will show the previous
      version of <code>src/scenarios/custom.tsx</code> — and the panel will
      measure that. Run <code>npm run build &amp;&amp; npm start</code> again.
      For writing the markup, <code>npm run dev</code> hot-reloads, but its
      numbers are not comparable to the recorded baselines.
    </>
  )
}
