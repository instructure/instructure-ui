import React from 'react'
import MetricsList, { MetricsListItem } from '../index'

describe('<MetricsList />', function () {
  const testbed = createTestbed(
    <MetricsList>
      <MetricsListItem label="Grade" value="80%" />
      <MetricsListItem label="Late" value="4" />
      <MetricsListItem label="Missing" value="2" />
    </MetricsList>
  )

  it('should render children', function () {
    const subject = testbed.render()

    expect(subject.find(MetricsListItem).length)
      .to.equal(3)
  })

  it('should not allow invalid children', function () {
    let error = false
    try {
      testbed.render({
        children: <div />
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.true
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should have role=grid', function () {
      const subject = testbed.render()

      expect(subject.getAttribute('role'))
        .to.equal('grid')
    })

    it('should have aria-readonly=true', function () {
      const subject = testbed.render()

      expect(subject.getAttribute('aria-readonly'))
        .to.equal('true')
    })
  })
})
