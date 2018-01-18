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
})
