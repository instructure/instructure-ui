import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import OverlayContainer from '../OverlayContainer'
import CountdownTimer from '../CountdownTimer'
import { STARTING, PREVIEWSAVE } from '../../constants/CaptureStates'
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
      if (state !== PREVIEWSAVE) return null

      return <div className={styles.badge}>PREVIEW</div>
    }

    return (
      CountdownTimerGuard(this.props.captureState) ||
      PreviewBadgeGuard(this.props.captureState)
    )
  }
}
