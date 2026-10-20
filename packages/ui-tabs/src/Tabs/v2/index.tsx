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

import {
  cloneElement,
  Children,
  Component,
  ComponentElement,
  ReactElement
} from 'react'

import keycode from 'keycode'

import { View } from '@instructure/ui-view/latest'
import type { ViewOwnProps } from '@instructure/ui-view/latest'
import {
  matchComponentTypes,
  safeCloneElement,
  passthroughProps,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { logError as error } from '@instructure/console'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'
import { contains, getBoundingClientRect } from '@instructure/ui-dom-utils'
import type { RectType } from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'
import type { Debounced } from '@instructure/debounce'
import { px } from '@instructure/ui-utils'

import { withStyleNew } from '@instructure/emotion'

import generateStyle from './styles.js'

import { Tab } from './Tab/index.js'
import { Panel } from './Panel/index.js'

import { allowedProps } from './props.js'
import type { TabsProps, TabsState } from './props'

import type { TabsTabProps } from './Tab/props'
import type { TabsPanelProps } from './Panel/props'

type TabChild = ComponentElement<TabsTabProps, any>
type PanelChild = ComponentElement<TabsPanelProps, Panel>

type TabDescriptor = {
  index: number
  tabDomId: string
  panelDomId: string
  isDisabled: boolean
  isSelected: boolean
  panel: PanelChild
}

/**
---
category: components
---
**/
@withDeterministicId()
@withStyleNew(generateStyle)
@textDirectionContextConsumer()
class Tabs extends Component<TabsProps, TabsState> {
  static displayName = 'Tabs'
  static readonly componentId = 'Tabs'

  static allowedProps = allowedProps

  static defaultProps = {
    variant: 'default',
    shouldFocusOnRender: false,
    tabOverflow: 'stack',
    activationMode: 'auto'
  }

  static Panel = Panel
  static Tab = Tab

  private _tabList: Element | null = null
  private _tabListPosition?: RectType
  private _debounced?: Debounced<typeof this.handleResize>
  private _resizeListener?: ResizeObserver

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  constructor(props: TabsProps) {
    super(props)

    this.state = {
      withTabListOverflow: false,
      showStartOverLay: false,
      showEndOverLay: false
    }
  }

  componentDidMount() {
    if (this.props.tabOverflow === 'scroll' && this._tabList) {
      this.startScrollOverflow()
    }

    if (this.props.shouldFocusOnRender) {
      this.focus()
    }

    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: TabsProps, prevState: TabsState) {
    if (this.props.shouldFocusOnRender && !prevProps.shouldFocusOnRender) {
      this.focus()
    }

    // start event listeners for scroll overflow
    if (
      prevProps.tabOverflow === 'stack' &&
      this.props.tabOverflow === 'scroll'
    ) {
      this.startScrollOverflow()
    }

    // cancel event listeners for scroll overflow
    if (
      prevProps.tabOverflow === 'scroll' &&
      this.props.tabOverflow === 'stack'
    ) {
      this.cancelScrollOverflow()
    }

    // we need to recalculate the scroll overflow if the style changes
    if (
      this.props.tabOverflow === 'scroll' &&
      prevProps.styles !== this.props.styles
    ) {
      this.handleResize()
    }

    // when tabList is set as overflown,
    // make sure active tab is always visible
    if (
      this.props.tabOverflow === 'scroll' &&
      this._tabList &&
      !prevState.withTabListOverflow &&
      this.state.withTabListOverflow
    ) {
      const activeTabEl = this._tabList.querySelector('[aria-selected="true"]')
      this.showActiveTabIfOverlayed(activeTabEl)
    }

    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    this.cancelScrollOverflow()
  }

  startScrollOverflow() {
    this.handleResize()

    this._debounced = debounce(this.handleResize, 300, {
      leading: true,
      trailing: true
    })
    this._tabListPosition = getBoundingClientRect(this._tabList)
    this._resizeListener = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth } = entry.contentRect

        if (this._tabListPosition!.width !== newWidth) {
          this._debounced?.()
        }
      }
    })

    this._resizeListener.observe(this._tabList!)
  }

  cancelScrollOverflow() {
    if (this._resizeListener) {
      this._resizeListener.disconnect()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }
  }

  getOverlayWidth() {
    const { variant, tabOverflow, styles } = this.props

    if (styles && tabOverflow === 'scroll') {
      if (variant === 'default') {
        return px(styles?.scrollOverlayWidthDefault)
      } else {
        return px(styles?.scrollOverlayWidthSecondary)
      }
    }

    return 0
  }

  showActiveTabIfOverlayed(activeTabEl: Element | null) {
    if (
      this._tabList &&
      this._tabListPosition &&
      typeof this._tabList.scrollTo === 'function' // test for scrollTo support
    ) {
      const tabPosition = getBoundingClientRect(activeTabEl)
      const tabListPosition = this._tabListPosition

      const tabListBoundStart = tabListPosition.left + this.getOverlayWidth()
      const tabListBoundEnd = tabListPosition.right + this.getOverlayWidth()

      const tabPositionStart = tabPosition.left
      const tabPositionEnd = tabPosition.right

      if (tabListBoundEnd > tabPositionEnd) {
        const offset = Math.round(tabListBoundEnd - tabPositionEnd)
        this._tabList.scrollTo({
          top: 0,
          left: this._tabList.scrollLeft + offset,
          behavior: 'smooth'
        })
      } else if (tabListBoundStart > tabPositionStart) {
        const offset = Math.round(tabListBoundStart - tabPositionStart)
        this._tabList.scrollTo({
          top: 0,
          left: this._tabList.scrollLeft - offset,
          behavior: 'smooth'
        })
      }
    }
  }

  get isRtl() {
    return this.props.dir === textDirectionContextConsumer.DIRECTION.rtl
  }

  handleTabClick: TabsTabProps['onClick'] = (event, { index }) => {
    const target = this.getNextTab(this.getTabs(), index, 0)

    if (target) {
      this.fireOnChange(event, target)
    }
  }

  handleTabKeyDown: TabsTabProps['onKeyDown'] = (event, { index }) => {
    const tabs = this.getTabs()
    let target: TabDescriptor | undefined
    let isActivation = false

    switch (event.keyCode) {
      case keycode.codes.left:
        target = this.getNextTab(tabs, index, this.isRtl ? 1 : -1)
        break
      case keycode.codes.right:
        target = this.getNextTab(tabs, index, this.isRtl ? -1 : 1)
        break
      case keycode.codes.up:
        target = this.getNextTab(tabs, index, -1)
        break
      case keycode.codes.down:
        target = this.getNextTab(tabs, index, 1)
        break
      case keycode.codes.home:
        target = this.getEdgeTab(tabs, 'first')
        break
      case keycode.codes.end:
        target = this.getEdgeTab(tabs, 'last')
        break
      case keycode.codes.enter:
      case keycode.codes.space:
        target = this.getNextTab(tabs, index, 0)
        isActivation = true
        break
      default:
        return
    }

    event.stopPropagation()
    event.preventDefault()

    if (!target) {
      return
    }

    if (isActivation || this.props.activationMode !== 'manual') {
      this.fireOnChange(event, target)
    }

    this.focusTab(target.tabDomId)
  }

  handleTabFocus: TabsTabProps['onFocus'] = (_event, { id }) => {
    if (this.state.focusedTabId !== id) {
      this.setState({ focusedTabId: id })
    }
  }

  handleTabListBlur = (event: React.FocusEvent) => {
    if (!contains(event.currentTarget, event.relatedTarget)) {
      this.setState({ focusedTabId: undefined })
    }
  }

  handleResize = () => {
    this.setState({
      withTabListOverflow:
        this._tabList!.scrollWidth > (this._tabList as HTMLElement).offsetWidth
    })

    this._tabListPosition = getBoundingClientRect(this._tabList)
  }

  /**
   * The single source of truth for tab order, ids and state.
   */
  getTabs(): TabDescriptor[] {
    const panels: { index: number; panel: PanelChild }[] = []

    Children.toArray(this.props.children).forEach((child, index) => {
      if (matchComponentTypes<PanelChild>(child, [Panel])) {
        panels.push({ index, panel: child as PanelChild })
      }
    })

    const explicitlySelected = panels.find(
      ({ panel }) => panel.props.isSelected && !panel.props.isDisabled
    )
    const fallbackIndex = explicitlySelected ? explicitlySelected.index : 0

    return panels.map(({ index, panel }) => {
      const baseId =
        panel.props.id || this.props.deterministicId!(`Tabs_${index}`)
      const isDisabled = !!panel.props.isDisabled

      return {
        index,
        tabDomId: `tab-${baseId}`,
        panelDomId: panel.props.id || `panel-${baseId}`,
        isDisabled,
        isSelected:
          !isDisabled && (!!panel.props.isSelected || index === fallbackIndex),
        panel
      }
    })
  }

  getNextTab(
    tabs: TabDescriptor[],
    startIndex: number,
    step: -1 | 0 | 1
  ): TabDescriptor | undefined {
    const count = tabs.length
    const from = tabs.findIndex((tab) => tab.index === startIndex)

    error(from >= 0, `[Tabs] Invalid tab index: '${startIndex}'.`)

    if (from < 0) {
      return undefined
    }

    if (step === 0) {
      return tabs[from]
    }

    for (let offset = 1; offset <= count; offset++) {
      const candidate = tabs[(((from + step * offset) % count) + count) % count]

      if (!candidate.isDisabled) {
        return candidate
      }
    }

    return undefined
  }

  getEdgeTab(
    tabs: TabDescriptor[],
    edge: 'first' | 'last'
  ): TabDescriptor | undefined {
    const enabled = tabs.filter((tab) => !tab.isDisabled)

    return edge === 'first' ? enabled[0] : enabled[enabled.length - 1]
  }

  getRovingTabId(tabs: TabDescriptor[]): string | undefined {
    const { focusedTabId } = this.state
    const focused = tabs.find(
      (tab) => tab.tabDomId === focusedTabId && !tab.isDisabled
    )

    return (
      focused?.tabDomId ??
      tabs.find((tab) => tab.isSelected)?.tabDomId ??
      tabs.find((tab) => !tab.isDisabled)?.tabDomId
    )
  }

  fireOnChange(
    event: React.MouseEvent<ViewOwnProps> | React.KeyboardEvent<ViewOwnProps>,
    { index, panel, tabDomId }: TabDescriptor
  ) {
    if (typeof this.props.onRequestTabChange === 'function') {
      this.props.onRequestTabChange(event, { index, id: panel.props.id })
    }

    this.scrollTabIntoView(tabDomId)
  }

  scrollTabIntoView(tabDomId: string) {
    // one "tick" later than the keypress
    setTimeout(() => {
      if (this.state.withTabListOverflow) {
        this.showActiveTabIfOverlayed(
          this._tabList!.querySelector(`#${CSS.escape(tabDomId)}`)
        )
      }
    }, 0)
  }

  createTab(tab: TabDescriptor, isTabbable: boolean): TabChild {
    const { index, tabDomId, panelDomId, isSelected, isDisabled, panel } = tab

    return (
      <Tab
        variant={this.props.variant}
        key={`tab-${index}`}
        id={tabDomId}
        controls={panelDomId}
        index={index}
        isSelected={isSelected}
        isDisabled={isDisabled}
        isTabbable={isTabbable}
        onClick={this.handleTabClick}
        onKeyDown={this.handleTabKeyDown}
        onFocus={this.handleTabFocus}
        isOverflowScroll={this.props.tabOverflow === 'scroll'}
      >
        {panel.props.renderTitle}
      </Tab>
    )
  }

  clonePanel(tab: TabDescriptor, activePanel?: PanelChild) {
    const { index, tabDomId, panelDomId, isSelected, panel } = tab

    // fixHeight can be 0, so simply `fixheight` could return falsy value
    const hasFixedHeight = typeof this.props.fixHeight !== 'undefined'

    const commonProps = {
      id: panelDomId,
      labelledBy: tabDomId,
      isSelected,
      variant: this.props.variant,
      maxHeight: !hasFixedHeight ? this.props.maxHeight : undefined,
      minHeight: !hasFixedHeight ? this.props.minHeight : '100%'
    }

    let activePanelClone = null
    if (activePanel !== undefined) {
      // cloning active panel with a proper custom key as a workaround because
      // safeCloneElement overwrites it with the key from the original element
      activePanelClone = cloneElement(activePanel as ReactElement<any>, {
        key: `panel-${index}`
      })

      return safeCloneElement(activePanelClone, {
        padding: activePanelClone.props.padding || this.props.padding,
        textAlign: activePanelClone.props.textAlign || this.props.textAlign,
        ...commonProps
      } as TabsPanelProps & { key: string }) as PanelChild
    } else {
      return safeCloneElement(panel, {
        key: `panel-${index}`,
        padding: panel.props.padding || this.props.padding,
        textAlign: panel.props.textAlign || this.props.textAlign,
        ...commonProps
      } as TabsPanelProps & { key: string }) as PanelChild
    }
  }

  handleTabListRef = (el: Element | null) => {
    this._tabList = el
  }

  focus() {
    this.focusTab(this.getRovingTabId(this.getTabs()))
  }

  focusTab(tabDomId?: string) {
    if (!tabDomId) {
      return
    }

    const tab = this._tabList?.querySelector<HTMLElement>(
      `#${CSS.escape(tabDomId)}`
    )

    tab?.focus()
    this.scrollTabIntoView(tabDomId)
  }

  handleScroll = (
    event: React.UIEvent<ViewOwnProps> & React.UIEvent<HTMLElement>
  ) => {
    if (
      this.props.tabOverflow !== 'scroll' ||
      !this.state.withTabListOverflow
    ) {
      event.preventDefault()
      return
    }
    const tabList = event.currentTarget as HTMLElement
    const scrollLeftMax = Math.round(
      tabList.scrollWidth - getBoundingClientRect(tabList).width
    )

    const scrollLeft = Math.floor(Math.abs(tabList.scrollLeft))
    this.setState({
      showStartOverLay: scrollLeft > 0,
      showEndOverLay: scrollLeft < scrollLeftMax
    })
  }
  render() {
    const panels: PanelChild[] = []
    const tabs: TabChild[] = []
    const {
      children,
      elementRef,
      maxWidth,
      variant,
      margin,
      screenReaderLabel,
      onRequestTabChange,
      tabOverflow,
      styles,
      dir,
      ...props
    } = this.props

    const tabDescriptors = this.getTabs()
    const rovingTabId = this.getRovingTabId(tabDescriptors)
    const tabsByIndex = new Map(tabDescriptors.map((tab) => [tab.index, tab]))

    const activePanels = tabDescriptors
      .map((tab) => tab.panel)
      .filter((panel) => panel.props.active)

    if (activePanels.length > 1) {
      error(false, `[Tabs] Only one Panel can be marked as active.`)
    }

    Children.toArray(children).forEach((child, index) => {
      const tab = tabsByIndex.get(index)

      if (!tab) {
        panels.push(child as PanelChild)
        return
      }

      tabs.push(this.createTab(tab, tab.tabDomId === rovingTabId))
      panels.push(
        this.clonePanel(
          tab,
          activePanels.length === 1 ? activePanels[0] : undefined
        )
      )
    })

    const withScrollFade =
      tabOverflow === 'scroll' && this.state.withTabListOverflow

    // suppress overlay whenever final Tab is active, or Firefox will cover it
    const startScrollOverlay = this.state.showStartOverLay ? (
      <span key="start-overlay" css={styles?.startScrollOverlay} />
    ) : null

    const endScrollOverlay = this.state.showEndOverLay ? (
      <span key="end-overlay" css={styles?.endScrollOverlay} />
    ) : null

    return (
      <View
        {...passthroughProps(props)}
        elementRef={this.handleRef}
        maxWidth={maxWidth}
        margin={margin}
        as="div"
        css={styles?.container}
        data-cid="Tabs"
      >
        <View
          as="div"
          position="relative"
          borderRadius="medium"
          shouldAnimateFocus={false}
          css={styles?.tabs}
        >
          <View
            as="div"
            role="tablist"
            css={styles?.tabList}
            aria-label={screenReaderLabel}
            elementRef={this.handleTabListRef}
            onScroll={this.handleScroll}
            onBlur={this.handleTabListBlur}
          >
            {tabs}
            {withScrollFade && startScrollOverlay}
            {withScrollFade && endScrollOverlay}
          </View>
        </View>

        <div css={styles?.panelsContainer}>{panels}</div>
      </View>
    )
  }
}

export default Tabs
export { Tabs, Panel }
