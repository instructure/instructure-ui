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
import Autocomplete from '../index'

describe('<Autocomplete />', () => {
  const testbed = new Testbed(
    <Autocomplete
      label="Choose a vacation destination"
    >
      <option value="0">Aruba</option>
      <option value="1">Jamaica</option>
      <option value="2">Oh I want to take ya</option>
    </Autocomplete>
  )

  it('should focus the input when focus is called', () => {
    const subject = testbed.render()
    subject.instance().focus()
    expect(subject.find('input').focused()).to.be.true
  })

  it('should provide an focused getter', () => {
    const subject = testbed.render()
    expect(subject.instance().focused).to.be.false
    subject.instance().focus()
    expect(subject.instance().focused).to.be.true
  })

  it('should provide an invalid getter', () => {
    const subject = testbed.render({})
    expect(subject.instance().invalid).to.be.false
  })

  it('should be invalid if given error messages', () => {
    const subject = testbed.render({
      messages: [
        { text: 'Invalid name', type: 'error' }
      ]
    })
    expect(subject.instance().invalid).to.be.true
  })

  it('should provide an inputRef prop', () => {
    const inputRef = testbed.stub()
    const subject = testbed.render({ inputRef })
    expect(inputRef).to.have.been.calledWith(subject.find('input').unwrap())
  })

  it('recalculates options when children change', (done) => {
    const items = [{
      value: '3', label: 'Bermuda'
    }, {
      value: '4', label: 'Bahama'
    }, {
      value: '5', label: 'come on pretty mama'
    }]
    const subject = testbed.render({
      children: items.map((i) => <option key={i} value={i.value}>{i.label}</option>)
    })

    expect(subject.instance().state.options).to.eql(items.map(i => ({
      label: i.label, value: i.value, children: i.label, id: i.value
    })))

    subject.setProps({
      children: items.slice(1).map((i) => <option key={i} value={i.value}>{i.label}</option>)
    }, () => {
      testbed.defer(() => { // wait for re-render
        expect(subject.instance().state.options).to.eql(items.slice(1).map(i => ({
          label: i.label, value: i.value, children: i.label, id: i.value
        })))
        done()
      })
    })
  })

  it('recalculates options when children change', (done) => {
    const items = [{
      value: '0', label: 'Alabama'
    }, {
      value: '1', label: 'Alaska'
    }, {
      value: '2', label: 'American Samoa'
    }]
    const subject = testbed.render({
      children: items.map((i) => <option key={i} value={i.value}>{i.label}</option>)
    })

    expect(subject.instance().state.options).to.eql(items.map(i => ({
      label: i.label, value: i.value, children: i.label, id: i.value
    })))

    subject.setProps({
      children: items.slice(1).map((i) => <option key={i} value={i.value}>{i.label}</option>)
    }, () => {
      testbed.defer(() => { // wait for re-render
        expect(subject.instance().state.options).to.eql(items.slice(1).map(i => ({
          label: i.label, value: i.value, children: i.label, id: i.value
        })))
        done()
      })
    })
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.find('input').simulate('click') // open it so it renders the opts

      subject.should.be.accessible(done)
    })

    it('should set aria-invalid when errors prop is set', () => {
      const subject = testbed.render({
        messages: [{ type: 'error', text: 'some error message' }]
      })

      expect(subject.find('input').getAttribute('aria-invalid'))
        .to.exist
    })
  })
})
