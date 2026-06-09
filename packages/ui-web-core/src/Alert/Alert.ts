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

import { LitElement, html, nothing, type PropertyValues } from 'lit'

import generateStyle from '@alerts/Alert/v2/styles'
import {
  AlertLiveRegionController,
  createDismissTimer,
  describeScreenReaderContent,
  resolveLiveRegion,
  shouldCloseOnKey,
  type DismissTimer
} from '@alerts/Alert/v2/behavior'
import type {
  AlertLiveRegion,
  AlertLiveRegionPoliteness,
  AlertTransition,
  AlertVariant
} from '@alerts/Alert/v2/types'

import {
  resolveTheme,
  themes,
  styleObjectToCss,
  type ThemeName
} from '../theme'
import { variantIcons } from './icons'

// ---------------------------------------------------------------------------
// <instui-alert>
// ---------------------------------------------------------------------------

const ALERT_TAG = 'instui-alert'

// IDs that don't repeat across instances on the same page. Lit doesn't ship
// deterministicId; nanosecond + counter is sufficient for the live region
// portal lookup.
let _idCounter = 0
const mintId = () => `instui-alert-${++_idCounter}-${Date.now().toString(36)}`

export class Alert extends LitElement {
  static properties = {
    variant: { type: String },
    variantScreenReaderLabel: {
      type: String,
      attribute: 'variant-screen-reader-label'
    },
    liveRegionSelector: { type: String, attribute: 'live-region-selector' },
    liveRegionPoliteness: {
      type: String,
      attribute: 'live-region-politeness'
    },
    isLiveRegionAtomic: { type: Boolean, attribute: 'is-live-region-atomic' },
    screenReaderOnly: { type: Boolean, attribute: 'screen-reader-only' },
    timeout: { type: Number },
    renderCloseButtonLabel: {
      type: String,
      attribute: 'render-close-button-label'
    },
    transition: { type: String },
    open: { type: Boolean, reflect: true },
    hasShadow: { type: Boolean, attribute: 'has-shadow' },
    themeName: { type: String, attribute: 'theme-name' }
  }

  // Public, attribute-backed reactive props (defaults mirror the v2 React Alert).
  variant: AlertVariant = 'info'
  variantScreenReaderLabel: string = ''
  liveRegionSelector: string = ''
  liveRegionPoliteness: AlertLiveRegionPoliteness = 'assertive'
  isLiveRegionAtomic: boolean = false
  screenReaderOnly: boolean = false
  timeout: number = 0
  renderCloseButtonLabel: string = ''
  transition: AlertTransition = 'fade'
  open: boolean = true
  hasShadow: boolean = true
  themeName: ThemeName = 'defaultTheme'

  // Imperatively-settable property for callers that want to pass a DOM Element
  // or a () => Element function directly (matches the React `liveRegion` prop
  // shape, which can't fit through an HTML attribute).
  liveRegion: AlertLiveRegion | undefined = undefined

  private _srid: string = mintId()
  private _timer: DismissTimer | null = null
  private _liveRegionController: AlertLiveRegionController | null = null
  private _onThemeChange = (event: Event) => {
    const detail = (event as CustomEvent<{ themeName: ThemeName }>).detail
    if (detail?.themeName && themes[detail.themeName]) {
      this.themeName = detail.themeName
    }
  }

  override connectedCallback() {
    super.connectedCallback()
    this._timer = createDismissTimer(this.timeout, () => this.close())
    this._liveRegionController = new AlertLiveRegionController(
      () => this._resolveLiveRegion(),
      () => this.liveRegionPoliteness,
      () => this.isLiveRegionAtomic
    )
    window.addEventListener(
      'instui-theme-change',
      this._onThemeChange as EventListener
    )
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this._timer?.clear()
    this._timer = null
    this._liveRegionController = null
    window.removeEventListener(
      'instui-theme-change',
      this._onThemeChange as EventListener
    )
  }

  override firstUpdated() {
    this._liveRegionController?.init()
    this._mountScreenreaderContent()
    this._timer?.arm()
  }

  override updated(changed: PropertyValues<this>) {
    // External `open` flip from truthy to falsy is a close signal — mirrors
    // the v2 React Alert's componentDidUpdate logic.
    if (changed.has('open') && changed.get('open') === true && !this.open) {
      this.close()
    }
  }

