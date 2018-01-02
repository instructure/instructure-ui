import React from 'react'
import Timer from '../index'

describe('<Timer />', () => {
  const testbed = new Testbed(<Timer />)

  it('should render', () => {
    const timer = testbed.render()
    expect(timer).to.be.present
  })

  it('initializes correct state', () => {
    const timer = testbed.render()
    expect(timer.state('time')).to.eql(0)
  })

  describe('counting up', () => {
    it('increases the time by 1 second every 1000ms', () => {
      const timer = testbed.render()
      expect(timer.text()).to.eql('00:00')
      testbed.tick(1000)
      expect(timer.text()).to.eql('00:01')
      testbed.tick(1000)
      expect(timer.text()).to.eql('00:02')
    })
  })
})
