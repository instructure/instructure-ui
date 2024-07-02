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
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { BaseButton } from '../../BaseButton'
import { Button } from '../index'

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

  it('should render children', () => {
    const children = 'Hello world'

    render(<Button>{children}</Button>)

    const button = document.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(children)
  })

  it('should render a button', () => {
    render(<Button>Hello World</Button>)

    const button = screen.getByRole('button', { name: 'Hello World' })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('should provide a focused getter', () => {
    let componentRef: BaseButton | undefined

    render(
      <Button
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        ref={(component: BaseButton) => {
          componentRef = component
        }}
      >
        Hello
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Hello' })

    button.focus()

    expect(componentRef?.focused).toBe(true)
  })

  it('should provide a focus function', () => {
    let componentRef: BaseButton | undefined

    render(
      <Button
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        ref={(component: BaseButton) => {
          componentRef = component
        }}
      >
        Hello
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Hello' })

    componentRef?.focus()

    expect(document.activeElement).toBe(button)
  })

  it('should pass the type attribute', () => {
    render(<Button type="submit">Hello</Button>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should pass the `elementRef` prop', () => {
    const elementRef = vi.fn()
    render(<Button elementRef={elementRef}>Hello</Button>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(elementRef).toHaveBeenCalledWith(button)
  })

  it('should pass the `as` prop', () => {
    const { container } = render(<Button as="li">Hello</Button>)

    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello')
    expect(button!.tagName).toBe('LI')
  })

  it('should set the disabled attribute when `interaction` is set to disabled', () => {
    render(<Button interaction="disabled">Hello</Button>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `disabled` is set', () => {
    render(<Button disabled>Hello</Button>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `interaction` is set to readonly', () => {
    render(<Button interaction="readonly">Hello</Button>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toHaveAttribute('disabled')
  })

  it('should set the disabled attribute when `readOnly` is set', () => {
    render(<Button readOnly>Hello</Button>)

    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toHaveAttribute('disabled')
  })

  it('should pass the `href` prop', () => {
    render(<Button href="#">Hello</Button>)

    const linkButton = screen.getByRole('link', { name: 'Hello' })

    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('href', '#')
  })

  it('should pass the `renderIcon` prop', () => {
    render(<Button renderIcon={icon}>Hello</Button>)

    const svgIcon = document.querySelector(iconSelector)
    const button = screen.getByRole('button', { name: 'Hello' })

    expect(button).toBeInTheDocument()
    expect(svgIcon).toBeInTheDocument()
  })

  it('should pass the `onClick` prop', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Hello</Button>)

    const button = screen.getByRole('button', { name: 'Hello' })

    await userEvent.click(button)

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  it('should render the children as button text', () => {
    render(<Button>Hello World</Button>)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello World')
  })

  it('should render a button', async () => {
    render(<Button>Hello World</Button>)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveTextContent('Hello World')
  })

  it('should not error with a null child', () => {
    render(<Button>Hello World{null}</Button>)

    const button = screen.getByRole('button', { name: 'Hello World' })

    expect(button).toBeInTheDocument()
  })

  it('should render a link styled as a button if href is provided', () => {
    render(<Button href="example.html">Hello World</Button>)

    const button = screen.getAllByRole('link', { name: 'Hello World' })

    expect(button).toHaveLength(1)
    expect(button[0]).toHaveAttribute('href', 'example.html')
  })

  it('should render as a link when `to` prop is provided', () => {
    const { container } = render(<Button to="/example">Test</Button>)

    const linkButton = container.querySelector('a')

    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveAttribute('to', '/example')
  })

  it('should render designated tag if `as` prop is specified', () => {
    const { container } = render(<Button as="span">Hello World</Button>)

    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Hello World')
    expect(button!.tagName).toBe('SPAN')
  })

  it('should set role="button"', () => {
    const onClick = vi.fn()
    const { container } = render(
      <Button as="span" onClick={onClick}>
        Hello World
      </Button>
    )
    const button = container.querySelector('[type="button"]')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('role', 'button')
  })

  it('should set tabIndex="0"', () => {
    const onClick = vi.fn()
    render(
      <Button as="span" onClick={onClick}>
        Hello World
      </Button>
    )
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('tabIndex', '0')
  })

  it('should pass down the type prop to the button element', () => {
    const onClick = vi.fn()
    render(
      <Button type="submit" onClick={onClick}>
        Hello World
      </Button>
    )
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('focuses with the focus helper', () => {
    const onFocus = vi.fn()
    render(<Button onFocus={onFocus}>Hello World</Button>)

    const button = screen.getByRole('button')

    button.focus()

    expect(onFocus).toHaveBeenCalled()
    expect(document.activeElement).toBe(button)
  })

  describe('onClick', () => {
    it('should call onClick when clicked', async () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Hello World</Button>)

      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is disabled', async () => {
      const onClick = vi.fn()

      render(
        <Button disabled onClick={onClick}>
          Hello World
        </Button>
      )
      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is readOnly', async () => {
      const onClick = vi.fn()

      render(
        <Button readOnly onClick={onClick}>
          Hello World
        </Button>
      )
      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is disabled and an href prop is provided', async () => {
      const onClick = vi.fn()

      render(<Button href="#">Hello World</Button>)

      const button = screen.getByRole('link', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is readOnly and an href prop is provided', async () => {
      const onClick = vi.fn()

      render(
        <Button readOnly onClick={onClick} href="#">
          Hello World
        </Button>
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
        <Button onClick={onClick} href="#">
          Hello World
        </Button>
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
        <Button as="span" onClick={onClick}>
          Hello World
        </Button>
      )
      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.type(button, '{enter}')

      await waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is disabled and space key is pressed', async () => {
      const onClick = vi.fn()

      render(
        <Button disabled onClick={onClick} href="#">
          Hello World
        </Button>
      )
      const button = screen.getByRole('link', { name: 'Hello World' })

      await userEvent.type(button, '{spaec}')

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })

    it('should not call onClick when button is readOnly and space key is pressed', async () => {
      const onClick = vi.fn()

      render(
        <Button readOnly onClick={onClick} href="#">
          Hello World
        </Button>
      )
      const button = screen.getByRole('link', { name: 'Hello World' })

      await userEvent.type(button, '{space}')

      await waitFor(() => {
        expect(onClick).not.toHaveBeenCalled()
      })
    })
  })

  describe('for a11y', () => {
    it('should meet standards when onClick is given', async () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Hello World</Button>)

      const button = screen.getByRole('button', { name: 'Hello World' })

      await userEvent.click(button)

      await waitFor(async () => {
        const axeCheck = await runAxeCheck(button)

        expect(axeCheck).toBe(true)
      })
    })

    describe('when disabled', () => {
      it('sets the disabled attribute so that the button is not in tab order', () => {
        render(<Button disabled>Hello World</Button>)

        const button = screen.getByRole('button', { name: 'Hello World' })

        expect(button).toHaveAttribute('disabled')
      })
    })

    describe('when readOnly', () => {
      it('sets the disabled attribute so that the button is not in tab order', () => {
        render(<Button readOnly>Hello World</Button>)

        const button = screen.getByRole('button', { name: 'Hello World' })

        expect(button).toHaveAttribute('disabled')
      })
    })
  })
})
