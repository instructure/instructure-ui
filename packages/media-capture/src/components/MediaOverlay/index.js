import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'

import CountdownContainer from '../CountdownContainer'
import CountdownTimer from '../CountdownTimer'
import Loading from '../Loading'
import Message from '../Message'
import RecordingBadge from '../RecordingBadge'
import {
  STARTING,
  RECORDING,
  PREVIEWSAVE,
  SAVING,
  LOADING,
  ERROR
} from '../../constants/CaptureStates'
import styles from './styles.css'

@themeable({}, styles)
export default class MediaOverlay extends Component {
  static propTypes = {
    captureState: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  render () {
    const LoadingGuard = (state) => {
      if (state !== LOADING) return null

      return <Loading />
    }

    const ErrorGuard = (state) => {
      if (state !== ERROR) return null

      return <Message msg={this.props.msg} />
    }

    const CountdownTimerGuard = (state) => {
      if (state !== STARTING) return null

      return (
        <CountdownContainer>
          <CountdownTimer actions={this.props.actions} />
        </CountdownContainer>
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
      LoadingGuard(this.props.captureState) ||
      ErrorGuard(this.props.captureState) ||
      CountdownTimerGuard(this.props.captureState) ||
      RecordingBadgeGuard(this.props.captureState) ||
      PreviewBadgeGuard(this.props.captureState)
    )
  }
}
