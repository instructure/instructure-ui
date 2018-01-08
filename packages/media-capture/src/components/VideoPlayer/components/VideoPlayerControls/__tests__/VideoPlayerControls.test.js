import React from 'react'
import VideoPlayerControls from '../index'

import styles from '../styles.css'

import { PLAYING } from '../../../videoStates'

describe('<VideoPlayerControls />', () => {
  const videoId = 'uuid-123'
  const testbed = new Testbed(
    <VideoPlayerControls
      actions={{ seek: () => { }, togglePlay: () => { } }}
      videoId={videoId}
      state={PLAYING}
    />
  )

  it('prevents bubbling when clicked', () => {
    const event = { stopPropagation: testbed.stub() }
    const controls = testbed.render()
    controls.simulate('click', event)
    expect(event.stopPropagation).to.have.been.called
  })

  it('hides controls when showControls is false', () => {
    const controls = testbed.render({ showControls: true })
    expect(controls.hasClass(styles.hidden)).to.eql(false)
    controls.setProps({ showControls: false })
    expect(controls.hasClass(styles.hidden)).to.eql(true)
  })

  it('renders a PlayPauseButton', () => {
    const actions = {
      seek: () => { },
      togglePlay: testbed.stub()
    }
    const controls = testbed.render({ actions })
    const button = controls.find('PlayPauseButton')
    expect(button.prop('videoId')).to.eql(videoId)
    expect(button.prop('variant')).to.eql(PLAYING)
    button.simulate('click')
    expect(actions.togglePlay).to.have.been.called
  })

  it('renders a Timebar', () => {
    const actions = {
      seek: testbed.stub(),
      togglePlay: () => {}
    }
    const controls = testbed.render({ actions, currentTime: 123, duration: 456, buffered: 200 })
    const timebar = controls.find('Timebar')
    expect(timebar.prop('currentTime')).to.eql(123)
    expect(timebar.prop('buffered')).to.eql(200)
    expect(timebar.prop('duration')).to.eql(456)
    expect(timebar.prop('videoId')).to.eql(videoId)
    timebar.prop('onClick')(123)
    expect(actions.seek).to.have.been.calledWith(123)
  })
})
