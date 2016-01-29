import React from 'react'
import Tabs, { TabList, Tab, TabPanel } from '../index'

describe('Tabs', function () {
  const data = [
    { label: 'First Tab', contents: 'Contents of first tab.' },
    { label: 'Second Tab', contents: 'Contents of second tab.' },
    { label: 'Third Tab', contents: 'Contents of third tab.' }
  ]

  const tabs = data.map((item, i) => {
    return <Tab key={i}>{item.label}</Tab>
  })

  const panels = data.map((item, i) => {
    return <TabPanel key={i}>{item.contents}</TabPanel>
  })

  const children = [<TabList>{tabs}</TabList>, ...panels]

  const testbed = createTestbed(Tabs, {
    forceRenderTabPanel: true,
    children: children
  })

  it('should render children', function () {
    testbed.render()

    let children = testbed.dom.findAll(TabList)
    expect(children.nodes.length)
      .to.equal(1)

    children = testbed.dom.findAll(TabPanel)
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
