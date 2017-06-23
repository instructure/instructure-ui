import React from 'react'
import Progress from '../index'

describe('<Progress />', function () {
  const testbed = new Testbed(
    <Progress label="Chapters read" valueMax={60} valueNow={30} />
  )

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should render a progress element', function () {
    const subject = testbed.render()
    const progress = subject.find('progress')
    expect(progress).to.be.present
    expect(progress.getAttribute('value')).to.equal('30')
    expect(progress.getAttribute('aria-valuemax')).to.equal('60')
    expect(progress.getAttribute('aria-valuetext')).to.equal('30 / 60')
  })

  it('should format the displayed value according to the formatDisplayedValue prop', function () {
    const subject = testbed.render({formatDisplayedValue: function (valueNow, valueMax) {
      return valueNow + ' of ' + valueMax
    }})

    expect(subject.text()).to.equal('30 of 60')
  })

  it('should display proper values when the variant is set to circle', function () {
    const subject = testbed.render({
      variant: 'circle',
      valueMax: 80,
      valueNow: 25,
      formatValueText: function (valueNow, valueMax) {
        return valueNow + ' out of ' + valueMax
      }
    })

    expect(subject.getAttribute('aria-valuenow')).to.equal('25')
    expect(subject.getAttribute('aria-valuemax')).to.equal('80')
    expect(subject.getAttribute('aria-valuetext')).to.equal('25 out of 80')
  })

  it('should meet a11y standards when rendered as a progress bar', function (done) {
    const subject = testbed.render({
      variant: 'bar'
    })

    subject.should.be.accessible(done)
  })

  it('should meet a11y standards when rendered as a progress circle', function (done) {
    const subject = testbed.render({
      variant: 'circle'
    })

    subject.should.be.accessible(done)
  })
})
