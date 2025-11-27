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

import {
  omitProps,
  pickProps,
  getElementType,
  callRenderProp
} from '@instructure/ui-react-utils'
import { IconButton } from '@instructure/ui-buttons'
import { Transition } from '@instructure/ui-motion'
import { Expandable } from '@instructure/ui-expandable'
import type { ExpandableToggleProps } from '@instructure/ui-expandable'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { Flex } from '@instructure/ui-flex'
import { View } from '@instructure/ui-view'
import {
  IconArrowOpenEndSolid,
  IconArrowOpenDownSolid
} from '@instructure/ui-icons'
import type { ToggleGroupProps } from './props'
import { allowedProps } from './props'

import { withStyleRework as withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
class ToggleGroup extends Component<ToggleGroupProps> {
  static readonly componentId = 'ToggleGroup'

  static allowedProps = allowedProps

  static defaultProps = {
    size: 'medium',
    icon: IconArrowOpenEndSolid,
    iconExpanded: IconArrowOpenDownSolid,
    defaultExpanded: false,
    transition: true,
    as: 'span',
    border: true
  } as const

  ref: Element | null = null
  _button: HTMLElement | null = null
  _shouldTransition = false

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  handleButtonRef = (el: Element | null) => {
    this._button = el as HTMLElement
  }

  get focused() {
    return isActiveElement(this._button)
  }

  focus() {
    this._button?.focus()
  }

  componentDidMount() {
    this._shouldTransition = true
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.state)
  }

  renderIcon(expanded: boolean) {
    const Icon = expanded ? this.props.iconExpanded : this.props.icon
    return Icon ? callRenderProp(Icon) : null
  }

  renderToggle(
    toggleProps: ReturnType<ExpandableToggleProps>,
    expanded: boolean
  ) {
    const { toggleLabel, size } = this.props
    let label
    if (typeof toggleLabel === 'function') {
      label = toggleLabel(expanded)
    } else {
      label = toggleLabel
    }

    const props = { ...toggleProps } as Record<string, any>
    return (
      <IconButton
        {...props}
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
    const { styles } = this.props
    return (
      <View
        {...detailsProps}
        display="block"
        borderWidth="small none none none"
        borderColor={styles?.borderColor}
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
    const { styles } = this.props
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
              borderColor={styles?.borderColor}
              data-cid="ToggleGroup"
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
