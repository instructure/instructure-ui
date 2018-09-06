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

import {
  READY,
  RECORDING,
  PREVIEWSAVE
} from '../../../../constants/CaptureStates'

import Controller from '../index'

describe('<Controller />', () => {
  const props = {
    captureState: '',
    fileName: '',
    devices: {
      audioinput: [],
      videoinput: []
    },
    audioDeviceId: '',
    videoDeviceId: '',
    actions: {}
  }

  const testbed = new Testbed(<Controller {...props} />)

  it('should render', () => {
    const controller = testbed.render()
    expect(controller).to.be.present()
  })

  it('renders children', () => {
    const child = <div>a child</div>
    const controller = testbed.render({ children: child })
    expect(controller.text()).to.eql('a child')
  })

  context('when READY state', () => {
    it('renders device controls', () => {
      const props = {
        captureState: READY,
        actions: {
          audioDeviceChanged: () => {},
          videoDeviceChanged: () => {}
        }
      }

      const controller = testbed.render(props)
      expect(controller.find('DeviceSelection').length).to.eql(2)
    })
  })

  context('when RECORDING state', () => {
    it('renders a reset button', () => {
      const controller = testbed.render({
        captureState: RECORDING, actions: { startoverClicked: () => {} }
      })
      expect(controller.find('StartOver').length).to.eql(1)
    })
  })

  context('when PREVIEWSAVE state', () => {
    it('renders a <FileSave />', () => {
      const controller = testbed.render({
        captureState: PREVIEWSAVE, actions: { saveClicked: () => {}, startoverClicked: () => {}}
      })

      expect(controller.find('FileSave').length).to.eql(1)
    })

    it('renders a <StartOver />', () => {
      const controller = testbed.render({
        captureState: PREVIEWSAVE, actions: { saveClicked: () => {}, startoverClicked: () => {}}
      })

      expect(controller.find('StartOver').length).to.eql(1)
    })
  })

  context('when SAVING state', () => {
    it('renders a <FileSave />', () => {
      const controller = testbed.render({
        captureState: PREVIEWSAVE, actions: { saveClicked: () => {}, startoverClicked: () => {} }
      })

      expect(controller.find('FileSave').length).to.eql(1)
    })

    it('renders a <StartOver />', () => {
      const controller = testbed.render({
        captureState: PREVIEWSAVE, actions: { saveClicked: () => {}, startoverClicked: () => {}}
      })

      expect(controller.find('StartOver').length).to.eql(1)
    })
  })
})
