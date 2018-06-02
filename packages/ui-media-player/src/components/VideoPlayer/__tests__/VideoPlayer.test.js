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
import VideoPlayer, {
  SEEK_INTERVAL_SECONDS,
  JUMP_INTERVAL_SECONDS,
  MEDIA_ELEMENT_EVENTS
} from '../index'
import {
  PAUSED,
  PLAYING
} from '../videoStates'
import testVideo from './fixtures/testVideo'

describe('<VideoPlayer />', () => {
  const testbed = new Testbed(<VideoPlayer src={testVideo} />)
  let mockVideo

  beforeEach(() => {
    mockVideo = {
      currentTime: 0,
      duration: 100,
      buffered: {
        end: testbed.stub(),
        length: 1
      },
      paused: true,
      ended: false,
      play () { this.paused = false },
      pause () { this.paused = true },
      addEventListener: testbed.stub(),
      removeEventListener: testbed.stub()
    }
  })

  function renderWithMockVideo (videoOverrides = {}) {
    const player = testbed.render()
    player.instance().video = { ...mockVideo, ...videoOverrides }
    player.instance().applyVideoProps()

    return player
  }

  it('should render', () => {
    expect(testbed.render()).to.be.present
  })

  it('should render a </Loading />', () => {
    expect(testbed.render().find('Loading').length).to.eql(1)
  })

  it('should be accessible', (done) => {
    expect(testbed.render()).to.be.accessible(done)
  })

  describe('when the source is loaded', () => {
    it('hides the loading indicator', () => {
      const player = testbed.render()
      player.setState({ loadingSrc: false })
      expect(player.find('Loading').length).to.eql(0)
    })
  })

  describe('#componentDidMount', () => {
    it('adds event listeners on the video element', () => {
      testbed.spy(VideoPlayer.prototype, '_registerEventHandlers')
      testbed.render()
      expect(VideoPlayer.prototype._registerEventHandlers).to.have.been.called
    })
  })

  describe('#componentWillUnmount', () => {
    it('removes the video event listeners', () => {
      const player = renderWithMockVideo()
      const listenerCb = player.instance().applyVideoProps
      player.unmount()

      MEDIA_ELEMENT_EVENTS.forEach((evt) => {
        expect(mockVideo.removeEventListener).to.have.been.calledWith(
          evt,
          listenerCb
        )
      })
    })
  })

  describe('#_registerEventListeners', () => {
    it('adds event listeners on the video element', () => {
      const player = renderWithMockVideo()
      const listenerCb = player.instance().applyVideoProps
      mockVideo.addEventListener.resetHistory()
      player.instance()._registerEventHandlers()

      MEDIA_ELEMENT_EVENTS.forEach((evt) => {
        expect(mockVideo.addEventListener).to.have.been.calledWith(
          evt,
          listenerCb
        )
      })
    })
  })

  describe('rendering controls', () => {
    it('renders a VideoPlayerControls by default', () => {
      const player = testbed.render()
      const controls = player.find('VideoPlayerControls')
      expect(controls.exists()).to.eql(true)

      const playPauseButton = controls.find('PlayPauseButton')
      expect(playPauseButton.exists()).to.eql(true)

      const timebar = controls.find('Timebar')
      expect(timebar.exists()).to.eql(true)
    })

    it('can render custom controls', () => {
      const player = testbed.render({
        controls: () => { // eslint-disable-line react/display-name
          return <div className="controls" />
        }
      })
      expect(player.find('.controls').length).to.eql(1)
    })
  })

  it('toggles play when clicked', () => {
    const player = renderWithMockVideo()
    expect(player.state('videoState')).to.eql(PAUSED)
    player.simulate('click')
    player.instance().applyVideoProps()
    expect(player.state('videoState')).to.eql(PLAYING)
  })

  describe('keybindings', () => {
    function keyboardEvent (player, key) {
      player.simulate('keyDown', { key })
      // allow internal state to update
      player.instance().applyVideoProps()
    }

    it('can seek forward', () => {
      const oldTime = mockVideo.currentTime
      const player = renderWithMockVideo()
      keyboardEvent(player, 'ArrowRight')
      expect(player.state('currentTime')).to.eql(oldTime + SEEK_INTERVAL_SECONDS)
    })

    it('can seek backward', () => {
      mockVideo.currentTime = 15
      const player = renderWithMockVideo()
      keyboardEvent(player, 'ArrowLeft')
      expect(player.state('currentTime')).to.eql(15 - SEEK_INTERVAL_SECONDS)
    })

    it('can jump forward', () => {
      const oldTime = mockVideo.currentTime
      const player = renderWithMockVideo()
      keyboardEvent(player, 'PageUp')
      expect(player.state('currentTime')).to.eql(oldTime + JUMP_INTERVAL_SECONDS)
    })

    it('can jump backward', () => {
      mockVideo.currentTime = 90
      const player = renderWithMockVideo()
      keyboardEvent(player, 'PageDown')
      expect(player.state('currentTime')).to.eql(90 - JUMP_INTERVAL_SECONDS)
    })

    it('can toggle play', () => {
      const player = renderWithMockVideo()
      keyboardEvent(player, ' ')
      expect(player.state('videoState')).to.eql(PLAYING)
      keyboardEvent(player, ' ')
      expect(player.state('videoState')).to.eql(PAUSED)
    })

    it('shows the controls when a keybinding is activated', () => {
      const player = renderWithMockVideo()
      player.instance().showControls = testbed.stub()
      return ['ArrowRight', 'ArrowLeft', 'PageUp', 'PageDown', ' '].forEach((key) => {
        player.instance().showControls.resetHistory()
        keyboardEvent(player, key)
        expect(player.instance().showControls).to.have.been.called
      })
    })

    it('does not show controls when key is ignored', () => {
      const player = renderWithMockVideo()
      player.instance().showControls = testbed.stub()
      keyboardEvent(player, 'a')
      expect(player.instance().showControls).to.not.have.been.called
    })
  })

  describe('showing and hiding controls', () => {
    describe('#showControls', () => {
      context('when alwaysShowControls is true', () => {
        it('never dismisses the controls', () => {
          const player = testbed.render({ alwaysShowControls: true })
          player.setState({ videoState: PLAYING })
          player.instance().showControls()
          testbed.tick(5000)
          expect(player.state('showControls')).to.eql(true)
        })
      })

      context('when alwaysShowControls is false', () => {
        it('shows the controls', () => {
          const player = testbed.render()
          player.setState({ showControls: false })
          player.instance().showControls()
          expect(player.state('showControls')).to.eql(true)
        })

        context('when video playing', () => {
          it('hides the controls after a timeout', () => {
            const player = testbed.render()
            player.setState({ videoState: PLAYING })
            player.instance().showControls(100)
            expect(player.state('showControls')).to.eql(true)
            testbed.tick(100)
            expect(player.state('showControls')).to.eql(false)
          })
        })

        context('when the video is paused', () => {
          it('does not hide the controls', () => {
            const player = testbed.render()
            player.setState({ state: PAUSED })
            player.instance().showControls(100)
            expect(player.state('showControls')).to.eql(true)
            testbed.tick(100)
            expect(player.state('showControls')).to.eql(true)
          })
        })

        context('if invoked another time within the timeout', () => {
          it('clears the initial timeout', () => {
            const player = testbed.render()
            player.setState({ videoState: PLAYING })
            player.instance().showControls(100)
            testbed.tick(50)
            expect(player.state('showControls')).to.eql(true)
            player.instance().showControls(100)
            testbed.tick(50)
            expect(player.state('showControls')).to.eql(true)
            testbed.tick(50)
            expect(player.state('showControls')).to.eql(false)
          })
        })
      })

      it('shows controls on mount', () => {
        const player = testbed.render()
        expect(player.state('showControls')).to.eql(true)
      })

      it('shows controls on focus', () => {
        const player = testbed.render()
        player.setState({ showControls: false })
        player.simulate('focus')
        expect(player.state('showControls')).to.eql(true)
      })

      it('shows controls on mouse move', () => {
        const player = testbed.render()
        player.setState({ showControls: false })
        player.simulate('mouseMove')
        expect(player.state('showControls')).to.eql(true)
      })
    })
  })

  describe('when the video ends', () => {
    it('resets to the beginning and shows controls', () => {
      const player = renderWithMockVideo({ currentTime: 100, ended: true })
      player.setState({ showControls: false })
      player.instance().applyVideoProps()
      expect(player.state('currentTime')).to.eql(0)
      expect(player.state('showControls')).to.eql(true)
    })
  })
})
