import React from 'react'
import ProgressCircle from '../index'
import styles from '../styles.css'

describe('<ProgressCircle />', function () {
  const testbed = new Testbed(
    <ProgressCircle
      label="Loading completion"
      valueNow={40}
      valueMax={60}
    />
  )

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('meter should have a radius', function () {
    const subject = testbed.render()
    const meterCircle = subject.find('circle.' + styles.meter)

    expect(meterCircle.getAttribute('r')).to.be.present
  })

  it('meter should have a stroke-dashoffset', function () {
    const subject = testbed.render()
    const meterCircle = subject.find('circle.' + styles.meter)

    expect(meterCircle.getComputedStyle().getPropertyValue('stroke-dashoffset'))
      .to.be.present
  })

  describe('size x-small', function () {
    it('meter should have a radius', function () {
      const subject = testbed.render({ size: 'x-small' })
      const meterCircle = subject.find('circle.' + styles.meter)

      expect(meterCircle.getAttribute('r')).to.be.present
    })

    it('meter should have a stroke-dashoffset', function () {
      const subject = testbed.render({ size: 'x-small' })
      const meterCircle = subject.find('circle.' + styles.meter)

      expect(meterCircle.getComputedStyle()
        .getPropertyValue('stroke-dashoffset')).to.be.present
    })
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
