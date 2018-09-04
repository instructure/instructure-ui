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
import keycode from 'keycode'
import SelectField from '../index'

describe('<SelectField />', () => {
  const preventDefault = () => {}
  const testbed = new Testbed(
    (
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={[
          {
            label: 'Alabama',
            value: '0',
            id: '0',
            children: 'Alabama'
          },
          {
            label: 'Alaska',
            value: '1',
            id: '1',
            children: 'Alaska'
          },
          {
            label: 'America',
            value: '2',
            id: '2',
            children: 'America'
          }
        ]}
      />
    )
  )

  it('should include a label', () => {
    const subject = testbed.render()
    expect(subject.find('label').length).to.equal(1)
  })

  it('should not render label implicitly', () => {
    // Verify that the input is not wrapped by a label
    // element as this causes issues with a11y
    const subject = testbed.render()
    const label = subject.find('label').getDOMNode()
    const input = subject.find('input').getDOMNode()

    let labelIsAncestor = false
    let el = input.parentElement

    while (el) {
      if (el === label) {
        labelIsAncestor = true
      }

      if (el === subject.getDOMNode()) {
        break
      }

      el = el.parentElement
    }

    expect(labelIsAncestor).to.be.false
  })

  it('should provide an inputRef prop', () => {
    const inputRef = testbed.stub()
    const subject = testbed.render({ inputRef })
    expect(inputRef).to.have.been.calledWith(subject.find('input').unwrap())
  })

  it('should provide an expanded getter', () => {
    const subject = testbed.render()
    expect(subject.instance().expanded).to.be.false
  })

  it('should provide a placement getter', () => {
    const subject = testbed.render()
    expect(subject.instance().placement).to.exist
  })

  it('placement should be `bottom stretch` by default', () => {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().placement).to.equal('bottom stretch')
  })

  it('placement should be accepted as a prop', () => {
    const subject = testbed.render({
      placement: 'end top'
    })
    expect(subject.instance().props.placement).to.equal('end top')
  })

  it('expands when input is clicked', () => {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
  })

  it('expands when formfield is clicked', () => {
    const subject = testbed.render()
    subject.ref('_inputContainer').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
  })

  it('expands on keyDown ArrowDown', () => {
    const subject = testbed.render()
    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.down, preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
  })

  it('expands on keyDown ArrowUp', () => {
    const subject = testbed.render()
    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.up, preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
  })

  it('expands on change', () => {
    const subject = testbed.render({
      editable: true
    })
    subject.find('input').simulate('change', { target: { value: 'a' } })
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
  })

  it('closes when input is clicked', () => {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.false
  })

  it('closes when formfield is clicked', () => {
    const subject = testbed.render()
    subject.ref('_inputContainer').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    subject.ref('_inputContainer').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.false
  })

  it('closes on blur', () => {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    subject.find('input').focus()
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    subject.find('input').simulate('blur')
    testbed.tick()
    expect(subject.instance().expanded).to.be.false
  })

  it('closes on Escape key', () => {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    subject.find('input').simulate('keyUp', { keyCode: keycode.codes.esc, preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.false
  })

  it('returns focus to input on close', () => {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.down, preventDefault })
    testbed.tick()
    expect(subject.find('input').getDOMNode() === document.activeElement).to.be.false
    testbed.tick()
    subject.find('input').simulate('keyUp', { keyCode: keycode.codes.esc, preventDefault })
    testbed.tick()
    expect(subject.find('input').getDOMNode() === document.activeElement).to.be.true
  })

  it('changes highlights with arrows and selects with Enter', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({ onSelect })

    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    expect(subject.instance().state.highlightedIndex).to.equal(0)

    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.down, preventDefault })
    expect(subject.instance().state.highlightedIndex).to.equal(1)

    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.up, preventDefault })
    expect(subject.instance().state.highlightedIndex).to.equal(0)

    expect(onSelect).to.not.have.been.called

    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.down, preventDefault })

    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.enter, preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.false

    const value = '1'
    const label = 'Alaska'
    expect(onSelect).to.have.been.calledOnce
    expect(onSelect.firstCall.args[0].target).to.exist
    expect(onSelect.firstCall.args[1]).to.eql({ value, label, id: value, children: label })
  })

  it('changes highlights with Home & End keys', () => {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    testbed.tick()

    expect(subject.instance().expanded).to.be.true
    expect(subject.instance().state.highlightedIndex).to.equal(0)
    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.end })
    expect(subject.instance().state.highlightedIndex).to.equal(2)
    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.home })
    expect(subject.instance().state.highlightedIndex).to.equal(0)
  })

  it('highlights selectedOption when expanding', () => {
    const value = '1'
    const label = 'Alaska'
    const subject = testbed.render({
      selectedOption: { value, label, id: value, children: label }
    })

    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    expect(subject.instance().state.highlightedIndex).to.equal(1)
  })

  it('renders only emptyOption prop in menu when options are empty', () => {
    const emptyOption = 'Oops! you seem to not have any options available'
    const subject = testbed.render({
      options: [],
      emptyOption
    })
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    const menu = subject.ref('_menu')
    expect(menu.find('li').length).to.equal(1)
    expect(menu.find('li').text().trim()).to.equal(emptyOption)
  })

  it('renders only Spinner when loading is true', () => {
    const subject = testbed.render({
      options: [{ id: '1', label: 'option 1', value: '1' }, { id: '2', label: 'option 2', value: '2' }],
      loadingText: 'Loading options'
    })
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    const menu = subject.ref('_menu')
    expect(menu.find('li').length).to.equal(1)
    expect(menu.find('li').text().trim()).to.equal('Loading options')
  })

  it('does not change highlight when there are no options', () => {
    const subject = testbed.render({ options: [] })
    subject.find('input').simulate('click')
    testbed.tick()

    expect(subject.instance().expanded).to.be.true

    const highlights = []
    highlights.push(subject.instance().state.highlightedIndex)
    subject.find('input').simulate('keyDown', { key: 'End', preventDefault })
    highlights.push(subject.instance().state.highlightedIndex)
    subject.find('input').simulate('keyDown', { key: 'Home', preventDefault })
    highlights.push(subject.instance().state.highlightedIndex)
    subject.find('input').simulate('keyDown', { key: 'ArrowDown', preventDefault })
    highlights.push(subject.instance().state.highlightedIndex)
    subject.find('input').simulate('keyDown', { key: 'ArrowUp', preventDefault })
    highlights.push(subject.instance().state.highlightedIndex)

    expect(highlights.every(h => h === highlights[0])).to.be.true
  })

  it('should preventDefault onKeyDown of Enter when expanded', () => {
    const subject = testbed.render()
    subject.find('input').simulate('click', { preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.true

    const preventDefaultStub = testbed.stub()
    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.enter, preventDefault: preventDefaultStub })
    expect(preventDefaultStub).to.have.been.called
  })

  it('should not preventDefault onKeyDown of Enter when collapsed', () => {
    const subject = testbed.render()
    expect(subject.instance().expanded).to.be.false

    const preventDefaultStub = testbed.stub()
    subject.find('input').simulate('keyDown', { keyCode: keycode.codes.enter, preventDefault: preventDefaultStub })
    expect(preventDefaultStub).to.not.have.been.called
  })

  describe('events', () => {
    it('calls onPositioned event', () => {
      const onPositioned = testbed.stub()
      testbed.render({ onPositioned })
      testbed.tick()

      expect(onPositioned).to.have.been.called
    })

    it('responds to onInputChange event', () => {
      const onInputChange = testbed.stub()
      const subject = testbed.render({
        editable: true,
        onInputChange
      })

      subject.find('input').simulate('change', { target: { value: 'a' } })

      expect(onInputChange).to.have.been.called
      expect(onInputChange.firstCall.args[0].type).to.equal('change')
      expect(onInputChange.firstCall.args[1]).to.equal('a')
    })

    it('responds to onBlur event', () => {
      const onBlur = testbed.stub()

      const subject = testbed.render({ onBlur })

      subject.find('input').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', () => {
      const onFocus = testbed.stub()

      const subject = testbed.render({ onFocus })

      subject.find('input').simulate('focus')

      expect(onFocus).to.have.been.called
    })
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

    it('should meet standards when open', done => {
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

      expect(subject.find('input').getAttribute('aria-invalid')).to.exist
    })
  })
})
