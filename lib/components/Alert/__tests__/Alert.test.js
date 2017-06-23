import React from 'react'
import Button from '../../Button'
import Alert from '../index'
import styles from '../styles.css'

import IconCompleteSolid from 'instructure-icons/lib/Solid/IconCompleteSolid'
import IconInfoSolid from 'instructure-icons/lib/Solid/IconInfoSolid'
import IconWarningSolid from 'instructure-icons/lib/Solid/IconWarningSolid'

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

  it('should not render the Close button when `dismissible` is false', () => {
    const alert = testbed.render()

    expect(alert.find('button').length).to.equal(0)
  })

  it('should render an "icon" style Close button by default', () => {
    const alert = testbed.render({dismissible: true})
    expect(alert.find(Button).prop('variant')).to.equal('icon')
  })

  it('should call `onClose` when the close button is clicked', function () {
    const closeStub = testbed.stub()
    const alert = testbed.render({
      dismissible: true,
      onClose: closeStub
    })
    alert.find('button').simulate('click')
    testbed.tick()  // Transition exiting
    testbed.tick()  // Transition exited

    expect(closeStub.called).to.be.true
  })

  const variantChanges = (variant, variantModifications) => {
    it('should add a class to main div based on `variant`', () => {
      const alert = testbed.render({variant, transitionType: 'none'})
      const mainDiv = alert.find(`.${variantModifications.className}`)
      expect(mainDiv).to.be.present
    })

    it('should change the icon based on `variant`', () => {
      const alert = testbed.render({variant, transitionType: 'none'})
      const icon = alert.find(variantModifications.iconComponent)
      expect(icon).to.be.present
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
    const subject = testbed.render({transitionType: 'none'})

    subject.should.be.accessible(done)
  })

  it('should add alert text to aria live region, when present', () => {
    const liver = document.getElementById('_alertLiveRegion')
    testbed.render({liveRegion: () => liver, transitionType: 'none'})

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
    alert.setProps({open: false}, () => {
      testbed.tick()  // Transition exiting
      testbed.tick()  // Transition exited
    })
  })

  it('should close when told to, without transition', function (done) {
    const liver = document.getElementById('_alertLiveRegion')
    const alert = testbed.render({
      transitionType: 'none',
      liveRegion: () => liver,
      onClose: () => {
        expect(liver.children.length).to.equal(0)
        expect(alert.getDOMNode()).to.be.null
        done()
      }
    })
    alert.setProps({open: false})
  })
})
