import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MediaPlayback extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  static propTypes = {
    videoSrc: PropTypes.string.isRequired
  }

  render () {
    return (
      <video
        controls
        style={{width: '100%', height: '100%', borderRadius: '4px'}}
        src={this.props.videoSrc}
      />
    )
  }
  /* eslint-enable jsx-a11y/media-has-caption */
}
