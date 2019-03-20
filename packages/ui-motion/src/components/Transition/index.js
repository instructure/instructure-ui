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
import themeable from '@instructure/ui-themeable'
import ms from '@instructure/ui-utils/lib/ms'
import testable from '@instructure/ui-testable'

import BaseTransition from './BaseTransition'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@testable()
@themeable(theme, styles)
export default class Transition extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'fade',
      'scale',
      'slide-down',
      'slide-up',
      'slide-left',
      'slide-right'
    ]),
    /**
     * A single element to animate in and out
     */
    children: PropTypes.element,
    /**
     * Show the component; triggers the enter or exit animation
     */
    in: PropTypes.bool,
    /**
     * Unmount the component (remove it from the DOM) when it is not shown
     */
    unmountOnExit: PropTypes.bool,
    /**
     * Run the enter animation when the component mounts, if it is initially
     * shown
     */
    transitionOnMount: PropTypes.bool,
    /**
     * Run the enter animation
     */
    transitionEnter: PropTypes.bool,
    /**
     * Run the exit animation
     */
    transitionExit: PropTypes.bool,
    /**
     * Callback fired when transitioning to the next state
     */
    onTransition: PropTypes.func,
    /**
     * Callback fired before the "entering" classes are applied
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired after the "entering" classes are applied
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired after the "enter" classes are applied
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired before the "exiting" classes are applied
     */
    onExit: PropTypes.func,
    /**
     * Callback fired after the "exiting" classes are applied
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired after the "exited" classes are applied
     */
    onExited: PropTypes.func
  }

  static defaultProps = {
    type: 'fade',
    in: false,
    unmountOnExit: false,
    transitionOnMount: false,
    transitionEnter: true,
    transitionExit: true,

    onEnter: function () {},
    onEntering: function () {},
    onEntered: function () {},
    onExit: function () {},
    onExiting: function () {},
    onExited: function () {},
    onTransition: function (toState, fromState) {},
    children: null
  }

  static states = BaseTransition.states

  handleExited = () => {
    if (typeof this.props.onExited === 'function') {
      this.props.onExited(this.props.type)
    }
  }

  handleEntered = () => {
    if (typeof this.props.onEntered === 'function') {
      this.props.onEntered(this.props.type)
    }
  }

  render () {
    const {
      type,
      children,
      ...props
    } = this.props

    const duration = ms(this.theme.duration)

    const classNames = type ? {
      'exited': styles[`${type}--exited`],
      'exiting': styles[`${type}--exiting`],
      'entering': styles[`${type}--entered`],
      'entered': styles[`${type}--entering`]
    } : {}

    return (
      <BaseTransition
        {...props}
        enterDelay={duration}
        exitDelay={duration}
        transitionClassName={styles[type]}
        exitedClassName={classNames.exited}
        exitingClassName={classNames.exiting}
        enteredClassName={classNames.entering}
        enteringClassName={classNames.entered}
        onEntered={this.handleEntered}
        onExited={this.handleExited}
      >
        {children}
      </BaseTransition>
    )
  }
}
