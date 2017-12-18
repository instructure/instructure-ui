import React from 'react'
import getTestMedia from 'get-test-media'
import MediaStream from '../index'
import * as getUserMedia from '../../../getUserMedia'

describe('<MediaStream />', () => {
  const testbed = new Testbed(<MediaStream />)

  it('should render', () => {
    const stream = testbed.render()
    expect(stream).to.be.present
  })

  describe('loading a stream', () => {
    it('renders a <MediaStreamMessage />', () => {
      const stream = testbed.render()
      expect(stream.find('MediaStreamMessage').length).to.equal(1)
    })
  })

  describe('accessing the clients audio and video devices', () => {
    it('calls getUserMedia', () => {
      const getUserMediaSpy = testbed.spy(getUserMedia, 'getUserMedia')
      const stream = testbed.render()
      expect(getUserMediaSpy).to.have.been.called
    })

    it('handles the success callback', () => {
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
      stream.instance().success(media.stream)
      expect(pollReadyStateSpy).to.have.been.called
      expect(stream.instance().video.srcObject).to.equal(media.stream)
    })

    it('handles the error callback', () => {
      const stream = testbed.render()
      stream.instance().error({ name: 'NotAllowedError' })
      expect(stream.instance().state.streamError).to.equal(
        'Please allow Arc to access your webcam.')
    })
  })
})
