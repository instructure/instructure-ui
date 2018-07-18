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

import Menu, { MenuItemGroup, MenuItem } from '@instructure/ui-menu/lib/components/Menu'
import Text from '@instructure/ui-elements/lib/components/Text'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'

import VideoPlayerButton from '../../../VideoPlayerButton'
import { translate } from '../../../../constants/translated/translations'

/**
---
private: true
---
**/
class PlaybackSpeed extends Component {
  static propTypes = {
    showControls: PropTypes.bool.isRequired,
    videoId: PropTypes.string.isRequired,
    playbackSpeed: PropTypes.number.isRequired,
    mountNode: PropTypes.func.isRequired,
    handleShowControls: PropTypes.func.isRequired,
    setPlaybackSpeed: PropTypes.func.isRequired,
    playbackSpeedOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
    forwardRef: PropTypes.func
  }

  static defaultProps = {
    forwardRef: (ref) => {}
  }

  state = {
    showPopover: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.showControls !== prevProps.showControls && !this.props.showControls) {
      this.hidePopover()
    }
  }

  togglePopover = () => {
    this.setState(prevState => ({ showPopover: !prevState.showPopover }))
  }

  hidePopover = () => {
    this.setState({ showPopover: false })
  }

  handleKeyDown = e => {
    e.preventDefault()
    this.props.handleShowControls()
  }

  renderPlaybackSpeedOptionLabels = (playbackSpeedOptions) => (
    playbackSpeedOptions.map((playbackSpeed, idx) => {
      const playbackSpeedOptionLabel = `${playbackSpeed}x`

      return (
        <MenuItem key={idx} value={playbackSpeed} onKeyDown={this.handleKeyDown}>
          {playbackSpeedOptionLabel}
        </MenuItem>
      )
    })
  )

  handleOnSelect = (e, [speed]) => {
    this.props.setPlaybackSpeed(speed)
  }

  handleOnMouseMove = () => {
    this.props.handleShowControls()
  }

  render () {
    const { videoId, playbackSpeed, mountNode, playbackSpeedOptions, forwardRef } = this.props
    const label = translate('PLAYBACK_SPEED')
    const screenReaderContent = <ScreenReaderContent>{label}</ScreenReaderContent>

    return (
      <Menu
        placement="top"
        show={this.state.showPopover}
        onToggle={this.togglePopover}
        trigger={
          <VideoPlayerButton
            videoId={videoId}
            forwardRef={forwardRef}
            theme={{ padding: '0 auto', width: '57px' }}
          >
            {screenReaderContent}
            <Text>{`${playbackSpeed}x`}</Text>
          </VideoPlayerButton>
        }
        mountNode={mountNode()}
        label={label}
      >
        <MenuItemGroup
          onMouseMove={this.handleOnMouseMove}
          label={screenReaderContent}
          selected={[playbackSpeed]}
          onSelect={this.handleOnSelect}
        >
          {this.renderPlaybackSpeedOptionLabels(playbackSpeedOptions)}
        </MenuItemGroup>
      </Menu>
    )
  }
}

export default PlaybackSpeed
