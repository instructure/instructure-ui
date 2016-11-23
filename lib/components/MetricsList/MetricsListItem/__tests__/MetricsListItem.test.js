import React from 'react'
import MetricsListItem from '../index'

describe('<MetricsListItem />', function () {
  const testbed = new Testbed(<MetricsListItem label="Grade" value="80%" />)

  it('should render the label', function () {
    const subject = testbed.render()

    expect(subject.find(':textContent("Grade")').length)
      .to.equal(1)
  })

  it('should render the value', function () {
    const subject = testbed.render()

    expect(subject.find(':textContent("80%")').length)
      .to.equal(1)
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done, {
        ignores: [
          'aria-required-parent' // ignore this because it should be used as a child of MetricList
        ]
      })
    })

    it('should have role=row', function () {
      const subject = testbed.render()

      expect(subject.getAttribute('role'))
        .to.equal('row')
    })

    it('should have role=gridcell', function () {
      const subject = testbed.render()

      expect(subject.find(':textContent("80%")').only().getAttribute('role'))
        .to.equal('gridcell')
    })

    it('should have role=rowheader', function () {
      const subject = testbed.render()

      expect(subject.find(':textContent("Grade")').only().getAttribute('role'))
        .to.equal('rowheader')
    })
  })
})
