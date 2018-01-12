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
        expect(DeviceSelection.find('IconMicSolid').length).to.eql(1)
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
        expect(DeviceSelection.find('IconVideoSolid').length).to.eql(1)
      })
    })
  })
})
