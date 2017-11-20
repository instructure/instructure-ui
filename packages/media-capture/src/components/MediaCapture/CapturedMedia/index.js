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

import MediaStream from '../MediaStream'
import MediaPlayback from '../MediaPlayback'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  STARTING,
  SAVING,
  LOADING
} from '../../../constants/CaptureStates'

/**
---
private: true
---
**/
export default class CapturedMedia extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    videoSrc: PropTypes.string.isRequired,
    videoDeviceId: PropTypes.string.isRequired,
    audioDeviceId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  render () {
    const MediaStreamGuard = (state) => {
      if (![LOADING, READY, STARTING, RECORDING].includes(state)) return null

      return (
        <MediaStream
          captureState={state}
          videoDeviceId={this.props.videoDeviceId}
          audioDeviceId={this.props.audioDeviceId}
          actions={{...this.props.actions}}
        />
      )
    }

    const MediaPlaybackGuard = (state) => {
      if (![PREVIEWSAVE, SAVING].includes(state)) return null

      return <MediaPlayback videoSrc={this.props.videoSrc} />
    }

    return (
      MediaStreamGuard(this.props.captureState) ||
      MediaPlaybackGuard(this.props.captureState)
    )
  }
}
