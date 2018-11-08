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
import CapturedMedia from '../index'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  FINISHED
} from '../../../../constants/CaptureStates'

describe('<CapturedMedia />', () => {
  const testbed = new Testbed(<CapturedMedia captureState={READY} actions={{}} videoSrc="" videoDeviceId="" audioDeviceId="" requestAudioOnly={false} />)

  it('should render', () => {
    const media = testbed.render()
    expect(media).to.be.present()
  })

  describe("#MediaStreamGuard", () => {
    it('should render a MediaStream with the READY captureState', () => {
      const media = testbed.render({
        captureState: READY
      })
      expect(media.find('MediaStream').length).to.equal(1)
    })

    it('should render a MediaStream with the RECORDING captureState', () => {
      const media = testbed.render({
        captureState: RECORDING
      })

      expect(media.find('MediaStream').length).to.equal(1)
    })

    it('should not render a MediaStream with the FINISHED captureState', () => {
      const media = testbed.render({
        captureState: FINISHED
      })

      expect(media.find('MediaStream').length).to.equal(0)
    })
  })

  describe("#MediaPlaybackGuard", () => {
    it('should render a MediaPlayback with the PREVIEWSAVE captureState', () => {
      const media = testbed.render({
        captureState: PREVIEWSAVE
      })
      expect(media.find('MediaPlayback').length).to.equal(1)
    })

    it('should render a MediaPlayback with the FINISHED captureState', () => {
      const media = testbed.render({
        captureState: FINISHED
      })

      expect(media.find('MediaPlayback').length).to.equal(1)
    })
  })
})
