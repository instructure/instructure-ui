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

import StartOver from '../index'

describe('<StartOver />', () => {
  const testbed = new Testbed(<StartOver actions={{ startoverClicked: () => {} }} />)

  it('should render', () => {
    const StartOver = testbed.render()
    expect(StartOver).to.be.present()
  })

  it('should render an appropriate label', () => {
    const StartOver = testbed.render()
    expect(StartOver.text()).to.eql('Start Over')
  })

  it('should render an appropriate icon', () => {
    const StartOver = testbed.render()
    expect(StartOver.find('IconReset').length).to.eql(1)
  })

  it('should invoke the startOver action when clicked', () => {
    const startoverClickedSpy = testbed.spy()
    const StartOver = testbed.render({ actions: { startoverClicked: startoverClickedSpy }})
    StartOver.click()
    expect(startoverClickedSpy).to.have.been.called()
  })
})
