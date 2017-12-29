import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import OverlayContainer from '../OverlayContainer'
import CountdownTimer from '../CountdownTimer'
import RecordingBadge from '../RecordingBadge'
import {
  STARTING,
  RECORDING,
  PREVIEWSAVE,
  SAVING
} from '../../constants/CaptureStates'
import styles from './styles.css'

@themeable({}, styles)
export default class MediaOverlay extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired
  }

  render () {
    const CountdownTimerGuard = (state) => {
      if (state !== STARTING) return null

      return (
        <OverlayContainer>
          <CountdownTimer />
        </OverlayContainer>
      )
    }

    const PreviewBadgeGuard = (state) => {
      if (![PREVIEWSAVE, SAVING].includes(state)) return null

      return <div className={styles.badge}>PREVIEW</div>
    }

    const RecordingBadgeGuard = (state) => {
      if (state !== RECORDING) return null

      return <RecordingBadge />
    }

    return (
      CountdownTimerGuard(this.props.captureState) ||
      RecordingBadgeGuard(this.props.captureState) ||
      PreviewBadgeGuard(this.props.captureState)
    )
  }
}
