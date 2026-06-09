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

import {
  updateGroupSelection,
  itemTypeForGroup,
  nextFocusIndex,
  computeInitialGroupSelection
} from '@menu/Menu/v2/behavior'
import type { MenuGroupSelection, NeutralMenuItem } from '@menu/Menu/v2/types'

import { resolveTheme, themes, type ThemeName } from '../theme'
import { checkIcon, chevronRightIcon } from './icons'
// flyout submenus compose the sibling <instui-popover>; importing registers it
import '../Popover/Popover'

// ---------------------------------------------------------------------------
// Declarative `items` config — the Lit producer of the neutral menu data
// (the React Menu walks JSX children to produce the equivalent). A node with
// `items` is a flyout submenu trigger (see flyout handling below).
// ---------------------------------------------------------------------------

export type MenuConfigItem = {
  id: string
  label: string
  type?: 'button' | 'checkbox' | 'radio'
  value?: string | number
  disabled?: boolean
  defaultSelected?: boolean
  href?: string
  /** presence makes this a flyout submenu trigger */
  items?: MenuConfigNode[]
}

export type MenuConfigGroup = {
  groupId: string
  label?: string
  allowMultiple?: boolean
  /** controlled selected values */
  selectedValues?: MenuGroupSelection
  defaultSelected?: MenuGroupSelection
  items: MenuConfigItem[]
}

export type MenuConfigSeparator = { separator: true; id: string }

export type MenuConfigNode =
  | MenuConfigItem
  | MenuConfigGroup
  | MenuConfigSeparator

export type MenuSelectDetail = {
  value: string | number | undefined
  selected: boolean
  groupId?: string
}

const isGroup = (n: MenuConfigNode): n is MenuConfigGroup =>
  (n as MenuConfigGroup).groupId !== undefined
const isSeparator = (n: MenuConfigNode): n is MenuConfigSeparator =>
  (n as MenuConfigSeparator).separator === true

const MENU_TAG = 'instui-menu'

export class Menu extends LitElement {
  static properties = {
    items: { type: Array },
    label: { type: String },
    disabled: { type: Boolean },
    shouldHideOnSelect: { type: Boolean, attribute: 'should-hide-on-select' },
    themeName: { type: String, attribute: 'theme-name' },
    _highlightedId: { state: true },
    _itemSelected: { state: true },
    _groupSelected: { state: true },
    _activeSubmenuId: { state: true }
  }

  items: MenuConfigNode[] = []
  label = ''
  disabled = false
  shouldHideOnSelect = true
  themeName: ThemeName = 'defaultTheme'

  private _highlightedId: string | undefined = undefined
  private _itemSelected: Record<string, boolean> = {}
  private _groupSelected: Record<string, MenuGroupSelection> = {}
  private _activeSubmenuId: string | undefined = undefined

  // Set by a parent menu when this menu is opened as a flyout submenu's content.
  // Invoked on Left-arrow so the submenu can ask its owning popover to close
  // (the popover's shouldReturnFocus restores focus to the parent trigger).
  onCloseRequest: (() => void) | undefined = undefined

  private _onThemeChange = (event: Event) => {
    const detail = (event as CustomEvent<{ themeName: ThemeName }>).detail
    if (detail?.themeName && themes[detail.themeName]) {
      this.themeName = detail.themeName
    }
  }

  override connectedCallback() {
    super.connectedCallback()
    window.addEventListener(
      'instui-theme-change',
      this._onThemeChange as EventListener
    )
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener(
      'instui-theme-change',
      this._onThemeChange as EventListener
    )
  }

