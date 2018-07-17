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

import PlayPauseButton from './PlayPauseButton'
import Timebar from './Timebar'
import Volume from './VolumeContainer'
import PlaybackSpeed from './PlaybackSpeedContainer'
import SourceChooser from './SourceChooserContainer'
import FullScreenButton from './FullScreenButton'
import { Consumer } from '../VideoPlayer/VideoPlayerContext'

import theme from './theme'
import styles from './styles.css'

/**
---
parent: VideoPlayer
---
**/
@themeable(theme, styles)
class VideoPlayerControls extends Component {
  static propTypes = {
    /**
     * Children of the <VideoPlayerControls />
     */
    children: PropTypes.node
  }

  static defaultProps = {
    showControls: false
  }

  static CustomControls = (props) => (
    <Consumer>
      {props.children}
    </Consumer>
  )

  static PlayPauseButton = PlayPauseButton

  static Timebar = (props) => (
    <Consumer>
      {({
        state,
        actions
      }) => (
        <Timebar
          duration={state.duration}
          currentTime={state.currentTime}
          buffered={state.buffered}
          videoId={state.videoId}
          onClick={actions.seek}
          {...props}
        />
      )}
    </Consumer>
  )

  static Volume = Volume

  static PlaybackSpeed = PlaybackSpeed

  static SourceChooser = SourceChooser

  static FullScreenButton = FullScreenButton

  handleOnClick = (showControls) => (e) => {
    e.stopPropagation()
    showControls()
  }

  render () {
    return (
      <Consumer>
        {({
          state,
          actions
        }) => {
          const { showControls } = state
          const classes = {
            [styles.container]: true,
            [styles.hidden]: !showControls
          }

          /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
          return (
            <div className={classnames(classes)} onClick={this.handleOnClick(actions.showControls)}>
              {this.props.children}
            </div>
          )
          /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        }}
      </Consumer>
    )
  }
}

export default VideoPlayerControls
