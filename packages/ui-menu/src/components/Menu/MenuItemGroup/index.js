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

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'
import uid from '@instructure/ui-utils/lib/uid'

import hasVisibleChildren from '../../../../../ui-core/lib/utils/hasVisibleChildren'

import MenuItem from '../MenuItem'
import MenuItemSeparator from '../MenuItemSeparator'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Menu
---
**/
@themeable(theme, styles)
class MenuItemGroup extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    allowMultiple: PropTypes.bool,
    /**
    * children of type `MenuItem`, `MenuItemSeparator`
    */
    children: CustomPropTypes.Children.oneOf([MenuItem, MenuItemSeparator]),
    /**
    * an array of the values (or indeces by default) for the selected items
    */
    selected: CustomPropTypes.controllable(PropTypes.array, 'onSelect', 'defaultSelected'),
    /**
    * an array of the values (or indeces by default) for the selected items on initial render
    */
    defaultSelected: PropTypes.array,
    /**
    * call this function when a menu item is selected
    */
    onSelect: PropTypes.func,
    onMouseOver: PropTypes.func,
    onKeyDown: PropTypes.func,
    /**
    * the id of the element that the menu items will act upon
    */
    controls: PropTypes.string,
    /**
    * returns a reference to the `MenuItem`
    */
    itemRef: PropTypes.func,
    disabled: PropTypes.bool,
    /**
    * should the group appear in the tab order (the first item will have a tabIndex of 0)
    */
    isTabbable: PropTypes.bool
  }

  static defaultProps = {
    isTabbable: false,
    allowMultiple: false,
    defaultSelected: [],
    itemRef: function (item) {},
    onSelect: function (e, selected) {}
  }

  constructor (props) {
    super()

    if (props.selected === undefined) {
      this.state = {
        selected: this.selectedFromChildren(props.children, props.allowMultiple) || props.defaultSelected
      }
    }

    this._labelId = `MenuItemGroup__${uid()}`
  }

  handleSelect = (e, value, selected) => {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    const newSelected = this.props.allowMultiple ? this.selected : []
    const location = newSelected.indexOf(value)

    if (selected && location < 0) {
      newSelected.push(value)
    } else if (!selected && location !== -1) {
      newSelected.splice(location, 1)
    }

    if (this.props.selected === undefined) {
      this.setState({ selected: newSelected })
    }

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(e, newSelected)
    }
  }

  selectedFromChildren (children, allowMultiple) {
    const selected = []

    const items = Children.toArray(children).filter((child) => {
      return (matchComponentTypes(child, [MenuItem]))
    })

    items.forEach((item, index) => {
      if ((selected.length === 0 || allowMultiple) &&
        (item.props.selected || item.props.defaultSelected)) {
        selected.push(item.props.value || index)
      }
    })

    return selected.length > 0 ? selected : null
  }

  get selected () {
    if (this.props.selected === undefined && this.state.selected === undefined) {
      return []
    } else {
      return (this.props.selected === undefined) ? [...this.state.selected] : [...this.props.selected]
    }
  }

  renderLabel () {
    const { label } = this.props

    return hasVisibleChildren(label) ? (
      <span className={styles.label}>{label}</span>
    ) : label
  }

  renderChildren () {
    const {
      children,
      disabled,
      controls,
      allowMultiple,
      isTabbable,
      onMouseOver
    } = this.props

    let index = -1

    return Children.map(children, (child) => {
      if (matchComponentTypes(child, [MenuItem])) {
        ++index
        const value = child.props.value || index
        return (<li> {
          safeCloneElement(child, {
            tabIndex: (isTabbable && index === 0) ? 0 : -1,
            controls,
            value,
            type: allowMultiple ? 'checkbox' : 'radio',
            ref: this.props.itemRef,
            disabled: (disabled || child.props.disabled),
            selected: this.selected.indexOf(value) > -1,
            onSelect: this.handleSelect,
            onMouseOver
          })
        } </li>)
      } else {
        return child
      }
    })
  }

  render () {
    const props = omitProps(this.props, MenuItemGroup.propTypes)
    return (
      <span
        {...props}
        className={styles.root}
        role="presentation"
      >
        <span id={this._labelId}>{this.renderLabel()}</span>
        <ul
          role="group"
          className={styles.items}
          aria-disabled={this.props.disabled ? 'true' : null}
          aria-labelledby={this._labelId}
        >
          {this.renderChildren()}
        </ul>
      </span>
    )
  }
}

export default MenuItemGroup
