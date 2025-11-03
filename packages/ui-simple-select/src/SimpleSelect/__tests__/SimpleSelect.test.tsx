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

import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi, MockInstance, it } from 'vitest'
import '@testing-library/jest-dom'
import { IconCheckSolid } from '@instructure/ui-icons'

import SimpleSelect from '../index'

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

  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should render an input and a list', () => {
    render(
      <SimpleSelect renderLabel="Choose an option">{getOptions()}</SimpleSelect>
    )
    const input = screen.getByLabelText('Choose an option')
    const listInitial = screen.queryByRole('listbox')

    expect(listInitial).not.toBeInTheDocument()
    expect(input).toBeInTheDocument()

    fireEvent.click(input, { button: 0, detail: 1 })

    act(() => {
      vi.runOnlyPendingTimers()
    })

    const list = screen.queryByRole('listbox')
    expect(list).toBeInTheDocument()
  })

  it('should render groups', () => {
    render(
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
    const input = screen.getByLabelText('Choose an option')

    fireEvent.click(input, { button: 0, detail: 1 })

    act(() => {
      vi.runOnlyPendingTimers()
    })

    const groups = screen.getAllByRole('group')
    const labelOne = screen.getByText('Group one')
    const labelOneID = labelOne.getAttribute('id')

    expect(groups.length).toBe(2)
    expect(groups[0]).toHaveAttribute('aria-labelledby', labelOneID)
    expect(labelOne).toHaveAttribute('role', 'presentation')
  })

  it('should ignore invalid children', () => {
    render(
      <SimpleSelect renderLabel="Choose an option">
        <SimpleSelect.Option id="0" value={0}>
          valid
        </SimpleSelect.Option>
        <div>invalid</div>
      </SimpleSelect>
    )
    const input = screen.getByLabelText('Choose an option')

    fireEvent.click(input, { button: 0, detail: 1 })

    act(() => {
      vi.runOnlyPendingTimers()
    })

    const invalidChild = screen.queryByText('invalid')
    expect(invalidChild).not.toBeInTheDocument()
  })

  it('should fire onFocus when input gains focus', () => {
    const onFocus = vi.fn()
    render(
      <SimpleSelect renderLabel="Choose an option" onFocus={onFocus}>
        {getOptions()}
      </SimpleSelect>
    )
    const input = screen.getByLabelText('Choose an option')

    input.focus()

    act(() => {
      vi.runAllTimers()
    })

    expect(onFocus).toHaveBeenCalled()
  })

  describe('input', () => {
    it('should render with a custom id if given', () => {
      render(<SimpleSelect renderLabel="Choose an option" id="customSelect" />)
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('id', 'customSelect')
    })

    it('should always render readonly', () => {
      render(
        <SimpleSelect renderLabel="Choose an option" interaction="enabled" />
      )
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('readonly')
      expect(input).not.toHaveAttribute('disabled')
    })

    it('should render disabled when interaction="disabled"', () => {
      render(
        <SimpleSelect renderLabel="Choose an option" interaction="disabled" />
      )
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('disabled')
      expect(input).not.toHaveAttribute('readonly')
    })

    it('should render required when isRequired={true}', () => {
      render(<SimpleSelect renderLabel="Choose an option" isRequired />)
      const input = screen.getByLabelText('Choose an option *')

      expect(input).toHaveAttribute('required')
    })

    it('should allow assistive text', () => {
      render(
        <SimpleSelect
          renderLabel="Choose an option"
          assistiveText="hello world"
        >
          {getOptions()}
        </SimpleSelect>
      )
      const input = screen.getByLabelText('Choose an option')
      const assistiveText = screen.getByText('hello world')
      const assistiveTextID = assistiveText.getAttribute('id')

      expect(input).toHaveAttribute('aria-describedby', assistiveTextID)
    })

    it('should allow custom props to pass through', () => {
      render(
        <SimpleSelect renderLabel="Choose an option" data-custom-attr="true">
          {getOptions()}
        </SimpleSelect>
      )
      const input = screen.getByLabelText('Choose an option')

      expect(input).toHaveAttribute('data-custom-attr', 'true')
    })

    it('should provide a ref to the input element', () => {
      const inputRef = vi.fn()

      render(
        <SimpleSelect renderLabel="Choose an option" inputRef={inputRef}>
          {getOptions()}
        </SimpleSelect>
      )
      const input = screen.getByLabelText('Choose an option')

      expect(inputRef).toHaveBeenCalledWith(input)
    })
  })

  it('should render icons before option and call renderBeforeLabel callback with necessary props', () => {
    const renderBeforeLabel = vi.fn(() => (
      <IconCheckSolid data-testid="option-icon" />
    ))

    render(
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
    const input = screen.getByLabelText('Choose an option')

    fireEvent.click(input, { button: 0, detail: 1 })

    act(() => {
      vi.runOnlyPendingTimers()
    })

    const optionIcons = screen.getAllByTestId('option-icon')
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

  describe('list', () => {
    it('should set aria-disabled on options when isDisabled={true}', () => {
      render(
        <SimpleSelect renderLabel="Choose an option">
          {getOptions(defaultOptions[2])}
        </SimpleSelect>
      )
      const input = screen.getByLabelText('Choose an option')

      fireEvent.click(input, { button: 0, detail: 1 })

      act(() => {
        vi.runOnlyPendingTimers()
      })

      const options = screen.getAllByRole('option')

      expect(options[0]).not.toHaveAttribute('aria-disabled')
      expect(options[2]).toHaveAttribute('aria-disabled', 'true')
    })

    it('should provide a ref to the list element', () => {
      const listRef = vi.fn()

      render(
        <SimpleSelect renderLabel="Choose an option" listRef={listRef}>
          {getOptions()}
        </SimpleSelect>
      )
      const input = screen.getByLabelText('Choose an option')

      fireEvent.click(input, { button: 0, detail: 1 })

      act(() => {
        vi.runOnlyPendingTimers()
      })

      const listbox = screen.getByRole('listbox')

      expect(listRef).toHaveBeenCalledWith(listbox)
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

    it('should clear selection if selected option does not exist in updated options', () => {
      const { rerender } = renderSimpleSelect(initialOptions)

      const input = screen.getByRole('combobox', { name: 'Choose an option' })
      fireEvent.click(input)

      const fooOption = screen.getByRole('option', { name: 'foo' })
      fireEvent.click(fooOption)

      expect(input).toHaveValue('foo')

      rerender(
        <SimpleSelect renderLabel="Choose an option">
          {getOptions(updatedOptions)}
        </SimpleSelect>
      )

      expect(input).toHaveValue('')
    })

    it('should persist selected option if it exists in updated options', () => {
      const { rerender } = renderSimpleSelect(initialOptions)

      const input = screen.getByRole('combobox', { name: 'Choose an option' })
      fireEvent.click(input)

      const barOption = screen.getByRole('option', { name: 'bar' })
      fireEvent.click(barOption)

      expect(input).toHaveValue('bar')

      rerender(
        <SimpleSelect renderLabel="Choose an option">
          {getOptions(updatedOptions)}
        </SimpleSelect>
      )

      expect(input).toHaveValue('bar')
    })
  })
})
