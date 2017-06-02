import React from 'react'
import AutocompleteSingle from '../index'
import AutocompleteField from '../../AutocompleteField'

describe('<AutocompleteSingle />', function () { // eslint-disable-line mocha/no-exclusive-tests
  const preventDefault = () => {}
  const options = [{
    label: 'Aruba', children: 'Aruba', value: '0', id: '0'
  }, {
    label: 'Jamaica', children: 'Jamaica', value: '1', id: '1'
  }, {
    label: 'Bermuda', children: 'Bermuda', value: '2', id: '2'
  }, {
    label: 'Bahama', children: 'Bahama', value: '3', id: '3'
  }]
  const filter = (options, filterText) => {
    return options.filter(
      (option) => option.label.toLowerCase().startsWith(filterText.toLowerCase())
    )
  }

  const testbed = new Testbed(
    <AutocompleteSingle
      label="Choose a vacation destination"
      options={options}
      filter={filter}
    />
  )

  it('should include a label', function () {
    const subject = testbed.render()
    expect(subject.find('label').length).to.equal(1)
  })

  it('should focus the input when focus is called', function () {
    const subject = testbed.render()
    subject.instance().focus()
    expect(subject.find('input').focused()).to.be.true
  })

  it('should provide an focused getter', function () {
    const subject = testbed.render()
    subject.instance().focus()
    expect(subject.instance().focused).to.be.true
  })

  it('should provide an inputRef prop', function () {
    const inputRef = testbed.stub()
    const subject = testbed.render({ inputRef })
    expect(inputRef).to.have.been.calledWith(subject.find('input').unwrap())
  })

  it('resets input value to empty when closing the menu with no selectedOption', function () {
    const subject = testbed.render()
    testbed.tick()
    subject.find('input').simulate('click')
    subject.instance()._input.value = 'Arub'
    subject.find('input').simulate('keyDown', { key: 'Escape', preventDefault })
    expect(subject.instance()._input.value).to.equal('')
  })

  it('resets input value to selectedOption when closing the menu', function () {
    const value = '0'
    const label = 'Aruba'
    const subject = testbed.render({
      selectedOption: { value, label, id: value, children: label }
    })
    testbed.tick()
    subject.find('input').simulate('click')
    subject.instance()._input.value = 'Arub'
    subject.find('input').simulate('keyDown', { key: 'Escape', preventDefault })
    expect(subject.instance()._input.value).to.equal(label)
  })

  it('calls onChange when closing the menu and the input matches an option', function () {
    const value = '0'
    const label = 'Aruba'
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })
    testbed.tick()
    subject.find('input').simulate('click')
    subject.instance()._input.value = label
    subject.find('input').simulate('keyDown', { key: 'Escape', preventDefault })
    expect(onChange.firstCall).to.exist
    expect(onChange.firstCall.args[0].target).to.exist
    expect(onChange.firstCall.args[0].target.value).to.equal(label)
    expect(onChange.firstCall.args[1]).to.eql({ value, label, id: value, children: label })
  })

  it('calls onInputChange when input changes', function () {
    const label = 'Aruba'
    const onInputChange = testbed.stub()
    const subject = testbed.render({ onInputChange })
    testbed.tick()
    subject.instance()._input.value = label
    subject.find('input').simulate('change', { preventDefault })
    expect(onInputChange.firstCall).to.exist
    expect(onInputChange.firstCall.args[0]).to.exist
    expect(onInputChange.firstCall.args[0].target.value).to.eql(label)
  })

  it('filters the options when input changes', function () {
    const label = 'ARU'
    const subject = testbed.render({})
    testbed.tick()
    subject.instance()._input.value = label
    subject.find('input').simulate('change', { preventDefault })
    expect(subject.instance().state.filterText).to.equal(label.toLowerCase())
    expect(subject.instance().state.filteredOptions.length).to.equal(1)
  })

  it('renders AutocompleteField', function () {
    const subject = testbed.render()
    testbed.tick()
    expect(subject.find(AutocompleteField).unwrap()).to.exist
  })

  it('responds to selection done by AutocompleteField', function () {
    const newSelection = {
      value: '4', label: 'Key Largo'
    }
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })
    testbed.tick()
    const onSelect = subject.find(AutocompleteField).unwrap().props.onSelect
    expect(onSelect).to.exist

    onSelect({ preventDefault, target: 1 }, newSelection)

    expect(onChange.firstCall).to.exist
    const eventArg = onChange.firstCall.args[0]
    const selectedOptionArg = onChange.firstCall.args[1]
    expect(eventArg.target).to.equal(1)
    expect(selectedOptionArg).to.eql(newSelection)

    expect(subject.instance().state.filterText).to.equal('')
  })

  it('recalculates selectedOption when it changes', function (done) {
    const subject = testbed.render({
      selectedOption: '0'
    })
    testbed.tick()
    expect(subject.instance()._input.value).to.equal(options[0].label)
    expect(subject.instance().state.selectedOption).to.eql(options[0])

    subject.setProps({
      selectedOption: '1'
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        expect(subject.instance()._input.value).to.equal(options[1].label)
        expect(subject.instance().state.selectedOption).to.eql(options[1])
        done()
      })
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
