import React from 'react'
import { TabPanel } from '../index'

describe('<TabPanel />', function () {
  const testbed = createTestbed(
    <TabPanel selected title="Panel Title">Panel contents</TabPanel>
  )

  it('should render children', function () {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Panel contents')
  })

  it('should have appropriate role attribute', function () {
    const subject = testbed.render()

    expect(subject.getAttribute('role'))
      .to.equal('tabpanel')
  })
})
