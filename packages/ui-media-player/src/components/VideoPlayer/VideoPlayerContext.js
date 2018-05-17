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
import { Component } from 'react'
import PropTypes from 'prop-types'

import * as VideoStates from '../../constants/videoStates'
import * as ScreenStates from '../../constants/screenStates'

const VideoPlayerState = {
  state: PropTypes.shape({
    videoState: PropTypes.oneOf(Object.values(VideoStates)).isRequired,
    screenState: PropTypes.oneOf(Object.values(ScreenStates)).isRequired,
    loadingSrc: PropTypes.bool.isRequired,
    showControls: PropTypes.bool.isRequired,
    videoId: PropTypes.string.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    seek: PropTypes.func.isRequired,
    showControls: PropTypes.func.isRequired,
    togglePlay: PropTypes.func.isRequired,
    toggleFullScreen: PropTypes.func.isRequired
  }).isRequired
}

class Provider extends Component {
  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.shape(VideoPlayerState)
  }

  static childContextTypes = VideoPlayerState

  getChildContext() {
    return this.props.value
  }

  render() {
    return this.props.children
  }
}

class Consumer extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  }

  static contextTypes = VideoPlayerState

  render() {
    return this.props.children(this.context)
  }
}

export { Provider, Consumer }
