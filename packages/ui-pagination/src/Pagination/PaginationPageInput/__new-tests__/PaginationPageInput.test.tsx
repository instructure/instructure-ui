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
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { PaginationPageInput } from '../index'

const defaultSRLabel = (currentPage: number, numberOfPages: number) =>
  `Select page (${currentPage} of ${numberOfPages})`

describe('<PaginationPageInput />', () => {
  it('should render', async () => {
    const defaultOnChange = jest.fn()
    render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={0}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const input = screen.getByRole('spinbutton')

    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('should display the current page number', async () => {
    const defaultOnChange = jest.fn()
    render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const input = screen.getByRole('spinbutton')

    expect(input).toHaveAttribute('value', '4')
  })

  it('should correctly update page number', async () => {
    const defaultOnChange = jest.fn()
    const { rerender } = render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const input = screen.getByRole('spinbutton')

    expect(input).toHaveAttribute('value', '4')

    // Set currentPageIndex: 6
    rerender(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={6}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    expect(input).toHaveAttribute('value', '7')
  })

  it("shouldn't display the arrow keys of NumberInput", async () => {
    const defaultOnChange = jest.fn()
    const { container } = render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const arrowButtons = screen.queryAllByRole('button')
    expect(arrowButtons.length).toBe(0)

    const arrowKeys = container.querySelectorAll('svg')
    expect(arrowKeys.length).toBe(0)
  })

  it("should disable the input on 'disabled'", async () => {
    const defaultOnChange = jest.fn()
    render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
        disabled
      />
    )
    const input = screen.getByRole('spinbutton')

    expect(input).toHaveAttribute('disabled')
  })

  it('should set the ScreenReaderLabel for the input', async () => {
    const defaultOnChange = jest.fn()
    const { container } = render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const label = container.querySelector('label')

    expect(label).toHaveTextContent('Select page (4 of 10)')
  })

  it('should display the number of pages in the label', async () => {
    const defaultOnChange = jest.fn()
    const { container } = render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
        label={(numberOfPages) => `of ${numberOfPages}`}
      />
    )
    const label = container.querySelector('label')

    expect(label).toHaveTextContent('of 10')
  })
})
