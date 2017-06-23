import React from 'react'

import IconCompleteSolid from 'instructure-icons/lib/Solid/IconCompleteSolid'
import IconInfoSolid from 'instructure-icons/lib/Solid/IconInfoSolid'
import IconWarningSolid from 'instructure-icons/lib/Solid/IconWarningSolid'

import Alert from '../index'
import styles from '../styles.css'

describe('<Alert />', function () {
  beforeEach(function () {
    const srdiv = document.createElement('div')
    srdiv.id = '_alertLiveRegion'
    srdiv.setAttribute('role', 'alert')
    srdiv.setAttribute('aria-live', 'assertive')
    srdiv.setAttribute('aria-relevant', 'additions text')
    srdiv.setAttribute('aria-atomic', 'false')
    document.body.appendChild(srdiv)
  })
  afterEach(function () {
    const srdiv = document.getElementById('_alertLiveRegion')
    srdiv.parentElement.removeChild(srdiv)
  })

  const testbed = new Testbed(
    <Alert variant="success" closeButtonLabel="Close">
      Success: Sample alert text.
    </Alert>
  )

  it('should render', function () {
    const alert = testbed.render()
    expect(alert).to.be.present
  })

  it('should not render the Close button when `dismissible` is false', function () {
    const alert = testbed.render()

    expect(alert.find('button').length).to.equal(0)
  })

  it('should call `onClose` when the close button is clicked', function () {
    const onClose = testbed.stub()

    const alert = testbed.render({
      dismissible: true,
      onClose
    })

    alert.find('button').simulate('click')

    testbed.tick()  // Transition exiting
    testbed.tick()  // Transition exited

    expect(onClose.called).to.be.true
  })

  const variantChanges = function (variant, variantModifications) {
    it('should add a class to main div based on `variant`', function () {
      const alert = testbed.render({variant, transition: 'none'})
      const mainDiv = alert.find(`.${variantModifications.className}`)
      expect(mainDiv).to.be.present
    })

    it('should change the icon based on `variant`', function () {
      const alert = testbed.render({variant, transition: 'none'})
      const icon = alert.find(variantModifications.iconComponent)
      expect(icon).to.be.present
    })
  }

  describe('`variant` is success', function () {
    const variantModifications = {
      className: styles.success,
      iconComponent: IconCompleteSolid
    }
    variantChanges('success', variantModifications)
  })

  describe('`variant` is error', function () {
    const variantModifications = {
      className: styles.error,
      iconComponent: IconWarningSolid
    }
    variantChanges('error', variantModifications)
  })

  describe('`variant` is warning', function () {
    const variantModifications = {
      className: styles.warning,
      iconComponent: IconWarningSolid
    }
    variantChanges('warning', variantModifications)
  })

  describe('`variant` is info', function () {
    const variantModifications = {
      className: styles.info,
      iconComponent: IconInfoSolid
    }
    variantChanges('info', variantModifications)
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render({transition: 'none'})

    subject.should.be.accessible(done)
  })

  it('should add alert text to aria live region, when present', function () {
    const liver = document.getElementById('_alertLiveRegion')

    testbed.render({
      liveRegion: () => liver,
      transition: 'none'
    })

    expect(liver.innerText).to.include('Success: Sample alert text.')
  })

  it('should close when told to, with transition', function (done) {
    const liver = document.getElementById('_alertLiveRegion')
    const alert = testbed.render({
      liveRegion: () => liver,
      onClose: () => {
        expect(liver.children.length).to.equal(0)
        done()
      }
    })
    testbed.tick()    // Transition entered
    alert.setProps({ open: false }, function () {
      testbed.tick()  // Transition exiting
      testbed.tick()  // Transition exited
    })
  })

  it('should close when told to, without transition', function (done) {
    const liver = document.getElementById('_alertLiveRegion')
    const alert = testbed.render({
      transition: 'none',
      liveRegion: () => liver,
      onClose: () => {
        expect(liver.children.length).to.equal(0)
        expect(alert.getDOMNode()).to.be.null
        done()
      }
    })
    alert.setProps({ open: false })
  })
})
