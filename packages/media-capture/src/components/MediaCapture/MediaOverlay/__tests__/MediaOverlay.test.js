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
import MediaOverlay from '../index'

import {
  PREVIEWSAVE,
  SAVING,
  LOADING,
  ERROR,
  STARTING,
  RECORDING,
  READY
} from '../../../../constants/CaptureStates'

describe('<MediaOverlay />', () => {
  const soundMeter = { volume: 0 }

  const testbed = new Testbed(<MediaOverlay captureState={PREVIEWSAVE} actions={{}} msg="" />)

  it('should render', () => {
    const overlay = testbed.render()

    expect(overlay).to.be.present
  })

  describe('captureStates', () => {
    describe('STARTING', () => {
      it('renders a <CountdownTimer />', () => {
        const overlay = testbed.render({ captureState: STARTING })
        expect(overlay.find('CountdownTimer').length).to.eql(1)
      })
    })

    describe('PREVIEWSAVE', () => {
      it('renders the preview badge />', () => {
        const overlay = testbed.render()
        expect(overlay.text()).to.eql('PREVIEW')
      })
    })

    describe('SAVING', () => {
      it('renders the preview badge />', () => {
        const overlay = testbed.render({ captureState: SAVING })
        expect(overlay.text()).to.eql('PREVIEW')
      })
    })

    describe('ERROR', () => {
      it('renders a <Message />', () => {
        const overlay = testbed.render({ captureState: ERROR })
        expect(overlay.find('Message').length).to.eql(1)
      })
    })

    describe('RECORDING', () => {
      it('renders a <RecordingBadge />', () => {
        const overlay = testbed.render({ captureState: RECORDING, soundMeter })
        expect(overlay.find('AudioSignal').length).to.eql(1)
        expect(overlay.find('RecordingBadge').length).to.eql(1)
      })
    })

    describe('LOADING', () => {
      it('renders a <Loading />', () => {
        const overlay = testbed.render({ captureState: LOADING })
        expect(overlay.find('Loading').length).to.eql(1)
      })
    })

    describe('READY', () => {
      it('renders a <AudioSignal />', () => {
        const overlay = testbed.render({ captureState: READY, soundMeter })
        expect(overlay.find('AudioSignal').length).to.eql(1)
      })
    })
  })
})
