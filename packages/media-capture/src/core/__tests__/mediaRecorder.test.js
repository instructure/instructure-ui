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
import { tools } from 'ts-ebml'
import MediaFile, { startMediaRecorder } from '../mediaRecorder'

describe('MediaRecorder', () => {
  const testbed = new Testbed()
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
    const onInitSpy = testbed.stub()

    startMediaRecorder(getMedia().stream, onInitSpy)
    expect(onInitSpy).to.have.been.called()
  })

  describe('MediaFile', () => {
    const successStub = testbed.stub()
    const errorStub = testbed.stub()
    const mediaFile  = new MediaFile(getMedia().stream, 'video/webm', successStub, errorStub)

    describe('#readAsArrayBuffer', (done) => {
      const frReadAsArrayBufferSpy = testbed.spy(FileReader.prototype, 'readAsArrayBuffer')
      it("uses FileReader's readAsArrayBuffer to make the blob consumable by ebml", () => {
        mediaFile.readAsArrayBuffer('12345').then(() => {
          expect(frReadAsArrayBufferSpy.calledWith('12345')).to.be.true()
          done()
        })
      })
    })

    const ebmlDecoderStub = testbed.stub(mediaFile.decoder, 'decode')
    ebmlDecoderStub.returns(['elm1', 'elm2', 'elm3'])

    const ebmlReaderStub = testbed.stub(mediaFile.reader, 'read')

    const makeMetadataSeekableStub = testbed.stub(tools, 'makeMetadataSeekable')
    makeMetadataSeekableStub.returns('seekableMetadatas')

    const readAsArrayBufferStub = testbed.stub(mediaFile, 'readAsArrayBuffer')
    readAsArrayBufferStub.returns(Promise.resolve([0, 1, 2, 3, 4]))

    it('decodes and reads the chunks emitted by the mediaRecorder', (done) => {
      Promise.all([
        mediaFile.addToChunks({ data: { type: mediaFile.fileType }}),
        mediaFile.addToChunks({ data: { type: mediaFile.fileType }}),
        mediaFile.addToChunks({ data: { type: mediaFile.fileType }})
      ])
      .then(() => {
        expect(ebmlDecoderStub.callCount).to.eql(3)
        expect(ebmlReaderStub.callCount).to.eql(9)
      })
      .finally(done)
    })

    it('invokes the success callback when stopped', (done) => {
      mediaFile.onStop().then(() => {
        expect(successStub).to.have.been.called()
      })
      .finally(done)
    })

    it('invokes the error callback with an error', () => {
      mediaFile.onError('this is an error')
      expect(errorStub).to.have.been.calledWith('this is an error')
    })
  })
})
