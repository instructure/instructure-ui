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

import type { ReactNode } from 'react'
import { InstUISettingsProvider, canvas } from '@instructure/ui/latest'

/**
 * Only the provider is a client component; the surrounding html/body shell stays
 * on the server. This mirrors how a real Next.js App Router consumer would wire
 * InstUI in.
 *
 * Note there is deliberately no theme switching in an effect here. The
 * regression-test app does that so its static export and hydration agree, but
 * changing the theme after mount re-renders every component and produces a
 * layout shift of its own — which would pollute every measurement this app
 * makes.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <InstUISettingsProvider
      theme={canvas as any}
      // A fresh Map on every render. InstUI's deterministic ID counter is
      // module-level state, so on a long-lived Node server it keeps counting
      // across requests: without this, request #1 emits `TextInput___1`,
      // request #2 emits `TextInput___6`, and so on, while the browser always
      // starts from zero — a guaranteed server/client mismatch on every reload
      // but the first. The regression-test app does the same thing for the same
      // reason. Note this only makes the ids line up; it does not fix that the
      // ids arrive after hydration.
      instanceCounterMap={new Map()}
    >
      {children}
    </InstUISettingsProvider>
  )
}
