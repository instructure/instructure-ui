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

// TODO: optimize code

// TODO: add all necessary eventHandlers

// TODO: controlled select? need it?
// Edit: Since only groups have selections, and the defaultSelected can be set, I think we shouldn't add this feature, just if someone requests it later

// TODO: history management
// Edit: for now the pageHistory and the nav methods are exposed on the onToggle and onOptionClick methods - is it enough?

// TODO: ARIA tags and roles - menu? combobox? both?
// Info:
// It's a big topic, we need an a11y person for it
//  - option aria role (option? menuitem? menuitemcheckbox? menuitemradio?)
//  - is it an option in a listbox (Selectable) or Menu with menuitems? settable?
//  - hidden input for a11y? role="combobox" might be need it
//  - does the trigger need the selectable trigger props/hidden input/nothing?

// TODO: rotate focus on drilldown options (when using up-down arrows)
// Edit: I made it settable with a props, but let's decide whether we should make it be the default and not settable?

// TODO: `href` prop on option?
// Edit: Is it needed? Probably nice if the drilldown acts like a Menu.
// Problem: It cannot be done atm, the Options component overrides the Options.Item's as prop, probably a bug, needs to be fixed first.
// Question: Is it going to work with the roles and etc? a11y needs to be checked too.

// TODO: `controls` props on option?
// Menu.Items have it, do we need it?

// TODO: BUG? - hovering through can scroll to bottom
// Info: hovering through a scrollable list and moving muse in-and-out at the bottom sometimes make it scroll to the bottom
// Edit: could reproduce in Select too

/** @jsx jsx */
/** @jsxFrag React.Fragment */
import React, { Component, ReactElement } from 'react'

import { warn, error } from '@instructure/console'
import { testable } from '@instructure/ui-testable'
import { contains, containsActiveElement } from '@instructure/ui-dom-utils'
import {
  callRenderProp,
  matchComponentTypes,
  omitProps,
  safeCloneElement,
  withDeterministicId
} from '@instructure/ui-react-utils'

import { View } from '@instructure/ui-view'
import { Options, optionsThemeKeys } from '@instructure/ui-options'
import type {
  OptionsProps,
  OptionsItemProps,
  OptionsSeparatorProps
} from '@instructure/ui-options'
import { Popover } from '@instructure/ui-popover'
import { Selectable } from '@instructure/ui-selectable'
import type { SelectableRender } from '@instructure/ui-selectable'
import type { OptionsTheme } from '@instructure/shared-types'
import {
  IconArrowOpenStartSolid,
  IconArrowOpenEndSolid,
  IconCheckSolid
} from '@instructure/ui-icons'

import { withStyle, jsx } from '@instructure/emotion'

import { DrilldownOption } from './DrilldownOption'
import { DrilldownSeparator } from './DrilldownSeparator'
import { DrilldownGroup } from './DrilldownGroup'
import { DrilldownPage } from './DrilldownPage'
import type { DrilldownPageProps, PageChildren } from './DrilldownPage/props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'

import type { DrilldownOptionValue } from './DrilldownOption/props'
import type {
  DrilldownProps,
  DrilldownStyleProps,
  DrilldownState,
  PageChild,
  OptionChild,
  GroupChild,
  SeparatorChild
} from './props'
import { DrilldownGroupProps } from './DrilldownGroup/props'

// Additional data we need to track on the Options,
// but shouldn't be settable via props
type OptionData = {
  groupProps?: DrilldownGroupProps
}

// Contains the Option ComponentElement and the extra data we need track on it,
// but don't want to expose as props
type MappedOption = OptionChild & OptionData

// Contains the props object of the Page
// with the `children` transformed into an array
type MappedPage = DrilldownPageProps & {
  children: PageChildren[]
}

// An object with the mapped Pages with their id as keys
type PageMap = Record<string, MappedPage>

// A Map width the selected options in a group, with the id as key and their value
type SelectedGroupOptionsMap = Map<string, DrilldownOptionValue>

