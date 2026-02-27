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

import { Component } from 'react'
import keycode from 'keycode'

import { CheckInstUIIcon, ChevronRightInstUIIcon } from '@instructure/ui-icons'
import {
  omitProps,
  getElementType,
  withDeterministicId,
  callRenderProp
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { isActiveElement, findDOMNode } from '@instructure/ui-dom-utils'
import { withStyle } from '@instructure/emotion'

import { MenuContext } from '../../../utils/v2/MenuContext'

import generateStyle from './styles'

import { allowedProps } from './props'
import type { MenuItemProps, MenuItemState } from './props'

/**
---
parent: Menu
id: Menu.Item
---
**/
@withDeterministicId()
@withStyle(generateStyle)
class MenuItem extends Component<MenuItemProps, MenuItemState> {
  static readonly componentId = 'Menu.Item'

  static allowedProps = allowedProps
  static defaultProps = {
    type: 'button',
    disabled: false
  } as const

  declare context: React.ContextType<typeof MenuContext>
  static contextType = MenuContext

  constructor(props: MenuItemProps) {
    super(props)

    const state: MenuItemState = {
      isHovered: false,
      isFocused: false
    }

    if (typeof props.selected === 'undefined') {
      state.selected = !!props.defaultSelected
    }

    this.state = state
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
    if (!this.focused) {
      this.focus()
    }

    if (typeof this.props.onMouseOver === 'function') {
      this.props.onMouseOver(event, this)
    }
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false })
  }

  handleFocusEvent = () => {
    this.setState({ isFocused: true })
  }

  handleBlurEvent = () => {
    this.setState({ isFocused: false })
  }

  getIconColor = () => {
    const { type } = this.props

    if (type === 'flyout') {
      return 'baseColor'
    }
    return this.selected ? 'inverseColor' : 'baseColor'
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
    const { children, type, renderLabelInfo } = this.props

    return (
      <span>
        <span css={this.props.styles?.label} id={this.labelId}>
          {children}
        </span>
        {(type === 'checkbox' || type === 'radio') && (
          <span css={this.props.styles?.icon}>
            {this.selected && (
              <CheckInstUIIcon size="md" color={this.getIconColor()} />
            )}
          </span>
        )}
        {type === 'flyout' && (
          <span css={this.props.styles?.icon}>
            <ChevronRightInstUIIcon size="md" color={this.getIconColor()} />
          </span>
        )}
        {renderLabelInfo && (
          <span css={this.props.styles?.labelInfo}>
            {callRenderProp(renderLabelInfo)}
          </span>
        )}
      </span>
    )
  }

  render() {
    const {
      disabled,
      controls,
      onKeyDown,
      onKeyUp,
      onFocus,
      onBlur,
      type,
      href,
      target
    } = this.props

    const props = omitProps(this.props, MenuItem.allowedProps)
    const ElementType = this.elementType

    return (
      <ElementType
        tabIndex={-1} // note: tabIndex can be overridden by Menu or MenuItemGroup components
        {...props}
        href={href}
        target={target}
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
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={createChainedFunction(onFocus, this.handleFocusEvent)}
        onBlur={createChainedFunction(onBlur, this.handleBlurEvent)}
        data-cid="MenuItem"
      >
        {this.renderContent()}
      </ElementType>
    )
  }
}

export default MenuItem
export { MenuItem }
