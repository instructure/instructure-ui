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

import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Billboard } from '../index'
import { IconUserLine } from '@instructure/ui-icons'
import { runAxeCheck } from '@instructure/ui-axe-check'

const TEST_HEADING = 'test-heading'
const TEST_MESSAGE = 'test-message'
const TEST_LINK = 'http://instructure-test.com'
const TEST_HERO = () => <IconUserLine size={'medium'} />

describe('<Billboard />', () => {
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

  it('should render', () => {
    const { container } = render(<Billboard />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should be accessible', async () => {
    const { container } = render(
      <Billboard
        heading={TEST_HEADING}
        message={TEST_MESSAGE}
        hero={TEST_HERO}
      />
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should render a heading with the correct tag', () => {
    render(<Billboard heading={TEST_HEADING} headingAs="h2" />)
    const heading = screen.getByText(TEST_HEADING)

    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H2')
  })

  it('renders as a link if it has an href prop', () => {
    render(<Billboard href={TEST_LINK} />)

    const link = screen.getByRole('link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', TEST_LINK)
  })

  it('renders as a button and responds to onClick event', () => {
    const onClick = vi.fn()

    render(<Billboard onClick={onClick} />)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  describe('when rendering message', () => {
    it('should render message when passed a node', async () => {
      const messageNode = <span>{TEST_MESSAGE}</span>

      render(<Billboard message={messageNode} />)
      const messageElement = screen.getByText(TEST_MESSAGE)

      expect(messageElement).toBeInTheDocument()
      expect(messageElement.tagName).toBe('SPAN')
    })

    it('should render message passed a function', () => {
      const messageNode = <span>{TEST_MESSAGE}</span>

      render(<Billboard message={() => messageNode} />)
      const messageElement = screen.getByText(TEST_MESSAGE)

      expect(messageElement).toBeInTheDocument()
      expect(messageElement.tagName).toBe('SPAN')
    })
  })

  describe('when disabled', () => {
    it('should apply aria-disabled to link', () => {
      render(<Billboard href={TEST_LINK} disabled={true} />)
      const link = screen.getByRole('link')

      expect(link).toHaveAttribute('aria-disabled', 'true')
    })

    it('should not be clickable', () => {
      render(<Billboard onClick={vi.fn()} disabled />)
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when readOnly', () => {
    it('should apply aria-disabled', () => {
      render(<Billboard href={TEST_LINK} readOnly />)
      const link = screen.getByRole('link')

      expect(link).toHaveAttribute('aria-disabled', 'true')
    })

    it('should not be clickable', () => {
      const onClick = vi.fn()

      render(<Billboard onClick={onClick} readOnly />)
      const button = screen.getByRole('button')

      userEvent.click(button)

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('when passing down props to View', () => {
    it('should support an elementRef prop', () => {
      const elementRef = vi.fn()

      render(<Billboard elementRef={elementRef} href={TEST_LINK} />)
      const link = screen.getByRole('link')

      expect(elementRef).toHaveBeenCalledWith(link)
    })

    it('should support an `as` prop', () => {
      const { container } = render(<Billboard as="em" />)
      const billboardAsEm = container.querySelector('em')

      expect(billboardAsEm).toBeInTheDocument()
      expect(billboardAsEm?.className).toMatch(/billboard/)
      expect(billboardAsEm?.className).toMatch(/view/)
    })
  })
})
