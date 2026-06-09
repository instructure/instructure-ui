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

import generateStyle from '@drilldown/Drilldown/v2/styles'
import {
  computeInitialSelectionMap,
  reduceGroupSelection,
  selectedValuesInGroup,
  reduceGoToPage,
  reduceHighlight,
  previousPageId
} from '@drilldown/Drilldown/v2/behavior'
import type {
  DrilldownOptionValue,
  DrilldownSelectableType,
  NeutralPageData,
  SelectedGroupOptionsMap
} from '@drilldown/Drilldown/v2/types'

import {
  resolveTheme,
  themes,
  styleObjectToCss,
  type ThemeName
} from '../theme'
import { checkIcon, chevronLeftIcon, chevronRightIcon } from './icons'

// ---------------------------------------------------------------------------
// Declarative page config — the Lit adapter's producer of the framework-neutral
// NeutralPageData shape (the React adapter walks JSX children to produce the
// same thing). Groups without a `selectableType` are just navigation/link
// containers; selectable groups become radio (single) or checkbox (multiple).
// ---------------------------------------------------------------------------

export type DrilldownConfigOption = {
  id: string
  label: string
  value?: DrilldownOptionValue
  /** navigate to this page id when activated */
  subPageId?: string
  disabled?: boolean
  /** uncontrolled initial selection (selectable groups only) */
  defaultSelected?: boolean
}

export type DrilldownConfigGroup = {
  groupId: string
  groupTitle?: string
  selectableType?: DrilldownSelectableType
  /** controlled selection — wins over defaults */
  selectedOptions?: DrilldownOptionValue[]
  /** uncontrolled group-level defaults */
  defaultSelected?: DrilldownOptionValue[]
  options: DrilldownConfigOption[]
}

export type DrilldownConfigPage = {
  pageId: string
  title?: string
  groups: DrilldownConfigGroup[]
}

export type DrilldownSelectDetail = {
  value: DrilldownOptionValue | DrilldownOptionValue[]
  isSelected: boolean
  optionId: string
  groupId?: string
}

export type DrilldownPageChangeDetail = {
  prevPageId: string
  newPageId: string
  pageHistory: string[]
}

const DRILLDOWN_TAG = 'instui-drilldown'

export class Drilldown extends LitElement {
  static properties = {
    pages: { type: Array },
    rootPageId: { type: String, attribute: 'root-page-id' },
    label: { type: String },
    backButtonLabel: { type: String, attribute: 'back-button-label' },
    rotateFocus: { type: Boolean, attribute: 'rotate-focus' },
    disabled: { type: Boolean },
    themeName: { type: String, attribute: 'theme-name' },
    _activePageId: { state: true },
    _highlightedId: { state: true },
    _selectionMap: { state: true },
    _pageHistory: { state: true }
  }

  // Public, settable reactive props (defaults mirror the v2 React Drilldown).
  pages: DrilldownConfigPage[] = []
  rootPageId = ''
  label = ''
  backButtonLabel = 'Back'
  rotateFocus = true
  disabled = false
  themeName: ThemeName = 'defaultTheme'

