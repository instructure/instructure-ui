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

import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { CheckboxGroup } from '../index'
import { CheckboxGroupProps } from '../props'
import { Checkbox } from '../../Checkbox'

const TEST_NAME = 'test-name'
const TEST_DESCRIPTION = 'test-description'
const TEST_ERROR_MESSAGE = 'test-error-message'
const TEST_VALUE_1 = 'test-value-1'
const TEST_VALUE_2 = 'test-value-2'
const TEST_LABEL_1 = 'test-label-1'
const TEST_LABEL_2 = 'test-label-2'

const renderCheckboxGroup = (props?: Partial<CheckboxGroupProps>) => {
  const allProps: CheckboxGroupProps = {
    name: TEST_NAME,
    description: TEST_DESCRIPTION,
    ...props
  }

  return render(
    <CheckboxGroup {...allProps}>
      <Checkbox label={TEST_LABEL_1} value={TEST_VALUE_1} />
      <Checkbox label={TEST_LABEL_2} value={TEST_VALUE_2} />
    </CheckboxGroup>
  )
}

describe('<CheckboxGroup />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('adds the name props to all Checkbox types', () => {
    renderCheckboxGroup({ name: TEST_NAME })
    const checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes.length).toBe(2)
    expect(checkboxes[0]).toHaveAttribute('name', TEST_NAME)
    expect(checkboxes[1]).toHaveAttribute('name', TEST_NAME)
  })

  it('links the messages to the fieldset via aria-describedby', () => {
    const { container } = renderCheckboxGroup({
      messages: [{ text: TEST_ERROR_MESSAGE, type: 'error' }]
    })
    const group = screen.getByRole('group')
    const ariaDesc = group.getAttribute('aria-describedby')
    const messageById = container.querySelector(`[id="${ariaDesc}"]`)

    expect(messageById).toBeInTheDocument()
    expect(messageById).toHaveTextContent(TEST_ERROR_MESSAGE)
  })

  it('displays description message inside the legend', () => {
    const { container } = renderCheckboxGroup({ description: TEST_DESCRIPTION })
    const legend = container.querySelector(
      'span[class$="-formFieldLayout__label"]'
    )

    expect(legend).toBeInTheDocument()
    expect(legend).toHaveTextContent(TEST_DESCRIPTION)
  })

  it('does not call the onChange prop when disabled', () => {
    const onChange = vi.fn()
    renderCheckboxGroup({ onChange, disabled: true })
    const checkboxElement = screen.getAllByRole('checkbox')[0]

    fireEvent.click(checkboxElement)

    expect(onChange).not.toHaveBeenCalled()
    expect(checkboxElement).toBeDisabled()
  })

  it('does not call the onChange prop when readOnly', () => {
    const onChange = vi.fn()
    renderCheckboxGroup({ onChange, readOnly: true })
    const checkboxElement = screen.getAllByRole('checkbox')[0]

    fireEvent.click(checkboxElement)

    expect(onChange).not.toHaveBeenCalled()
    expect(checkboxElement).toBeDisabled()
  })

  it('should not update the value when the value prop is set', () => {
    const onChange = vi.fn()
    renderCheckboxGroup({ onChange, value: ['tester'] })
    const checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()

    userEvent.click(checkboxes[0])

    expect(onChange).not.toHaveBeenCalled()
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
  })

  it('should add the checkbox value to the value list when it is checked', async () => {
    const onChange = vi.fn()
    renderCheckboxGroup({ onChange })
    const checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()

    await userEvent.click(checkboxes[0])
    await userEvent.click(checkboxes[1])

    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(onChange).toHaveBeenCalledWith([TEST_VALUE_1, TEST_VALUE_2])
  })

  it('should check the checkboxes based on the defaultValue prop', () => {
    const defaultValue = [TEST_VALUE_2]
    renderCheckboxGroup({ defaultValue })
    const checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
  })

  it('should remove the checkbox value from the value list when it is unchecked', async () => {
    const onChange = vi.fn()
    const defaultValue = [TEST_VALUE_1, TEST_VALUE_2]
    renderCheckboxGroup({ onChange, defaultValue })
    const checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).toBeChecked()

    await userEvent.click(checkboxes[0])

    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(onChange).toHaveBeenCalledWith([TEST_VALUE_2])
  })

  it('passes the array of selected values to onChange handler', async () => {
    const onChange = vi.fn()
    const defaultValue = [TEST_VALUE_2]
    renderCheckboxGroup({ onChange, defaultValue })
    const checkboxes = screen.getAllByRole('checkbox')

    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()

    await userEvent.click(checkboxes[0])

    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(onChange).toHaveBeenCalledWith([TEST_VALUE_2, TEST_VALUE_1])
  })

  describe('for a11y', () => {
    it('should meet standards', async () => {
      const { container } = renderCheckboxGroup()
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('adds the correct ARIA attributes', () => {
      const { container } = renderCheckboxGroup({
        disabled: true,
        messages: [{ type: 'newError', text: 'abc' }],
        // @ts-ignore This is a valid attribute
        'data-id': 'group'
      })
      const group = container.querySelector(`[data-id="group"]`)
      expect(group).toBeInTheDocument()
      expect(group).toHaveAttribute('aria-disabled', 'true')
      // ARIA role 'group' cannot have the 'aria-invalid' attribute
      expect(group).not.toHaveAttribute('aria-invalid')
    })
  })
})