  override willUpdate(changed: PropertyValues<this>) {
    if (changed.has('items')) {
      const itemSelected: Record<string, boolean> = {}
      const groupSelected: Record<string, MenuGroupSelection> = {}

      for (const node of this.items ?? []) {
        if (isSeparator(node)) continue
        if (isGroup(node)) {
          groupSelected[node.groupId] =
            node.selectedValues ??
            computeInitialGroupSelection(
              this._neutralGroupItems(node),
              node.allowMultiple,
              node.defaultSelected
            )
        } else if (node.type === 'checkbox' || node.type === 'radio') {
          itemSelected[node.id] = !!node.defaultSelected
        }
      }
      this._itemSelected = itemSelected
      this._groupSelected = groupSelected
    }
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  // Used by a parent menu when opening this menu as a flyout submenu, since the
  // owning popover's FocusRegion cannot reach focusable nodes inside this
  // element's shadow root.
  focusFirstItem = () => {
    const first = this._enabledItemIds[0]
    if (first) this._setHighlight(first)
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  override render() {
    const { menu, item, group } = this._resolveTokens()
    const tabbableId = this._highlightedId ?? this._enabledItemIds[0]

    return html`
      <style>
        :host {
          display: block;
        }
        .menu {
          box-sizing: border-box;
          min-width: ${menu.minWidth};
          max-width: ${menu.maxWidth};
          margin: 0;
          padding: 0.25rem 0;
          list-style: none;
          background: ${item.background};
          font-family: ${item.fontFamily};
          font-size: ${item.fontSize};
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 4px;
        }
        .groupLabel {
          display: block;
          padding: ${group.paddingVertical} ${group.paddingHorizontal};
          color: ${group.color};
          font-weight: ${group.fontWeight};
          font-size: ${group.fontSize};
        }
        .separator {
          height: 1px;
          margin: 0.25rem 0;
          background: rgba(0, 0, 0, 0.12);
          border: 0;
        }
        .menuItem {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          box-sizing: border-box;
          padding: ${item.paddingVertical} ${item.paddingHorizontal};
          background: transparent;
          border: 0;
          font: inherit;
          text-align: start;
          color: ${item.labelColor};
          cursor: pointer;
        }
        .menuItem[aria-disabled='true'] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .menuItem:hover:not([aria-disabled='true']),
        .menuItem:focus-visible {
          outline: none;
          background: ${item.highlightedBackground};
          color: ${item.highlightedLabelColor};
        }
        .menuItem[aria-checked='true'] {
          background: ${item.activeBackground};
          color: ${item.activeLabelColor};
        }
        .check {
          width: 1rem;
          flex-shrink: 0;
          display: inline-flex;
        }
        .check svg,
        .chevron svg {
          width: 1rem;
          height: 1rem;
          display: block;
        }
        .label {
          flex-grow: 1;
        }
        .chevron {
          margin-inline-start: auto;
          display: inline-flex;
        }
      </style>
      <ul
        class="menu"
        role="menu"
        aria-label=${this.label || nothing}
        @keydown=${this._handleKeyDown}
      >
        ${(this.items ?? []).map((node) => this._renderNode(node, tabbableId))}
      </ul>
    `
  }

  private _renderNode(node: MenuConfigNode, tabbableId?: string) {
    if (isSeparator(node)) {
      return html`<li role="separator" class="separator"></li>`
    }
    if (isGroup(node)) {
      const role = itemTypeForGroup(node.allowMultiple)
      return html`
        ${node.label
          ? html`<li class="groupLabel" role="presentation">${node.label}</li>`
          : nothing}
        ${node.items.map((it, i) =>
          this._renderItem(it, tabbableId, {
            role: role === 'checkbox' ? 'menuitemcheckbox' : 'menuitemradio',
            selected: !!this._groupSelected[node.groupId]?.includes(
              this._itemValue(it, i)
            ),
            groupId: node.groupId
          })
        )}
      `
    }
    if (node.items) return this._renderFlyoutItem(node, tabbableId)
    return this._renderItem(node, tabbableId, this._standaloneMeta(node))
  }

  private _renderFlyoutItem(item: MenuConfigItem, tabbableId?: string) {
    const isDisabled = !!item.disabled || this.disabled
    const tabindex = item.id === tabbableId && !isDisabled ? 0 : -1
    const expanded = this._activeSubmenuId === item.id

    return html`
      <li role="none">
        <instui-popover
          data-flyout-for=${item.id}
          placement="end top"
          offset-x="-5"
          offset-y="5"
          should-return-focus
          style="display: block;"
          @instui-popover-hide=${() => this._onFlyoutHide(item.id)}
        >
          <button
            slot="trigger"
            class="menuItem"
            type="button"
            role="menuitem"
            data-item-id=${item.id}
            tabindex=${tabindex}
            aria-haspopup="true"
            aria-expanded=${expanded ? 'true' : 'false'}
            aria-disabled=${isDisabled ? 'true' : nothing}
            @click=${() => {
              if (!isDisabled) this._toggleSubmenu(item.id)
            }}
            @mouseenter=${() => this._hoverItem(item.id, !isDisabled)}
          >
            <span class="label">${item.label}</span>
            <span class="chevron" aria-hidden="true">${chevronRightIcon}</span>
          </button>
          <instui-menu
            data-submenu-for=${item.id}
            theme-name=${this.themeName}
            .items=${item.items ?? []}
            @instui-menu-select=${(e: Event) => this._onSubmenuSelect(e)}
          ></instui-menu>
        </instui-popover>
      </li>
    `
  }

  private _standaloneMeta(item: MenuConfigItem) {
    if (item.items) return { role: 'menuitem', selected: false, flyout: true }
    if (item.type === 'checkbox') {
      return {
        role: 'menuitemcheckbox',
        selected: !!this._itemSelected[item.id]
      }
    }
    if (item.type === 'radio') {
      return { role: 'menuitemradio', selected: !!this._itemSelected[item.id] }
    }
    return { role: 'menuitem', selected: false }
  }

  private _renderItem(
    item: MenuConfigItem,
    tabbableId: string | undefined,
    meta: {
      role: string
      selected: boolean
      groupId?: string
      flyout?: boolean
    }
  ) {
    const isDisabled = !!item.disabled || this.disabled
    const selectable =
      meta.role === 'menuitemcheckbox' || meta.role === 'menuitemradio'
    const tabindex = item.id === tabbableId && !isDisabled ? 0 : -1

    return html`
      <li role="none">
        <button
          class="menuItem"
          type="button"
          role=${meta.role}
          data-item-id=${item.id}
          tabindex=${tabindex}
          aria-disabled=${isDisabled ? 'true' : nothing}
          aria-checked=${selectable ? String(meta.selected) : nothing}
          aria-haspopup=${meta.flyout ? 'true' : nothing}
          @click=${() => this._activate(item, meta)}
          @mouseenter=${() => this._hoverItem(item.id, false)}
        >
          ${selectable
            ? html`<span class="check" aria-hidden="true"
                >${meta.selected ? checkIcon : nothing}</span
              >`
            : nothing}
          <span class="label">${item.label}</span>
          ${meta.flyout
            ? html`<span class="chevron" aria-hidden="true"
                >${chevronRightIcon}</span
              >`
            : nothing}
        </button>
      </li>
    `
  }

  // -------------------------------------------------------------------------
  // Selection + activation
  // -------------------------------------------------------------------------

  private _activate(
    item: MenuConfigItem,
    meta: {
      role: string
      selected: boolean
      groupId?: string
      flyout?: boolean
    }
  ) {
    if (item.disabled || this.disabled) return

    if (meta.flyout) {
      this._openSubmenu(item.id)
      return
    }

    if (meta.groupId) {
      const node = this._findGroup(meta.groupId)!
      const value = this._itemValue(item, node.items.indexOf(item))
      const next = updateGroupSelection(
        this._groupSelected[meta.groupId] ?? [],
        value,
        !meta.selected,
        !!node.allowMultiple
      )
      this._groupSelected = { ...this._groupSelected, [meta.groupId]: next }
      this._dispatchSelect({
        value,
        selected: next.includes(value),
        groupId: meta.groupId
      })
    } else if (item.type === 'checkbox' || item.type === 'radio') {
      const selected = !this._itemSelected[item.id]
      this._itemSelected = { ...this._itemSelected, [item.id]: selected }
      this._dispatchSelect({ value: item.value ?? item.id, selected })
    } else {
      // plain button item
      this._dispatchSelect({ value: item.value ?? item.id, selected: true })
    }
  }

  // -------------------------------------------------------------------------
  // Keyboard — DOM-focus roving (mirrors React Menu.moveFocus)
  // -------------------------------------------------------------------------

  private _handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
        event.preventDefault()
        this._moveFocus(1)
        break
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault()
        this._moveFocus(-1)
        break
      case 'Home':
        event.preventDefault()
        this._setHighlight(this._enabledItemIds[0])
        break
      case 'End': {
        event.preventDefault()
        const ids = this._enabledItemIds
        this._setHighlight(ids[ids.length - 1])
        break
      }
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (this._highlightedId) this._activateById(this._highlightedId)
        break
      case 'ArrowRight':
        if (this._highlightedId && this._findFlyoutItem(this._highlightedId)) {
          event.preventDefault()
          this._openSubmenu(this._highlightedId)
        }
        break
      case 'ArrowLeft':
        // close this menu if it is itself a flyout submenu
        if (this.onCloseRequest) {
          event.preventDefault()
          this.onCloseRequest()
        }
        break
      default:
        break
    }
  }

