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
import SelectMultiple from '../index'
import SelectField from '../../SelectField'

describe('<SelectMultiple />', () => {
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
    <SelectMultiple
      editable
      multiple
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
    expect(subject.find('input[type="text"]').focused()).to.be.true
  })

  it('should provide an focused getter', () => {
    const subject = testbed.render()
    subject.instance().focus()
    expect(subject.instance().focused).to.be.true
  })

  it('should provide an inputRef prop', () => {
    const inputRef = testbed.stub()
    const subject = testbed.render({ inputRef })
    expect(inputRef).to.have.been.calledWith(subject.find('input[type="text"]').unwrap())
  })

  it('resets input value to empty when closing the menu with selectedOption', () => {
    const subject = testbed.render({
      selectedOption: ['1']
    })
    testbed.tick()
    subject.find('input[type="text"]').simulate('click')
    subject.instance()._input.value = 'Arub'
    subject.find('input[type="text"]').simulate('keyUp', { keyCode: keycode.codes.esc, preventDefault })
    expect(subject.instance()._input.value).to.equal('')
  })

  it('resets input value to empty when closing the menu with no selectedOption', () => {
    const subject = testbed.render()
    testbed.tick()
    subject.find('input[type="text"]').simulate('click')
    subject.instance()._input.value = 'Arub'
    subject.find('input[type="text"]').simulate('keyUp', { keyCode: keycode.codes.esc, preventDefault })
    expect(subject.instance()._input.value).to.equal('')
  })

  it('calls onChange when closing the menu and the input matches an option', () => {
    const value = '0'
    const label = 'Aruba'
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })
    testbed.tick()
    subject.find('input[type="text"]').simulate('click')
    subject.instance()._input.value = label
    subject.find('input[type="text"]').simulate('keyUp', { keyCode: keycode.codes.esc, preventDefault })
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
    subject.find('input[type="text"]').simulate('change', { preventDefault })
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
    subject.find('input[type="text"]').simulate('change', { preventDefault })
    expect(subject.instance().state.filterText).to.equal(label.toLowerCase())
    expect(subject.instance().state.filteredOptions.length).to.equal(1)
  })

  it('resets the options when closing the menu without a selection', () => {
    const subject = testbed.render()
    testbed.tick()
    subject.find('input[type="text"]').simulate('click')
    subject.instance()._input.value = 'Arub'
    subject.find('input[type="text"]').simulate('change', { preventDefault })
    subject.find('input[type="text"]').simulate('keyUp', { keyCode: keycode.codes.esc, preventDefault })
    expect(subject.instance().state.filteredOptions.length).to.equal(4)
  })

  it('responds to selection done by SelectField', () => {
    const newSelection = {
      value: '4', label: 'Key Largo'
    }
    const onInputChange = testbed.stub()
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange, onInputChange })
    testbed.tick()
    const onSelect = subject.find(SelectField).unwrap().props.onSelect
    expect(onSelect).to.exist

    subject.instance()._input.value = 'Key La'

    expect(subject.instance().state.selectedOption.length).to.equal(0)

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
    expect(subject.instance().state.selectedOption.length).to.equal(1)

    const tags = subject.find('Tag')
    expect(tags).to.exist
    expect(tags.length).to.equal(1)
  })

  it('selection is additive', () => {
    const firstSelection = {
      value: '4', label: 'Key Largo'
    }
    const secondSelection = {
      value: '5', label: 'Montego'
    }
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange })
    testbed.tick()
    const onSelect = subject.find(SelectField).unwrap().props.onSelect
    expect(onSelect).to.exist

    expect(subject.instance().state.selectedOption.length).to.equal(0)
    onSelect({ preventDefault, target: 1 }, firstSelection)
    expect(subject.instance().state.selectedOption.length).to.equal(1)
    onSelect({ preventDefault, target: 2 }, secondSelection)
    expect(subject.instance().state.selectedOption.length).to.equal(2)

    expect(onChange.firstCall).to.exist
    expect(onChange.firstCall.args[0].target).to.equal(1)
    expect(onChange.firstCall.args[1]).to.eql([firstSelection])

    expect(onChange.getCall(1)).to.exist
    expect(onChange.getCall(1).args[0].target).to.equal(2)
    expect(onChange.getCall(1).args[1]).to.eql([firstSelection, secondSelection])

    const tags = subject.find('Tag')
    expect(tags).to.exist
    expect(tags.length).to.equal(2)
  })

  it(`when controlled, shouldn't update Tags by itself`, () => {
    const selectedOption = [{
      value: '5', label: 'Montego'
    }]
    const newSelection = {
      value: '4', label: 'Key Largo'
    }
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange, selectedOption })
    testbed.tick()

    const onSelect = subject.find(SelectField).unwrap().props.onSelect

    expect(onSelect).to.exist

    expect(subject.instance().state.selectedOption.length).to.equal(1)
    onSelect({ preventDefault, target: 10 }, newSelection)
    expect(subject.instance().state.selectedOption.length).to.equal(1)

    expect(onChange.firstCall).to.exist
    expect(onChange.firstCall.args[0].target).to.equal(10)
    expect(onChange.firstCall.args[1]).to.eql([...selectedOption, newSelection])

    const tags = subject.find('Tag')
    expect(tags).to.exist
    expect(tags.length).to.equal(1)
  })

  it(`when controlled, should only update Tags when selectedOption props changes`, (done) => {
    const selectedOption = [{
      value: '5', label: 'Montego'
    }]
    const newSelection = {
      value: '4', label: 'Key Largo'
    }
    const onChange = testbed.stub()
    const subject = testbed.render({ onChange, selectedOption })
    testbed.tick()

    const tags = subject.find('Tag')
    expect(tags).to.exist
    expect(tags.length).to.equal(1)

    subject.setProps({
      selectedOption: [...selectedOption, newSelection]
    }, () => {
      testbed.defer(() => { // wait for re-render
        testbed.tick()
        const tags = subject.find('Tag')
        expect(tags).to.exist
        expect(tags.length).to.equal(2)
        done()
      })
    })
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
    const tags = subject.find('Tag')
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
    const tags = subject.find('Tag')

    tags.at(1).simulate('click', { target: 1, preventDefault })

    expect(onChange.firstCall).to.exist
    const selectedOptionArg = onChange.firstCall.args[1]
    expect(selectedOptionArg.length).to.equal(2)
  })

  it('allows tags to be non-dismissible', () => {
    const onChange = testbed.stub()
    const subject = testbed.render({
      onChange,
      selectedOption: [{
        value: '4', label: 'Key Largo', dismissible: false
      }]
    })
    testbed.tick()
    const tags = subject.find('Tag')
    const nonDismissibleTag = tags.at(0)
    expect(nonDismissibleTag.prop('onChange')).to.equal(undefined) // eslint-disable-line no-undefined
    expect(nonDismissibleTag.prop('dismissible')).to.equal(false)
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

  describe('default options', () => {
    function testDefaultValue(defaultProp) {
      it(`updates the selected options when ${defaultProp} is set and the options update`, (done) => {
        const subject = testbed.render({
          [defaultProp]: ['4', '5']
        })

        expect(subject.find('button').length).to.equal(0)

        subject.setProps({
          options: [
            ...options,
            { label: 'Argentina', children: 'Argentina', value: '4', id: '4' },
            { label: 'Uruguay', children: 'Uruguay', value: '5', id: '5' }
          ]}, () => {
            expect(subject.find('button').length).to.equal(2)
            expect(subject.find('button[title="Argentina"]')).to.exist
            expect(subject.find('button[title="Uruguay"]')).to.exist
            done()
          }
        )
      })
    }

    testDefaultValue('defaultSelectedOption')
    testDefaultValue('selectedOption')

    it('updates the selected options when selected options update', (done) => {
      const subject = testbed.render({
        options: [
          ...options,
          { label: 'Argentina', children: 'Argentina', value: '4', id: '4' },
          { label: 'Uruguay', children: 'Uruguay', value: '5', id: '5' },
        ],
        selectedOption: ['4', '5'],
      })

      expect(subject.find('button').length).to.equal(2)
      expect(subject.find('button[title="Argentina"]')).to.exist
      expect(subject.find('button[title="Uruguay"]')).to.exist

      subject.setProps({
        options: [
          ...options,
          { label: 'Foo', children: 'Foo', value: '4', id: '4' },
          { label: 'Bar', children: 'Bar', value: '5', id: '5' },
        ],
      })
      expect(subject.find('button').length).to.equal(2)
      expect(subject.find('button[title="Foo"]')).to.exist
      expect(subject.find('button[title="Bar"]')).to.exist
      done()
    })

    it('updates correctly when default options are provided and some of the corresponding options are loaded later', (done) => {
      const testOptions = [
        ...options,
        { label: 'Argentina', children: 'Argentina', value: '4', id: '4' }
      ]

      const subject = testbed.render({
        defaultSelectedOption: ['4', '5'],
        options: testOptions
      })

      expect(subject.find('button').length).to.equal(1)
      expect(subject.find('button[title="Argentina"]')).to.exist

      subject.setProps({
        options: [
          ...testOptions,
          { label: 'Uruguay', children: 'Uruguay', value: '5', id: '5' }
        ]}, () => {
          expect(subject.find('button').length).to.equal(2)
          expect(subject.find('button[title="Uruguay"]')).to.exist
          done()
        }
      )
    })

    it('does not re render option when a default option has been dismissed and the options update', (done) => {
      const testOptions = [
        ...options,
        { label: 'Argentina', children: 'Argentina', value: '4', id: '4' }
      ]

      const subject = testbed.render({
        defaultSelectedOption: ['4', '5'],
        options: testOptions
      })

      subject.find('button').click() // dismiss argentina

      expect(subject.find('button').length).to.equal(0)

      subject.setProps({
        options: [
          ...testOptions,
          { label: 'Uruguay', children: 'Uruguay', value: '5', id: '5' }
        ]}, () => {
          // on option update, argentina should not get amended to the selected
          // options since it has already been dismissed
          expect(subject.find('button').length).to.equal(1)
          expect(subject.find('button[title="Uruguay"]')).to.exist
          expect(subject.find('button[title="Argentina"]')).to.not.exist
          done()
        }
      )
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

      expect(subject.find('input[type="text"]').getAttribute('aria-invalid'))
        .to.exist
    })
  })
})
