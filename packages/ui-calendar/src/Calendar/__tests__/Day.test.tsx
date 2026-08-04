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
import { CalendarDay as Day } from '@instructure/ui-calendar/latest'

describe('Day', () => {
  it('should render children', async () => {
    const { rerender } = await render(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
      >
        8
      </Day>
    )
    const child = page.getByText('8', { exact: true }).element()

    expect(child).toBeInTheDocument()

    await rerender(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
      >
        31
      </Day>
    )
    const childUpdated = page.getByText('31', { exact: true }).element()

    expect(childUpdated).toBeInTheDocument()
  })

  it('should have an accessible label', async () => {
    const label = '1 August 2019 Friday'
    const { container } = await render(
      <Day date="2019-08-02" label={label} selectedLabel="Selected">
        8
      </Day>
    )
    const screenReaderContent = container.querySelector(
      '[class*="-screenReaderContent"]'
    )

    expect(screenReaderContent).toBeInTheDocument()
    expect(screenReaderContent).toHaveTextContent(label)
  })

  it('should set aria-current="date" when `isToday`', async () => {
    const { container, rerender } = await render(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        isToday
      >
        8
      </Day>
    )
    const today = container.querySelector('[class*="-calendarDay"]')

    expect(today).toHaveAttribute('aria-current', 'date')

    await rerender(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        isToday={false}
      >
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')

    expect(day).not.toHaveAttribute('aria-current', 'date')
  })

  it('should not set aria-selected without a role', async () => {
    const { container, rerender } = await render(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
      >
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')

    expect(day).not.toHaveAttribute('aria-selected')

    await rerender(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        isSelected={true}
      >
        8
      </Day>
    )
    const daySelected = container.querySelector('[class*="-calendarDay"]')

    expect(daySelected).not.toHaveAttribute('aria-selected')
  })

  it('should set aria-selected="true/false" when `isSelected` and `role` is `option` or `gridcell`', async () => {
    const { container, rerender } = await render(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        role="option"
      >
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')
    expect(day).toHaveAttribute('aria-selected', 'false')

    await rerender(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        role="option"
        isSelected={true}
      >
        8
      </Day>
    )
    const daySelected = container.querySelector('[class*="-calendarDay"]')
    expect(daySelected).toHaveAttribute('aria-selected', 'true')

    await rerender(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        role="gridcell"
        isSelected={false}
      >
        8
      </Day>
    )
    const dayCell = container.querySelector('[class*="-calendarDay"]')
    expect(dayCell).toHaveAttribute('aria-selected', 'false')

    await rerender(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        role="gridcell"
        isSelected={true}
      >
        8
      </Day>
    )
    const dayCellSelected = container.querySelector('[class*="-calendarDay"]')
    expect(dayCellSelected).toHaveAttribute('aria-selected', 'true')
  })

  it('should call onClick with date', async () => {
    const onClick = vi.fn()
    const date = '2019-08-02'

    const { container } = await render(
      <Day
        date={date}
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        onClick={onClick}
      >
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')

    await userEvent.click(day!)

    await vi.waitFor(() => {
      const args = onClick.mock.calls[0][1]

      expect(onClick).toHaveBeenCalledTimes(1)
      expect(args).toHaveProperty('date', date)
    })
  })

  it('should call onKeyDown with date', async () => {
    const onKeyDown = vi.fn()
    const date = '2019-08-02'

    const { container } = await render(
      <Day
        date={date}
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        onKeyDown={onKeyDown}
        onClick={() => {}}
      >
        8
      </Day>
    )

    const day = container.querySelector('[class*="-calendarDay"]')!

    await userEvent.type(day, '{enter}')

    await vi.waitFor(() => {
      const args = onKeyDown.mock.calls[0][1]

      expect(onKeyDown).toHaveBeenCalledTimes(1)
      expect(args).toHaveProperty('date', date)
    })
  })

  it('should apply disabled when interaction is `disabled`', async () => {
    const onClick = vi.fn()

    const { container } = await render(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        onClick={onClick}
        interaction="disabled"
      >
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')!

    // `force` because Playwright refuses to click disabled elements
    await userEvent.click(day, { force: true })

    await vi.waitFor(() => {
      expect(onClick).not.toHaveBeenCalled()
      expect(day).toHaveAttribute('disabled')
    })
  })

  it('should provide an elementRef', async () => {
    let element
    const elementRef = (el: Element | null) => {
      element = el
    }
    const { container } = await render(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        selectedLabel="Selected"
        elementRef={elementRef}
      >
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')

    expect(day).toEqual(element)
  })

  describe('element type', () => {
    it('should render as a span by default', async () => {
      const { container } = await render(
        <Day
          date="2019-08-02"
          label="1 August 2019 Friday"
          selectedLabel="Selected"
        >
          8
        </Day>
      )
      const day = container.querySelector('[class*="-calendarDay"]')

      expect(day?.tagName).toEqual('SPAN')
    })

    it('should render as a button when onClick is provided', async () => {
      const { container } = await render(
        <Day
          date="2019-08-02"
          label="1 August 2019 Friday"
          selectedLabel="Selected"
          onClick={() => {}}
        >
          8
        </Day>
      )
      const day = container.querySelector('[class*="-calendarDay"]')

      expect(day?.tagName).toEqual('BUTTON')
    })

    it('default elementTypes should be overwritten when `as` prop is set', async () => {
      const { container } = await render(
        <Day
          date="2019-08-02"
          label="1 August 2019 Friday"
          selectedLabel="Selected"
          onClick={() => {}}
          as="li"
        >
          8
        </Day>
      )
      const day = container.querySelector('[class*="-calendarDay"]')

      expect(day?.tagName).toEqual('LI')
    })
  })
})
