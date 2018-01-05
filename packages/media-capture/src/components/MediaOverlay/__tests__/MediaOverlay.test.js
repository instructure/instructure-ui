import React from 'react'
import MediaOverlay from '../index'

import {
  PREVIEWSAVE,
  SAVING,
  LOADING,
  ERROR,
  STARTING
} from '../../../constants/CaptureStates'

describe('<MediaOverlay />', () => {
  const testbed = new Testbed(<MediaOverlay captureState={PREVIEWSAVE} actions={{}} msg="" />)

  it('should render', () => {
    const overlay = testbed.render()

    expect(overlay).to.be.present
  })

  describe('captureStates', () => {
    describe('STARTING', () => {
      it('renders a <CountdownContainer />', () => {
        const overlay = testbed.render({ captureState: STARTING })
        expect(overlay.find('CountdownContainer').length).to.eql(1)
      })

      it('renders a <CountdownTimer />', () => {
        const overlay = testbed.render({ captureState: STARTING })
        expect(overlay.find('CountdownTimer').length).to.eql(1)
      })
    })

    describe('PREVIEWSAVE', () => {
      it('renders the preview badge />', () => {
        const overlay = testbed.render()
        expect(overlay.text()).to.eql('PREVIEW')
      })
    })

    describe('SAVING', () => {
      it('renders the preview badge />', () => {
        const overlay = testbed.render({ captureState: SAVING })
        expect(overlay.text()).to.eql('PREVIEW')
      })
    })

    describe('ERROR', () => {
      it('renders a <Message />', () => {
        const overlay = testbed.render({ captureState: ERROR })
        expect(overlay.find('Message').length).to.eql(1)
      })
    })

    describe('LOADING', () => {
      it('renders a <Loading />', () => {
        const overlay = testbed.render({ captureState: LOADING })
        expect(overlay.find('Loading').length).to.eql(1)
      })
    })
  })
})
