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

import { LitElement, html } from 'lit'

import generateStyle from '@popover/Popover/v2/styles'
import {
  resolveShown,
  resolveShowIntent,
  resolveHideIntent,
  resolveToggleIntent,
  resolvePlacement
} from '@popover/Popover/v2/behavior'
import type { PopoverColor, PopoverPlacement } from '@popover/Popover/v2/types'
import { calculateElementPosition } from '@position/calculateElementPosition'
import { mirrorHorizontalPlacement } from '@position/mirrorHorizontalPlacement'
import { FocusRegion } from '@a11y/FocusRegion'

import {
  resolveTheme,
  themes,
  styleObjectToCss,
  type ThemeName
} from '../theme'

const POPOVER_TAG = 'instui-popover'

export type PopoverHideDetail = { documentClick: boolean }

/**
 * Framework-agnostic (Lit) port of `@instructure/ui-popover`, POC stage 3.
 *
 * The controlled/uncontrolled show/hide state machine is the shared, React-free
 * single source of truth (`@popover/Popover/v2/behavior`). Positioning reuses
 * the already-React-free `calculateElementPosition` from `@instructure/ui-position`,
 * and focus management reuses `FocusRegion` from `@instructure/ui-a11y-utils`.
 *
 * Trigger + content are expressed via slots (`slot="trigger"` + default slot).
 * The positioned content is portaled to `document.body` so `calculateElementPosition`'s
 * body-relative coordinates are valid (mirrors what the React `Position`/`Portal`
 * does); scoped styles travel via an inlined `<style>` in the portal.
 *
 * POC scope: `on='click'` only. No hover/focus triggers, no tooltip mode, no arrow.
 */
export class Popover extends LitElement {
  static properties = {
    defaultIsShowingContent: {
      type: Boolean,
      attribute: 'default-is-showing-content'
    },
    placement: { type: String },
    offsetX: { type: Number, attribute: 'offset-x' },
    offsetY: { type: Number, attribute: 'offset-y' },
    constrain: { type: String },
    color: { type: String },
    shouldContainFocus: { type: Boolean, attribute: 'should-contain-focus' },
    shouldReturnFocus: { type: Boolean, attribute: 'should-return-focus' },
    shouldCloseOnDocumentClick: {
      type: Boolean,
      attribute: 'should-close-on-document-click'
    },
    shouldCloseOnEscape: {
      type: Boolean,
      attribute: 'should-close-on-escape'
    },
    mountNodeSelector: { type: String, attribute: 'mount-node' },
    themeName: { type: String, attribute: 'theme-name' },
    _stateShown: { state: true }
  }

  // Public reactive props (defaults mirror the v2 React Popover).
  defaultIsShowingContent = false
  placement: PopoverPlacement = 'bottom center'
  offsetX: string | number = 0
  offsetY: string | number = 0
  constrain = 'window'
  color: PopoverColor = 'primary'
  shouldContainFocus = false
  shouldReturnFocus = true
  shouldCloseOnDocumentClick = true
  shouldCloseOnEscape = true
  mountNodeSelector = ''
  themeName: ThemeName = 'defaultTheme'

  // Imperative nullable controlled prop — `null` means uncontrolled (so the
  // `undefined`-means-uncontrolled contract survives; a Boolean attribute would
  // default to `false` and break it). Set via `el.isShowingContent = true`.
  isShowingContent: boolean | null = null

  private _stateShown = false

  private _portal: HTMLDivElement | null = null
  private _portalStyle: HTMLStyleElement | null = null
  private _targetProxy: HTMLDivElement | null = null
  private _contentNodes: Node[] = []
  private _triggerEl: HTMLElement | null = null
  private _focusRegion: FocusRegion | null = null

  private _onThemeChange = (event: Event) => {
    const detail = (event as CustomEvent<{ themeName: ThemeName }>).detail
    if (detail?.themeName && themes[detail.themeName]) {
      this.themeName = detail.themeName
      if (this.shown) this._reflectContentStyles()
    }
  }

  private _onReposition = () => this._reposition()

  // -------------------------------------------------------------------------
  // Public API (mirrors the React Popover contract Drilldown depends on)
  // -------------------------------------------------------------------------

  get shown(): boolean {
    return resolveShown(
      this.isShowingContent === null ? undefined : this.isShowingContent,
      this._stateShown
    )
  }

  show = (event?: Event) => {
    const intent = resolveShowIntent(this.isShowingContent !== null)
    if (intent.setStateShown !== null) this._stateShown = intent.setStateShown
    if (intent.fireShow) {
      this.dispatchEvent(
        new CustomEvent('instui-popover-show', {
          bubbles: true,
          composed: true
        })
      )
    }
    // open the portal regardless of controlled/uncontrolled (it reflects `shown`)
    void this.updateComplete.then(() => this._openPortal())
    void event
  }