/**
---
category: components/WIP
---
@tsProps
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Drilldown extends Component<DrilldownProps, DrilldownState> {
  static readonly componentId = 'Drilldown'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    disabled: false,
    rotateFocus: true,
    overflowX: 'auto',
    overflowY: 'auto',
    placement: 'bottom center',
    defaultShow: false,
    shouldHideOnSelect: true,
    shouldFocusTriggerOnClose: true,
    shouldContainFocus: true,
    shouldReturnFocus: true,
    withArrow: true,
    offsetX: 0,
    offsetY: 0
  }

  static Group = DrilldownGroup
  static Option = DrilldownOption
  static Page = DrilldownPage
  static Separator = DrilldownSeparator

  private _drilldownRef: HTMLDivElement | null = null
  private _popover: Popover | null = null
  private _trigger: (React.ReactInstance & { focus?: () => void }) | null = null
  private _containerElement: HTMLDivElement | null = null

  readonly _id: string
  readonly _labelId: string
  readonly _headerBackId: string
  readonly _headerTitleId: string
  readonly _headerActionId: string

  // Array of visited page ids in "breadcrumbs" fashion
  private readonly _pageHistory: string[]

  // Map of the active options on the page (includes header options too)
  _activeOptionsMap: {
    [optionId: string]: MappedOption
  } = {}

  // Map of the selected options in groups (grouped by group id)
  _selectedGroupOptionsMap: {
    [groupId: string]: SelectedGroupOptionsMap
  } = {}

  ref: HTMLDivElement | Element | null = null

  handleRef = (el: Element | null) => {
    const { drilldownRef } = this.props

    this._drilldownRef = el as HTMLDivElement

    // if a trigger is provided, the Popover sets the ref
    if (!this.props.trigger) {
      this.ref = el as HTMLDivElement
    }

    if (typeof drilldownRef === 'function') {
      drilldownRef(el as HTMLDivElement)
    }
  }

  constructor(props: DrilldownProps) {
    super(props)

    this.state = {
      isShowingPopover: props.trigger ? !!props.show : false,
      activePageId: props.rootPageId,
      highlightedOptionId: undefined,
      lastSelectedId: undefined
    }

    this._pageHistory = [props.rootPageId]

    this.setDefaultSelected()

    this._id = props.id || props.deterministicId!()
    this._labelId = props.deterministicId!('Drilldown-label')
    this._headerBackId = props.deterministicId!('DrilldownHeader-Back')
    this._headerTitleId = props.deterministicId!('DrilldownHeader-Title')
    this._headerActionId = props.deterministicId!('DrilldownHeader-Action')
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentDidUpdate(_prevProps: DrilldownProps, prevState: DrilldownState) {
    this.props.makeStyles?.(this.makeStylesVariables)

    if (prevState.activePageId !== this.state.activePageId) {
      // on page change with mouse navigation, some option can get rendered
      // under the cursor and get focused, so we need to wait a tick to see
      // if anything gets focused, otherwise we focus the whole drilldown
      setTimeout(() => {
        if (!this.focused()) {
          this.focus()
        }
      }, 0)
    }

    // if the current page was removed
    if (!this.currentPage) {
      if (this.previousPage) {
        this.goToPreviousPage()
      } else {
        this.goToPage(this.props.rootPageId)
      }
    }

    if (
      this.state.highlightedOptionId &&
      !this.getPageChildById(this.state.highlightedOptionId)
    ) {
      this.setState({
        highlightedOptionId: undefined
      })
    }
  }

  // filters Drilldown's themeOverride object
  // and returns the themeOverride for the underlying Options component
  get optionsThemeOverride() {
    const { themeOverride = {} } = this.props
    const optionsThemeOverride: Partial<OptionsTheme> = {}

    if (typeof themeOverride == 'function') {
      // we cannot filter the override function
      return themeOverride
    }

    optionsThemeKeys.forEach((key) => {
      if (themeOverride[key]) {
        optionsThemeOverride[key] = themeOverride[key] as any
      }
    })

    return optionsThemeOverride
  }

  get makeStylesVariables(): DrilldownStyleProps {
    return {
      hasHighlightedOption: !!this.state.highlightedOptionId
    }
  }

  get activeOptionIds() {
    return Object.keys(this._activeOptionsMap)
  }

  get activeOptions() {
    return Object.values(this._activeOptionsMap)
  }

  get pages(): PageChild[] {
    const { children } = this.props
    return React.Children.toArray(children || []) as PageChild[]
  }

  get pageMap(): PageMap | undefined {
    const { children } = this.props

    if (!children) {
      return undefined
    }

    const map: PageMap | undefined = {}

    this.pages.forEach((page) => {
      const { props } = page
      const { children } = props

      map[props.id] = {
        ...props,
        children: React.Children.toArray(children || []) as PageChildren[]
      }
    })

    return map
  }

  get currentPage(): MappedPage | undefined {
    return this.getPageById(this.state.activePageId)
  }

  get previousPage(): MappedPage | undefined {
    const previousPageId = this._pageHistory[this._pageHistory.length - 2]
    return this.getPageById(previousPageId)
  }

  // Returns the navigation methods and the page history.
  // These are used in some callbacks to expose the navigation logic.
  get exposedNavigationProps() {
    const { goToPage, goToPreviousPage } = this

    // TODO: make an example for onToggle/onOptionClick navigation (how to use goToPage etc.)

    // we make a copy of the array so the original history
    // cannot be modified from the outside
    const pageHistory = [...this._pageHistory]

    return {
      pageHistory,
      goToPage,
      goToPreviousPage
    }
  }

  getPageById(id?: string): MappedPage | undefined {
    return this.pageMap && id ? this.pageMap[id] : undefined
  }

  getPageChildById(id?: string) {
    return id ? this._activeOptionsMap[id] : undefined
  }

  setDefaultSelected() {
    this.pages.forEach((page) => {
      const { children } = page.props
      let childrenArray: PageChildren[] = []

      if (children) {
        childrenArray = Array.isArray(children) ? children : [children]
      }

      childrenArray.forEach((child) => {
        if (matchComponentTypes<GroupChild>(child, [DrilldownGroup])) {
          const {
            id: groupId,
            selectableType,
            defaultSelected: groupDefaultSelected = [],
            children: groupChildren
          } = child.props

          if (!selectableType) {
            return
          }

          this._selectedGroupOptionsMap[groupId] = new Map()

          groupChildren?.forEach((groupChild) => {
            if (
              matchComponentTypes<OptionChild>(groupChild, [DrilldownOption])
            ) {
              const {
                id: optionId,
                value: optionValue,
                defaultSelected: optionDefaultSelected
              } = groupChild.props

              const isGroupDefaultSelected =
                typeof optionValue !== 'undefined' &&
                groupDefaultSelected
                  .filter((value) => typeof value !== 'undefined')
                  .includes(optionValue)

              if (optionDefaultSelected || isGroupDefaultSelected) {
                this._selectedGroupOptionsMap[groupId].set(
                  optionId,
                  optionValue
                )
              }
            }
          })
        }
      })
    })
  }

  get selectedGroupOptionIdsArray() {
    return Object.values(this._selectedGroupOptionsMap)
      .map((groupIdMap) => Array.from(groupIdMap.keys()))
      .flat()
  }

  get headerChildren() {
    const { currentPage } = this
    const { styles, deterministicId } = this.props

    const headerChildren: PageChildren[] = []

    if (!currentPage) {
      return headerChildren
    }

    const {
      children,
      renderBackButtonLabel,
      renderTitle,
      renderActionLabel,
      onHeaderActionClicked,
      withoutHeaderSeparator
    } = currentPage

    // Back navigation option
    if (this.previousPage) {
      const prevPageTitle = callRenderProp(this.previousPage.renderTitle)

      const backButtonLabel: React.ReactNode = callRenderProp(
        renderBackButtonLabel,
        prevPageTitle
      )

      headerChildren.push(
        <DrilldownOption
          id={this._headerBackId}
          onOptionClick={this.handleBackButtonClick}
        >
          <div css={styles?.headerBack}>{backButtonLabel}</div>
        </DrilldownOption>
      )
    }

    // Header title
    if (renderTitle) {
      const title = callRenderProp(renderTitle)

      if (title) {
        headerChildren.push(
          <DrilldownOption id={this._headerTitleId}>
            <div css={styles?.headerTitle}>{title}</div>
          </DrilldownOption>
        )
      }
    }

    // Action label
    if (renderActionLabel) {
      const actionLabel = callRenderProp(renderActionLabel)

      if (actionLabel) {
        headerChildren.push(
          <DrilldownOption
            id={this._headerActionId}
            themeOverride={{ color: styles?.headerActionColor }}
            onOptionClick={(event) => {
              if (typeof onHeaderActionClicked === 'function') {
                onHeaderActionClicked(event)
              }
            }}
          >
            {actionLabel}
          </DrilldownOption>
        )
      }
    }

    // header separator
    if (
      headerChildren.length > 0 &&
      children.length > 0 &&
      !withoutHeaderSeparator
    ) {
      headerChildren.push(
        <DrilldownSeparator
          id={deterministicId!('DrilldownHeader-Separator')}
        />
      )
    }

    return headerChildren
  }

  get shown() {
    return this.props.trigger ? this.state.isShowingPopover : true
  }

  show = (event: React.SyntheticEvent) => {
    if (this._popover) {
      this._popover.show(event as React.UIEvent | React.FocusEvent)
      this.setState({ isShowingPopover: true })
    }
  }

  hide = (event: React.SyntheticEvent) => {
    if (this._popover) {
      this._popover.hide(event as React.UIEvent | React.FocusEvent)
      this.setState({ isShowingPopover: false })
      this.reset()
    }
  }

  reset() {
    this._activeOptionsMap = {}
    this.setState({ highlightedOptionId: undefined })
  }

  public focus() {
    if (this.shown) {
      error(
        !!this._drilldownRef?.focus,
        '[Drilldown] Could not focus the drilldown.'
      )
      this._drilldownRef?.focus()
    } else {
      error(!!this._trigger?.focus, '[Drilldown] Could not focus the trigger.')
      this._trigger!.focus!()
    }
  }

  public focused() {
    if (this.shown) {
      return containsActiveElement(this._drilldownRef)
    } else {
      return containsActiveElement(this._trigger)
    }
  }

  focusOption(id: string) {
    const container = this._containerElement

    const optionElement = container?.querySelector(
      `[id="${id}"]`
    ) as HTMLSpanElement

    optionElement?.focus()
  }

  handleOptionHighlight = (
    _event: React.SyntheticEvent,
    { id, direction }: { id?: string; direction?: -1 | 1 }
  ) => {
    const { rotateFocus } = this.props
    const { highlightedOptionId } = this.state

    // if id exists, use that, or calculate from direction
    let highlightId = this.getPageChildById(id) ? id : undefined

    if (!highlightId) {
      if (!highlightedOptionId) {
        // nothing highlighted yet, highlight first option
        highlightId = this.activeOptionIds[0]
      } else if (direction) {
        // if it has direction, find next id based on it
        const index = this.activeOptionIds.indexOf(highlightedOptionId)
        const newIndex = index + direction

        highlightId = index > -1 ? this.activeOptionIds[newIndex] : undefined

        if (rotateFocus) {
          const lastOptionsIndex = this.activeOptionIds.length - 1

          if (newIndex < 0) {
            highlightId = this.activeOptionIds[lastOptionsIndex]
          }
          if (newIndex > lastOptionsIndex) {
            highlightId = this.activeOptionIds[0]
          }
        }
      }
    }

    if (highlightId) {
      // only highlight if id exists as a valid option
      this.setState({ highlightedOptionId: highlightId }, () => {
        this.focusOption(highlightId!)
      })
    }
  }

  // Navigates to the page and also returns the new and old pageIds
  public goToPage = (newPageId: string) => {
    if (!newPageId) {
      warn(false, `Cannot go to page because there was no page id provided.`)
      return undefined
    }

    if (!this.pageMap?.[newPageId]) {
      warn(
        false,
        `Cannot go to page because page with id: "${newPageId}" doesn't exist.`
      )
      return undefined
    }

    // the last page id in the history is the current one,
    // it will become the "prevPage"
    const prevPageId = this._pageHistory[this._pageHistory.length - 1]
    const idxInHistory = this._pageHistory.indexOf(newPageId)

    if (idxInHistory < 0) {
      // if it is not in the page history, we have to add it
      this._pageHistory.push(newPageId)
    } else {
      // if it was already in the history, we go back to that page,
      // and clear the rest from the history
      this._pageHistory.splice(idxInHistory + 1, this._pageHistory.length - 1)
    }

    this.setState({
      activePageId: newPageId,
      highlightedOptionId: undefined
    })

    return { prevPageId, newPageId }
  }

  public goToPreviousPage = () => {
    if (!this.previousPage) {
      warn(
        false,
        `There is no previous page to go to. The current page history is: ${this._pageHistory}.`
      )
      return undefined
    }

    // If there is a previous page, goToPage will succeed and return the data
    const { newPageId, prevPageId } = this.goToPage(this.previousPage.id)!
    return { newPageId, prevPageId }
  }

  handleBackButtonClick = () => {
    const { onBackButtonClicked } = this.currentPage!

    // we only display the back button when there is a page to go back to
    const { newPageId, prevPageId } = this.goToPreviousPage()!

    if (typeof onBackButtonClicked === 'function') {
      onBackButtonClicked(newPageId, prevPageId)
    }
  }

  handleGroupOptionSelected(
    event: React.SyntheticEvent,
    selectedOption: MappedOption
  ) {
    const { id: optionId, value } = selectedOption.props
    const {
      id: groupId,
      selectableType,
      onSelect: groupOnSelect
    } = selectedOption.groupProps!

    const { onSelect } = this.props

    if (this._selectedGroupOptionsMap[groupId].has(optionId)) {
      // toggle off, if already selected
      this._selectedGroupOptionsMap[groupId].delete(optionId)
    } else {
      if (selectableType === 'multiple') {
        // "checkbox"
        this._selectedGroupOptionsMap[groupId].set(optionId, value)
      } else if (selectableType === 'single') {
        // "radio"
        this._selectedGroupOptionsMap[groupId] = new Map()
        this._selectedGroupOptionsMap[groupId].set(optionId, value)
      }
    }

    // needed for rerender
    this.setState({ lastSelectedId: optionId })

    const { groupProps, ...option } = selectedOption
    const selectedOptionValuesInGroup = Array.from(
      this._selectedGroupOptionsMap[groupId].values()
    )

    if (typeof groupOnSelect === 'function') {
      groupOnSelect(
        event,
        selectedOptionValuesInGroup,
        this._selectedGroupOptionsMap[groupId].has(optionId),
        option
      )
    }

    if (typeof onSelect === 'function') {
      onSelect(
        event,
        selectedOptionValuesInGroup,
        this._selectedGroupOptionsMap[groupId].has(optionId),
        option
      )
    }
  }

  handleOptionSelect = (
    event: React.SyntheticEvent,
    { id }: { id?: string }
  ) => {
    const selectedOption = this.getPageChildById(id)

    if (!id || !selectedOption) {
      return
    }

    const { shouldHideOnSelect, onSelect } = this.props

    const { groupProps, ...selectedOptionChild } = selectedOption
    const { subPageId, value, onOptionClick } = selectedOptionChild.props

    if (typeof onOptionClick === 'function') {
      onOptionClick(event, {
        optionId: id,
        ...this.exposedNavigationProps
      })
    }

    if (subPageId) {
      this.goToPage(subPageId)
    }

    if (groupProps?.selectableType) {
      this.handleGroupOptionSelected(event, selectedOption)
    } else {
      if (typeof onSelect === 'function') {
        onSelect(event, value, true, selectedOptionChild)
      }
    }

    if (shouldHideOnSelect && !subPageId && id !== this._headerBackId) {
      this.hide(event as React.UIEvent)
    }
  }

  handleToggle = (event: React.UIEvent | React.FocusEvent, shown: boolean) => {
    const { onToggle } = this.props

    this.setState({ isShowingPopover: shown })

    if (typeof onToggle === 'function') {
      onToggle(event, {
        shown,
        drilldown: this,
        ...this.exposedNavigationProps
      })
    }
  }

  renderList(
    getOptionProps: SelectableRender['getOptionProps'],
    getDisabledOptionProps: SelectableRender['getDisabledOptionProps']
  ) {
    const { currentPage, headerChildren } = this

    if (!currentPage) {
      return null
    }

    const pageChildren: PageChildren[] = [
      ...headerChildren,
      ...currentPage.children
    ]

    // for tracking if the last item was a Separator or not
    let lastItemWasSeparator = false

    return pageChildren.map((child, index) => {
      /**
       * --- RENDER GROUP ---
       */
      if (matchComponentTypes<GroupChild>(child, [DrilldownGroup])) {
        const isFirstChild = index === 0
        const isLastChild = index === currentPage?.children.length - 1
        const afterSeparator = lastItemWasSeparator

        const needsFirstSeparator =
          !child.props.withoutSeparators && !isFirstChild && !afterSeparator
        const needsLastSeparator =
          !child.props.withoutSeparators && !isLastChild

        lastItemWasSeparator = needsLastSeparator

        return this.renderGroup(
          child,
          getOptionProps,
          getDisabledOptionProps,
          // for rendering separators appropriately
          needsFirstSeparator,
          needsLastSeparator
        )

        /**
         * --- RENDER SEPARATOR ---
         */
      } else if (
        matchComponentTypes<SeparatorChild>(child, [DrilldownSeparator])
      ) {
        // if the last item was separator, we don't want to duplicate it
        if (lastItemWasSeparator) {
          return null
        }
        lastItemWasSeparator = true
        return this.renderSeparator(child)

        /**
         * --- RENDER OPTION ---
         */
      } else {
        lastItemWasSeparator = false
        return this.renderOption(child, getOptionProps, getDisabledOptionProps)
      }
    })
  }

  renderSeparator(separator: SeparatorChild) {
    const { id, themeOverride, ...props } = separator.props
    return (
      <Options.Separator
        id={id}
        key={id}
        {...props}
        // we pass the themeOverride to Options.Separator
        themeOverride={themeOverride}
      />
    )
  }

  renderOption(
    option: OptionChild,
    getOptionProps: SelectableRender['getOptionProps'],
    getDisabledOptionProps: SelectableRender['getDisabledOptionProps'],
    groupProps?: DrilldownGroupProps
  ) {
    const { styles } = this.props
    let isSelected = false

    const {
      id,
      children,
      as,
      role,
      subPageId,
      disabled,
      renderLabelInfo,
      renderBeforeLabel,
      renderAfterLabel,
      beforeLabelContentVAlign,
      afterLabelContentVAlign,
      description,
      descriptionRole,
      elementRef,
      themeOverride
    } = option.props

    if (this.getPageChildById(id)) {
      warn(
        false,
        `Duplicate id: "${id}"! Make sure all options have unique ids, otherwise they won't be rendered.`
      )
      return null
    }

    // Props passed to the Option.Item
    let optionProps: Partial<OptionsItemProps> = {
      // passthrough props
      ...omitProps(option.props, [
        ...DrilldownOption.allowedProps,
        ...Options.Item.allowedProps
      ]),
      // props from selectable
      ...getOptionProps({ id }),
      // we pass the themeOverride to Options.Item
      themeOverride,
      // directly passed props
      renderBeforeLabel,
      renderAfterLabel,
      beforeLabelContentVAlign,
      afterLabelContentVAlign,
      description,
      descriptionRole,
      as,
      role,
      elementRef,
      variant: 'default',
      tabIndex: -1
    }

    // extra data we need track on the option,
    // but don't want to expose as props
    const optionData: OptionData = {
      groupProps: groupProps
    }

    const isOptionDisabled =
      id !== this._headerBackId && // Back nav is never disabled
      (this.props.disabled ||
        this.currentPage?.disabled ||
        groupProps?.disabled ||
        disabled)

    // display option as disabled
    if (isOptionDisabled) {
      optionProps.variant = 'disabled'
      optionProps = { ...optionProps, ...getDisabledOptionProps() }
    }

    // track as valid active option if not disabled and not the title
    if (!isOptionDisabled && id !== this._headerTitleId) {
      this._activeOptionsMap[id] = { ...option, ...optionData }
    }

    // BEFORE/AFTER elements:
    // we set a few manually on Options.Item,
    // the rest are passed directly
    if (subPageId) {
      optionProps.renderAfterLabel = <IconArrowOpenEndSolid />
      warn(
        !renderAfterLabel,
        `The prop "renderAfterLabel" is reserved on item with id: "${id}". When it has "subPageId" provided, a navigation arrow will render after the label.`
      )
    }
    if (id === this._headerBackId) {
      optionProps.renderBeforeLabel = <IconArrowOpenStartSolid />
    }
    if (groupProps?.selectableType) {
      isSelected = this._selectedGroupOptionsMap[groupProps.id].has(id)
      optionProps.renderBeforeLabel = (
        <IconCheckSolid
          style={{
            opacity: isSelected ? 1 : 0
          }}
        />
      )
      warn(
        !renderBeforeLabel,
        `The prop "renderBeforeLabel" is reserved on item with id: "${id}". When this option is a selectable member of a Drilldown.Group, selection indicator will render before the label.`
      )
    }

    // display option as highlighted
    if (id === this.state.highlightedOptionId) {
      optionProps.variant = 'highlighted'
    }

    const optionLabel = callRenderProp(children, {
      id,
      variant: optionProps.variant,
      isSelected
    })

    if (!optionLabel) {
      warn(
        false,
        `There are no "children" prop provided for option with id: "${id}", so it won't be rendered.`
      )
      return null
    }

    const labelInfo =
      renderLabelInfo &&
      callRenderProp(renderLabelInfo, {
        variant: optionProps.variant,
        vAlign: afterLabelContentVAlign,
        as,
        role,
        isSelected
      })

    const vAlignMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end'
    }

    return (
      <Options.Item {...optionProps} key={id}>
        <div css={styles?.optionContainer}>
          <span css={styles?.optionContent}>{optionLabel}</span>

          {labelInfo ? (
            <span
              css={styles?.optionLabelInfo}
              role="presentation"
              aria-hidden="true"
              style={{ alignSelf: vAlignMap[afterLabelContentVAlign!] }}
            >
              {/* this container span is needed for correct vAlign */}
              <span role="none">{labelInfo}</span>
            </span>
          ) : null}
        </div>
      </Options.Item>
    )
  }

  renderGroup(
    group: GroupChild,
    getOptionProps: SelectableRender['getOptionProps'],
    getDisabledOptionProps: SelectableRender['getDisabledOptionProps'],
    needsFirstSeparator: boolean,
    needsLastSeparator: boolean
  ) {
    const {
      id,
      children,
      renderGroupTitle,
      themeOverride,
      selectableType,
      elementRef
    } = group.props

    if (!children) {
      return null
    }

    const groupChildren: (
      | React.ReactElement<OptionsProps>
      | React.ReactElement<OptionsSeparatorProps>
    )[] = []

    // add a separator above
    if (needsFirstSeparator) {
      groupChildren.push(<Options.Separator />)
    }

    if (selectableType && !this._selectedGroupOptionsMap[id]) {
      this._selectedGroupOptionsMap[id] = new Map()
    }

    // create a sublist as a group
    // (a wrapping list item will be created by Options)
    groupChildren.push(
      <Options
        id={id}
        key={id}
        renderLabel={renderGroupTitle}
        elementRef={elementRef}
        // we pass the themeOverride to Options
        themeOverride={themeOverride}
      >
        {children.map((child) => {
          if (
            matchComponentTypes<SeparatorChild>(child, [DrilldownSeparator])
          ) {
            return this.renderSeparator(child)
          } else {
            return this.renderOption(
              child,
              getOptionProps,
              getDisabledOptionProps,
              group.props
            )
          }
        })}
      </Options>
    )

    // add a separator below
    if (needsLastSeparator) {
      groupChildren.push(<Options.Separator />)
    }

    return groupChildren
  }

  renderPage() {
    const {
      styles,
      overflowY,
      overflowX,
      height,
      width,
      maxHeight,
      maxWidth,
      trigger,
      label
    } = this.props

    if (!this.currentPage) {
      return null
    }

    const labelledBy = this.props['aria-labelledby']
    const controls = this.props['aria-controls']

    return (
      <Selectable
        isShowingOptions={this.shown}
        highlightedOptionId={this.state.highlightedOptionId}
        selectedOptionId={this.selectedGroupOptionIdsArray}
        onRequestShowOptions={this.show}
        onRequestHideOptions={this.hide}
        onRequestSelectOption={this.handleOptionSelect}
        onRequestHighlightOption={this.handleOptionHighlight}
        onRequestHighlightFirstOption={(event) => {
          const firstOptionId = this.activeOptionIds[0]
          this.handleOptionHighlight(event, { id: firstOptionId })
        }}
        onRequestHighlightLastOption={(event) => {
          const lastOptionId =
            this.activeOptionIds[this.activeOptionIds.length - 1]
          this.handleOptionHighlight(event, { id: lastOptionId })
        }}
      >
        {({
          // TODO: figure out what other Selectable props we need:
          // getRootProps, - we probably don't need this
          // getLabelProps, - do we need label?
          // getDescriptionProps, - might be nice for assistiveText like in Select
          // getInputProps, - hidden input for a11y? role="combobox" might be needed
          getTriggerProps,
          getListProps,
          getOptionProps,
          getDisabledOptionProps
        }) => (
          <View
            as="div"
            elementRef={this.handleRef}
            tabIndex={0}
            css={styles?.drilldown}
            position="relative"
            borderRadius="small"
            width={width}
            maxWidth={maxWidth}
            {...getTriggerProps({
              id: this._id,
              // role: '?', TODO: role??
              'aria-label': label,
              'aria-controls': controls,
              'aria-labelledby':
                labelledBy || (trigger ? this._labelId : undefined),

              // if Drilldown needs onKeyDown or onKeyUp handler, put it here
              // onKeyDown: (_event) => {},
              // onKeyUp: (_event) => {},

              onBlur: (event: React.FocusEvent) => {
                const target = event.currentTarget
                const related = event.relatedTarget
                const containsRelated = contains(
                  target as Node | Window,
                  related as Node | Window
                )

                if (
                  !related ||
                  related === this._drilldownRef ||
                  (related !== target && !containsRelated)
                ) {
                  this.setState({ highlightedOptionId: undefined })
                }
              },
              onMouseLeave: () => {
                this.setState({ highlightedOptionId: undefined })
              }
            })}
          >
            <View
              as="div"
              overflowY={overflowY}
              overflowX={overflowX}
              height={height}
              width={width}
              maxHeight={maxHeight}
              maxWidth={maxWidth}
              css={styles?.container}
              borderRadius="small"
              elementRef={(element) => {
                this._containerElement = element as HTMLDivElement
              }}
            >
              <Options
                {...getListProps()}
                // `any` cast is needed, because the themeOverride function
                // might return some extra theme Drilldown theme props
                // (but Options won't use them)
                themeOverride={this.optionsThemeOverride as any}
                as="div"
              >
                {this.renderList(getOptionProps, getDisabledOptionProps)}
              </Options>
            </View>
          </View>
        )}
      </Selectable>
    )
  }

  render() {
    // clear temporary option store
    this._activeOptionsMap = {}

    const {
      show,
      defaultShow,
      placement,
      withArrow,
      shouldContainFocus,
      shouldReturnFocus,
      trigger,
      mountNode,
      popoverRef,
      disabled,
      onDismiss,
      onFocus,
      onMouseOver,
      offsetX,
      offsetY
    } = this.props

    return trigger ? (
      <Popover
        isShowingContent={show}
        defaultIsShowingContent={defaultShow}
        shouldCloseOnDocumentClick={true}
        onHideContent={(event, { documentClick }) => {
          if (typeof onDismiss === 'function') {
            onDismiss(event, documentClick)
          }
          this.reset()
          this.handleToggle(event, false)
        }}
        onShowContent={(event) => this.handleToggle(event, true)}
        mountNode={mountNode}
        placement={placement}
        withArrow={withArrow}
        shouldContainFocus={shouldContainFocus}
        shouldReturnFocus={shouldReturnFocus}
        id={this._id}
        on={['click']}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
        offsetX={offsetX}
        offsetY={offsetY}
        ref={(el) => {
          this._popover = el
          if (typeof popoverRef === 'function') {
            popoverRef(el)
          }
        }}
        renderTrigger={safeCloneElement(trigger as ReactElement, {
          ref: (el: (React.ReactInstance & { ref?: Element }) | null) => {
            this._trigger = el
            // for the popover version the trigger has to be the ref
            this.ref = el?.ref || (el as Element)
          },
          'aria-haspopup': true,
          id: this._labelId,
          disabled: (trigger as ReactElement).props.disabled || disabled
        })}
      >
        {this.renderPage()}
      </Popover>
    ) : (
      this.renderPage()
    )
  }
}

export default Drilldown
export { Drilldown }