  // Internal reactive state — same state machine the React Drilldown holds,
  // driven entirely by the shared behavior reducers.
  private _activePageId = ''
  private _highlightedId: string | undefined = undefined
  private _selectionMap: SelectedGroupOptionsMap = {}
  private _pageHistory: string[] = []

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
    // (Re)initialize the selection map + navigation when the page config or
    // root changes. Internal interaction-driven re-renders don't reassign
    // `pages`, so this won't clobber live selection state.
    if (changed.has('pages') || changed.has('rootPageId')) {
      const root = this.rootPageId || this.pages?.[0]?.pageId || ''
      this._activePageId = root
      this._pageHistory = root ? [root] : []
      this._highlightedId = undefined
      this._selectionMap = computeInitialSelectionMap(
        this._neutralPages(),
        (message) => console.error(message)
      )
    }
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  override render() {
    const componentTheme = this._resolveDrilldownTheme()
    const styleObj = generateStyle(componentTheme, undefined, {
      hasHighlightedOption: !!this._highlightedId
    }) as Record<string, unknown>
    const css = styleObjectToCss(styleObj)
    const headerActionColor =
      typeof styleObj.headerActionColor === 'string'
        ? styleObj.headerActionColor
        : 'inherit'

    const page = this._activePage
    if (!page) return html`<div></div>`

    const canGoBack = this._pageHistory.length > 1
    const activeIds = this._activeOptionIds
    // roving tabindex entry point: the highlighted option, else the first one
    const tabbableId = this._highlightedId ?? activeIds[0]

    return html`
      <style>
        :host {
          display: block;
          font-family: system-ui, sans-serif;
        }
        ${css} .drilldown {
          border-width: 1px;
          border-style: solid;
          box-sizing: border-box;
          min-width: 16rem;
          background: #fff;
        }
        .header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-bottom: 1px solid currentColor;
        }
        .headerBack {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: transparent;
          border: 0;
          font: inherit;
          cursor: pointer;
          padding: 0.25rem;
          color: ${headerActionColor};
        }
        .headerBack:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
        .headerBack svg,
        .check svg,
        .chevron svg {
          width: 1rem;
          height: 1rem;
          display: block;
        }
        .groupTitle {
          padding: 0.375rem 0.75rem 0.25rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          opacity: 0.65;
        }
        .option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          box-sizing: border-box;
          padding: 0.5rem 0.75rem;
          background: transparent;
          border: 0;
          font: inherit;
          text-align: start;
          color: inherit;
          cursor: pointer;
        }
        .option[aria-disabled='true'] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .option:hover:not([aria-disabled='true']) {
          background: rgba(0, 0, 0, 0.06);
        }
        .option:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: -2px;
        }
        .check {
          width: 1rem;
          flex-shrink: 0;
          display: inline-flex;
        }
        .label {
          flex-grow: 1;
        }
        .chevron {
          margin-inline-start: auto;
          display: inline-flex;
        }
      </style>
      <div
        class="drilldown"
        role="menu"
        aria-label=${this.label || page.title || nothing}
        @keydown=${this._handleKeyDown}
      >
        ${canGoBack || page.title
          ? html`
              <div class="header">
                ${canGoBack
                  ? html`
                      <button
                        class="headerBack"
                        type="button"
                        @click=${this._goToPreviousPage}
                      >
                        <span class="chevron" aria-hidden="true"
                          >${chevronLeftIcon}</span
                        >
                        <span>${this.backButtonLabel}</span>
                      </button>
                    `
                  : nothing}
                ${page.title
                  ? html`<span class="headerTitle">${page.title}</span>`
                  : nothing}
              </div>
            `
          : nothing}
        <div class="container">
          ${(page.groups ?? []).map((group) =>
            this._renderGroup(group, tabbableId)
          )}
        </div>
      </div>
    `
  }

  private _renderGroup(group: DrilldownConfigGroup, tabbableId?: string) {
    return html`
      ${group.groupTitle
        ? html`<div class="groupTitle" role="presentation">
            ${group.groupTitle}
          </div>`
        : nothing}
      ${(group.options ?? []).map((option) =>
        this._renderOption(group, option, tabbableId)
      )}
    `
  }

  private _renderOption(
    group: DrilldownConfigGroup,
    option: DrilldownConfigOption,
    tabbableId?: string
  ) {
    const selectable = !!group.selectableType
    const isSelected = selectable
      ? !!this._selectionMap[group.groupId]?.has(option.id)
      : false
    const isDisabled = !!option.disabled || this.disabled
    const role = selectable
      ? group.selectableType === 'single'
        ? 'menuitemradio'
        : 'menuitemcheckbox'
      : 'menuitem'
    const tabindex = option.id === tabbableId && !isDisabled ? 0 : -1

    return html`
      <button
        class="option"
        type="button"
        role=${role}
        data-option-id=${option.id}
        tabindex=${tabindex}
        aria-disabled=${isDisabled ? 'true' : nothing}
        aria-checked=${selectable ? String(isSelected) : nothing}
        @click=${() => this._onOptionClick(option)}
      >
        ${selectable
          ? html`<span class="check" aria-hidden="true"
              >${isSelected ? checkIcon : nothing}</span
            >`
          : nothing}
        <span class="label">${option.label}</span>
        ${option.subPageId
          ? html`<span class="chevron" aria-hidden="true"
              >${chevronRightIcon}</span
            >`
          : nothing}
      </button>
    `
  }

  // -------------------------------------------------------------------------
  // Behavior wiring — every state transition routes through the shared,
  // framework-neutral reducers in @drilldown/Drilldown/v2/behavior.
  // -------------------------------------------------------------------------

  private _onOptionClick(option: DrilldownConfigOption) {
    if (option.disabled || this.disabled) return
    this._highlightedId = option.id
    this._activateOption(option.id)
  }

  private _activateOption(optionId: string) {
    const found = this._findOption(optionId)
    if (!found) return
    const { group, option } = found
    if (option.disabled || this.disabled) return

    if (option.subPageId) {
      this._goToPage(option.subPageId)
      return
    }

    if (group.selectableType) {
      this._selectionMap = reduceGroupSelection(this._selectionMap, {
        groupId: group.groupId,
        optionId: option.id,
        value: option.value,
        selectableType: group.selectableType
      })
      const values = selectedValuesInGroup(this._selectionMap, group.groupId)
      this._dispatchSelect({
        value: values,
        isSelected: values.includes(option.value),
        optionId: option.id,
        groupId: group.groupId
      })
    } else {
      this._dispatchSelect({
        value: option.value,
        isSelected: true,
        optionId: option.id
      })
    }
  }

