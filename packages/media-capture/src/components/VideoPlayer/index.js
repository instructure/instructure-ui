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
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'

import VideoPlayerControls from './VideoPlayerControls'
import Loading from '../MediaCapture/Loading'
import { translate } from '../../constants/translated/translations'

import styles from './styles.css'
import theme from './theme'

import {
  PAUSED,
  PLAYING,
  ENDED
} from './videoStates'

export const SEEK_INTERVAL_SECONDS = 5
export const JUMP_INTERVAL_SECONDS = 30
export const MEDIA_ELEMENT_EVENTS = ['loadedmetadata', 'progress', 'timeupdate', 'seeked', 'ended']

/**
---
category: components/media
experimental: true
---
**/

@themeable(theme, styles)
class VideoPlayer extends Component {
  static propTypes = {
    /**
     * URL of video to play
     */
    src: PropTypes.string.isRequired,
    /**
     * Function invoked on every render with state and actions.
     * Use this to provide a custom set of video controls.
     * Default player controls will be provided if undefined.
     */
    controls: PropTypes.func,
    /**
     * If set to true, the controls will never dismiss.
     */
    alwaysShowControls: PropTypes.bool
  }

  static defaultProps = {
    controls: (state, actions) => {
      return <VideoPlayerControls {...state} actions={actions} />
    },
    alwaysShowControls: false
  }

  constructor (props) {
    super(props)

    this.video = null
    this.state = {
      state: PAUSED,
      loadingSrc: true,
      showControls: true,
      videoId: generateElementId('VideoPlayer')
    }
  }

  componentDidMount () {
    this._registerEventHandlers()
  }

  componentWillUnmount () {
    MEDIA_ELEMENT_EVENTS.forEach((evt) => {
      this.video.removeEventListener(evt, this.applyVideoProps)
    })
    // remove the video ref and stop applying video props
    this.video = null
  }

  _registerEventHandlers () {
    MEDIA_ELEMENT_EVENTS.forEach((evt) => {
      this.video.addEventListener(evt, this.applyVideoProps)
    })
  }

  handleKeyPress = (e) => {
    const { currentTime } = this.state

    const keyHandlers = {
      ArrowLeft: () => {
        this.seek(currentTime - SEEK_INTERVAL_SECONDS)
      },
      ArrowRight: () => {
        this.seek(currentTime + SEEK_INTERVAL_SECONDS)
      },
      PageUp: () => {
        this.seek(currentTime + JUMP_INTERVAL_SECONDS)
      },
      PageDown: () => {
        this.seek(currentTime - JUMP_INTERVAL_SECONDS)
      },
      ' ': () => {
        this.togglePlay()
      }
    }

    if (e.key in keyHandlers) {
      e.preventDefault()
      this.showControls()
      keyHandlers[e.key]()
    }
  }

  showControls = (hideControlsTimeout = 2500) => {
    if (this.props.alwaysShowControls) {
      return
    }

    if (this._hideControlsTimeoutId) {
      clearTimeout(this._hideControlsTimeoutId)
    }

    this.setState({ showControls: true }, () => {
      this._hideControlsTimeoutId = setTimeout(() => {
        if (this.state.state === PLAYING) {
          this.setState({ showControls: false })
        }
      }, hideControlsTimeout)
    })
  }

  play = () => {
    this.video.play()
  }

  pause = () => {
    this.video.pause()
  }

  togglePlay = () => {
    if (this.state.state === PLAYING) {
      this.pause()
    } else {
      this.play()
    }
  }

  seek = (time) => {
    const { duration } = this.state
    this.video.currentTime = Math.min(Math.max(0, time), duration)
  }

  applyVideoProps = () => {
    if (!this.video) {
      return
    }

    const buffered = this.video.buffered

    let state = this.video.paused ? PAUSED : PLAYING
    if (this.video.ended) {
      state = ENDED
    }

    this.setState({
      state,
      currentTime: this.video.currentTime,
      duration: this.video.duration,
      buffered: buffered.length > 0 ? buffered.end(buffered.length - 1) : 0
    }, () => {
      if (this.state.state === ENDED) {
        this.seek(0)
        this.showControls()
      }
    })
  }

  setVideoRef = (el) => {
    if (this.video === null) {
      this.video = el
    }
  }

  hideSpinner = () => {
    this.setState({
      loadingSrc: false
    })
  }

  render () {
    const { src, controls } = this.props

    const actions = {
      play: this.play,
      pause: this.pause,
      seek: this.seek,
      showControls: this.showControls,
      togglePlay: this.togglePlay
    }

    const wrapperProps = {
      className: styles.container,
      onKeyDown: this.handleKeyPress,
      onFocus: () => this.showControls(),
      onMouseMove: () => this.showControls(),
      onClick: this.togglePlay,
      tabIndex: 0,
      role: 'presentation',
      'aria-label': translate('ARIA_VIDEO_LABEL')
    }

    /* eslint-disable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
    return (
      <div {...wrapperProps}>
        { this.state.loadingSrc && <Loading /> }
        <video
          ref={this.setVideoRef}
          src={src}
          id={this.state.videoId}
          className={styles.video}
          tabIndex="-1"
          onCanPlay={this.hideSpinner}
        />
        { controls(this.state, actions) }
      </div>
    )
    /* eslint-enable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
  }
}

export default VideoPlayer
export { VideoPlayerControls }
