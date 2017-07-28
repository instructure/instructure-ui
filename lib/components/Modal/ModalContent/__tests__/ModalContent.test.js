import React from 'react'

import ModalContent from '../index'

describe('<ModalContent />', () => {
  const testbed = new Testbed(<ModalContent />)

  it('should not have a close button', () => {
    const subject = testbed.render()
    expect(subject.find('button').length).to.equal(0)
  })
})
