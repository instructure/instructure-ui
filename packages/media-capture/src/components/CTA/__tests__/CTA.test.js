import React from 'react'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  SAVING
} from '../../../constants/CaptureStates'

import CTA from '../index'

describe('<CTA />', () => {
  const actionStubs = {
    saveClicked: () => {},
    startClicked: () => {},
    finishClicked: () => {}
  }
  const testbed = new Testbed(<CTA actions={actionStubs} captureState="" />)

  it('should render', () => {
    const CTA = testbed.render()
    expect(CTA).to.be.present
  })

  context('when READY state', () => {
    it('renders a start recording button', () => {
      const startClicked = testbed.stub()
      const cta = testbed.render({
        actions: { ...actionStubs, startClicked },
        captureState: READY
      })

      expect(cta.text()).to.eql('Start Recording')
      expect(cta.find('Button').prop('onClick')).to.eql(startClicked)
    })
  })

  context('when RECORDING state', () => {
    it('renders a finish button', () => {
      const finishClicked = testbed.stub()
      const cta = testbed.render({
        actions: { ...actionStubs, finishClicked },
        captureState: RECORDING
      })

      expect(cta.text()).to.eql('Finish')
      expect(cta.find('Button').prop('onClick')).to.eql(finishClicked)
    })
  })

  context('when PREVIEWSAVE state', () => {
    it('renders a save button', () => {
      const saveClicked = testbed.stub()
      const cta = testbed.render({
        actions: { ...actionStubs, saveClicked },
        captureState: PREVIEWSAVE
      })

      expect(cta.text()).to.eql('Save')
      expect(cta.find('Button').prop('onClick')).to.eql(saveClicked)
      expect(cta.find('Button').prop('disabled')).to.eql(false)
    })
  })

  context('when SAVING state', () => {
    it('renders a disabled save button', () => {
      const cta = testbed.render({ captureState: SAVING })

      expect(cta.text()).to.eql('Save')
      expect(cta.find('Button').prop('disabled')).to.eql(true)
    })
  })
})
