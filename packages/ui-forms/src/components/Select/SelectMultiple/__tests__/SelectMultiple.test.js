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
import { locator, expect, mount, stub, spy } from '@instructure/ui-test-utils'
import SelectMultiple from '../index'

import PositionLocator from '@instructure/ui-layout/lib/components/Position/locator'

const InputLocator = locator('input[type="text"]')
const OptionsLocator = locator('li')

const SelectMultipleLocator = locator(SelectMultiple.selector, {
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

describe('<SelectMultiple />', async () => {
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
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
      />
    )

    expect(await SelectMultipleLocator.find()).to.exist()
  })

  it('should focus the input when focus is called', async () => {
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
      />
    )

    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await select.focus()
    expect(input.focused()).to.be.true()
  })

  it('should provide an focused getter', async () => {
    let selectMultiple
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        componentRef={(el) => { selectMultiple = el }}
      />
    )
    expect(selectMultiple.focused).to.be.false()
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = stub()
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        inputRef={inputRef}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    expect(inputRef).to.have.been.calledWith(input.getDOMNode())
  })

  it('resets input value to empty when closing the menu with selectedOption', async () => {
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        selectedOption={['1']}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.click()

    input.getDOMNode().value = 'Arub'

    await input.keyUp('esc')
    expect(input.getDOMNode().value).to.equal('')
  })

  it('resets input value to empty when closing the menu with no selectedOption', async () => {
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.click()

    input.getDOMNode().value = 'Arub'

    await input.keyUp('esc')
    expect(input.getDOMNode().value).to.equal('')
  })

  it('calls onChange when closing the menu and the input matches an option', async () => {
    const value = '0'
    const label = 'Aruba'
    const onChange = spy((e) => {
      e.persist()
    })
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onChange={onChange}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.click()

    input.getDOMNode().value = label

    await input.keyUp('esc')
    expect(onChange.firstCall).to.exist()
    expect(onChange.firstCall.args[0]).to.exist()

    const selectedOptionArg = onChange.firstCall.args[1]
    expect(selectedOptionArg.length).to.equal(1)
    expect(selectedOptionArg[0]).to.deep.equal({ value, label, id: value, children: label })
  })

  it('calls onInputChange when input changes', async () => {
    const label = 'Aruba'
    const onInputChange = spy((e) => {
      e.persist()
    })
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onInputChange={onInputChange}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.change({ target: { value: label } })

    expect(onInputChange).to.have.been.called()
    expect(onInputChange.firstCall).to.exist()
    expect(onInputChange.firstCall.args[0]).to.exist()
    expect(onInputChange.firstCall.args[0].target.value).to.equal(label)
    expect(onInputChange.firstCall.args[1]).to.equal(label)
  })

  it('filters the options when input changes', async () => {
    const label = 'ARU'
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.change({ target: { value: label } })

    const items = await select.findAllOptions()
    expect(items.length).to.equal(1)
  })

  it('resets the options when closing the menu without a selection', async () => {
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.change({ target: { value: 'Arub' } })

    expect((await select.findAllOptions()).length).to.equal(1)

    await input.keyUp('esc')

    const tag = await select.find('button[title="Aruba"]', {expectEmpty: true})

    expect(tag).to.not.exist()
  })

  it('responds to selection done by SelectField', async () => {
    const onInputChange = stub()
    const onChange = spy((e) => {
      e.persist()
    })
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onChange={onChange}
        onInputChange={onInputChange}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.click()

    await input.change({ target: { value: 'Arub' } })

    const items = await select.findAllOptions()

    expect(items.length).to.equal(1)

    expect((await select.findAll('button', {expectEmpty: true})).length).to.equal(0)

    await items[0].keyDown('enter')

    expect(onChange.firstCall).to.exist()
    expect(onChange.firstCall.args[1][0]).to.equal(options[0])
    expect(onInputChange.lastCall).to.exist()
    expect(onInputChange.lastCall.args[1]).to.equal('')

    expect((await select.findAll('button')).length).to.equal(1)
  })

  it('selection is additive', async () => {
    const onChange = spy((e) => {
      e.persist()
    })
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onChange={onChange}
        constrain="window"
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.click()

    let opts = await select.findAllOptions()

    expect(opts.length).to.equal(4)

    await opts[0].keyDown('enter')

    expect(onChange.getCall(0).args[1]).to.deep.equal([options[0]])
    expect(select).to.contain(':withLabel(Aruba)')

    await input.click()

    opts = await select.findAllOptions()

    expect(opts.length).to.equal(3)

    await opts[0].keyDown('enter')

    expect(select).to.contain(':withLabel(Jamaica)')
    expect(select).to.have.exactly(2).descendants('button')
    expect(onChange.getCall(1).args[1]).to.deep.equal([options[0], options[1]])
  })

  it(`when controlled, shouldn't update Tags by itself`, async () => {
    // prevents the error that is fired when you select an option that isn't in the options list
    // TODO: look into this more (should we even output this error?)
    stub(console, 'error')

    const onChange = spy((e) => {
      e.persist()
    })
    const selectedOption = [{
      value: '5', label: 'Montego'
    }]
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onChange={onChange}
        selectedOption={selectedOption}
        constrain="window"
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.click()

    expect((await select.findAll('button')).length).to.equal(1)
    expect(await select.findAll('button[title="Montego"]')).to.exist()

    const item = await select.findOption()
    await item.keyDown('enter')

    expect(onChange.firstCall).to.exist()
    expect(onChange.firstCall.args[1]).to.deep.equal([...selectedOption, options[0]])
    expect((await select.findAll('button')).length).to.equal(1)
  })

  it(`when controlled, should only update Tags when selectedOption props changes`, async () => {
    // prevents the error that is fired when you select an option that isn't in the options list
    // TODO: look into this more (should we even output this error?)
    stub(console, 'error')

    const onChange = stub()
    const selectedOption = [{
      value: '5', label: 'Montego'
    }]
    const newSelection = {
      value: '4', label: 'Key Largo'
    }
    const subject = await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onChange={onChange}
        selectedOption={selectedOption}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    await input.click()

    expect((await select.findAll('button')).length).to.equal(1)
    expect(await select.findAll('button[title="Montego"]')).to.exist()

    await subject.setProps({
      selectedOption: [...selectedOption, newSelection]
    })

    expect((await select.findAll('button')).length).to.equal(2)
  })

  it('renders Tags for each selectedOption', async () => {
    // prevents the error that is fired when you select an option that isn't in the options list
    // TODO: look into this more (should we even output this error?)
    stub(console, 'error')

    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        selectedOption={[
          {
            value: '4', label: 'Key Largo'
          }, {
            value: '5', label: 'Montego'
          }, {
            value: '6', label: 'Baby why dont we go'
          }
        ]}
      />
    )
    const select = await SelectMultipleLocator.find()
    expect((await select.findAll('button')).length).to.equal(3)
  })

  it('handles dismissing Tags', async () => {
    // prevents the error that is fired when you select an option that isn't in the options list
    // TODO: look into this more (should we even output this error?)
    stub(console, 'error')

    const onChange = stub()
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onChange={onChange}
        selectedOption={[
          {
            value: '4', label: 'Key Largo'
          }, {
            value: '5', label: 'Montego'
          }, {
            value: '6', label: 'Baby why dont we go'
          }]
        }
      />
    )
    const select = await SelectMultipleLocator.find()
    const tags = await select.findAll('button')

    await tags[1].click()

    expect(onChange.firstCall).to.exist()
    const selectedOptionArg = onChange.firstCall.args[1]
    expect(selectedOptionArg.length).to.equal(2)
  })

  it('allows tags to be non-dismissible', async () => {
    // prevents the error that is fired when you select an option that isn't in the options list
    // TODO: look into this more (should we even output this error?)
    stub(console, 'error')

    const onChange = stub()
    await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        onChange={onChange}
        selectedOption={[{value: '4', label: 'Key Largo', dismissible: false}]
        }
      />
    )
    const select = await SelectMultipleLocator.find()

    expect(await select.find('button', {expectEmpty: true})).to.not.exist()
    expect(await select.find('[title="Key Largo"]')).to.exist()
  })

  it('recalculates selectedOption when it changes', async () => {
    const subject = await mount(
      <SelectMultiple
        editable
        label="Choose a vacation destination"
        options={options}
        filter={filter}
        selectedOption={['0']}
      />
    )
    const select = await SelectMultipleLocator.find()
    const input = await select.findInput()

    expect(input.getDOMNode().value).to.equal('')
    expect((await select.find('button')).getAttribute('title')).to.equal(options[0].label)

    await subject.setProps({
      selectedOption: ['1']
    })

    expect(input.getDOMNode().value).to.equal('')
    expect((await select.find('button')).getAttribute('title')).to.equal(options[1].label)
  })

  describe('default options', async () => {
    it(`updates the selected options when defaultSelectedOption is set and the options update`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectMultiple
          editable
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          defaultSelectedOption={['4', '5']}
        />
      )
      const select = await SelectMultipleLocator.find()
      const input = await select.findInput()

      expect(input.getDOMNode().value).to.equal('')
      expect(await select.find('button', {expectEmpty: true})).to.not.exist()

      await subject.setProps({
        options: [
          ...options,
          { label: 'Argentina', children: 'Argentina', value: '4', id: '4' },
          { label: 'Uruguay', children: 'Uruguay', value: '5', id: '5' }
        ]
      })

      expect((await select.findAll('button')).length).to.equal(2)
      expect(await select.find('button[title="Argentina"]')).to.exist()
      expect(await select.find('button[title="Uruguay"]')).to.exist()
    })

    it(`updates the selected options when selectedOption is set and the options update`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectMultiple
          editable
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          selectedOption={['4', '5']}
        />
      )
      const select = await SelectMultipleLocator.find()
      const input = await select.findInput()

      expect(input.getDOMNode().value).to.equal('')
      expect(await select.find('button', {expectEmpty: true})).to.not.exist()

      await subject.setProps({
        options: [
          ...options,
          { label: 'Argentina', children: 'Argentina', value: '4', id: '4' },
          { label: 'Uruguay', children: 'Uruguay', value: '5', id: '5' }
        ]
      })

      expect((await select.findAll('button')).length).to.equal(2)
      expect(await select.find('button[title="Argentina"]')).to.exist()
      expect(await select.find('button[title="Uruguay"]')).to.exist()
    })


    it('updates the input values if selected options update', async () => {
      const subject = await mount(
        <SelectMultiple
          editable
          label="Choose a vacation destination"
          options={[
            ...options,
            { label: 'Argentina', children: 'Argentina', value: '4', id: '4' },
            { label: 'Uruguay', children: 'Uruguay', value: '5', id: '5' },
          ]}
          filter={filter}
          selectedOption={['4', '5']}
        />
      )
      const select = await SelectMultipleLocator.find()

      expect((await select.findAll('button')).length).to.equal(2)
      expect(await select.find('button[title="Argentina"]')).to.exist()
      expect(await select.find('button[title="Uruguay"]')).to.exist()

      await subject.setProps({
        options: [
          ...options,
          { label: 'Foo', children: 'Foo', value: '4', id: '4' },
          { label: 'Bar', children: 'Bar', value: '5', id: '5' },
        ]
      })

      expect((await select.findAll('button')).length).to.equal(2)
      expect(await select.find('button[title="Foo"]')).to.exist()
      expect(await select.find('button[title="Bar"]')).to.exist()
    })

    it(`should render input values even if selected options cannot be found in options`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectMultiple
          editable
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          selectedOption={[
            { label: 'Foo', children: 'Foo', value: '4', id: '4' },
            { label: 'Bar', children: 'Bar', value: '5', id: '5' }
          ]}
        />
      )
      const select = await SelectMultipleLocator.find()

      expect((await select.findAll('button')).length).to.equal(2)
      expect(await select.find('button[title="Foo"]')).to.exist()
      expect(await select.find('button[title="Bar"]')).to.exist()

      await subject.setProps({
        selectedOption: [
          '3',
          { label: 'Baz', children: 'Baz', value: '5', id: '5' },
        ],
      })

      expect((await select.findAll('button')).length).to.equal(2)
      expect(await select.find('button[title="Bahama"]')).to.exist()
      expect(await select.find('button[title="Baz"]')).to.exist()
    })

    it(`should be able to select option when options are loaded asynchronously`, async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const subject = await mount(
        <SelectMultiple
          editable
          label="Choose a vacation destination"
          options={options}
          filter={filter}
          defaultSelectedOption={['1', '2']}
        />
      )
      const select = await SelectMultipleLocator.find()
      const input = await select.findInput()

      await input.focus()
      await input.typeIn('f')

      expect(await select.find('button[title="Jamaica"]')).to.exist()
      expect(await select.find('button[title="Bermuda"]')).to.exist()
      expect(input.getDOMNode().value).to.equal('f')

      await subject.setProps({
        options: [
          { label: 'Foo', children: 'Foo', value: '4', id: '4' },
        ],
      })

      const item = await select.findOption()
      await item.keyDown('enter')

      await subject.setProps({
        options: [],
      })

      expect((await select.findAll('button')).length).to.equal(3)
      expect(await select.find('button[title="Jamaica"]')).to.exist()
      expect(await select.find('button[title="Bermuda"]')).to.exist()
      expect(await select.find('button[title="Foo"]')).to.exist()
    })

    it('updates correctly when default options are provided and some of the corresponding options are loaded later', async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const testOptions = [
        ...options,
        { label: 'Argentina', children: 'Argentina', value: '4', id: '4' }
      ]
      const subject = await mount(
        <SelectMultiple
          editable
          label="Choose a vacation destination"
          options={testOptions}
          filter={filter}
          defaultSelectedOption={['4', '5']}
        />
      )
      const select = await SelectMultipleLocator.find()

      expect((await select.findAll('button')).length).to.equal(1)
      expect(await select.find('button[title="Argentina"]')).to.exist()

      await subject.setProps({
        options: [
          ...testOptions,
          { label: 'Uruguay', children: 'Uruguay', value: '5', id: '5' }
        ]
      })

      expect((await select.findAll('button')).length).to.equal(2)
      expect(await select.find('button[title="Uruguay"]')).to.exist()
    })

    it('does not re render option when a default option has been dismissed and the options update', async () => {
      // prevents the error that is fired when you select an option that isn't in the options list
      // TODO: look into this more (should we even output this error?)
      stub(console, 'error')

      const testOptions = [
        ...options,
        { label: 'Argentina', children: 'Argentina', value: '4', id: '4' }
      ]
      const subject = await mount(
        <SelectMultiple
          editable
          label="Choose a vacation destination"
          options={testOptions}
          filter={filter}
          defaultSelectedOption={['4', '5']}
        />
      )
      const select = await SelectMultipleLocator.find()

      const tag = await select.find('button')
      await tag.click()

      expect(await select.find('button', {expectEmpty: true})).to.not.exist()

      await subject.setProps({
        options: [
          ...testOptions,
          { label: 'Uruguay', children: 'Uruguay', value: '5', id: '5' }
        ]
      })

      expect((await select.findAll('button')).length).to.equal(1)
      expect(await select.find('button[title="Uruguay"]')).to.exist()
      expect(await select.find('button[title="Argentina"]', {expectEmpty: true})).to.not.exist()
    })
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      await mount(
        <SelectMultiple
          editable
          label="Choose a vacation destination"
          options={options}
          filter={filter}
        />
      )

      const select = await SelectMultipleLocator.find()
      const input = await select.findInput()
      await input.click()

      expect(await select.accessible()).to.be.true()
    })

    it('should set aria-invalid when errors prop is set', async () => {
      await mount(
        <SelectMultiple
          editable
          messages={[{ type: 'error', text: 'some error message' }]}
          label="Choose a vacation destination"
          options={options}
          filter={filter}
        />
      )
      const select = await SelectMultipleLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('aria-invalid')).to.exist()
    })
  })
})

