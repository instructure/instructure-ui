import React from 'react'
import MediaPlayback from '../index'

describe('<MediaPlayback />', () => {
  const testbed = new Testbed(<MediaPlayback />)

  it('should render', () => {
    const playback = testbed.render()
    expect(playback).to.be.present
  })
})
