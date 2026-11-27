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

import { mergeDeep } from '@instructure/ui-utils'
import type { Theme } from '@instructure/ui-themes'

const LEGACY_TO_INSTITUTIONAL = {
  brandButtonPrimaryBgd: 'ic-brand-button--primary-bgd',
  brandButtonPrimaryText: 'ic-brand-button--primary-text',
  brandFontColorDark: 'ic-brand-font-color-dark',
  brandGlobalNavBgd: 'ic-brand-global-nav-bgd',
  brandGlobalNavMenuItemTextColor: 'ic-brand-global-nav-menu-item__text-color',
  brandGlobalNavMenuItemTextColorActive:
    'ic-brand-global-nav-menu-item__text-color--active',
  brandPrimary: 'ic-brand-primary',
  globalNavLinkHover: 'ic-global-nav-link-hover',
  brandGlobalNavIconSVGFill: 'ic-brand-global-nav-ic-icon-svg-fill',
  brandGlobalNavIconSVGFillActive:
    'ic-brand-global-nav-ic-icon-svg-fill--active'
} as const

// TODO: remove once consumers set semantics.color.institutional themselves
/**
 * Returns the semantics overrides from the theme provider, with the legacy
 * `ic-brand-*` theme values mapped onto `semantics.color.institutional`. The
 * legacy values only apply to the `canvas` theme and only when no institutional
 * overrides are set.
 */
const getSemanticsOverrides = (theme: Theme) => {
  const semanticsOverrides = theme.themeOverride?.semantics

  if (
    theme.key !== 'canvas' ||
    Object.keys(semanticsOverrides?.color?.institutional ?? {}).length > 0
  ) {
    return semanticsOverrides
  }

  const institutional: Record<string, unknown> = {}
  for (const [token, legacyKey] of Object.entries(LEGACY_TO_INSTITUTIONAL)) {
    const value = theme[legacyKey]
    if (value !== undefined) {
      institutional[token] = value
    }
  }

  return mergeDeep(semanticsOverrides ?? {}, { color: { institutional } })
}

export default getSemanticsOverrides
export { getSemanticsOverrides }
