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

/*
 * POC icon set for the Lit Alert. Path data hand-copied from Lucide
 * (lucide-react@1.7.0, ISC license) to match the React Alert's variant icons:
 *
 *   error   → XCircleInstUIIcon       = lucide-react/circle-x
 *   info    → InfoInstUIIcon          = lucide-react/info
 *   success → CircleCheckInstUIIcon   = lucide-react/circle-check
 *   warning → TriangleAlertInstUIIcon = lucide-react/triangle-alert
 *
 * When `@instructure/ui-icons-svg` lands on this branch, these inline SVGs
 * should be replaced by imports from that package so the source-of-truth
 * lives in one place.
 */

import { html, svg, type TemplateResult } from 'lit'

import type { AlertVariant } from '@alerts/Alert/v2/types'

const wrap = (children: TemplateResult): TemplateResult => html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    ${children}
  </svg>
`

const xCircle = wrap(svg`
  <circle cx="12" cy="12" r="10"></circle>
  <path d="m15 9-6 6"></path>
  <path d="m9 9 6 6"></path>
`)

const info = wrap(svg`
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M12 16v-4"></path>
  <path d="M12 8h.01"></path>
`)

const circleCheck = wrap(svg`
  <circle cx="12" cy="12" r="10"></circle>
  <path d="m9 12 2 2 4-4"></path>
`)

const triangleAlert = wrap(svg`
  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
  <path d="M12 9v4"></path>
  <path d="M12 17h.01"></path>
`)

// Keyed by variant name so the Lit Alert can look up an icon by `this.variant`
// directly — same shape the React Alert's `variantUI` map exposes.
export const variantIcons: Record<AlertVariant, TemplateResult> = {
  error: xCircle,
  info,
  success: circleCheck,
  warning: triangleAlert
}
