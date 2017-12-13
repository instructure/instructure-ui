import React from 'react'
import CapturePresentation from '../index'

describe('<CapturePresentation />', () => {
  const testbed = new Testbed(<CapturePresentation />)

  it('should render', () => {
    const presentation = testbed.render()
    expect(presentation).to.be.present
  })
})
