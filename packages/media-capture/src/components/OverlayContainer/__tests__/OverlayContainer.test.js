import React from 'react'
import OverlayContainer from '../index'

describe('<Controller />', () => {
  const testbed = new Testbed(<OverlayContainer />)

  it('should render', () => {
    const overlay = testbed.render()
    expect(overlay).to.be.present
  })
})
