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

/**
---
category: components
---
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
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onToggle: function (event, expanded) {},
    children: null
  }

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_button' does not exist on type 'ToggleD... Remove this comment to see the full error message
    return isActiveElement(this._button)
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_button' does not exist on type 'ToggleD... Remove this comment to see the full error message
    this._button.focus()
  }

  componentDidMount() {
    this.props.makeStyles?.({ animate: false } as ToggleDetailsStyleProps)
  }

  componentDidUpdate() {
    this.props.makeStyles?.({ animate: true } as ToggleDetailsStyleProps)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  getButtonRef = (el) => (this._button = el)

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expanded' implicitly has an 'any' type.
  renderSummary(expanded) {
    const { summary, iconPosition } = this.props

    return (
      <span css={this.props.styles?.summary}>
        {iconPosition === 'start' && this.renderIcon(expanded)}
        <span css={this.props.styles?.summaryText}>{summary}</span>
        {iconPosition === 'end' && this.renderIcon(expanded)}
      </span>
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'toggleProps' implicitly has an 'any' ty... Remove this comment to see the full error message
  renderToggle(toggleProps, expanded) {
    const { variant } = this.props

    const props = {
      ...omitProps(this.props, ToggleDetails.allowedProps),
      ...toggleProps,
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      children: this.renderSummary()
    }

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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expanded' implicitly has an 'any' type.
  renderIcon(expanded) {
    const Icon = expanded ? this.props.iconExpanded : this.props.icon

    return this.props.children ? (
      <span css={this.props.styles?.icon}>
        {/* @ts-expect-error ts-migrate(2604) FIXME: JSX element type 'Icon' does not have any construc... Remove this comment to see the full error message */}
        <Icon />
      </span>
    ) : null
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expanded' implicitly has an 'any' type.
  renderDetails(expanded, detailsProps) {
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleToggle = (event, expanded) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onToggle(event, expanded)
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
            <div css={this.props.styles?.toggleDetails}>
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
