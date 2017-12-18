import React from 'react'
import MediaContainer from '../index'

describe('<MediaOverlay />', () => {
  const testbed = new Testbed(<MediaContainer />)

  it('should render', () => {
    const container = testbed.render()

    expect(container).to.be.present
  })
})
