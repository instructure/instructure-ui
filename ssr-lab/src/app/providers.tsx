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
    // No `instanceCounterMap` here. It used to be needed, because the id
    // counter was module-level state that never reset between server requests,
    // so every reload after the first produced server/client id mismatches.
    // INSTUI-5152 moved id generation onto React's `useId`, which is stable
    // across the server and client render on its own, and the prop is now a
    // deprecated no-op.
    <InstUISettingsProvider theme={canvas as any}>
      {children}
    </InstUISettingsProvider>
  )
}
