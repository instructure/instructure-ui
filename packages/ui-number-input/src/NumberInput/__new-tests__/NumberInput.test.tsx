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
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'
import '@testing-library/jest-dom'

import { NumberInput } from '../index'
import NumberInputExamples from '../__examples__/NumberInput.examples'
// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { IconZoomInLine, IconZoomOutLine } from '@instructure/ui-icons'

describe('<NumberInput />', () => {
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

  it('sets value on the input', async () => {
    const onChange = vi.fn()
    render(<NumberInput renderLabel="Label" onChange={onChange} value="42" />)
    const input = screen.getByRole('spinbutton')

    expect(input).toHaveValue(42)
  })

  it('should accept a number for the value', async () => {
    const onChange = vi.fn()
    render(<NumberInput renderLabel="Label" onChange={onChange} value={42} />)
    const input = screen.getByRole('spinbutton')

    expect(input).toHaveValue(42)
  })

  it('displays the label', async () => {
    const { container } = render(<NumberInput renderLabel="Label" />)
    const label = container.querySelector('span[class$="-formFieldLabel"]')

    expect(label).toHaveTextContent('Label')
  })

  it('passes the input element to inputRef', async () => {
    const inputRef = vi.fn()
    render(<NumberInput renderLabel="Label" inputRef={inputRef} />)
    const input = screen.getByRole('spinbutton')

    expect(inputRef).toHaveBeenCalledTimes(1)
    expect(inputRef).toHaveBeenCalledWith(input)
  })

  it('passes change events to onChange handler', async () => {
    const onChange = vi.fn()
    render(<NumberInput renderLabel="Label" onChange={onChange} />)
    const input = screen.getByRole('spinbutton')

    userEvent.type(input, '5')

    await waitFor(() => {
      const event = onChange.mock.calls[0][0]
      const args = onChange.mock.calls[0][1]
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(args).toBe('5')
      expect(event.target.value).toBe('5')
    })
  })

  it('passes keyboard events to the onKeyDown handler', async () => {
    const onKeyDown = vi.fn()
    render(<NumberInput renderLabel="Label" onKeyDown={onKeyDown} />)
    const input = screen.getByRole('spinbutton')

    userEvent.type(input, '5')

    await waitFor(() => {
      expect(onKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  it('passes blur events to onBlur handler', async () => {
    const onBlur = vi.fn()
    render(<NumberInput renderLabel="Label" onBlur={onBlur} />)

    userEvent.tab()
    userEvent.tab()

    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
  })

  it('passes focus events to onFocus handler', async () => {
    const onFocus = vi.fn()
    render(<NumberInput renderLabel="Label" onFocus={onFocus} />)
    const input = screen.getByRole('spinbutton')

    input.focus()

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1)
    })
  })

  it('shows arrow spinbuttons by default', async () => {
    const { container } = render(<NumberInput renderLabel="Label" />)
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow'
    )

    expect(buttons).toHaveLength(2)
  })

  it('hides arrow spinbuttons when showArrows is false', async () => {
    const { container } = render(
      <NumberInput renderLabel="Label" showArrows={false} />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow'
    )

    expect(buttons).toHaveLength(0)
  })

  it('calls onIncrement when up arrow spinbutton is clicked', async () => {
    const onIncrement = vi.fn()
    const { container } = render(
      <NumberInput renderLabel="Label" onIncrement={onIncrement} />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow'
    )

    userEvent.click(buttons[0])

    await waitFor(() => {
      expect(onIncrement).toHaveBeenCalledTimes(1)
    })
  })

  it('does not call onIncrement when `interaction` is set to readonly', async () => {
    const onIncrement = vi.fn()
    const { container } = render(
      <NumberInput
        renderLabel="Label"
        interaction="readonly"
        onIncrement={onIncrement}
      />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow'
    )

    userEvent.click(buttons[0])

    await waitFor(() => {
      expect(onIncrement).toHaveBeenCalledTimes(0)
    })
  })

  it('does not call onIncrement when `readOnly` is set', async () => {
    const onIncrement = vi.fn()
    const { container } = render(
      <NumberInput renderLabel="Label" readOnly onIncrement={onIncrement} />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow'
    )

    userEvent.click(buttons[0])

    await waitFor(() => {
      expect(onIncrement).toHaveBeenCalledTimes(0)
    })
  })

  it('calls onDecrement when down arrow spinbutton is clicked', async () => {
    const onDecrement = vi.fn()
    const { container } = render(
      <NumberInput renderLabel="Label" onDecrement={onDecrement} />
    )

    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow'
    )

    userEvent.click(buttons[1])

    await waitFor(() => {
      expect(onDecrement).toHaveBeenCalledTimes(1)
    })
  })

  it('does not call onDecrement when `interaction` is set to readonly', async () => {
    const onDecrement = vi.fn()
    const { container } = render(
      <NumberInput
        renderLabel="Label"
        interaction="readonly"
        onDecrement={onDecrement}
      />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow'
    )

    userEvent.click(buttons[1])

    await waitFor(() => {
      expect(onDecrement).toHaveBeenCalledTimes(0)
    })
  })

  it('does not call onDecrement when `readOnly` is set', async () => {
    const onDecrement = vi.fn()
    const { container } = render(
      <NumberInput renderLabel="Label" readOnly onDecrement={onDecrement} />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow'
    )

    userEvent.click(buttons[1])

    await waitFor(() => {
      expect(onDecrement).toHaveBeenCalledTimes(0)
    })
  })

  it('puts inputMode prop to input', async () => {
    render(<NumberInput renderLabel="Label" inputMode="decimal" />)
    const input = screen.getByRole('spinbutton')

    expect(input).toHaveAttribute('inputMode', 'decimal')
  })

  describe('with generated examples', () => {
    const generatedComponents = generateA11yTests(
      NumberInput,
      NumberInputExamples
    )
    for (const component of generatedComponents) {
      it(component.description, async () => {
        const { container } = render(component.content)
        const axeCheck = await runAxeCheck(container)
        expect(axeCheck).toBe(true)
      })
    }
  })

  it('renders custom interactive icons', async () => {
    const onDecrement = vi.fn()
    const onIncrement = vi.fn()
    const { container } = render(
      <NumberInput
        renderLabel="Label"
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        renderIcons={{
          increase: <IconZoomInLine />,
          decrease: <IconZoomOutLine />
        }}
      />
    )

    const zoomInIcon = container.querySelector('svg[name="IconZoomIn"]')
    const zoomOutIcon = container.querySelector('svg[name="IconZoomOut"]')
    expect(zoomInIcon).toBeInTheDocument()
    expect(zoomOutIcon).toBeInTheDocument()

    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow'
    )

    userEvent.click(buttons[0])
    await waitFor(() => {
      expect(onIncrement).toHaveBeenCalledTimes(1)
    })

    userEvent.click(buttons[1])
    await waitFor(() => {
      expect(onDecrement).toHaveBeenCalledTimes(1)
    })
  })
})
