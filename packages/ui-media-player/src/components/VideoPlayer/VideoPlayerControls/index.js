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
import classnames from 'classnames'
import themeable from '@instructure/ui-themeable'

import PlayPauseButton from '../PlayPauseButton'
import Timebar from '../Timebar'

import styles from './styles.css'

import * as VideoStates from '../videoStates'

/**
---
parent: VideoPlayer
---
**/
@themeable({}, styles)
class VideoPlayerControls extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      seek: PropTypes.func.isRequired,
      togglePlay: PropTypes.func.isRequired,
      showControls: PropTypes.func.isRequired
    }).isRequired,
    /**
     * Id of the video element. Used to ensure
     * correct aria properties are applied.
     */
    videoId: PropTypes.string.isRequired,
    state: PropTypes.oneOf(Object.values(VideoStates)).isRequired,
    /**
     * Number of seconds that have been buffered.
     */
    buffered: PropTypes.number,
    /**
     * The current playback time in seconds.
     */
    currentTime: PropTypes.number,
    /**
     * The length of the video in seconds.
     */
    duration: PropTypes.number,
    showControls: PropTypes.bool,
    onMount: PropTypes.func
  }

  static defaultProps = {
    showControls: false,
    duration: 0,
    buffered: 0,
    currentTime: 0,
    onMount ({ playButton, timebar }) { }
  }

  componentDidMount () {
    this.props.onMount({
      playButton: this.playButton,
      timebar: this.timebar
    })
  }

  preventBubbling = (e) => {
    e.stopPropagation()
    this.props.actions.showControls()
  }

  handleTimebarClick = (time) => {
    this.props.actions.seek(time)
  }

  buttonRef = (el) => {
    this.playButton = el
  }

  timebarRef = (el) => {
    this.timebar = el
  }

  render () {
    const {
      state,
      duration,
      buffered,
      currentTime,
      showControls,
      actions,
      videoId
    } = this.props

    const classes = {
      [styles.container]: true,
      [styles.hidden]: !showControls
    }

    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    return (
      <div className={classnames(classes)} onClick={this.preventBubbling}>
        <PlayPauseButton
          variant={state}
          onClick={actions.togglePlay}
          videoId={videoId}
          buttonRef={this.buttonRef}
        />
        <Timebar
          duration={duration}
          currentTime={currentTime}
          buffered={buffered}
          videoId={videoId}
          onClick={this.handleTimebarClick}
          timebarRef={this.timebarRef}
        />
      </div>
    )
    /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
  }
}

export default VideoPlayerControls
