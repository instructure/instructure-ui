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

import { LitElement, html, css, type PropertyValues } from 'lit'

import { resolveTheme, themes, type ThemeName } from '../theme/themes'
import {
  cssVarsToRootRule,
  flattenToCssVars,
  type TokenTree
} from '../theme/toCssVariables'

const STYLE_ELEMENT_ID = 'instui-theme-provider'

// Attribute value shape for `custom-*-theme`. `isEnabled` is a metadata flag
// (it controls whether the auto-switcher will pick this theme); everything
// else is a token-tree override deep-merged into the resolved theme.
type CustomThemeAttr = {
  isEnabled?: boolean
  primitives?: TokenTree
  semantics?: TokenTree
  sharedTokens?: TokenTree
  components?: Record<string, TokenTree>
}

const jsonConverter = {
  fromAttribute: (value: string | null) => {
    if (!value) return {}
    try {
      return JSON.parse(value)
    } catch {
      return {}
    }
  },
  toAttribute: (value: CustomThemeAttr) => JSON.stringify(value)
}

const writeCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

const matchMediaSafe = (query: string): MediaQueryList | null => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return null
  }
  return window.matchMedia(query)
}

export class ThemeProvider extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }
  `

  static properties = {
    defaultThemeName: { type: String, attribute: 'default-theme-name' },
    userTheme: { type: String, attribute: 'user-theme' },
    customDefaultTheme: {
      attribute: 'custom-default-theme',
      converter: jsonConverter
    },
    customContrastTheme: {
      attribute: 'custom-contrast-theme',
      converter: jsonConverter
    },
    customDarkTheme: {
      attribute: 'custom-dark-theme',
      converter: jsonConverter
    },
    customLightTheme: {
      attribute: 'custom-light-theme',
      converter: jsonConverter
    }
  }

  defaultThemeName: ThemeName = 'defaultTheme'
  userTheme: string = ''
  customDefaultTheme: CustomThemeAttr = {}
  customContrastTheme: CustomThemeAttr = {}
  customDarkTheme: CustomThemeAttr = {}
  customLightTheme: CustomThemeAttr = {}

  private _styleElement: HTMLStyleElement | null = null
  private _mediaQueries: MediaQueryList[] = []
  private _onSystemPrefChange = () => this._applyResolvedTheme()

  override connectedCallback() {
    super.connectedCallback()
    const darkMq = matchMediaSafe('(prefers-color-scheme: dark)')
    const contrastMq = matchMediaSafe('(prefers-contrast: more)')
    this._mediaQueries = [darkMq, contrastMq].filter(
      (mq): mq is MediaQueryList => mq !== null
    )
    for (const mq of this._mediaQueries) {
      mq.addEventListener('change', this._onSystemPrefChange)
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    for (const mq of this._mediaQueries) {
      mq.removeEventListener('change', this._onSystemPrefChange)
    }
    this._mediaQueries = []
    if (this._styleElement && this._styleElement.parentNode) {
      this._styleElement.parentNode.removeChild(this._styleElement)
      this._styleElement = null
    }
  }

  override firstUpdated() {
    this._applyResolvedTheme()
  }

  override updated(changed: PropertyValues<this>) {
    if (
      changed.has('defaultThemeName') ||
      changed.has('userTheme') ||
      changed.has('customDefaultTheme') ||
      changed.has('customContrastTheme') ||
      changed.has('customDarkTheme') ||
      changed.has('customLightTheme')
    ) {
      this._applyResolvedTheme()
    }
  }

  override render() {
    return html`<slot></slot>`
  }

  private _customFor(name: ThemeName): CustomThemeAttr {
    switch (name) {
      case 'defaultTheme':
        return this.customDefaultTheme
      case 'contrastTheme':
        return this.customContrastTheme
      case 'darkTheme':
        return this.customDarkTheme
      case 'lightTheme':
        return this.customLightTheme
      default:
        return this.customDefaultTheme
    }
  }

  private _isEnabled(name: ThemeName): boolean {
    const custom = this._customFor(name)
    return custom.isEnabled ?? themes[name].isEnabled
  }

  // Mirrors tastysoft's SSR `getSystemPreferredTheme`: contrast wins over dark,
  // user-theme/default fallback otherwise. Also writes the same cookie names
  // tastysoft does so SSR layers shared across stacks don't need to special-
  // case InstUI.
  private _resolvePreferredTheme(): ThemeName {
    const prefersContrast =
      matchMediaSafe('(prefers-contrast: more)')?.matches ?? false
    const prefersDark =
      matchMediaSafe('(prefers-color-scheme: dark)')?.matches ?? false

    if (prefersContrast && this._isEnabled('contrastTheme')) {
      writeCookie('sec-ch-prefers-contrast', 'more')
      return 'contrastTheme'
    }
    writeCookie('sec-ch-prefers-contrast', 'normal')

    if (prefersDark && this._isEnabled('darkTheme')) {
      writeCookie('sec-ch-prefers-color-scheme', 'dark')
      return 'darkTheme'
    }
    writeCookie('sec-ch-prefers-color-scheme', 'light')

    const fallback = (this.userTheme as ThemeName) || this.defaultThemeName
    return themes[fallback] ? fallback : 'defaultTheme'
  }

  private _applyResolvedTheme() {
    const name = this._resolvePreferredTheme()
    const custom = this._customFor(name)
    // `isEnabled` is metadata, not a token — strip before passing through.
    const { isEnabled: _isEnabled, ...overrides } = custom
    const resolved = resolveTheme(themes[name].raw, overrides)
    const cssVars = flattenToCssVars({
      primitives: resolved.primitives,
      semantics: resolved.semantics,
      sharedTokens: resolved.sharedTokens,
      components: resolved.components
    })
    const cssText = cssVarsToRootRule(cssVars)

    if (typeof document === 'undefined') return
    if (!this._styleElement) {
      this._styleElement = document.createElement('style')
      this._styleElement.id = STYLE_ELEMENT_ID
      document.head.appendChild(this._styleElement)
    }
    this._styleElement.textContent = cssText

    this.dispatchEvent(
      new CustomEvent('instui-theme-change', {
        bubbles: true,
        composed: true,
        detail: { themeName: name }
      })
    )
  }
}

if (
  typeof customElements !== 'undefined' &&
  !customElements.get('instui-theme-provider')
) {
  customElements.define('instui-theme-provider', ThemeProvider)
}