  private _moveFocus(step: -1 | 1) {
    // navigating away closes any open submenu (mirrors React hideActiveSubMenu)
    this._closeActiveSubmenu()
    const ids = this._enabledItemIds
    const current = this._highlightedId ? ids.indexOf(this._highlightedId) : -1
    const next = nextFocusIndex(current, ids.length, step)
    if (next !== null) this._setHighlight(ids[next])
  }

  private _setHighlight(id: string | undefined) {
    if (!id) return
    this._highlightedId = id
    void this.updateComplete.then(() => {
      const el = this.renderRoot.querySelector(
        `[data-item-id="${CSS.escape(id)}"]`
      ) as HTMLElement | null
      el?.focus()
    })
  }

  // -------------------------------------------------------------------------
  // Derived data + helpers
  // -------------------------------------------------------------------------

  private get _enabledItemIds(): string[] {
    const ids: string[] = []
    for (const node of this.items ?? []) {
      if (isSeparator(node)) continue
      const list = isGroup(node) ? node.items : [node]
      for (const it of list) {
        if (!it.disabled && !this.disabled) ids.push(it.id)
      }
    }
    return ids
  }

  private _itemValue(item: MenuConfigItem, index: number): string | number {
    return item.value ?? item.id ?? index
  }

  private _neutralGroupItems(group: MenuConfigGroup): NeutralMenuItem[] {
    return group.items.map((it, i) => ({
      id: it.id,
      label: it.label,
      value: this._itemValue(it, i),
      defaultSelected: it.defaultSelected
    }))
  }

