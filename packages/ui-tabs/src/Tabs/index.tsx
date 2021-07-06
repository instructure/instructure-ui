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
import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'

import keycode from 'keycode'

import { View } from '@instructure/ui-view'
import { Children } from '@instructure/ui-prop-types'
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
import { bidirectional, BidirectionalProps } from '@instructure/ui-i18n'

import { withStyle, jsx, ThemeablePropTypes } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Tab } from './Tab'
import { Panel } from './Panel'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  variant?: 'default' | 'secondary'
  screenReaderLabel?: string
  onRequestTabChange?: (...args: any[]) => any
  maxWidth?: string | number
  maxHeight?: string | number
  minHeight?: string | number
  margin?: any // TODO: ThemeablePropTypes.spacing
  padding?: any // TODO: ThemeablePropTypes.spacing
  textAlign?: 'start' | 'center' | 'end'
  elementRef?: (...args: any[]) => any
  tabOverflow?: 'stack' | 'scroll'
  shouldFocusOnRender?: boolean
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@bidirectional()
@testable()
class Tabs extends Component<Props & BidirectionalProps> {
  static componentId = 'Tabs'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * children of type `Tabs.Panel`
     */
    children: Children.oneOf([Panel, null]),
    variant: PropTypes.oneOf(['default', 'secondary']),
    /**
     * A screen ready only label for the list of tabs
     */
    screenReaderLabel: PropTypes.string,
    /**
     * Called when the selected tab should change
     */
    onRequestTabChange: PropTypes.func,
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
     */
    padding: ThemeablePropTypes.spacing,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    elementRef: PropTypes.func,
    /**
     * Choose whether Tabs should stack or scroll when they exceed the width of their
     * container.
     */
    tabOverflow: PropTypes.oneOf(['stack', 'scroll']),
    shouldFocusOnRender: PropTypes.bool,
    // eslint-disable-next-line react/require-default-props
    dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION))
  }

  static defaultProps = {
    variant: 'default',
    padding: undefined,
    textAlign: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    minHeight: undefined,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestTabChange: (event, { index, id }) => {},
    margin: undefined,
    children: null,
    elementRef: () => {},
    screenReaderLabel: undefined,
    shouldFocusOnRender: false,
    tabOverflow: 'stack'
  }

  static Panel = Panel
  static Tab = Tab

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

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
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

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
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

  // @ts-expect-error TODO not all codepaths return a value!
  getOverlayWidth() {
    const { variant, tabOverflow, styles } = this.props

    if (tabOverflow === 'scroll') {
      if (variant === 'default') {
        return px(styles.scrollOverlayWidthDefault)
      } else {
        return px(styles.scrollOverlayWidthSecondary)
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
      const isRtl = dir === bidirectional.DIRECTION.rtl

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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
  createTab(index, generatedId, selected, panel) {
    const id = panel.props.id || generatedId

    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    return createElement(Tab, {
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

  // @ts-expect-error ts-migrate(6133) FIXME: 'index' is declared but its value is never read.
  clonePanel(index, generatedId, selected, panel) {
    const id = panel.props.id || generatedId

    return safeCloneElement(panel, {
      id: panel.props.id || `panel-${id}`,
      labelledBy: `tab-${id}`,
      isSelected: selected,
      key: panel.props.id || `panel-${id}`,
      variant: this.props.variant,
      padding: panel.props.padding || this.props.padding,
      textAlign: panel.props.textAlign || this.props.textAlign,
      maxHeight: panel.maxHeight || this.props.maxHeight,
      minHeight: panel.minHeight || this.props.minHeight
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
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'tabs' implicitly has type 'any[]' in som... Remove this comment to see the full error message
    const tabs = []
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
          // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
          !child.props.isDisabled &&
          // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
          (child.props.isSelected || selectedIndex === index)
        const id = uid()

        tabs.push(this.createTab(index, id, selected, child))
        panels.push(this.clonePanel(index, id, selected, child))

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
        <span key="overlay" css={styles.scrollOverlay} />
      ) : null

    const scrollFadeEls = [
      // spacer element prevents final Tab from being obscured by scroll overflow gradient
      <span key="spacer" css={styles.scrollSpacer} />,
      scrollOverlay
    ]

    return (
      <View
        {...passthroughProps(props)}
        elementRef={elementRef}
        maxWidth={maxWidth}
        margin={margin}
        as="div"
        // @ts-expect-error ts-migrate(2322) FIXME:
        css={styles.container}
      >
        <Focusable ref={this.handleFocusableRef}>
          {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'focusVisible' implicitly has an '... Remove this comment to see the full error message */}
          {({ focusVisible }) => (
            <View
              as="div"
              position="relative"
              borderRadius="medium"
              withFocusOutline={focusVisible}
              shouldAnimateFocus={false}
              // @ts-expect-error ts-migrate(2322) FIXME:
              css={styles.tabs}
            >
              <View
                as="div"
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any[]; as: string; role: string;... Remove this comment to see the full error message
                role="tablist"
                css={styles.tabList}
                aria-label={screenReaderLabel}
                elementRef={this.handleTabListRef}
              >
                {/* @ts-expect-error ts-migrate(7005) FIXME: Variable 'tabs' implicitly has an 'any[]' type. */}
                {tabs}
                {withScrollFade && scrollFadeEls}
              </View>
            </View>
          )}
        </Focusable>
        {/* @ts-expect-error ts-migrate(7005) FIXME: Variable 'panels' implicitly has an 'any[]' type. */}
        {panels}
      </View>
    )
  }
}

export default Tabs
export { Tabs, Panel }
