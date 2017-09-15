import React from 'react'

import ModalContent from '../index'

describe('<ModalContent />', () => {
  const testbed = new Testbed(<ModalContent />)

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })
})
