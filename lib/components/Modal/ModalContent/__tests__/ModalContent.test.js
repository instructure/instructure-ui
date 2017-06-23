import React from 'react'

import ModalContent from '../index'

describe('<ModalContent />', function () {
  const testbed = new Testbed(<ModalContent label="Modal Example" />)

  it('should not have a close button', function () {
    const subject = testbed.render()
    expect(subject.find('button').length).to.equal(0)
  })

  it('should apply the a11y attributes', function () {
    const subject = testbed.render()
    expect(subject.find('[role="region"]')).to.be.present
    expect(subject.find('[aria-label="Modal Example"]')).to.be.present
  })

  describe('when dismissible is true', function () {
    it('should have a close button', function () {
      const subject = testbed.render({
        dismissible: true
      })

      expect(subject.find('button').length).to.equal(1)
    })

    it('should call `onDismiss` when the close button is clicked', () => {
      const onDismiss = testbed.stub()
      const subject = testbed.render({
        dismissible: true,
        onDismiss
      })
      subject.find('button').simulate('click')
      expect(onDismiss.called).to.be.true
    })
  })
})
