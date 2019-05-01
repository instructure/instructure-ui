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
import { locator, expect, mount, stub, spy, wait } from '@instructure/ui-test-utils'

import { SelectSingle } from '../index'

import PositionLocator from '@instructure/ui-layout/lib/Position/locator'

const InputLocator = locator('input[type="text"]')
const OptionsLocator = locator('li')

const SelectSingleLocator = locator(SelectSingle.selector, {
  findInput: (...args) => InputLocator.find(...args),
  findOption: async (element, ...args) => {
    const content = await PositionLocator.findContent(element)
    return content ? OptionsLocator.find(content.getDOMNode(), ...args) : null
  },
  findAllOptions: async (element, ...args) => {
    const content = await PositionLocator.findContent(element)
    return content ? OptionsLocator.findAll(content.getDOMNode(), ...args) : null
  }
})

describe('<SelectSingle />', async () => {
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

  it('should include a label', async () => {
    await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
      />
    )
    const select = await SelectSingleLocator.find()
    expect(await select.find('label')).to.exist()
  })

  it('should focus the input when focus is called', async () => {
    let ref
    await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        componentRef={el => ref = el}
      />
    )
    const select = await SelectSingleLocator.find()
    const input = await select.findInput()
    ref.focus()
    expect(input.focused()).to.be.true()
  })

  it('should provide an focused getter', async () => {
    let ref
    await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        componentRef={el => ref = el}
      />
    )
    ref.focus()
    expect(ref.focused).to.be.true()
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = stub()
    await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        inputRef={inputRef}
      />
    )
    const select = await SelectSingleLocator.find()
    const input = await select.findInput()
    expect(inputRef).to.have.been.calledWith(input.getDOMNode())
  })

  it('resets input value to empty when closing the menu with no selectedOption', async () => {
    const onInputChange = stub()
    await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onInputChange={onInputChange}
      />
    )
    const select = await SelectSingleLocator.find()
    const input = await select.findInput()

    await input.click()

    input.getDOMNode().value = 'Arub'

    await input.keyUp('esc')
    expect(input.getDOMNode().value).to.equal('')
    expect(onInputChange).to.have.been.calledOnce()
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal('')
  })

  it('changes input value when selectedOption is changed as a prop', async () => {
    let label = 'Aruba'
    let value = '0'
    const onInputChange = stub()
    const subject = await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        selectedOption={{ label, value, children: label, id: value }}
        onInputChange={onInputChange}
      />
    )
    const select = await SelectSingleLocator.find()
    const input = await select.findInput()

    expect(input.getDOMNode().value).to.equal(label)
    expect(onInputChange).to.not.have.been.called()

    label = 'Jamaica'
    value = '1'
    await subject.setProps({
      selectedOption: { label, value, children: label, id: value }
    })
    expect(onInputChange).to.have.been.calledOnce()
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal(label)
    expect(input.getDOMNode().value).to.equal(label)
  })

  it('resets input value to selectedOption when closing the menu', async () => {
    let label = 'Aruba'
    let value = '0'
    const onInputChange = stub()
    await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        selectedOption={{ value, label, id: value, children: label }}
        onInputChange={onInputChange}
      />
    )
    const select = await SelectSingleLocator.find()
    const input = await select.findInput()

    await input.click()
    input.getDOMNode().value = 'Arub'
    await input.keyUp('esc')

    expect(onInputChange).to.have.been.calledOnce()
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal(label)
    expect(input.getDOMNode().value).to.equal(label)
  })

  it('calls onChange when closing the menu and the input matches an option', async () => {
    let label = 'Aruba'
    let value = '0'
    const onChange = stub()
    const onInputChange = stub()
    await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onInputChange={onInputChange}
        onChange={onChange}
      />
    )
    const select = await SelectSingleLocator.find()
    const input = await select.findInput()

    await input.click()
    input.getDOMNode().value = label
    await input.keyUp('esc')

    expect(onChange).to.have.been.calledOnce()
    expect(onChange.firstCall.args[0]).to.exist()
    expect(onChange.firstCall.args[1]).to.deep.equal({ value, label, id: value, children: label })
    expect(onInputChange).to.not.have.been.called()
  })

  it('calls onInputChange when input changes', async () => {
    let label = 'Aruba'
    const onInputChange = stub()
    await mount(
      <SelectSingle
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onInputChange={onInputChange}
      />
    )
    const select = await SelectSingleLocator.find()
    const input = await select.findInput()

    await input.change({ target: { value: label } })

    expect(onInputChange.firstCall).to.exist()
    expect(onInputChange.firstCall.args[0]).to.exist()
    expect(onInputChange.firstCall.args[1]).to.equal(label)
  })

  it('filters the options when input changes', async () => {
    const label = 'ARU'
    await mount(
      <SelectSingle
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
      />
    )
    const select = await SelectSingleLocator.find()
    const input = await select.findInput()

    await input.change({ target: { value: label } })

    expect((await select.findAllOptions()).length).to.equal(1)
  })

  it('responds to selection done by SelectField', async () => {
    const onChange = stub()
    const onInputChange = stub()
    await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onInputChange={onInputChange}
        onChange={onChange}
        constrain="window"
      />
    )

    const select = await SelectSingleLocator.find()
    const input = await select.find('input[type="text"]')

    await input.click()

    const item = await select.findOption()

    await item.keyDown('enter')

    expect(onChange.firstCall).to.exist()
    expect(onChange.firstCall.args[0]).to.exist()
    expect(onChange.firstCall.args[1]).to.deep.equal(options[0])

    expect(onInputChange).to.have.been.calledOnce()
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal(options[0].label)
  })

  it('recalculates selectedOption when it changes', async () => {
    const onInputChange = stub()
    const subject = await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onInputChange={onInputChange}
        selectedOption="0"
      />
    )

    const select = await SelectSingleLocator.find()
    const input = await select.find('input[type="text"]')

    expect(input.getDOMNode().value).to.equal(options[0].label)
    expect(onInputChange).to.not.have.been.called()

    await subject.setProps({
      selectedOption: '1'
    })

    expect(input.getDOMNode().value).to.equal(options[1].label)
    expect(onInputChange).to.have.been.calledOnce()
    expect(onInputChange.firstCall.args[0]).to.equal(null)
    expect(onInputChange.firstCall.args[1]).to.equal(options[1].label)
  })

  it(`when controlled, should clear input when selectedOption is changed to null`, async () => {
    const onChange = stub()
    const subject = await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onChange={onChange}
        selectedOption="0"
      />
    )

    const select = await SelectSingleLocator.find()
    const input = await select.find('input[type="text"]')

    expect(input.getDOMNode().value).to.equal(options[0].label)

    await subject.setProps({
      selectedOption: null
    })

    expect(input.getDOMNode().value).to.equal('')
  })

  it(`when controlled, should fire onChange appropriately`, async () => {
    const onChange = stub()
    const subject = await mount(
      <SelectSingle
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onChange={onChange}
        selectedOption="0"
      />
    )

    const select = await SelectSingleLocator.find()
    const input = await select.find('input[type="text"]')

    await subject.setProps({
      selectedOption: '1'
    })

    expect(input.getDOMNode().value).to.equal(options[1].label)
    expect(onChange).to.not.have.been.called()

    await input.click()
    await input.keyDown('down')
    await input.keyDown('enter')

    expect(input.getDOMNode().value).to.equal(options[2].label)
    expect(onChange).to.have.been.calledOnce()
  })

  describe('default option', async () => {
    it(`should update the input value if defaultSelectedOption is set and the options update`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectSingle
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          defaultSelectedOption="4"
        />
      )

      const select = await SelectSingleLocator.find()
      const input = await select.find('input[type="text"]')

      expect(input.getDOMNode().value).to.equal('')

      await subject.setProps({
        options: [
          ...options,
          { label: 'Argentina', children: 'Argentina', value: '4', id: '4' }
        ]
      })

      expect(input.getDOMNode().value).to.equal('Argentina')
    })

    it(`should update the input value if selectedOption is set and the options update`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectSingle
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          selectedOption="4"
        />
      )

      const select = await SelectSingleLocator.find()
      const input = await select.find('input[type="text"]')

      expect(input.getDOMNode().value).to.equal('')

      await subject.setProps({
        options: [
          ...options,
          { label: 'Argentina', children: 'Argentina', value: '4', id: '4' }
        ]
      })

      expect(input.getDOMNode().value).to.equal('Argentina')
    })

    it(`should update input value if selected option update`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectSingle
          label="Choose a vacation destination"
          options={[
            ...options,
            { label: 'Argentina', children: 'Argentina', value: '4', id: '4' },
          ]}
          filter={filter}
          selectedOption="4"
        />
      )

      const select = await SelectSingleLocator.find()
      const input = await select.find('input[type="text"]')

      expect(input.getDOMNode().value).to.equal('Argentina')

      await subject.setProps({
        options: [
          ...options,
          { label: 'Foo', children: 'Foo', value: '4', id: '4' },
        ],
      })

      expect(input.getDOMNode().value).to.equal('Foo')
    })

    it(`should not update input value if filter has been set`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectSingle
          editable
          label="Choose a vacation destination"
          options={[
            ...options,
            { label: 'Argentina', children: 'Argentina', value: '4', id: '4' },
          ]}
          filter={filter}
          selectedOption="4"
          constrain="window"
        />
      )

      const select = await SelectSingleLocator.find()
      const input = await select.find('input[type="text"]')

      await input.change({ target: { value: 'foo' } })
      expect(input.getDOMNode().value).to.equal('foo')

      await subject.setProps({
        options: [
          ...options,
          { label: 'Arub', children: 'Arub', value: '4', id: '4' },
        ],
      })

      expect(input.getDOMNode().value).to.equal('foo')

      await input.change({ target: { value: '' } })
      expect(input.getDOMNode().value).to.equal('')

      await subject.setProps({
        options: []
      })

      expect(input.getDOMNode().value).to.equal('')
    })

    it(`should render input value even if selected option cannot be found in options`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectSingle
          editable
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          selectedOption={{ label: 'Foo', children: 'Foo', value: '4', id: '4' }}
        />
      )

      const select = await SelectSingleLocator.find()
      const input = await select.find('input[type="text"]')

      expect(input.getDOMNode().value).to.equal('Foo')

      await subject.setProps({
        selectedOption: { label: 'Bar', children: 'Bar', value: '4', id: '4' },
      })

      expect(input.getDOMNode().value).to.equal('Bar')
    })

    it(`should be able to select option when options are loaded asynchronously`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectSingle
          editable
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          defaultSelectedOption="3"
        />
      )

      const select = await SelectSingleLocator.find()
      const input = await select.find('input[type="text"]')

      await input.change({ target: { value: 'f' } })

      await subject.setProps({
        options: [
          { label: 'Foo', children: 'Foo', value: '4', id: '4' },
        ]
      })

      expect(input.getDOMNode().value).to.equal('f')

      const item = await select.findOption()
      await item.keyDown('enter')

      await subject.setProps({
        options: []
      })

      expect(input.getDOMNode().value).to.equal('Foo')
    })

    it('should not override a selected option if the default option is set and the options update', async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectSingle
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          defaultSelectedOption="4"
          constrain="window"
        />
      )

      const select = await SelectSingleLocator.find()
      const input = await select.find('input[type="text"]')

      await input.click()

      const item = await select.findOption()
      await item.keyDown('enter')

      const value = input.getDOMNode().value

      await subject.setProps({
        options: [
          ...options,
          { label: 'Argentina', children: 'Argentina', value: '4', id: '4' }
        ]
      })

      expect(input.getDOMNode().value).to.equal(value)
    })
  })

  it('allowCustom permits arbitrary input', async () => {
    const label = 'Cuba'
    const onInputChange = spy((e) => {
      e.persist()
    })
    await mount(
      <SelectSingle
        allowCustom
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onInputChange={onInputChange}
      />
    )

    const select = await SelectSingleLocator.find()
    const input = await select.find('input[type="text"]')

    await input.change({ target: { value: label[0] } })

    expect(input.getDOMNode().value).to.equal(label[0])

    await input.change({ target: { value: label } })

    expect(onInputChange.secondCall).to.exist()
    expect(onInputChange.secondCall.args[0]).to.exist()
    expect(onInputChange.secondCall.args[0].target.value).to.equal(label)
    expect(onInputChange.secondCall.args[1]).to.equal(label)
    expect(input.getDOMNode().value).to.equal(label)
  })

  it('allowCustom sets selectedOption after some freeform entry', async () => {
    const label = 'Cuba'
    const onInputChange = stub()
    const subject = await mount(
      <SelectSingle
        allowCustom
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onInputChange={onInputChange}
      />
    )

    const select = await SelectSingleLocator.find()
    const input = await select.find('input[type="text"]')

    await input.change({ target: { value: label } })
    expect(input.getDOMNode().value).to.equal(label)

    await subject.setProps({
      selectedOption: '1'
    })

    expect(input.getDOMNode().value).to.equal('Jamaica')
  })

  it('allowCustom sets arbitrary text after selecting from options', async () => {
    let ref
    await mount(
      <SelectSingle
        allowCustom
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        selectedOption="1"
        componentRef={el => ref = el}
      />
    )

    const select = await SelectSingleLocator.find()
    const input = await select.find('input[type="text"]')

    expect(ref.value).to.equal(options[1].value)

    const newValue = ref.value + 'x'
    await input.change({ target: { value: newValue } })
    await input.blur()

    expect(input.getDOMNode().value).to.equal(newValue)
  })

  it('allowCustom selects option when typed input matches', async () => {
    const label = 'jamaica'
    const onChange = stub()
    const onInputChange = stub()
    await mount(
      <SelectSingle
        allowCustom
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onInputChange={onInputChange}
        onChange={onChange}
      />
    )

    const select = await SelectSingleLocator.find()
    const input = await select.find('input[type="text"]')
    // type in 'jamaica'
    await input.change({ target: { value: label } })
    // and the select's value is 'jamaica'
    expect(input.getDOMNode().value).to.equal('jamaica')
    // blur will cause the input to match an option
    await input.blur()

    await wait(() => {
      expect(onInputChange.callCount).to.equal(2)
    })

    expect(onInputChange.firstCall.args[1]).to.equal('jamaica')   // when the string was typed
    expect(onInputChange.secondCall.args[1]).to.equal('Jamaica')  // when it matched an option's label
    expect(input.getDOMNode().value).to.equal('Jamaica')
  })

  context('when options differ only in capitalization', async () => {
    const options = [{
      label: 'aruba', children: 'aruba', value: '0', id: '0'
    }, {
      label: 'Aruba', children: 'Aruba', value: '1', id: '1'
    }, {
      label: 'ARUBA', children: 'ARUBA', value: '2', id: '2'
    }]

    it('calls onChange once when an option is selected', async () => {
      const onChange = stub().callsFake(event => event && event.persist())
      await mount(
        <SelectSingle
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          onChange={onChange}
          constrain="window"
        />
      )

      const select = await SelectSingleLocator.find()
      const input = await select.find('input[type="text"]')

      await input.click()

      const items = await select.findAllOptions()

      await items[1].mouseOver({relatedTarget: null})

      await input.keyDown('enter')

      expect(onChange).to.have.been.calledOnce()
      expect(onChange.lastCall.args[1]).to.deep.include({ value: '1' })
    })
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      await mount(
        <SelectSingle
          label="Choose a vacation destination"
          options={options}
          filter={filter}
        />
      )

      const select = await SelectSingleLocator.find()
      const input = await select.findInput()
      await input.click()

      expect(await select.accessible()).to.be.true()
    })

    it('should set aria-invalid when errors prop is set', async () => {
      await mount(
        <SelectSingle
          editable
          messages={[{ type: 'error', text: 'some error message' }]}
          label="Choose a vacation destination"
          options={options}
          filter={filter}
        />
      )
      const select = await SelectSingleLocator.find()
      const input = await select.find('input[type="text"]')
      expect(input.getAttribute('aria-invalid')).to.exist()
    })
  })
})

