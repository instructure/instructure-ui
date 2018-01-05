import React from 'react'
import Media from '../index'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  FINISHED
} from '../../../constants/CaptureStates'

describe('<Media />', () => {
  const testbed = new Testbed(<Media captureState={READY} actions={{}} videoSrc="" />)

  it('should render', () => {
    const media = testbed.render()
    expect(media).to.be.present
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

    it('should not render a MediaPlayback with the FINISHED captureState', () => {
      const media = testbed.render({
        captureState: FINISHED
      })

      expect(media.find('MediaPlayback').length).to.equal(0)
    })
  })
})
