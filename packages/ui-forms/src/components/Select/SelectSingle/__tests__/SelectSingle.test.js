import React from 'react'
import SelectSingle from '../index'
import SelectField from '../../SelectField'

describe('<SelectSingle />', () => {
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
    <SelectSingle
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

  it('resets input value to empty when closing the menu with no selectedOption', () => {
    const onInputChange = testbed.stub()
    const subject = testbed.render({ onInputChange })
    testbed.tick()
    subject.find('input').simulate('click')
    subject.instance()._input.value = 'Arub'
    subject.find('input').simulate('keyUp', { key: 'Escape', preventDefault })
    expect(subject.instance()._input.value).to.equal('')
    expect(onInputChange).to.have.been.calledOnce
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal('')
  })

  it('changes input value when selectedOption is changed as a prop', (done) => {
    let label = 'Aruba'
    let value = '0'
    const onInputChange = testbed.stub()
    const subject = testbed.render({
      onInputChange,
      selectedOption: { label, value, children: label, id: value }
    })

    expect(subject.instance()._input.value).to.equal(label)
    expect(onInputChange).to.not.have.been.called

    label = 'Jamaica'
    value = '1'
    subject.setProps({
      selectedOption: { label, value, children: label, id: value }
    }, () => {
      testbed.defer(() => { // wait for re-render
        expect(onInputChange).to.have.been.calledOnce
        expect(onInputChange.firstCall.args[0]).to.equal(null)
        expect(onInputChange.firstCall.args[1]).to.equal(label)
        expect(subject.instance()._input.value).to.equal(label)
        done()
      })
    })
  })

  it('resets input value to selectedOption when closing the menu', () => {
    const value = '0'
    const label = 'Aruba'
    const onInputChange = testbed.stub()
    const subject = testbed.render({
      selectedOption: { value, label, id: value, children: label },
      onInputChange
    })
    testbed.tick()
    subject.find('input').simulate('click')
    subject.instance()._input.value = 'Arub'
    subject.find('input').simulate('keyUp', { key: 'Escape', preventDefault })
    expect(onInputChange).to.have.been.calledOnce
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal(label)
    expect(subject.instance()._input.value).to.equal(label)
  })

  it('calls onChange when closing the menu and the input matches an option', () => {
    const value = '0'
    const label = 'Aruba'
    const onChange = testbed.stub()
    const onInputChange = testbed.stub()
    const subject = testbed.render({ onChange, onInputChange })
    testbed.tick()
    subject.find('input').simulate('click')
    subject.instance()._input.value = label
    subject.find('input').simulate('keyUp', { key: 'Escape', preventDefault })
    expect(onChange).to.have.been.calledOnce
    expect(onChange.firstCall.args[0].target).to.exist
    expect(onChange.firstCall.args[0].target.value).to.equal(label)
    expect(onChange.firstCall.args[1]).to.eql({ value, label, id: value, children: label })

    expect(onInputChange).to.not.have.been.called
  })

  it('calls onInputChange when input changes', () => {
    const label = 'Aruba'
    const onInputChange = testbed.stub()
    const subject = testbed.render({
      editable: true,
      onInputChange
    })
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
    const subject = testbed.render({
      editable: true
    })
    testbed.tick()
    subject.instance()._input.value = label
    subject.find('input').simulate('change', { preventDefault })
    expect(subject.instance().state.filterText).to.equal(label.toLowerCase())
    expect(subject.instance().state.filteredOptions.length).to.equal(1)
  })

  it('renders SelectField', () => {
    const subject = testbed.render()
    testbed.tick()
    expect(subject.find(SelectField).unwrap()).to.exist
  })

  it('responds to selection done by SelectField', () => {
    const newSelection = {
      value: '4', label: 'Key Largo'
    }
    const onChange = testbed.stub()
    const onInputChange = testbed.stub()
    const subject = testbed.render({ onChange, onInputChange })
    testbed.tick()
    const onSelect = subject.find(SelectField).unwrap().props.onSelect
    expect(onSelect).to.exist

    onSelect({ preventDefault, target: 1 }, newSelection)

    expect(onChange.firstCall).to.exist
    const eventArg = onChange.firstCall.args[0]
    const selectedOptionArg = onChange.firstCall.args[1]
    expect(eventArg.target).to.equal(1)
    expect(selectedOptionArg).to.eql(newSelection)

    expect(onInputChange).to.have.been.calledOnce
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal(newSelection.label)
    expect(subject.instance().state.filterText).to.equal('')
  })

  it('recalculates selectedOption when it changes', (done) => {
    const onInputChange = testbed.stub()
    const subject = testbed.render({
      selectedOption: '0',
      onInputChange
    })
    testbed.tick()
    expect(subject.instance()._input.value).to.equal(options[0].label)
    expect(subject.instance().state.selectedOption).to.eql(options[0])
    expect(onInputChange).to.not.have.been.called

    subject.setProps({
      selectedOption: '1'
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        expect(subject.instance()._input.value).to.equal(options[1].label)
        expect(subject.instance().state.selectedOption).to.eql(options[1])

        expect(onInputChange).to.have.been.calledOnce
        expect(onInputChange.firstCall.args[0]).to.equal(null)
        expect(onInputChange.firstCall.args[1]).to.equal(options[1].label)
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
