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
        Minden oldal valódi szerveroldali rendereléssel jön le, majd a
        böngészőben hidratálódik — ugyanaz a folyamat, amit egy Next.js
        alkalmazás csinálna. A jobb alsó panel megmutatja, mennyit mozdult el a
        tartalom eközben: a <strong>CLS</strong> a Google mérőszáma (0,1 alatt
        jó), a <strong>magasság</strong> pedig azt mutatja, hány pixellel lett
        más az oldal a hidratálás után. Csak a v2 (<code>latest</code>)
        komponensek szerepelnek.
      </p>
      <p className="lede">
        A lista minden eleménél szerepel egy referenciaérték az első felmérésből
        (production build, 1280&times;900, headless Chrome, 4&times; CPU
        lassítás). A saját géped és böngészőablakod más számokat fog adni — az
        előjel és a nagyságrend az, amit érdemes összevetni. Valósághű
        eredményhez <code>npm run build &amp;&amp; npm start</code>-ot használj,
        ne a <code>npm run dev</code>-et.
      </p>
      <p className="lede">
        A lassú betöltés szimulálásához nyisd meg a DevToolst, és a Network
        fülön állítsd a throttlingot &bdquo;Slow 4G&rdquo;-re, a Performance
        fülön pedig a CPU-t 4&times; vagy 6&times; lassításra. Utána töltsd újra
        az oldalt — így válik szemmel is láthatóvá az, amit a panel számokban
        mutat.
      </p>

      <ScenarioPicker />
    </main>
  )
}
