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
import Expandable from '../index.js'

describe('<Expandable />', () => {
  const testbed = new Testbed(
    <Expandable />
  )

  let render
  let renderSpy

  beforeEach(() => {
    renderSpy = testbed.spy()
    render = (args) => { // eslint-disable-line react/display-name
      renderSpy(args)
      return <div>hello</div>
    }
  })

  afterEach(() => {
    render = null
    renderSpy = null
  })

  it('should set expanded to false by default', () => {
    testbed.render({render})
    const args = renderSpy.lastCall.args[0]
    expect(args.expanded).to.be.false
  })

  it('should correctly provide the aria-expanded attribute', () => {
    testbed.render({
      render
    })
    const args = renderSpy.lastCall.args[0]
    const ariaExpanded = args.getToggleProps()['aria-expanded']
    expect(ariaExpanded).to.be.false
  })

  it('should provide the toggle and details with a shared, unique id', () => {
    const subject = testbed.render({ render })

    const args = renderSpy.lastCall.args[0]
    const toggleId = args.getToggleProps()['aria-controls']
    const detailsId = args.getDetailsProps()['id']
    expect(toggleId).to.equal(subject.instance()._contentId)
    expect(detailsId).to.equal(subject.instance()._contentId)
    expect(toggleId === detailsId).to.be.true
  })

  it('should call onToggle when onClick is called', () => {
    const onToggle = testbed.spy()

    testbed.render({
      expanded: false,
      onToggle,
      render
    })
    const args = renderSpy.lastCall.args[0]
    const onClick = args.getToggleProps().onClick
    onClick(new Event('click'))

    expect(onToggle.firstCall.args[0].type).to.equal('click')
    expect(onToggle.firstCall.args[1]).to.eql(true)
  })

  it('should set expanded to true when defaultExpanded is true', () => {
    testbed.render({
      defaultExpanded: true,
      render
    })
    const args = renderSpy.lastCall.args[0]
    expect(args.expanded).to.be.true
  })
})
