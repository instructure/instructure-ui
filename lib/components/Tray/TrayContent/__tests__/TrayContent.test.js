import React from 'react'

import TrayContent from '../index'

import styles from '../styles.css'

describe('<TrayContent />', function () {
  const testbed = new Testbed(<TrayContent label="Tray Example" />)

  it('should render', function () {
    const subject = testbed.render({
      placement: 'left'
    })
    expect(subject.hasClass(styles['placement--left'])).to.be.true
  })

  it('should not have a close button', function () {
    const subject = testbed.render({
      placement: 'left'
    })
    expect(subject.find('button').length).to.equal(0)
  })

  it('should apply the a11y attributes', function () {
    const subject = testbed.render()
    expect(subject.find('[role="region"]')).to.be.present
    expect(subject.find('[aria-label="Tray Example"]')).to.be.present
  })

  describe('when isDismissable is true', function () {
    it('should have a close button', function () {
      const subject = testbed.render({
        isDismissable: true,
        placement: 'left'
      })

      expect(subject.find('button').length).to.equal(1)
    })

    it('should call `onClose` when the close button is clicked', () => {
      const closeStub = testbed.sandbox.stub()
      const subject = testbed.render({
        isDismissable: true,
        onClose: closeStub,
        placement: 'left'
      })
      subject.find('button').simulate('click')
      expect(closeStub.called).to.be.true
    })
  })
})
