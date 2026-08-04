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

import { fireEvent } from '@testing-library/dom'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  MockInstance
} from 'vitest'
import { CheckInstUIIcon } from '@instructure/ui-icons'

import { SimpleSelect } from '@instructure/ui-simple-select/latest'

type ExampleOption = 'foo' | 'bar' | 'baz'
const defaultOptions: ExampleOption[] = ['foo', 'bar', 'baz']

const getOptions = (disabled?: ExampleOption) =>
  defaultOptions.map((opt) => (
    <SimpleSelect.Option
      id={opt}
      key={opt}
      value={opt}
      isDisabled={opt === disabled}
    >
      {opt}
    </SimpleSelect.Option>
  ))

describe('<SimpleSelect />', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should render an input and a list', async () => {
    await render(
      <SimpleSelect renderLabel="Choose an option">{getOptions()}</SimpleSelect>
    )
    const input = page.getByLabelText('Choose an option').element()
    const listInitial = page.getByRole('listbox').query()

    expect(listInitial).not.toBeInTheDocument()
    expect(input).toBeInTheDocument()

    await userEvent.click(input)

    await vi.waitFor(() => {
      const list = page.getByRole('listbox').query()

      expect(list).toBeInTheDocument()
    })
  })

  it('should render groups', async () => {
    await render(
      <SimpleSelect renderLabel="Choose an option">
        <SimpleSelect.Option id="0" value="0">
          ungrouped option one
        </SimpleSelect.Option>
        <SimpleSelect.Group renderLabel="Group one">
          <SimpleSelect.Option id="1" value="1">
            grouped option one
          </SimpleSelect.Option>
        </SimpleSelect.Group>
        <SimpleSelect.Group renderLabel="Group two">
          <SimpleSelect.Option id="2" value="2">
            grouped option two
          </SimpleSelect.Option>
        </SimpleSelect.Group>
        <SimpleSelect.Option id="3" value="3">
          ungrouped option two
        </SimpleSelect.Option>
      </SimpleSelect>
    )
    const input = page.getByLabelText('Choose an option').element()

    await userEvent.click(input)

    await vi.waitFor(() => {
      const groups = page.getByRole('group').elements()
      const labelOne = page.getByText('Group one').element()
      const labelOneID = labelOne.getAttribute('id')

      expect(groups.length).toBe(2)
      expect(groups[0]).toHaveAttribute('aria-labelledby', labelOneID)
      expect(labelOne).toHaveAttribute('role', 'presentation')
    })
  })

  it('should ignore invalid children', async () => {
    await render(
      <SimpleSelect renderLabel="Choose an option">
        <SimpleSelect.Option id="0" value={0}>
          valid
        </SimpleSelect.Option>
        <div>invalid</div>
      </SimpleSelect>
    )
    const input = page.getByLabelText('Choose an option').element()

    await userEvent.click(input)

    await vi.waitFor(() => {
      const invalidChild = page.getByText('invalid').query()

      expect(invalidChild).not.toBeInTheDocument()
    })
  })

  it('should fire onFocus when input gains focus', async () => {
    const onFocus = vi.fn()
    await render(
      <SimpleSelect renderLabel="Choose an option" onFocus={onFocus}>
        {getOptions()}
      </SimpleSelect>
    )
    const input = page.getByLabelText('Choose an option').element()

    input.focus()

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalled()
    })
  })

  describe('input', () => {
    it('should render with a custom id if given', async () => {
      await render(
        <SimpleSelect renderLabel="Choose an option" id="customSelect" />
      )
      const input = page.getByLabelText('Choose an option').element()

      expect(input).toHaveAttribute('id', 'customSelect')
    })

    it('should always render readonly', async () => {
      await render(
        <SimpleSelect renderLabel="Choose an option" interaction="enabled" />
      )
      const input = page.getByLabelText('Choose an option').element()

      expect(input).toHaveAttribute('readonly')
      expect(input).not.toHaveAttribute('disabled')
    })

    it('should render disabled when interaction="disabled"', async () => {
      await render(
        <SimpleSelect renderLabel="Choose an option" interaction="disabled" />
      )
      const input = page.getByLabelText('Choose an option').element()

      expect(input).toHaveAttribute('disabled')
      expect(input).not.toHaveAttribute('readonly')
    })

    it('should render required when isRequired={true}', async () => {
      await render(<SimpleSelect renderLabel="Choose an option" isRequired />)
      const input = page.getByLabelText('Choose an option *').element()

      expect(input).toHaveAttribute('required')
    })

    it('should allow assistive text', async () => {
      await render(
        <SimpleSelect
          renderLabel="Choose an option"
          assistiveText="hello world"
        >
          {getOptions()}
        </SimpleSelect>
      )
      const input = page.getByLabelText('Choose an option').element()
      const assistiveText = page.getByText('hello world').element()
      const assistiveTextID = assistiveText.getAttribute('id')

      expect(input).toHaveAttribute('aria-describedby', assistiveTextID)
    })

    it('should allow custom props to pass through', async () => {
      await render(
        <SimpleSelect renderLabel="Choose an option" data-custom-attr="true">
          {getOptions()}
        </SimpleSelect>
      )
      const input = page.getByLabelText('Choose an option').element()

      expect(input).toHaveAttribute('data-custom-attr', 'true')
    })

    it('should provide a ref to the input element', async () => {
      const inputRef = vi.fn()

      await render(
        <SimpleSelect renderLabel="Choose an option" inputRef={inputRef}>
          {getOptions()}
        </SimpleSelect>
      )
      const input = page.getByLabelText('Choose an option').element()

      expect(inputRef).toHaveBeenCalledWith(input)
    })
  })

  it('should render icons before option and call renderBeforeLabel callback with necessary props', async () => {
    const renderBeforeLabel = vi.fn(() => (
      <CheckInstUIIcon data-testid="option-icon" />
    ))

    await render(
      <SimpleSelect renderLabel="Choose an option">
        <SimpleSelect.Option
          id="option-1"
          value="1"
          isDisabled
          renderBeforeLabel={renderBeforeLabel}
        >
          option one
        </SimpleSelect.Option>
        <SimpleSelect.Option
          id="option-2"
          value="2"
          renderBeforeLabel={renderBeforeLabel}
        >
          option two
        </SimpleSelect.Option>
      </SimpleSelect>
    )
    const input = page.getByLabelText('Choose an option').element()

    await userEvent.click(input)

    await vi.waitFor(() => {
      const optionIcons = page.getByTestId('option-icon').elements()
      expect(optionIcons.length).toBe(2)

      expect(renderBeforeLabel).toHaveBeenCalledTimes(2)

      type MockCallType = Parameters<(...args: any) => any>[]
      const [[argsOption1], [argsOption2]] = renderBeforeLabel.mock
        .calls as MockCallType

      expect(argsOption1).toMatchObject({
        id: 'option-1',
        isDisabled: true,
        isSelected: true,
        isHighlighted: true,
        children: 'option one'
      })

      expect(argsOption2).toMatchObject({
        id: 'option-2',
        isDisabled: false,
        isSelected: false,
        isHighlighted: false,
        children: 'option two'
      })
    })
  })

  describe('list', () => {
    it('should set aria-disabled on options when isDisabled={true}', async () => {
      await render(
        <SimpleSelect renderLabel="Choose an option">
          {getOptions(defaultOptions[2])}
        </SimpleSelect>
      )
      const input = page.getByLabelText('Choose an option').element()

      await userEvent.click(input)

      await vi.waitFor(() => {
        const options = page.getByRole('option').elements()

        expect(options[0]).not.toHaveAttribute('aria-disabled')
        expect(options[2]).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('should provide a ref to the list element', async () => {
      const listRef = vi.fn()

      await render(
        <SimpleSelect renderLabel="Choose an option" listRef={listRef}>
          {getOptions()}
        </SimpleSelect>
      )
      const input = page.getByLabelText('Choose an option').element()

      await userEvent.click(input)

      await vi.waitFor(() => {
        const listbox = page.getByRole('listbox').element()

        expect(listRef).toHaveBeenCalledWith(listbox)
      })
    })
  })

  describe('children', () => {
    const initialOptions: ExampleOption[] = ['foo', 'bar']
    const updatedOptions: ExampleOption[] = ['bar', 'baz']

    const getOptions = (options: string[]) =>
      options.map((opt) => (
        <SimpleSelect.Option id={opt} key={opt} value={opt}>
          {opt}
        </SimpleSelect.Option>
      ))

    const renderSimpleSelect = (options: ExampleOption[]) => {
      return render(
        <SimpleSelect renderLabel="Choose an option">
          {getOptions(options)}
        </SimpleSelect>
      )
    }

    it('should clear selection if selected option does not exist in updated options', async () => {
      const { rerender } = renderSimpleSelect(initialOptions)

      const input = page
        .getByRole('combobox', { name: 'Choose an option' })
        .element()
      fireEvent.click(input)

      const fooOption = page.getByRole('option', { name: 'foo' }).element()
      fireEvent.click(fooOption)

      expect(input).toHaveValue('foo')

      await rerender(
        <SimpleSelect renderLabel="Choose an option">
          {getOptions(updatedOptions)}
        </SimpleSelect>
      )

      expect(input).toHaveValue('')
    })

    it('should persist selected option if it exists in updated options', async () => {
      const { rerender } = renderSimpleSelect(initialOptions)

      const input = page
        .getByRole('combobox', { name: 'Choose an option' })
        .element()
      fireEvent.click(input)

      const barOption = page.getByRole('option', { name: 'bar' }).element()
      fireEvent.click(barOption)

      expect(input).toHaveValue('bar')

      await rerender(
        <SimpleSelect renderLabel="Choose an option">
          {getOptions(updatedOptions)}
        </SimpleSelect>
      )

      expect(input).toHaveValue('bar')
    })
  })
})
