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

/** jsxImportSource @emotion/react */
import { Component, PropsWithChildren } from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Link } from '../index'

class TruncateText extends Component<PropsWithChildren> {
  render() {
    return <span>{this.props.children}</span>
  }
}

describe('<Link />', () => {
  let consoleErrorMock: any

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should render the children as text content', async () => {
    render(<Link href="https://instructure.design">Hello World</Link>)
    const link = screen.getByRole('link')

    expect(link).toHaveTextContent('Hello World')
  })

  it('should render a button', async () => {
    const onClick = vi.fn()
    render(<Link onClick={onClick}>Hello World</Link>)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('type', 'button')
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <Link href="https://instructure.design">Hello World</Link>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should focus with the focus helper', async () => {
    let linkRef: any
    render(
      <Link
        href="https://instructure.design"
        elementRef={(el) => {
          linkRef = el
        }}
      >
        Hello World
      </Link>
    )
    const linkElement = screen.getByRole('link')

    linkRef.focus()

    expect(linkElement).toHaveFocus()
  })

  it('should display block when TruncateText is a child', async () => {
    render(
      <Link href="example.html">
        <TruncateText>Hello World</TruncateText>
      </Link>
    )
    const link = screen.getByRole('link')

    expect(link).toHaveStyle('display: block')
  })

  it('should display inline-flex when TruncateText is a child and there is an icon', async () => {
    const customIcon = (
      <svg height="24" width="24">
        <title>Custom icon</title>
        <circle cx="50" cy="50" r="40" />
      </svg>
    )
    render(
      <Link href="example.html" renderIcon={customIcon}>
        <TruncateText>Hello World</TruncateText>
      </Link>
    )
    const link = screen.getByRole('link')

    expect(link).toHaveStyle('display: inline-flex')
  })

  it('should call the onClick prop when clicked', () => {
    vi.useFakeTimers()
    const onClick = vi.fn()
    render(<Link onClick={onClick}>Hello World</Link>)
    const link = screen.getByRole('button')

    fireEvent.click(link, { button: 0, detail: 1 })
    act(() => {
      vi.runAllTimers()
    })

    expect(onClick).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it('should call the onMouseEnter prop when mouseEntered', () => {
    vi.useFakeTimers()
    const onMouseEnter = vi.fn()
    const { container } = render(
      <Link onMouseEnter={onMouseEnter}>Hello World</Link>
    )
    const link = container.querySelector('span[class*="-link"]')!

    fireEvent.mouseEnter(link)
    act(() => {
      vi.runAllTimers()
    })

    expect(onMouseEnter).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it('should pass down an icon via the icon property', async () => {
    const customIcon = (
      <svg data-testid="svg" height="100" width="100">
        <title>Custom icon</title>
        <circle cx="50" cy="50" r="40" />
      </svg>
    )
    render(
      <Link href="https://instructure.design" renderIcon={customIcon}>
        Hello World
      </Link>
    )
    const title = screen.getByText('Custom icon')
    const icon = screen.getByTestId('svg')

    expect(title).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  describe('when interaction is disabled', () => {
    it('should apply aria-disabled when interaction is disabled', async () => {
      render(
        <Link href="example.html" interaction="disabled">
          Hello World
        </Link>
      )
      const link = screen.getByRole('link')

      expect(link).toHaveAttribute('aria-disabled')
    })
  })

  it('should apply aria-disabled when `disabled` is set', async () => {
    render(
      <Link href="example.html" disabled>
        Hello World
      </Link>
    )
    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('aria-disabled')
  })

  it('should not be clickable when interaction is disabled', async () => {
    const onClick = vi.fn()
    render(
      <Link onClick={onClick} interaction="disabled">
        Hello World
      </Link>
    )
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('should not be clickable when `disabled` is set', async () => {
    const onClick = vi.fn()
    render(
      <Link onClick={onClick} disabled>
        Hello World
      </Link>
    )
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-disabled', 'true')
  })
})

describe('with `as` prop', () => {
  describe('with `onClick`', () => {
    it('should render designated tag', async () => {
      const onClick = vi.fn()
      render(
        <Link as="a" onClick={onClick}>
          Hello World
        </Link>
      )
      const link = screen.getByText('Hello World')

      expect(link.tagName).toBe('A')
    })

    it('should set role="button"', async () => {
      const onClick = vi.fn()
      render(
        <Link as="span" onClick={onClick}>
          Hello World
        </Link>
      )
      const spanLink = screen.getByRole('button')

      expect(spanLink).toHaveAttribute('role', 'button')
    })
  })

  describe('should not set type="button", unless it is actually a button', () => {
    it('should not set type="button" on other things like <span>s', async () => {
      const onClick = vi.fn()
      render(
        <Link as="span" onClick={onClick}>
          Hello World
        </Link>
      )
      const link = screen.getByText('Hello World')

      expect(link).not.toHaveAttribute('type', 'button')
    })

    it('should set type="button" on <button>s', async () => {
      const onClick = vi.fn()
      render(
        <Link as="button" onClick={onClick}>
          Hello World
        </Link>
      )
      const button = screen.getByText('Hello World')

      expect(button).toHaveAttribute('type', 'button')
    })

    it('should set tabIndex="0"', async () => {
      const onClick = vi.fn()
      render(
        <Link as="span" onClick={onClick}>
          Hello World
        </Link>
      )
      const spanLink = screen.getByText('Hello World')

      expect(spanLink).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('without `onClick`', () => {
    it('should render designated tag', async () => {
      render(<Link as="a">Hello World</Link>)
      const link = screen.getByText('Hello World')

      expect(link.tagName).toBe('A')
    })

    it('should not set role="button"', async () => {
      render(<Link as="span">Hello World</Link>)
      const link = screen.getByText('Hello World')

      expect(link).not.toHaveAttribute('role', 'button')
    })

    it('should not set type="button"', async () => {
      render(<Link as="span">Hello World</Link>)
      const link = screen.getByText('Hello World')

      expect(link).not.toHaveAttribute('type', 'button')
    })

    it('should not set tabIndex="0"', async () => {
      render(<Link as="span">Hello World</Link>)
      const link = screen.getByText('Hello World')

      expect(link).not.toHaveAttribute('tabIndex', '0')
    })
  })

  describe('when an href is provided', () => {
    it('should render an anchor element', async () => {
      render(<Link href="example.html">Hello World</Link>)
      const link = screen.getByRole('link')

      expect(link.tagName).toBe('A')
    })

    it('should set the href attribute', async () => {
      render(<Link href="example.html">Hello World</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveAttribute('href', 'example.html')
    })

    it('should not set role="button"', async () => {
      render(<Link href="example.html">Hello World</Link>)
      const link = screen.getByRole('link')

      expect(link).not.toHaveAttribute('role', 'button')
    })

    it('should not set type="button"', async () => {
      render(<Link href="example.html">Hello World</Link>)
      const link = screen.getByRole('link')

      expect(link).not.toHaveAttribute('type', 'button')
    })
  })

  describe('when a `role` is provided', () => {
    it('should set role', async () => {
      render(
        <Link href="example.html" role="button">
          Hello World
        </Link>
      )
      const link = screen.getByText('Hello World')

      expect(link).toHaveAttribute('role', 'button')
    })

    it('should not override button role when it is forced by default', async () => {
      const onClick = vi.fn()
      render(
        <Link role="link" onClick={onClick} as="a">
          Hello World
        </Link>
      )
      const link = screen.getByText('Hello World')

      expect(link).toHaveAttribute('role', 'button')
    })
  })

  describe('when a `forceButtonRole` is set to false', () => {
    it('should not force button role', async () => {
      const onClick = vi.fn()
      render(
        <Link onClick={onClick} as="a" forceButtonRole={false}>
          Hello World
        </Link>
      )
      const link = screen.getByText('Hello World')

      expect(link).not.toHaveAttribute('role')
    })

    it('should override button role with `role` prop', async () => {
      const onClick = vi.fn()
      render(
        <Link role="link" onClick={onClick} as="a" forceButtonRole={false}>
          Hello World
        </Link>
      )
      const link = screen.getByText('Hello World')

      expect(link).toHaveAttribute('role', 'link')
    })
  })

  describe('when a `to` is provided', () => {
    it('should render an anchor element', async () => {
      render(<Link to="/example">Hello World</Link>)
      const link = screen.getByText('Hello World')

      expect(link.tagName).toBe('A')
    })

    it('should set the to attribute', async () => {
      render(<Link to="/example">Hello World</Link>)
      const link = screen.getByText('Hello World')

      expect(link).toHaveAttribute('to', '/example')
    })

    it('should not set role="button"', async () => {
      render(<Link to="/example">Hello World</Link>)
      const link = screen.getByText('Hello World')

      expect(link).not.toHaveAttribute('role', 'button')
    })
  })
})
