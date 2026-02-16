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

import { Component, ReactNode } from 'react'

import {
  getElementType,
  omitProps,
  ensureSingleChild,
  passthroughProps,
  callRenderProp,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { Popover } from '@instructure/ui-popover'
import type { PopoverProps } from '@instructure/ui-popover'
import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import type { TooltipProps, TooltipState } from './props'
import { allowedProps } from './props'

/**
---
category: components
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
class Tooltip extends Component<TooltipProps, TooltipState> {
  static readonly componentId = 'Tooltip'

  static allowedProps = allowedProps

  static defaultProps = {
    defaultIsShowingContent: false,
    color: 'primary',
    placement: 'top',
    constrain: 'window',
    offsetX: 0,
    offsetY: 0,
    preventTooltip: false
  } as const

  private readonly _id: string

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
    if (typeof this.props.elementRef === 'function') {
      this.props.elementRef(el)
    }
  }

  constructor(props: TooltipProps) {
    super(props)

    this._id = props.deterministicId!()

    this.state = { hasFocus: false }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleFocus: PopoverProps['onFocus'] = () => {
    this.setState({ hasFocus: true })
  }

  handleBlur: PopoverProps['onBlur'] = () => {
    this.setState({ hasFocus: false })
  }

  renderTrigger() {
    const { children, as } = this.props as TooltipProps
    const { hasFocus } = this.state

    const triggerProps = {
      'aria-describedby': this._id
    }

    if (as) {
      const Trigger = getElementType(Tooltip, this.props)
      const props = omitProps(this.props, Tooltip.allowedProps)
      return (
        <Trigger {...props} {...triggerProps}>
          {
            children as ReactNode /*TODO check if it can be TooltipRenderChildren, this might cause a crash*/
          }
        </Trigger>
      )
    } else if (typeof children === 'function') {
      return children({
        focused: hasFocus,
        getTriggerProps: (props) => ({
          ...triggerProps,
          ...props
        })
      })
    } else {
      return ensureSingleChild(children, triggerProps)
    }
  }

  render() {
    const {
      renderTip,
      isShowingContent,
      defaultIsShowingContent,
      on,
      color,
      placement,
      mountNode,
      constrain,
      offsetX,
      offsetY,
      positionTarget,
      onShowContent,
      onHideContent,
      preventTooltip,
      styles,
      ...rest
    } = this.props

    return (
      <Popover
        {...passthroughProps(rest)}
        isShowingContent={!preventTooltip && isShowingContent}
        defaultIsShowingContent={!preventTooltip && defaultIsShowingContent}
        on={on}
        shouldRenderOffscreen
        shouldReturnFocus={false}
        placement={placement}
        color={color === 'primary' ? 'primary-inverse' : 'primary'}
        mountNode={mountNode}
        constrain={constrain}
        shadow="none"
        offsetX={offsetX}
        offsetY={offsetY}
        positionTarget={positionTarget}
        renderTrigger={() => this.renderTrigger()}
        onShowContent={onShowContent}
        onHideContent={onHideContent}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        elementRef={this.handleRef}
        shouldCloseOnDocumentClick={false}
        shouldCloseOnEscape
        shouldSetAriaExpanded={false}
        data-cid="Tooltip"
      >
        {!preventTooltip ? (
          <span id={this._id} css={styles?.tooltip} role="tooltip">
            {/* TODO: figure out how to add a ref to this */}
            {callRenderProp(renderTip)}
          </span>
        ) : null}
      </Popover>
    )
  }
}

export default Tooltip
export { Tooltip }
