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

import { View } from '@instructure/ui-layout'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { Children, controllable } from '@instructure/ui-prop-types'
import { matchComponentTypes, safeCloneElement } from '@instructure/ui-react-utils'
import { error } from '@instructure/console/macro'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'

import { Tab } from './Tab'
import { TabPanel } from './TabPanel'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/

@testable()
@themeable(theme, styles)
class TabList extends Component {
  static propTypes = {
    /**
    * children of type `TabPanel`
    */
    children: Children.oneOf([TabPanel, null]),

    variant: PropTypes.oneOf(['simple', 'minimal']),
    /**
    * the index (zero based) of the panel that should be selected on initial render
    */
    defaultSelectedIndex: PropTypes.number,
    /**
    * the index (zero based) of the panel that should be selected (should be accompanied by `onChange`)
    */
    selectedIndex: controllable(PropTypes.number, 'onChange', 'defaultSelectedIndex'),
    /**
    * Call this function when the selected tab changes. When used with `selectedIndex`,
    * the component will not control its own state.
    */
    onChange: PropTypes.func,
    /**
    * the selected tab should be focused
    */
    focus: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
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
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
  }

  static defaultProps = {
    variant: 'simple',
    focus: false,
    defaultSelectedIndex: 0,
    padding: undefined,
    textAlign: undefined,
    size: undefined,
    selectedIndex: undefined,
    onChange: undefined,
    margin: undefined,
    children: null
  }

  static Panel = TabPanel
  static Tab = Tab

  constructor (props) {
    super()

    this.state = {
      focus: props.focus
    }

    if (typeof props.selectedIndex === 'undefined') {
      this.state.selectedIndex = props.defaultSelectedIndex
    }

    this._tabs = []
    this._panels = []
    this._srTabs = []
  }

  componentWillReceiveProps (nextProps) {
    const { focus, selectedIndex } = this.props
    const { focus: nextFocus, selectedIndex: nextSelectedIndex } = nextProps

    if (nextFocus !== focus || nextSelectedIndex !== selectedIndex) {
      this.setState({ focus: nextFocus })
    }
  }

  handleClick = (tabIndex, e) => {
    const tab = this.getTab(tabIndex)

    if (!tab.props.disabled) {
      this.setSelected(tabIndex)
    }
  }

  handleEnter = (tabIndex, e) => {
    if (e.keyCode !== keycode.codes.enter && e.keyCode !== keycode.codes.return) {
      return
    }

    const tab = this.getTab(tabIndex)

    if (!tab.props.disabled) {
      this.setSelected(tabIndex)
    }
  }

  handleKeyDown = (tabIndex, e) => {
    let index = this.selectedIndex
    let preventDefault = false

    if (e.keyCode === keycode.codes.up || e.keyCode === keycode.codes.left) {
      // Select next tab to the left
      index = this.getIndex(index, -1)
      preventDefault = true
    } else if (e.keyCode === keycode.codes.down || e.keyCode === keycode.codes.right) {
      // Select next tab to the right
      index = this.getIndex(index, 1)
      preventDefault = true
    }

    if (preventDefault) {
      e.preventDefault()
    }

    this.setSelected(index)
  }

  get selectedIndex () {
    return (typeof this.props.selectedIndex === 'undefined') ? this.state.selectedIndex : this.props.selectedIndex
  }

  get tabIds () {
    // cache tab ids for better performance and to prevent errors with animations
    const ids = this._tabIds || []
    let diff = ids.length - this.tabs.length

    while (diff++ < 0) {
      ids.push(uid('Tab'))
    }

    this._tabIds = ids

    return ids
  }

  get tabs () {
    return React.Children.toArray(this.props.children).map((child) => {
      return matchComponentTypes(child, [TabPanel]) && child
    })
  }

