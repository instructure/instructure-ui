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

import { testable } from '@instructure/ui-testable'

import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'

import { Tooltip } from '@instructure/ui-tooltip'
import { IconButton } from '../IconButton'

import { propTypes, defaultProps, allowedProps } from './props'
import type { ToggleButtonProps } from './props'

/**
---
category: components
---
**/

@testable()
class ToggleButton extends Component<ToggleButtonProps> {
  static readonly componentId = 'ToggleButton'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = defaultProps

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      isShowingTooltip: props.isShowingTooltip || false
    }
  }

  get isShowingTooltip() {
    return typeof this.props.isShowingTooltip === 'undefined'
      ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'isShowingTooltip' does not exist on type... Remove this comment to see the full error message
        this.state.isShowingTooltip
      : this.props.isShowingTooltip
  }

  render() {
    const {
      as,
      color,
      elementRef,
      size,
      interaction,
      mountNode,
      renderIcon,
      renderTooltipContent,
      screenReaderLabel,
      status,
      placement,
      onClick,
      ...props
    } = this.props

    return (
      <Tooltip
        renderTip={renderTooltipContent}
        on={['hover', 'focus']}
        placement={placement}
        color={color === 'primary-inverse' ? 'primary-inverse' : 'primary'}
        isShowingContent={this.isShowingTooltip}
        // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
        onShowContent={(event) => {
          this.setState({ isShowingTooltip: true })
        }}
        // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
        onHideContent={(event) => {
          this.setState({ isShowingTooltip: false })
        }}
        mountNode={mountNode}
      >
        <IconButton
          {...passthroughProps(props)}
          screenReaderLabel={screenReaderLabel}
          withBackground={false}
          withBorder={false}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          color={color}
          size={size}
          elementRef={elementRef}
          as={as}
          onClick={onClick}
          interaction={interaction}
          aria-pressed={status === 'pressed'}
        >
          {callRenderProp(renderIcon)}
        </IconButton>
      </Tooltip>
    )
  }
}

export { ToggleButton }
export default ToggleButton
