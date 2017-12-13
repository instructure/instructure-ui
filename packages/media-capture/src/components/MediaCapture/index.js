import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import MediaCaptureProvider from '../MediaCaptureProvider'
import CaptureBackground from '../CaptureBackground'
import CapturePresentation from '../CapturePresentation'
import Media from '../Media'
import Controller from '../Controller'
import reducer from '../../reducers'

const store = createStore(reducer)

export default class MediaCapture extends Component {
  static propTypes = {
    /**
     * Callback fired when a file has been generated.
     */
    onCompleted: PropTypes.func.isRequired,
    /**
     * Callback fired when the component is closed for a reason
     * other than generating a file. Includes the last
     * emitted state when the action was taken.
     */
    onCancel: PropTypes.func,
    /**
     * Callback fired when the component is closed. Includes
     * the last emitted state when the action was taken.
     */
    onClose: PropTypes.func
  }

  static defaultProps = {
    onCancel: () => {},
    onClose: () => {}
  }

  render () {
    return (
      <MediaCaptureProvider
        store={store}
        render={({captureState}) => (
          <CaptureBackground>
            <CapturePresentation>
              <Media captureState={captureState} />
              <Controller captureState={captureState} />
            </CapturePresentation>
          </CaptureBackground>
        )}
      />
    )
  }
}
