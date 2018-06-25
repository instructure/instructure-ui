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
import screenfull from 'screenfull'

import themeable from '@instructure/ui-themeable'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'

import Loading from '../Loading'
import VideoPlayerControls from '../VideoPlayerControls'
import { translate } from '../../constants/translated/translations'
import { Provider } from './VideoPlayerContext'
import {
  PAUSED,
  PLAYING,
  ENDED,
  WINDOWED_SCREEN,
  FULL_SCREEN
} from '../../constants'

import styles from './styles.css'
import theme from './theme'

export const SEEK_INTERVAL_SECONDS = 5
export const JUMP_INTERVAL_SECONDS = 30
export const SEEK_VOLUME_INTERVAL = 0.05
export const JUMP_VOLUME_INTERVAL = 0.1
export const MEDIA_ELEMENT_EVENTS = ['loadedmetadata', 'progress', 'timeupdate', 'seeked', 'ended', 'volumechange']

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
    controls: (VPC) => {
      return (
        <VPC>
          <VPC.PlayPauseButton />
          <VPC.Timebar />
          <VPC.Volume />
          <VPC.FullScreenButton />
        </VPC>
      )
    },
    alwaysShowControls: false
  }

  mediaPlayerWrapper = null
  videoWrapper = null
  video = null
  state = {
    videoState: PAUSED,
    screenState: WINDOWED_SCREEN,
    muted: false,
    volume: 1,
    loadingSrc: true,
    showControls: true,
    videoId: generateElementId('VideoPlayer')
  }

  componentDidMount () {
    this._registerEventHandlers()
  }

  componentWillUnmount () {
    screenfull.off('change', this.updateScreenState)
    MEDIA_ELEMENT_EVENTS.forEach((evt) => {
      this.video.removeEventListener(evt, this.applyVideoProps)
    })
    // remove the video ref and stop applying video props
    this.video = null
    this.videoWrapper = null
    this.mediaPlayerWrapper = null
  }

  _registerEventHandlers () {
    MEDIA_ELEMENT_EVENTS.forEach((evt) => {
      this.video.addEventListener(evt, this.applyVideoProps)
    })
    screenfull.on('change', this.updateScreenState)
  }

  handleKeyPress = (e) => {
    const { currentTime, duration } = this.state

    const keyHandlers = {
      ArrowLeft: () => {
        this.seek(currentTime - SEEK_INTERVAL_SECONDS)
      },
      ArrowRight: () => {
        this.seek(currentTime + SEEK_INTERVAL_SECONDS)
      },
      ArrowUp: () => {
        this.seek(currentTime + SEEK_INTERVAL_SECONDS)
      },
      ArrowDown: () => {
        this.seek(currentTime - SEEK_INTERVAL_SECONDS)
      },
      PageUp: () => {
        this.seek(currentTime + JUMP_INTERVAL_SECONDS)
      },
      PageDown: () => {
        this.seek(currentTime - JUMP_INTERVAL_SECONDS)
      },
      Home: () => {
        this.seek(0)
      },
      End: () => {
        this.seek(duration)
      },
      ' ': () => {
        this.togglePlay()
      },
      Enter: () => {
        this.togglePlay()
      },
      /*
        Bug specific to IE 11 for fullscreen keyboard shortcut.
        onKeyDown on neither 'f' nor 'F' work, but clicking the
        FullScreenButton works. I've also tried getting the
        FullScreenButton's ref and invoking click() (HTML API).
      */
      f: () => {
        this.toggleFullScreen()
      },
      F: () => {
        this.toggleFullScreen()
      },
      m: () => {
        this.toggleMute()
      },
      M: () => {
        this.toggleMute()
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
        if (this.state.videoState === PLAYING) {
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
    if (this.state.videoState === PLAYING) {
      this.pause()
    } else {
      this.play()
    }
  }

  toggleFullScreen = () => {
    if (screenfull.enabled) {
      screenfull.toggle(this.mediaPlayerWrapper)
    }
  }

  seek = (time) => {
    const { duration } = this.state
    this.video.currentTime = Math.min(Math.max(0, time), duration)
  }

  toggleMute = () => {
    this.setState(prevState => ({ muted: !prevState.muted }), () => {
      if (this.state.muted) {
        this.video.volume = 0
      } else {
        this.video.volume = this.state.volume
      }
    })
  }

  setVolume = (volume) => {
    if (!this.video) {
      return
    }

    const v = Math.min(Math.max(0, volume), 1)
    this.setState({ muted: false, volume: v })
    this.video.volume = v
  }

  applyVideoProps = () => {
    if (!this.video) {
      return
    }

    const buffered = this.video.buffered

    let videoState = this.video.paused ? PAUSED : PLAYING
    if (this.video.ended) {
      videoState = ENDED
    }

    const muted = this.state.muted

    this.setState({
      videoState,
      muted,
      currentTime: this.video.currentTime,
      duration: this.video.duration,
      buffered: buffered.length > 0 ? buffered.end(buffered.length - 1) : 0
    }, () => {
      if (this.state.videoState === ENDED) {
        this.seek(0)
        this.showControls()
      }
    })
  }

  updateScreenState = () => {
    if (!this.mediaPlayerWrapper) {
      return
    }

    const screenState = screenfull.isFullscreen ? FULL_SCREEN : WINDOWED_SCREEN

    this.setState({ screenState })
  }

  setVideoRef = (el) => {
    if (this.video === null) {
      this.video = el
    }
  }

  setVideoWrapperRef = (el) => {
    if (this.videoWrapper === null) {
      this.videoWrapper = el
    }
  }

  setMediaPlayerWrapperRef = (el) => {
    if (this.mediaPlayerWrapper === null) {
      this.mediaPlayerWrapper = el
    }
  }

  hideSpinner = () => {
    this.setState({ loadingSrc: false })
  }

  render () {
    const { src, controls } = this.props

    const actions = {
      play: this.play,
      pause: this.pause,
      seek: this.seek,
      setVolume: this.setVolume,
      showControls: this.showControls,
      togglePlay: this.togglePlay,
      toggleFullScreen: this.toggleFullScreen,
      toggleMute: this.toggleMute
    }

    // default values for VideoPlayerContext
    const providerState = {
      state: this.state,
      mediaPlayerWrapperRef: () => this.mediaPlayerWrapper,
      actions
    }

    const mediaPlayerWrapperProps = {
      className: styles.mediaPlayerContainer,
      ref: this.setMediaPlayerWrapperRef
    }

    const videoPlayerWrapperProps = {
      className: styles.videoPlayerContainer,
      onKeyDown: this.handleKeyPress,
      onFocus: () => this.showControls(),
      onMouseMove: () => this.showControls(),
      onClick: this.togglePlay,
      tabIndex: 0,
      role: 'presentation',
      'aria-label': translate('ARIA_VIDEO_LABEL'),
      ref: this.setVideoWrapperRef
    }

    /* eslint-disable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
    return (
      <div {...mediaPlayerWrapperProps}>
        <div {...videoPlayerWrapperProps}>
          { this.state.loadingSrc && <Loading /> }
          <video
            ref={this.setVideoRef}
            src={src}
            id={this.state.videoId}
            className={styles.video}
            tabIndex="-1"
            onCanPlay={this.hideSpinner}
          />
          <Provider value={providerState}>
            { controls(VideoPlayerControls) }
          </Provider>
        </div>
      </div>
    )
    /* eslint-enable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
  }
}

export default VideoPlayer
