/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import MediaCaptureProvider from './MediaCaptureProvider'
import CapturePresentation from './CapturePresentation'
import MediaContainer from './MediaContainer'
import MediaOverlay from './MediaOverlay'
import CapturedMedia from './CapturedMedia'
import Controller from './Controller'
import CTA from './CTA'
import { reducer, getInitialState } from '../../reducers'
import { applyTranslations, TranslationPropTypes} from '../../constants/translated/translations'

const TranslationsPropType = PropTypes.shape(TranslationPropTypes)

/**
---
category: components/media
experimental: true
---
**/
class MediaCapture extends Component {
  constructor (props) {
    super(props)

    const initialState = getInitialState(this.props.onCompleted)

    this.state = {
      store: createStore(reducer, initialState, applyMiddleware(thunk))
    }

    applyTranslations(this.props.translations)
  }

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
    onClose: PropTypes.func,
    /**
     * Label overrides for i18n. Defaults to english
     * See src/constants/translated/translations.js for default values
     */
    translations: TranslationsPropType
  }

  static defaultProps = {
    onCancel: () => {},
    onClose: () => {},
    translations: {}
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
                <CapturedMedia
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

export default MediaCapture
