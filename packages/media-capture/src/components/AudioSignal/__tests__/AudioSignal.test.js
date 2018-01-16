import React from 'react'

import Component from '../index'

describe('<AudioSignal />', () => {
  const props = {
    soundMeter: {
      processor: {
        volume: 0.1
      }
    }
  }

  const testbed = new Testbed(<Component {...props} />)

  it('should render', () => {
    const AudioSignal = testbed.render()
    expect(AudioSignal).to.be.present
  })

  it('should render a <progress />', () => {
    const AudioSignal = testbed.render()
    expect(AudioSignal.find('progress').length).to.eql(1)
  })

  describe('getVolume', () => {
    it('gets the volume from the sound processor and updates local state', () => {
      const AudioSignal = testbed.render()
      AudioSignal.instance().getVolume()
      expect(AudioSignal.state('value')).to.eql(15)
    })
  })
})
