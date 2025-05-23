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

import { Component } from 'react'
import PropTypes from 'prop-types'

import { DrawerLayout } from '../index'
import type { DrawerLayoutProps } from '../props'
import type { DrawerLayoutTrayProps } from '../DrawerTray/props'

type DrawerLayoutFixtureProps = {
  layoutWidth?: string | number
  trayWidth?: string | number
  placement?: DrawerLayoutTrayProps['placement']
  open?: DrawerLayoutTrayProps['open']
  onOverlayTrayChange?: DrawerLayoutProps['onOverlayTrayChange']
}

export default class DrawerLayoutFixture extends Component<DrawerLayoutFixtureProps> {
  static propTypes = {
    layoutWidth: PropTypes.string,
    trayWidth: PropTypes.string,
    placement: PropTypes.string,
    open: PropTypes.bool,
    onOverlayTrayChange: PropTypes.func
  }

  static defaultProps = {
    layoutWidth: '600px',
    trayWidth: '200px',
    open: false,
    placement: 'start',
    onOverlayTrayChange: () => {}
  }

  render() {
    const { layoutWidth, trayWidth, open, placement, onOverlayTrayChange } =
      this.props

    return (
      <div style={{ width: layoutWidth }}>
        <DrawerLayout
          minWidth="500px"
          onOverlayTrayChange={onOverlayTrayChange}
        >
          <DrawerLayout.Tray
            open={open}
            placement={placement}
            label="Test DrawerTray"
          >
            <div style={{ width: trayWidth }}>Hello from tray</div>
          </DrawerLayout.Tray>
          <DrawerLayout.Content label="Test DrawerContent">
            <div>
              Hello from content
              <button>Expand</button>
            </div>
          </DrawerLayout.Content>
        </DrawerLayout>
      </div>
    )
  }
}
