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

import { PREVIEWSAVE, SAVING } from '../../../../constants/CaptureStates'
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