  private _findGroup(groupId: string): MenuConfigGroup | undefined {
    return (this.items ?? []).find(
      (n): n is MenuConfigGroup => isGroup(n) && n.groupId === groupId
    )
  }

  private _findItemById(
    id: string
  ):
    | {
        item: MenuConfigItem
        meta:
          | ReturnType<Menu['_standaloneMeta']>
          | { role: string; selected: boolean; groupId?: string }
      }
    | undefined {
    for (const node of this.items ?? []) {
      if (isSeparator(node)) continue
      if (isGroup(node)) {
        const idx = node.items.findIndex((it) => it.id === id)
        if (idx > -1) {
          const it = node.items[idx]
          const role = itemTypeForGroup(node.allowMultiple)
          return {
            item: it,
            meta: {
              role: role === 'checkbox' ? 'menuitemcheckbox' : 'menuitemradio',
              selected: !!this._groupSelected[node.groupId]?.includes(
                this._itemValue(it, idx)
              ),
              groupId: node.groupId
            }
          }
        }
      } else if (node.id === id) {
        return { item: node, meta: this._standaloneMeta(node) }
      }
    }
    return undefined
  }

  private _activateById(id: string) {
    const found = this._findItemById(id)
    if (found) this._activate(found.item, found.meta)
  }

  // -------------------------------------------------------------------------
  // Flyout submenus (nested <instui-popover> + <instui-menu>)
  // -------------------------------------------------------------------------

  private _hoverItem(id: string, isFlyout: boolean) {
    this._highlightedId = id
    if (isFlyout) this._openSubmenu(id)
    else this._closeActiveSubmenu()
  }

