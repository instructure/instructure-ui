import React from 'react'
import RecordingBadge from '../index'

describe('<RecordingBadge />', () => {
  const testbed = new Testbed(<RecordingBadge />)

  it('should render', () => {
    const recordingBadge = testbed.render()
    expect(recordingBadge).to.be.present
  })

  it('should render a <Timer />', () => {
    const recordingBadge = testbed.render()
    expect(recordingBadge.find('Timer').length).to.equal(1)
  })
})
