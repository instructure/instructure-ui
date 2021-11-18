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
import { debounce } from '@instructure/debounce'
import { px } from '@instructure/ui-utils'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Tab } from './Tab'
import { Panel } from './Panel'

import { allowedProps, propTypes } from './props'
import type { TabsProps } from './props'
import type { TabsTabProps } from './Tab/props'
import type { TabsPanelProps } from './Panel/props'

type TabChild = ReactElement & ComponentElement<TabsTabProps, any>
type PanelChild = ReactElement & ComponentElement<TabsPanelProps, any>

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@textDirectionContextConsumer()
@testable()
class Tabs extends Component<TabsProps> {
  static readonly componentId = 'Tabs'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    variant: 'default',
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestTabChange: (event, { index, id }) => {},
    children: null,
    elementRef: () => {},
    shouldFocusOnRender: false,
    tabOverflow: 'stack'
  }

  static Panel = Panel
  static Tab = Tab

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
    this._tabList = null
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabListPosition' does not exist on type... Remove this comment to see the full error message
    this._tabListPosition = null

    this.state = {
      withTabListOverflow: false
    }
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
    if (this.props.tabOverflow === 'scroll' && this._tabList) {
      this.startScrollOverflow()
    }

    if (this.props.shouldFocusOnRender) {
      this.focus()
    }

    this.props.makeStyles?.()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
      this._tabList &&
      !prevState.withTabListOverflow &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'withTabListOverflow' does not exist on t... Remove this comment to see the full error message
      this.state.withTabListOverflow
    ) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Tabs... Remove this comment to see the full error message
    this._debounced = debounce(this.handleResize, 300, {
      leading: true,
      trailing: true
    })
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabListPosition' does not exist on type... Remove this comment to see the full error message
    this._tabListPosition = getBoundingClientRect(this._tabList)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_resizeListener' does not exist on type ... Remove this comment to see the full error message
    this._resizeListener = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth } = entry.contentRect

        // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabListPosition' does not exist on type... Remove this comment to see the full error message
        if (this._tabListPosition.width !== newWidth) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Tabs... Remove this comment to see the full error message
          this._debounced()
        }
      }
    })

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_resizeListener' does not exist on type ... Remove this comment to see the full error message
    this._resizeListener.observe(this._tabList)
  }

  cancelScrollOverflow() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_resizeListener' does not exist on type ... Remove this comment to see the full error message
    if (this._resizeListener) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_resizeListener' does not exist on type ... Remove this comment to see the full error message
      this._resizeListener.disconnect()
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Tabs... Remove this comment to see the full error message
    if (this._debounced) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_debounced' does not exist on type 'Tabs... Remove this comment to see the full error message
      this._debounced.cancel()
    }
  }

  // @ts-expect-error TODO: not all codepaths return a value!
  getOverlayWidth() {
    const { variant, tabOverflow, styles } = this.props

    if (tabOverflow === 'scroll') {
      if (variant === 'default') {
        return px(styles?.scrollOverlayWidthDefault as number)
      } else {
        return px(styles?.scrollOverlayWidthSecondary as number)
      }
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'activeTabEl' implicitly has an 'any' ty... Remove this comment to see the full error message
  showActiveTabIfOverlayed(activeTabEl) {
    if (
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
      this._tabList &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabListPosition' does not exist on type... Remove this comment to see the full error message
      this._tabListPosition &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
      typeof this._tabList.scrollTo === 'function' // test for scrollTo support
    ) {
      const { dir } = this.props
      const isRtl = dir === textDirectionContextConsumer.DIRECTION.rtl

      const tabPosition = getBoundingClientRect(activeTabEl)
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabListPosition' does not exist on type... Remove this comment to see the full error message
      const tabListPosition = this._tabListPosition

      const tabListBoundStart = isRtl
        ? tabListPosition.left + this.getOverlayWidth()
        : tabListPosition.left
      const tabListBoundEnd = isRtl
        ? tabListPosition.right
        : tabListPosition.right + this.getOverlayWidth()

      const tabPositionStart = tabPosition.left
      const tabPositionEnd = tabPosition.right

      if (tabListBoundEnd > tabPositionEnd) {
        const offset = Math.round(tabListBoundEnd - tabPositionEnd)
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
        this._tabList.scrollTo({
          top: 0,
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
          left: this._tabList.scrollLeft + offset,
          behavior: 'smooth'
        })
      } else if (tabListBoundStart > tabPositionStart) {
        const offset = Math.round(tabListBoundStart - tabPositionStart)
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
        this._tabList.scrollTo({
          top: 0,
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
          left: this._tabList.scrollLeft - offset,
          behavior: 'smooth'
        })
      }
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleTabClick = (event, { index, id }) => {
    const nextTab = this.getNextTab(index, 0)
    this.fireOnChange(event, nextTab)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleTabKeyDown = (event, { index }) => {
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
      withTabListOverflow: this._tabList.scrollWidth > this._tabList.offsetWidth
    })

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabListPosition' does not exist on type... Remove this comment to see the full error message
    this._tabListPosition = getBoundingClientRect(this._tabList)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'startIndex' implicitly has an 'any' typ... Remove this comment to see the full error message
  getNextTab(startIndex, step) {
    const tabs = React.Children.toArray(this.props.children).map(
      (child) => matchComponentTypes(child, [Panel]) && child
    )
    const count = tabs.length
    const change = step < 0 ? step + count : step

    error(
      startIndex >= 0 && startIndex < count,
      `[Tabs] Invalid tab index: '${startIndex}'.`
    )

    let nextIndex = startIndex
    let nextTab

    do {
      nextIndex = (nextIndex + change) % count
      nextTab = tabs[nextIndex]
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
    } while (nextTab && nextTab.props && nextTab.props.isDisabled)

    error(
      nextIndex >= 0 && nextIndex < count,
      `[Tabs] Invalid tab index: '${nextIndex}'.`
    )
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
    return { index: nextIndex, id: nextTab.props.id }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  fireOnChange(event, { index, id }) {
    if (typeof this.props.onRequestTabChange === 'function') {
      this.props.onRequestTabChange(event, { index, id })
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'withTabListOverflow' does not exist on t... Remove this comment to see the full error message
    this.state.withTabListOverflow &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
      this.showActiveTabIfOverlayed(this._tabList.querySelector(`#tab-${id}`))
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
      key: `tab-${id}`,
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
    _index: number,
    generatedId: string,
    selected: boolean,
    panel: PanelChild
  ) {
    const id = panel.props.id || generatedId

    // fixHeight can be 0, so simply `fixheight` could return falsy value
    const hasFixedHeight = typeof this.props.fixHeight !== 'undefined'

    return safeCloneElement(panel, {
      id: panel.props.id || `panel-${id}`,
      labelledBy: `tab-${id}`,
      isSelected: selected,
      key: panel.props.id || `panel-${id}`,
      variant: this.props.variant,
      padding: panel.props.padding || this.props.padding,
      textAlign: panel.props.textAlign || this.props.textAlign,
      maxHeight: !hasFixedHeight ? this.props.maxHeight : undefined,
      minHeight: !hasFixedHeight ? this.props.minHeight : '100%'
    })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleFocusableRef = (el) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusable' does not exist on type 'Tabs... Remove this comment to see the full error message
    this._focusable = el
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleTabListRef = (el) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_tabList' does not exist on type 'Tabs'.
    this._tabList = el
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusable' does not exist on type 'Tabs... Remove this comment to see the full error message
    this._focusable &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusable' does not exist on type 'Tabs... Remove this comment to see the full error message
      typeof this._focusable.focus === 'function' &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_focusable' does not exist on type 'Tabs... Remove this comment to see the full error message
      this._focusable.focus()
  }

  render() {
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'panels' implicitly has type 'any[]' in s... Remove this comment to see the full error message
    const panels = []
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

    const selectedChildIndex = React.Children.toArray(children)
      .filter((child) => matchComponentTypes(child, [Panel]))
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
      .findIndex((child) => child.props.isSelected && !child.props.isDisabled)

    let index = 0
    const selectedIndex = selectedChildIndex >= 0 ? selectedChildIndex : 0

    React.Children.forEach(children, (child) => {
      if (matchComponentTypes(child, [Panel])) {
        const selected =
          !(child as PanelChild).props.isDisabled &&
          ((child as PanelChild).props.isSelected || selectedIndex === index)
        const id = uid()

        tabs.push(this.createTab(index, id, selected, child as PanelChild))
        panels.push(this.clonePanel(index, id, selected, child as PanelChild))

        index++
      } else {
        panels.push(child)
      }
    })

    const withScrollFade =
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'withTabListOverflow' does not exist on t... Remove this comment to see the full error message
      tabOverflow === 'scroll' && this.state.withTabListOverflow

    // suppress overlay whenever final Tab is active, or Firefox will cover it
    const scrollOverlay =
      selectedIndex !== React.Children.count(children) - 1 ? (
        <span key="overlay" css={styles?.scrollOverlay} />
      ) : null

    const scrollFadeEls = [
      // spacer element prevents final Tab from being obscured by scroll overflow gradient
      <span key="spacer" css={styles?.scrollSpacer} />,
      scrollOverlay
    ]

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
              >
                {tabs}
                {withScrollFade && scrollFadeEls}
              </View>
            </View>
          )}
        </Focusable>

        <div css={styles?.panelsContainer}>
          {/* @ts-expect-error ts-migrate(7005) FIXME: Variable 'panels' implicitly has an 'any[]' type. */}
          {panels}
        </div>
      </View>
    )
  }
}

export default Tabs
export { Tabs, Panel }