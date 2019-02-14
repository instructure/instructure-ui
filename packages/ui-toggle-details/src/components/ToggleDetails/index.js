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
import classnames from 'classnames'

import Button from '@instructure/ui-buttons/lib/components/Button'

import IconArrowOpenEnd from '@instructure/ui-icons/lib/Solid/IconArrowOpenEnd'
import IconArrowOpenDown from '@instructure/ui-icons/lib/Solid/IconArrowOpenDown'

import themeable from '@instructure/ui-themeable'

import { controllable } from '@instructure/ui-prop-types'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import testable from '@instructure/ui-testable'

import Expandable from '../Expandable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@themeable(theme, styles)
class ToggleDetails extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['default', 'filled']),
    /**
    * The summary that displays and can be interacted with
    */
    summary: PropTypes.node.isRequired,
    /**
    * Whether the content is expanded or hidden
    */
    expanded: controllable(
      PropTypes.bool,
      'onToggle',
      'defaultExpanded'
    ),
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
    icon: IconArrowOpenEnd,
    iconExpanded: IconArrowOpenDown,
    iconPosition: 'start',
    defaultExpanded: false,
    onToggle: function (event, expanded) {}
  }

  shouldAnimateContent = false

  get focused () {
    return isActiveElement(this._button)
  }

  focus () {
    this._button.focus()
  }

  componentDidMount () {
    this.shouldAnimateContent = true
  }

  getButtonRef = el => this._button = el

  renderSummary (expanded) {
    const {
      summary,
      iconPosition
    } = this.props

    return (
      <span className={styles.summary}>
        {iconPosition === 'start' && this.renderIcon(expanded)}
        <span className={styles.summaryText}>{summary}</span>
        {iconPosition === 'end' && this.renderIcon(expanded)}
      </span>
    )
  }

  renderToggle (toggleProps, expanded) {
    const {
      variant,
      fluidWidth
    } = this.props

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
          fluidWidth
          buttonRef={this.getButtonRef}
        >
          {summary}
        </Button>
      )
    } else if (props.href) {
      return (
        <a
          {...props}
          className={classnames(styles.toggle, styles[variant], {
            [styles.fluidWidth]: fluidWidth
          })}
          ref={this.getButtonRef}
        >
          {summary}
        </a>
      )
    } else {
      return (
        <button
          {...props}
          type="button"
          className={classnames(styles.toggle, styles[variant], {
            [styles.fluidWidth]: fluidWidth
          })}
          ref={this.getButtonRef}
        >
          {summary}
        </button>
      )
    }
  }

  renderIcon (expanded) {
    const { iconPosition } = this.props
    const Icon = expanded ? this.props.iconExpanded : this.props.icon

    return this.props.children ? (
      <span className={classnames(styles.icon, {
        [styles.iconStart]: iconPosition === 'start',
        [styles.iconEnd]: iconPosition === 'end'
      })}>
        <Icon />
      </span>
    ) : null
  }

  renderDetails (expanded, detailsProps) {
    const { children, size, iconPosition, fluidWidth } = this.props

    return (
      <div
        {...detailsProps}
        className={classnames(styles.details, {
          [styles[size]]: size,
          [styles.hiddenDetails]: !expanded,
          [styles.expandedDetails]: expanded,
          [styles.indentDetails]: iconPosition === 'start' && !fluidWidth
        })}
      >
        {children && expanded && this.renderContent()}
      </div>
    )
  }

  renderContent () {
    return (
      <div className={classnames({ [styles.content]: this.shouldAnimateContent })}>
        {this.props.children}
      </div>
    )
  }

  render () {
    const {
      variant,
      iconPosition,
      fluidWidth
    } = this.props

    const positionIconAtEnd = iconPosition === 'end' && (variant === 'filled' || fluidWidth)

    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true,
      [styles.positionIconAtEnd]: positionIconAtEnd
    }

    return (
      <Expandable
        {...pickProps(this.props, Expandable.propTypes)}
      >
      {({ expanded, getToggleProps, getDetailsProps}) => {
        return (
          <div className={classnames(classes)}>
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
