import React from 'react'
import MediaOverlay from '../index'

import {
  READY
} from '../../../constants/CaptureStates'

describe('<MediaOverlay />', () => {
  const testbed = new Testbed(<MediaOverlay captureState={READY} />)

  it('should render', () => {
    const overlay = testbed.render()

    expect(overlay).to.be.present
  })
})
