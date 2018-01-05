import React from 'react'
import MediaPlayback from '../index'

describe('<MediaPlayback />', () => {
  const props = {
    videoSrc: 'blob:12325wdfsdf'
  }
  const testbed = new Testbed(<MediaPlayback {...props} />)

  it('should render', () => {
    const playback = testbed.render()
    expect(playback).to.be.present
  })

  it('should render a video element', () => {
    const playback = testbed.render()
    expect(playback.find('video').length).to.eql(1)
  })
})
