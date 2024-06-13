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

/** @jsx jsx */
import React, {
  Component,
  ComponentClass,
  ComponentElement,
  createElement,
  ReactElement
} from 'react'

import keycode from 'keycode'

import { View } from '@instructure/ui-view'
import type { ViewOwnProps } from '@instructure/ui-view'
import {
  matchComponentTypes,
  safeCloneElement,
  passthroughProps
} from '@instructure/ui-react-utils'
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'
import { Focusable } from '@instructure/ui-focusable'
import { getBoundingClientRect } from '@instructure/ui-dom-utils'
import type { RectType } from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'
import type { Debounced } from '@instructure/debounce'
import { px } from '@instructure/ui-utils'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Tab } from './Tab'
import { Panel } from './Panel'

import { allowedProps, propTypes } from './props'
import type { TabsProps, TabsState } from './props'

import type { TabsTabProps } from './Tab/props'
import type { TabsPanelProps } from './Panel/props'

type TabChild = ComponentElement<TabsTabProps, any>
type PanelChild = ComponentElement<TabsPanelProps, Panel>

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Tabs extends Component<TabsProps, TabsState> {
  static readonly componentId = 'Tabs'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    variant: 'default',
    shouldFocusOnRender: false,
    tabOverflow: 'stack'
  }

  static Panel = Panel
  static Tab = Tab

  private _tabList: Element | null = null
  private _focusable: Focusable | null = null
  private _tabListPosition?: RectType
  private _debounced?: Debounced
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

  handleTabClick: TabsTabProps['onClick'] = (event, { index }) => {
    const nextTab = this.getNextTab(index, 0)
    this.fireOnChange(event, nextTab)
  }

  handleTabKeyDown: TabsTabProps['onKeyDown'] = (event, { index }) => {
    let nextTab

    if (
      event.keyCode === keycode.codes.up ||
      event.keyCode === keycode.codes.left
    ) {
      // Select next tab to the left
      nextTab = this.getNextTab(index, -1)
    } else if (
      event.keyCode === keycode.codes.down ||
      event.keyCode === keycode.codes.right
    ) {
      // Select next tab to the right
      nextTab = this.getNextTab(index, 1)
    }
    if (nextTab) {
      event.preventDefault()
      this.fireOnChange(event, nextTab)
    }
  }

  handleResize = () => {
    this.setState({
      withTabListOverflow:
        this._tabList!.scrollWidth > (this._tabList as HTMLElement).offsetWidth
    })

    this._tabListPosition = getBoundingClientRect(this._tabList)
  }

  getNextTab(
    startIndex: number,
    step: -1 | 0 | 1
  ): { index: number; id?: string } {
    const tabs = React.Children.toArray(this.props.children).map(
      (child) => matchComponentTypes<PanelChild>(child, [Panel]) && child
    ) as PanelChild[]
    const count = tabs.length
    const change = step < 0 ? step + count : step

    error(
      startIndex >= 0 && startIndex < count,
      `[Tabs] Invalid tab index: '${startIndex}'.`
    )

    let nextIndex = startIndex
    let nextTab: PanelChild

    do {
      nextIndex = (nextIndex + change) % count
      nextTab = tabs[nextIndex]
    } while (nextTab && nextTab.props && nextTab.props.isDisabled)

    error(
      nextIndex >= 0 && nextIndex < count,
      `[Tabs] Invalid tab index: '${nextIndex}'.`
    )
    return { index: nextIndex, id: nextTab.props.id }
  }

  fireOnChange(
    event: React.MouseEvent<ViewOwnProps> | React.KeyboardEvent<ViewOwnProps>,
    { index, id }: { index: number; id?: string }
  ) {
    if (typeof this.props.onRequestTabChange === 'function') {
      this.props.onRequestTabChange(event, { index, id })
    }

    // this is needed because keypress cancels scrolling. So we have to trigger the scrolling
    // one "tick" later than the keypress
    setTimeout(() => {
      this.state.withTabListOverflow &&
        this.showActiveTabIfOverlayed(
          this._tabList!.querySelector(`#tab-${id}`)
        )
    }, 0)
  }

  createTab(
    index: number,
    generatedId: string,
    selected: boolean,
    panel: PanelChild
  ): TabChild {
    const id = panel.props.id || generatedId

    return createElement(Tab as ComponentClass<TabsTabProps>, {
      variant: this.props.variant,
      key: `tab-${index}`,
      id: `tab-${id}`,
      controls: panel.props.id || `panel-${id}`,
      index,
      isSelected: selected,
      isDisabled: panel.props.isDisabled,
      children: panel.props.renderTitle,
      onClick: this.handleTabClick,
      onKeyDown: this.handleTabKeyDown
    })
  }

  clonePanel(
    index: number,
    generatedId: string,
    selected: boolean,
    panel: PanelChild,
    activePanel?: PanelChild
  ) {
    const id = panel.props.id || generatedId

    // fixHeight can be 0, so simply `fixheight` could return falsy value
    const hasFixedHeight = typeof this.props.fixHeight !== 'undefined'

    const commonProps = {
      id: panel.props.id || `panel-${id}`,
      labelledBy: `tab-${id}`,
      isSelected: selected,
      variant: this.props.variant,
      maxHeight: !hasFixedHeight ? this.props.maxHeight : undefined,
      minHeight: !hasFixedHeight ? this.props.minHeight : '100%'
    }

    let activePanelClone = null
    if (activePanel !== undefined) {
      // cloning active panel with a proper custom key as a workaround because
      // safeCloneElement overwrites it with the key from the original element
      activePanelClone = React.cloneElement(activePanel as ReactElement, {
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

  handleFocusableRef = (el: Focusable | null) => {
    this._focusable = el
  }

  handleTabListRef = (el: Element | null) => {
    this._tabList = el
  }

  focus() {
    this._focusable &&
      typeof this._focusable.focus === 'function' &&
      this._focusable.focus()
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
      ...props
    } = this.props

    const activePanels = (React.Children.toArray(children) as PanelChild[])
      .filter((child) => matchComponentTypes<PanelChild>(child, [Panel]))
      .filter((child) => child.props.active)

    if (activePanels.length > 1) {
      error(false, `[Tabs] Only one Panel can be marked as active.`)
    }

    const selectedChildIndex = (
      React.Children.toArray(children) as PanelChild[]
    )
      .filter((child) => matchComponentTypes<PanelChild>(child, [Panel]))
      .findIndex((child) => child.props.isSelected && !child.props.isDisabled)

    const selectedIndex = selectedChildIndex >= 0 ? selectedChildIndex : 0

    React.Children.toArray(children).map((child, index) => {
      if (matchComponentTypes<PanelChild>(child, [Panel])) {
        const selected =
          !child.props.isDisabled &&
          (child.props.isSelected || selectedIndex === index)
        const id = uid()

        tabs.push(this.createTab(index, id, selected, child))
        if (activePanels.length === 1) {
          panels.push(
            this.clonePanel(index, id, selected, child, activePanels[0])
          )
        } else {
          panels.push(this.clonePanel(index, id, selected, child))
        }
      } else {
        panels.push(child as PanelChild)
      }
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
      >
        <Focusable ref={this.handleFocusableRef}>
          {() => (
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
              >
                {tabs}
                {withScrollFade && startScrollOverlay}
                {withScrollFade && endScrollOverlay}
              </View>
            </View>
          )}
        </Focusable>

        <div css={styles?.panelsContainer}>{panels}</div>
      </View>
    )
  }
}

export default Tabs
export { Tabs, Panel }
