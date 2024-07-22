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

import { View } from '@instructure/ui-view'
import { passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { Tooltip } from '@instructure/ui-tooltip'
import type { TooltipRenderChildrenArgs } from '@instructure/ui-tooltip'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import type { PillProps, PillState } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Pill extends Component<PillProps, PillState> {
  static readonly componentId = 'Pill'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    color: 'primary'
  }

  ref: Element | null = null

  ellipsisRef: HTMLElement | null = null

  constructor(props: PillProps) {
    super(props)

    this.state = {
      truncated: false
    }
  }

  componentDidMount() {
    this.setTruncation()
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  setTruncation() {
    if (this.ellipsisRef) {
      this.setState({
        truncated: this.ellipsisRef.offsetWidth < this.ellipsisRef.scrollWidth
      })
    }
  }

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  renderPill(
    focused?: TooltipRenderChildrenArgs['focused'],
    getTriggerProps?: TooltipRenderChildrenArgs['getTriggerProps']
  ) {
    const {
      margin,
      children,
      color,
      as,
      elementRef,
      styles,
      makeStyles,
      statusLabel,
      renderIcon,
      ...props
    } = this.props

    const filteredProps = passthroughProps(props)

    const containerProps =
      typeof getTriggerProps === 'function'
        ? getTriggerProps(filteredProps)
        : filteredProps

    const refProp = this.state.truncated ? {} : { elementRef: this.handleRef }
    return (
      <View
        {...containerProps}
        as={as}
        {...refProp}
        margin={margin}
        padding="0"
        maxWidth={styles?.maxWidth as string}
        background="transparent"
        borderRadius="pill"
        borderWidth="0"
        display="inline-block"
        position="relative"
        withFocusOutline={focused}
        focusColor="info"
      >
        <div css={styles?.pill}>
          {renderIcon && <div css={styles?.icon}>{renderIcon}</div>}
          <div
            css={styles?.text}
            ref={(el) => {
              this.ellipsisRef = el
            }}
          >
            {statusLabel && (
              <span css={styles?.status}>
                {statusLabel && statusLabel.concat(':')}
              </span>
            )}
            {children}
          </div>
        </div>
      </View>
    )
  }

  render() {
    if (this.state.truncated) {
      return (
        <Tooltip
          renderTip={
            this.props.statusLabel
              ? this.props.statusLabel.concat(
                  ': ',
                  this.props.children as string
                )
              : this.props.children
          }
          elementRef={this.handleRef}
        >
          {({ focused, getTriggerProps }) => {
            return this.renderPill(focused, getTriggerProps)
          }}
        </Tooltip>
      )
    } else {
      return this.renderPill()
    }
  }
}

export default Pill
export { Pill }
