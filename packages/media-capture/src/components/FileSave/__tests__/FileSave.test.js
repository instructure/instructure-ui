import React from 'react'

import { PREVIEWSAVE, SAVING } from '../../../constants/CaptureStates'
import Component from '../index'

describe('<FileSave />', () => {
  const props = {
    captureState: PREVIEWSAVE,
    fileName: '',
    actions: {
      saveClicked: () => {}
    }
  }

  const testbed = new Testbed(<Component {...props} />)

  it('should render', () => {
    const FileSave = testbed.render()
    expect(FileSave).to.be.present
  })

  it('should render a <TextInput />', () => {
    const FileSave = testbed.render()
    expect(FileSave.find('TextInput').length).to.eql(1)
  })

  it('should render a <Button />', () => {
    const FileSave = testbed.render()
    expect(FileSave.find('Button').length).to.eql(1)
  })

  context('submission', () => {
    it('invokes the saveClicked action', () => {
      const saveClickedSpy = testbed.spy()
      const FileSave = testbed.render({ actions: { saveClicked: saveClickedSpy } })
      FileSave.find('Button').simulate('click')
      expect(saveClickedSpy).to.have.been.called
    })
  })

  context('when SAVING', () => {
    it('renders a disabled save button', () => {
      const FileSave = testbed.render({ captureState: SAVING })

      expect(FileSave.find('Button').text()).to.eql('Save')
      expect(FileSave.find('Button').prop('disabled')).to.eql(true)
    })
  })
})
