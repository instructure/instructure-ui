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
import { Component } from 'react'
import keycode from 'keycode'

import { IconCheckSolid, IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { uid } from '@instructure/uid'
import { omitProps, getElementType } from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { isActiveElement, findDOMNode } from '@instructure/ui-dom-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import { MenuContext } from '../../MenuContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MenuItemProps } from './props'

/**
---
parent: Menu
id: Menu.Item
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class MenuItem extends Component<MenuItemProps> {
  static readonly componentId = 'Menu.Item'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    type: 'button',
    disabled: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
    onSelect: function (e, value, selected, item) {}
  } as const

  static contextType = MenuContext

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()

    if (typeof props.selected === 'undefined') {
      this.state = {
        selected: props.defaultSelected
      }
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'labelId' does not exist on type 'MenuIte... Remove this comment to see the full error message
    this.labelId = uid('MenuItem__label')
  }

  get _node() {
    console.warn(
      '_node property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }
  ref: Element | null = null
  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
    const context = this.context

    if (context && context.registerMenuItem) {
      context.registerMenuItem(this)
    }
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentWillUnmount() {
    const context = this.context

    if (context && context.removeMenuItem) {
      context.removeMenuItem(this)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleClick = (e) => {
    const { onSelect, onClick, disabled, value } = this.props
    const selected = !this.selected

    if (disabled) {
      e.preventDefault()
      return
    }

    if (typeof this.props.selected === 'undefined') {
      this.setState({ selected })
    }

    if (typeof onSelect === 'function') {
      e.persist()
      onSelect(e, value, selected, this)
    }

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleKeyDown = (e) => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter

    if (spaceKey || enterKey) {
      e.preventDefault()
      e.stopPropagation()

      if (enterKey) {
        // handle space key on keyUp for FF
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ref' does not exist on type 'MenuItem'... Remove this comment to see the full error message
        findDOMNode(this.ref).click() // eslint-disable-line react/no-find-dom-node
      }
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleKeyUp = (e) => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter

    if (spaceKey || enterKey) {
      e.preventDefault()
      e.stopPropagation()

      if (spaceKey) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ref' does not exist on type 'MenuItem'... Remove this comment to see the full error message
        findDOMNode(this.ref).click() // eslint-disable-line react/no-find-dom-node
      }
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleMouseOver = (event) => {
    this.focus()

    if (typeof this.props.onMouseOver === 'function') {
      this.props.onMouseOver(event, this)
    }
  }

  get elementType() {
    return getElementType(MenuItem, this.props)
  }

  get role() {
    switch (this.props.type) {
      case 'checkbox':
        return 'menuitemcheckbox'
      case 'radio':
        return 'menuitemradio'
      case 'flyout':
        return 'button'
      default:
        return 'menuitem'
    }
  }

  get selected() {
    return typeof this.props.selected === 'undefined'
      ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
        this.state.selected
      : this.props.selected
  }

  get focused() {
    return isActiveElement(this.ref)
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ref' does not exist on type 'MenuItem'... Remove this comment to see the full error message
    findDOMNode(this.ref).focus() // eslint-disable-line react/no-find-dom-node
  }

  renderContent() {
    const { children, type } = this.props

    return (
      <span>
        {(type === 'checkbox' || type === 'radio') && (
          <span css={this.props.styles?.icon}>
            {this.selected && <IconCheckSolid />}
          </span>
        )}
        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'labelId' does not exist on type 'MenuIte... Remove this comment to see the full error message */}
        <span css={this.props.styles?.label} id={this.labelId}>
          {children}
        </span>
        {type === 'flyout' && (
          <span css={this.props.styles?.icon}>
            <IconArrowOpenEndSolid />
          </span>
        )}
      </span>
    )
  }

  render() {
    const { disabled, controls, onKeyDown, onKeyUp, type, href } = this.props

    const props = omitProps(this.props, MenuItem.allowedProps)
    const ElementType = this.elementType

    return (
      <ElementType // eslint-disable-line jsx-a11y/mouse-events-have-key-events
        // @ts-expect-error TODO: `ref` prop causes: "Expression produces a union type that is too complex to represent.ts(2590)"
        tabIndex={-1} // note: tabIndex can be overridden by Menu or MenuItemGroup components
        {...props}
        href={href}
        role={this.role}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'labelId' does not exist on type 'MenuIte... Remove this comment to see the full error message
        aria-labelledby={this.labelId}
        aria-disabled={disabled ? 'true' : undefined}
        aria-controls={controls}
        aria-checked={
          type === 'checkbox' || type === 'radio'
            ? this.selected
              ? 'true'
              : 'false'
            : undefined
        }
        onClick={this.handleClick}
        onKeyUp={createChainedFunction(onKeyUp, this.handleKeyUp)}
        onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
        ref={this.handleRef}
        css={this.props.styles?.menuItem}
        onMouseOver={this.handleMouseOver}
      >
        {this.renderContent()}
      </ElementType>
    )
  }
}

export default MenuItem
export { MenuItem }