import React from 'react'
import { TabList, Tab } from '../index'

describe('TabList', function () {
  const labels = [ 'First Tab', 'Second Tab', 'Third Tab' ]

  const children = labels.map((label, i) => {
    return <Tab key={i}>{label}</Tab>
  })

  const testbed = createTestbed(TabList, {
    children
  })

  it('should render children', function () {
    testbed.render()

    const children = testbed.dom.findAll(Tab)
    expect(children.nodes.length)
      .to.equal(3)
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done)
    })
  })
})
