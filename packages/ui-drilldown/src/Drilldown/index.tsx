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

import { Children, Component, ReactElement, ReactNode } from 'react'

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
import { Options } from '@instructure/ui-options'
import type {
  OptionsProps,
  OptionsItemProps,
  OptionsSeparatorProps
} from '@instructure/ui-options'
import { Popover } from '@instructure/ui-popover'
import { Selectable } from '@instructure/ui-selectable'
import type { SelectableRender } from '@instructure/ui-selectable'
import {
  IconArrowOpenStartSolid,
  IconArrowOpenEndSolid,
  IconCheckSolid
} from '@instructure/ui-icons'

import { withStyle } from '@instructure/emotion'

import { DrilldownSeparator } from './DrilldownSeparator'
import { DrilldownOption } from './DrilldownOption'
import { DrilldownGroup } from './DrilldownGroup'
import type { DrilldownGroupProps, GroupChildren } from './DrilldownGroup/props'
import { DrilldownPage } from './DrilldownPage'
import type { DrilldownPageProps, PageChildren } from './DrilldownPage/props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps, SelectedGroupOptionsMap } from './props'

import type {
  DrilldownProps,
  DrilldownStyleProps,
  DrilldownState,
  PageChild,
  OptionChild,
  GroupChild,
  SeparatorChild
} from './props'

// Additional data we need to track on the Options,
// but shouldn't be settable via props
type OptionData = {
  groupProps?: DrilldownGroupProps
}

// Contains the Option ComponentElement and the extra data we need track on it,
// but don't want to expose as props
type MappedOption = OptionChild & OptionData & { index: number }

// Contains the props object of the Page
// with the `children` transformed into an array
type MappedPage = DrilldownPageProps & {
  children: PageChildren[]
}

// An object with the mapped Pages with their id as keys
type PageMap = Record<string, MappedPage>

