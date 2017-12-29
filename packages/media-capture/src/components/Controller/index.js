import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'
import Button from '@instructure/ui-core/lib/components/Button'
import TextInput from '@instructure/ui-core/lib/components/TextInput'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import IconSettingsSolid from 'instructure-icons/lib/Solid/IconSettingsSolid'
import IconResetSolid from 'instructure-icons/lib/Solid/IconResetSolid'

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
    captureState: PropTypes.string.isRequired
  }

  static defaultProps = {
    children: []
  }

  render () {
    const StartGuard = (state) => {
      if (state !== READY) return null

      return (
        <div className={styles.container}>
          <Button variant="icon">
            <IconSettingsSolid />
          </Button>
          {this.props.children}
          <Button variant="icon">
            <IconSettingsSolid />
          </Button>
        </div>
      )
    }

    const FinishGuard = (state) => {
      if (state !== RECORDING) return null

      return (
        <div className={styles.container}>
          {this.props.children}
          <Button variant="icon">
            <IconResetSolid />
          </Button>
        </div>
      )
    }

    const SaveGuard = (state) => {
      if (![PREVIEWSAVE, SAVING].includes(state)) return null

      return (
        <div className={styles.container}>
          <TextInput
            label={<ScreenReaderContent>Name</ScreenReaderContent>}
            placeholder="A filename"
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
