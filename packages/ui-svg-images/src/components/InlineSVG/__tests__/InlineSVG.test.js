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

import InlineSVG from '../index'

describe('<InlineSVG />', () => {
  const testbed = new Testbed(<InlineSVG />)

  it('should render', () => {
    const subject = testbed.render({
      children: <path d="962" stroke="none" strokeWidth="1" fillRule="evenodd" />
    })

    expect(subject).to.be.present
  })

  it('should have role "presentation" when no title is provided', () => {
    const subject = testbed.render()

    expect(subject.getAttribute('role')).to.equal('presentation')
  })

  it('should have role "img" when a title is provided', () => {
    const subject = testbed.render({
      title: 'testIconTitle'
    })

    expect(subject.getAttribute('role')).to.equal('img')
  })

  it('should add a group with a role "presentation', () => {
    const subject = testbed.render({
      title: 'testIconTitle'
    })

    expect(subject.find('g').getAttribute('role')).to.equal('presentation')
  })

  it('should not render title when no title prop is provided', () => {
    const subject = testbed.render()

    expect(subject.find('title').length).to.equal(0)
  })

  it('should render title when title prop is provided', () => {
    const subject = testbed.render({
      title: 'testIconTitle'
    })

    expect(subject.find('title')).to.be.present
  })

  it('should not render description when no description prop is provided', () => {
    const subject = testbed.render()

    expect(subject.find('description').length).to.equal(0)
  })

  it('should render description when description prop is provided', () => {
    const subject = testbed.render({
      description: 'testIconDesc'
    })

    expect(subject.find('desc')).to.be.present
  })

  it('should produce null for "labelledBy" when no title or desc are provided', () => {
    const subject = testbed.render()

    expect(subject.unwrap().labelledBy).to.equal(null)
  })

  it('should properly join ids when both title and desc attributes are provided', () => {
    const subject = testbed.render({
      title: 'testIconTitle',
      description: 'testIconDesc'
    })
    const ids = subject.unwrap().labelledBy.split(' ')

    expect(ids.length).to.equal(2)
  })

  it('should set custom width and height properly', () => {
    const subject = testbed.render({
      width: '2.75em',
      height: '3.8em'
    })

    expect(subject.props().width).to.equal('2.75em')
    expect(subject.props().height).to.equal('3.8em')
  })

  it('should set focusable to false by default', () => {
    const subject = testbed.render()

    expect(subject.unwrap().props.focusable).to.equal(false)
  })

  it('should allow focusable to be overridden', () => {
    const subject = testbed.render({
      focusable: true
    })

    expect(subject.props().focusable).to.equal(true)
  })

  it('should allow passing in the svg src as a string', () => {
    const subject = testbed.render({
      children: null,
      src: `<svg><path d="M962" stroke="none" strokeWidth="1" fillRule="evenodd" /></svg>`
    })

    const group = subject.find('g').unwrap()

    expect(group.innerHTML).to.equal('<path d="M962" stroke="none" strokewidth="1" fillrule="evenodd"></path>')
  })

  it('should meet a11y standards', done => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */
      ]
    })
  })
})
