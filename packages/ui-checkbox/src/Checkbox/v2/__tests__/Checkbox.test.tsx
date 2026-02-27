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

import { createRef } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Checkbox } from '../index'
import { CheckboxProps } from '../props'

const TEST_VALUE = 'test-value'
const TEST_NAME = 'test-name'
const TEST_LABEL = 'test-label'

const initProps = {
  label: TEST_LABEL,
  defaultChecked: true,
  value: TEST_VALUE,
  name: TEST_NAME
}

const renderCheckbox = (props?: Partial<CheckboxProps>) => {
  const allProps: CheckboxProps = {
    ...initProps,
    ...props
  }
  return render(<Checkbox {...allProps} />)
}

describe('<Checkbox />', () => {
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

  it('renders an input with type "checkbox"', () => {
    renderCheckbox()
    const inputElem = screen.getByRole('checkbox')

    expect(inputElem).toBeInTheDocument()
    expect(inputElem.tagName).toBe('INPUT')
    expect(inputElem).toHaveAttribute('type', 'checkbox')
  })

  it('`simple` variant only displays a checkmark when checked', async () => {
    const { container } = renderCheckbox({
      variant: 'simple',
      defaultChecked: false
    })
    const checkboxElement = container.querySelector('input[type="checkbox"]')
    const svgElement = container.querySelector('svg')

    expect(svgElement).not.toBeInTheDocument()

    userEvent.click(checkboxElement!)
    await waitFor(() => {
      const svgElementAfterClick = container.querySelector('svg')
      expect(svgElementAfterClick).toBeInTheDocument()
    })
  })

  it('`simple` variant supports indeterminate/mixed state', () => {
    renderCheckbox({ variant: 'simple', indeterminate: true })

    const inputElem = screen.getByRole('checkbox')

    expect(inputElem).toBeInTheDocument()
    expect(inputElem).toHaveAttribute('aria-checked', 'mixed')
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = vi.fn()
    renderCheckbox({ inputRef })
    const input = screen.getByRole('checkbox')

    expect(inputRef).toHaveBeenCalledWith(input)
  })

  describe('events', () => {
    it('when clicked, fires onClick and onChange events', async () => {
      const onClick = vi.fn()
      const onChange = vi.fn()
      renderCheckbox({ onClick, onChange })
      const checkboxElement = screen.getByRole('checkbox')

      userEvent.click(checkboxElement)

      await waitFor(() => {
        expect(onClick).toHaveBeenCalled()
        expect(onChange).toHaveBeenCalled()
      })
    })

    it('when clicked, does not call onClick or onChange when disabled', async () => {
      const onClick = vi.fn()
      const onChange = vi.fn()
      renderCheckbox({ onClick, onChange, disabled: true })
      const checkboxElement = screen.getByRole('checkbox')

      fireEvent.click(checkboxElement)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
        expect(checkboxElement).toBeDisabled()
      })
    })

    it('when clicked, does not call onClick or onChange when readOnly', async () => {
      const onClick = vi.fn()
      const onChange = vi.fn()
      renderCheckbox({ onClick, onChange, readOnly: true })
      const checkboxElement = screen.getByRole('checkbox')

      fireEvent.click(checkboxElement)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
      })
    })

    it('calls onChange when enter key is pressed', async () => {
      const onChange = vi.fn()
      renderCheckbox({ onChange })
      const checkboxElement = screen.getByRole('checkbox')

      userEvent.type(checkboxElement, '{enter}')

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })

    it('responds to onBlur event', async () => {
      const onBlur = vi.fn()
      renderCheckbox({ onBlur })

      userEvent.tab()
      userEvent.tab()

      await waitFor(() => {
        expect(onBlur).toHaveBeenCalled()
      })
    })

    it('responds to onFocus event', async () => {
      const onFocus = vi.fn()
      renderCheckbox({ onFocus })

      userEvent.tab()

      await waitFor(() => {
        expect(onFocus).toHaveBeenCalled()
      })
    })

    it('focuses with the focus helper', () => {
      const checkboxRef = createRef<Checkbox>()
      render(<Checkbox ref={checkboxRef} {...initProps} />)
      const checkboxElement = screen.getByRole('checkbox')

      expect(checkboxElement).not.toHaveFocus()

      checkboxRef.current?.focus()

      expect(checkboxElement).toHaveFocus()
    })

    it('calls onMouseOver', async () => {
      const onMouseOver = vi.fn()
      renderCheckbox({ onMouseOver })
      const checkboxElement = screen.getByRole('checkbox')

      userEvent.hover(checkboxElement)

      await waitFor(() => {
        expect(onMouseOver).toHaveBeenCalled()
      })
    })

    it('calls onMouseOut', async () => {
      const onMouseOut = vi.fn()
      renderCheckbox({ onMouseOut })
      const checkboxElement = screen.getByRole('checkbox')

      userEvent.hover(checkboxElement)
      userEvent.unhover(checkboxElement)

      await waitFor(() => {
        expect(onMouseOut).toHaveBeenCalled()
      })
    })
  })

  describe('for a11y', () => {
    it('`simple` variant should meet standards', async () => {
      const { container } = renderCheckbox({ variant: 'simple' })
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('`toggle` variant should meet standards', async () => {
      const { container } = renderCheckbox({ variant: 'toggle' })
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })
})
