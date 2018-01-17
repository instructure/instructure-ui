import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'
import debounce from '@instructure/ui-utils/lib/debounce'
import generate from '@instructure/ui-utils/lib/uid'

import VideoPlayerControls from './components/VideoPlayerControls'

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
category: components
---
**/

@themeable(theme, styles)
export default class VideoPlayer extends Component {
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
    controls: PropTypes.func
  }

  static defaultProps = {
    controls: (state, actions) => {
      return <VideoPlayerControls {...state} actions={actions} />
    }
  }

  constructor (props) {
    super(props)

    this.video = null
    this.state = {
      state: PAUSED,
      showControls: true,
      videoId: generate()
    }
  }

  componentDidMount () {
    this._registerEventHandlers()
  }

  componentWillUnmount () {
    MEDIA_ELEMENT_EVENTS.forEach((evt) => {
      this.video.removeEventListener(evt, this.applyVideoProps)
    })
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

  render () {
    const { src, controls } = this.props

    const actions = {
      play: this.play,
      pause: this.pause,
      seek: this.seek,
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
      // TODO: needs i18n
      'aria-label': 'Video Player'
    }

    /* eslint-disable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
    return (
      <div {...wrapperProps}>
        <video
          ref={this.setVideoRef}
          src={src}
          id={this.state.videoId}
          className={styles.video}
          tabIndex="-1"
        />
        { controls(this.state, actions) }
      </div>
    )
    /* eslint-enable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
  }
}
