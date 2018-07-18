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

import PlaybackSpeed from '../index'

describe('<PlaybackSpeed />', () => {
  const testbed = new Testbed(
    <PlaybackSpeed
      showControls={false}
      videoId={'uuid-123'}
      playbackSpeed={1}
      mountNode={() => {}}
      handleShowControls={() => {}}
      setPlaybackSpeed={() => {}}
      setToPrevSpeed={() => {}}
      setToNextSpeed={() => {}}
      playbackSpeedOptions={[1, 2, 3]}
    />
  )

  it('should render', () => {
    expect(testbed.render()).to.be.present()
  })

  it('passes down forwardRef to VideoPlayerButton', () => {
    const forwardRefStub = testbed.stub()
    testbed.render({ forwardRef: forwardRefStub })
    expect(forwardRefStub).to.have.been.called
  })

  it('shows Playback Speed on ScreenReaderContent', () => {
    const component = testbed.render()
    expect(component.find('PopoverTrigger').text()).to.match(/Playback Speed[0-9]?\.?[0-9]x/)
  })

  it('hides popover when it\'s open and showControls is false', () => {
    const component = testbed.render({ showControls: true })
    component.instance().hidePopover = testbed.stub()
    component.setState({ showPopover: true }, () => {
      component.setProps({ showControls: false }, () => {
        expect(component.instance().hidePopover).to.have.been.called
      })
    })
  })

  it('hides menu when other controls are hidden', () => {
    const component = testbed.render({ showControls: true })
    component.instance().hidePopover = testbed.stub()
    component.setState({ showPopover: true }, () => {
      component.setProps({ showControls: false }, () => {
        expect(component.instance().hidePopover).to.have.been.called
      })
    })
  })

  it('doesn\'t bubble on Space keydown when the focus is on MenuItem', () => {
    const e = new KeyboardEvent('keydown', { key: 'Space' })
    const handleShowControlsStub = testbed.stub()
    const component = testbed.render({ handleShowControls: handleShowControlsStub })
    component.instance().handleKeyDown(e)
    expect(handleShowControlsStub).to.have.been.called
  })

  it('doesn\'t bubble on Enter keydown when the focus is on MenuItem', () => {
    const e = new KeyboardEvent('keydown', { key: 'Enter' })
    const handleShowControlsStub = testbed.stub()
    const component = testbed.render({ handleShowControls: handleShowControlsStub })
    component.instance().handleKeyDown(e)
    expect(handleShowControlsStub).to.have.been.called
  })

  it('should select the right speed its corresponding MenuItem is selected', () => {
    const setPlaybackSpeed = testbed.stub()
    const component = testbed.render({ setPlaybackSpeed })
    component.instance().handleOnSelect({}, [1.5])
    expect(setPlaybackSpeed).to.have.been.calledWith(1.5)
  })

  it('should persist Menu\'s visibility when its content is being hovered', () => {
    const handleShowControls = testbed.stub()
    const component = testbed.render({ handleShowControls })
    component.instance().handleOnMouseMove()
    expect(handleShowControls).to.have.been.called
  })
})
