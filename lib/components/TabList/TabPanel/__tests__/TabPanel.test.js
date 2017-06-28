import React from 'react'
import TabPanel from '../index'

describe('<TabPanel />', () => {
  const testbed = new Testbed(
    <TabPanel selected title="Panel Title">Panel contents</TabPanel>
  )

  it('should render children', () => {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Panel contents')
  })

  it('should have appropriate role attribute', () => {
    const subject = testbed.render()

    expect(subject.getAttribute('role'))
      .to.equal('tabpanel')
  })
})
