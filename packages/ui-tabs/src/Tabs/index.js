/* eslint-disable react/require-default-props */
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
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { Children } from '@instructure/ui-prop-types'
import {
  matchComponentTypes,
  safeCloneElement,
  passthroughProps
} from '@instructure/ui-react-utils'
import { error } from '@instructure/console/macro'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'
import { Focusable } from '@instructure/ui-focusable'
import {
  addResizeListener,
  getBoundingClientRect
} from '@instructure/ui-dom-utils'
import { debounce } from '@instructure/debounce'
import { px } from '@instructure/ui-utils'
import { bidirectional } from '@instructure/ui-i18n'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Tab } from './Tab'
import { Panel } from './Panel'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
@bidirectional()
class Tabs extends Component {
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
    dir: PropTypes.oneOf(Object.values(bidirectional.DIRECTION)),
    rtl: PropTypes.bool,
    ltr: PropTypes.bool
  }

  static defaultProps = {
    variant: 'default',
    padding: undefined,
    textAlign: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    minHeight: undefined,
    onRequestTabChange: (event, { index, id }) => {},
    margin: undefined,
    children: null,
    elementRef: (el) => {},
    screenReaderLabel: undefined,
    shouldFocusOnRender: false,
    tabOverflow: 'stack'
  }

  static Panel = Panel
  static Tab = Tab

  constructor(props) {
    super(props)

    this._tabList = null
    this._tabListPosition = null

    this.state = {
      withTabListOverflow: false
    }
  }

  componentDidMount() {
    if (this.props.tabOverflow === 'scroll' && this._tabList) {
      this.startScrollOverflow()
    }

    if (this.props.shouldFocusOnRender) {
      this.focus()
    }

    this.props.makeStyles()
  }

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
      this._tabList &&
      !prevState.withTabListOverflow &&
      this.state.withTabListOverflow
    ) {
      const activeTabEl = this._tabList.querySelector('[aria-selected="true"]')
      this.showActiveTabIfOverlayed(activeTabEl)
    }

    this.props.makeStyles()
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
    this._resizeListener = addResizeListener(this._tabList, this._debounced)
    this._tabListPosition = getBoundingClientRect(this._tabList)
  }

  cancelScrollOverflow() {
    if (this._resizeListener) {
      this._resizeListener.remove()
    }

    if (this._debounced) {
      this._debounced.cancel()
    }
  }

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

  showActiveTabIfOverlayed(activeTabEl) {
    if (
      this._tabList &&
      this._tabListPosition &&
      typeof this._tabList.scrollTo === 'function' // test for scrollTo support
    ) {
      const { rtl } = this.props

      const tabPosition = getBoundingClientRect(activeTabEl)
      const tabListPosition = this._tabListPosition

      const tabListBoundStart = rtl
        ? tabListPosition.left + this.getOverlayWidth()
        : tabListPosition.left
      const tabListBoundEnd = rtl
        ? tabListPosition.right
        : tabListPosition.right + this.getOverlayWidth()

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

  handleTabClick = (event, { index, id }) => {
    const nextTab = this.getNextTab(index, 0)
    this.fireOnChange(event, nextTab)
  }

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
      withTabListOverflow: this._tabList.scrollWidth > this._tabList.offsetWidth
    })

    this._tabListPosition = getBoundingClientRect(this._tabList)
  }

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
    } while (nextTab && nextTab.props && nextTab.props.isDisabled)

    error(
      nextIndex >= 0 && nextIndex < count,
      `[Tabs] Invalid tab index: '${nextIndex}'.`
    )
    return { index: nextIndex, id: nextTab.props.id }
  }

  fireOnChange(event, { index, id }) {
    if (typeof this.props.onRequestTabChange === 'function') {
      this.props.onRequestTabChange(event, { index, id })
    }

    this.state.withTabListOverflow &&
      this.showActiveTabIfOverlayed(this._tabList.querySelector(`#tab-${id}`))
  }

  createTab(index, generatedId, selected, panel) {
    const id = panel.props.id || generatedId

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

  handleFocusableRef = (el) => {
    this._focusable = el
  }

  handleTabListRef = (el) => {
    this._tabList = el
  }

  focus() {
    this._focusable &&
      typeof this._focusable.focus === 'function' &&
      this._focusable.focus()
  }

  render() {
    const panels = []
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
      .findIndex((child) => child.props.isSelected && !child.props.isDisabled)

    let index = 0
    let selectedIndex = selectedChildIndex >= 0 ? selectedChildIndex : 0

    React.Children.forEach(children, (child) => {
      if (matchComponentTypes(child, [Panel])) {
        const selected =
          !child.props.isDisabled &&
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
        css={styles.container}
      >
        <Focusable ref={this.handleFocusableRef}>
          {({ focusVisible }) => (
            <View
              as="div"
              position="relative"
              borderRadius="medium"
              withFocusOutline={focusVisible}
              shouldAnimateFocus={false}
              css={styles.tabs}
            >
              <View
                as="div"
                role="tablist"
                css={styles.tabList}
                aria-label={screenReaderLabel}
                elementRef={this.handleTabListRef}
              >
                {tabs}
                {withScrollFade && scrollFadeEls}
              </View>
            </View>
          )}
        </Focusable>
        {panels}
      </View>
    )
  }
}

export default Tabs
export { Tabs, Panel }
