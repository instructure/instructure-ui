import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '@instructure/ui-core/lib/components/Button'
import IconSettingsLine from 'instructure-icons/lib/Line/IconSettingsLine'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  SAVING
} from '../../constants/CaptureStates'
import * as CaptureActions from '../../actions'

class CTA extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      saveClicked: PropTypes.func.isRequired,
      startClicked: PropTypes.func.isRequired,
      finishClicked: PropTypes.func.isRequired
    }).isRequired,
    captureState: PropTypes.string.isRequired
  }

  render () {
    const { captureState, actions } = this.props

    const StartGuard = (state) => {
      if (state !== READY) return null

      return (
        <Button
          onClick={actions.startClicked}
          variant="primary"
          size="large"
          margin="0 medium"
        >
          Start Recording
        </Button>
      )
    }

    const FinishGuard = (state) => {
      if (state !== RECORDING) return null

      return (
        <Button
          onClick={actions.finishClicked}
          size="large"
          margin="0 auto"
        >
          Finish
        </Button>
      )
    }

    const PreviewAndSaveGuard = (state) => {
      if (![PREVIEWSAVE, SAVING].includes(state)) return null

      return (
        <Button
          onClick={actions.saveClicked}
          disabled={state === SAVING}
          variant="primary"
          size="large"
          margin="0 0 0 medium"
        >
          Save
        </Button>
      )
    }

    return (
      StartGuard(captureState) ||
      FinishGuard(captureState) ||
      PreviewAndSaveGuard(captureState)
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CaptureActions, dispatch)
})

export const _component = CTA
export default connect(
  () => ({}),
  mapDispatchToProps
)(CTA)
