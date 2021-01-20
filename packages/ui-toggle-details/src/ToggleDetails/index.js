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
import PropTypes from 'prop-types'

import { Button } from '@instructure/ui-buttons'
import {
  IconArrowOpenEndSolid,
  IconArrowOpenDownSolid
} from '@instructure/ui-icons'
import { Expandable } from '@instructure/ui-expandable'
import { controllable } from '@instructure/ui-prop-types'
import { omitProps, pickProps } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ToggleDetails extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    variant: PropTypes.oneOf(['default', 'filled']),
    /**
     * The summary that displays and can be interacted with
     */
    summary: PropTypes.node.isRequired,
    /**
     * Whether the content is expanded or hidden
     */
    expanded: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded'),
    /**
     * Whether the content is initially expanded or hidden (uncontrolled)
     */
    defaultExpanded: PropTypes.bool,
    onToggle: PropTypes.func,
    /**
     * The icon to display next to the summary text when content is hidden
     */
    icon: PropTypes.func,
    /**
     * The icon to display when content is expanded
     */
    iconExpanded: PropTypes.func,
    /**
     * Icon position at the start or end of the summary text
     */
    iconPosition: PropTypes.oneOf(['start', 'end']),
    /**
     * should the summary fill the width of its container
     */
    fluidWidth: PropTypes.bool,
    /**
     * The toggleable content passed inside the ToggleDetails component
     */
    children: PropTypes.node,
    /**
     * Choose a size for the expand/collapse icon
     */
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    variant: 'default',
    size: 'medium',
    fluidWidth: false,
    icon: IconArrowOpenEndSolid,
    iconExpanded: IconArrowOpenDownSolid,
    iconPosition: 'start',
    defaultExpanded: false,
    onToggle: function (event, expanded) {},
    children: null,
    expanded: undefined
  }

  get focused() {
    return isActiveElement(this._button)
  }

  focus() {
    this._button.focus()
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate() {
    this.props.makeStyles()
  }

  getButtonRef = (el) => (this._button = el)

  renderSummary(expanded) {
    const { summary, iconPosition } = this.props

    return (
      <span css={this.props.styles.summary}>
        {iconPosition === 'start' && this.renderIcon(expanded)}
        <span css={this.props.styles.summaryText}>{summary}</span>
        {iconPosition === 'end' && this.renderIcon(expanded)}
      </span>
    )
  }

  renderToggle(toggleProps, expanded) {
    const { variant } = this.props

    const props = {
      ...omitProps(this.props, ToggleDetails.propTypes),
      ...toggleProps,
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
        <a {...props} css={this.props.styles.toggle} ref={this.getButtonRef}>
          {summary}
        </a>
      )
    } else {
      return (
        <button
          {...props}
          type="button"
          css={this.props.styles.toggle}
          ref={this.getButtonRef}
        >
          {summary}
        </button>
      )
    }
  }

  renderIcon(expanded) {
    const Icon = expanded ? this.props.iconExpanded : this.props.icon

    return this.props.children ? (
      <span css={this.props.styles.icon}>
        <Icon />
      </span>
    ) : null
  }

  renderDetails(expanded, detailsProps) {
    const { children } = this.props
    const expandedStyles = expanded ? { display: 'block' } : { display: 'none' }
    return (
      <div {...detailsProps} css={[this.props.styles.details, expandedStyles]}>
        {children && expanded && this.renderContent()}
      </div>
    )
  }

  renderContent() {
    return <div css={this.props.styles.content}>{this.props.children}</div>
  }

  render() {
    return (
      <Expandable {...pickProps(this.props, Expandable.propTypes)}>
        {({ expanded, getToggleProps, getDetailsProps }) => {
          return (
            <div css={this.props.styles.toggleDetails}>
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
