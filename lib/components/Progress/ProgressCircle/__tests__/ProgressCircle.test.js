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

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('meter should have a radius', function () {
    const subject = testbed.render()
    const meterCircle = subject.find('circle.' + styles.meter)

    expect(meterCircle.getAttribute('r')).to.exist
  })

  it('meter should have a stroke-dashoffset', function () {
    const subject = testbed.render()
    const meterCircle = subject.find('circle.' + styles.meter)

    expect(meterCircle.getComputedStyle()
      .getPropertyValue('stroke-dashoffset')).to.exist
  })

  it('stroke-dashoffset should be 0 if valueNow > valueMax', function () {
    const subject = testbed.render({
      valueNow: 70,
      valueMax: 60
    })
    const meterCircle = subject.find('circle.' + styles.meter)

    expect(meterCircle.getComputedStyle().getPropertyValue('stroke-dashoffset'))
      .to.equal('0px')
  })

  it('should render the value if a formatter function is provided', function () {
    const subject = testbed.render({
      valueNow: 40,
      valueMax: 60,
      formatDisplayedValue: function (valueNow, valueMax) {
        return valueNow + ' / ' + valueMax
      }
    })

    expect(subject.text()).to.contain('40 / 60')
  })

  describe('size x-small', function () {
    it('meter should have a radius', function () {
      const subject = testbed.render({ size: 'x-small' })
      const meterCircle = subject.find('circle.' + styles.meter)

      expect(meterCircle.getAttribute('r')).to.exist
    })

    it('meter should have a stroke-dashoffset', function () {
      const subject = testbed.render({ size: 'x-small' })
      const meterCircle = subject.find('circle.' + styles.meter)

      expect(meterCircle.getComputedStyle()
        .getPropertyValue('stroke-dashoffset')).to.exist
    })
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
