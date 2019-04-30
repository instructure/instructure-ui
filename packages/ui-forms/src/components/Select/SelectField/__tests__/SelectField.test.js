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
import SelectField from '../index'
import optionsListStyles from '../../SelectOptionsList/styles.css'
import styles from '../styles.css'

import PositionLocator from '@instructure/ui-layout/lib/Position/locator'

const InputLocator = locator('input[type="text"]')
const OptionsListLocator = locator('ul')
const OptionsLocator = locator('li')

const SelectFieldLocator = locator(SelectField.selector, {
  findInput: (...args) => InputLocator.find(...args),
  findOptionsList: async (element, ...args) => {
    const content = await PositionLocator.findContent(element)
    return content ? OptionsListLocator.find(content.getDOMNode(), ...args) : null
  },
  findOption: async (element, ...args) => {
    const content = await PositionLocator.findContent(element)
    return content ? OptionsLocator.find(content.getDOMNode(), ...args) : null
  },
  findAllOptions: async (element, ...args) => {
    const content = await PositionLocator.findContent(element)
    return content ? OptionsLocator.findAll(content.getDOMNode(), ...args) : null
  }
})

describe('<SelectField />', async () => {
  const options = [{
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
  }]

  it('should include a label', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    expect(await selectField.find('label')).to.exist()
  })

  it('should not render label implicitly', async () => {
    // Verify that the input is not wrapped by a label
    // element as this causes issues with a11y
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    expect(await input.findParent('label', { expectEmpty: true })).to.not.exist()
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = stub()
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        inputRef={inputRef}
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    expect(inputRef).to.have.been.calledWith(input.getDOMNode())
  })

  it('should provide an expanded getter', async () => {
    let selectField
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        componentRef={(el) => { selectField = el }}
        options={options}
        constrain="window"
      />
    )

    expect(selectField.expanded).to.be.false()
  })

  it('should provide a placement getter', async () => {
    let selectField
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        componentRef={(el) => { selectField = el }}
        options={options}
        constrain="window"
      />
    )

    expect(selectField.placement).to.exist()
  })

  it('placement should be `bottom stretch` by default', async () => {
    await mount(
      <div style={{padding: '200px 0'}}>
        <SelectField
          closeOnSelect
          label="Choose a state"
          options={options}
          constrain="window"
        />
      </div>
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()

    const menu = await selectField.findOptionsList()

    await wait(() => {
      expect(input.getBoundingClientRect().top).to.be.lessThan(menu.getBoundingClientRect().top)
    })
  })

  it('placement should be accepted as a prop', async () => {
    await mount(
      <div style={{ padding: '200px 0' }}>
        <SelectField
          closeOnSelect
          label="Choose a state"
          placement="top stretch"
          options={options}
          constrain="window"
        />
      </div>
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()

    const menu = await selectField.findOptionsList()

    expect(input.getBoundingClientRect().top).to.not.be.lessThan(menu.getBoundingClientRect().top)
  })

  it('expands when input is clicked', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })
  })

  it('expands when input layout is clicked', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()
    const layout = await selectField.find(`.${styles.inputLayout}`)

    await layout.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })
  })

  it('expands when label is clicked', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()
    const label = await selectField.find('label:contains(Choose a state)')

    await label.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })
  })

  it('expands on keyDown ArrowDown', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.keyDown('down')
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })
  })

  it('expands on keyDown ArrowUp', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.keyDown('up')
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })
  })

  it('expands on change', async () => {
    await mount(
      <SelectField
        editable
        closeOnSelect
        label="Choose a state"
        options={options}
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.change({ target: { value: 'a' } })
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })
  })

  it('does not expand when disabled', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        disabled
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('false')
    })
  })

  it('does not expand when readOnly', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        readOnly
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('false')
    })
  })

  it('closes when input is clicked', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })

    await input.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('false')
    })
  })

  it('closes when input layout is clicked', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()
    const layout = await selectField.find(`.${styles.inputLayout}`)

    await layout.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })

    await layout.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('false')
    })
  })

  it('closes when label is clicked', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()
    const label = await selectField.find('label:contains(Choose a state)')

    await label.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })

    await label.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('false')
    })
  })

  it('closes on blur', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })

    await input.blur()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('false')
    })
  })

  it('closes on Escape key', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('true')
    })

    await input.keyUp('esc')
    await wait(() => {
      expect(input.getAttribute('aria-expanded')).to.equal('false')
    })
  })

  it('returns focus to input on close', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()

    await input.keyDown('down')
    expect(input.focused()).to.be.false()

    await input.keyUp('esc')
    expect(input.focused()).to.be.true()
  })

  describe('selecting, highlighting, and loading options', () => {
    it('changes highlights with arrows and selects with Enter', async () => {
      const onSelect = spy((e) => {
        e.persist()
      })
      await mount(
        <SelectField
          closeOnSelect
          label="Choose a state"
          onSelect={onSelect}
          options={options}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.click()

      const items = await selectField.findAllOptions()

      await input.keyDown('down')
      expect(items[1].getDOMNode().className).to.include(optionsListStyles.highlighted)

      await input.keyDown('up')
      expect(items[0].getDOMNode().className).to.include(optionsListStyles.highlighted)

      expect(onSelect).to.not.have.been.called()

      await input.keyDown('down')
      await input.keyDown('enter')

      const value = '1'
      const label = 'Alaska'
      expect(onSelect).to.have.been.calledOnce()
      expect(onSelect.firstCall.args[0].target).to.exist()
      expect(onSelect.firstCall.args[1]).to.deep.equal({ value, label, id: value, children: label })
    })

    it('changes highlights with Home & End keys', async () => {
      await mount(
        <SelectField
          closeOnSelect
          label="Choose a state"
          options={options}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.click()

      const items = await selectField.findAllOptions()

      await input.keyDown('end')
      expect(items[2].getDOMNode().className).to.include(optionsListStyles.highlighted)

      await input.keyDown('home')
      expect(items[0].getDOMNode().className).to.include(optionsListStyles.highlighted)
    })

    it('highlights selectedOption when expanding', async () => {
      const value = '1'
      const label = 'Alaska'
      await mount(
        <SelectField
          closeOnSelect
          label="Choose a state"
          options={options}
          selectedOption={{ value, label, id: value, children: label }}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.click()

      const items = await selectField.findAllOptions()
      expect(items[1].getDOMNode().className).to.include(optionsListStyles.highlighted)
    })

    it(`should highlight first option when options are loaded asynchronously`, async () => {
      const highlight = stub()
      const subject = await mount(
        <SelectField
          editable
          closeOnSelect
          label="Choose a state"
          options={[]}
          onHighlight={highlight}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.typeIn('a')

      await subject.setProps({
        options: [{ label: 'Alabama', value: '0', id: '0', children: 'Alabama' }]
      })

      await input.click()
      expect(highlight).to.have.been.calledWith(0)
    })

    it('renders only emptyOption prop in menu when options are empty', async () => {
      const emptyOption = 'Oops! you seem to not have any options available'
      await mount(
        <SelectField
          editable
          closeOnSelect
          label="Choose a state"
          options={[]}
          emptyOption={emptyOption}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.click()

      const item = await selectField.findOption()
      expect(item.getTextContent()).to.equal(emptyOption)
    })

    it('renders only Spinner when loading is true', async () => {
      const loadingText = 'Loading options'
      await mount(
        <SelectField
          editable
          closeOnSelect
          label="Choose a state"
          loadingText={loadingText}
          constrain="window"
          options={[{ id: '1', label: 'option 1', value: '1' }, { id: '2', label: 'option 2', value: '2' }]}
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.click()

      const item = await selectField.findOption()
      expect(item.getTextContent()).to.equal(loadingText)
    })

    it('does not change highlight when there are no options', async () => {
      const highlight = stub()
      await mount(
        <SelectField
          editable
          closeOnSelect
          label="Choose a state"
          options={[]}
          onHighlight={highlight}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.click()

      await input.keyDown('end')
      await input.keyDown('home')
      await input.keyDown('down')
      await input.keyDown('up')

      expect(highlight).to.not.have.been.called()
    })

    it('should not close the options list when closeOnSelect is false', async () => {
      await mount(
        <SelectField
          closeOnSelect={false}
          label="Choose a state"
          options={options}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.click()

      const option = await selectField.findOption()
      await option.keyDown('enter')

      await wait(() => {
        expect(input.getAttribute('aria-expanded')).to.equal('true')
      })
    })

    it('should call onSelect but not onClick when an option is selected', async () => {
      const onSelect = stub()
      const onClick = stub()

      await mount(
        <SelectField
          closeOnSelect
          label="Choose a state"
          options={options}
          onSelect={onSelect}
          onClick={onClick}
          constrain="window"
        />
      )

      expect(onSelect).to.not.have.been.called()
      expect(onClick).to.not.have.been.called()

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.click()

      // onClick gets called once when we expand the input
      expect(onSelect).to.not.have.been.called()
      expect(onClick).to.have.been.calledOnce()

      const option = await selectField.findOption()
      await option.keyDown('enter')

      // onSelect gets called, onClick still should have only been called once
      expect(onSelect).to.have.been.calledOnce()
      expect(onClick).to.have.been.calledOnce()
    })
  })

  it('should preventDefault onKeyDown of Enter when expanded', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    await input.click()

    const event = await input.keyDown('enter')
    expect(event.preventDefault).to.have.been.called()
  })

  it('should not preventDefault onKeyDown of Enter when collapsed', async () => {
    await mount(
      <SelectField
        closeOnSelect
        label="Choose a state"
        options={options}
        constrain="window"
      />
    )

    const selectField = await SelectFieldLocator.find()
    const input = await selectField.findInput()

    const event = await input.keyDown('enter')
    expect(event.preventDefault).to.not.have.been.called()
  })

  describe('events', async () => {
    it('calls onPositioned event', async () => {
      const onPositioned = stub()
      await mount(
        <SelectField
          closeOnSelect
          label="Choose a state"
          options={options}
          onPositioned={onPositioned}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.click()

      await wait(() => {
        expect(onPositioned).to.have.been.called()
      })
    })

    it('responds to onInputChange event', async () => {
      const onInputChange = spy((e) => {
        e.persist()
      })
      await mount(
        <SelectField
          editable
          closeOnSelect
          label="Choose a state"
          options={options}
          onInputChange={onInputChange}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.change({ target: { value: 'a' } })

      expect(onInputChange).to.have.been.called()
      expect(onInputChange.firstCall.args[0].type).to.equal('change')
      expect(onInputChange.firstCall.args[1]).to.equal('a')
    })

    it('responds to onBlur event', async () => {
      const onBlur = stub()
      await mount(
        <SelectField
          closeOnSelect
          label="Choose a state"
          options={options}
          onBlur={onBlur}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.blur()
      expect(onBlur).to.have.been.called()
    })

    it('responds to onFocus event', async () => {
      const onFocus = stub()
      await mount(
        <SelectField
          closeOnSelect
          label="Choose a state"
          options={options}
          onFocus={onFocus}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      await input.focus()
      expect(onFocus).to.have.been.called()
    })
  })

  describe('for a11y', async () => {
    it('should meet standards when closed', async () => {
      await mount(
        <SelectField
          closeOnSelect
          label="Choose a state"
          options={options}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()

      expect(await selectField.accessible()).to.be.true()
    })

    it('should meet standards when open', async () => {
      await mount(
        <SelectField
          closeOnSelect
          label="Choose a state"
          options={options}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      await selectField.click()

      expect(await selectField.accessible()).to.be.true()
    })

    it('should set aria-invalid when errors prop is set', async () => {
      await mount(
        <SelectField
          closeOnSelect
          messages={[{ type: 'error', text: 'some error message' }]}
          label="Choose a state"
          options={options}
          constrain="window"
        />
      )

      const selectField = await SelectFieldLocator.find()
      const input = await selectField.findInput()

      expect(input.getAttribute('aria-invalid')).to.exist()
    })
  })
})
