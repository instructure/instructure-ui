import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MediaStream from '../MediaStream'
import MediaPlayback from '../MediaPlayback'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  STARTING,
  SAVING
} from '../../constants/CaptureStates'

export default class Media extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired
  }

  render () {
    const MediaStreamGuard = (state) => {
      if (![READY, STARTING, RECORDING].includes(state)) return null

      return <MediaStream />
    }

    const MediaPlaybackGuard = (state) => {
      if (![PREVIEWSAVE, SAVING].includes(state)) return null


      return <MediaPlayback />
    }

    return (
      MediaStreamGuard(this.props.captureState) ||
      MediaPlaybackGuard(this.props.captureState)
    )
  }
}
