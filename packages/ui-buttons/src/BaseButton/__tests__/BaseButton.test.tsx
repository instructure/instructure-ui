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
import type { MockInstance } from 'vitest'
import { BaseButton } from '@instructure/ui-buttons/latest'
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

  it('should render a button and the children as button text', async () => {
    await render(<BaseButton>Hello World</BaseButton>)

    const button = document.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toMatchTextContent('Hello World')
  })

  it('should not error with a null child', async () => {
    await render(<BaseButton>Hello World{null}</BaseButton>)

    const button = document.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toMatchTextContent('Hello World')
  })

  it('should render a link styled as a button if href is provided', async () => {
    await render(<BaseButton href="example.html">Hello World</BaseButton>)

    const linkButton = page.getByRole('link', { name: 'Hello World' }).element()

    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('href', 'example.html')
  })

  it('should render as a link when `to` prop is provided', async () => {
    const { container } = await render(
      <BaseButton to="/example">Test</BaseButton>
    )

    const linkButton = container.querySelector('a')

    expect(linkButton!.getAttribute('to')).toBe('/example')
  })

  it('should render designated tag if `as` prop is specified', async () => {
    const { container } = await render(
      <BaseButton as="span">Hello World</BaseButton>
    )

    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toMatchTextContent('Hello World')
    expect(button!.tagName).toBe('SPAN')
  })

  it('should set role="button"', async () => {
    const onClick = vi.fn()

    const { container } = await render(
      <BaseButton as="span" onClick={onClick}>
        Hello World
      </BaseButton>
    )

    const button = container.querySelector('span[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('role', 'button')
  })

  it('should set tabIndex="0"', async () => {
    const onClick = vi.fn()

    await render(
      <BaseButton as="span" onClick={onClick}>
        Hello World
      </BaseButton>
    )

    const button = page.getByRole('button', { name: 'Hello World' }).element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('tabIndex', '0')
  })

  it('should not set tabIndex="0" when the element has it by default', async () => {
    const onClick = vi.fn()

    await render(
      <>
        <BaseButton as="button" onClick={onClick}>
          Hello Button
        </BaseButton>
        <BaseButton onClick={onClick} href="example.html">
          Hello link
        </BaseButton>
      </>
    )
    const button = page.getByRole('button', { name: 'Hello Button' }).element()
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('tabIndex')
    const link = page.getByRole('link', { name: 'Hello link' }).element()
    expect(link).toBeInTheDocument()
    expect(link).not.toHaveAttribute('tabIndex')
  })

  it('should pass down the type prop to the button element', async () => {
    const onClick = vi.fn()
    await render(
      <BaseButton type="submit" onClick={onClick}>
        Hello World
      </BaseButton>
    )

    const button = page.getByRole('button', { name: 'Hello World' }).element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should pass down an icon via the icon property', async () => {
    const SomeIcon = () => (
      <svg>
        <circle cx="25" cy="75" r="20" />
      </svg>
    )

    await render(<BaseButton renderIcon={SomeIcon}>Hello World</BaseButton>)

    const icon = document.querySelector('svg')

    expect(icon).toBeInTheDocument()
  })

  it('focuses with the focus helper', async () => {
    await render(<BaseButton>Hello World</BaseButton>)
    const button = page.getByRole('button', { name: 'Hello World' }).element()

    button.focus()

    expect(document.activeElement).toBe(button)
  })

  it('should provide an elementRef prop', async () => {
    const elementRef = vi.fn()
    await render(<BaseButton elementRef={elementRef}>Hello World</BaseButton>)

    const button = page.getByRole('button', { name: 'Hello World' }).element()

    expect(elementRef).toHaveBeenCalledWith(button)
  })

  it('should not be underlined when disabled with a href', async () => {
    await render(
      <BaseButton disabled href="#">
        Hello World
      </BaseButton>
    )
    const button = page.getByRole('link', { name: 'Hello World' }).element()

    const styles = window.getComputedStyle(button)
    expect(styles.textDecoration).toContain('none')
  })

  describe('onClick', () => {
    it('should call onClick when clicked', async () => {
      const onClick = vi.fn()
      await render(<BaseButton onClick={onClick}>Hello World</BaseButton>)

      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1)
      })
    })

    it('should not call onClick when interaction is "disabled"', async () => {
      const onClick = vi.fn()

      await render(
        <BaseButton interaction="disabled" onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button, { force: true })

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when disabled is set"', async () => {
      const onClick = vi.fn()

      await render(
        <BaseButton disabled onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button, { force: true })

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when interaction is "readonly"', async () => {
      const onClick = vi.fn()

      await render(
        <BaseButton interaction="readonly" onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button, { force: true })

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when readOnly is set', async () => {
      const onClick = vi.fn()

      await render(
        <BaseButton readOnly onClick={onClick}>
          Hello World
        </BaseButton>
      )
      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button, { force: true })

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is disabled and an href prop is provided', async () => {
      const onClick = vi.fn()

      await render(<BaseButton href="#">Hello World</BaseButton>)

      const button = page.getByRole('link', { name: 'Hello World' }).element()

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when interaction is "readonly" and an href prop is provided', async () => {
      const onClick = vi.fn()

      await render(
        <BaseButton interaction="readonly" onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )

      const button = page.getByRole('link', { name: 'Hello World' }).element()

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should call onClick when space key is pressed if href is provided', async () => {
      const onClick = vi.fn()

      await render(
        <BaseButton onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )

      const button = page.getByRole('link', { name: 'Hello World' }).element()

      await userEvent.type(button, ' ')

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('should call onClick when enter key is pressed when not a button or link', async () => {
      const onClick = vi.fn()

      await render(
        <BaseButton as="span" onClick={onClick}>
          Hello World
        </BaseButton>
      )

      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.type(button, '{enter}')

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('should not call onClick when interaction is "disabled" and space key is pressed', async () => {
      const onClick = vi.fn()

      await render(
        <BaseButton interaction="disabled" onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )

      const button = page.getByRole('link', { name: 'Hello World' }).element()

      await userEvent.type(button, ' ')

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when interaction is "readonly" and space key is pressed', async () => {
      const onClick = vi.fn()

      await render(
        <BaseButton interaction="readonly" onClick={onClick} href="#">
          Hello World
        </BaseButton>
      )
      const button = page.getByRole('link', { name: 'Hello World' }).element()

      await userEvent.type(button, ' ')

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })
  })

  describe('when passing down props to View', () => {
    it("passes cursor='pointer' to View by default", async () => {
      await render(<BaseButton>Hello World</BaseButton>)

      const button = page.getByRole('button', { name: 'Hello World' }).element()
      const style = window.getComputedStyle(button)

      expect(style.cursor).toBe('pointer')
    })

    it("passes cursor='not-allowed' to View when disabled", async () => {
      await render(<BaseButton interaction="disabled">Hello World</BaseButton>)

      const button = page.getByRole('button', { name: 'Hello World' }).element()
      const style = window.getComputedStyle(button)

      expect(style.cursor).toBe('not-allowed')
    })
  })

  describe('for a11y', () => {
    it('should meet standards when onClick is given', async () => {
      const onClick = vi.fn()

      await render(<BaseButton onClick={onClick}>Hello World</BaseButton>)

      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button)

      await vi.waitFor(async () => {
        const axeCheck = await runAxeCheck(button)

        expect(axeCheck).toBe(true)
      })
    })

    describe('when disabled', () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        await render(
          <BaseButton interaction="disabled">Hello World</BaseButton>
        )

        const button = page
          .getByRole('button', { name: 'Hello World' })
          .element()
        expect(button).toHaveAttribute('disabled')
      })
    })

    describe('when readonly', () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        await render(
          <BaseButton interaction="readonly">Hello World</BaseButton>
        )

        const button = page
          .getByRole('button', { name: 'Hello World' })
          .element()
        expect(button).toHaveAttribute('disabled')
      })
    })
  })

  describe('href safety', () => {
    it('strips javascript: schemes from href', async () => {
      await render(<BaseButton href="javascript:alert(1)">Hi</BaseButton>)
      const el = page.getByText('Hi').element().closest('a, button')
      expect(el).not.toHaveAttribute('href')
    })

    it('preserves safe https hrefs', async () => {
      await render(<BaseButton href="https://example.com">Hi</BaseButton>)
      const link = page.getByRole('link').element()
      expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('defaults rel for target=_blank', async () => {
      await render(
        <BaseButton href="https://example.com" target="_blank">
          Hi
        </BaseButton>
      )
      const link = page.getByRole('link').element()
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
