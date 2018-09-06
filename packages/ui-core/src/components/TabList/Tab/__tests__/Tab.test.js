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
import Tab from '../index'

describe('<Tab />', () => {
  const testbed = new Testbed(
    <Tab id="foo" index={0} controls="foo-panel">Tab Label</Tab>
  )

  it('should render children', () => {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Tab Label')
  })

  it('should have appropriate role attribute', () => {
    const subject = testbed.render()

    expect(subject.getAttribute('role'))
      .to.equal('tab')
  })

  it('should have appropriate aria attributes', () => {
    const subject = testbed.render()

    expect(subject.getAttribute('aria-selected'))
      .to.not.exist()
    expect(subject.getAttribute('aria-disabled'))
      .to.not.exist()
  })

  it('should set the aria-selected attribute', () => {
    const subject = testbed.render({
      selected: true
    })

    expect(subject.getAttribute('aria-selected'))
      .to.equal('true')
  })

  it('should set the aria-disabled attribute', () => {
    const subject = testbed.render({
      disabled: true
    })

    expect(subject.getAttribute('aria-disabled'))
      .to.equal('true')
  })

  it('should set the tabindex to 0 when selected', () => {
    const subject = testbed.render({
      selected: true
    })

    expect(subject.getAttribute('tabindex'))
      .to.equal('0')
  })

  it('should set the tabindex to -1 when not selected', () => {
    const subject = testbed.render({
      selected: false
    })

    expect(subject.getAttribute('tabindex'))
      .to.equal('-1')
  })

  it('should remove the tabindex attribute when disabled', () => {
    const subject = testbed.render({
      disabled: true
    })

    expect(subject.getAttribute('tabindex'))
      .to.not.exist()
  })

  it('should call onClick when clicked', () => {
    const onClick = testbed.stub()
    const index = 2

    const subject = testbed.render({
      index,
      onClick
    })

    subject.simulate('click')

    expect(onClick).to.have.been.called()
    expect(onClick.args[0][0]).to.equal(2)
  })

  it('should NOT call onClick when clicked and tab is disabled', () => {
    const onClick = testbed.stub()

    const subject = testbed.render({
      disabled: true,
      onClick
    })

    subject.simulate('click')

    expect(onClick).to.not.have.been.called()
  })

  it('should call onKeyDown when keys are pressed', () => {
    const onKeyDown = testbed.stub()
    const index = 2

    const subject = testbed.render({
      index,
      onKeyDown
    })

    subject.keyDown('enter')

    expect(onKeyDown).to.have.been.called()
    expect(onKeyDown.args[0][0]).to.equal(2)
  })

  it('should NOT call onKeyDown when keys are pressed and tab is disabled', () => {
    const onKeyDown = testbed.stub()

    const subject = testbed.render({
      disabled: true,
      onKeyDown
    })

    subject.keyDown('enter')

    expect(onKeyDown).to.not.have.been.called()
  })

  it('should focus itself when focus is set and it is selected', () => {
    const subject = testbed.render({
      selected: true,
      focus: true
    })

    expect(subject.focused()).to.be.true()
  })

  it('should not focus itself when it is not selected', () => {
    const subject = testbed.render({
      selected: false,
      focus: true
    })

    expect(subject.focused()).to.be.false()
  })
})
