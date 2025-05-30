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

import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { BaseButton } from '../index'
import { runAxeCheck } from '@instructure/ui-axe-check'

describe('<BaseButton/>', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should render a button and the children as button text', () => {
    render(<BaseButton>Hello World</BaseButton>)

    const button = document.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello World')
  })

  it('should not error with a null child', () => {
    render(<BaseButton>Hello World{null}</BaseButton>)

    const button = document.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello World')
  })

  it('should render a link styled as a button if href is provided', () => {
    render(<BaseButton href="example.html">Hello World</BaseButton>)

    const linkButton = screen.getByRole('link', { name: 'Hello World' })

    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('href', 'example.html')
  })

  it('should render as a link when `to` prop is provided', () => {
    const { container } = render(<BaseButton to="/example">Test</BaseButton>)

    const linkButton = container.querySelector('a')

    expect(linkButton!.getAttribute('to')).toBe('/example')
  })

  it('should render designated tag if `as` prop is specified', () => {
    const { container } = render(<BaseButton as="span">Hello World</BaseButton>)

    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello World')
    expect(button!.tagName).toBe('SPAN')
  })

  it('should set role="button"', () => {
    const onClick = vi.fn()

    const { container } = render(
      <BaseButton as="span" onClick={onClick}>
        Hello World
      </BaseButton>
    )

    const button = container.querySelector('span[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('role', 'button')
  })

  it('should set tabIndex="0"', () => {
    const onClick = vi.fn()

    render(
      <BaseButton as="span" onClick={onClick}>
        Hello World
      </BaseButton>
    )

    const button = screen.getByRole('button', { name: 'Hello World' })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('tabIndex', '0')
  })

  it('should not set tabIndex="0" when the element has it by default', () => {
    const onClick = vi.fn()

    render(
      <>
        <BaseButton as="button" onClick={onClick}>
          Hello Button
        </BaseButton>
        <BaseButton onClick={onClick} href="example.html">
          Hello link
        </BaseButton>
      </>
    )
    const button = screen.getByRole('button', { name: 'Hello Button' })
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('tabIndex')
    const link = screen.getByRole('link', { name: 'Hello link' })
    expect(link).toBeInTheDocument()
    expect(link).not.toHaveAttribute('tabIndex')
  })

  it('should pass down the type prop to the button element', async () => {
    const onClick = vi.fn()
    render(
      <BaseButton type="submit" onClick={onClick}>
        Hello World
      </BaseButton>
    )

    const button = screen.getByRole('button', { name: 'Hello World' })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should pass down an icon via the icon property', () => {
    const SomeIcon = () => (
      <svg>
        <circle cx="25" cy="75" r="20" />
      </svg>
    )

    render(<BaseButton renderIcon={SomeIcon}>Hello World</BaseButton>)

    const icon = document.querySelector('svg')

    expect(icon).toBeInTheDocument()
  })

  it('focuses with the focus helper', async () => {
    render(<BaseButton>Hello World</BaseButton>)
    const button = screen.getByRole('button', { name: 'Hello World' })

    button.focus()

    expect(document.activeElement).toBe(button)
  })

  it('should provide an elementRef prop', async () => {
    const elementRef = vi.fn()
    render(<BaseButton elementRef={elementRef}>Hello World</BaseButton>)

    const button = screen.getByRole('button', { name: 'Hello World' })

    expect(elementRef).toBeCalledWith(button)
  })

  describe('onClick', () => {
    it('should call onClick when clicked', async () => {
      const onClick = vi.fn()
      render(<BaseButton onClick={onClick}>Hello World</BaseButton>)

      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1)
      })
    })

    it('should not call onClick when interaction is "disabled"', async () => {
      const onClick = vi.fn()

      render(
        <BaseButton interaction="disabled" onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when disabled is set"', async () => {
      const onClick = vi.fn()

      render(
        <BaseButton disabled onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when interaction is "readonly"', async () => {
      const onClick = vi.fn()

      render(
        <BaseButton interaction="readonly" onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when readOnly is set', async () => {
      const onClick = vi.fn()

      render(
        <BaseButton readOnly onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is disabled and an href prop is provided', async () => {
      const onClick = vi.fn()

      render(<BaseButton href="#">Hello World</BaseButton>)

      const button = screen.getByRole('link', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when interaction is "readonly" and an href prop is provided', async () => {
      const onClick = vi.fn()

      render(
        <BaseButton interaction="readonly" onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )

      const button = screen.getByRole('link', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should call onClick when space key is pressed if href is provided', async () => {
      const onClick = vi.fn()

      render(
        <BaseButton onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )

      const button = screen.getByRole('link', { name: 'Hello World' })

      await userEvent.type(button, '{space}')

      await waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('should call onClick when enter key is pressed when not a button or link', async () => {
      const onClick = vi.fn()

      render(
        <BaseButton as="span" onClick={onClick}>
          Hello World
        </BaseButton>
      )

      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.type(button, '{enter}')

      await waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('should not call onClick when interaction is "disabled" and space key is pressed', async () => {
      const onClick = vi.fn()

      render(
        <BaseButton interaction="disabled" onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )

      const button = screen.getByRole('link', { name: 'Hello World' })

      await userEvent.type(button, '{space}')

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when interaction is "readonly" and space key is pressed', async () => {
      const onClick = vi.fn()

      render(
        <BaseButton interaction="readonly" onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )
      const button = screen.getByRole('link', { name: 'Hello World' })

      await userEvent.type(button, '{space}')

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })
  })

  describe('when passing down props to View', () => {
    it("passes cursor='pointer' to View by default", async () => {
      render(<BaseButton>Hello World</BaseButton>)

      const button = screen.getByRole('button', { name: 'Hello World' })
      const style = window.getComputedStyle(button)

      expect(style.cursor).toBe('pointer')
    })

    it("passes cursor='not-allowed' to View when disabled", async () => {
      render(<BaseButton interaction="disabled">Hello World</BaseButton>)

      const button = screen.getByRole('button', { name: 'Hello World' })
      const style = window.getComputedStyle(button)

      expect(style.cursor).toBe('not-allowed')
    })
  })

  describe('for a11y', () => {
    it('should meet standards when onClick is given', async () => {
      const onClick = vi.fn()

      render(<BaseButton onClick={onClick}>Hello World</BaseButton>)

      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(async () => {
        const axeCheck = await runAxeCheck(button)

        expect(axeCheck).toBe(true)
      })
    })

    describe('when disabled', () => {
      it('sets the disabled attribute so that the button is not in tab order', () => {
        render(<BaseButton interaction="disabled">Hello World</BaseButton>)

        const button = screen.getByRole('button', { name: 'Hello World' })
        expect(button).toHaveAttribute('disabled')
      })
    })

    describe('when readonly', () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        render(<BaseButton interaction="readonly">Hello World</BaseButton>)

        const button = screen.getByRole('button', { name: 'Hello World' })
        expect(button).toHaveAttribute('disabled')
      })
    })
  })
})
