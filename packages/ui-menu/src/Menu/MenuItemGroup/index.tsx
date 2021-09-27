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
import { Children, Component, ReactElement } from 'react'

import { withStyle, jsx } from '@instructure/emotion'
import {
  omitProps,
  safeCloneElement,
  matchComponentTypes
} from '@instructure/ui-react-utils'
import { uid } from '@instructure/uid'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { testable } from '@instructure/ui-testable'

import { MenuItem } from '../MenuItem'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MenuGroupProps } from './props'

/**
---
parent: Menu
id: Menu.Group
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class MenuItemGroup extends Component<MenuGroupProps> {
  static readonly componentId = 'Menu.Group'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    disabled: false,
    children: null,
    isTabbable: false,
    allowMultiple: false,
    defaultSelected: [],
    // @ts-expect-error ts-migrate(6133) FIXME: 'item' is declared but its value is never read.
    itemRef: function (item) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
    onSelect: function (e, value, selected, item) {}
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()

    if (typeof props.selected === 'undefined') {
      this.state = {
        selected: this.selectedFromChildren(props) || props.defaultSelected
      }
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_labelId' does not exist on type 'MenuIt... Remove this comment to see the full error message
    this._labelId = uid('MenuItemGroup')
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleSelect = (e, value, selected, item) => {
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
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
            state.selected,
            selected,
            item
          )
        }
      })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  updateSelected = (e, value, items, selected, item) => {
    const { allowMultiple } = this.props
    let updated = allowMultiple ? [...items] : []
    const location = updated.indexOf(value)

    if (selected === true && location < 0) {
      updated.push(value)
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  selectedFromChildren(props) {
    const { children, allowMultiple } = props
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'selected' implicitly has type 'any[]' in... Remove this comment to see the full error message
    const selected = []

    const items = Children.toArray(children).filter((child) => {
      return matchComponentTypes(child as MenuItem, [MenuItem])
    })

    items.forEach((item, index) => {
      if (
        (selected.length === 0 || allowMultiple) &&
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
        (item.props.selected || item.props.defaultSelected)
      ) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
        selected.push(item.props.value || index)
      }
    })

    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'selected' implicitly has an 'any[]' type... Remove this comment to see the full error message
    return selected.length > 0 ? selected : null
  }

  get selected() {
    if (
      typeof this.props.selected === 'undefined' &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
      typeof this.state.selected === 'undefined'
    ) {
      return []
    } else {
      return typeof this.props.selected === 'undefined'
        ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
          [...this.state.selected]
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
        // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
        const value = child.props.value || index

        return (
          <li role="none">
            {' '}
            {safeCloneElement(child as ReactElement, {
              tabIndex: isTabbable && index === 0 ? 0 : -1,
              controls,
              value,
              type: allowMultiple ? 'checkbox' : 'radio',
              ref: this.props.itemRef,
              // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
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
      >
        {/* @ts-expect-error ts-migrate(2339) FIXME: Property '_labelId' does not exist on type 'MenuIt... Remove this comment to see the full error message */}
        <span id={this._labelId}>{this.renderLabel()}</span>
        <ul
          role="menu"
          css={this.props.styles?.items}
          aria-disabled={this.props.disabled ? 'true' : undefined}
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_labelId' does not exist on type 'MenuIt... Remove this comment to see the full error message
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
