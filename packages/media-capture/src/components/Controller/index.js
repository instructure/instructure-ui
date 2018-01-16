import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import themeable from '@instructure/ui-themeable'
import Button from '@instructure/ui-core/lib/components/Button'
import TextInput from '@instructure/ui-core/lib/components/TextInput'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import IconSettingsSolid from 'instructure-icons/lib/Solid/IconSettingsSolid'
import IconResetSolid from 'instructure-icons/lib/Solid/IconResetSolid'

import DeviceSelection from '../DeviceSelection'
import StartOver from '../StartOver'
import styles from './styles.css'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  SAVING
} from '../../constants/CaptureStates'

@themeable({}, styles)
export default class Controller extends Component {
  static propTypes = {
    children: PropTypes.node,
    captureState: PropTypes.string.isRequired,
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
      if (![PREVIEWSAVE, SAVING].includes(state)) return null

      return (
        <div className={styles.container}>
          <TextInput
            label={<ScreenReaderContent>Name{/* needs i18n */}</ScreenReaderContent>}
            placeholder="A filename" /* needs i18n */
          />
          {this.props.children}
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
