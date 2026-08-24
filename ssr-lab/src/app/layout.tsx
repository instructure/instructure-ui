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
// Self-host Lato so InstUI's `LatoWeb, Lato, ...` font stack resolves to a real
// bundled font instead of an OS fallback. Same reasoning as the regression-test
// app: a different fallback font changes text metrics, and here it would also
// add a font-swap layout shift on top of the ones we want to measure.
import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import './globals.css'
import { Providers } from './providers'
import { ShiftMeter } from '@/components/ShiftMeter'
import { OBSERVER_SCRIPT } from '@/lib/instrumentation'

export const metadata = {
  title: 'InstUI SSR lab'
}

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="hu">
      <head>
        {/* Must be the first script on the page: it has to be observing before
            anything gets a chance to move. */}
        <script dangerouslySetInnerHTML={{ __html: OBSERVER_SCRIPT }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        {/* Outside the provider, so the panel itself uses no InstUI component
            and cannot shift. */}
        <ShiftMeter />
      </body>
    </html>
  )
}
