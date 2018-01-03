import React from 'react'

import { _component as MediaCaptureClose } from '../index'
import { READY } from '../../../constants/CaptureStates'
import * as CaptureActions from '../../../actions'

describe('<MediaCaptureClose />', () => {
  const defaultProps = {
    captureState: READY,
    onClick: () => {},
    actions: {
      closeClicked: () => {}
    }
  }
  const testbed = new Testbed(<MediaCaptureClose {...defaultProps} />)

  it('should render', () => {
    const close = testbed.render()
    expect(close).to.be.present
  })

  it('should render a <CloseButton />', () => {
    const close = testbed.render()
    expect(close.find('CloseButton').length).to.eql(1)
  })

  describe('clicking', () => {
    const onClickSpy = testbed.spy()
    const closeClickedSpy = testbed.spy(CaptureActions, 'closeClicked')

    it('should invoke the closeClicked action', () => {
      const close = testbed.render({ actions: { closeClicked: closeClickedSpy }})
      close.find('button').first().simulate('click')
      expect(closeClickedSpy).to.have.been.called
    })

    it('should invoke the onClick prop', () => {
      const close = testbed.render({ onClick: onClickSpy })
      close.find('button').first().simulate('click')
      expect(onClickSpy).to.have.been.called
    })
  })
})
