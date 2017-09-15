import React from 'react'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'
import CloseButton from '../index'

describe('<CloseButton />', () => {
  const testbed = new Testbed(<CloseButton>Close</CloseButton>)

  it('should render with x icon', () => {
    const subject = testbed.render()
    const iconX = subject.find(IconXSolid)

    expect(subject).to.be.present
    expect(iconX).to.be.present
  })
})
