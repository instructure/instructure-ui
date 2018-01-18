import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import MediaCaptureProvider from '../MediaCaptureProvider'
import CapturePresentation from '../CapturePresentation'
import MediaContainer from '../MediaContainer'
import MediaOverlay from '../MediaOverlay'
import Media from '../Media'
import Controller from '../Controller'
import CTA from '../CTA'
import { reducer, getInitialState } from '../../reducers'
import { STARTING, LOADING } from '../../constants/CaptureStates'

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
      store: createStore(reducer, initialState, applyMiddleware(thunk))
    }
  }

  render () {
    return (
      <MediaCaptureProvider
        onClose={this.props.onClose}
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
            <CapturePresentation>
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
                  fileName={fileName}
                  devices={devices}
                  audioDeviceId={audioDeviceId}
                  videoDeviceId={videoDeviceId}
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
          )}
      />
    )
  }
}
