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
import { canUseMediaCapture } from '../index'

describe('canUseMediaCapture', () => {
  let win

  beforeEach(() => {
    win = {
      navigator: {
        mediaDevices: { getUserMedia: () => {} }
      },
      MediaRecorder: () => {},
      AudioContext: () => {}
    }
  })

  it('returns true when getUserMedia, MediaRecorder and AudioContext are supported', () => {
    expect(canUseMediaCapture(win)).to.be.true
  });

  it('returns false when getUserMedia is not supported', () => {
    delete win.navigator.mediaDevices
    expect(canUseMediaCapture(win)).to.be.false
  })

  it('returns false when MediaRecorder is not supported', () => {
    delete win.MediaRecorder
    expect(canUseMediaCapture(win)).to.be.false
  })

  it('returns false when AudioContext is not supported', () => {
    delete win.AudioContext
    expect(canUseMediaCapture(win)).to.be.false
  })
})
