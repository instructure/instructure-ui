import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@instructure/ui-core/lib/components/Button'
import IconMicSolid from 'instructure-icons/lib/Solid/IconMicSolid'
import IconVideoSolid from 'instructure-icons/lib/Solid/IconVideoSolid'

export default class DeviceSelection extends Component {
  static propTypes = {
    variant: PropTypes.oneOf([
      'audio',
      'video'
    ]).isRequired
  }

  constructor (props) {
    super(props)
    this.state = { ...this.config(this.props.variant) }
  }

  config (variant) {
    const VARIANTS = {
      audio: {
        label: 'Mic',
        icon: <IconMicSolid />
      },
      video: {
        label: 'Webcam',
        icon: <IconVideoSolid />
      }
    }

    return VARIANTS[variant]
  }

  render () {
    return (
      <Button variant="light" margin="0 large 0">
        {this.state.icon}
        {this.state.label}
      </Button>
    )
  }
}
