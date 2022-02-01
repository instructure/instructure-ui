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
import {
  omitProps,
  getElementType,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { isActiveElement, findDOMNode } from '@instructure/ui-dom-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import { MenuContext } from '../../MenuContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { MenuItemProps, MenuItemState } from './props'

/**
---
parent: Menu
id: Menu.Item
---
@tsProps
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class MenuItem extends Component<MenuItemProps, MenuItemState> {
  static readonly componentId = 'Menu.Item'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    type: 'button',
    disabled: false
  } as const

  static contextType = MenuContext

  constructor(props: MenuItemProps) {
    super(props)

    if (typeof props.selected === 'undefined') {
      this.state = {
        selected: !!props.defaultSelected
      }
    }

    this.labelId = props.deterministicId!('MenuItem__label')
  }

  get _node() {
    console.warn(
      '_node property is deprecated and will be removed in v9, please use ref instead'
    )

    return this.ref
  }

  labelId: string
  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
    const context = this.context

    if (context && context.registerMenuItem) {
      context.registerMenuItem(this)
    }
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  componentWillUnmount() {
    const context = this.context

    if (context && context.removeMenuItem) {
      context.removeMenuItem(this)
    }
  }

  handleClick = (e: React.MouseEvent) => {
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

  handleKeyDown = (e: React.KeyboardEvent) => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter

    if (spaceKey || enterKey) {
      e.preventDefault()
      e.stopPropagation()

      if (enterKey) {
        // handle space key on keyUp for FF
        const refNode = findDOMNode(this.ref) as HTMLElement
        refNode.click()
      }
    }
  }

  handleKeyUp = (e: React.KeyboardEvent) => {
    const spaceKey = e.keyCode === keycode.codes.space
    const enterKey = e.keyCode === keycode.codes.enter

    if (spaceKey || enterKey) {
      e.preventDefault()
      e.stopPropagation()

      if (spaceKey) {
        const refNode = findDOMNode(this.ref) as HTMLElement
        refNode.click()
      }
    }
  }

  handleMouseOver = (event: React.MouseEvent) => {
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
      ? this.state.selected
      : this.props.selected
  }

  get focused() {
    return isActiveElement(this.ref)
  }

  focus() {
    const refNode = findDOMNode(this.ref) as HTMLElement
    refNode.focus()
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
      <ElementType
        // @ts-expect-error TODO: `ref` prop causes: "Expression produces a union type that is too complex to represent.ts(2590)"
        tabIndex={-1} // note: tabIndex can be overridden by Menu or MenuItemGroup components
        {...props}
        href={href}
        role={this.role}
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
