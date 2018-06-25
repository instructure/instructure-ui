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

import VolumeSlider from '../VolumeSlider'
import VideoPlayerButton from '../../../VideoPlayerButton'

/**
---
private: true
---
**/
class Volume extends Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    mountNode: PropTypes.func.isRequired,
    label: PropTypes.node.isRequired,
    showControls: PropTypes.bool.isRequired,
    forwardRef: PropTypes.func,
    children: PropTypes.node
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

  showPopover = () => {
    this.setState({ showPopover: true })
  }

  hidePopover = () => {
    this.setState({ showPopover: false })
  }

  render() {
    const {
      videoId, value, onChange, onKeyDown,
      mountNode, label, forwardRef, children
    } = this.props

    return (
      <Popover
        placement="top"
        on="click"
        show={this.state.showPopover}
        onToggle={this.togglePopover}
        shouldReturnFocus
        shouldCloseOnDocumentClick
        shouldCloseOnEscape
        mountNode={mountNode()}
        variant="inverse"
      >
        <PopoverTrigger>
          <VideoPlayerButton
            videoId={videoId}
            forwardRef={forwardRef}
          >
            {label}
            {children}
          </VideoPlayerButton>
        </PopoverTrigger>
        <PopoverContent>
          <VolumeSlider
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            label={label}
          />
        </PopoverContent>
      </Popover>
    )
  }
}

export default Volume
