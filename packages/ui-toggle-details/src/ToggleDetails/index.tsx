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

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  variant?: 'default' | 'filled'
  summary: React.ReactNode
  expanded?: any // TODO: controllable(PropTypes.bool, 'onToggle', 'defaultExpanded')
  defaultExpanded?: boolean
  onToggle?: (...args: any[]) => any
  icon?: (...args: any[]) => any
  iconExpanded?: (...args: any[]) => any
  iconPosition?: 'start' | 'end'
  fluidWidth?: boolean
  size?: 'small' | 'medium' | 'large'
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class ToggleDetails extends Component<Props> {
  static componentId = 'ToggleDetails'

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
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onToggle: function (event, expanded) {},
    children: null,
    expanded: undefined
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
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ animate: false })
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ animate: true })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  getButtonRef = (el) => (this._button = el)

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expanded' implicitly has an 'any' type.
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'toggleProps' implicitly has an 'any' ty... Remove this comment to see the full error message
  renderToggle(toggleProps, expanded) {
    const { variant } = this.props

    const props = {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      ...omitProps(this.props, ToggleDetails.propTypes),
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expanded' implicitly has an 'any' type.
  renderIcon(expanded) {
    const Icon = expanded ? this.props.iconExpanded : this.props.icon

    return this.props.children ? (
      <span css={this.props.styles.icon}>
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
      <div {...detailsProps} css={[this.props.styles.details, expandedStyles]}>
        {children && expanded && this.renderContent()}
      </div>
    )
  }

  renderContent() {
    return <div css={this.props.styles.content}>{this.props.children}</div>
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleToggle = (event, expanded) => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onToggle(event, expanded)
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles({ animate: true })
  }

  render() {
    return (
      <Expandable
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        {...pickProps(this.props, Expandable.propTypes)}
        onToggle={this.handleToggle}
      >
        {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'expanded' implicitly has an 'any'... Remove this comment to see the full error message */}
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
