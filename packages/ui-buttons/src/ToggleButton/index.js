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
import PropTypes from 'prop-types'

import { testable } from '@instructure/ui-testable'
import { PositionPropTypes } from '@instructure/ui-position'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'

import { Tooltip } from '@instructure/ui-tooltip'
import { IconButton } from '../IconButton'

/**
---
category: components
---
**/

@testable()
class ToggleButton extends Component {
  static propTypes = {
    /**
     * Text to output only to screen readers
     */
    screenReaderLabel: PropTypes.PropTypes.string.isRequired,
    /**
     * Text to render in the tooltip shown on hover/focus
     */
    renderTooltipContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /**
    * An icon or function that returns an icon
    */
    renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    /**
     * Toggles the `aria-pressed` attribute on the button (`true` if `pressed`; `false` if `unpressed`)
     */
    status: PropTypes.oneOf(['pressed', 'unpressed']).isRequired,
    /**
    * The element to render as the component root; `button` by default
    */
    as: PropTypes.elementType,
    /**
     * Specifies if interaction with `ToggleButton` is `enabled`, `disabled`, or `readonly`
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * The size of the `ToggleButton`
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Provides a reference to `ToggleButton`'s underlying HTML element
     */
    elementRef: PropTypes.func,
    /**
     * Callback fired when the `ToggleButton` is clicked
     */
    onClick: PropTypes.func,
    /**
     * The color in which to display the icon
     */
    color: PropTypes.string,
    /**
     * By default, the tooltip will show on hover/focus. Use this prop if you need to override that behavior.
     */
    isShowingTooltip: PropTypes.bool,
    /**
     * An element or a function returning an element to use as the mount node
     */
    mountNode: PositionPropTypes.mountNode,
    /**
     * The placement of the tooltip in relation to the button
     */
    placement: PositionPropTypes.placement,
    /**
     * The parent in which to constrain the tooltip.
     * One of: 'window', 'scroll-parent', 'parent', 'none', an element,
     * or a function returning an element.
     */
    constrain: PositionPropTypes.constrain
  }

  static defaultProps = {
    size: 'medium',
    as: 'button',
    interaction: 'enabled',
    elementRef: (el) => {},
    renderIcon: () => {},
    onClick: () => {},
    mountNode: null,
    color: 'secondary',
    isShowingTooltip: undefined,
    placement: 'top center',
    constrain: 'window'
  }

  constructor (props) {
    super(props)

    this.state = {
      isShowingTooltip: props.isShowingTooltip || false
    }
  }

  get isShowingTooltip () {
    return typeof this.props.isShowingTooltip === 'undefined'
      ? this.state.isShowingTooltip : this.props.isShowingTooltip
  }

  render () {
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
        onShowContent={(event) => {
          this.setState({ isShowingTooltip: true })
        }}
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
