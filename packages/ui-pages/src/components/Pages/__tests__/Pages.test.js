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
import Pages, { Page } from '../index'
import Button from '@instructure/ui-elements/lib/components/Button'

describe('<Pages />', () => {
  const testbed = new Testbed(
    <Pages>
      <Page>{() => 'Foo'}</Page>
      <Page>{() => 'Bar'}</Page>
    </Pages>
  )

  it('should render', () => {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('should render a Page', () => {
    const subject = testbed.render({
      children: <Page>{() => 'Hello World'}</Page>
    })

    expect(subject.text()).to.equal('Hello World')
  })

  it('should render the 0th Page by default', () => {
    const subject = testbed.render()

    expect(subject.text()).to.equal('Foo')
  })

  it('should render the active Page', () => {
    const subject = testbed.render({
      activePageIndex: 1
    })

    expect(subject.text()).to.equal('Bar')
  })

  it('should pass history and navigateToPreviousPage to Page', () => {
    const pageSpy = testbed.spy()
    testbed.render({
      children: <Page>{pageSpy}</Page>
    })

    expect(pageSpy.calledOnce).to.equal(true)
    expect(Array.isArray(pageSpy.args[0][0])).to.equal(true)
    expect(typeof pageSpy.args[0][1]).to.equal('function')
  })

  it('should fire onPageIndexChange event', () => {
    const onPageIndexChange = testbed.spy()
    const subject = testbed.render({
      activePageIndex: 0,
      onPageIndexChange,
      children: [
        <Page key={0}>{() => 'Foo'}</Page>,
        <Page key={1}>{(history, navigate) => <Button onClick={navigate}>Back</Button>}</Page>
      ]
    })

    subject.setProps({ activePageIndex: 1 })

    subject.find(Button).simulate('click')

    expect(onPageIndexChange.calledOnce).to.equal(true)
    expect(onPageIndexChange.calledWith(0, 1)).to.equal(true)
  })
})
