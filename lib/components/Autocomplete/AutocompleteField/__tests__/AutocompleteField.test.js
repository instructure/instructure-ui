import React from 'react'
import AutocompleteField from '../index'

describe('<AutocompleteField />', function () {
  const preventDefault = () => {}
  const testbed = new Testbed(
    <AutocompleteField
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
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().placement).to.equal('bottom start')
  })

  it('placement should be bottom end by default when layout is inline', function () {
    const subject = testbed.render({ layout: 'inline' })
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().placement).to.equal('bottom end')
  })

  it('placement should be accepted as a prop', function () {
    const subject = testbed.render({
      placement: 'end top'
    })
    expect(subject.instance().props.placement).to.equal('end top')
  })

  it('expands on click', function () {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
  })

  it('expands on keyDown ArrowDown', function () {
    const subject = testbed.render()
    subject.find('input').simulate('keyDown', { key: 'ArrowDown', preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
  })

  it('expands on keyDown ArrowUp', function () {
    const subject = testbed.render()
    subject.find('input').simulate('keyDown', { key: 'ArrowUp', preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
  })

  it('expands on change', function () {
    const subject = testbed.render()
    subject.find('input').simulate('change', { target: { value: 'a' } })
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
  })

  it('closes on blur', function () {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    subject.find('input').focus()
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    subject.find('input').simulate('blur')
    testbed.tick()
    expect(subject.instance().expanded).to.be.false
  })

  it('closes on Escape key', function () {
    const subject = testbed.render()
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    subject.find('input').simulate('keyDown', { key: 'Escape', preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.false
  })

  it('changes highlights with arrows and selects with Enter', function () {
    const onSelect = testbed.stub()
    const subject = testbed.render({ onSelect })

    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    expect(subject.instance().state.highlightedIndex).to.equal(0)

    subject.find('input').simulate('keyDown', { key: 'ArrowDown', preventDefault })
    expect(subject.instance().state.highlightedIndex).to.equal(1)

    subject.find('input').simulate('keyDown', { key: 'ArrowUp', preventDefault })
    expect(subject.instance().state.highlightedIndex).to.equal(0)

    expect(onSelect).to.not.have.been.called

    subject.find('input').simulate('keyDown', { key: 'Enter', preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.false

    const value = '0'
    const label = 'Alabama'
    expect(onSelect.firstCall.args[0].target).to.exist
    expect(onSelect.firstCall.args[1]).to.eql({ value, label, id: value, children: label })
  })

  it('changes highlights with Home & End keys', function () {
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })
    subject.find('input').simulate('click')
    testbed.tick()

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

    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    expect(subject.instance().state.highlightedIndex).to.equal(1)
  })

  it('renders only emptyOption prop in menu when options are empty', function () {
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

  it('renders only loadingOption when given and loading is true', function () {
    const loadingOption = 'WARNING! LOADING TAKING PLACE!'
    const subject = testbed.render({
      loadingOption,
      loading: true
    })
    subject.find('input').simulate('click')
    testbed.tick()
    expect(subject.instance().expanded).to.be.true
    const menu = subject.ref('_menu')
    expect(menu.find('li').length).to.equal(1)
    expect(menu.find('li').text().trim()).to.equal(loadingOption)
  })

  it('does not change highlight when there are no options', function () {
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

    expect(highlights.every((h) => h === highlights[0])).to.be.true
  })

  it('should preventDefault onKeyDown of Enter when expanded', function () {
    const subject = testbed.render()
    subject.find('input').simulate('click', { preventDefault })
    testbed.tick()
    expect(subject.instance().expanded).to.be.true

    const preventDefaultStub = testbed.stub()
    subject.find('input').simulate('keyDown', { key: 'Enter', preventDefault: preventDefaultStub })
    expect(preventDefaultStub).to.have.been.called
  })

  it('should not preventDefault onKeyDown of Enter when collapsed', function () {
    const subject = testbed.render()
    expect(subject.instance().expanded).to.be.false

    const preventDefaultStub = testbed.stub()
    subject.find('input').simulate('keyDown', { key: 'Enter', preventDefault: preventDefaultStub })
    expect(preventDefaultStub).to.not.have.been.called
  })

  describe('events', function () {
    it('calls onPositioned event', function () {
      const onPositioned = testbed.stub()
      testbed.render({ onPositioned })
      testbed.tick()

      expect(onPositioned).to.have.been.called
    })

    it('responds to onChange event', function () {
      const onInputChange = testbed.stub()
      const subject = testbed.render({ onInputChange })

      subject.find('input').simulate('change', { target: { value: 'a' } })

      expect(onInputChange).to.have.been.called
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
