import React from 'react'
import MediaOverlay from '../index'

import {
  PREVIEWSAVE,
  SAVING
} from '../../../constants/CaptureStates'

describe('<MediaOverlay />', () => {
  const testbed = new Testbed(<MediaOverlay captureState={PREVIEWSAVE} />)

  it('should render', () => {
    const overlay = testbed.render()

    expect(overlay).to.be.present
  })

  describe('captureStates', () => {
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
  })
})
