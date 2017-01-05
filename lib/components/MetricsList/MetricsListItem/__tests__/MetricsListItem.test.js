import React from 'react'
import MetricsListItem from '../index'

describe('<MetricsListItem />', function () {
  const testbed = new Testbed(<MetricsListItem label="Grade" value="80%" />)

  it('should render the label', function () {
    const subject = testbed.render()

    expect(subject.findText('Grade').length)
      .to.equal(1)
  })

  it('should render the value', function () {
    const subject = testbed.render()

    expect(subject.findText('80%').length)
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

    it('should have role=row for the container', function () {
      const subject = testbed.render()

      expect(subject.getAttribute('role'))
        .to.equal('row')
    })

    it('should have role=gridcell for the value', function () {
      const subject = testbed.render()

      expect(subject.find('[role="gridcell"]').text())
        .to.equal('80%')
    })

    it('should have role=rowheader for the label', function () {
      const subject = testbed.render()

      expect(subject.find('[role="rowheader"]').text())
        .to.equal('Grade')
    })
  })
})
