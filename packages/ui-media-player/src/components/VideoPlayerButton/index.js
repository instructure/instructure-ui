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

import styles from './styles.css'
import theme from './theme'

/**
---
private: true
---
@module VideoPlayerButton
**/
@themeable(theme, styles)
export default class VideoPlayerButton extends Component {
  static propTypes = {
    /**
     * Id of the video element. Used to ensure
     * correct aria properties are applied.
     */
    videoId: PropTypes.string.isRequired,
    forwardRef: PropTypes.func,
    onClick: PropTypes.func,
    children: PropTypes.node
  }

  static defaultProps = {
    forwardRef: (ref) => {},
    onClick: (e) => {},
    children: null
  }

  handleKeyDown = (e) => {
    // prevent FF from emitting a keyboard event
    if (e.key === ' ' || e.key === 'Enter') {
      e.stopPropagation()
    }
  }

  render () {
    const { videoId, onClick, forwardRef, children } = this.props

    return (
      <button
        className={styles.button}
        onClick={onClick}
        onKeyDown={this.handleKeyDown}
        aria-controls={videoId}
        ref={forwardRef}
      >
        {children}
      </button>
    )
  }
}