  override render() {
    const { componentTheme, sharedTokens } = this._resolveAlertTheme()
    const styles = generateStyle(
      componentTheme,
      { variant: this.variant, hasShadow: this.hasShadow },
      sharedTokens
    ) as Record<string, Record<string, unknown>>

    // Host visibility wrapper — keeps the screenReaderOnly + transition
    // semantics tight. The screen-reader content is portal'd out to the live
    // region element separately and stays in the DOM independent of host
    // visibility.
    const hostHidden = !this.open || this.screenReaderOnly
    const hostStyle = hostHidden
      ? this.transition === 'none'
        ? 'display: none;'
        : 'opacity: 0; pointer-events: none; transition: opacity 200ms ease;'
      : 'opacity: 1; transition: opacity 200ms ease;'

    return html`
      <style>
        :host {
          display: block;
        }
        ${styleObjectToCss(styles)} .closeButton {
          background: transparent;
          border: 0;
          padding: 0.25rem 0.5rem;
          font: inherit;
          font-size: 1rem;
          line-height: 1;
          color: inherit;
          cursor: pointer;
        }
        .closeButton:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
        .icon svg {
          width: 1.5rem;
          height: 1.5rem;
        }
      </style>
      <div
        class="alert"
        style=${hostStyle}
        @keyup=${this._handleKeyUp}
        @transitionend=${this._handleTransitionEnd}
      >
        <div class="icon">${variantIcons[this.variant]}</div>
        <div class="content">
          ${this.variantScreenReaderLabel
            ? html`<span class="variantScreenReaderLabel"
                >${this.variantScreenReaderLabel}</span
              >`
            : nothing}
          <slot></slot>
        </div>
        ${this.renderCloseButtonLabel
          ? html`
              <div class="closeButton">
                <button
                  type="button"
                  aria-label=${this.renderCloseButtonLabel}
                  @click=${this.close}
                >
                  ✕
                </button>
              </div>
            `
          : nothing}
      </div>
    `
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  close = () => {
    if (!this.open) return
    this._timer?.clear()
    this._liveRegionController?.refresh(this._srid)
    this.open = false
    // Fire dismiss immediately for `transition: none` / screenReaderOnly —
    // matches the React Alert's setState callback timing.
    if (this.transition === 'none' || this.screenReaderOnly) {
      this._fireDismiss()
    }
  }

  // -------------------------------------------------------------------------
  // Internals
  // -------------------------------------------------------------------------

  private _resolveLiveRegion(): Element | null {
    if (this.liveRegion !== undefined) {
      return resolveLiveRegion(this.liveRegion)
    }
    if (this.liveRegionSelector) {
      return document.querySelector(this.liveRegionSelector)
    }
    return null
  }

  // Resolves the current theme to the slices `generateStyle` needs. Defaults
  // to the canvas theme; ThemeProvider's `instui-theme-change` event swaps
  // `this.themeName` reactively when a sibling switches themes.
  private _resolveAlertTheme() {
    const theme = themes[this.themeName] ?? themes.defaultTheme
    const resolved = resolveTheme(theme.raw, {})
    return {
      componentTheme: resolved.components.Alert as Parameters<
        typeof generateStyle
      >[0],
      sharedTokens: resolved.sharedTokens as Parameters<typeof generateStyle>[2]
    }
  }

  private _mountScreenreaderContent() {
    if (!this._liveRegionController) return
    const wrapper = this._liveRegionController.appendContent(this._srid)
    if (!wrapper) return
    const { label, children } = describeScreenReaderContent({
      variantScreenReaderLabel: this.variantScreenReaderLabel,
      children: this.textContent ?? ''
    })
    wrapper.textContent = `${label} ${children ?? ''}`.trim()
  }

  private _handleKeyUp = (event: KeyboardEvent) => {
    if (shouldCloseOnKey(event, !!this.renderCloseButtonLabel)) {
      this.close()
    }
  }

  private _handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName !== 'opacity') return
    if (!this.open && this.transition !== 'none') {
      this._fireDismiss()
    }
  }

  private _fireDismiss() {
    this.dispatchEvent(
      new CustomEvent('instui-alert-dismiss', {
        bubbles: true,
        composed: true
      })
    )
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(ALERT_TAG)) {
  customElements.define(ALERT_TAG, Alert)
}
