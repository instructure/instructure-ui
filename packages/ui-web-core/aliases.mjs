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
 * Source-only aliases for cherry-picking React-free modules out of sibling
 * InstUI packages without taking on a workspace dep on the whole thing. Shared
 * by the Storybook Vite config (.storybook/main.ts) and the library build
 * (vite.config.ts) so dev and build never drift. The library build bundles
 * (inlines) whatever these resolve to; the leaf utility packages those modules
 * import (@instructure/console, ui-dom-utils, etc.) stay external.
 *
 * Aliases remap paths only; they do not strip React. Import surgically (e.g.
 * `@alerts/Alert/v2/styles`) and avoid `.tsx` entries that pull in React.
 */

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// This file lives at the package root, so siblings are ../<pkg>/src
const __dirname = dirname(fileURLToPath(import.meta.url))

export const aliases = {
  '@alerts': resolve(__dirname, '../ui-alerts/src'),
  '@drilldown': resolve(__dirname, '../ui-drilldown/src'),
  '@popover': resolve(__dirname, '../ui-popover/src'),
  '@position': resolve(__dirname, '../ui-position/src'),
  '@a11y': resolve(__dirname, '../ui-a11y-utils/src'),
  '@menu': resolve(__dirname, '../ui-menu/src')
}
