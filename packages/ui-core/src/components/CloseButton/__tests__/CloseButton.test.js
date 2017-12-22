import React from 'react'
import IconX from '@instructure/ui-icons/lib/Solid/IconX'
import CloseButton from '../index'

describe('<CloseButton />', () => {
  const testbed = new Testbed(<CloseButton>Close</CloseButton>)

  it('should render with x icon', () => {
    const subject = testbed.render()
    const iconX = subject.find(IconX)

    expect(subject).to.be.present
    expect(iconX).to.be.present
  })
})