  private _goToPage = (newPageId: string) => {
    const result = reduceGoToPage(
      [...this._pageHistory],
      newPageId,
      this.pages.some((page) => page.pageId === newPageId)
    )

    if ('warning' in result) {
      console.warn(result.warning)
      return
    }

    this._pageHistory = result.history
    this._activePageId = result.newPageId
    this._highlightedId = undefined
    this._dispatchPageChange(result.prevPageId, result.newPageId)
  }

  private _goToPreviousPage = () => {
    const prev = previousPageId(this._pageHistory)
    if (prev) this._goToPage(prev)
  }

  // -------------------------------------------------------------------------
  // Keyboard — native keydown mapped onto the shared highlight reducer. The
  // React adapter delegates this to <Selectable>; both share reduceHighlight.
  // -------------------------------------------------------------------------

  private _handleKeyDown = (event: KeyboardEvent) => {
    const ids = this._activeOptionIds

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        this._moveHighlight(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        this._moveHighlight(-1)
        break
      case 'Home':
        event.preventDefault()
        this._setHighlight(ids[0])
        break
      case 'End':
        event.preventDefault()
        this._setHighlight(ids[ids.length - 1])
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (this._highlightedId) this._activateOption(this._highlightedId)
        break
      case 'ArrowRight': {
        const found = this._findOption(this._highlightedId)
        if (found?.option.subPageId) {
          event.preventDefault()
          this._goToPage(found.option.subPageId)
        }
        break
      }
      case 'ArrowLeft':
        event.preventDefault()
        this._goToPreviousPage()
        break
      default:
        break
    }
  }

  private _moveHighlight(direction: -1 | 1) {
    const next = reduceHighlight({
      activeOptionIds: this._activeOptionIds,
      highlightedOptionId: this._highlightedId,
      direction,
      rotateFocus: this.rotateFocus
    })
    this._setHighlight(next)
  }

  private _setHighlight(id: string | undefined) {
    if (!id) return
    this._highlightedId = id
    // focus must happen after the roving tabindex re-renders
    void this.updateComplete.then(() => {
      const el = this.renderRoot.querySelector(
        `[data-option-id="${CSS.escape(id)}"]`
      ) as HTMLElement | null
      el?.focus()
    })
  }

  // -------------------------------------------------------------------------
  // Derived data + helpers
  // -------------------------------------------------------------------------

  // The React-children -> plain-data boundary, Lit edition: maps the
  // declarative `pages` config into the framework-neutral NeutralPageData[].
  private _neutralPages(): NeutralPageData[] {
    return (this.pages ?? []).map((page) => ({
      pageId: page.pageId,
      groups: (page.groups ?? []).map((group) => ({
        groupId: group.groupId,
        selectableType: group.selectableType,
        selectedOptions: group.selectedOptions,
        defaultSelected: group.defaultSelected,
        options: (group.options ?? []).map((option) => ({
          optionId: option.id,
          value: option.value,
          defaultSelected: option.defaultSelected
        }))
      }))
    }))
  }

  private get _activePage(): DrilldownConfigPage | undefined {
    return (this.pages ?? []).find((page) => page.pageId === this._activePageId)
  }

  private get _activeOptionIds(): string[] {
    const ids: string[] = []
    for (const group of this._activePage?.groups ?? []) {
      for (const option of group.options ?? []) {
        if (!option.disabled && !this.disabled) ids.push(option.id)
      }
    }
    return ids
  }

  private _findOption(
    optionId: string | undefined
  ):
    | { group: DrilldownConfigGroup; option: DrilldownConfigOption }
    | undefined {
    if (!optionId) return undefined
    for (const group of this._activePage?.groups ?? []) {
      const option = (group.options ?? []).find((o) => o.id === optionId)
      if (option) return { group, option }
    }
    return undefined
  }

  private _resolveDrilldownTheme() {
    const theme = themes[this.themeName] ?? themes.defaultTheme
    const resolved = resolveTheme(theme.raw, {})
    return resolved.components.Drilldown as Parameters<typeof generateStyle>[0]
  }

  private _dispatchSelect(detail: DrilldownSelectDetail) {
    this.dispatchEvent(
      new CustomEvent<DrilldownSelectDetail>('instui-drilldown-select', {
        detail,
        bubbles: true,
        composed: true
      })
    )
  }

  private _dispatchPageChange(prevPageId: string, newPageId: string) {
    this.dispatchEvent(
      new CustomEvent<DrilldownPageChangeDetail>(
        'instui-drilldown-page-change',
        {
          detail: {
            prevPageId,
            newPageId,
            pageHistory: [...this._pageHistory]
          },
          bubbles: true,
          composed: true
        }
      )
    )
  }
}

if (
  typeof customElements !== 'undefined' &&
  !customElements.get(DRILLDOWN_TAG)
) {
  customElements.define(DRILLDOWN_TAG, Drilldown)
}
