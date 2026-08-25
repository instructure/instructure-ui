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

import { ScenarioPicker } from '@/components/ScenarioPicker'

export default function IndexPage() {
  return (
    <main className="page">
      <h1>InstUI SSR lab</h1>
      <p className="lede">
        Every page here is rendered on the server for real and then hydrated in
        the browser — the same sequence a Next.js app goes through. The panel in
        the top right reports how much the content moved in between:{' '}
        <strong>CLS</strong> is Google&rsquo;s metric (under 0.1 is good), and{' '}
        <strong>height</strong> shows how many pixels taller or shorter the page
        became once hydration finished. Only the v2 (<code>latest</code>)
        components are covered.
      </p>
      <p className="lede">
        Each entry carries the value it measured on the first survey (production
        build, 1280&times;900, headless Chrome, 4&times; CPU throttling). Your
        machine and window size will produce different absolute numbers — the
        sign and the order of magnitude are what to compare. For realistic
        results run <code>npm run build &amp;&amp; npm start</code>, not{' '}
        <code>npm run dev</code>.
      </p>
      <p className="lede">
        To make a shift visible rather than just measurable, open DevTools, set
        Performance &rarr; CPU to 20&times; slowdown, and enable Rendering
        &rarr; <em>Layout Shift Regions</em>, which flashes the areas that
        moved. Then reload with <code>Cmd+Shift+R</code>. A slow network profile
        with high latency helps too, but CPU throttling is the more reliable
        lever on localhost.
      </p>

      <ScenarioPicker />
    </main>
  )
}
