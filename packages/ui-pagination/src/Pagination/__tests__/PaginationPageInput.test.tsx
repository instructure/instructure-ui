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
import { describe, it, expect, vi } from 'vitest'

import { Pagination } from '@instructure/ui-pagination/latest'
import { PaginationPageInput } from '../v2/PaginationPageInput/index.js'

const defaultSRLabel = (currentPage: number, numberOfPages: number) =>
  `Select page (${currentPage} of ${numberOfPages})`

describe('<PaginationPageInput />', () => {
  it('should render', async () => {
    const defaultOnChange = vi.fn()
    await render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={0}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const input = page.getByRole('spinbutton').element()

    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('should display the current page number', async () => {
    const defaultOnChange = vi.fn()
    await render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const input = page.getByRole('spinbutton').element()

    expect(input).toHaveAttribute('value', '4')
  })

  it('should correctly update page number', async () => {
    const defaultOnChange = vi.fn()
    const { rerender } = await render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const input = page.getByRole('spinbutton').element()

    expect(input).toHaveAttribute('value', '4')

    // Set currentPageIndex: 6
    await rerender(
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
    const defaultOnChange = vi.fn()
    const { container } = await render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const arrowButtons = page.getByRole('button').elements()
    expect(arrowButtons.length).toBe(0)

    const arrowKeys = container.querySelectorAll('svg')
    expect(arrowKeys.length).toBe(0)
  })

  it("should disable the input on 'disabled'", async () => {
    const defaultOnChange = vi.fn()
    await render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
        disabled
      />
    )
    const input = page.getByRole('spinbutton').element()

    expect(input).toHaveAttribute('disabled')
  })

  it('should set the ScreenReaderLabel for the input', async () => {
    const defaultOnChange = vi.fn()
    const { container } = await render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
      />
    )
    const label = container.querySelector('label')

    expect(label).toMatchTextContent('Select page (4 of 10)')
  })

  it('should display the number of pages in the label', async () => {
    const defaultOnChange = vi.fn()
    const { container } = await render(
      <PaginationPageInput
        numberOfPages={10}
        currentPageIndex={3}
        onChange={defaultOnChange}
        screenReaderLabel={defaultSRLabel}
        label={(numberOfPages) => `of ${numberOfPages}`}
      />
    )
    const label = container.querySelector('label')

    expect(label).toMatchTextContent('of 10')
  })

  describe('Component tests', () => {
    const renderPagination = (onPageChange = vi.fn()) =>
      render(
        <Pagination
          as="nav"
          margin="small"
          variant="input"
          labelNext="Next Page"
          labelPrev="Previous Page"
          currentPage={4}
          totalPageNumber={10}
          onPageChange={onPageChange}
        />
      )

    it('should update the number in the input on typing a number', async () => {
      const { container } = await renderPagination()
      const input = container.querySelector('input')!

      expect(input).toHaveValue(4)

      await userEvent.clear(input)
      await userEvent.type(input, '6')

      expect(input).toHaveValue(6)
    })

    it('should not update the input on typing a letter', async () => {
      const { container } = await renderPagination()
      const input = container.querySelector('input')!

      expect(input).toHaveValue(4)

      await userEvent.clear(input)
      await userEvent.type(input, 'a')

      expect(input.value).toBe('')
    })

    it("shouldn't call onChange on input typing", async () => {
      const onChange = vi.fn()
      const { container } = await renderPagination(onChange)
      const input = container.querySelector('input')!

      await userEvent.clear(input)
      await userEvent.type(input, '6')

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should keep the number in the input, on input and Enter', async () => {
      const { container } = await renderPagination()
      const input = container.querySelector('input')!

      await userEvent.clear(input)
      await userEvent.type(input, '6')
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(input).toHaveValue(6)
      })
    })

    it('should call onChange on successful update, on input and Enter', async () => {
      const onChange = vi.fn()
      const { container } = await renderPagination(onChange)
      const input = container.querySelector('input')!

      expect(input).toHaveValue(4)

      await userEvent.clear(input)
      await userEvent.type(input, '6')
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(onChange.mock.calls[0][0]).toBe(6)
      })
    })

    it('should set MAX value on too big number, on input and Enter', async () => {
      const onChange = vi.fn()
      const { container } = await renderPagination(onChange)
      const input = container.querySelector('input')!

      await userEvent.clear(input)
      await userEvent.type(input, '200')
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(input).toHaveValue(10)
        expect(onChange.mock.calls[0][0]).toBe(10)
      })
    })

    it('should set MIN value on too small number, on input and Enter', async () => {
      const onChange = vi.fn()
      const { container } = await renderPagination(onChange)
      const input = container.querySelector('input')!

      await userEvent.clear(input)
      await userEvent.type(input, '0')
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(input).toHaveValue(1)
        expect(onChange.mock.calls[0][0]).toBe(1)
      })
    })

    it('should reset current value and not call onChange on empty string, on input and Enter', async () => {
      const onChange = vi.fn()
      const { container } = await renderPagination(onChange)
      const input = container.querySelector('input')!

      await userEvent.clear(input)
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(input).toHaveValue(4)
      })
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should increment value and call onChange on up arrow', async () => {
      const onChange = vi.fn()
      const { container } = await renderPagination(onChange)
      const input = container.querySelector('input')!

      expect(input).toHaveValue(4)

      input.focus()
      await userEvent.keyboard('{ArrowUp}')

      await vi.waitFor(() => {
        expect(input).toHaveValue(5)
        expect(onChange.mock.calls[0][0]).toBe(5)
      })
    })

    it('should decrement value and call onChange on down arrow', async () => {
      const onChange = vi.fn()
      const { container } = await renderPagination(onChange)
      const input = container.querySelector('input')!

      expect(input).toHaveValue(4)

      input.focus()
      await userEvent.keyboard('{ArrowDown}')

      await vi.waitFor(() => {
        expect(input).toHaveValue(3)
        expect(onChange.mock.calls[0][0]).toBe(3)
      })
    })
  })
})
