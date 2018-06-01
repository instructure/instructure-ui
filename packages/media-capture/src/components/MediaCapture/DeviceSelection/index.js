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
import Button from '@instructure/ui-buttons/lib/components/Button'
import IconMicSolid from '@instructure/ui-icons/lib/Solid/IconMic'
import IconVideoSolid from '@instructure/ui-icons/lib/Solid/IconVideo'
import Menu, { MenuItem, MenuItemGroup } from '@instructure/ui-menu/lib/components/Menu'
import themeable from '@instructure/ui-themeable'

import { translate } from '../../../constants/translated/translations'
import styles from './styles.css'

/**
---
private: true
---
**/
@themeable({}, styles)
class DeviceSelection extends Component {
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
        label: translate('DEVICE_AUDIO'),
        icon: IconMicSolid
      },
      video: {
        label: translate('DEVICE_VIDEO'),
        icon: IconVideoSolid
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
      <Menu
        placement="bottom"
        trigger={
          <Button variant="light" margin="0 large 0" icon={this.state.icon}>
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
      </Menu>
    )
  }
}

export default DeviceSelection
