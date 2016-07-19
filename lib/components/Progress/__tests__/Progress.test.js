import React from 'react'
import Progress from '../index'

describe('<Progress />', function () {
  const testbed = createTestbed(
    <Progress label="Chapters read" valueMax={60} valueNow={30} />
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject.dom()).to.exist
  })

  it('should render a progress element', function () {
    const subject = testbed.render()
    const progress = subject.find('progress')
    expect(progress).to.exist
    expect(progress.getAttribute('value')).to.equal('30')
    expect(progress.getAttribute('aria-valuemax')).to.equal('60')
    expect(progress.getAttribute('aria-valuetext')).to.equal('50%')
  })

  it('should show a correct percentage when showOutput is true', function () {
    const subject = testbed.render({showOutput: true})
    expect(subject.find('strong').text()).to.equal('50')
  })

  it('should render an SVG when the variant is set to circle', function () {
    const subject = testbed.render({
      variant: 'circle',
      outputType: 'counter',
      valueMax: 80,
      valueNow: 25,
      formatValue: function (valueNow, valueMax) {
        return valueNow + ' out of ' + valueMax
      }
    })
    const svg = subject.find('svg')
    expect(svg).to.exist
    expect(svg.getAttribute('aria-valuenow')).to.equal('25')
    expect(svg.getAttribute('aria-valuemax')).to.equal('80')
    expect(svg.getAttribute('aria-valuetext')).to.equal('25 out of 80')
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
