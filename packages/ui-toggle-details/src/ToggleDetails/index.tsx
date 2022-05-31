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
import React, { Component } from 'react'
import { Button } from '@instructure/ui-buttons'
import {
  IconArrowOpenEndSolid,
  IconArrowOpenDownSolid
} from '@instructure/ui-icons'
import { Expandable } from '@instructure/ui-expandable'
import { omitProps, pickProps } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { ToggleDetailsProps, ToggleDetailsStyleProps } from './props'
import { allowedProps, propTypes } from './props'
import type { ExpandableToggleProps } from '@instructure/ui-expandable'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ToggleDetails extends Component<ToggleDetailsProps> {
  static readonly componentId = 'ToggleDetails'
  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    variant: 'default',
    size: 'medium',
    fluidWidth: false,
    icon: IconArrowOpenEndSolid,
    iconExpanded: IconArrowOpenDownSolid,
    iconPosition: 'start',
    defaultExpanded: false,
    children: null
  }

  ref: Element | null = null
  _button: HTMLElement | null = null

  get focused() {
    return isActiveElement(this._button)
  }

  focus() {
    this._button?.focus()
  }

  componentDidMount() {
    this.props.makeStyles?.({ animate: false } as ToggleDetailsStyleProps)
  }

  componentDidUpdate() {
    this.props.makeStyles?.({ animate: true } as ToggleDetailsStyleProps)
  }

  getButtonRef = (el: Element | null) => (this._button = el as HTMLElement)

  renderSummary(expanded: boolean) {
    const { summary, iconPosition } = this.props

    return (
      <span css={this.props.styles?.summary}>
        {iconPosition === 'start' && this.renderIcon(expanded)}
        <span css={this.props.styles?.summaryText}>{summary}</span>
        {iconPosition === 'end' && this.renderIcon(expanded)}
      </span>
    )
  }

  renderToggle(
    ExpandableToggleProps: ReturnType<ExpandableToggleProps>,
    expanded: boolean
  ) {
    const { variant } = this.props

    const props = {
      ...omitProps(this.props, ToggleDetails.allowedProps),
      ...ExpandableToggleProps,
      children: this.renderSummary(expanded)
      // spread operator makes toggleProps loose Record<string, any>>
    } as Record<string, any>
    const summary = this.renderSummary(expanded)

    if (variant === 'filled') {
      return (
        <Button
          {...props}
          display="block"
          textAlign="start"
          elementRef={this.getButtonRef}
        >
          {summary}
        </Button>
      )
    } else if (props.href) {
      return (
        <a {...props} css={this.props.styles?.toggle} ref={this.getButtonRef}>
          {summary}
        </a>
      )
    } else {
      return (
        <button
          {...props}
          type="button"
          css={this.props.styles?.toggle}
          ref={this.getButtonRef}
        >
          {summary}
        </button>
      )
    }
  }

  renderIcon(expanded: boolean) {
    const Icon = expanded ? this.props.iconExpanded : this.props.icon

    return this.props.children && Icon ? (
      <span css={this.props.styles?.icon}>
        <Icon />
      </span>
    ) : null
  }

  renderDetails(expanded: boolean, detailsProps: { id: string }) {
    const { children } = this.props
    const expandedStyles = expanded ? { display: 'block' } : { display: 'none' }
    return (
      <div {...detailsProps} css={[this.props.styles?.details, expandedStyles]}>
        {children && expanded && this.renderContent()}
      </div>
    )
  }

  renderContent() {
    return <div css={this.props.styles?.content}>{this.props.children}</div>
  }

  handleToggle = (event: React.MouseEvent, expanded: boolean) => {
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(event, expanded)
    }
    this.props.makeStyles?.({ animate: true })
  }

  render() {
    return (
      <Expandable
        {...pickProps(this.props, Expandable.allowedProps)}
        onToggle={this.handleToggle}
      >
        {({ expanded, getToggleProps, getDetailsProps }) => {
          return (
            <div
              css={this.props.styles?.toggleDetails}
              ref={(el) => {
                this.ref = el
              }}
            >
              {this.renderToggle(getToggleProps(), expanded)}
              {this.renderDetails(expanded, getDetailsProps())}
            </div>
          )
        }}
      </Expandable>
    )
  }
}

export default ToggleDetails
export { ToggleDetails }
