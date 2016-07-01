import React from 'react'
import Alert from '../index'
import styles from '../Alert.css'

import {
  IconCompleteSolid,
  IconInfoSolid,
  IconWarningSolid
} from 'instructure-icons'

describe('<Alert />', function () {
  const testbed = createTestbed(
    <Alert variant="success" closeButtonLabel="Close">
      Success: Sample alert text.
    </Alert>
  )

  it('should render', function () {
    const alert = testbed.render()
    expect(alert.dom()).to.exist
  })

  it('should not render the Close button when `isDismissable` is false', () => {
    const alert = testbed.render()

    expect(alert.find('button').length).to.equal(0)
  })

  it('should call `onClose` when the close button is clicked', () => {
    const closeStub = testbed.sandbox.stub()
    const alert = testbed.render({isDismissable: true, onClose: closeStub})
    alert.find('button').trigger('click')
    expect(closeStub.called).to.be.true
  })

  const variantChanges = (variant, variantModifications) => {
    it('should add a class to main div based on `variant`', () => {
      const alert = testbed.render({variant})
      const mainDiv = alert.find(variantModifications.className)
      expect(mainDiv).to.exist
    })

    it('should change the icon based on `variant`', () => {
      const alert = testbed.render({variant})
      const icon = alert.find(variantModifications.iconComponent)
      expect(icon).to.exist
    })
  }

  describe('`variant` is success', () => {
    const variantModifications = {
      className: styles.success,
      iconComponent: IconCompleteSolid
    }
    variantChanges('success', variantModifications)
  })

  describe('`variant` is error', () => {
    const variantModifications = {
      className: styles.error,
      iconComponent: IconWarningSolid
    }
    variantChanges('error', variantModifications)
  })

  describe('`variant` is warning', () => {
    const variantModifications = {
      className: styles.warning,
      iconComponent: IconWarningSolid
    }
    variantChanges('warning', variantModifications)
  })

  describe('`variant` is info', () => {
    const variantModifications = {
      className: styles.info,
      iconComponent: IconInfoSolid
    }
    variantChanges('info', variantModifications)
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
