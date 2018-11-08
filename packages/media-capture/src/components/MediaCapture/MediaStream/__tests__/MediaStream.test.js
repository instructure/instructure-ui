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
import getTestMedia from 'get-test-media'

import MediaStream from '../index'
import * as MediaDevices from '../../../../core/mediaDevices'
import { LOADING, RECORDING, READY } from '../../../../constants/CaptureStates'
import * as startMediaRecorder from '../../../../core/mediaRecorder'

describe('<MediaStream />', () => {
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

  const props = {
    captureState: LOADING,
    videoDeviceId: '',
    audioDeviceId: '',
    requestAudioOnly: false,
    actions: {
      deviceRequestAccepted: () => {},
      soundMeterInitialized: () => {},
      mediaRecorderInitialized: () => {},
      videoObjectGenerated: () => {},
      errorOccurred: () => {},
      cleanUp: () => {}
    }
  }
  const testbed = new Testbed(<MediaStream {...props} />)

  it('should render', () => {
    const stream = testbed.render()
    expect(stream).to.be.present()
  })

  describe('accessing the clients audio and video devices', () => {
    it('calls getUserMedia when requestAudioOnly is false', () => {
      const getUserMediaSpy = testbed.spy(MediaDevices, 'getUserMedia')
      testbed.render()
      expect(getUserMediaSpy).to.have.been.called()
    })

    it('calls getUserAudioOnly when requestAudioOnly is true', () => {
      const getUserMediaSpy = testbed.spy(MediaDevices, 'getUserAudioOnly')
      testbed.render({requestAudioOnly: true})
      expect(getUserMediaSpy).to.have.been.called()
    })

    it('handles the streamSuccess callback', () => {
      const deviceRequestAcceptedStub = testbed.stub()
      const media = getMedia()

      const stream = testbed.render(
        {
          actions: {
            soundMeterInitialized: () => {},
            deviceRequestAccepted: deviceRequestAcceptedStub
          }
        }
      )

      stream.instance().streamSuccess(media.stream)
      expect(stream.instance().video.srcObject).to.equal(media.stream)
      stream.instance().streamLoaded()
      expect(deviceRequestAcceptedStub).to.have.been.called()
    })

    it('handles the error callback', () => {
      const errorSpy = testbed.spy()
      const stream = testbed.render({ actions: { errorOccurred: errorSpy }})
      stream.instance().error({ name: 'NotAllowedError' })
      expect(errorSpy).to.have.been.called()
    })

    describe('changing devices', () => {
      it('calls getUserMedia when a new device is to be used and requestAudioOnly is false', () => {
        const getUserMediaSpy = testbed.spy(MediaDevices, 'getUserMedia')
        const media = getMedia()
        const stream = testbed.render({ captureState: READY })
        stream.instance().streamSuccess(media.stream)
        stream.setProps({ audioDeviceId: '12345' })
        expect(getUserMediaSpy).to.have.been.called()
      })
      it('calls getUserAudioOnly when a new device is to be used and requestAudioOnly is true', () => {
        const getUserMediaSpy = testbed.spy(MediaDevices, 'getUserAudioOnly')
        const media = getMedia()
        const stream = testbed.render({ captureState: READY, requestAudioOnly: true })
        stream.instance().streamSuccess(media.stream)
        stream.setProps({ audioDeviceId: '12345' })
        expect(getUserMediaSpy).to.have.been.called()
      })
    })
  })

  describe('recording the stream', () => {
    it('calls startMediaRecorder', () => {
      const startMediaRecorderSpy = testbed.spy(startMediaRecorder, 'startMediaRecorder')
      const media = getMedia()

      const stream = testbed.render()
      stream.instance().streamSuccess(media.stream)
      stream.setProps({ captureState: RECORDING })

      expect(startMediaRecorderSpy).to.have.been.called()
    })

    it('handles the blobSuccess callback', () => {
      const videoObjectGeneratedSpy = testbed.spy()
      const stream = testbed.render({ actions: { videoObjectGenerated: videoObjectGeneratedSpy }})
      stream.instance().blobSuccess(new File(['hello'], 'hello.txt'))

      expect(videoObjectGeneratedSpy).to.have.been.called()
    })
  })

  describe('unmounting', () => {
    context('when a stream has been established', () => {
      it('stops all tracks', () => {
        const stream = getMedia().stream
        const stopStub = testbed.stub()
        const tracks = [
          { stop: stopStub },
          { stop: stopStub }
        ]
        testbed.stub(stream, 'getTracks', () => tracks)

        const media = testbed.render({ actions: { soundMeterInitialized: () => {}, cleanUp: () => {} }})
        media.instance().streamSuccess(stream)
        media.unmount()
        expect(stopStub.callCount).to.eql(2)
      })
    })

    context('when a stream is not present', () => {
      it('does nothing', () => {
        expect(() => testbed.render()).to.not.throw()
      })
    })
  })
})
