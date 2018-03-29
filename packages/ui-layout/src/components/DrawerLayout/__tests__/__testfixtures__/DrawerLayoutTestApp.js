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
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import DrawerLayout, { DrawerTray, DrawerContent } from '../../index'

export default class DrawerLayoutTestApp extends Component {
  static propTypes = {
    layoutWidth: PropTypes.string,
    minWidth: PropTypes.string,
    onOverlayTrayChange: PropTypes.func,
    trayOpen: PropTypes.bool,
    trayWidth: PropTypes.string,
    trayPlacement: PropTypes.oneOf(['start', 'end'])
  }

  static defaultProps = {
    trayOpen: false,
    layoutWidth: '600px',
    trayWidth: '200px',
    minWidth: '500px',
    trayPlacement: 'start',
    onOverlayTrayChange: (overlayTray) => {}
  }

  state = {
    trayOpen: false
  }

  _layout = null
  _drawerContent = null
  _contentId = 'DrawerLayoutTestApp__content'


  get trayOpen () {
    return this.state.trayOpen || this.props.trayOpen
  }

  handleDrawerTrayOpen = () => {
    this.setState({ trayOpen: true })
  }

  render () {
    const {
      layoutWidth,
      trayWidth,
      trayPlacement
    } = this.props

    return (
      <div style={{ width: layoutWidth }}>
        <DrawerLayout
          {...pickProps(this.props, DrawerLayout.propTypes)}
          ref={(node) => { this._layout = node }}
        >
          <DrawerTray
            open={this.trayOpen}
            placement={trayPlacement}
            label="Test DrawerTray"
          >
            <div style={{ width: trayWidth }}>
              Hello from tray
            </div>
          </DrawerTray>
          <DrawerContent
            label="Test DrawerContent"
            ref={(node) => { this._drawerContent = node }}
          >
            <div>
              Hello from content
              <Button onClick={this.handleDrawerTrayOpen}>
                Expand
              </Button>
            </div>
          </DrawerContent>
        </DrawerLayout>
      </div>
    )
  }
}
