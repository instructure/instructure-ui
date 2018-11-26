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
import SelectSingle from '../index'
import SelectField from '../../SelectField'

/* eslint-disable mocha/no-synchronous-tests */
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
  const changeInput = (subject, value) => {
    const instance = subject.instance()

    instance._input.value = value
    subject.find('input').simulate('change', {
      target: {
        value,
      },
    })
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
    expect(subject.find('input').focused()).to.be.true()
  })

  it('should provide an focused getter', () => {
    const subject = testbed.render()
    subject.instance().focus()
    expect(subject.instance().focused).to.be.true()
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
    subject.find('input').simulate('keyUp', { keyCode: keycode.codes.esc, preventDefault })
    expect(subject.instance()._input.value).to.equal('')
    expect(onInputChange).to.have.been.calledOnce()
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
    expect(onInputChange).to.not.have.been.called()

    label = 'Jamaica'
    value = '1'
    subject.setProps({
      selectedOption: { label, value, children: label, id: value }
    }, () => {
      testbed.defer(() => { // wait for re-render
        expect(onInputChange).to.have.been.calledOnce()
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
    subject.find('input').simulate('keyUp', { keyCode: keycode.codes.esc, preventDefault })
    expect(onInputChange).to.have.been.calledOnce()
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
    subject.find('input').simulate('keyUp', { keyCode: keycode.codes.esc, preventDefault })
    expect(onChange).to.have.been.calledOnce()
    expect(onChange.firstCall.args[0].target).to.exist()
    expect(onChange.firstCall.args[0].target.value).to.equal(label)
    expect(onChange.firstCall.args[1]).to.eql({ value, label, id: value, children: label })

    expect(onInputChange).to.not.have.been.called()
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
    expect(onInputChange.firstCall).to.exist()
    expect(onInputChange.firstCall.args[0]).to.exist()
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
    expect(subject.find(SelectField).unwrap()).to.exist()
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
    expect(onSelect).to.exist()

    onSelect({ preventDefault, target: 1 }, newSelection)

    expect(onChange.firstCall).to.exist()
    const eventArg = onChange.firstCall.args[0]
    const selectedOptionArg = onChange.firstCall.args[1]
    expect(eventArg.target).to.equal(1)
    expect(selectedOptionArg).to.eql(newSelection)

    expect(onInputChange).to.have.been.calledOnce()
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal(newSelection.label)
    expect(subject.instance().state.filterText).to.equal(null)
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
    expect(onInputChange).to.not.have.been.called()

    subject.setProps({
      selectedOption: '1'
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        expect(subject.instance()._input.value).to.equal(options[1].label)
        expect(subject.instance().state.selectedOption).to.eql(options[1])

        expect(onInputChange).to.have.been.calledOnce()
        expect(onInputChange.firstCall.args[0]).to.equal(null)
        expect(onInputChange.firstCall.args[1]).to.equal(options[1].label)
        done()
      })
    })
  })

  it(`when controlled, should clear input when selectedOption is changed to null`, (done) => {
    const selectedOption = '0'
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange, selectedOption })
    testbed.tick()

    expect(subject.instance()._input.value).to.equal('Aruba')

    subject.setProps({
      selectedOption: null
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        expect(subject.instance()._input.value).to.equal('')
        expect(subject.instance().state.selectedOption).to.equal(undefined) // eslint-disable-line no-undefined
        done()
      })
    })
  })

  describe('default option', () => {
    function testDefaultValue (defaultProp) {
      it(`should update the input value if ${defaultProp} is set and the options update`, (done) => {
        // prevents the error that is fired when you select an option that isn't in the options list
        // TODO: look into this more (should we even output this error?)
        testbed.stub(console, 'error')

        const subject = testbed.render({
          [defaultProp]: '4'
        })

        expect(subject.find('input').node.value).to.equal('')

        subject.setProps({
          options: [
            ...options,
            { label: 'Argentina', children: 'Argentina', value: '4', id: '4' }
          ]
        }, () => {
          expect(subject.find('input').node.value).to.equal('Argentina')
          done()
        })
      })
    }

    testDefaultValue('defaultSelectedOption')
    testDefaultValue('selectedOption')

    it(`should update input value if selected option update`, (done) => {
      const subject = testbed.render({
        options: [
          ...options,
          { label: 'Argentina', children: 'Argentina', value: '4', id: '4' },
        ],
        selectedOption: '4',
      })

      expect(subject.find('input').node.value).to.equal('Argentina')

      subject.setProps({
        options: [
          ...options,
          { label: 'Foo', children: 'Foo', value: '4', id: '4' },
        ],
      })
      expect(subject.find('input').node.value).to.equal('Foo')
      done()
    })

    it(`should not update input value if filter has been set`, (done) => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      testbed.stub(console, 'error')

      const subject = testbed.render({
        options: [
          ...options,
          { label: 'Argentina', children: 'Argentina', value: '4', id: '4' },
        ],
        selectedOption: '4',
        editable: true,
      })

      changeInput(subject, 'foo')
      expect(subject.state('filterText')).to.equal('foo')

      subject.setProps({
        options: [
          ...options,
          { label: 'Arub', children: 'Arub', value: '4', id: '4' },
        ],
      })
      expect(subject.find('input').node.value).to.equal('foo')

      changeInput(subject, '')
      expect(subject.state('filterText')).to.equal('')

      subject.setProps({
        options: [],
      })
      expect(subject.find('input').node.value).to.equal('')
      done()
    })

    it(`should render input value even if selected option cannot be found in options`, (done) => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      testbed.stub(console, 'error')

      const subject = testbed.render({
        selectedOption: { label: 'Foo', children: 'Foo', value: '4', id: '4' },
      })

      expect(subject.find('input').node.value).to.equal('Foo')

      subject.setProps({
        selectedOption: { label: 'Bar', children: 'Bar', value: '4', id: '4' },
      })
      expect(subject.find('input').node.value).to.equal('Bar')
      done()
    })

    it(`should be able to select option when options are loaded asynchronously`, (done) => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      testbed.stub(console, 'error')

      const subject = testbed.render({
        defaultSelectedOption: '3',
        editable: true,
      })

      // type to search
      changeInput(subject, 'f')

      // options reloaded
      subject.setProps({
        options: [
          { label: 'Foo', children: 'Foo', value: '4', id: '4' },
        ],
      })

      expect(subject.find('input').node.value).to.equal('f')

      // select the first option
      subject.find(SelectField)
        .getDOMNode()
        .querySelector('li[role="option"]')
        .click()

      // options reloaded
      subject.setProps({
        options: [],
      })

      expect(subject.find('input').node.value).to.equal('Foo')
      done()
    })

    it('should not override a selected option if the default option is set and the options update', (done) => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      testbed.stub(console, 'error')

      const subject = testbed.render({
        defaultSelectedOption: '4'
      })
      subject.find('input').click()
      testbed.tick()

      // TODO: query document for portal content instead of finding SelectField here when
      // we have the new test utils
      const item = subject.find(SelectField).getDOMNode().querySelector('li[role="option"]')
      item.click()

      const value = subject.find('input').node.value

      subject.setProps({
        options: [
          ...options,
          { label: 'Argentina', children: 'Argentina', value: '4', id: '4' }
        ]
      }, () => {
        expect(subject.find('input').node.value).to.equal(value)
        done()
      })
    })
  })

  it('allowCustom permits arbitrary input', () => {
    const label = 'Cuba'
    const onInputChange = testbed.stub()
    const subject = testbed.render({
      allowCustom: true,
      onInputChange
    })
    testbed.tick()
    subject.focus()
    subject.instance()._input.value = label[0]
    subject.find('input').simulate('change', { preventDefault })
    expect(subject.instance()._input.value).to.equal(label[0])
    expect(subject.instance().value).to.equal(label[0])
    expect(subject.instance().state.selectedOption).to.equal(undefined) // eslint-disable-line no-undefined

    subject.instance()._input.value = label
    subject.find('input').simulate('change', { preventDefault })
    expect(onInputChange.secondCall).to.exist()
    expect(onInputChange.secondCall.args[0]).to.exist()
    expect(onInputChange.secondCall.args[0].target.value).to.eql(label)
    expect(onInputChange.secondCall.args[1]).to.eql(label)
    expect(subject.instance().value).to.eql(label)
  })

  it('allowCustom sets selectedOption after some freeform entry', (done) => {
    const label = 'Cuba'  // not one of the options
    const onInputChange = testbed.stub()
    const subject = testbed.render({
      allowCustom: true,
      onInputChange
    })
    testbed.tick()
    subject.instance()._input.value = label
    subject.find('input').simulate('change', { preventDefault })
    expect(subject.instance().state.selectedOption).to.equal(undefined)  // eslint-disable-line no-undefined
    expect(subject.instance().value).to.equal(label)

    subject.setProps({
      selectedOption: '1'
    }, () => {
      testbed.defer(() => { // wait for re-render
        expect(subject.instance()._input.value).to.equal('Jamaica')
        expect(subject.instance().value).to.equal('1')
        expect(subject.instance().state.selectedOption).to.equal(options[1])
        done()
      })
    })
  })

  it('allowCustom sets arbitrary text after selecting from options', () => {
    const subject = testbed.render({
      allowCustom: true,
      selectedOption: '1',
    })
    testbed.tick()
    expect(subject.instance().value).to.equal(options[1].value)

    const newValue = subject.instance()._input.value + 'x'
    subject.instance()._input.value = newValue
    subject.find('input').simulate('change', { preventDefault })
    subject.find('input').simulate('blur', { preventDefault })
    testbed.tick()
    expect(subject.instance().state.selectedOption).to.equal(undefined)  // eslint-disable-line no-undefined
    expect(subject.instance().value).to.equal(newValue)
  })

  it('allowCustom selects option when typed input matches', () => {
    const label = 'jamaica'
    const onInputChange = testbed.stub()
    const onChange = testbed.stub()
    const subject = testbed.render({
      allowCustom: true,
      onInputChange,
      onChange
    })
    testbed.tick()
    // type in 'jamaica'
    subject.instance()._input.value = label
    subject.find('input').simulate('change')
    // and the select's value is 'jamaica'
    expect(subject.instance().selectedOption).to.equal(undefined) // eslint-disable-line no-undefined
    expect(subject.instance().value).to.equal('jamaica')

    // blur will cause the input to match an option
    subject.find('input').simulate('blur')
    testbed.tick()

    expect(onInputChange.callCount).to.eql(2)
    expect(onInputChange.firstCall.args[1]).to.eql('jamaica')   // when the string was typed
    expect(onInputChange.secondCall.args[1]).to.eql('Jamaica')  // when it matched an option's label

    expect(onChange.firstCall.args[1]).to.eql(options[1])
    expect(subject.instance().value).to.eql('1')
    expect(subject.instance().state.selectedOption).to.equal(options[1])
  })

  context('when options differ only in capitalization', () => {
    const options = [{
      label: 'aruba', children: 'aruba', value: '0', id: '0'
    }, {
      label: 'Aruba', children: 'Aruba', value: '1', id: '1'
    }, {
      label: 'ARUBA', children: 'ARUBA', value: '2', id: '2'
    }]

    it('calls onChange once when an option is selected', () => {
      const onChange = testbed.stub().callsFake(event => event && event.persist())
      const subject = testbed.render({
        onChange,
        options
      })

      // Click the select field to open it
      const selectField = subject.find(SelectField).getDOMNode()
      selectField.click()
      testbed.tick() // positioning of the options portal is deferred

      // Select the second option
      selectField.querySelectorAll('li[role="option"]')[1].click()

      expect(onChange).to.have.been.calledOnce()
      expect(onChange.lastCall.args[1]).to.deep.include({ value: '1' })
    })
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
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
/* eslint-enable mocha/no-synchronous-tests */
