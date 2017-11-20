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

import Component from '../index'

describe('<DeviceSelection />', () => {
  const props = {
    devices: [],
    selectedDeviceId: '',
    variant: 'audio',
    actions: {
      audioDeviceChanged: () => {},
      videoDeviceChanged: () => {}
    }
  }

  const testbed = new Testbed(<Component {...props} />)

  it('should render', () => {
    const DeviceSelection = testbed.render()
    expect(DeviceSelection).to.be.present
  })

  it('should render a <PopoverMenu />', () => {
    const DeviceSelection = testbed.render()
    expect(DeviceSelection.find('PopoverMenu').length).to.eql(1)
  })

  it('should render a <Button />', () => {
    const DeviceSelection = testbed.render()
    expect(DeviceSelection.find('Button').length).to.eql(1)
  })

  context('audio variant', () => {
    describe('on render', () => {
      it('renders an appropriate label', () => {
        const props = {
          devices: [
            { deviceId: 'audioId1', label: 'label1' },
            { deviceId: 'audioId2', label: '' }
          ]
        }
        const DeviceSelection = testbed.render(props)
        expect(DeviceSelection.text()).to.eql('Mic')
      })

      it('renders an appropriate icon', () => {
        const DeviceSelection = testbed.render()
        expect(DeviceSelection.find('IconMic').length).to.eql(1)
      })
    })
  })

  context('video variant', () => {
    describe('on render', () => {
      it('renders an appropriate label', () => {
        const DeviceSelection = testbed.render({ variant: 'video' })
        expect(DeviceSelection.text()).to.eql('Webcam')
      })

      it('renders an appropriate icon', () => {
        const DeviceSelection = testbed.render({ variant: 'video' })
        expect(DeviceSelection.find('IconVideo').length).to.eql(1)
      })
    })
  })

  context('device selection', () => {
    describe('#isDeviceSelected', () => {
      it('returns true if the value if equal to the prop', () => {
        const DeviceSelection = testbed.render({ selectedDeviceId: 'aeiou' })
        expect(DeviceSelection.instance().isDeviceSelected('aeiou')).to.eql(true)
      })

      it('returns false if the value if equal to the prop', () => {
        const DeviceSelection = testbed.render({ selectedDeviceId: 'aeiou' })
        expect(DeviceSelection.instance().isDeviceSelected('uoiea')).to.eql(false)
      })
    })

    describe('#deviceSelected', () => {
      it('invoked the action associated with its variant', () => {
        const audioDeviceChangedStub = testbed.spy()
        const props = {
          variant: 'audio',
          actions: {
            audioDeviceChanged: audioDeviceChangedStub,
            videoDeviceChanged: () => {}
          }
        }

        const DeviceSelection = testbed.render(props)
        DeviceSelection.instance().deviceSelected('event', ['newSelected'])
        expect(audioDeviceChangedStub).to.have.been.calledWith('newSelected')
      })
    })
  })
})
