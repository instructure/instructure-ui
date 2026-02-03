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

import { passthroughProps, callRenderProp } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import type { ViewOwnProps } from '@instructure/ui-view'

import { withStyle_11_5 as withStyle } from '@instructure/emotion'

import generateStyle from './styles'

import type { TabsTabProps } from './props'
import { allowedProps } from './props'

/**
---
parent: Tabs
id: Tabs.Tab
---
**/
@withStyle(generateStyle)
class Tab extends Component<TabsTabProps> {
  static readonly componentId = 'Tabs.Tab'

  static allowedProps = allowedProps

  static defaultProps = {
    variant: 'default',
    isDisabled: false,
    isSelected: false
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleClick = (event: React.MouseEvent<ViewOwnProps>) => {
    const { onClick, index, id, isDisabled } = this.props

    if (isDisabled) {
      return
    }

    if (typeof onClick === 'function') {
      onClick(event, { index, id })
    }
  }

  handleKeyDown = (event: React.KeyboardEvent<ViewOwnProps>) => {
    const { onKeyDown, index, id, isDisabled } = this.props

    if (isDisabled) {
      return
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(event, { index, id })
    }
  }

  render() {
    const {
      id,
      variant,
      isSelected,
      isDisabled,
      controls,
      children,
      styles,
      ...props
    } = this.props

    return (
      <View
        {...passthroughProps(props)}
        as="div"
        role="tab"
        id={id}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        css={styles?.tab}
        aria-selected={isSelected ? 'true' : undefined}
        aria-disabled={isDisabled ? 'true' : undefined}
        aria-controls={controls}
        tabIndex={isSelected && !isDisabled ? 0 : undefined}
        position="relative"
        focusPosition="inset"
      >
        {callRenderProp(children)}
      </View>
    )
  }
}

export default Tab
export { Tab }
