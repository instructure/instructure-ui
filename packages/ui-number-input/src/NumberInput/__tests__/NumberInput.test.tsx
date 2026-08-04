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

import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { NumberInput } from '@instructure/ui-number-input/latest'
import {
  ChevronUpInstUIIcon,
  ChevronDownInstUIIcon
} from '@instructure/ui-icons'

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
    await render(
      <NumberInput renderLabel="Label" onChange={onChange} value="42" />
    )
    const input = page.getByRole('spinbutton').element()

    expect(input).toHaveValue(42)
  })

  it('should accept a number for the value', async () => {
    const onChange = vi.fn()
    await render(
      <NumberInput renderLabel="Label" onChange={onChange} value={42} />
    )
    const input = page.getByRole('spinbutton').element()

    expect(input).toHaveValue(42)
  })

  it('displays the label', async () => {
    const { container } = await render(<NumberInput renderLabel="Label" />)
    const label = container.querySelector(
      'span[class$="-formFieldLayout__label"]'
    )

    expect(label).toHaveTextContent('Label')
  })

  it('passes the input element to inputRef', async () => {
    const inputRef = vi.fn()
    await render(<NumberInput renderLabel="Label" inputRef={inputRef} />)
    const input = page.getByRole('spinbutton').element()

    expect(inputRef).toHaveBeenCalledTimes(1)
    expect(inputRef).toHaveBeenCalledWith(input)
  })

  it('passes change events to onChange handler', async () => {
    const onChange = vi.fn()
    await render(<NumberInput renderLabel="Label" onChange={onChange} />)
    const input = page.getByRole('spinbutton').element()

    await userEvent.type(input, '5')

    await vi.waitFor(() => {
      const event = onChange.mock.calls[0][0]
      const args = onChange.mock.calls[0][1]
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(args).toBe('5')
      expect(event.target.value).toBe('5')
    })
  })

  it('passes keyboard events to the onKeyDown handler', async () => {
    const onKeyDown = vi.fn()
    await render(<NumberInput renderLabel="Label" onKeyDown={onKeyDown} />)
    const input = page.getByRole('spinbutton').element()

    await userEvent.type(input, '5')

    await vi.waitFor(() => {
      expect(onKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  it('passes blur events to onBlur handler', async () => {
    const onBlur = vi.fn()
    await render(<NumberInput renderLabel="Label" onBlur={onBlur} />)

    await userEvent.tab()
    await userEvent.tab()

    await vi.waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
  })

  it('passes focus events to onFocus handler', async () => {
    const onFocus = vi.fn()
    await render(<NumberInput renderLabel="Label" onFocus={onFocus} />)
    const input = page.getByRole('spinbutton').element()

    input.focus()

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1)
    })
  })

  it('shows arrow spinbuttons by default', async () => {
    const { container } = await render(<NumberInput renderLabel="Label" />)
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow"]'
    )

    expect(buttons).toHaveLength(2)
  })

  it('hides arrow spinbuttons when showArrows is false', async () => {
    const { container } = await render(
      <NumberInput renderLabel="Label" showArrows={false} />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow"]'
    )

    expect(buttons).toHaveLength(0)
  })

  it('calls onIncrement when up arrow spinbutton is clicked', async () => {
    const onIncrement = vi.fn()
    const { container } = await render(
      <NumberInput renderLabel="Label" onIncrement={onIncrement} />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow"]'
    )

    await userEvent.click(buttons[0])

    await vi.waitFor(() => {
      expect(onIncrement).toHaveBeenCalledTimes(1)
    })
  })

  it('does not call onIncrement when `interaction` is set to readonly', async () => {
    const onIncrement = vi.fn()
    const { container } = await render(
      <NumberInput
        renderLabel="Label"
        interaction="readonly"
        onIncrement={onIncrement}
      />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow"]'
    )

    // arrow spinbuttons aren't rendered in readonly mode
    expect(buttons).toHaveLength(0)
    expect(onIncrement).not.toHaveBeenCalled()
  })

  it('does not call onIncrement when `readOnly` is set', async () => {
    const onIncrement = vi.fn()
    const { container } = await render(
      <NumberInput renderLabel="Label" readOnly onIncrement={onIncrement} />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow"]'
    )

    // arrow spinbuttons aren't rendered in readonly mode
    expect(buttons).toHaveLength(0)
    expect(onIncrement).not.toHaveBeenCalled()
  })

  it('calls onDecrement when down arrow spinbutton is clicked', async () => {
    const onDecrement = vi.fn()
    const { container } = await render(
      <NumberInput renderLabel="Label" onDecrement={onDecrement} />
    )

    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow"]'
    )

    await userEvent.click(buttons[1])

    await vi.waitFor(() => {
      expect(onDecrement).toHaveBeenCalledTimes(1)
    })
  })

  it('does not call onDecrement when `interaction` is set to readonly', async () => {
    const onDecrement = vi.fn()
    const { container } = await render(
      <NumberInput
        renderLabel="Label"
        interaction="readonly"
        onDecrement={onDecrement}
      />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow"]'
    )

    // arrow spinbuttons aren't rendered in readonly mode
    expect(buttons).toHaveLength(0)
    expect(onDecrement).not.toHaveBeenCalled()
  })

  it('does not call onDecrement when `readOnly` is set', async () => {
    const onDecrement = vi.fn()
    const { container } = await render(
      <NumberInput renderLabel="Label" readOnly onDecrement={onDecrement} />
    )
    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow"]'
    )

    // arrow spinbuttons aren't rendered in readonly mode
    expect(buttons).toHaveLength(0)
    expect(onDecrement).not.toHaveBeenCalled()
  })

  it('puts inputMode prop to input', async () => {
    await render(<NumberInput renderLabel="Label" inputMode="decimal" />)
    const input = page.getByRole('spinbutton').element()

    expect(input).toHaveAttribute('inputMode', 'decimal')
  })

  it('renders custom interactive icons', async () => {
    const onDecrement = vi.fn()
    const onIncrement = vi.fn()
    const { container } = await render(
      <NumberInput
        renderLabel="Label"
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        renderIcons={{
          increase: <ChevronUpInstUIIcon />,
          decrease: <ChevronDownInstUIIcon />
        }}
      />
    )

    const zoomInIcon = container.querySelector('svg[name="ChevronUp"]')
    const zoomOutIcon = container.querySelector('svg[name="ChevronDown"]')
    expect(zoomInIcon).toBeInTheDocument()
    expect(zoomOutIcon).toBeInTheDocument()

    const buttons = container.querySelectorAll(
      'button[class$="-numberInput_arrow"]'
    )

    await userEvent.click(buttons[0])
    await vi.waitFor(() => {
      expect(onIncrement).toHaveBeenCalledTimes(1)
    })

    await userEvent.click(buttons[1])
    await vi.waitFor(() => {
      expect(onDecrement).toHaveBeenCalledTimes(1)
    })
  })

  it('associates messages with the input as its description, not its accessible name', async () => {
    await render(
      <NumberInput
        renderLabel="Label"
        messages={[{ type: 'error', text: 'some error message' }]}
      />
    )
    const input = page.getByRole('spinbutton').element()

    const describedById = input.getAttribute('aria-describedby')
    expect(describedById).toBeTruthy()
    expect(document.getElementById(describedById!)).toHaveTextContent(
      'some error message'
    )

    const labelledById = input.getAttribute('aria-labelledby')
    expect(labelledById).toBeTruthy()
    const labelEl = document.getElementById(labelledById!)
    expect(labelEl).toHaveTextContent('Label')
    expect(labelEl).not.toHaveTextContent('some error message')
  })

  it('does not override the accessible name with aria-labelledby when there are no messages', async () => {
    await render(<NumberInput renderLabel="Label" />)
    const input = page.getByRole('spinbutton').element()

    expect(input).not.toHaveAttribute('aria-labelledby')
  })

  describe('Component tests', () => {
    const arrowButtons = (container: HTMLElement) =>
      container.querySelectorAll<HTMLButtonElement>(
        'button[class$="-numberInput_arrow"]'
      )

    it('focuses the input when up arrow spinbutton is clicked', async () => {
      const { container } = await render(<NumberInput renderLabel="Label" />)
      const input = page.getByRole('spinbutton').element()
      const mouseDown = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      })

      arrowButtons(container)[0].dispatchEvent(mouseDown)

      expect(mouseDown.defaultPrevented).toBe(true)
      await vi.waitFor(() => {
        expect(input).toHaveFocus()
      })
    })

    it('focuses the input when down arrow spinbutton is clicked', async () => {
      const { container } = await render(<NumberInput renderLabel="Label" />)
      const input = page.getByRole('spinbutton').element()
      const mouseDown = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      })

      arrowButtons(container)[1].dispatchEvent(mouseDown)

      expect(mouseDown.defaultPrevented).toBe(true)
      await vi.waitFor(() => {
        expect(input).toHaveFocus()
      })
    })

    it('calls onIncrement when up arrow key is pressed', async () => {
      const onIncrement = vi.fn()
      await render(
        <NumberInput renderLabel="Label" onIncrement={onIncrement} />
      )
      const input = page.getByRole('spinbutton').element()

      input.focus()
      await userEvent.keyboard('{ArrowUp}')

      await vi.waitFor(() => {
        expect(onIncrement).toHaveBeenCalledTimes(1)
      })
    })

    it('calls onDecrement when down arrow key is pressed', async () => {
      const onDecrement = vi.fn()
      await render(
        <NumberInput renderLabel="Label" onDecrement={onDecrement} />
      )
      const input = page.getByRole('spinbutton').element()

      input.focus()
      await userEvent.keyboard('{ArrowDown}')

      await vi.waitFor(() => {
        expect(onDecrement).toHaveBeenCalledTimes(1)
      })
    })

    it('does not move caret when up arrow key is pressed', async () => {
      await render(<NumberInput renderLabel="Label" />)
      const input = page.getByRole('spinbutton').element()
      const keyDown = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        keyCode: 38,
        bubbles: true,
        cancelable: true
      })

      input.dispatchEvent(keyDown)

      expect(keyDown.defaultPrevented).toBe(true)
    })

    it('does not move caret when down arrow key is pressed', async () => {
      await render(<NumberInput renderLabel="Label" />)
      const input = page.getByRole('spinbutton').element()
      const keyDown = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: 40,
        bubbles: true,
        cancelable: true
      })

      input.dispatchEvent(keyDown)

      expect(keyDown.defaultPrevented).toBe(true)
    })

    it('handles other keyDown events normally', async () => {
      await render(<NumberInput renderLabel="Label" />)
      const input = page.getByRole('spinbutton').element()
      const keyDown = new KeyboardEvent('keydown', {
        key: 'h',
        keyCode: 72,
        bubbles: true,
        cancelable: true
      })

      input.dispatchEvent(keyDown)

      expect(keyDown.defaultPrevented).toBe(false)
    })
  })
})
