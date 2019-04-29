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
import IconStarSolid from '@instructure/ui-icons/lib/IconStarSolid'
import IconStarLightSolid from '@instructure/ui-icons/lib/IconStarLightSolid'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'

import Transition from '@instructure/ui-motion/lib/components/Transition'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Rating
---
**/
@themeable(theme, styles)
export default class RatingIcon extends Component {
  static propTypes = {
    animationDelay: PropTypes.number,
    animateFill: PropTypes.bool,
    filled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    animationDelay: 200,
    animateFill: false,
    filled: false,
    size: 'medium'
  }

  constructor (props) {
    super()

    this.state = {
      filled: props.filled && !props.animateFill
    }
  }

  _timeouts = []

  componentDidMount () {
    if (this.props.animateFill) {
      this._timeouts.push(setTimeout(this.fill, this.props.animationDelay))
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.animateFill && this.props.filled && (this.props.filled !== prevProps.filled)) {
      this.fill()
    }
  }

  componentWillUnmount () {
    this._animation && this._animation.cancel()
    this._timeouts.forEach((timeout) => clearTimeout(timeout))
  }

  fill = () => {
    this._animation = requestAnimationFrame(() => {
      this.setState({
        filled: true
      })
    })
  }

  handleTransitionEnter = () => {
    this.applyTheme()
  }

  render () {
    const {
      size,
      animateFill
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles.filled]: this.state.filled,
      [styles.empty]: !this.state.filled
    }

    const Icon = this.state.filled ? IconStarSolid : IconStarLightSolid

    return (
      <span className={classnames(classes)}>
        <span>
          {
            (this.state.filled && animateFill) ? (
              <Transition
                in
                transitionOnMount
                type="scale"
                onEnter={this.handleTransitionEnter}
              >
                <Icon className={styles.icon} />
              </Transition>
            ) : <Icon className={styles.icon} />
          }
        </span>
      </span>
    )
  }
}
