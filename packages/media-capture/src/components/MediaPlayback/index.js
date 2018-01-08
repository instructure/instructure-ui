import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VideoPlayer from '../VideoPlayer'

export default class MediaPlayback extends Component {
  static propTypes = {
    videoSrc: PropTypes.string.isRequired
  }

  render () {
    return <VideoPlayer src={this.props.videoSrc} />
  }
}
