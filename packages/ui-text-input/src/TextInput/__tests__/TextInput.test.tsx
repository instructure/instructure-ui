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

import { useState } from 'react'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { fireEvent } from '@testing-library/dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { TextInput } from '@instructure/ui-text-input/latest'

describe('<TextInput/>', () => {
  let consoleErrorMock: any

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should include a label', async () => {
    const { container } = await render(<TextInput renderLabel="Name" />)
    const label = container.querySelector('label')
    expect(label).toHaveTextContent('Name')
  })

  it('should focus the input when focus is called', async () => {
    let ref: TextInput | undefined
    await render(
      <TextInput
        renderLabel="Name"
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        inputRef={(el: TextInput) => {
          ref = el
        }}
      />
    )
    const input = page.getByRole('textbox').element()

    ref?.focus()

    expect(input).toHaveFocus()
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = vi.fn()
    await render(<TextInput renderLabel="Name" inputRef={inputRef} />)
    const input = page.getByRole('textbox').element()

    expect(inputRef).toHaveBeenCalledWith(input)
  })

  it('should provide a value getter', async () => {
    let ref: TextInput | undefined
    await render(
      <TextInput
        renderLabel="Name"
        defaultValue="bar"
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        inputRef={(el: TextInput) => {
          ref = el
        }}
      />
    )
    expect(ref?.value).toBe('bar')
  })

  it('should let aria-describedby through', async () => {
    await render(<TextInput renderLabel="Name" aria-describedby="abcd" />)
    const input = page.getByRole('textbox').element()

    expect(input).toHaveAttribute('aria-describedby', 'abcd')
  })

  describe('events', () => {
    it('responds to onChange event', async () => {
      const onChange = vi.fn()
      await render(<TextInput renderLabel="Name" onChange={onChange} />)
      const input = page.getByRole('textbox').element()
      fireEvent.change(input, { target: { value: 'foo' } })

      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
      })
    })

    it('responds to onBlur event', async () => {
      const onBlur = vi.fn()
      await render(<TextInput renderLabel="Name" onBlur={onBlur} />)

      await userEvent.tab()
      await userEvent.tab()

      await vi.waitFor(() => {
        expect(onBlur).toHaveBeenCalled()
      })
    })

    it('responds to onFocus event', async () => {
      const onFocus = vi.fn()
      await render(<TextInput renderLabel="Name" onFocus={onFocus} />)
      const input = page.getByRole('textbox').element()

      input.focus()

      await vi.waitFor(() => {
        expect(onFocus).toHaveBeenCalled()
      })
    })
  })

  describe('interaction', () => {
    it('should set the disabled attribute when `interaction` is disabled', async () => {
      await render(<TextInput renderLabel="Name" interaction="disabled" />)
      const input = page.getByRole('textbox').element()

      expect(input).toHaveAttribute('disabled')
    })

    it('should set the disabled attribute when `disabled` is set', async () => {
      await render(<TextInput renderLabel="Name" disabled />)
      const input = page.getByRole('textbox').element()

      expect(input).toHaveAttribute('disabled')
    })

    it('should set the readonly attribute when `interaction` is readonly', async () => {
      await render(<TextInput renderLabel="Name" interaction="readonly" />)
      const input = page.getByRole('textbox').element()

      expect(input).toHaveAttribute('readonly')
    })

    it('should set the readonly attribute when `readOnly` is set', async () => {
      await render(<TextInput renderLabel="Name" readOnly />)
      const input = page.getByRole('textbox').element()

      expect(input).toHaveAttribute('readonly')
    })
  })

  describe('for a11y', () => {
    it('should meet standards', async () => {
      const { container } = await render(<TextInput renderLabel="Name" />)
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should set aria-invalid when errors prop is set', async () => {
      await render(
        <TextInput
          renderLabel="Name"
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const input = page.getByRole('textbox').element()

      expect(input).toHaveAttribute('aria-invalid')
    })

    it('associates messages with the input as its description, not its accessible name', async () => {
      await render(
        <TextInput
          renderLabel="Name"
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const input = page.getByRole('textbox').element()

      // messages are referenced as the input's description
      const describedById = input.getAttribute('aria-describedby')
      expect(describedById).toBeTruthy()
      expect(document.getElementById(describedById!)).toHaveTextContent(
        'some error message'
      )

      // the accessible name points at the label text only, excluding messages
      const labelledById = input.getAttribute('aria-labelledby')
      expect(labelledById).toBeTruthy()
      const labelEl = document.getElementById(labelledById!)
      expect(labelEl).toHaveTextContent('Name')
      expect(labelEl).not.toHaveTextContent('some error message')
    })

    it('does not override the accessible name with aria-labelledby when there are no messages', async () => {
      await render(<TextInput renderLabel="Name" />)
      const input = page.getByRole('textbox').element()

      expect(input).not.toHaveAttribute('aria-labelledby')
    })
  })

  describe('Component tests', () => {
    const contentBeforeSVG = (
      <svg height="24" width="24">
        <title>Content before</title>
        <circle cx="50" cy="50" r="40" />
      </svg>
    )

    const contentAfterSVG = (
      <svg height="24" width="24">
        <title>Content after</title>
        <circle cx="50" cy="50" r="40" />
      </svg>
    )

    it('should prepend and append content', async () => {
      const { container, rerender } = await render(
        <TextInput
          renderLabel="Name"
          renderBeforeInput={() => contentBeforeSVG}
        />
      )
      const beforeElement = container.querySelector(
        'span[class$="__beforeElement"]'
      )

      expect(beforeElement).toBeInTheDocument()
      expect(beforeElement).toHaveTextContent('Content before')

      await rerender(
        <TextInput
          renderLabel="Name"
          renderBeforeInput={() => contentBeforeSVG}
          renderAfterInput={() => contentAfterSVG}
        />
      )

      const titles = container.querySelectorAll('svg title')

      expect(container.querySelectorAll('svg')).toHaveLength(2)
      expect(titles[0]).toHaveTextContent('Content before')
      expect(titles[1]).toHaveTextContent('Content after')
    })

    // Providing a renderBeforeInput/renderAfterInput slot applies the horizontal
    // gap padding based on the slot's *existence*, not its contents — an empty
    // slot still gets the gap.
    it('should apply horizontal padding when before/after content is provided', async () => {
      // even empty slots get the gap
      const { container, rerender } = await render(
        <TextInput
          renderLabel="Name"
          renderBeforeInput={<span id="before"></span>}
          renderAfterInput={<span id="after"></span>}
        />
      )
      const paddings = () => {
        const layout = container.querySelector('[class*="__layout"]')!
        const afterElement = container.querySelector(
          '[class*="__afterElement"]'
        )!

        return [
          getComputedStyle(layout).paddingInlineStart,
          getComputedStyle(afterElement).paddingInlineEnd
        ]
      }

      expect(paddings()).toEqual(['12px', '12px'])

      await rerender(
        <TextInput
          renderLabel="Name"
          renderBeforeInput={() => contentBeforeSVG}
          renderAfterInput={() => contentAfterSVG}
        />
      )

      expect(paddings()).toEqual(['12px', '12px'])
    })

    it('should maintain focus while typing when after-content is conditionally rendered', async () => {
      const TestTextInput = () => {
        const [value, setValue] = useState('')

        const renderAfterInput = () => {
          if (!value) return
          return <div>Hello!</div>
        }

        return (
          <TextInput
            renderLabel="Name"
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue)
            }}
            renderAfterInput={renderAfterInput}
          />
        )
      }

      const { container } = await render(<TestTextInput />)
      const input = page.getByRole('textbox').element()

      await userEvent.click(input)

      expect(input).toHaveFocus()
      expect(
        container.querySelector('[class*="textInput__afterElement"]')
      ).not.toBeInTheDocument()

      await userEvent.fill(page.getByRole('textbox'), 'a')

      await vi.waitFor(() => {
        expect(input).toHaveValue('a')
        expect(
          container.querySelector('[class*="textInput__afterElement"]')
        ).toHaveTextContent('Hello!')
      })
      expect(input).toHaveFocus()

      await userEvent.fill(page.getByRole('textbox'), 'abc')

      await vi.waitFor(() => {
        expect(input).toHaveValue('abc')
      })
      expect(input).toHaveFocus()
    })
  })
})
