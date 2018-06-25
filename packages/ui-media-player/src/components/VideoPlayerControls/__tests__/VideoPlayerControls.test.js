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
import { Provider } from '../../VideoPlayer/VideoPlayerContext'
import providerStateForTest from '../../VideoPlayer/__tests__/fixtures/providerStateForTest'

import styles from '../styles.css'

describe('<VideoPlayerControls />', () => {
  const providerState = { ...providerStateForTest }
  const testbed = new Testbed(
    <Provider value={providerState}>
      <VideoPlayerControls>
        <VideoPlayerControls.PlayPauseButton />
        <VideoPlayerControls.Timebar />
        <VideoPlayerControls.Volume />
        <VideoPlayerControls.FullScreenButton />
      </VideoPlayerControls>
    </Provider>
  )

  it('prevents bubbling and shows controls when clicked', () => {
    const customProviderState = {
      ...providerState,
      actions: {
        ...providerState.actions,
        showControls: testbed.stub()
      }
    }
    const component = testbed.render({ value: customProviderState }).find(`.${styles.container}`)
    const event = { stopPropagation: testbed.stub() }
    component.simulate('click', event)
    expect(event.stopPropagation).to.have.been.called
    expect(customProviderState.actions.showControls).to.have.been.called
  })

  it('hides controls when showControls is false', () => {
    const showingControlsProviderState = {
      ...providerState,
      state: {
        ...providerState.state,
        showControls: true
      }
    }
    const component = testbed.render({ value: showingControlsProviderState })
    expect(component.find(`.${styles.container}`).hasClass(styles.hidden)).to.eql(false)

    const hidingControlsProviderState = {
      ...showingControlsProviderState,
      state: {
        ...showingControlsProviderState.state,
        showControls: false
      }
    }

    /*
      https://github.com/airbnb/enzyme/issues/1229
      Context: Ideally, this it() block would test `styles.hidden`'s value from
      false to true (testbed.render() into setProps()) but there's an enzyme
      bug that doesn't re-render when a component's props change (how it affects this test:
      it only updates the prop(s) you passed in but not the styles' property (indirect changes?)
      that depends on one of the props you've changed).

      Wanted this to work
      ```
      component.setProps({ value: hidingControlsProviderState }, () => {
        expect(component.find(`.${styles.container}`).hasClass(styles.hidden)).to.eql(true)
        done()
      })
      ```
      but for now, below is the alternative solution
    */

    /*
      Below is a 2nd render in this `it` block. This will throw the following warning in console:

      ```
      Testbed.render called more than once in the same test for Provider !!
      ```
    */
    const hiddenComponent = testbed.render({ value: hidingControlsProviderState })
    expect(hiddenComponent.find(`.${styles.container}`).hasClass(styles.hidden)).to.eql(true)
  })

  it('renders a PlayPauseButton', () => {
    const customProviderState = {
      ...providerState,
      actions: {
        ...providerState.actions,
        togglePlay: testbed.stub()
      }
    }
    const component = testbed.render({ value: customProviderState })
    const button = component.find('PlayPauseButton').find('VideoPlayerButton')
    expect(button.prop('videoId')).to.eql(customProviderState.state.videoId)
    expect(button.text()).to.match(/Play/)
    expect(button.find('IconPlay').length).to.eql(1)
    button.click()
    expect(customProviderState.actions.togglePlay).to.have.been.called
  })

  it('renders a Timebar', () => {
    const customProviderState = {
      ...providerState,
      state: {
        ...providerState.state,
        currentTime: 123,
        duration: 456,
        buffered: 200
      },
      actions: {
        ...providerState.actions,
        seek: testbed.stub()
      }
    }
    const component = testbed.render({ value: customProviderState })
    const timebar = component.find('Timebar')
    expect(timebar.prop('currentTime')).to.eql(123)
    expect(timebar.prop('buffered')).to.eql(200)
    expect(timebar.prop('duration')).to.eql(456)
    expect(timebar.prop('videoId')).to.eql(customProviderState.state.videoId)
    timebar.prop('onClick')(123)
    expect(customProviderState.actions.seek).to.have.been.calledWith(123)
  })

  it('renders a Volume (button & slider)', () => {
    const popoverContentWrapperId = 'popover-content-wrapper'
    let popoverContentWrapper = document.createElement('div')
    popoverContentWrapper.setAttribute("id", `${popoverContentWrapperId}`)
    document.body.appendChild(popoverContentWrapper)
    const customProviderState = {
      ...providerState,
      state: {
        ...providerState.state,
        showControls: true
      },
      mediaPlayerWrapperRef: () => (popoverContentWrapper)
    }
    const component = testbed.render({ value: customProviderState })
    const button = component.find('Volume').find('VideoPlayerButton')
    expect(button.prop('videoId')).to.eql(customProviderState.state.videoId)
    expect(button.text()).to.match(/Unmuted/)
    expect(button.find('IconAudio').length).to.eql(1)
    button.click()
    const slider = document.getElementById(`${popoverContentWrapperId}`)
    expect(slider).to.not.be.null
    slider.remove()
  })

  it('renders a FullScreenButton', () => {
    const customProviderState = {
      ...providerState,
      actions: {
        ...providerState.actions,
        toggleFullScreen: testbed.stub()
      }
    }
    const component = testbed.render({ value: customProviderState })
    const button = component.find('FullScreenButton').find('VideoPlayerButton')
    expect(button.prop('videoId')).to.eql(customProviderState.state.videoId)
    expect(button.text()).to.match(/Full/)
    expect(button.find('IconFullScreen').length).to.eql(1)
    button.click()
    expect(customProviderState.actions.toggleFullScreen).to.have.been.called
  })
})
