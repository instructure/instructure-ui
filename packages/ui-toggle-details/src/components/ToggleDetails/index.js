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

import IconArrowOpenRight from '@instructure/ui-icons/lib/Solid/IconArrowOpenRight'
import IconArrowOpenDown from '@instructure/ui-icons/lib/Solid/IconArrowOpenDown'

import themeable from '@instructure/ui-themeable'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'

import styles from './styles.css'
import theme from './theme'

const toggleExpanded = ({ expanded }) => ({ expanded: !expanded })

/**
---
category: components/navigation
---
**/
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
    expanded: CustomPropTypes.controllable(
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
    icon: IconArrowOpenRight,
    iconExpanded: IconArrowOpenDown,
    iconPosition: 'start',
    expanded: null,
    defaultExpanded: false,
    onToggle: function (event, expanded) {}
  }

  constructor (props) {
    super()

    this.state = {
      expanded: this.isControlled(props) ? props.expanded : !!props.defaultExpanded
    }

    this._contentId = generateElementId('ToggleDetails')
  }

  shouldAnimateContent = false

  get expanded () {
    if (this.isControlled()) {
      return !!this.props.expanded
    }
    return !!this.state.expanded
  }

  isControlled (props = this.props) {
    return typeof props.expanded === 'boolean'
  }

  get focused () {
    return isActiveElement(this._button)
  }

  focus () {
    this._button.focus()
  }

  componentDidMount () {
    this.shouldAnimateContent = true
  }

  componentWillReceiveProps (nextProps) {
    // if the component passes from controlled to uncontrolled, save the state
    if (
      this.isControlled()
      && !this.isControlled(nextProps)
      && this.props.expanded !== this.state.expanded
    ) {
      this.setState(toggleExpanded)
    }
  }

  handleToggle = (event) => {
    if (!this.isControlled()) {
      this.setState(toggleExpanded)
    }

    this.props.onToggle(event, !this.expanded)
  }

  getButtonRef = el => this._button = el

  renderSummary () {
    const {
      summary,
      iconPosition
    } = this.props

    return (
      <span className={styles.summary}>
        {iconPosition === 'start' && this.renderIcon()}
        <span className={styles.summaryText}>{summary}</span>
        {iconPosition === 'end' && this.renderIcon()}
      </span>
    )
  }

  renderToggle () {
    const {
      variant,
      children,
      ...props
    } = this.props

    const a11yProps = children ? {
      'aria-controls': this._contentId,
      'aria-expanded': this.expanded,
      onClick: this.handleToggle
    } : {}

    if (variant === 'filled') {
      return (
        <Button
          {...omitProps(props, ToggleDetails.propTypes)}
          {...a11yProps}
          fluidWidth
          buttonRef={this.getButtonRef}
        >
          {this.renderSummary()}
        </Button>
      )
    } else if (props.href) {
      return (
        <a
          {...omitProps(props, ToggleDetails.propTypes)}
          {...a11yProps}
          className={classnames(styles.toggle, styles[variant], {
            [styles.fluidWidth]: this.props.fluidWidth
          })}
          ref={this.getButtonRef}
        >
          {this.renderSummary()}
        </a>
      )
    } else {
      return (
        <button
          {...omitProps(props, ToggleDetails.propTypes)}
          {...a11yProps}
          type="button"
          className={classnames(styles.toggle, styles[variant], {
            [styles.fluidWidth]: this.props.fluidWidth
          })}
          ref={this.getButtonRef}
        >
          {this.renderSummary()}
        </button>
      )
    }
  }

  renderIcon () {
    const { iconPosition } = this.props
    const Icon = this.expanded ? this.props.iconExpanded : this.props.icon

    return this.props.children ? (
      <span className={classnames(styles.icon, {
        [styles.iconStart]: iconPosition === 'start',
        [styles.iconEnd]: iconPosition === 'end'
      })}>
        <Icon />
      </span>
    ) : null
  }

  renderDetails () {
    const { size, iconPosition, fluidWidth } = this.props

    return (
      <div
        id={this._contentId}
        className={classnames(styles.details, {
          [styles[size]]: size,
          [styles.hiddenDetails]: !this.expanded,
          [styles.expandedDetails]: this.expanded,
          [styles.indentDetails]: iconPosition === 'start' && !fluidWidth
        })}
      >
        {this.props.children && this.renderContent()}
      </div>
    )
  }

  renderContent () {
    return this.expanded && (
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
      <div className={classnames(classes)}>
        {this.renderToggle()}
        {this.renderDetails()}
      </div>
    )
  }
}

export default ToggleDetails
