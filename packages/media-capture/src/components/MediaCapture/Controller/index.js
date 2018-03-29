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
import classNames from 'classnames'
import themeable from '@instructure/ui-themeable'

import DeviceSelection from '../DeviceSelection'
import FileSave from '../FileSave'
import StartOver from '../StartOver'

import styles from './styles.css'
import theme from './theme'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  SAVING,
  FINISHED
} from '../../../constants/CaptureStates'

/**
---
private: true
---
**/
@themeable(theme, styles)
class Controller extends Component {
  static propTypes = {
    children: PropTypes.node,
    captureState: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    devices: PropTypes.shape({
      audioinput: PropTypes.array,
      videoinput: PropTypes.array
    }).isRequired,
    audioDeviceId: PropTypes.string.isRequired,
    videoDeviceId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    children: []
  }

  render () {
    const StartGuard = (state) => {
      if (state !== READY) return null

      return (
        <div className={styles.container}>
          <DeviceSelection
            variant="audio"
            devices={this.props.devices.audioinput}
            selectedDeviceId={this.props.audioDeviceId}
            actions={{...this.props.actions}}
          />
          {this.props.children}
          <DeviceSelection
            variant="video"
            devices={this.props.devices.videoinput}
            selectedDeviceId={this.props.videoDeviceId}
            actions={{...this.props.actions}}
          />
        </div>
      )
    }

    const FinishGuard = (state) => {
      if (state !== RECORDING) return null

      return (
        <div className={styles.container}>
          <div className={styles.flexed} />
          <div className={styles.flexed}>
            {this.props.children}
          </div>
          <div className={classNames({[styles.flexed]: true, [styles.right]: true})}>
            <StartOver actions={{...this.props.actions}} />
          </div>
        </div>
      )
    }

    const SaveGuard = (state) => {
      if (![PREVIEWSAVE, SAVING, FINISHED].includes(state)) return null

      return (
        <div className={styles.container}>
          <div className={styles.flexed}>
            <FileSave captureState={state} fileName={this.props.fileName} actions={{...this.props.actions}} />
          </div>
          <div className={classNames({[styles.flexed]: true, [styles.right]: true})}>
            <StartOver actions={{...this.props.actions}} />
          </div>
        </div>
      )
    }

    const DefaultGuard = () => {
      return (
        <div className={styles.container}>
          {this.props.children}
        </div>
      )
    }

    const { captureState } = this.props

    return (
      StartGuard(captureState) ||
      FinishGuard(captureState) ||
      SaveGuard(captureState) ||
      DefaultGuard()
    )
  }
}

export default Controller
