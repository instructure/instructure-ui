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
import React, { Component, Children } from 'react'

import {
  omitProps,
  matchComponentTypes,
  callRenderProp,
  safeCloneElement
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { uid } from '@instructure/uid'

import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'
import generateComponentTheme from './theme'

import { Item } from './Item'
import type { OptionsItemProps } from './Item/props'
import { Separator } from './Separator'
import type { OptionsSeparatorProps } from './Separator/props'

import type { OptionsProps } from './props'
import { allowedProps, propTypes } from './props'

type ItemChild = React.ComponentElement<OptionsItemProps, Item>
type SeparatorChild = React.ComponentElement<OptionsSeparatorProps, Separator>
type OptionsChild = React.ComponentElement<OptionsProps, Options>
type OptionsChildren = (ItemChild | SeparatorChild | OptionsChild)[]

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyles, generateComponentTheme)
@testable()
class Options extends Component<OptionsProps> {
  static readonly componentId = 'Options'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    as: 'span',
    role: 'list',
    elementRef: () => {},
    renderLabel: null,
    children: null
  }

  static Item = Item
  static Separator = Separator

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

  _labelId = uid('Options-label')

  get childAs() {
    const { as } = this.props
    if (as === 'ul' || as === 'ol') {
      return 'li'
    }
    return undefined
  }

  renderLabel() {
    const { renderLabel, styles } = this.props
    return (
      <span
        id={this._labelId}
        role="presentation"
        aria-hidden="true"
        css={styles?.label}
      >
        {callRenderProp(renderLabel)}
      </span>
    )
  }

  renderSubList(subOptions: OptionsChild) {
    const { styles } = this.props
    return (
      <Item as={this.childAs} role="presentation" css={styles?.label}>
        {subOptions}
      </Item>
    )
  }

  renderChildren() {
    const { children } = this.props

    return Children.map(children as OptionsChildren, (child) => {
      if (matchComponentTypes<OptionsChild>(child, ['Options'])) {
        return this.renderSubList(child)
      }
      if (matchComponentTypes<ItemChild>(child, ['Item'])) {
        return safeCloneElement(child, { as: this.childAs })
      } else if (matchComponentTypes<SeparatorChild>(child, ['Separator'])) {
        return safeCloneElement(child, { as: this.childAs })
      }
      return undefined
    })
  }

  render() {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Options.allowedProps),
      Options
    )

    const { as, role, renderLabel, elementRef, styles } = this.props

    return (
      <div css={styles?.options} role="presentation" ref={this.handleRef}>
        {renderLabel && this.renderLabel()}
        <View
          {...passthroughProps}
          elementRef={elementRef}
          css={styles?.list}
          as={as}
          role={role}
          display="block"
          margin="none"
          padding="none"
          background="primary"
          aria-labelledby={renderLabel ? this._labelId : undefined}
        >
          {this.renderChildren()}
        </View>
      </div>
    )
  }
}

export default Options
export { Options }
