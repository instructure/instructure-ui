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
import Select from '../index'

describe('<Select />', () => {
  const testbed = new Testbed(
    <Select
      label="Choose a vacation destination"
    >
      <option value="0">Aruba</option>
      <option value="1">Jamaica</option>
      <option value="2">Oh I want to take ya</option>
    </Select>
  )

  it('should focus the input when focus is called', () => {
    const subject = testbed.render()
    subject.instance().focus()
    expect(subject.find('input').focused()).to.be.true()
  })

  it('should provide an focused getter', () => {
    const subject = testbed.render()
    expect(subject.instance().focused).to.be.false()
    subject.instance().focus()
    expect(subject.instance().focused).to.be.true()
  })

  it('should provide an invalid getter', () => {
    const subject = testbed.render({})
    expect(subject.instance().invalid).to.be.false()
  })

  it('should be invalid if given error messages', () => {
    const subject = testbed.render({
      messages: [
        { text: 'Invalid name', type: 'error' }
      ]
    })
    expect(subject.instance().invalid).to.be.true()
  })

  it('should provide an inputRef prop', () => {
    const inputRef = testbed.stub()
    const subject = testbed.render({ inputRef })
    expect(inputRef).to.have.been.calledWith(subject.find('input').unwrap())
  })

  it('recalculates options when children change', (done) => {
    const items = [{
      value: '3', label: 'Bermuda', icon: null, disabled: null, groupLabel: null, groupItem: null
    }, {
      value: '4', label: 'Bahama', icon: null, disabled: null, groupLabel: null, groupItem: null
    }, {
      value: '5', label: 'come on pretty mama', icon: null, disabled: null, groupLabel: null, groupItem: null
    }]
    const subject = testbed.render({
      editable: true,
      children: items.map((i) => <option key={i} value={i.value}>{i.label}</option>)
    })

    expect(subject.instance().state.options).to.eql(items.map(i => ({
      label: i.label,
      value: i.value,
      children: i.label,
      id: i.value,
      icon: i.icon,
      disabled: i.disabled,
      groupLabel: i.groupLabel,
      groupItem: i.groupItem
    })))

    subject.setProps({
      children: items.slice(1).map((i) => <option key={i} value={i.value}>{i.label}</option>)
    }, () => {
      testbed.defer(() => { // wait for re-render
        expect(subject.instance().state.options).to.eql(items.slice(1).map(i => ({
          label: i.label,
          value: i.value,
          children: i.label,
          id: i.value,
          icon: i.icon,
          disabled: i.disabled,
          groupLabel: i.groupLabel,
          groupItem: i.groupItem
        })))
        done()
      })
    })
  })

  it('should allow optgroup tags as children', () => {
    let error = false
    try {
      testbed.render({
        children: [
          <optgroup key="one" label="Group One">
            <option value="item1">Item One</option>
            <option value="item2">Item Two</option>
          </optgroup>
        ]
      })
    } catch (e) {
      error = true
    }
    expect(error).to.be.false()
  })

  it('should reject children that are not option or optgroup tags', () => {
    let error = false
    try {
      testbed.render({
        children: [
          <span key="invalid">Invalid!!!</span>
        ]
      })
    } catch (e) {
      error = true
    }
    expect(error).to.be.true()
  })

  describe('for a11y', () => {
    it('should meet standards when closed', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done, {
        ignores: [
          'aria-allowed-role' // TODO: remove this when we fix it
        ]
      })
    })

    it('should meet standards when open', (done) => {
      const subject = testbed.render()

      subject.find('input').simulate('click') // open it so it renders the opts

      subject.should.be.accessible(done, {
        ignores: [
          'aria-allowed-role' // TODO: remove this when we fix it
        ]
      })
    })

    it('should set aria-invalid when errors prop is set', () => {
      const subject = testbed.render({
        messages: [{ type: 'error', text: 'some error message' }]
      })

      expect(subject.find('input').getAttribute('aria-invalid'))
        .to.exist()
    })
  })
})
