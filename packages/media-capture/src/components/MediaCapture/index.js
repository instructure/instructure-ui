import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import MediaCaptureProvider from '../MediaCaptureProvider'
import CaptureBackground from '../CaptureBackground'
import CapturePresentation from '../CapturePresentation'
import MediaCaptureClose from '../MediaCaptureClose'
import MediaContainer from '../MediaContainer'
import MediaOverlay from '../MediaOverlay'
import Media from '../Media'
import Controller from '../Controller'
import CTA from '../CTA'
import reducer from '../../reducers'
import { STARTING, LOADING, getInitialState } from '../../constants/CaptureStates'

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

  constructor (props) {
    super(props)

    const initialState = getInitialState(this.props.onCompleted)

    this.state = {
      shown: true,
      store: createStore(reducer, initialState, applyMiddleware(thunk))
    }
  }

  close = (currentState) => {
    this.setState({ shown: false }, () => {
      this.props.onClose(currentState)
    })
  }

  render () {
    if (!this.state.shown) return null

    return (
      <MediaCaptureProvider
        store={this.state.store}
        render={
          ({
            state: {
              captureState,
              msg,
              videoSrc,
              videoDeviceId,
              audioDeviceId,
              soundMeter,
              devices,
              fileName
            },
            actions
          }) => (
            <CaptureBackground>
              <CapturePresentation>
                <MediaCaptureClose
                  captureState={captureState}
                  actions={actions}
                  onClick={this.close}
                />
                <MediaContainer>
                  <MediaOverlay
                    captureState={captureState}
                    soundMeter={soundMeter}
                    msg={msg}
                    actions={actions}
                  />
                  <Media
                    captureState={captureState}
                    videoSrc={videoSrc}
                    videoDeviceId={videoDeviceId}
                    audioDeviceId={audioDeviceId}
                    actions={actions}
                  />
                </MediaContainer>
                <Controller
                  captureState={captureState}
                  fileName={fileName}
                  devices={devices}
                  audioDeviceId={audioDeviceId}
                  videoDeviceId={videoDeviceId}
                  actions={actions}
                >
                  <CTA captureState={captureState} actions={actions} />
                </Controller>
              </CapturePresentation>
            </CaptureBackground>
          )}
      />
    )
  }
}
