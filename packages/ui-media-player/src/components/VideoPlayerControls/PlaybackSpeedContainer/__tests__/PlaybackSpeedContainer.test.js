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

import providerStateForTest from '../../../VideoPlayer/__tests__/fixtures/providerStateForTest'
import { Provider } from '../../../VideoPlayer/VideoPlayerContext'
import PlaybackSpeedContainer from '../index'

describe('<PlaybackSpeedContainer />', () => {
  const providerState = { ...providerStateForTest }
  const testbed = new Testbed(
    <Provider value={providerState}>
      <PlaybackSpeedContainer />
    </Provider>
  )

  it('should render', () => {
    expect(testbed.render()).to.be.present()
  })

  it('passes down forwardRef to VideoPlayerButton', () => {
    const forwardRef = testbed.stub()
    testbed.render({ children: <PlaybackSpeedContainer forwardRef={forwardRef} /> })
    expect(forwardRef).to.have.been.called()
  })

  it('doesn\'t bubble on Space keydown when the focus is on MenuItem', () => {
    const e = new KeyboardEvent('keydown', { key: 'Space' })
    const showControls = testbed.stub()
    const component = testbed.render()
    component.find('PlaybackSpeedContainer').node.handleKeyDown(showControls)(e)
    expect(showControls).to.have.been.called()
  })

  it('doesn\'t bubble on Enter keydown when the focus is on MenuItem', () => {
    const e = new KeyboardEvent('keydown', { key: 'Enter' })
    const showControls = testbed.stub()
    const component = testbed.render()
    component.find('PlaybackSpeedContainer').node.handleKeyDown(showControls)(e)
    expect(showControls).to.have.been.called()
  })

  it('sets the right speed when its corresponding MenuItem is selected', () => {
    const setPlaybackSpeed = testbed.stub()
    const component = testbed.render()
    component.find('PlaybackSpeedContainer').node.handleOnSelect(setPlaybackSpeed)({}, [1.5])
    expect(setPlaybackSpeed).to.have.been.calledWith(1.5)
  })

  it('should persist Menu\'s visibility when its content is being hovered', () => {
    const showControls = testbed.stub()
    const component = testbed.render()
    component.find('PlaybackSpeedContainer').node.handleOnMouseMove(showControls)()
    expect(showControls).to.have.been.called()
  })
})
