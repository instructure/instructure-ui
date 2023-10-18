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

import { allowedProps, propTypes } from './props'
import type { TransitionProps } from './props'

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
    transitionExit: true
  }

  static states = BaseTransition.states

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleExited = () => {
    if (typeof this.props.onExited === 'function') {
      this.props.onExited(this.props.type!)
    }
  }

  handleEntered = () => {
    if (typeof this.props.onEntered === 'function') {
      this.props.onEntered(this.props.type!)
    }
  }

  // Transition helper:
  // After emotion migration the only way to keep
  // the old BaseTransition functionality with adding and removing
  // classes was to add the `Global` helper of `emotion`
  // Todo: try to refactor or replace Transition/BaseTransition component in v9.0.0. so that it is not class based
  renderTransitionHelper = () => {
    const { styles } = this.props

    return <Global styles={styles?.globalStyles} />
  }

  render() {
    const { type, children, styles, ...props } = this.props

    const duration = ms(styles!.duration)

    return (
      <>
        {this.renderTransitionHelper()}
        <BaseTransition
          {...props}
          enterDelay={duration}
          exitDelay={duration}
          transitionClassName={styles!.classNames.transitioning}
          exitedClassName={styles!.classNames.exited}
          exitingClassName={styles!.classNames.exiting}
          enteredClassName={styles!.classNames.entered}
          enteringClassName={styles!.classNames.entering}
          onEntered={this.handleEntered}
          onExited={this.handleExited}
          elementRef={this.handleRef}
        >
          {children}
        </BaseTransition>
      </>
    )
  }
}

export default Transition
export { Transition }