  setSelected (index) {
    let selectedIndex

    // Check index boundary
    error(this.isValidIndex(index), `[TabList] Invalid tab index: '${index}'.`)

    const handleChange = () => {
      if (typeof selectedIndex !== 'undefined' && typeof this.props.onChange === 'function') {
        this.props.onChange(index, selectedIndex)
      }
    }

    if (typeof this.props.selectedIndex === 'undefined') {
      this.setState((state, props) => {
        selectedIndex = state.selectedIndex

        if (index !== selectedIndex) {
          handleChange()
          return { selectedIndex: index, focus: true }
        } else {
          return state
        }
      })
    } else {
      selectedIndex = this.props.selectedIndex
      if (index !== selectedIndex) {
        handleChange()
      }
    }
  }

  getIndex (startIndex, step) {
    const count = this.tabs.length
    const change = (step < 0) ? step + count : step

    error(this.isValidIndex(startIndex), `[Tablist] Invalid tab index: '${startIndex}'`)

    let index = startIndex
    do {
      index = (index + change) % count
    } while (this.getTab(index).props.disabled)

    return index
  }

  isValidIndex (index) {
    return (index >= 0 && index < this.tabs.length)
  }

  getTab (index) {
    return this._tabs[index]
  }

  createScreenReaderTab (index, id, props) {
    return createElement(Tab, {
      variant: 'screenreader-only',
      ref: (c) => {
        this._srTabs[index] = c
      },
      key: `sr-tab-${id}`,
      id: `sr-tab-${id}`,
      controls: `panel-${id}`,
      index,
      selected: false,
      disabled: props.disabled,
      children: props.title,
      onKeyDown: this.handleEnter,
      onClick: this.handleClick
    })
  }

  createTab (index, id, selected, props) {
    const focus = selected && this.state.focus

    return createElement(Tab, {
      variant: this.props.variant,
      ref: (c) => {
        this._tabs[index] = c
        if (typeof props.tabRef === 'function') {
          props.tabRef(c)
        }
      },
      key: `tab-${id}`,
      id: `tab-${id}`,
      controls: `panel-${id}`,
      index,
      selected,
      focus,
      role: selected ? 'tab' : 'presentation', // only the selected tab should be visible to screen readers
      disabled: props.disabled,
      children: props.title,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown
    })
  }

  clonePanel (index, id, selected, panel) {
    return safeCloneElement(panel, {
      ref: (c) => {
        this._panels[index] = c
      },
      id: `panel-${id}`,
      labelledBy: `tab-${id}`,
      selected,
      key: `panel-${id}`,
      variant: this.props.variant,
      padding: panel.props.padding || this.props.padding,
      textAlign: panel.props.textAlign || this.props.textAlign
    })
  }

  renderChildren () {
    const children = []
    const ids = this.tabIds
    const tabs = this.tabs
    const count = tabs.length

    React.Children.forEach(this.props.children, (child, index) => {
      if (matchComponentTypes(child, [TabPanel])) {
        const selected = !child.props.disabled && (this.selectedIndex === index)
        const id = ids[index]

        // render screen reader only tabs before the selected tab
        if (selected) {
          for (let i = 0; i < index; i++) {
            children.push(this.createScreenReaderTab(i, ids[i], tabs[i].props))
          }
        }

        children.push(this.createTab(index, id, selected, child.props))

        // render screen reader only tabs after the selected tab
        if (selected) {
          for (let i = index + 1; i < count; i++) {
            children.push(this.createScreenReaderTab(i, ids[i], tabs[i].props))
          }
        }

        children.push(this.clonePanel(index, id, selected, child))
      } else {
        children.push(child)
      }
    })

    if (this.state.focus) {
      // This fixes an issue with focus management.
      //
      // Ultimately, when focus is true, and an input has focus,
      // and any change on that input causes a state change/re-render,
      // focus gets sent back to the active tab, and input loses focus.
      //
      // Since the focus state only needs to be remembered
      // for the current render, we can reset it once the
      // render has happened.
      //
      // Don't use setState, because we don't want to re-render.
      this.state.focus = false // eslint-disable-line react/no-direct-mutation-state
    }

    return children
  }

  render () {
    return (
      <View
        className={classnames({
          [styles[this.props.variant]]: true
        })}
        maxWidth={this.theme[this.props.size]}
        margin={this.props.margin}
        role="tablist"
      >
        {this.renderChildren()}
      </View>
    )
  }
}

export default TabList
export { TabList, TabPanel }
