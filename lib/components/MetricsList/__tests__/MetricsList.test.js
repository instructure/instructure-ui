import React from 'react'
import MetricsList, { MetricsListItem } from '../index'

describe('MetricsList', function () {
  const data = [
    {
      label: 'Foo',
      value: 'bar'
    },
    {
      label: 'Baz',
      value: 'blah'
    }
  ]

  const children = data.map((item, i) => {
    return <MetricsListItem key={i} label={item.label} value={item.value} />
  })

  const testbed = createTestbed(MetricsList, {
    children
  })

  it('should render children', function () {
    testbed.render()

    const children = testbed.dom.findAll(MetricsListItem)

    expect(children.nodes.length)
      .to.equal(2)
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done)
    })

    it('should have role=grid', function () {
      testbed.render()

      expect(testbed.dom.node.getAttribute('role'))
        .to.equal('grid')
    })

    it('should have aria-readonly=true', function () {
      testbed.render()

      expect(testbed.dom.node.getAttribute('aria-readonly'))
        .to.equal('true')
    })
  })
})
