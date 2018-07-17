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

import VideoPlayerPopover from '../../VideoPlayerPopover'
import Volume from './Volume'
import { Consumer } from '../../VideoPlayer/VideoPlayerContext'
import { SEEK_VOLUME_INTERVAL, JUMP_VOLUME_INTERVAL } from '../../VideoPlayer'

/**
---
private: true
---
@module VolumeContainer
**/
export default class VolumeContainer extends Component {
  handleOnChange = (volume, { setVolume }) => {
    setVolume(parseFloat(volume))
  }

  calculateVolume = (volume, adjustVolume = 0) => {
    return Math.round((volume * 100 + adjustVolume * 100)) / 100
  }

  /**
   * Because PopoverContent (volume slider) is a sibling of VideoPlayer
   * instead of living inside VideoPlayerControls, the slider needs
   * its own handleKeyPress.
   */
  handleKeyPress = (e, { volume }, { setVolume, toggleMute, showControls }) => {
    const keyHandlers = {
      ArrowLeft: () => {
        setVolume(this.calculateVolume(volume, -SEEK_VOLUME_INTERVAL))
      },
      ArrowRight: () => {
        setVolume(this.calculateVolume(volume, SEEK_VOLUME_INTERVAL))
      },
      ArrowUp: () => {
        setVolume(this.calculateVolume(volume, SEEK_VOLUME_INTERVAL))
      },
      ArrowDown: () => {
        setVolume(this.calculateVolume(volume, -SEEK_VOLUME_INTERVAL))
      },
      PageUp: () => {
        setVolume(this.calculateVolume(volume, JUMP_VOLUME_INTERVAL))
      },
      PageDown: () => {
        setVolume(this.calculateVolume(volume, -JUMP_VOLUME_INTERVAL))
      },
      Home: () => {
        setVolume(0)
      },
      End: () => {
        setVolume(1)
      },
      ' ': () => {
        toggleMute()
      },
      Enter: () => {
        toggleMute()
      },
      m: () => {
        toggleMute()
      },
      M: () => {
        toggleMute()
      }
    }

    if (e.key in keyHandlers) {
      e.preventDefault()
      showControls()
      keyHandlers[e.key]()
    }
  }

  render () {
    return (
      <Consumer>
        {({
          state,
          mediaPlayerWrapperRef,
          actions
        }) => (
          <VideoPlayerPopover showControls={state.showControls}>
            {({ showPopover }, togglePopover) => (
              <Volume
                muted={state.muted}
                volume={state.volume}
                showPopover={showPopover}
                togglePopover={togglePopover}
                videoId={state.videoId}
                onChange={volume => { this.handleOnChange(volume, actions) }}
                onKeyDown={e => { this.handleKeyPress(e, state, actions) }}
                mountNode={mediaPlayerWrapperRef}
                showControls={state.showControls}
                handleShowControls={actions.showControls}
                {...this.props}
              />
            )}
          </VideoPlayerPopover>
        )}
      </Consumer>
    )
  }
}
