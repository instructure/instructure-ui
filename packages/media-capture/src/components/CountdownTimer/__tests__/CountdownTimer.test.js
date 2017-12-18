import React from 'react'
import { _component as CountdownTimer } from '../index'
import * as CaptureActions from '../../../actions'

describe('<CountdownTimer />', () => {
  const testbed = new Testbed(<CountdownTimer actions={{ countdownComplete: () => {}}} />)

  it('should render', () => {
    const countdownTimer = testbed.render()
    expect(countdownTimer).to.be.present
  })

  describe('counting down', () => {
    it('decreases the value by 1 every 1000ms', () => {
      const countdownTimer = testbed.render({
        countdownFrom: 5
      })

      expect(countdownTimer.text()).to.eql('5')
      testbed.tick(1000)
      expect(countdownTimer.text()).to.eql('4')
      testbed.tick(1000)
      expect(countdownTimer.text()).to.eql('3')
    })

    it('invokes clearCountdown when the countdown reaches 0', () => {
      const clearCountdown = testbed.spy(CountdownTimer.prototype, 'clearCountdown')
      const countdownTimer = testbed.render({
        countdownFrom: 5
      })

      expect(clearCountdown.callCount).to.eql(0)
      testbed.tick(5000)
      expect(clearCountdown.callCount).to.eql(1)
    })
  })
})
