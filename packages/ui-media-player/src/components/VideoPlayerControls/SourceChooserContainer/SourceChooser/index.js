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

import { sourcesType } from '../../../VideoPlayer/PropTypes'
import VideoPlayerButton from '../../../VideoPlayerButton'
import { translate } from '../../../../constants/translated/translations'

/**
---
private: true
---
**/
class SourceChooser extends Component {
  static propTypes = {
    showPopover: PropTypes.bool.isRequired,
    togglePopover: PropTypes.func.isRequired,
    videoId: PropTypes.string.isRequired,
    mountNode: PropTypes.func.isRequired,
    selectedSrc: PropTypes.string,
    sources: sourcesType,
    handleKeyDown: PropTypes.func.isRequired,
    handleOnSelect: PropTypes.func.isRequired,
    handleOnMouseMove: PropTypes.func.isRequired,
    forwardRef: PropTypes.func
  }

  static defaultProps = {
    forwardRef: (ref) => {},
    sources: undefined,
    selectedSrc: undefined
  }

  state = {
    showPopover: false
  }

  renderSourcesLabels = (sources) => {
    if (typeof sources[0] === 'string') {
      return (
        sources.map((src, idx) => (
          <MenuItem key={src} value={src} onKeyDown={this.props.handleKeyDown}>
            Source{idx}
          </MenuItem>
        ))
      )
    }

    return (
      sources.map((source) => {
        const { src, label } = source

        return (
          <MenuItem key={src} value={src} onKeyDown={this.props.handleKeyDown}>
            {label}
          </MenuItem>
        )
      })
    )
  }

  render () {
    if (typeof this.props.sources === 'string' || this.props.sources.length <= 1) {
      return null
    }

    const {
      showPopover, togglePopover, videoId, mountNode,
      selectedSrc, sources, handleOnMouseMove, handleOnSelect,
      forwardRef
    } = this.props
    const MAX_WIDTH = '72px'
    const label = translate('SOURCE_CHOOSER')
    const screenReaderContent = <ScreenReaderContent>{label}</ScreenReaderContent>
    let selectedSrcText
    for (let i = 0; i < sources.length; i++) {
      if (sources[i].src === selectedSrc) {
        selectedSrcText = sources[i].label
        break
      } else if (sources[i] === selectedSrc) {
        selectedSrcText = `Source${i}`
        break
      }
      selectedSrcText = '-1'
    }

    return (
      <Menu
        placement="top"
        show={showPopover}
        onToggle={togglePopover}
        trigger={
          <VideoPlayerButton
            videoId={videoId}
            forwardRef={forwardRef}
            theme={{ padding: '0 auto', width: MAX_WIDTH }}
          >
            {screenReaderContent}
            <Text>{selectedSrcText}</Text>
          </VideoPlayerButton>
        }
        mountNode={mountNode()}
        label={label}
      >
        <MenuItemGroup
          onMouseMove={handleOnMouseMove}
          label={screenReaderContent}
          selected={[selectedSrc]}
          onSelect={handleOnSelect}
        >
          {this.renderSourcesLabels(sources)}
        </MenuItemGroup>
      </Menu>
    )
  }
}

export default SourceChooser
