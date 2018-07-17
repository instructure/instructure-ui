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

import Popover, { PopoverTrigger, PopoverContent } from '@instructure/ui-overlays/lib/components/Popover'
import IconAudioSolid from '@instructure/ui-icons/lib/Solid/IconAudio'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'

import VolumeSlider from '../VolumeSlider'
import VideoPlayerButton from '../../../VideoPlayerButton'
import { translate } from '../../../../constants/translated/translations'

/**
---
private: true
---
**/
class Volume extends Component {
  static propTypes = {
    muted: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    showPopover: PropTypes.bool.isRequired,
    togglePopover: PropTypes.func.isRequired,
    videoId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    mountNode: PropTypes.func.isRequired,
    handleShowControls: PropTypes.func.isRequired,
    forwardRef: PropTypes.func,
    children: PropTypes.node
  }

  static defaultProps = {
    forwardRef: (ref) => {}
  }

  config (muted) {
    if (!muted) {
      return translate('VOLUME_UNMUTED')
    }

    return translate('VOLUME_MUTED')
  }

  render() {
    const {
      muted, volume, showPopover, togglePopover, videoId,
      onChange, onKeyDown, mountNode, forwardRef,
      handleShowControls
    } = this.props
    const value = muted ? 0 : volume
    const label = <ScreenReaderContent>{this.config(muted)}</ScreenReaderContent>

    return (
      <Popover
        placement="top"
        on="click"
        show={showPopover}
        onToggle={togglePopover}
        mountNode={mountNode()}
        variant="inverse"
      >
        <PopoverTrigger>
          <VideoPlayerButton
            videoId={videoId}
            forwardRef={forwardRef}
          >
            {label}
            <IconAudioSolid size="x-small" />
          </VideoPlayerButton>
        </PopoverTrigger>
        <PopoverContent>
          <VolumeSlider
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            label={label}
            handleShowControls={handleShowControls}
          />
        </PopoverContent>
      </Popover>
    )
  }
}

export default Volume
