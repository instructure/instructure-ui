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

import { passthroughProps, callRenderProp } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { TabsTabProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
parent: Tabs
id: Tabs.Tab
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Tab extends Component<TabsTabProps> {
  static readonly componentId = 'Tabs.Tab'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    children: null,
    variant: 'default',
    isDisabled: false,
    isSelected: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onClick: (event, { index, id }) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onKeyDown: (event, { index, id }) => {}
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles?.()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleClick = (event) => {
    const { onClick, index, id, isDisabled } = this.props

    if (isDisabled) {
      return
    }

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onClick(event, { index, id })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleKeyDown = (event) => {
    const { onKeyDown, index, id, isDisabled } = this.props

    if (isDisabled) {
      return
    }

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onKeyDown(event, { index, id })
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
        //@ts-expect-error fix this to be number
        tabIndex={isSelected && !isDisabled ? '0' : undefined}
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
