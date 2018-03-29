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
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux'
import * as CaptureActions from '../../../actions'

/**
---
private: true
---
**/
class MediaCaptureProvider extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    store: PropTypes.shape({
      dispatch: PropTypes.func,
      getState: PropTypes.func,
      subscribe: PropTypes.func
    }).isRequired,
    state: PropTypes.shape({
      captureState: PropTypes.string,
      videoSrc: PropTypes.string,
      msg: PropTypes.string
    }).isRequired,
    actions: PropTypes.shape({
      audioDeviceChanged: PropTypes.func.isRequired,
      closeClicked: PropTypes.func.isRequired,
      countdownComplete: PropTypes.func.isRequired,
      finishClicked: PropTypes.func.isRequired,
      onComplete: PropTypes.func.isRequired,
      startClicked: PropTypes.func.isRequired,
      startoverClicked: PropTypes.func.isRequired,
      titleEdited: PropTypes.func.isRequired,
      videoDeviceChanged: PropTypes.func.isRequired,
      deviceRequestAccepted: PropTypes.func.isRequired,
      mediaRecorderInitialized: PropTypes.func.isRequired,
      videoObjectGenerated: PropTypes.func.isRequired,
      errorOccurred: PropTypes.func.isRequired,
      devicesFound: PropTypes.func.isRequired,
      soundMeterInitialized: PropTypes.func.isRequired
    }).isRequired,
    onClose: PropTypes.func
  }

  static defaultProps = {
    onClose: (captureState) => {}
  }

  componentWillUnmount () {
    this.props.onClose(this.props.state.captureState)
  }

  render () {
    return (
      <Provider store={this.props.store}>
        {
          this.props.render(
            {
              state: { ...this.props.state },
              actions: { ...this.props.actions }
            }
          )
        }
      </Provider>
    )
  }
}

const mapStateToProps = state => ({
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CaptureActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaCaptureProvider)