  private _toggleSubmenu(id: string) {
    if (this._activeSubmenuId === id) this._closeActiveSubmenu()
    else this._openSubmenu(id)
  }

  private _flyoutPopover(id: string):
    | (HTMLElement & {
        show?: () => void
        hide?: () => void
        updateComplete?: Promise<unknown>
      })
    | null {
    return this.renderRoot.querySelector(
      `[data-flyout-for="${CSS.escape(id)}"]`
    )
  }

  private _openSubmenu(id: string) {
    if (this._activeSubmenuId === id) return
    this._closeActiveSubmenu()

    const pop = this._flyoutPopover(id)
    if (!pop) return

    // grab the child menu reference BEFORE show() relocates it to the body portal
    const childMenu = pop.querySelector('instui-menu') as
      | (HTMLElement & {
          focusFirstItem?: () => void
          onCloseRequest?: () => void
        })
      | null
    if (childMenu) {
      childMenu.onCloseRequest = () => pop.hide?.()
    }

    pop.show?.()
    this._activeSubmenuId = id

    // the popover's FocusRegion can't reach the child menu's shadow items, so
    // the parent drives initial focus into the submenu after it has portaled
    if (childMenu) {
      pop.updateComplete?.then(() =>
        requestAnimationFrame(() => childMenu.focusFirstItem?.())
      )
    }
  }

  private _closeActiveSubmenu() {
    if (!this._activeSubmenuId) return
    this._flyoutPopover(this._activeSubmenuId)?.hide?.()
    this._activeSubmenuId = undefined
  }

  private _onFlyoutHide(id: string) {
    // popover closed (outside click / Escape / programmatic)
    if (this._activeSubmenuId === id) this._activeSubmenuId = undefined
  }

  private _onSubmenuSelect(event: Event) {
    const detail = (event as CustomEvent<MenuSelectDetail>).detail
    // re-dispatch from this (outer) menu so it reaches the consumer (the child
    // menu lives in a body portal, so its own event won't bubble back here)
    this._dispatchSelect(detail)
    this._closeActiveSubmenu()
  }

  private _findFlyoutItem(id: string): MenuConfigItem | undefined {
    for (const node of this.items ?? []) {
      if (isSeparator(node) || isGroup(node)) continue
      if (node.id === id && node.items) return node
    }
    return undefined
  }

  private _resolveTokens() {
    const theme = themes[this.themeName] ?? themes.defaultTheme
    const resolved = resolveTheme(theme.raw, {})
    const components = resolved.components as Record<
      string,
      Record<string, string>
    >
    const menu = components.Menu ?? {}
    const item = components.MenuItem ?? {}
    const group = components.MenuGroup ?? {}
    return {
      menu: {
        minWidth: menu.minWidth ?? '12rem',
        maxWidth: menu.maxWidth ?? '24rem'
      },
      item: {
        background: item.background ?? '#fff',
        labelColor: item.labelColor ?? '#2d3b45',
        activeBackground: item.activeBackground ?? '#0374b5',
        activeLabelColor: item.activeLabelColor ?? '#fff',
        highlightedBackground: item.highlightedBackground ?? '#f5f5f5',
        highlightedLabelColor: item.highlightedLabelColor ?? '#2d3b45',
        fontFamily: item.fontFamily ?? 'system-ui, sans-serif',
        fontSize: item.fontSize ?? '1rem',
        paddingVertical: item.paddingVertical ?? '0.5rem',
        paddingHorizontal: item.paddingHorizontal ?? '0.75rem'
      },
      group: {
        color: group.color ?? '#6b7780',
        fontWeight: String(group.fontWeight ?? 700),
        fontSize: group.fontSize ?? '0.875rem',
        paddingVertical: group.paddingVertical ?? '0.375rem',
        paddingHorizontal: group.paddingHorizontal ?? '0.75rem'
      }
    }
  }

  private _dispatchSelect(detail: MenuSelectDetail) {
    this.dispatchEvent(
      new CustomEvent<MenuSelectDetail>('instui-menu-select', {
        detail,
        bubbles: true,
        composed: true
      })
    )
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(MENU_TAG)) {
  customElements.define(MENU_TAG, Menu)
}
