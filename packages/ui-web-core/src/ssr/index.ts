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
 * SSR + progressive-enhancement utilities. No DOM imports at module scope, so
 * this entry is safe to import in a server (RSC / Node) context. It pulls only
 * a type from the main entry (erased), not the client element classes.
 */

import type { ThemeName } from '../index'

/*
 * Resolves the initial theme name from the same preference cookies the
 * <instui-theme-provider> writes (`sec-ch-prefers-color-scheme`,
 * `sec-ch-prefers-contrast`), with the same precedence (contrast > dark >
 * default). Pass a reader bound to your framework's cookie store (e.g.
 * Next.js `(name) => cookies().get(name)?.value`). Lets the server set
 * `<instui-theme-provider theme-name>` for a flash-free first paint.
 */
export const getInitialThemeName = (
  read: (name: string) => string | undefined
): ThemeName => {
  if (read('sec-ch-prefers-contrast') === 'more') return 'contrastTheme'
  if (read('sec-ch-prefers-color-scheme') === 'dark') return 'darkTheme'
  return 'defaultTheme'
}

/*
 * Skeleton styles for the interactive elements. Before the client bundle
 * registers the custom elements (`customElements.define`), `:not(:defined)`
 * matches and renders a fixed-size shimmer block in their place; once the
 * element upgrades, the rule stops applying and the real component shows.
 * `:not(:defined)` elements have no intrinsic size, so explicit min dimensions
 * are required or the skeleton would collapse.
 */
export const skeletonCss = `
instui-menu:not(:defined),
instui-drilldown:not(:defined),
[data-instui-skeleton]:not(:defined) {
  display: block;
  box-sizing: border-box;
  min-width: 16rem;
  min-height: 2.75rem;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.06);
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.06) 40%,
    rgba(0, 0, 0, 0.06) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  background-size: 200% 100%;
  background-repeat: no-repeat;
  animation: instui-skeleton-shimmer 1.4s ease-in-out infinite;
}
@keyframes instui-skeleton-shimmer {
  0% { background-position: 150% 0; }
  100% { background-position: -50% 0; }
}
`

let _injected = false

/*
 * Appends the skeleton stylesheet once. No-op on the server (no document).
 */
export const injectSkeletonStyles = (doc?: Document): void => {
  const target = doc ?? (typeof document !== 'undefined' ? document : undefined)
  if (!target || _injected) return
  const style = target.createElement('style')
  style.setAttribute('data-instui-skeleton-styles', '')
  style.textContent = skeletonCss
  target.head.appendChild(style)
  _injected = true
}
