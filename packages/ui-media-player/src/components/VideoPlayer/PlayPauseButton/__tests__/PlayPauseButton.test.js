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
import PlayPauseButton from '../index'

import {
  PAUSED,
  PLAYING,
  ENDED
} from '../../videoStates'

describe('<PlayPauseButton />', () => {
  const videoId = 'uuid-123'
  const testbed = new Testbed(<PlayPauseButton videoId={videoId} />)

  it('should render', () => {
    expect(testbed.render()).to.be.present
  })

  it('defaults to the paused variant', () => {
    expect(testbed.render().text()).to.match(/Play/)
  })

  it('invokes onClick prop when clicked', () => {
    const onClick = testbed.stub()
    const button = testbed.render({ onClick })
    button.click()
    expect(onClick).to.have.been.called
  })

  it('stops bubbling when space is pressed', () => {
    const event = { stopPropagation: testbed.stub(), key: ' ' }
    const button = testbed.render()
    button.simulate('keyDown', event)
    expect(event.stopPropagation).to.have.been.called
  })

  it('invokes forwardRef prop on mount', () => {
    const forwardRef = testbed.stub()
    testbed.render({ forwardRef })
    expect(forwardRef).to.have.been.called
  })

  describe('variants', () => {
    context('PAUSED', () => {
      it('renders a play button', () => {
        const button = testbed.render({ variant: PAUSED })
        expect(button.text()).to.match(/Play/)
        expect(button.find('IconPlay').length).to.eql(1)
      })
    })

    context('ENDED', () => {
      it('renders a play button', () => {
        const button = testbed.render({ variant: ENDED })
        expect(button.text()).to.match(/Play/)
        expect(button.find('IconPlay').length).to.eql(1)
      })
    })

    context('PLAYING', () => {
      it('renders a pause button', () => {
        const button = testbed.render({ variant: PLAYING })
        expect(button.text()).to.match(/Pause/)
        expect(button.find('IconPause').length).to.eql(1)
      })
    })
  })
})
