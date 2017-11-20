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

import { getUserMedia, enumerateDevices, getAudioContext } from '../../../core/mediaDevices'
import { startMediaRecorder } from '../../../core/mediaRecorder'
import { LOADING, RECORDING, READY } from '../../../constants/CaptureStates'
import { translate } from '../../../constants/translated/translations'

import styles from './styles.css'

const HAVE_ENOUGH_DATA = 4
const POLL_DURATION = 200

const ERRORS = {
  NotAllowedError: translate('NOT_ALLOWED_ERROR'),
  NotReadableError: translate('NOT_READABLE_ERROR'),
  TrackStartError: translate('NOT_READABLE_ERROR'),
  default: translate('DEFAULT_ERROR')
}

/**
---
private: true
---
**/
@themeable({}, styles)
class MediaStream extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    videoDeviceId: PropTypes.string.isRequired,
    audioDeviceId: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      deviceRequestAccepted: PropTypes.func,
      mediaRecorderInitialized: PropTypes.func,
      videoObjectGenerated: PropTypes.func,
      devicesFound: PropTypes.func,
      soundMeterInitialized: PropTypes.func,
      errorOccurred: PropTypes.func
    })
  }

  static defaultProps = {
    actions: {
      deviceRequestAccepted: () => {},
      devicesFound: () => {},
      mediaRecorderInitialized: () => {},
      soundMeterInitialized: () => {},
      videoObjectGenerated: () => {},
      errorOccurred: () => {}
    }
  }

  shouldComponentUpdate (nextProps) {
    return (
      this.props.captureState !== nextProps.captureState ||
      this.deviceChanged(nextProps.audioDeviceId, nextProps.videoDeviceId)
    )
  }

  componentDidMount () {
    getUserMedia(
      this.props.audioDeviceId,
      this.props.videoDeviceId,
      this.streamSuccess,
      this.error
    )
    enumerateDevices(this.deviceSuccess, this.error)
  }

  deviceChanged = (audioId, videoId) => {
    return (
      this.props.audioDeviceId !== audioId ||
      this.props.videoDeviceId !== videoId
    )
  }

  componentDidUpdate (prevProps) {
    if (this.props.captureState === READY && this.stream) {
      if (this.deviceChanged(prevProps.audioDeviceId, prevProps.videoDeviceId)) {
        getUserMedia(
          this.props.audioDeviceId,
          this.props.videoDeviceId,
          this.streamSuccess,
          this.error
        )
      }
    }

    if (this.props.captureState === RECORDING && this.stream) {
      startMediaRecorder(
        this.stream,
        this.onMediaRecorderInit,
        this.blobSuccess,
        this.error
      )
    }
  }

  componentWillUnmount () {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop())
    }
  }

  onMediaRecorderInit = (mediaRecorder) => {
    this.props.actions.mediaRecorderInitialized(mediaRecorder)
  }

  pollReadyState () {
    // we poll here because rendering the stream inside the
    // video element is not instantaneous. Check the readyState
    // for an appropriate signal.
    const poll = setInterval(() => {
      if (this.video.readyState === HAVE_ENOUGH_DATA) {
        this.props.captureState === LOADING && this.props.actions.deviceRequestAccepted()
        clearInterval(poll)
      }
    }, POLL_DURATION)
  }

  streamSuccess = (stream) => {
    this.stream = stream
    if (this.video) {
      getAudioContext(this.stream, this.soundMeterEmitted, this.error)
      this.video.srcObject = this.stream
      this.pollReadyState()
    }
  }

  soundMeterEmitted = (sm) => {
    this.props.actions.soundMeterInitialized(sm)
  }

  deviceSuccess = (types) => {
    this.props.actions.devicesFound(types)
  }

  blobSuccess = (blob) => {
    const src = window.URL.createObjectURL(blob)
    this.props.actions.videoObjectGenerated(src, blob)
  }

  error = (err) => {
    if (err) {
      const key = ERRORS[err.name] ? err.name : 'default'
      this.props.actions.errorOccurred(ERRORS[key])
    }
  }

  render () {
    return (
      <div>
        <video
          className={styles.video}
          controls={false}
          autoPlay
          muted
          tabIndex="-1"
          ref={el => { this.video = el }}
        />
      </div>
    )
  }
}

export default MediaStream
