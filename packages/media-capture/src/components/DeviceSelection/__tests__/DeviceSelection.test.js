import React from 'react'

import DeviceSelection from '../index'

describe('<DeviceSelection />', () => {
  const testbed = new Testbed(<DeviceSelection variant="audio" />)

  it('should render', () => {
    const DeviceSelection = testbed.render()
    expect(DeviceSelection).to.be.present
  })

  context('audio variant', () => {
    it('renders an appropriate label', () => {
      const DeviceSelection = testbed.render()
      expect(DeviceSelection.text()).to.eql('Mic')
    })

    it('renders an appropriate icon', () => {
      const DeviceSelection = testbed.render()
      expect(DeviceSelection.find('IconMicSolid').length).to.eql(1)
    })
  })

  context('video variant', () => {
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
