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

import React, { Component } from 'react'

import {
  omitProps,
  pickProps,
  getElementType,
  callRenderProp
} from '@instructure/ui-react-utils'
import { IconButton } from '@instructure/ui-buttons'
import { Transition } from '@instructure/ui-motion'
import { Expandable } from '@instructure/ui-expandable'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { Flex } from '@instructure/ui-flex'
import { View } from '@instructure/ui-view'
import {
  IconArrowOpenEndSolid,
  IconArrowOpenDownSolid
} from '@instructure/ui-icons'
import { testable } from '@instructure/ui-testable'
import type { ToggleGroupProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
@tsProps
**/
@testable()
class ToggleGroup extends Component<ToggleGroupProps> {
  static readonly componentId = 'ToggleGroup'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    size: 'medium',
    icon: IconArrowOpenEndSolid,
    iconExpanded: IconArrowOpenDownSolid,
    defaultExpanded: false,
    transition: true,
    as: 'span',
    elementRef: (_el: Element | null) => {},
    border: true
  } as const

  ref: Element | null = null
  _button: Element | null = null
  _shouldTransition = false

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  handleButtonRef = (el: Element | null) => {
    this._button = el
  }

  get focused() {
    return isActiveElement(this._button)
  }

  focus() {
    this._button && (this._button as HTMLElement).focus()
  }

  componentDidMount() {
    this._shouldTransition = true
  }

  renderIcon(expanded: boolean) {
    const Icon = expanded ? this.props.iconExpanded : this.props.icon
    return Icon ? callRenderProp(Icon) : null
  }

  renderToggle(toggleProps: any, expanded: boolean) {
    const { toggleLabel, size } = this.props
    let label
    if (typeof toggleLabel === 'function') {
      label = toggleLabel(expanded)
    } else {
      label = toggleLabel
    }
    return (
      <IconButton
        {...toggleProps}
        withBackground={false}
        withBorder={false}
        size={size === 'large' ? 'medium' : 'small'}
        elementRef={this.handleButtonRef}
        screenReaderLabel={label}
      >
        {this.renderIcon(expanded)}
      </IconButton>
    )
  }

  renderDetails(detailsProps: { id: string }) {
    return (
      <View
        {...detailsProps}
        display="block"
        borderWidth="small none none none"
      >
        {this.props.transition && this._shouldTransition ? (
          <Transition transitionOnMount in type="fade">
            {this.props.children}
          </Transition>
        ) : (
          this.props.children
        )}
      </View>
    )
  }

  render() {
    const Element = getElementType(ToggleGroup, this.props)

    return (
      <Expandable {...pickProps(this.props, Expandable.allowedProps)}>
        {({ expanded, getToggleProps, getDetailsProps }) => {
          return (
            <View
              {...omitProps(this.props, ToggleGroup.allowedProps)}
              borderWidth={this.props.border ? 'small' : 'none'}
              as={Element}
              elementRef={this.handleRef}
              display="block"
              borderRadius="medium"
              background="primary"
            >
              <Flex
                padding={
                  this.props.size === 'small'
                    ? 'x-small'
                    : 'small small small x-small'
                }
              >
                <Flex.Item>
                  {this.renderToggle(getToggleProps(), expanded)}
                </Flex.Item>
                <Flex.Item shouldGrow shouldShrink padding="0 0 0 x-small">
                  {this.props.summary}
                </Flex.Item>
              </Flex>
              {expanded ? (
                this.renderDetails(getDetailsProps())
              ) : (
                <span {...getDetailsProps()} />
              )}
            </View>
          )
        }}
      </Expandable>
    )
  }
}

export default ToggleGroup
export { ToggleGroup }
