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
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'
import themeable from '@instructure/ui-themeable'
import { translate } from '../../../constants/translated/translations'

import styles from './styles.css'
import theme from './theme'

const MULTIPLIER = 1.5
/**
---
private: true
---
**/
@themeable(theme, styles)
class AudioSignal extends Component {
  static propTypes = {
    soundMeter: PropTypes.shape({
      volume: PropTypes.number.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }

    this.raf = []
  }

  componentWillUnmount () {
    this.raf.forEach(request => {
      request.cancel()
    })
    this.raf = []
  }

  componentDidMount () {
    this.raf.push(
      requestAnimationFrame(() => {
        this.getVolume()
      })
    )
  }

  getVolume () {
    const volume = Math.floor(this.props.soundMeter.volume * 100) * MULTIPLIER
    if (volume !== this.state.value) {
      this.setState({
        value: volume
      })
    }

    this.raf.push(
      requestAnimationFrame(() => {
        this.getVolume()
      })
    )
  }

  render () {
    /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
    return (
      <progress
        className={styles.progress}
        role="progressbar"
        aria-valuemin="0"
        aria-valuenow={this.state.value}
        aria-valuemax="100"
        aria-label={translate('ARIA_VOLUME')}
        max="100"
        value={this.state.value}
      />
    )
    /* eslint-enable jsx-a11y/no-redundant-roles, jsx-a11y/no-noninteractive-element-to-interactive-role */
  }
}

export default AudioSignal
