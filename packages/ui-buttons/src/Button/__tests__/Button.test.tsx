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

import { runAxeCheck } from '@instructure/ui-axe-check'
import { BaseButton, Button } from '@instructure/ui-buttons/latest'

describe('<Button/>', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>
  const iconSelector = 'svg[data-title="myIcon"]'

  const icon = (
    <svg
      data-title="myIcon"
      height="1em"
      width="1em"
      style={{ fill: 'currentcolor' }}
    >
      <circle cx="0.5em" cy="0.5em" r="0.5em" />
    </svg>
  )

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

  it('should render children', async () => {
    const children = 'Hello world'

    await render(<Button>{children}</Button>)

    const button = document.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(children)
  })

  it('should render a button', async () => {
    await render(<Button>Hello World</Button>)

    const button = page.getByRole('button').element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveTextContent('Hello World')
  })

  it('should provide a focused getter', async () => {
    let componentRef: BaseButton | undefined

    await render(
      <Button
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        ref={(component: BaseButton) => {
          componentRef = component
        }}
      >
        Hello
      </Button>
    )
    const button = page.getByRole('button', { name: 'Hello' }).element()

    button.focus()

    expect(componentRef?.focused).toBe(true)
  })

  it('should provide a focus function', async () => {
    let componentRef: BaseButton | undefined

    await render(
      <Button
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        ref={(component: BaseButton) => {
          componentRef = component
        }}
      >
        Hello
      </Button>
    )
    const button = page.getByRole('button', { name: 'Hello' }).element()

    componentRef?.focus()

    expect(document.activeElement).toBe(button)
  })

  it('should pass the type attribute', async () => {
    await render(<Button type="submit">Hello</Button>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should pass the `elementRef` prop', async () => {
    const elementRef = vi.fn()
    await render(<Button elementRef={elementRef}>Hello</Button>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(elementRef).toHaveBeenCalledWith(button)
  })

  it('should pass the `as` prop', async () => {
    const { container } = await render(<Button as="li">Hello</Button>)

    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello')
    expect(button!.tagName).toBe('LI')
  })

  it('should set the disabled attribute when `interaction` is set to disabled', async () => {
    await render(<Button interaction="disabled">Hello</Button>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `disabled` is set', async () => {
    await render(<Button disabled>Hello</Button>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `interaction` is set to readonly', async () => {
    await render(<Button interaction="readonly">Hello</Button>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `readOnly` is set', async () => {
    await render(<Button readOnly>Hello</Button>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toHaveAttribute('disabled')
  })

  it('should pass the `href` prop', async () => {
    await render(<Button href="#">Hello</Button>)

    const linkButton = page.getByRole('link', { name: 'Hello' }).element()

    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('href', '#')
  })

  it('should pass the `renderIcon` prop', async () => {
    await render(<Button renderIcon={icon}>Hello</Button>)

    const svgIcon = document.querySelector(iconSelector)
    const button = page.getByRole('button', { name: 'Hello' }).element()

    expect(button).toBeInTheDocument()
    expect(svgIcon).toBeInTheDocument()
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = vi.fn()
    await render(<Button onClick={onClick}>Hello</Button>)

    const button = page.getByRole('button', { name: 'Hello' }).element()

    await userEvent.click(button)

    await vi.waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  it('should render the children as button text', async () => {
    await render(<Button>Hello World</Button>)

    const button = page.getByRole('button').element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello World')
  })

  it('should not error with a null child', async () => {
    await render(<Button>Hello World{null}</Button>)

    const button = page.getByRole('button', { name: 'Hello World' }).element()

    expect(button).toBeInTheDocument()
  })

  it('should render a link styled as a button if href is provided', async () => {
    await render(<Button href="example.html">Hello World</Button>)

    const button = page.getByRole('link', { name: 'Hello World' }).elements()

    expect(button).toHaveLength(1)
    expect(button[0]).toHaveAttribute('href', 'example.html')
  })

  it('should render as a link when `to` prop is provided', async () => {
    const { container } = await render(<Button to="/example">Test</Button>)

    const linkButton = container.querySelector('a')

    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('to', '/example')
  })

  it('should render designated tag if `as` prop is specified', async () => {
    const { container } = await render(<Button as="span">Hello World</Button>)

    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello World')
    expect(button!.tagName).toBe('SPAN')
  })

  it('should set role="button"', async () => {
    const onClick = vi.fn()
    const { container } = await render(
      <Button as="span" onClick={onClick}>
        Hello World
      </Button>
    )
    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('role', 'button')
  })

  it('should set tabIndex="0"', async () => {
    const onClick = vi.fn()
    await render(
      <Button as="span" onClick={onClick}>
        Hello World
      </Button>
    )
    const button = page.getByRole('button').element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('tabIndex', '0')
  })

  it('should pass down the type prop to the button element', async () => {
    const onClick = vi.fn()
    await render(
      <Button type="submit" onClick={onClick}>
        Hello World
      </Button>
    )
    const button = page.getByRole('button').element()

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('focuses with the focus helper', async () => {
    const onFocus = vi.fn()
    await render(<Button onFocus={onFocus}>Hello World</Button>)

    const button = page.getByRole('button').element()

    button.focus()

    expect(onFocus).toHaveBeenCalled()
    expect(document.activeElement).toBe(button)
  })

  describe('onClick', () => {
    it('should call onClick when clicked', async () => {
      const onClick = vi.fn()
      await render(<Button onClick={onClick}>Hello World</Button>)

      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is disabled', async () => {
      const onClick = vi.fn()

      await render(
        <Button disabled onClick={onClick}>
          Hello World
        </Button>
      )
      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is readOnly', async () => {
      const onClick = vi.fn()

      await render(
        <Button readOnly onClick={onClick}>
          Hello World
        </Button>
      )
      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is disabled and an href prop is provided', async () => {
      const onClick = vi.fn()

      await render(<Button href="#">Hello World</Button>)

      const button = page.getByRole('link', { name: 'Hello World' }).element()

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is readOnly and an href prop is provided', async () => {
      const onClick = vi.fn()

      await render(
        <Button readOnly onClick={onClick} href="#">
          Hello World
        </Button>
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
        <Button onClick={onClick} href="#">
          Hello World
        </Button>
      )
      const button = page.getByRole('link', { name: 'Hello World' }).element()

      await userEvent.type(button, '{space}')

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('should call onClick when enter key is pressed when not a button or link', async () => {
      const onClick = vi.fn()

      await render(
        <Button as="span" onClick={onClick}>
          Hello World
        </Button>
      )
      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.type(button, '{enter}')

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is disabled and space key is pressed', async () => {
      const onClick = vi.fn()

      await render(
        <Button disabled onClick={onClick} href="#">
          Hello World
        </Button>
      )
      const button = page.getByRole('link', { name: 'Hello World' }).element()

      await userEvent.type(button, '{spaec}')

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is readOnly and space key is pressed', async () => {
      const onClick = vi.fn()

      await render(
        <Button readOnly onClick={onClick} href="#">
          Hello World
        </Button>
      )
      const button = page.getByRole('link', { name: 'Hello World' }).element()

      await userEvent.type(button, '{space}')

      await vi.waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })
  })

  describe('for a11y', () => {
    it('should meet standards when onClick is given', async () => {
      const onClick = vi.fn()
      await render(<Button onClick={onClick}>Hello World</Button>)

      const button = page.getByRole('button', { name: 'Hello World' }).element()

      await userEvent.click(button)

      await vi.waitFor(async () => {
        const axeCheck = await runAxeCheck(button)

        expect(axeCheck).toBe(true)
      })
    })

    describe('when disabled', () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        await render(<Button disabled>Hello World</Button>)

        const button = page
          .getByRole('button', { name: 'Hello World' })
          .element()

        expect(button).toHaveAttribute('disabled')
      })
    })

    describe('when readOnly', () => {
      it('sets the disabled attribute so that the button is not in tab order', async () => {
        await render(<Button readOnly>Hello World</Button>)

        const button = page
          .getByRole('button', { name: 'Hello World' })
          .element()

        expect(button).toHaveAttribute('disabled')
      })
    })
  })
})
