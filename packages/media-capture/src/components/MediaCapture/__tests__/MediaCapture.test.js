import React from 'react'
import MediaCapture from '../index'

describe('<MediaCapture />', () => {
  const defaultProps = {
    onCompleted: () => {},
    onCancel: () => {},
    onClose: () => {}
  }

  const testbed = new Testbed(<MediaCapture {...defaultProps} />)

  it('should render', () => {
    const mediaCapture = testbed.render()
    expect(mediaCapture).to.be.present
  })

  it('passes onClose prop to MediaCaptureProvider', () => {
    const onClose = testbed.stub()
    const mediaCapture = testbed.render({ onClose })
    expect(mediaCapture.find('MediaCaptureProvider').prop('onClose')).to.eql(onClose)
  })
})
