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

import AudioSignal from '../AudioSignal'
import CountdownTimer from '../CountdownTimer'
import Loading from '../Loading'
import Message from '../Message'
import RecordingBadge from '../RecordingBadge'
import {
  STARTING,
  RECORDING,
  PREVIEWSAVE,
  SAVING,
  LOADING,
  ERROR,
  READY
} from '../../../constants/CaptureStates'
import { translate } from '../../../constants/translated/translations'

import styles from './styles.css'
import theme from './theme'

/**
---
private: true
---
**/
@themeable(theme, styles)
class MediaOverlay extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    soundMeter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    msg: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    soundMeter: {}
  }

  render () {
    const LoadingGuard = (state) => {
      if (state !== LOADING) return null

      return <Loading />
    }

    const ErrorGuard = (state) => {
      if (state !== ERROR) return null

      return <Message msg={this.props.msg} />
    }

    const CountdownTimerGuard = (state) => {
      if (state !== STARTING) return null

      return <CountdownTimer actions={this.props.actions} />
    }

    const PreviewBadgeGuard = (state) => {
      if (![PREVIEWSAVE, SAVING].includes(state)) return null

      return (
        <div className={styles.previewBadge}>
          { translate('PREVIEW') }
        </div>
      )
    }

    const RecordingGuard = (state) => {
      if (state !== RECORDING) return null

      return (
        <div className={styles.bottomBar}>
          <AudioSignal reduced soundMeter={this.props.soundMeter} />
          <RecordingBadge />
        </div>
      )
    }

    const ReadyGuard = (state) => {
      if (state !== READY) return null

      return (
        <div className={styles.bottomBar}>
          <AudioSignal soundMeter={this.props.soundMeter} />
        </div>
      )
    }

    return (
      LoadingGuard(this.props.captureState) ||
      ReadyGuard(this.props.captureState) ||
      ErrorGuard(this.props.captureState) ||
      CountdownTimerGuard(this.props.captureState) ||
      RecordingGuard(this.props.captureState) ||
      PreviewBadgeGuard(this.props.captureState)
    )
  }
}

export default MediaOverlay
