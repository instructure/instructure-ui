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
import { Focusable } from '@instructure/ui-focusable'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { Children, controllable } from '@instructure/ui-prop-types'
import { deprecated, matchComponentTypes, safeCloneElement, passthroughProps } from '@instructure/ui-react-utils'
import { error } from '@instructure/console/macro'
import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'

import { Tab } from './Tab'
import { TabPanel } from './TabPanel'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/deprecated
id: DeprecatedTabList
---
**/
@deprecated('7.0.0', null, 'Use the Tabs component instead.')
@testable()
@themeable(theme, styles)
class TabList extends Component {
  static propTypes = {
    /**
    * children of type `TabList.Panel`
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
    elementRef: PropTypes.func
  }

  static defaultProps = {
    variant: 'simple',
    focus: false,
    defaultSelectedIndex: 0,
    padding: undefined,
    textAlign: undefined,
    size: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    minHeight: undefined,
    selectedIndex: undefined,
    onChange: undefined,
    margin: undefined,
    children: null,
    elementRef: (el) => {}
  }

  static Panel = TabPanel
  static Tab = Tab

  constructor (props) {
    super()

    this.state = {}

    if (typeof props.selectedIndex === 'undefined') {
      this.state.selectedIndex = props.defaultSelectedIndex
    }

    this._tabs = []
    this._panels = []
  }

  componentDidMount () {
    if (this.props.focus) {
      this.focus()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.focus && !prevProps.focus) {
      this.focus()
    }
  }

  handleClick = (tabIndex, e) => {
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
          return { selectedIndex: index }
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

  createTab (index, cachedId, selected, props) {
    const id = props.id || cachedId
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
      disabled: props.disabled,
      children: props.title,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown
    })
  }

  clonePanel (index, cachedId, selected, panel) {
    const id = panel.props.id || cachedId
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
    const ids = this.tabIds
    const {
      children,
      size,
      maxWidth,
      elementRef,
      variant,
      margin,
      onChange,
      ...props
    } = this.props

    let selectedIndex = React.Children.toArray(children)
      .filter(child => matchComponentTypes(child, [TabPanel]))
      .findIndex((child, index) => !child.props.disabled && index === this.selectedIndex)

    let index = 0

    selectedIndex = selectedIndex >= 0 ? selectedIndex : 0

    React.Children.forEach(children, (child) => {
      if (matchComponentTypes(child, [TabPanel])) {
        const selected = !child.props.disabled && (selectedIndex === index)
        const id = ids[index]

        tabs.push(this.createTab(index, id, selected, child.props))
        panels.push(this.clonePanel(index, id, selected, child))

        index++
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

export default TabList
export { TabList, TabPanel }
