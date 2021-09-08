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
/** @jsxFrag React.Fragment */
// test is breaking without importing React here
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import { ms } from '@instructure/ui-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx, Global } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { BaseTransition } from './BaseTransition'
import type { TransitionProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components/utilities
---
@module Transition
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Transition extends Component<TransitionProps> {
  static readonly componentId = 'Transition'

  static allowedProps = allowedProps
  static propTypes = propTypes

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
    // @ts-expect-error ts-migrate(6133) FIXME: 'toState' is declared but its value is never read.
    onTransition: function (toState, fromState) {},
    children: null
  }

  static states = BaseTransition.states

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

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

  /**
   * Transition helper:
   * After emotion migration the only way to keep
   * the old BaseTransition functionality with adding and removing
   * classes was to add the `Global` helper of `emotion`
   *
   * Todo: try to refactor or replace Transition/BaseTransition component in v9.0.0. so that it is not class based
   */
  renderTransitionHelper = () => {
    const { styles } = this.props

    return <Global styles={styles?.globalStyles} />
  }

  render() {
    const { type, children, styles, ...props } = this.props

    const duration = ms(styles?.duration as number)

    return (
      <>
        {this.renderTransitionHelper()}
        <BaseTransition
          {...props}
          enterDelay={duration}
          exitDelay={duration}
          //@ts-expect-error TODO:
          transitionClassName={styles?.classNames?.transitioning}
          //@ts-expect-error TODO:
          exitedClassName={styles?.classNames?.exited}
          //@ts-expect-error TODO:
          exitingClassName={styles?.classNames?.exiting}
          //@ts-expect-error TODO:
          enteredClassName={styles?.classNames?.entered}
          //@ts-expect-error TODO:
          enteringClassName={styles?.classNames?.entering}
          onEntered={this.handleEntered}
          onExited={this.handleExited}
        >
          {children}
        </BaseTransition>
      </>
    )
  }
}

export default Transition
export { Transition }
