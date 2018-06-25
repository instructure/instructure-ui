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

import VolumeContainer from '../index'
import { Provider } from '../../../VideoPlayer/VideoPlayerContext'
import { SEEK_VOLUME_INTERVAL, JUMP_VOLUME_INTERVAL } from '../../../VideoPlayer'
import providerStateForTest from '../../../VideoPlayer/__tests__/fixtures/providerStateForTest'

describe('<VolumeContainer />', () => {
  const providerState = { ...providerStateForTest }
  const testbed = new Testbed(
    <Provider value={providerState}>
      <VolumeContainer />
    </Provider>
  )

  describe('variants', () => {
    context('VOLUME_UNMUTED', () => {
      it('shows `Unmuted` on ScreenReaderContent', () => {
        const customProviderState = {
          ...providerState,
          state: {
            ...providerState.state,
            muted: false
          }
        }
        const component = testbed.render({ value: customProviderState })
        expect(component.find('PopoverTrigger').text()).to.match(/Unmuted/)
        expect(component.find('IconAudio').length).to.eql(1)
      })
    })

    context('VOLUME_MUTED', () => {
      it('shows `Muted` on ScreenReaderContent', () => {
        const customProviderState = {
          ...providerState,
          state: {
            ...providerState.state,
            muted: true
          }
        }
        const component = testbed.render({ value: customProviderState })
        expect(component.find('PopoverTrigger').text()).to.match(/Muted/)
        expect(component.find('IconAudio').length).to.eql(1)
      })
    })
  })

  describe('keybindings', () => {
    let customProviderState
    beforeEach(() => {
      customProviderState = {
        ...providerState,
        state: {
          ...providerState.state,
          volume: 0.5
        },
        actions: {
          ...providerState.actions,
          setVolume: testbed.stub(),
          toggleMute: testbed.stub(),
          showControls: testbed.stub()
        }
      }
    })

    function keyboardEvent (component, key) {
      const volume = component.find('VolumeContainer')
      const e = new KeyboardEvent('keydown', { key })
      volume.node.handleKeyPress(e, customProviderState.state, customProviderState.actions)
    }

    it('can decrease volume with ArrowLeft', () => {
      const oldVolume = customProviderState.state.volume
      const component = testbed.render()
      keyboardEvent(component, 'ArrowLeft')
      expect(customProviderState.actions.setVolume).to.have.been.calledWith(oldVolume - SEEK_VOLUME_INTERVAL)
    })

    it('can increase volume with ArrowRight', () => {
      const oldVolume = customProviderState.state.volume
      const component = testbed.render()
      keyboardEvent(component, 'ArrowRight')
      expect(customProviderState.actions.setVolume).to.have.been.calledWith(oldVolume + SEEK_VOLUME_INTERVAL)
    })

    it('can increase volume with ArrowUp', () => {
      const oldVolume = customProviderState.state.volume
      const component = testbed.render()
      keyboardEvent(component, 'ArrowUp')
      expect(customProviderState.actions.setVolume).to.have.been.calledWith(oldVolume + SEEK_VOLUME_INTERVAL)
    })

    it('can decrease volume with ArrowDown', () => {
      const oldVolume = customProviderState.state.volume
      const component = testbed.render()
      keyboardEvent(component, 'ArrowDown')
      expect(customProviderState.actions.setVolume).to.have.been.calledWith(oldVolume - SEEK_VOLUME_INTERVAL)
    })

    it('can increase volume with PageUp', () => {
      const oldVolume = customProviderState.state.volume
      const component = testbed.render()
      keyboardEvent(component, 'PageUp')
      expect(customProviderState.actions.setVolume).to.have.been.calledWith(oldVolume + JUMP_VOLUME_INTERVAL)
    })

    it('can decrease volume with PageDown', () => {
      const oldVolume = customProviderState.state.volume
      const component = testbed.render()
      keyboardEvent(component, 'PageDown')
      expect(customProviderState.actions.setVolume).to.have.been.calledWith(oldVolume - JUMP_VOLUME_INTERVAL)
    })

    it('can set volume to 0% with Home', () => {
      const component = testbed.render()
      keyboardEvent(component, 'Home')
      expect(customProviderState.actions.setVolume).to.have.been.calledWith(0)
    })

    it('can set volume to 100% with End', () => {
      const component = testbed.render()
      keyboardEvent(component, 'End')
      expect(customProviderState.actions.setVolume).to.have.been.calledWith(1)
    })

    it('can toggle mute with space', () => {
      const component = testbed.render()
      keyboardEvent(component, ' ')
      expect(customProviderState.actions.toggleMute).to.have.been.called
    })

    it('can toggle mute with Enter', () => {
      const component = testbed.render()
      keyboardEvent(component, 'Enter')
      expect(customProviderState.actions.toggleMute).to.have.been.called
    })

    it('can toggle mute with m', () => {
      const component = testbed.render()
      keyboardEvent(component, 'm')
      expect(customProviderState.actions.toggleMute).to.have.been.called
    })

    it('can toggle mute with M', () => {
      const component = testbed.render()
      keyboardEvent(component, 'M')
      expect(customProviderState.actions.toggleMute).to.have.been.called
    })

    it('shows the controls when a keybinding is activated', () => {
      const component = testbed.render()
      return ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown',
              'PageUp', 'PageDown', 'Home', 'End', ' ', 'Enter',
              'm', 'M'].forEach((key) => {
        const showControlsStub = customProviderState.actions.showControls
        showControlsStub.resetHistory()
        keyboardEvent(component, key)
        expect(showControlsStub).to.have.been.called
      })
    })

    it('does not show controls when key is ignored', () => {
      const component = testbed.render()
      keyboardEvent(component, 'a')
      expect(customProviderState.actions.showControls).to.not.have.been.called
    })
  })
})
