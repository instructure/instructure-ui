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

import IconPlaySolid from '@instructure/ui-icons/lib/Solid/IconPlay'
import IconPauseSolid from '@instructure/ui-icons/lib/Solid/IconPause'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'

import * as VideoStates from '../videoStates'
import { translate } from '../../../constants/translated/translations'

import styles from './styles.css'
import theme from './theme'

/**
---
private: true
---
**/
@themeable(theme, styles)
class PlayPauseButton extends Component {
  static propTypes = {
    /**
     * Id of the video element. Used to ensure
     * correct aria properties are applied.
     */
    videoId: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(Object.values(VideoStates)),
    onClick: PropTypes.func,
    forwardRef: PropTypes.func
  }

  static defaultProps = {
    variant: VideoStates.PAUSED,
    onClick: (e) => {},
    forwardRef: (ref) => {}
  }

  config (variant) {
    const VARIANTS = {
      [VideoStates.PAUSED]: {
        label: translate('PLAYBACK_PLAY'),
        Icon: IconPlaySolid
      },
      [VideoStates.ENDED]: {
        label: translate('PLAYBACK_PLAY'),
        Icon: IconPlaySolid
      },
      [VideoStates.PLAYING]: {
        label: translate('PLAYBACK_PAUSE'),
        Icon: IconPauseSolid
      }
    }

    return VARIANTS[variant]
  }

  handleKeyDown = (e) => {
    // prevent FF from emitting a keyboard event
    if (e.key === ' ') {
      e.stopPropagation()
    }
  }

  render () {
    const { variant, onClick, forwardRef, videoId } = this.props

    const { label, Icon } = this.config(variant)

    return (
      <button
        className={styles.button}
        onClick={onClick}
        onKeyDown={this.handleKeyDown}
        aria-controls={videoId}
        ref={forwardRef}
      >
        <ScreenReaderContent>{label}</ScreenReaderContent>
        <Icon size="x-small" />
      </button>
    )
  }
}

export default PlayPauseButton
