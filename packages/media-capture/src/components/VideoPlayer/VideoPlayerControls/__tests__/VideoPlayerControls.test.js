/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react'
import VideoPlayerControls from '../index'

import styles from '../styles.css'

import { PLAYING } from '../../videoStates'

describe('<VideoPlayerControls />', () => {
  const videoId = 'uuid-123'
  const stubActions = {
    seek: () => {},
    showControls: () => {},
    togglePlay: () => {}
  }
  const testbed = new Testbed(
    <VideoPlayerControls actions={stubActions} videoId={videoId} state={PLAYING} />
  )

  it('prevents bubbling and shows controls when clicked', () => {
    const showControls = testbed.stub()
    const event = { stopPropagation: testbed.stub() }
    const controls = testbed.render({ actions: { ...stubActions, showControls } })
    controls.simulate('click', event)
    expect(event.stopPropagation).to.have.been.called()
    expect(showControls).to.have.been.called()
  })

  it('hides controls when showControls is false', () => {
    const controls = testbed.render({ showControls: true })
    expect(controls.hasClass(styles.hidden)).to.eql(false)
    controls.setProps({ showControls: false })
    expect(controls.hasClass(styles.hidden)).to.eql(true)
  })

  it('renders a PlayPauseButton', () => {
    const actions = {
      ...stubActions,
      togglePlay: testbed.stub()
    }
    const controls = testbed.render({ actions })
    const button = controls.find('PlayPauseButton')
    expect(button.prop('videoId')).to.eql(videoId)
    expect(button.prop('variant')).to.eql(PLAYING)
    button.simulate('click')
    expect(actions.togglePlay).to.have.been.called()
  })

  it('renders a Timebar', () => {
    const actions = {
      ...stubActions,
      seek: testbed.stub()
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

  it('invokes onMount after mounting', () => {
    const onMount = testbed.stub()
    testbed.render({ onMount })
    expect(onMount).to.have.been.called()
  })
})
