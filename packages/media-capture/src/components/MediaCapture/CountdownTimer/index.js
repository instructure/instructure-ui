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

import styles from './styles.css'
import theme from './theme'

/**
---
private: true
---
**/
@themeable(theme, styles)
class CountdownTimer extends Component {
  static propTypes = {
    countdownFrom: PropTypes.number,
    actions: PropTypes.shape({
      countdownComplete: PropTypes.func
    })
  }

  static defaultProps = {
    countdownFrom: 3,
    actions: {
      countdownComplete: () => {}
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      currentValue: props.countdownFrom
    }
  }

  componentDidMount () {
    this.startCountdown()
  }

  componentWillUnmount () {
    this.clearCountdown()
  }

  startCountdown = () => {
    this.timer = setInterval(() => {
      this.setState({
        currentValue: this.state.currentValue - 1
      }, () => {
        if (this.state.currentValue === 0) {
          this.clearCountdown()
          this.props.actions.countdownComplete()
        }
      })
    }, 1000)
  }

  clearCountdown = () => {
    if (this.timer) clearInterval(this.timer)
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <time aria-live="assertive" role="status">{this.state.currentValue}</time>
        </div>
      </div>
    )
  }
}

export default CountdownTimer
