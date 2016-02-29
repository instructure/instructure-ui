import { MetricsListItem } from '../index'

describe('<MetricsListItem />', function () {
  const testbed = createTestbed(MetricsListItem, {
    label: 'Grade',
    value: '90%'
  })

  it('should render the label', function () {
    testbed.render()

    expect(testbed.dom.find(':contains("Grade")'))
      .to.be.ok
  })

  it('should render the value', function () {
    testbed.render()

    expect(testbed.dom.find(':contains("90%")'))
      .to.be.ok
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done, {
        ignores: [
          'aria-required-parent' // ignore this because it should be used as a child of MetricList
        ]
      })
    })

    it('should have role=row', function () {
      testbed.render()

      expect(testbed.dom.node.getAttribute('role'))
        .to.equal('row')
    })

    it('should have role=gridcell', function () {
      testbed.render()

      const valueNode = testbed.dom.find(':contains("90%")').node

      expect(valueNode.getAttribute('role'))
        .to.equal('gridcell')
    })
    it('should have role=rowheader', function () {
      testbed.render()

      const labelNode = testbed.dom.find(':contains("Grade")').node

      expect(labelNode.getAttribute('role'))
        .to.equal('rowheader')
    })
  })
})