/**
---
category: components
---
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
    as: 'ul',
    role: 'menu',
    overflowX: 'auto',
    overflowY: 'auto',
    placement: 'bottom center',
    defaultShow: false,
    shouldHideOnSelect: true,
    shouldContainFocus: false,
    shouldReturnFocus: true,
    withArrow: true,
    offsetX: 0,
    offsetY: 0,
    shouldSetAriaExpanded: true
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
  readonly _triggerId: string
  readonly _headerBackId: string
  readonly _headerTitleId: string
  readonly _headerTitleLabelId: string
  readonly _headerActionId: string

  // Array of visited page ids in "breadcrumbs" fashion
  private readonly _pageHistory: string[]

  // Map of the active options on the page (includes header options too)
  _activeOptionsMap: {
    [optionId: string]: MappedOption
  } = {}

  // Map of the selected options in groups (grouped by group id)

  ref: HTMLDivElement | Element | null = null

  handleRef = (el: HTMLDivElement | Element | null) => {
    // ref and elementRef have to be set together for the same element
    const { elementRef } = this.props

    this.ref = el as HTMLDivElement

    if (typeof elementRef === 'function') {
      elementRef(el as HTMLDivElement)
    }
  }

  handleDrilldownRef = (el: Element | null) => {
    const { drilldownRef } = this.props

    this._drilldownRef = el as HTMLDivElement

    if (typeof drilldownRef === 'function') {
      drilldownRef(el as HTMLDivElement)
    }

    // setting ref for "non-popover" version, the drilldown itself
    // (if a trigger is provided, the Popover sets the ref)
    if (!this.props.trigger) {
      this.handleRef(el as HTMLDivElement)
    }
  }

  constructor(props: DrilldownProps) {
    super(props)

    this.state = {
      isShowingPopover: props.trigger ? !!props.show : false,
      activePageId: props.rootPageId,
      highlightedOptionId: undefined,
      lastSelectedId: undefined,
      selectedGroupOptionsMap: this.setDefaultSelected()
    }
    this._pageHistory = [props.rootPageId]

    this._id = props.id || props.deterministicId!()
    this._triggerId = props.deterministicId!('Drilldown-Trigger')
    this._headerBackId = props.deterministicId!('DrilldownHeader-Back')
    this._headerTitleId = props.deterministicId!('DrilldownHeader-Title')
    this._headerTitleLabelId = props.deterministicId!(
      'DrilldownHeader-Title-Label'
    )
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

  get makeStylesVariables(): DrilldownStyleProps {
    return {
      hasHighlightedOption: !!this.state.highlightedOptionId
    }
  }

  get activeOptionIds() {
    const orderedKeys = Object.keys(this._activeOptionsMap).sort((a, b) => {
      return this._activeOptionsMap[a].index - this._activeOptionsMap[b].index
    })
    return orderedKeys
  }

  get activeOptions() {
    return Object.values(this._activeOptionsMap)
  }

  get pages(): PageChild[] {
    const { children } = this.props
    return Children.toArray(children || []) as PageChild[]
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
        children: Children.toArray(children || []) as PageChildren[]
      }
    })

    return map
  }

  get isOnRootPage() {
    return this.state.activePageId === this.props.rootPageId
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

    // we make a copy of the array so the original history
    // cannot be modified from the outside
    const pageHistory = [...this._pageHistory]

    return {
      pageHistory,
      goToPage,
      goToPreviousPage
    }
  }

  get currentPageAriaLabel() {
    // return, if explicitly set
    if (this.props['aria-labelledby']) {
      return this.props['aria-labelledby']
    }

    // if it has title, point to the title label content
    if (this.currentPage?.renderTitle) {
      return this._headerTitleLabelId
    }

    // if root page has no title, try the trigger, if exists
    if (this.isOnRootPage && this.props.trigger) {
      return this._triggerId
    }

    return undefined
  }

  getChildrenArray<C extends PageChildren | GroupChildren = PageChildren>(
    children?: C | C[]
  ) {
    if (!children) {
      return []
    }
    return Array.isArray(children) ? children : ([children] as C[])
  }

  getPageById(id?: string): MappedPage | undefined {
    return this.pageMap && id ? this.pageMap[id] : undefined
  }

  getPageChildById(id?: string) {
    return id ? this._activeOptionsMap[id] : undefined
  }

  setDefaultSelected() {
    const selectedGroupOptionsMap: SelectedGroupOptionsMap = {}

    this.pages.forEach((page) => {
      const { children } = page.props

      this.getChildrenArray(children).forEach((child) => {
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

          if (selectableType && !selectedGroupOptionsMap[groupId]) {
            selectedGroupOptionsMap[groupId] = new Map()
          }

          if (selectableType === 'single' && groupDefaultSelected.length > 1) {
            error(
              false,
              `Radio type selectable groups can have only one item selected! Group with id "${groupId}" cannot select multiple items: [${groupDefaultSelected.join(
                ', '
              )}]!`
            )

            return
          }

          selectedGroupOptionsMap[groupId] = new Map()

          this.getChildrenArray(groupChildren)?.forEach((groupChild) => {
            if (
              matchComponentTypes<OptionChild>(groupChild, [DrilldownOption])
            ) {
              const {
                id: optionId,
                value: optionValue,
                defaultSelected: optionDefaultSelected
              } = groupChild.props

              // if explicitly set to false, it should override the group's
              if (optionDefaultSelected === false) {
                return
              }

              const isGroupDefaultSelected =
                typeof optionValue !== 'undefined' &&
                groupDefaultSelected
                  .filter((value) => typeof value !== 'undefined')
                  .includes(optionValue)

              if (optionDefaultSelected || isGroupDefaultSelected) {
                selectedGroupOptionsMap[groupId].set(optionId, optionValue)
              }
            }
          })
        }
      })
    })
    return selectedGroupOptionsMap
  }

  get selectedGroupOptionIdsArray() {
    return Object.values(this.state.selectedGroupOptionsMap)
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
          <div css={styles?.headerBack} role="presentation">
            {backButtonLabel}
          </div>
        </DrilldownOption>
      )
    }

    // Header title
    if (renderTitle) {
      const title = callRenderProp(renderTitle)

      if (title) {
        headerChildren.push(
          <DrilldownOption
            id={this._headerTitleId}
            role="presentation"
            aria-hidden="true"
          >
            <div css={styles?.headerTitle} id={this._headerTitleLabelId}>
              {title}
            </div>
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

  containsDuplicateChild(children: PageChildren[]) {
    let containsDuplicate = false
    const childMap = new Map<string, boolean>()

    for (const child of children) {
      if (!childMap.has(child.props.id)) {
        childMap.set(child.props.id, true)
      } else {
        warn(
          false,
          `Duplicate id: "${child.props.id}"! Make sure all options have unique ids, otherwise they won't be rendered.`
        )

        return (containsDuplicate = true)
      }
    }

    return containsDuplicate
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
      `[id="${CSS.escape(id)}"]`
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

    // TS complains that it cannot be true, but since it is an exposed method,
    // it is better if we provide a warning for this case too
    if (typeof newPageId !== 'string') {
      warn(
        false,
        `Cannot go to page because parameter newPageId has to be string (valid page id). Current newPageId is "${typeof newPageId}".`
      )
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
        `There is no previous page to go to. The current page history is: [${this._pageHistory.join(
          ', '
        )}].`
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
    this.setState(
      (oldState) => {
        const { id: optionId, value } = selectedOption.props
        const { id: groupId, selectableType } = selectedOption.groupProps!

        let newState = new Map(oldState.selectedGroupOptionsMap[groupId])

        if (
          selectableType === 'multiple' &&
          Boolean(oldState.selectedGroupOptionsMap[groupId]?.has(optionId))
        ) {
          // toggle off, if already selected
          newState.delete(optionId)
        } else {
          if (selectableType === 'multiple') {
            // "checkbox"
            newState.set(optionId, value)
          } else if (selectableType === 'single') {
            // "radio"
            newState = new Map()
            newState.set(optionId, value)
          }
        }
        return {
          ...oldState,
          selectedGroupOptionsMap: {
            ...oldState.selectedGroupOptionsMap,
            [groupId]: newState
          }
        }
      },
      () => {
        const { value } = selectedOption.props
        const { id: groupId, onSelect: groupOnSelect } =
          selectedOption.groupProps!

        const { onSelect } = this.props
        const { groupProps, ...option } = selectedOption
        const selectedOptionValuesInGroup = [
          ...this.state.selectedGroupOptionsMap[groupId].values()
        ]

        if (typeof groupOnSelect === 'function') {
          groupOnSelect(event, {
            value: selectedOptionValuesInGroup,
            isSelected: selectedOptionValuesInGroup.includes(value),
            selectedOption: option,
            drilldown: this
          })
        }

        if (typeof onSelect === 'function') {
          onSelect(event, {
            value: selectedOptionValuesInGroup,
            isSelected: selectedOptionValuesInGroup.includes(value),
            selectedOption: option,
            drilldown: this
          })
        }
      }
    )
  }

  handleOptionSelect = (
    event: React.SyntheticEvent,
    { id }: { id?: string }
  ) => {
    const selectedOption = this.getPageChildById(id)

    // TODO: this line can be removed when React 16 is no longer supported
    event.persist()

    if (
      !id ||
      !selectedOption ||
      selectedOption.props.disabled ||
      (event.target as HTMLElement).getAttribute('disabled') ||
      (event.target as HTMLElement).getAttribute('aria-disabled')
    ) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    const { shouldHideOnSelect, onSelect } = this.props

    const { groupProps, ...selectedOptionChild } = selectedOption
    const { subPageId, href, value, onOptionClick } = selectedOptionChild.props

    if (typeof onOptionClick === 'function') {
      onOptionClick(event, {
        optionId: id,
        drilldown: this,
        ...this.exposedNavigationProps
      })
    }

    if (subPageId) {
      this.goToPage(subPageId)
    }

    if (event.type === 'keydown' && href) {
      const optionEl = this._drilldownRef?.querySelector(
        `#${CSS.escape(id)}`
      ) as HTMLLinkElement
      const isLink = optionEl.tagName.toLowerCase() === 'a'

      // we need this check because in some cases
      // we ignore href prop in renderOption()
      if (isLink && optionEl?.href) {
        optionEl.click()
      }
    }

    if (groupProps?.selectableType) {
      this.handleGroupOptionSelected(event, selectedOption)
    } else {
      if (typeof onSelect === 'function') {
        onSelect(event, {
          value,
          isSelected: true,
          selectedOption: selectedOptionChild,
          drilldown: this
        })
      }
    }

    // should prevent closing on page navigation
    if (shouldHideOnSelect && !subPageId && id !== this._headerBackId) {
      this.hide(event as React.UIEvent)
    }
  }

  // Setting extra logic for keyboard navigation.
  // Enter, Esc and up/down/home/end keys are handled by Selectable.
  handleKeyDown = (event: React.KeyboardEvent) => {
    const id = (event.target as HTMLElement).id
    const option = this.getPageChildById(id)

    // On Space...
    if ([' ', 'space', 'Space'].includes(event.key)) {
      // we need to preventDefault so the page doesn't scroll on Space
      event.preventDefault()
      event.stopPropagation()

      // for options, Space it has to work as Enter (get selected)
      if (option) {
        this.handleOptionSelect(event, { id })
      }
    }

    // On Right arrow...
    if (event.key === 'ArrowRight') {
      // if the option has subpage, we open it
      if (option?.props.subPageId) {
        this.handleOptionSelect(event, { id })
      }
    }

    // On Left arrow...
    if (event.key === 'ArrowLeft') {
      // if it is possible, we go a level up in the history
      if (this._pageHistory.length > 1) {
        this.handleBackButtonClick()
      }

      // if on root page and popover is open, we close it
      if (this.isOnRootPage && this._popover?.shown) {
        this._popover.hide(event)
      }
    }
  }

  handleToggle = (event: React.UIEvent | React.FocusEvent, shown: boolean) => {
    const { onToggle, trigger } = this.props

    if (trigger && shown && this.currentPage) {
      const actionLabel = callRenderProp(this.currentPage.renderActionLabel)
      // Use action ID if exists, otherwise first non-action option's ID
      const targetId = actionLabel
        ? this._headerActionId
        : this.getFirstOption()?.props.id
      setTimeout(() => {
        this.setState({
          highlightedOptionId: targetId
        })
      }, 10)
    }
    this.setState({ isShowingPopover: shown })

    if (typeof onToggle === 'function') {
      onToggle(event, {
        shown,
        drilldown: this,
        ...this.exposedNavigationProps
      })
    }
  }

  getFirstOption = () => {
    const children = Children.toArray(this.currentPage?.children)

    const child = children[0]
    if (!child) return undefined

    // If it's a regular option, return it
    if (matchComponentTypes<OptionChild>(child, [DrilldownOption])) {
      return child
    }
    // If it's a group, get its options
    if (matchComponentTypes<GroupChild>(child, [Drilldown.Group])) {
      const groupOptions = Children.toArray(child.props.children)
      return groupOptions[0] as OptionChild
    }
    return undefined
  }

  renderList(
    getOptionProps: SelectableRender['getOptionProps'],
    getDisabledOptionProps: SelectableRender['getDisabledOptionProps']
  ) {
    const { currentPage, headerChildren } = this

    if (!currentPage || this.containsDuplicateChild(currentPage.children)) {
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
        const isLastChild = index === pageChildren.length - 1
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
      } else if (matchComponentTypes<OptionChild>(child, [DrilldownOption])) {
        lastItemWasSeparator = false
        return this.renderOption(child, getOptionProps, getDisabledOptionProps)
      } else {
        return null
      }
    })
  }

  renderSeparator(separator: SeparatorChild) {
    const { id, themeOverride, ...props } = separator.props
    return (
      <Options.Separator
        {...props}
        id={id}
        key={id}
        role="separator"
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
      href,
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

    if (!id) {
      warn(
        false,
        `Drilldown.Option without id won't be rendered. It is needed to internally track the options.`
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
      ...getOptionProps({
        id,
        // aria-selected is only valid for these roles, otherwise we need to unset it
        ...(role &&
          ![
            'gridcell',
            'option',
            'row',
            'tab',
            'columnheader',
            'rowheader',
            'treeitem'
          ].includes(role) && {
            'aria-selected': undefined
          })
      }),
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

    // track as valid active option if not the title and the map doesn't already contain the id
    if (id !== this._headerTitleId && !this._activeOptionsMap[id]) {
      // store index to know the order of ids later; js objects doesn't preserve order
      this._activeOptionsMap[id] = {
        ...option,
        ...optionData,
        index: Object.keys(this._activeOptionsMap).length + 1
      }
    }

    const customRole =
      role !== DrilldownOption.defaultProps.role ? role : undefined

    // BEFORE/AFTER elements:
    // we set a few manually on Options.Item,
    // the rest are passed directly
    if (subPageId) {
      optionProps.renderAfterLabel = <IconArrowOpenEndSolid />
      optionProps['aria-haspopup'] = true
      optionProps.role = customRole || 'button'
      warn(
        !renderAfterLabel,
        `The prop "renderAfterLabel" is reserved on item with id: "${id}". When it has "subPageId" provided, a navigation arrow will render after the label.`
      )
    }
    if (id === this._headerBackId) {
      optionProps.renderBeforeLabel = <IconArrowOpenStartSolid />
    }
    const isOptionControlled = typeof option.props.selected === 'boolean'
    if ((groupProps?.selectableType || isOptionControlled) && groupProps) {
      if (!isOptionControlled) {
        isSelected = Boolean(
          this.state.selectedGroupOptionsMap[groupProps.id]?.has(id)
        )
      } else {
        isSelected = Boolean(option.props.selected)
      }
      optionProps['aria-checked'] = isSelected

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

      // setting aria roles and attributes for selectable group items
      if (groupProps.selectableType === 'single') {
        optionProps.role = customRole || 'menuitemradio'
      }
      if (groupProps.selectableType === 'multiple') {
        optionProps.role = customRole || 'menuitemcheckbox'
      }
    }
    // display option as highlighted
    if (id === this.state.highlightedOptionId) {
      optionProps.variant = 'highlighted'

      if (isOptionDisabled) {
        optionProps.variant = 'highlighted-disabled'
      }
    }

    if (href) {
      if (subPageId) {
        warn(
          false,
          `Drilldown.Option with id "${id}" has subPageId, so it will ignore the "href" property.`
        )
      } else if (groupProps?.selectableType) {
        warn(
          false,
          `Drilldown.Option with id "${id}" is in a selectable group, so it will ignore the "href" property.`
        )
      } else {
        optionProps.href = href
      }
    }

    const optionLabel = callRenderProp(children, {
      id,
      variant: optionProps.variant as Exclude<
        OptionsItemProps['variant'],
        'selected'
      >,
      isSelected
    })

    if (!optionLabel) {
      warn(
        false,
        `There are no "children" prop provided for option with id: "${id}", so it won't be rendered.`
      )
      return null
    }

    const renderLabelProps = {
      variant: optionProps.variant as Exclude<
        OptionsItemProps['variant'],
        'selected'
      >,
      vAlign: afterLabelContentVAlign,
      as,
      role: optionProps.role,
      isSelected
    }

    // we need to bind our own option props the render functions
    if (
      typeof optionProps.renderBeforeLabel === 'function' &&
      !optionProps.renderBeforeLabel?.prototype?.isReactComponent
    ) {
      optionProps.renderBeforeLabel = (
        optionProps.renderBeforeLabel as (args: any) => ReactNode
      ).bind(null, renderLabelProps)
    }
    if (
      typeof optionProps.renderAfterLabel === 'function' &&
      !optionProps.renderAfterLabel?.prototype?.isReactComponent
    ) {
      optionProps.renderAfterLabel = (
        optionProps.renderAfterLabel as (args: any) => ReactNode
      ).bind(null, renderLabelProps)
    }

    const labelInfo =
      renderLabelInfo && callRenderProp(renderLabelInfo, renderLabelProps)

    const vAlignMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end'
    }

    const labelAriaId = `${id}__label`
    const infoAriaId = `${id}__info`

    const labelledby = option.props['aria-labelledby'] || labelAriaId
    const describedby =
      option.props['aria-describedby'] || (labelInfo ? infoAriaId : undefined)

    return (
      <Options.Item
        {...optionProps}
        key={id}
        aria-labelledby={labelledby}
        aria-describedby={describedby}
      >
        <div css={styles?.optionContainer} role="none">
          <span css={styles?.optionContent} role="none" id={labelAriaId}>
            {optionLabel}
          </span>

          {labelInfo ? (
            <span
              css={styles?.optionLabelInfo}
              role="presentation"
              style={{ alignSelf: vAlignMap[afterLabelContentVAlign!] }}
            >
              {/* this container span is needed for correct vAlign */}
              <span id={infoAriaId}>{labelInfo}</span>
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
      role,
      as,
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

    // create a sublist as a group
    // (a wrapping list item will be created by Options)
    groupChildren.push(
      <Options
        id={id}
        key={id}
        role={role}
        as={as || this.props.as}
        renderLabel={renderGroupTitle}
        elementRef={elementRef}
        // we pass the themeOverride to Options
        themeOverride={themeOverride}
      >
        {this.getChildrenArray(children).map((child) => {
          if (
            matchComponentTypes<SeparatorChild>(child, [DrilldownSeparator])
          ) {
            return this.renderSeparator(child)
          } else if (
            matchComponentTypes<OptionChild>(child, [DrilldownOption])
          ) {
            return this.renderOption(
              child,
              getOptionProps,
              getDisabledOptionProps,
              group.props
            )
          } else {
            return null
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
      minHeight,
      minWidth,
      maxHeight,
      maxWidth,
      role,
      as,
      label
    } = this.props

    if (!this.currentPage) {
      return null
    }

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
          // TODO: figure out what other Selectable props we need, if we want to add a Select version for drilldown:
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
            borderWidth="small"
            as="div"
            elementRef={this.handleDrilldownRef}
            tabIndex={0}
            css={styles?.drilldown}
            position="relative"
            borderRadius="small"
            width={width}
            minWidth={maxWidth}
            maxWidth={maxWidth}
            role={role}
            aria-label={label}
            aria-labelledby={this.currentPageAriaLabel}
            {...getTriggerProps({
              id: this._id,
              // We need to override these aria attributes added by Selectable,
              // since Drilldown is not a combobox and has no popup
              'aria-haspopup': false,
              'aria-expanded': undefined,
              onKeyDown: this.handleKeyDown,
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
              minHeight={minHeight}
              minWidth={minWidth}
              maxHeight={maxHeight}
              maxWidth={maxWidth}
              css={styles?.container}
              borderRadius="small"
              role="presentation"
              elementRef={(element) => {
                this._containerElement = element as HTMLDivElement
              }}
            >
              <Options {...getListProps()} role="presentation" as={as}>
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
      constrain,
      positionTarget,
      positionContainerDisplay,
      popoverRef,
      disabled,
      onDismiss,
      onFocus,
      onMouseOver,
      offsetX,
      offsetY,
      shouldSetAriaExpanded
    } = this.props

    return trigger ? (
      <Popover
        shouldSetAriaExpanded={shouldSetAriaExpanded}
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
        mountNode={mountNode || this.ref}
        placement={placement}
        withArrow={withArrow}
        positionTarget={positionTarget}
        positionContainerDisplay={positionContainerDisplay}
        constrain={constrain}
        shouldContainFocus={shouldContainFocus}
        shouldReturnFocus={shouldReturnFocus}
        id={this._id}
        on={['click']}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
        offsetX={offsetX}
        offsetY={offsetY}
        defaultFocusElement={() => {
          if (!this.currentPage) return null
          const actionLabel = callRenderProp(this.currentPage.renderActionLabel)
          // Use action ID if exists, otherwise first non-action option's ID
          const targetId = actionLabel
            ? this._headerActionId
            : this.getFirstOption()?.props.id

          if (!targetId) return null
          return this._popover?._contentElement?.querySelector(
            `#${CSS.escape(targetId)}`
          )
        }}
        elementRef={(element) => {
          // setting ref for "Popover" version, the popover root
          // (if there is no trigger, we set it in handleDrilldownRef)
          this.handleRef(element)
        }}
        ref={(el) => {
          this._popover = el
          if (typeof popoverRef === 'function') {
            popoverRef(el)
          }
        }}
        renderTrigger={safeCloneElement(trigger as ReactElement, {
          ref: (el: (React.ReactInstance & { ref?: Element }) | null) => {
            this._trigger = el
          },
          'aria-haspopup': this.props.role,
          id: this._triggerId,
          disabled: !!((trigger as ReactElement).props.disabled || disabled),
          'aria-disabled':
            (trigger as ReactElement).props.disabled || disabled
              ? 'true'
              : undefined
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
