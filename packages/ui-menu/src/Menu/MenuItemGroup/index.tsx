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
import React, { Children, Component } from 'react'

import { withStyle, jsx } from '@instructure/emotion'
import {
  omitProps,
  safeCloneElement,
  matchComponentTypes,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { testable } from '@instructure/ui-testable'

import { MenuItem } from '../MenuItem'
import type { OnMenuItemSelect, MenuItemProps } from '../MenuItem/props'
import { MenuItemSeparator } from '../MenuItemSeparator'
import type { MenuSeparatorProps } from '../MenuItemSeparator/props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MenuGroupProps, MenuGroupState } from './props'

type MenuItemChild = React.ComponentElement<MenuItemProps, MenuItem>
type MenuSeparatorChild = React.ComponentElement<
  MenuSeparatorProps,
  MenuItemSeparator
>

import { generateId } from '@instructure/ui-utils'

/**
---
parent: Menu
id: Menu.Group
---
@tsProps
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class MenuItemGroup extends Component<MenuGroupProps, MenuGroupState> {
  static readonly componentId = 'Menu.Group'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    disabled: false,
    children: null,
    isTabbable: false,
    allowMultiple: false,
    defaultSelected: []
  }

  constructor(props: MenuGroupProps) {
    super(props)

    if (typeof props.selected === 'undefined') {
      this.state = {
        selected: this.selectedFromChildren(props) || props.defaultSelected!
      }
    }

    //@ts-expect-error props.instanceMapCounter
    this._labelId = generateId('MenuItemGroup', props.instanceMapCounter)
  }

  private _labelId: string
  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleSelect: OnMenuItemSelect = (e, value, selected, item) => {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.selected) {
      this.updateSelected(e, value, this.props.selected, selected, item)
    } else {
      this.setState((state) => {
        return {
          selected: this.updateSelected(
            e,
            value,
            state.selected,
            selected,
            item
          )
        }
      })
    }
  }

  updateSelected = (
    e: React.MouseEvent,
    value: MenuItemProps['value'],
    items: MenuGroupState['selected'],
    selected: MenuItemProps['selected'],
    item: MenuItem
  ) => {
    const { allowMultiple } = this.props
    let updated = allowMultiple ? [...items] : []
    const location = updated.indexOf(value!)

    if (selected === true && location < 0) {
      updated.push(value!)
    } else if (selected === false && location !== -1) {
      updated.splice(location, 1)
    } else if (!allowMultiple && updated.length < 1) {
      // don't allow nothing selected if it's not allowMultiple/checkbox
      updated = [...items]
    }

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(e, updated, selected, item)
    }

    return updated
  }

  selectedFromChildren(props: MenuGroupProps) {
    const { children, allowMultiple } = props
    const selected: MenuGroupState['selected'] = []

    const items = (Children.toArray(children) as (
      | MenuItemChild
      | MenuSeparatorChild
    )[]).filter((child) => {
      return matchComponentTypes<MenuItemChild>(child, [MenuItem])
    }) as MenuItemChild[]

    items.forEach((item, index) => {
      if (
        (selected.length === 0 || allowMultiple) &&
        (item.props.selected || item.props.defaultSelected)
      ) {
        selected.push(item.props.value || index)
      }
    })

    return selected.length > 0 ? selected : null
  }

  get selected() {
    if (
      typeof this.props.selected === 'undefined' &&
      typeof this.state.selected === 'undefined'
    ) {
      return []
    } else {
      return typeof this.props.selected === 'undefined'
        ? [...this.state.selected]
        : [...this.props.selected]
    }
  }

  renderLabel() {
    const { label } = this.props

    return hasVisibleChildren(label) ? (
      <span css={this.props.styles?.label}>{label}</span>
    ) : (
      label
    )
  }

  renderChildren() {
    const {
      disabled,
      controls,
      allowMultiple,
      isTabbable,
      onMouseOver
    } = this.props
    const children = this.props.children as (
      | MenuItemChild
      | MenuSeparatorChild
    )[]
    let index = -1

    return Children.map(children, (child) => {
      if (matchComponentTypes<MenuItemChild>(child, [MenuItem])) {
        ++index
        const value = child.props.value || index

        return (
          <li role="none">
            {' '}
            {safeCloneElement(child, {
              tabIndex: isTabbable && index === 0 ? 0 : -1,
              controls,
              value,
              children: child.props.children,
              type: allowMultiple ? 'checkbox' : 'radio',
              ref: this.props.itemRef,
              disabled: disabled || child.props.disabled,
              selected: this.selected.indexOf(value) > -1,
              onSelect: this.handleSelect,
              onMouseOver
            })}{' '}
          </li>
        )
      } else {
        return child
      }
    })
  }

  render() {
    const props = omitProps(this.props, MenuItemGroup.allowedProps)
    return (
      <span
        {...props}
        css={this.props.styles?.menuItemGroup}
        role="presentation"
        ref={this.handleRef}
      >
        <span id={this._labelId}>{this.renderLabel()}</span>
        <ul
          role="menu"
          css={this.props.styles?.items}
          aria-disabled={this.props.disabled ? 'true' : undefined}
          aria-labelledby={this._labelId}
        >
          {this.renderChildren()}
        </ul>
      </span>
    )
  }
}

export default MenuItemGroup
export { MenuItemGroup }
