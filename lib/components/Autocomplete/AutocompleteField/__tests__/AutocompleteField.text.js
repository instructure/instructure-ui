import React from 'react'
import { findDOMNode } from 'react-dom'
import AutocompleteField from '../index'

describe('<AutocompleteField />', function () {
  const preventDefault = () => {}
  const testbed = new Testbed(
    <AutocompleteField
      label="Choose a state"
    >
      <option value="0">Alabama</option>
      <option value="1">Alaska</option>
      <option value="2">American Samoa</option>
    </AutocompleteField>
  )

  it('should include a label', function () {
    const subject = testbed.render()
    expect(subject.find('label').length).to.equal(1)
  })

  it('should provide an inputRef prop', function () {
    const inputRef = testbed.stub()
    const subject = testbed.render({ inputRef })
    expect(inputRef).to.have.been.calledWith(subject.find('input').unwrap())
  })

  it('should provide an expanded getter', function () {
    const subject = testbed.render()
    expect(subject.instance().expanded).to.be.false
  })

  it('should provide a placement getter', function () {
    const subject = testbed.render()
    expect(subject.instance().placement).to.exist
  })

  it('placement should be bottom start by default', function () {
    const subject = testbed.render()
    expect(subject.instance().placement).to.equal('bottom start')
  })

  it('placement should be bottom end by default when layout is inline', function () {
    const subject = testbed.render({ layout: 'inline' })
    expect(subject.instance().placement).to.equal('bottom end')
  })

  it('placement should be accepted as a prop', function () {
    const subject = testbed.render({
      placement: 'end top'
    })
    expect(subject.instance().placement).to.equal('end top')
  })

  it('expands on click', function () {
    const subject = testbed.render()
    testbed.tick()
    subject.find('input').simulate('click')
    expect(subject.instance().expanded).to.be.true
  })

  it('expands on keyDown ArrowDown', function () {
    const subject = testbed.render()
    testbed.tick()
    subject.find('input').simulate('keyDown', { key: 'ArrowDown', preventDefault })
    expect(subject.instance().expanded).to.be.true
  })

  it('expands on keyDown ArrowUp', function () {
    const subject = testbed.render()
    testbed.tick()
    subject.find('input').simulate('keyDown', { key: 'ArrowUp', preventDefault })
    expect(subject.instance().expanded).to.be.true
  })

  it('expands on change', function () {
    const subject = testbed.render()
    testbed.tick()
    subject.instance()._input.value = 'A'
    subject.find('input').simulate('change')
    expect(subject.instance().expanded).to.be.true
  })

  it('closes on blur', function () {
    const subject = testbed.render()
    testbed.tick()
    subject.find('input').simulate('click')
    subject.find('input').focus()
    expect(subject.instance().expanded).to.be.true
    subject.find('input').simulate('blur')
    testbed.tick()
    expect(subject.instance().expanded).to.be.false
  })

  it('closes on Escape key', function () {
    const subject = testbed.render()
    testbed.tick()
    subject.find('input').simulate('click')
    expect(subject.instance().expanded).to.be.true
    subject.find('input').simulate('keyDown', { key: 'Escape', preventDefault })
    expect(subject.instance().expanded).to.be.false
  })

  it('changes highlights with arrows and selects with Enter', function () {
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })
    testbed.tick()
    subject.find('input').simulate('click')
    expect(subject.instance().expanded).to.be.true
    expect(subject.instance().state.highlightedIndex).to.equal(0)
    subject.find('input').simulate('keyDown', { key: 'ArrowDown', preventDefault })
    expect(subject.instance().state.highlightedIndex).to.equal(1)
    subject.find('input').simulate('keyDown', { key: 'ArrowUp', preventDefault })
    expect(subject.instance().state.highlightedIndex).to.equal(0)

    expect(onChange).to.not.have.been.called

    subject.find('input').simulate('keyDown', { key: 'Enter', preventDefault })
    expect(subject.instance().expanded).to.be.false

    const value = '0'
    const label = 'Alabama'
    expect(onChange.firstCall.args[0].target).to.exist
    expect(onChange.firstCall.args[1]).to.eql({ value, label, id: value, children: label })
  })

  it('changes highlights with Home & End keys', function () {
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })
    testbed.tick()
    subject.find('input').simulate('click')
    expect(subject.instance().expanded).to.be.true
    expect(subject.instance().state.highlightedIndex).to.equal(0)
    subject.find('input').simulate('keyDown', { key: 'End', preventDefault })
    expect(subject.instance().state.highlightedIndex).to.equal(2)
    subject.find('input').simulate('keyDown', { key: 'Home', preventDefault })
    expect(subject.instance().state.highlightedIndex).to.equal(0)
  })

  it('highlights selectedOption when expanding', function () {
    const value = '1'
    const label = 'Alaska'
    const subject = testbed.render({
      selectedOption: { value, label, id: value, children: label }
    })
    testbed.tick()
    subject.find('input').simulate('click')
    expect(subject.instance().expanded).to.be.true
    testbed.tick()
    expect(subject.instance().state.highlightedIndex).to.equal(1)
  })

  it('renders only emptyOption prop in menu when options are empty', function () {
    const emptyOption = 'Oops! you seem to not have any options available'
    const subject = testbed.render({
      children: [],
      emptyOption
    })
    testbed.tick()
    subject.find('input').simulate('click')
    expect(subject.instance().expanded).to.be.true
    const content = findDOMNode(subject.instance()._content)
    expect(content.querySelectorAll('li').length).to.equal(1)
    expect(content.querySelector('li').textContent).to.equal(emptyOption)
  })

  it('renders only loadingOption when given and loading is true', function () {
    const loadingOption = 'WARNING! LOADING TAKING PLACE!'
    const subject = testbed.render({
      loadingOption,
      loading: true
    })
    testbed.tick()
    subject.find('input').simulate('click')
    expect(subject.instance().expanded).to.be.true
    const content = findDOMNode(subject.instance()._content)
    expect(content.querySelectorAll('li').length).to.equal(1)
    expect(content.querySelector('li').textContent).to.equal(loadingOption)
  })

  it('does not change highlight when there are no options', function () {
    const subject = testbed.render({ children: [] })
    testbed.tick()
    subject.find('input').simulate('click')
    expect(subject.instance().expanded).to.be.true
    testbed.tick()
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

    expect(highlights.every((h) => h === highlights[0])).to.be.true
  })

  it('changes input value when selectedOption is set as a prop', function (done) {
    const label = 'Alabama'
    const value = '0'
    const subject = testbed.render()

    expect(subject.instance()._input.value).to.equal('')

    subject.setProps({
      selectedOption: { label, value, children: label, id: value }
    }, () => {
      testbed.defer(() => { // wait for re-render
        expect(subject.instance()._input.value).to.equal(label)
        done()
      })
    })
  })

  it('changes input value when selectedOption is changed as a prop', function (done) {
    let label = 'Alabama'
    let value = '0'
    const subject = testbed.render({
      selectedOption: { label, value, children: label, id: value }
    })

    expect(subject.instance()._input.value).to.equal(label)

    label = 'Alaska'
    value = '1'
    subject.setProps({
      selectedOption: { label, value, children: label, id: value }
    }, () => {
      testbed.defer(() => { // wait for re-render
        expect(subject.instance()._input.value).to.equal(label)
        done()
      })
    })
  })

  it('should preventDefault onKeyDown of Enter when expanded', function (done) {
    const preventDefaultStub = testbed.stub()
    const subject = testbed.render()
    testbed.tick()
    subject.find('input').simulate('click', { preventDefault })
    expect(subject.instance().expanded).to.be.true
    subject.find('input').simulate('keyDown', { key: 'Enter', preventDefault: preventDefaultStub })

    expect(preventDefault).to.have.been.called
  })

  it('should not preventDefault onKeyDown of Enter when collapsed', function (done) {
    const preventDefaultStub = testbed.stub()
    const subject = testbed.render()
    testbed.tick()
    expect(subject.instance().expanded).to.be.false
    subject.find('input').simulate('keyDown', { key: 'Enter', preventDefault: preventDefaultStub })

    expect(preventDefault).to.not.have.been.called
  })

  describe('events', function () {
    it('calls onReady event', function () {
      const onReady = testbed.stub()
      testbed.render({ onReady })
      testbed.tick()

      expect(onReady).to.have.been.called
    })

    it('responds to onChange event', function () {
      const onChange = testbed.stub()
      const subject = testbed.render({ onChange })
      testbed.tick()

      subject.find('input').simulate('click')
      subject.find('input').simulate('keyDown', { key: 'Enter', preventDefault })

      expect(onChange).to.have.been.called
    })

    it('responds to onBlur event', function () {
      const onBlur = testbed.stub()

      const subject = testbed.render({ onBlur })

      subject.find('input').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', function () {
      const onFocus = testbed.stub()

      const subject = testbed.render({ onFocus })

      subject.find('input').simulate('focus')

      expect(onFocus).to.have.been.called
    })
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      // ignored required children because of this bug https://github.com/dequelabs/axe-core/issues/160
      subject.should.be.accessible(done, {
        ignores: ['aria-required-children']
      })
    })

    it('should set aria-invalid when errors prop is set', function () {
      const subject = testbed.render({
        messages: [{ type: 'error', text: 'some error message' }]
      })

      expect(subject.find('input').getAttribute('aria-invalid'))
        .to.exist
    })
  })
})