  hide = (event?: Event, documentClick = false) => {
    // read the pre-transition visibility synchronously — the parity move with
    // React's functional-setState snapshot read
    const wasShown = this.shown
    const intent = resolveHideIntent({
      isControlled: this.isShowingContent !== null,
      currentShown: wasShown
    })
    if (intent.setStateShown !== null) this._stateShown = intent.setStateShown
    if (intent.fireHide) {
      this.dispatchEvent(
        new CustomEvent<PopoverHideDetail>('instui-popover-hide', {
          detail: { documentClick },
          bubbles: true,
          composed: true
        })
      )
    }
    this._closePortal()
    void event
  }

  toggle = (event?: Event) => {
    if (resolveToggleIntent(this.shown) === 'show') this.show(event)
    else this.hide(event)
  }

  // -------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------

  override connectedCallback() {
    super.connectedCallback()
    window.addEventListener(
      'instui-theme-change',
      this._onThemeChange as EventListener
    )
  }

  override firstUpdated() {
    this._triggerEl = this._resolveTriggerEl()
    if (this.defaultIsShowingContent && this.isShowingContent === null) {
      this._stateShown = true
    }
    if (this.shown) void this.updateComplete.then(() => this._openPortal())
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener(
      'instui-theme-change',
      this._onThemeChange as EventListener
    )
    this._teardownPortal()
  }

  override render() {
    // Trigger lives in light DOM (slotted) so the consumer's click/ARIA work.
    // The default slot holds the content, which is relocated into the body
    // portal on show. It is hidden in-place so it never renders twice.
    return html`
      <style>
        :host {
          display: inline-block;
        }
        ::slotted([slot='trigger']) {
          cursor: pointer;
        }
        .content {
          display: none;
        }
      </style>
      <slot name="trigger" @click=${this._onTriggerClick}></slot>
      <slot class="content"></slot>
    `
  }

  // -------------------------------------------------------------------------
  // Internals
  // -------------------------------------------------------------------------

  private _onTriggerClick = (event: Event) => {
    this.toggle(event)
  }

  private _resolveTriggerEl(): HTMLElement | null {
    // Query the light-DOM trigger child directly — deterministic regardless of
    // slot-assignment timing or how deeply the popover is nested (a flyout
    // popover lives inside the parent menu's shadow root, where
    // `slot.assignedElements()` can come back empty at measure time).
    const direct = this.querySelector(
      ':scope > [slot="trigger"]'
    ) as HTMLElement | null
    if (direct) return direct

    const slot = this.renderRoot.querySelector(
      'slot[name="trigger"]'
    ) as HTMLSlotElement | null
    return (slot?.assignedElements()[0] as HTMLElement) ?? null
  }

  private _contentSlot(): HTMLSlotElement | null {
    return this.renderRoot.querySelector(
      'slot.content'
    ) as HTMLSlotElement | null
  }

  private _ensurePortal() {
    if (this._portal) return
    const portal = document.createElement('div')
    portal.setAttribute('data-instui-popover-portal', '')
    portal.style.position = 'absolute'
    portal.style.top = '0'
    portal.style.left = '0'
    portal.style.boxSizing = 'border-box'
    portal.style.zIndex = '9999'
    const style = document.createElement('style')
    portal.appendChild(style)
    this._portal = portal
    this._portalStyle = style
  }

  // A hidden light-DOM stand-in for the trigger, kept in document.body so
  // `calculateElementPosition` can measure it (it can't measure a shadow-DOM
  // trigger). Mirrors the trigger's viewport rect on each reposition.
  private _ensureTargetProxy(): HTMLDivElement {
    if (!this._targetProxy) {
      const proxy = document.createElement('div')
      proxy.setAttribute('data-instui-popover-target', '')
      proxy.style.position = 'fixed'
      proxy.style.margin = '0'
      proxy.style.padding = '0'
      proxy.style.pointerEvents = 'none'
      proxy.style.visibility = 'hidden'
      this._targetProxy = proxy
    }
    if (!this._targetProxy.parentNode) {
      document.body.appendChild(this._targetProxy)
    }
    return this._targetProxy
  }

  private _mountNode(): HTMLElement {
    if (this.mountNodeSelector) {
      const el = document.querySelector(this.mountNodeSelector)
      if (el instanceof HTMLElement) return el
    }
    return document.body
  }

  private _openPortal() {
    if (!this.shown) return
    this._triggerEl = this._resolveTriggerEl()
    this._ensurePortal()
    const portal = this._portal!

    // relocate the slotted content nodes into the portal
    const slot = this._contentSlot()
    this._contentNodes = (slot?.assignedNodes() ?? []).slice()
    this._contentNodes.forEach((node) => portal.appendChild(node))

    this._reflectContentStyles()
    this._mountNode().appendChild(portal)
    portal.style.display = 'block'

    this._reposition()
    // re-measure after layout settles (the portaled content's custom elements
    // may not have a final size on the first synchronous pass)
    requestAnimationFrame(() => this._reposition())
    window.addEventListener('scroll', this._onReposition, true)
    window.addEventListener('resize', this._onReposition)

    // focus management via the shared FocusRegion
    this._focusRegion = new FocusRegion(portal, {
      shouldContainFocus: this.shouldContainFocus,
      shouldReturnFocus: this.shouldReturnFocus,
      shouldCloseOnEscape: this.shouldCloseOnEscape,
      shouldCloseOnDocumentClick: this.shouldCloseOnDocumentClick,
      onDismiss: (event, documentClick) => {
        // ignore the document-click that is the trigger itself — its own click
        // handler already toggled (avoids a redundant double-hide)
        if (
          documentClick &&
          this._triggerEl &&
          event.target instanceof Node &&
          this._triggerEl.contains(event.target)
        ) {
          return
        }
        this.hide(event as unknown as Event, !!documentClick)
      }
    })
    this._focusRegion.activate()
    this._focusRegion.focus()
  }

