import React from 'react'
import CaptureBackground from '../index'

describe('<CaptureBackground />', () => {
  const testbed = new Testbed(<CaptureBackground />)

  it('should render', () => {
    const background = testbed.render()
    expect(background).to.be.present
  })
})
