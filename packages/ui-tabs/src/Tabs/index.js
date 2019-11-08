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

import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import keycode from 'keycode'

import { View } from '@instructure/ui-view'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { Children } from '@instructure/ui-prop-types'
import { deprecated, matchComponentTypes, safeCloneElement, passthroughProps } from '@instructure/ui-react-utils'
import { error } from '@instructure/console/macro'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'
import { Focusable } from '@instructure/ui-focusable'

import { Tab } from './Tab'
import { Panel } from './Panel'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@deprecated('7.0.0', {
  size: 'maxWidth',
  selectedIndex: true,
  onChange: 'onRequestTabChange',
  focus: 'shouldFocusOnRender'
})
@testable()
@themeable(theme, styles)
class Tabs extends Component {
  static propTypes = {
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
    shouldFocusOnRender: PropTypes.bool,
    /**
    * deprecated
    */
    onChange: PropTypes.func,
    /**
    * deprecated
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * deprecated
    */
    selectedIndex: PropTypes.number,
    /**
    * deprecated
    */
    focus: PropTypes.bool
  }

  static defaultProps = {
    selectedIndex: undefined,
    variant: 'default',
    padding: undefined,
    textAlign: undefined,
    size: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    minHeight: undefined,
    onChange: undefined,
    onRequestTabChange: (event, { index, id }) => {},
    margin: undefined,
    children: null,
    elementRef: (el) => {},
    screenReaderLabel: undefined,
    focus: undefined,
    shouldFocusOnRender: false
  }

  static Panel = Panel
  static Tab = Tab

  componentDidMount () {
    if (this.props.focus || this.props.shouldFocusOnRender) {
      this.focus()
    }
  }

  componentDidUpdate (prevProps) {
    if ((this.props.focus && !prevProps.focus) || (this.props.shouldFocusOnRender && !prevProps.shouldFocusOnRender)) {
      this.focus()
    }
  }

  handleTabClick = (event, { index, id }) => {
    const nextTab = this.getNextTab(index, 0)
    this.fireOnChange(event, nextTab)
  }

  handleTabKeyDown = (event, { index }) => {
    let nextTab

    if (event.keyCode === keycode.codes.up || event.keyCode === keycode.codes.left) {
      // Select next tab to the left
      nextTab = this.getNextTab(index, -1)
    } else if (event.keyCode === keycode.codes.down || event.keyCode === keycode.codes.right) {
      // Select next tab to the right
      nextTab = this.getNextTab(index, 1)
    }

    if (nextTab) {
      event.preventDefault()
      this.fireOnChange(event, nextTab)
    }
  }

  getNextTab (startIndex, step) {
    const tabs = React.Children.toArray(this.props.children)
      .map(child => matchComponentTypes(child, [Panel]) && child)
    const count = tabs.length
    const change = (step < 0) ? step + count : step

    error((startIndex >= 0 && startIndex < count), `[Tabs] Invalid tab index: '${startIndex}'.`)

    let nextIndex = startIndex
    let nextTab

    do {
      nextIndex = (nextIndex + change) % count
      nextTab = tabs[nextIndex]
    } while (nextTab && nextTab.props && (nextTab.props.disabled || nextTab.props.isDisabled))

    error((nextIndex >= 0 && nextIndex < count), `[Tabs] Invalid tab index: '${nextIndex}'.`)

    return { index: nextIndex, id: nextTab.props.id }
  }

  fireOnChange (event, { index, id }) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, { index })
    }

    if (typeof this.props.onRequestTabChange === 'function') {
      this.props.onRequestTabChange(event, { index, id })
    }
  }

  createTab (index, generatedId, selected, panel) {
    const id = panel.props.id || generatedId
    const disabled = panel.props.disabled || panel.props.isDisabled

    return createElement(Tab, {
      variant: this.props.variant,
      key: `tab-${id}`,
      id: `tab-${id}`,
      controls: panel.props.id || `panel-${id}`,
      index,
      selected: undefined,
      isSelected: selected,
      disabled: undefined,
      isDisabled: disabled,
      children: panel.props.renderTitle || panel.props.title,
      onClick: this.handleTabClick,
      onKeyDown: this.handleTabKeyDown
    })
  }

  clonePanel (index, generatedId, selected, panel) {
    const id = panel.props.id || generatedId

    return safeCloneElement(panel, {
      id: panel.props.id || `panel-${id}`,
      labelledBy: `tab-${id}`,
      selected: undefined,
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

  focus () {
    this._focusable && typeof this._focusable.focus === 'function' && this._focusable.focus()
  }

  render () {
    const panels = []
    const tabs = []
    const {
      children,
      elementRef,
      size,
      maxWidth,
      variant,
      margin,
      screenReaderLabel,
      onRequestTabChange,
      onChange,
      ...props
    } = this.props

    const selectedChildIndex = React.Children.toArray(children)
      .filter(child => matchComponentTypes(child, [Panel]))
      .findIndex(child => (child.props.selected || child.props.isSelected) && !(child.props.disabled || child.props.isDisabled))

    let index = 0
    let selectedIndex = props.selectedIndex || (selectedChildIndex >= 0 ? selectedChildIndex : 0)

    React.Children.forEach(children, (child) => {
      if (matchComponentTypes(child, [Panel])) {
        const selected = !(child.props.disabled || child.props.isDisabled) &&
          (child.props.selected || child.props.isSelected || selectedIndex === index)
        const id = uid()

        tabs.push(this.createTab(index, id, selected, child))
        panels.push(this.clonePanel(index, id, selected, child))

        index ++
      } else {
        panels.push(child)
      }
    })

    return (
      <View
        {...passthroughProps(props)}
        elementRef={elementRef}
        maxWidth={maxWidth ? maxWidth : this.theme[size]}
        margin={margin}
        as="div"
        className={classnames({
          [styles[variant]]: true
        })}
      >
        <Focusable ref={this.handleFocusableRef}>
          {({ focusVisible }) => (
            <View
              as="div"
              display="flex"
              position="relative"
              borderRadius="medium"
              withFocusOutline={focusVisible}
              shouldAnimateFocus={false}
              role="tablist"
              className={styles.tabs}
              aria-label={screenReaderLabel}
            >
              {tabs}
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
