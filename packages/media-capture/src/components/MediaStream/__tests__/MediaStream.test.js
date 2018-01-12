import React from 'react'
import getTestMedia from 'get-test-media'

import MediaStream from '../index'
import * as mediaDevices from '../../../mediaDevices'
import { LOADING, RECORDING } from '../../../constants/CaptureStates'
import * as startMediaRecorder from '../../../mediaRecorder'

describe('<MediaStream />', () => {
  const props = {
    captureState: LOADING,
    videoDeviceId: '',
    audioDeviceId: '',
    actions: {
      deviceRequestAccepted: () => {},
      mediaRecorderInitialized: () => {},
      videoObjectGenerated: () => {},
      errorOccurred: () => {}
    }
  }
  const testbed = new Testbed(<MediaStream {...props} />)

  it('should render', () => {
    const stream = testbed.render()
    expect(stream).to.be.present
  })

  describe('accessing the clients audio and video devices', () => {
    it('calls getUserMedia', () => {
      const getUserMediaSpy = testbed.spy(mediaDevices, 'getUserMedia')
      const stream = testbed.render()
      expect(getUserMediaSpy).to.have.been.called
    })

    it('handles the streamSuccess callback', () => {
      const pollReadyStateSpy = testbed.spy(MediaStream.prototype, 'pollReadyState')
      const media = getTestMedia({
        audio: true,
        video: {
          width: 400,
          height: 300,
          frameRate: 24
        }
      })

      const stream = testbed.render()
      stream.instance().streamSuccess(media.stream)
      expect(pollReadyStateSpy).to.have.been.called
      expect(stream.instance().video.srcObject).to.equal(media.stream)
    })

    it('handles the error callback', () => {
      const errorSpy = testbed.spy()
      const stream = testbed.render({ actions: { errorOccurred: errorSpy }})
      stream.instance().error({ name: 'NotAllowedError' })
      expect(errorSpy).to.have.been.called
    })
  })

  describe('recording the stream', () => {
    it('calls startMediaRecorder', () => {
      const startMediaRecorderSpy = testbed.spy(startMediaRecorder, 'startMediaRecorder')
      const media = getTestMedia({
        audio: true,
        video: {
          width: 400,
          height: 300,
          frameRate: 24
        }
      })
      const stream = testbed.render()
      stream.instance().streamSuccess(media.stream)
      stream.setProps({ captureState: RECORDING })

      expect(startMediaRecorderSpy).to.have.been.called
    })

    it('handles the blobSuccess callback', () => {
      const videoObjectGeneratedSpy = testbed.spy()
      const stream = testbed.render({actions: { videoObjectGenerated: videoObjectGeneratedSpy }})
      stream.instance().blobSuccess(new File(['hello'], 'hello.txt'))

      expect(videoObjectGeneratedSpy).to.have.been.called
    })
  })

  describe('unmounting', () => {
    context('when a stream has been established', () => {
      it('stops all tracks', () => {
        const stream = getTestMedia({
          audio: true,
          video: {
            width: 400,
            height: 300,
            frameRate: 24
          }
        }).stream
        const stopStub = testbed.stub()
        const tracks = [
          { stop: stopStub },
          { stop: stopStub }
        ]
        testbed.stub(stream, 'getTracks', () => tracks)

        const media = testbed.render()
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
