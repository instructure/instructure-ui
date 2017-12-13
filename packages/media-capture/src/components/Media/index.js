import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'
import classNames from 'classnames'

import styles from './styles.css'

import MediaStream from '../MediaStream'
import MediaPlayback from '../MediaPlayback'

import {
  READY,
  RECORDING,
  PREVIEWSAVE
} from '../../constants/CaptureStates'

@themeable({}, styles)
export default class Media extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired
  }

  render () {
    const MediaStreamGuard = (state) => {
      if (![READY, RECORDING].includes(state)) return null

      return <MediaStream />
    }

    const MediaPlaybackGuard = (state) => {
      if (state !== PREVIEWSAVE) return null


      return <MediaPlayback />
    }

    return (
      <div className={classNames(styles.media)}>
        {
          MediaStreamGuard(this.props.captureState) ||
          MediaPlaybackGuard(this.props.captureState)
        }
      </div>
    )
  }
}
