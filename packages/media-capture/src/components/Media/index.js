import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MediaStream from '../MediaStream'
import MediaPlayback from '../MediaPlayback'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  STARTING,
  SAVING,
  LOADING
} from '../../constants/CaptureStates'

export default class Media extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    videoSrc: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  render () {
    const MediaStreamGuard = (state) => {
      if (![LOADING, READY, STARTING, RECORDING].includes(state)) return null

      return <MediaStream captureState={state} actions={{...this.props.actions}} />
    }

    const MediaPlaybackGuard = (state) => {
      if (![PREVIEWSAVE, SAVING].includes(state)) return null

      return <MediaPlayback videoSrc={this.props.videoSrc} />
    }

    return (
      MediaStreamGuard(this.props.captureState) ||
      MediaPlaybackGuard(this.props.captureState)
    )
  }
}
