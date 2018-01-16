import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@instructure/ui-core/lib/components/Button'
import { MenuItem, MenuItemGroup } from '@instructure/ui-core/lib/components/Menu'
import IconMicSolid from 'instructure-icons/lib/Solid/IconMicSolid'
import IconVideoSolid from 'instructure-icons/lib/Solid/IconVideoSolid'
import PopoverMenu from '@instructure/ui-core/lib/components/PopoverMenu'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'

@themeable({}, styles)
export default class DeviceSelection extends Component {
  static propTypes = {
    variant: PropTypes.oneOf([
      'audio',
      'video'
    ]).isRequired,
    selectedDeviceId: PropTypes.string.isRequired,
    devices: PropTypes.arrayOf(
      PropTypes.shape({
        deviceId: PropTypes.string,
        label: PropTypes.string
      })
    ).isRequired,
    actions: PropTypes.shape({
      audioDeviceChanged: PropTypes.func.isRequired,
      videoDeviceChanged: PropTypes.func.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.state = { ...this.config(this.props.variant) }
  }

  config (variant) {
    const VARIANTS = {
      audio: {
        label: 'Mic', // needs i18n
        icon: <IconMicSolid />
      },
      video: {
        label: 'Webcam', // needs i18n
        icon: <IconVideoSolid />
      }
    }

    return VARIANTS[variant]
  }

  formatLabel (device) {
    if (device.label && device.label.length > 0) {
      return device.label
    } else {
      return device.deviceId
    }
  }

  deviceSelected = (e, [newSelected]) => {
    if (!newSelected) return

    this.props.actions[`${this.props.variant}DeviceChanged`](newSelected)
  }

  isDeviceSelected (id) {
    return id === this.props.selectedDeviceId
  }

  menuItems () {
    return this.props.devices.map(d => {
      return (
        <MenuItem
          key={`${d.deviceId}`}
          value={`${d.deviceId}`}
        >
          <div className={styles.truncated}>
            {this.formatLabel(d)}
          </div>
        </MenuItem>
      )
    })
  }

  render () {
    return (
      <PopoverMenu
        placement="bottom"
        trigger={
          <Button variant="light" margin="0 large 0">
            {this.state.icon}
            {this.state.label}
          </Button>
        }
      >
        <MenuItemGroup
          label=""
          selected={[this.props.selectedDeviceId]}
          onSelect={this.deviceSelected}
        >
          {this.menuItems()}
        </MenuItemGroup>
      </PopoverMenu>
    )
  }
}