  private _closePortal() {
    if (!this._portal) return
    window.removeEventListener('scroll', this._onReposition, true)
    window.removeEventListener('resize', this._onReposition)

    this._focusRegion?.deactivate()
    this._focusRegion?.blur()
    this._focusRegion = null

    // move the content nodes back into the host light DOM
    this._contentNodes.forEach((node) => this.appendChild(node))
    this._contentNodes = []

    this._portal.style.display = 'none'
    if (this._portal.parentNode) {
      this._portal.parentNode.removeChild(this._portal)
    }
  }

  private _teardownPortal() {
    this._focusRegion?.deactivate()
    this._focusRegion?.blur()
    this._focusRegion = null
    window.removeEventListener('scroll', this._onReposition, true)
    window.removeEventListener('resize', this._onReposition)
    if (this._portal?.parentNode) {
      this._portal.parentNode.removeChild(this._portal)
    }
    if (this._targetProxy?.parentNode) {
      this._targetProxy.parentNode.removeChild(this._targetProxy)
    }
    this._portal = null
    this._portalStyle = null
    this._targetProxy = null
  }

  private _resolveTheme() {
    const theme = themes[this.themeName] ?? themes.defaultTheme
    const resolved = resolveTheme(theme.raw, {})
    return resolved.components.Popover as Parameters<typeof generateStyle>[0]
  }

  // Writes the popover chrome + scoped CSS onto the body portal (which lives
  // outside the shadow root, so scoped styles must be inlined here).
  private _reflectContentStyles() {
    if (!this._portal || !this._portalStyle) return
    const componentTheme = this._resolveTheme()
    const styleObj = generateStyle(componentTheme) as unknown as Record<
      string,
      unknown
    >
    const borderColor =
      typeof styleObj.borderColor === 'string' ? styleObj.borderColor : '#ccc'
    const borderRadius =
      typeof styleObj.borderRadius === 'string' ? styleObj.borderRadius : '4px'

    // top-level scalars are popover chrome; .scrollContainer (if used) comes
    // through the shared converter
    this._portal.style.border = `1px solid ${borderColor}`
    this._portal.style.borderRadius = borderRadius
    this._portal.style.background = '#fff'
    this._portal.style.boxShadow = '0 2px 8px rgba(0,0,0,0.18)'

    this._portalStyle.textContent = styleObjectToCss(styleObj)
  }

  private _reposition() {
    if (!this._portal || !this._triggerEl) return
    const placement = resolvePlacement(
      {
        placement: this.placement,
        isRtl: false,
        shown: true,
        shouldRenderOffscreen: false
      },
      (p) => mirrorHorizontalPlacement(p, ' ')
    )

    // `@instructure/ui-position`'s getBoundingClientRect returns a ZERO rect for
    // elements inside a shadow root (its `contains(documentElement, node)` guard
    // fails across the shadow boundary), so a shadow-DOM trigger — e.g. a Menu
    // flyout item — can't be measured directly. Native getBoundingClientRect
    // works across shadow boundaries, so mirror the trigger's viewport rect onto
    // a hidden light-DOM proxy in document.body and position against that.
    const rect = this._triggerEl.getBoundingClientRect()
    const target = this._ensureTargetProxy()
    target.style.top = `${rect.top}px`
    target.style.left = `${rect.left}px`
    target.style.width = `${rect.width}px`
    target.style.height = `${rect.height}px`

    const { style, availableHeight, availableWidth } = calculateElementPosition(
      this._portal,
      target,
      {
        placement,
        offsetX: this.offsetX,
        offsetY: this.offsetY,
        constrain: this.constrain as never
      }
    )

    this._portal.style.position = style.position || 'absolute'
    this._portal.style.top =
      typeof style.top === 'number' ? `${style.top}px` : String(style.top)
    this._portal.style.left =
      typeof style.left === 'number' ? `${style.left}px` : String(style.left)
    this._portal.style.transform = style.transform || ''

    if (availableHeight != null) {
      this._portal.style.setProperty(
        '--ui-position-available-height',
        `${availableHeight}px`
      )
    }
    if (availableWidth != null) {
      this._portal.style.setProperty(
        '--ui-position-available-width',
        `${availableWidth}px`
      )
    }
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(POPOVER_TAG)) {
  customElements.define(POPOVER_TAG, Popover)
}
