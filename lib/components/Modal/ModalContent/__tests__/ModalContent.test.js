import React from 'react'

import ModalContent from '../index'

import styles from '../styles.css'

describe('<ModalContent />', function () {
  const testbed = new Testbed(<ModalContent label="Modal Example" />)

  it('should render', function () {
    const subject = testbed.render()

    expect(subject.dom().className)
      .to.contain(styles['placement--left'])
  })

  it('should not have a close button', function () {
    const subject = testbed.render()

    expect(subject.find('button').length).to.equal(0)
  })

  it('should apply the a11y attributes', function () {
    const subject = testbed.render()

    expect(subject.find('[role="region"]')).to.be.present
    expect(subject.find('[aria-label="Modal Example"]').length).to.be.present
  })

  describe('when isDismissable is true', function () {
    it('should have a close button', function () {
      const subject = testbed.render({
        isDismissable: true
      })

      expect(subject.find('button').length).to.equal(1)
    })

    it('should call `onClose` when the close button is clicked', () => {
      const closeStub = testbed.sandbox.stub()
      const subject = testbed.render({
        isDismissable: true,
        onClose: closeStub
      })

      subject.find('button').trigger('click')

      expect(closeStub.called).to.be.true
    })
  })
})
