import React from 'react'
import AutocompleteMultiple from '../index'
import AutocompleteField from '../../AutocompleteField'
import Tag from '../../../Tag'

describe('<AutocompleteMultiple />', () => {
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
    <AutocompleteMultiple
      label="Choose a vacation destination"
      options={options}
      filter={filter}
    />
  )

  it('should include a label', () => {
    const subject = testbed.render()
    expect(subject.find('label').length).to.equal(1)
  })

  it('should focus the input when focus is called', () => {
    const subject = testbed.render()
    subject.instance().focus()
    expect(subject.find('input').focused()).to.be.true
  })

  it('should provide an focused getter', () => {
    const subject = testbed.render()
    subject.instance().focus()
    expect(subject.instance().focused).to.be.true
  })

  it('should provide an inputRef prop', () => {
    const inputRef = testbed.stub()
    const subject = testbed.render({ inputRef })
    expect(inputRef).to.have.been.calledWith(subject.find('input').unwrap())
  })

  it('resets input value to empty when closing the menu with selectedOption', () => {
    const subject = testbed.render({
      selectedOption: ['1']
    })
    testbed.tick()
    subject.find('input').simulate('click')
    subject.instance()._input.value = 'Arub'
    subject.find('input').simulate('keyUp', { key: 'Escape', preventDefault })
    expect(subject.instance()._input.value).to.equal('')
  })

  it('resets input value to empty when closing the menu with no selectedOption', () => {
    const subject = testbed.render()
    testbed.tick()
    subject.find('input').simulate('click')
    subject.instance()._input.value = 'Arub'
    subject.find('input').simulate('keyUp', { key: 'Escape', preventDefault })
    expect(subject.instance()._input.value).to.equal('')
  })

  it('calls onChange when closing the menu and the input matches an option', () => {
    const value = '0'
    const label = 'Aruba'
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })
    testbed.tick()
    subject.find('input').simulate('click')
    subject.instance()._input.value = label
    subject.find('input').simulate('keyUp', { key: 'Escape', preventDefault })
    expect(onChange.firstCall).to.exist
    const eventArg = onChange.firstCall.args[0]
    const selectedOptionArg = onChange.firstCall.args[1]
    expect(eventArg.target).to.exist
    expect(selectedOptionArg.length).to.equal(1)
    expect(selectedOptionArg[0]).to.eql({ value, label, id: value, children: label })
  })

  it('calls onInputChange when input changes', () => {
    const label = 'Aruba'
    const onInputChange = testbed.stub()
    const subject = testbed.render({ onInputChange })
    testbed.tick()
    subject.instance()._input.value = label
    subject.find('input').simulate('change', { preventDefault })
    expect(onInputChange.firstCall).to.exist
    expect(onInputChange.firstCall.args[0]).to.exist
    expect(onInputChange.firstCall.args[0].target.value).to.eql(label)
    expect(onInputChange.firstCall.args[1]).to.eql(label)
  })

  it('filters the options when input changes', () => {
    const label = 'ARU'
    const subject = testbed.render({})
    testbed.tick()
    subject.instance()._input.value = label
    subject.find('input').simulate('change', { preventDefault })
    expect(subject.instance().state.filterText).to.equal(label.toLowerCase())
    expect(subject.instance().state.filteredOptions.length).to.equal(1)
  })

  it('responds to selection done by AutocompleteField', () => {
    const newSelection = {
      value: '4', label: 'Key Largo'
    }
    const onInputChange = testbed.stub()
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange, onInputChange })
    testbed.tick()
    const onSelect = subject.find(AutocompleteField).unwrap().props.onSelect
    expect(onSelect).to.exist

    subject.instance()._input.value = 'Key La'

    onSelect({ preventDefault, target: 1 }, newSelection)

    expect(onChange.firstCall).to.exist
    const eventArg = onChange.firstCall.args[0]
    const selectedOptionArg = onChange.firstCall.args[1]
    expect(eventArg.target).to.equal(1)
    expect(selectedOptionArg[0]).to.equal(newSelection)

    expect(onInputChange.firstCall).to.exist
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal('')

    expect(subject.instance().state.filterText).to.equal('')
  })

  it('selection is additive', () => {
    const newSelection = {
      value: '5', label: 'Montego'
    }
    const onInputChange = testbed.stub()
    const onChange = testbed.stub()
    const subject = testbed.render({
      onChange,
      onInputChange,
      selectedOption: [{
        value: '4', label: 'Key Largo'
      }]
    })
    testbed.tick()
    const onSelect = subject.find(AutocompleteField).unwrap().props.onSelect
    expect(onSelect).to.exist

    subject.instance()._input.value = 'Key La'

    onSelect({ preventDefault, target: 1 }, newSelection)

    expect(onChange.firstCall).to.exist
    const eventArg = onChange.firstCall.args[0]
    const selectedOptionArg = onChange.firstCall.args[1]
    expect(eventArg.target).to.equal(1)
    expect(selectedOptionArg).to.eql([{
      value: '4', label: 'Key Largo'
    }, newSelection])

    expect(onInputChange.firstCall).to.exist
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal('')

    expect(subject.instance().state.filterText).to.equal('')
  })

  it('renders Tags for each selectedOption', () => {
    const subject = testbed.render({
      selectedOption: [{
        value: '4', label: 'Key Largo'
      }, {
        value: '5', label: 'Montego'
      }, {
        value: '6', label: 'Baby why dont we go'
      }]
    })
    testbed.tick()
    const tags = subject.find(Tag)
    expect(tags).to.exist
    expect(tags.length).to.equal(3)
  })

  it('handles dismissing Tags', () => {
    const onChange = testbed.stub()
    const subject = testbed.render({
      onChange,
      selectedOption: [{
        value: '4', label: 'Key Largo'
      }, {
        value: '5', label: 'Montego'
      }, {
        value: '6', label: 'Baby why dont we go'
      }]
    })
    testbed.tick()
    const tags = subject.find(Tag)

    tags.at(1).simulate('click', { target: 1, preventDefault })

    expect(onChange.firstCall).to.exist
    const selectedOptionArg = onChange.firstCall.args[1]
    expect(selectedOptionArg.length).to.equal(2)
  })

  it('recalculates selectedOption when it changes', (done) => {
    const subject = testbed.render({
      selectedOption: ['0']
    })
    testbed.tick()
    expect(subject.instance()._input.value).to.equal('')
    expect(subject.instance().state.selectedOption[0]).to.eql(options[0])

    subject.setProps({
      selectedOption: ['1']
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        expect(subject.instance()._input.value).to.equal('')
        expect(subject.instance().state.selectedOption[0]).to.eql(options[1])
        done()
      })
    })
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      // ignored required children because of this bug https://github.com/dequelabs/axe-core/issues/160
      subject.should.be.accessible(done, {
        ignores: ['aria-required-children']
      })
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
