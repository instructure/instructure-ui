import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import MediaCaptureProvider from '../MediaCaptureProvider'
import CaptureBackground from '../CaptureBackground'
import CapturePresentation from '../CapturePresentation'
import MediaContainer from '../MediaContainer'
import MediaOverlay from '../MediaOverlay'
import Media from '../Media'
import Controller from '../Controller'
import CTA from '../CTA'
import reducer from '../../reducers'
import { STARTING } from '../../constants/CaptureStates'

const store = createStore(reducer, applyMiddleware(thunk))

/**
---
category: components
---
**/

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
              <MediaContainer>
                <MediaOverlay captureState={captureState} />
                <Media captureState={captureState} />
              </MediaContainer>
              <Controller captureState={captureState}>
                <CTA captureState={captureState} />
              </Controller>
            </CapturePresentation>
          </CaptureBackground>
        )}
      />
    )
  }
}
