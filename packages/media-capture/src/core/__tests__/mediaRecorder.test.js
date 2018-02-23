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
import getTestMedia from 'get-test-media'
import MediaFile, { startMediaRecorder } from '../mediaRecorder'

describe('MediaRecorder', () => {
  window.audioContext = new AudioContext()

  const getMedia = () => {
    return getTestMedia({
      audio: true,
      audioContext: window.audioContext,
      video: {
        width: 400,
        height: 300,
        frameRate: 24
      }
    })
  }

  it('invokes the initialization callback', () => {
    const onInitSpy = sinon.stub()

    startMediaRecorder(getMedia().stream, onInitSpy)
    expect(onInitSpy).to.have.been.called
  })

  describe.skip('MediaFile', () => {
    const successStub = sinon.stub()
    const errorStub = sinon.stub()
    const mediaFile  = new MediaFile(getMedia().stream, 'video/webm', successStub, errorStub)

    it('collects chunks of data in an array', () => {
      mediaFile.addToChunks({ data: '1' })
      mediaFile.addToChunks({ data: '2' })
      mediaFile.addToChunks({ data: '3' })

      expect(mediaFile.chunks.length).to.eql(3)
      expect(mediaFile.chunks[1]).to.eql('2')
    })

    it('invokes the success callback when stopped', () => {
      mediaFile.onStop()
      expect(successStub).to.have.been.called
    })

    it('invokes the error callback with an error', () => {
      mediaFile.onError('this is an error')
      expect(errorStub).to.have.been.calledWith('this is an error')
    })
  })
})