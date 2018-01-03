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

  describe('#close', () => {
    it('sets the shown state to false', () => {
      const mediaCapture = testbed.render()
      mediaCapture.instance().close()
      expect(mediaCapture.state('shown')).to.be.false
    })

    it('invokes the onClose prop', () => {
      const onCloseSpy = testbed.spy()
      const mediaCapture = testbed.render({ onClose: onCloseSpy })
      mediaCapture.instance().close()
      expect(onCloseSpy).to.have.been.called
    })
  })
})
