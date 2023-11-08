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
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { BreadcrumbLink } from '../index'

const TEST_TEXT_01 = 'Account'
const TEST_LINK = 'http://instructure-test.com'
const TEST_TO = '/example'

const originalResizeObserver = global.ResizeObserver

describe('<BreadcrumbLink />', () => {
  beforeAll(() => {
    // Mock for ResizeObserver browser API
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  it('should render an anchor tag when given a href prop', () => {
    render(<BreadcrumbLink href={TEST_LINK}>{TEST_TEXT_01}</BreadcrumbLink>)
    const anchor = screen.getByRole('link')

    expect(anchor).toHaveAttribute('href', TEST_LINK)
  })

  it('should render as a button and respond to onClick event', () => {
    const onClick = jest.fn()

    render(<BreadcrumbLink onClick={onClick}>{TEST_TEXT_01}</BreadcrumbLink>)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should respond to mouseEnter event when provided with onMouseEnter prop', () => {
    const onMouseEnter = jest.fn()

    render(
      <BreadcrumbLink onMouseEnter={onMouseEnter} href={TEST_LINK}>
        {TEST_TEXT_01}
      </BreadcrumbLink>
    )
    const link = screen.getByRole('link')
    fireEvent.mouseEnter(link)

    expect(onMouseEnter).toHaveBeenCalledTimes(1)
  })

  it('should allow to prop to pass through', () => {
    const { container } = render(
      <BreadcrumbLink to={TEST_TO}>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const link = container.querySelector('a')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('to', TEST_TO)
  })

  it('should not render a link when not given an href prop', () => {
    const { container } = render(
      <BreadcrumbLink>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const elementWithHref = container.querySelector('[href]')
    const anchor = container.querySelector('a')
    const span = container.querySelector('span')

    expect(elementWithHref).toBeNull()
    expect(anchor).toBeNull()
    expect(span).toBeInTheDocument()
    expect(span).toHaveTextContent(TEST_TEXT_01)
  })

  it('should not render a button when not given an onClick prop', () => {
    const { container } = render(
      <BreadcrumbLink>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const button = container.querySelector('button')
    const span = container.querySelector('span')

    expect(button).toBeNull()
    expect(span).toBeInTheDocument()
    expect(span).toHaveTextContent(TEST_TEXT_01)
  })

  it('should meet a11y standards as a link', async () => {
    const { container } = render(
      <BreadcrumbLink href={TEST_LINK}>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should meet a11y standards as a span', async () => {
    const { container } = render(
      <BreadcrumbLink>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver
  })
})
