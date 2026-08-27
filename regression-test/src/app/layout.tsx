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
'use client'
import React, { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
// Self-host Lato so InstUI's `LatoWeb, Lato, ...` font stack resolves to a real,
// bundled font in every environment. Without this the stack falls back to
// whatever sans-serif the OS provides (Helvetica Neue locally, DejaVu Sans in
// the Linux CI container), which changes text metrics and makes layout-driven
// components render at different heights — breaking the visual baseline.
// InstUI uses weights 300/400/700.
import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import './globals.css'
import {
  InstUISettingsProvider,
  canvas,
  canvasHighContrast,
  light,
  dark
} from '@instructure/ui/latest'

const inter = Inter({ subsets: ['latin'] })

// Themes the suite can render. The `?theme=` query param selects one; the
// visual regression spec drives a screenshot per theme via that param.
const themes = {
  canvas,
  'canvas-high-contrast': canvasHighContrast,
  light,
  dark
}

type ThemeKey = keyof typeof themes

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // Render `canvas` on the server and for the first client paint so the static
  // export and hydration agree, then switch to the requested theme in an effect.
  // Switching after mount (rather than during render) avoids a hydration
  // mismatch; the `data-theme` attribute lets the spec wait until the requested
  // theme is actually applied before screenshotting.
  const [themeKey, setThemeKey] = useState<ThemeKey>('canvas')
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('theme')
    if (requested && requested in themes) {
      setThemeKey(requested as ThemeKey)
    }
  }, [])

  // Paint the page on the active theme's own page-surface color so each theme is
  // screenshotted the way it's actually used — most visibly, the dark theme
  // renders on its near-black surface rather than on white. The value comes from
  // the theme's semantic tokens (canvas → white, light → faint grey, dark →
  // near-black), so it needs no per-theme hardcoding. `newTheme.semantics` is a
  // factory that must be called with the theme's primitives to resolve the token
  // objects — the same way the library resolves them internally (emotion's
  // useComputedTheme). Fall back to `transparent` if the token is ever absent.
  const newTheme = (themes[themeKey] as any)?.newTheme
  const semantics =
    typeof newTheme?.semantics === 'function'
      ? newTheme.semantics(newTheme.primitives)
      : newTheme?.semantics
  const pageBackground = semantics?.color?.background?.page ?? 'transparent'
  const pageColor = semantics?.color?.text?.base

  return (
    // we need to make a new Map to reset counting on the server side
    // on each page refresh TODO fix
    <html
      lang="en"
      data-theme={themeKey}
      style={{ background: pageBackground, color: pageColor }}
    >
      <head>
        <title>Component visual and regression test suite</title>
      </head>
      <InstUISettingsProvider
        theme={themes[themeKey]}
        instanceCounterMap={new Map()}
      >
        {/* Also set the background on <body> (with a full-viewport min-height):
            Cypress `capture: 'fullPage'` stitches the body onto its own canvas
            and does not reliably paint the <html> background into that image, so
            the html-only background shows in a real browser but not in the
            screenshots. Painting the body is what makes the dark surface appear
            in the captured baselines. */}
        <body
          className={inter.className}
          style={{
            background: pageBackground,
            color: pageColor,
            minHeight: '100vh'
          }}
        >
          {children}
        </body>
      </InstUISettingsProvider>
    </html>
  )
}
