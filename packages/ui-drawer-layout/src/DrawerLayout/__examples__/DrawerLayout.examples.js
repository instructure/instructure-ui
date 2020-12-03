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
import { View } from '@instructure/ui-view'
import { DrawerLayout } from '../index'

export default {
  getComponentProps: (props) => {
    return {
      children: [
        <DrawerLayout.Tray
          key="0"
          id="DrawerLayoutTrayExample1"
          open={true}
          placement="start"
          label="Drawer Tray Start Example"
        >
          <View
            as="div"
            maxWidth="16rem"
            textAlign="center"
            margin="large auto"
            padding="small"
          >
            Drawer tray
          </View>
        </DrawerLayout.Tray>,
        <DrawerLayout.Content key="1" label="Drawer content example">
          <div style={{ background: 'white', height: '100%' }}>
            <View as="div" padding="x-large">
              Drawer content
            </View>
          </div>
        </DrawerLayout.Content>
      ]
    }
  },
  getExampleProps: (props) => {
    return {
      as: 'div',
      borderWidth: 'small'
    }
  }
}
