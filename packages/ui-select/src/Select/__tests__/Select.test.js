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
import { expect, mount, stub, wait, generateA11yTests } from '@instructure/ui-test-utils'

import { Select } from '../index'
import SelectLocator from '../locator'
import SelectExamples from '../__examples__/Select.examples'

describe('<Select />', async () => {
  beforeEach(async () => {
    stub(console, 'warn') // suppress experimental warnings
  })

  const lastCall = spy => spy.lastCall.args
  const defaultOptions = ['foo', 'bar', 'baz']
  const getOptions = (highlighted, selected, disabled) => (
    defaultOptions.map(opt => (
      <Select.Option
        id={opt}
        key={opt}
        isHighlighted={opt === highlighted}
        isSelected={opt === selected}
        isDisabled={opt === disabled}
      >
        {opt}
      </Select.Option>
    ))
  )

  it('should render an input and a list', async () => {
    await mount(
      <Select renderLabel="Choose an option" isShowingOptions>
        {getOptions()}
      </Select>
    )
    const select = await SelectLocator.find()
    const input = await select.findInput()
    const list = await select.findOptionsList()

    expect(input).to.exist()
    expect(list).to.exist()
  })

  it('should render groups', async () => {
    await mount(
      <Select renderLabel="Choose an option" isShowingOptions>
        <Select.Option id="0">ungrouped option one</Select.Option>
        <Select.Group renderLabel="Group one">
          <Select.Option id="1">grouped option one</Select.Option>
        </Select.Group>
        <Select.Group renderLabel="Group two">
          <Select.Option id="2">grouped option two</Select.Option>
        </Select.Group>
        <Select.Option id="3">ungrouped option two</Select.Option>
      </Select>
    )
    const select = await SelectLocator.find()
    const list = await select.findOptionsList()
    const listbox = await list.find('ul[role="listbox"]')
    const groups = await listbox.findAll('ul[role="group"]')
    const label = await listbox.find(':textContent("Group one")')

    expect(label.getAttribute('role')).to.equal('presentation')
    expect(groups[0].getAttribute('aria-labelledby')).to.equal(label.getAttribute('id'))
    expect(groups).to.have.length(2)
  })

  it('should ignore invalid children', async () => {
    const consoleError = stub(console, 'error')
    await mount(
      <Select renderLabel="Choose an option" isShowingOptions>
        <Select.Option id="0">valid</Select.Option>
        <div>invalid</div>
      </Select>
    )
    const select = await SelectLocator.find()
    const list = await select.findOptionsList()
    const div = await list.find(':textContent("invalid")', { expectEmpty: true })

    expect(div).to.not.exist()
    await wait(() => {
      expect(consoleError).to.have.been.calledWithMatch('Expected one of Group, Option')
    })
  })

  it('should provide a focus method', async () => {
    let selectRef
    await mount(
      <Select renderLabel="Choose an option" componentRef={(el) => { selectRef = el }}>
        {getOptions()}
      </Select>
    )
    const select = await SelectLocator.find()
    const input = await select.findInput()

    selectRef.focus()
    await wait(() => {
      expect(input.focused()).to.be.true()
    })
  })

  it('should provide a focused getter', async () => {
    let selectRef
    await mount(
      <Select renderLabel="Choose an option" componentRef={(el) => { selectRef = el }}>
        {getOptions()}
      </Select>
    )

    expect(selectRef.focused).to.be.false()

    selectRef.focus()
    await wait(() => {
      expect(selectRef.focused).to.be.true()
    })
  })

  describe('input', async () => {
    it('should render with a generated id by default', async () => {
      await mount(
        <Select renderLabel="Choose an option" />
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('id')).to.startWith('Select')
    })

    it('should render with a custom id if given', async () => {
      await mount(
        <Select renderLabel="Choose an option" id="customSelect" />
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('id')).to.equal('customSelect')
    })

    it('should render readonly when interaction="enabled" with no onInputChange', async () => {
      await mount(
        <Select renderLabel="Choose an option" />
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('readonly')).to.exist()
      expect(input.getAttribute('disabled')).to.not.exist()
    })

    it('should not render readonly when interaction="enabled" with onInputChange', async () => {
      await mount(
        <Select renderLabel="Choose an option" onInputChange={() => {}} />
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('readonly')).to.not.exist()
      expect(input.getAttribute('disabled')).to.not.exist()
    })

    it('should render readonly when interaction="readonly"', async () => {
      await mount(
        <Select
          renderLabel="Choose an option"
          interaction="readonly"
          onInputChange={() => {}}
        />
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('readonly')).to.exist()
      expect(input.getAttribute('disabled')).to.not.exist()
    })

    it('should render disabled when interaction="disabled"', async () => {
      await mount(
        <Select
          renderLabel="Choose an option"
          interaction="disabled"
          onInputChange={() => {}}
        />
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('disabled')).to.exist()
      expect(input.getAttribute('readonly')).to.not.exist()
    })

    it('should not render readonly when disabled', async () => {
      await mount(
        <Select
          renderLabel="Choose an option"
          interaction="disabled"
        />
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('disabled')).to.exist()
      expect(input.getAttribute('readonly')).to.not.exist()
    })

    it('should render required when isRequired={true}', async () => {
      await mount(
        <Select renderLabel="Choose an option" isRequired />
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('required')).to.exist()
    })

    it('should render with inputValue', async () => {
      const val = 'hello world'
      await mount(
        <Select renderLabel="Choose an option" inputValue={val} />
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('value')).to.equal(val)
    })

    it('should set aria-activedescendant based on the highlighted option', async () => {
      await mount(
        <Select
          renderLabel="Choose an option"
          isShowingOptions
        >
          {getOptions(defaultOptions[1])}
        </Select>
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('aria-activedescendant')).to.equal(defaultOptions[1])
    })

    it('should not set aria-activedescendant when not showing options', async () => {
      await mount(
        <Select renderLabel="Choose an option">
          {getOptions(defaultOptions[1])}
        </Select>
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('aria-activedescendant')).to.not.exist()
    })

    it('should set input role to "combobox"', async () => {
      await mount(
        <Select renderLabel="Choose an option">
          {getOptions(defaultOptions[1])}
        </Select>
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('role')).to.equal('combobox')
    })

    it('should allow assistive text', async () => {
      await mount(
        <Select renderLabel="Choose an option" assistiveText="hello world">
          {getOptions()}
        </Select>
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()
      const text = await select.find(':textContent("hello world")')

      expect(input.getAttribute('aria-describedby')).to.equal(text.getAttribute('id'))
    })

    it('should allow custom props to pass through', async () => {
      await mount(
        <Select renderLabel="Choose an option" data-custom-attr="true">
          {getOptions()}
        </Select>
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(input.getAttribute('data-custom-attr')).to.equal('true')
    })

    it('should provide a ref to the input element', async () => {
      const inputRef = stub()
      await mount(
        <Select renderLabel="Choose an option" inputRef={inputRef}>
          {getOptions()}
        </Select>
      )
      const select = await SelectLocator.find()
      const input = await select.findInput()

      expect(inputRef).to.have.been.calledWith(input.getDOMNode())
    })
  })

  describe('list', async () => {
    it('should set aria-selected on options with isSelected={true}', async () => {
      await mount(
        <Select
          renderLabel="Choose an option"
          isShowingOptions
        >
          {getOptions(null, defaultOptions[1])}
        </Select>
      )
      const select = await SelectLocator.find()
      const list = await select.findOptionsList()
      const options = await list.findAll('[role="option"]')

      expect(options[1].getAttribute('aria-selected')).to.equal('true')
    })

    it('should set aria-disabled on options when isDisabled={true}', async () => {
      await mount(
        <Select renderLabel="Choose an option" isShowingOptions>
          {getOptions(null, null, defaultOptions[2])}
        </Select>
      )
      const select = await SelectLocator.find()
      const list = await select.findOptionsList()
      const options = await list.findAll('[role="option"]')

      expect(options[0].getAttribute('aria-disabled')).to.not.exist()
      expect(options[2].getAttribute('aria-disabled')).to.equal('true')
    })

    it('should set list element role to "listbox"', async () => {
      await mount(
        <Select renderLabel="Choose an option" isShowingOptions>
          {getOptions()}
        </Select>
      )
      const select = await SelectLocator.find()
      const list = await select.findOptionsList()
      const listbox = await list.find('ul[role="listbox"]')

      expect(listbox).to.exist()
    })

    it('should provide a ref to the list element', async () => {
      const listRef = stub()
      await mount(
        <Select
          renderLabel="Choose an option"
          isShowingOptions
          listRef={listRef}
        >
          {getOptions()}
        </Select>
      )
      const select = await SelectLocator.find()
      const list = await select.findOptionsList()
      const listbox = await list.find('ul[role="listbox"]')

      expect(listRef).to.have.been.calledWith(listbox.getDOMNode())
    })
  })

  describe('with callbacks', async () => {
    describe('should fire onRequestShowOptions', async () => {
      it('when root is clicked' , async () => {
        const onRequestShowOptions = stub()
        const subject = await mount(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const label = await select.find('label')
        const icon = await select.find('[name="IconArrowOpenDown"]')

        await label.click()
        expect(onRequestShowOptions).to.have.been.calledOnce()

        await icon.click()
        expect(onRequestShowOptions).to.have.been.calledTwice()

        await subject.setProps({ isShowingOptions: true })

        await label.click()
        expect(onRequestShowOptions).to.have.been.calledTwice()
      })

      it('when input is clicked' , async () => {
        const onRequestShowOptions = stub()
        const subject = await mount(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.click()
        expect(onRequestShowOptions).to.have.been.calledOnce()

        await subject.setProps({ isShowingOptions: true })

        await input.click()
        expect(onRequestShowOptions).to.have.been.calledOnce()
      })

      it('when up/down arrows are pressed' , async () => {
        const onRequestShowOptions = stub()
        await mount(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.keyDown('down')
        expect(onRequestShowOptions).to.have.been.calledOnce()

        await input.keyDown('up')
        expect(onRequestShowOptions).to.have.been.calledTwice()
      })

      it('when space is pressed', async () => {
        const onRequestShowOptions = stub()
        const subject = await mount(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.keyDown('space')
        await subject.setProps({ isShowingOptions: true })
        await input.keyDown('space')

        expect(onRequestShowOptions).to.have.been.calledOnce()
      })
    })

    describe('should fire onRequestHideOptions', async () => {
      it('when root is clicked' , async () => {
        const onRequestHideOptions = stub()
        const subject = await mount(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestHideOptions={onRequestHideOptions}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const label = await select.find('label')
        const icon = await select.find('[name="IconArrowOpenUp"]')

        await label.click()
        expect(onRequestHideOptions).to.have.been.calledOnce()

        await icon.click()
        expect(onRequestHideOptions).to.have.been.calledTwice()

        await subject.setProps({ isShowingOptions: false })

        await label.click()
        expect(onRequestHideOptions).to.have.been.calledTwice()
      })

      it('when input is clicked' , async () => {
        const onRequestHideOptions = stub()
        const subject = await mount(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestHideOptions={onRequestHideOptions}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.click()
        expect(onRequestHideOptions).to.have.been.calledOnce()

        await subject.setProps({ isShowingOptions: false })

        await input.click()
        expect(onRequestHideOptions).to.have.been.calledOnce()
      })

      it('when escape is pressed' , async () => {
        const onRequestHideOptions = stub()
        await mount(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestHideOptions={onRequestHideOptions}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.keyUp('esc')
        expect(onRequestHideOptions).to.have.been.calledOnce()
      })
    })

    describe('should fire onRequestHighlightOption', async () => {
      it('when options are hovered' , async () => {
        const onRequestHighlightOption = stub()
        await mount(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestHighlightOption={onRequestHighlightOption}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const list = await select.findOptionsList()
        const options = await list.findAll('[role="option"]')

        await options[0].mouseOver()
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[0])

        await options[1].mouseOver()
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[1])
      })

      it('when up/down arrows are pressed' , async () => {
        const onRequestShowOptions = stub()
        const onRequestHighlightOption = stub()
        const subject = await mount(
          <Select
            renderLabel="Choose an option"
            onRequestShowOptions={onRequestShowOptions}
            onRequestHighlightOption={onRequestHighlightOption}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.keyDown('down')
        expect(onRequestShowOptions).to.have.been.calledOnce()
        expect(onRequestHighlightOption).to.not.have.been.called()

        await subject.setProps({ isShowingOptions: true })

        await input.keyDown('down')
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[0])

        await subject.setProps({
          children: getOptions(defaultOptions[0])
        })

        await input.keyDown('down')
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[1])

        await subject.setProps({
          children: getOptions(defaultOptions[1])
        })

        await input.keyDown('up')
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[0])

        // should skip disabled option...
        await subject.setProps({
          children: getOptions(defaultOptions[0], null, defaultOptions[1])
        })

        await input.keyDown('down')
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[2])

        await subject.setProps({
          children: getOptions(defaultOptions[2], null, defaultOptions[1])
        })

        await input.keyDown('up')
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[0])
      })

      it('when home/end is pressed' , async () => {
        const onRequestHighlightOption = stub()
        const subject = await mount(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestHighlightOption={onRequestHighlightOption}
          >
            {getOptions(defaultOptions[1])}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.keyDown('home')
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[0])

        await input.keyDown('end')
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[2])

        // with a disabled option...
        await subject.setProps({
          children: getOptions(null, null, defaultOptions[2])
        })

        await input.keyDown('end')
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[1])
      })

      it('when onRequestShowOptions is called with selected options' , async () => {
        const onRequestHighlightOption = stub()
        await mount(
          <Select
            renderLabel="Choose an option"
            onRequestHighlightOption={onRequestHighlightOption}
          >
            {getOptions(null, defaultOptions[1])}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.click()
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(defaultOptions[1])
      })
    })

    describe('should fire onRequestSelectOption', async () => {
      it('when enter is pressed' , async () => {
        const onRequestSelectOption = stub()
        await mount(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestSelectOption={onRequestSelectOption}
          >
            {getOptions(defaultOptions[1])}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.keyDown('enter')
        expect(lastCall(onRequestSelectOption)[1].id).to.equal(defaultOptions[1])
      })

      it('when options are clicked' , async () => {
        const onRequestSelectOption = stub()
        await mount(
          <Select
            renderLabel="Choose an option"
            isShowingOptions
            onRequestSelectOption={onRequestSelectOption}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const list = await select.findOptionsList()
        const options = await list.findAll('[role="option"]')

        await options[1].click()
        expect(lastCall(onRequestSelectOption)[1].id).to.equal(defaultOptions[1])
      })
    })

    describe('input callbacks', async () => {
      it('should fire onInputChange when input is typed in' , async () => {
        const onInputChange = stub()
        await mount(
          <Select
            renderLabel="Choose an option"
            onInputChange={onInputChange}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.typeIn('h')
        expect(onInputChange).to.have.been.called()
      })

      it('should fire onFocus when input gains focus' , async () => {
        const onFocus = stub()
        await mount(
          <Select
            renderLabel="Choose an option"
            onFocus={onFocus}
          >
            {getOptions()}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.focus()

        await wait(() => {
          expect(onFocus).to.have.been.called()
        })
      })

      it('should fire onKeyDown while preserving default behavior' , async () => {
        const onRequestHighlightOption = stub()
        const onKeyDown = stub()
        await mount(
          <Select
            isShowingOptions
            renderLabel="Choose an option"
            onRequestHighlightOption={onRequestHighlightOption}
            onKeyDown={onKeyDown}
          >
            {getOptions(defaultOptions[0])}
          </Select>
        )
        const select = await SelectLocator.find()
        const input = await select.findInput()

        await input.keyDown('down')
        await input.keyDown('a')

        expect(onRequestHighlightOption).to.have.been.calledOnce()
        expect(onKeyDown).to.have.been.calledTwice()
      })
    })
  })

  describe('with generated examples', async () => {
    generateA11yTests(SelectExamples)
  })
})
