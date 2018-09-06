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

import {
  READY,
  RECORDING
} from '../../../../constants/CaptureStates'

import CTA from '../index'

describe('<CTA />', () => {
  const actionStubs = {
    saveClicked: () => {},
    startClicked: () => {},
    finishClicked: () => {}
  }
  const testbed = new Testbed(<CTA actions={actionStubs} captureState="" hasStarted={false} />)

  it('should render', () => {
    const CTA = testbed.render()
    expect(CTA).to.be.present()
  })

  it('should have a <Button />', () => {
    const cta = testbed.render({ captureState: READY, hasStarted: false })
    expect(cta.find('Button').length).to.eql(1)
  })

  it('should focus the <Button /> when updated', () => {
    const cta = testbed.render({ captureState: READY, hasStarted: true })
    cta.setProps({ captureState: RECORDING })

    expect(document.activeElement).to.eql(cta.find('button').node)
  })

  context('when READY state', () => {
    it('renders a start recording button', () => {
      const startClicked = testbed.stub()
      const cta = testbed.render({
        actions: { ...actionStubs, startClicked },
        captureState: READY,
        hasStarted: false
      })

      expect(cta.text()).to.eql('Start Recording')
      expect(cta.find('Button').prop('onClick')).to.eql(startClicked)
    })
  })

  context('when RECORDING state', () => {
    it('renders a finish button', () => {
      const finishClicked = testbed.stub()
      const cta = testbed.render({
        actions: { ...actionStubs, finishClicked },
        captureState: RECORDING,
        hasStarted: false
      })

      expect(cta.text()).to.eql('Finish')
      expect(cta.find('Button').prop('onClick')).to.eql(finishClicked)
    })
  })
})
