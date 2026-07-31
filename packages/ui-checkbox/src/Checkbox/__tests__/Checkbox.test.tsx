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
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Checkbox } from '@instructure/ui-checkbox/latest'
import type { CheckboxProps } from '@instructure/ui-checkbox/latest'

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

  it('renders an input with type "checkbox"', async () => {
    await renderCheckbox()
    const inputElem = page.getByRole('checkbox').element()

    expect(inputElem).toBeInTheDocument()
    expect(inputElem.tagName).toBe('INPUT')
    expect(inputElem).toHaveAttribute('type', 'checkbox')
  })

  it('`simple` variant only displays a checkmark when checked', async () => {
    const { container } = await renderCheckbox({
      variant: 'simple',
      defaultChecked: false
    })
    const checkboxElement = container.querySelector('input[type="checkbox"]')
    const svgElement = container.querySelector('svg')

    expect(svgElement).not.toBeInTheDocument()

    await userEvent.click(checkboxElement!, { force: true })
    await vi.waitFor(() => {
      const svgElementAfterClick = container.querySelector('svg')
      expect(svgElementAfterClick).toBeInTheDocument()
    })
  })

  it('`simple` variant supports indeterminate/mixed state', async () => {
    await renderCheckbox({ variant: 'simple', indeterminate: true })

    const inputElem = page.getByRole('checkbox').element()

    expect(inputElem).toBeInTheDocument()
    expect(inputElem).toHaveAttribute('aria-checked', 'mixed')
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = vi.fn()
    await renderCheckbox({ inputRef })
    const input = page.getByRole('checkbox').element()

    expect(inputRef).toHaveBeenCalledWith(input)
  })

  describe('events', () => {
    it('when clicked, fires onClick and onChange events', async () => {
      const onClick = vi.fn()
      const onChange = vi.fn()
      await renderCheckbox({ onClick, onChange })
      const checkboxElement = page.getByRole('checkbox').element()

      await userEvent.click(checkboxElement, { force: true })

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalled()
        expect(onChange).toHaveBeenCalled()
      })
    })

    it('when clicked, does not call onClick or onChange when disabled', async () => {
      const onClick = vi.fn()
      const onChange = vi.fn()
      await renderCheckbox({ onClick, onChange, disabled: true })
      const checkboxElement = page.getByRole('checkbox').element()

      await userEvent.click(checkboxElement, { force: true })

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
        expect(checkboxElement).toBeDisabled()
      })
    })

    it('when clicked, does not call onClick or onChange when readOnly', async () => {
      const onClick = vi.fn()
      const onChange = vi.fn()
      await renderCheckbox({ onClick, onChange, readOnly: true })
      const checkboxElement = page.getByRole('checkbox').element()

      await userEvent.click(checkboxElement, { force: true })

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
        expect(checkboxElement).not.toBeDisabled()
      })
    })

    it('when focused, readOnly checkbox is focusable', async () => {
      await renderCheckbox({ readOnly: true })
      const checkboxElement = page.getByRole('checkbox').element()

      checkboxElement.focus()

      expect(document.activeElement).toBe(checkboxElement)
    })

    it('calls onChange when space key is pressed', async () => {
      const onChange = vi.fn()
      await renderCheckbox({ onChange })
      const checkboxElement = page.getByRole('checkbox').element()

      await userEvent.type(checkboxElement, ' ')

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })

    it('responds to onBlur event', async () => {
      const onBlur = vi.fn()
      await renderCheckbox({ onBlur })

      await userEvent.tab()
      await userEvent.tab()

      await vi.waitFor(() => {
        expect(onBlur).toHaveBeenCalled()
      })
    })

    it('responds to onFocus event', async () => {
      const onFocus = vi.fn()
      await renderCheckbox({ onFocus })

      const checkboxElement = page.getByRole('checkbox').element()

      ;(checkboxElement as HTMLInputElement).focus()

      await vi.waitFor(() => {
        expect(onFocus).toHaveBeenCalled()
      })
    })

    it('focuses with the focus helper', async () => {
      const checkboxRef = createRef<Checkbox>()
      await render(<Checkbox ref={checkboxRef} {...initProps} />)
      const checkboxElement = page.getByRole('checkbox').element()

      expect(checkboxElement).not.toHaveFocus()

      checkboxRef.current?.focus()

      expect(checkboxElement).toHaveFocus()
    })

    it('calls onMouseOver', async () => {
      const onMouseOver = vi.fn()
      await renderCheckbox({ onMouseOver })
      const checkboxElement = page.getByRole('checkbox').element()

      await userEvent.hover(checkboxElement, { force: true })

      await vi.waitFor(() => {
        expect(onMouseOver).toHaveBeenCalled()
      })
    })

    it('calls onMouseOut', async () => {
      const onMouseOut = vi.fn()
      await renderCheckbox({ onMouseOut })
      const checkboxElement = page.getByRole('checkbox').element()

      await userEvent.hover(checkboxElement, { force: true })
      await userEvent.unhover(checkboxElement, { force: true })

      await vi.waitFor(() => {
        expect(onMouseOut).toHaveBeenCalled()
      })
    })
  })

  it('reflects checked state changes via data-checked attribute', async () => {
    await renderCheckbox({ defaultChecked: false })
    const input = page.getByRole('checkbox').element()

    expect(input).toHaveAttribute('data-checked', 'false')

    await userEvent.click(input, { force: true })
    await vi.waitFor(() => {
      expect(input).toHaveAttribute('data-checked', 'true')
    })
  })

  it('sets data-checked to mixed when indeterminate', async () => {
    await renderCheckbox({ indeterminate: true })
    const input = page.getByRole('checkbox').element()

    expect(input).toHaveAttribute('data-checked', 'mixed')
  })

  it('should set aria-invalid when errors prop is set', async () => {
    await renderCheckbox({
      messages: [{ type: 'error', text: 'This field is required' }]
    })
    const input = page.getByRole('checkbox').element()

    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('should not set aria-invalid when there are no error messages', async () => {
    await renderCheckbox({
      messages: [{ type: 'hint', text: 'This is a hint' }]
    })
    const input = page.getByRole('checkbox').element()

    expect(input).not.toHaveAttribute('aria-invalid')
  })

  describe('`toggle` variant', () => {
    it('should expose a button role and pressed state', () => {
      renderCheckbox({ variant: 'toggle', defaultChecked: true })
      const toggle = screen.getByRole('button')

      expect(toggle).toHaveAttribute('aria-pressed', 'true')
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    })

    it('should update the pressed state when toggled', async () => {
      renderCheckbox({ variant: 'toggle', defaultChecked: false })
      const toggle = screen.getByRole('button')

      expect(toggle).toHaveAttribute('aria-pressed', 'false')

      await userEvent.click(toggle)

      await waitFor(() => {
        expect(toggle).toHaveAttribute('aria-pressed', 'true')
      })
    })

    it('should leave the `simple` variant as a checkbox', () => {
      renderCheckbox({ variant: 'simple' })
      const input = screen.getByRole('checkbox')

      expect(input).not.toHaveAttribute('role')
      expect(input).not.toHaveAttribute('aria-pressed')
    })
  })

  describe('for a11y', () => {
    it('`simple` variant should meet standards', async () => {
      const { container } = await renderCheckbox({ variant: 'simple' })
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('`toggle` variant should meet standards', async () => {
      const { container } = await renderCheckbox({ variant: 'toggle' })
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('associates messages with the checkbox as its description, not its accessible name', async () => {
      await render(
        <Checkbox
          label="Accept terms"
          value="v"
          messages={[{ type: 'error', text: 'You must accept' }]}
        />
      )
      const input = page.getByRole('checkbox').element()

      const describedById = input.getAttribute('aria-describedby')
      expect(describedById).toBeTruthy()
      expect(document.getElementById(describedById!)).toHaveTextContent(
        'You must accept'
      )

      const labelledById = input.getAttribute('aria-labelledby')
      expect(labelledById).toBeTruthy()
      const labelEl = document.getElementById(labelledById!)
      expect(labelEl).toHaveTextContent('Accept terms')
      expect(labelEl).not.toHaveTextContent('You must accept')
    })

    it('does not set aria-labelledby when there are no messages', async () => {
      await render(<Checkbox label="Accept terms" value="v" />)
      const input = page.getByRole('checkbox').element()

      expect(input).not.toHaveAttribute('aria-labelledby')
    })
  })
})
