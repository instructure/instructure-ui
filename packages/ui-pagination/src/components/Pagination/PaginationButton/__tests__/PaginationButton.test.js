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
import Button from '@instructure/ui-buttons/lib/components/Button'

import PaginationButton from '../index'

describe('<PaginationButton />', () => {
  const testbed = new Testbed(<PaginationButton>A-G</PaginationButton>)

  it('should designate current page', () => {
    const subject = testbed.render({ current: true })
    expect(subject.find(Button).prop('variant')).to.eq('primary')
  })

  it('should navigate using button when onClick provided', () => {
    const onClick = testbed.sandbox.stub()
    const subject = testbed.render({ onClick })
    subject.find(Button).simulate('click')
    expect(onClick).to.have.been.called()
  })

  it('should disable navigation to current page', () => {
    const onClick = testbed.sandbox.stub()
    const subject = testbed.render({ onClick, current: true })
    subject.find(Button).simulate('click')
    expect(onClick).to.not.have.been.called()
  })

  it('should navigate using link when href provided', () => {
    const subject = testbed.render({ href: 'inst.biz' })
    expect(subject.find('a[href="inst.biz"]')).to.be.present()
  })

  it('should meet a11y standards with defaults', (done) => {
    const ignores = { ignores: [
      'color-contrast' // brand color doesn't meet 4.5:1 contrast req
    ] }
    const vanillaPage = testbed.render()
    vanillaPage.should.be.accessible(done, ignores)
  })

  it('should meet a11y standards with current prop', (done) => {
    const ignores = { ignores: [
      'color-contrast' // brand color doesn't meet 4.5:1 contrast req
    ] }
    const currentPage = testbed.render({ current: true })
    currentPage.should.be.accessible(done, ignores)
  })
})
