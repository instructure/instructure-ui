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
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { Day } from '../index'

describe('Day', () => {
  it('should render children', async () => {
    const { rerender } = render(
      <Day date="2019-08-02" label="1 August 2019 Friday">
        8
      </Day>
    )
    const child = screen.getByText('8')

    expect(child).toBeInTheDocument()

    rerender(
      <Day date="2019-08-02" label="1 August 2019 Friday">
        31
      </Day>
    )
    const childUpdated = screen.getByText('31')

    expect(childUpdated).toBeInTheDocument()
  })

  it('should have an accessible label', async () => {
    const label = '1 August 2019 Friday'
    const { container } = render(
      <Day date="2019-08-02" label={label}>
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
    const { container, rerender } = render(
      <Day date="2019-08-02" label="1 August 2019 Friday" isToday>
        8
      </Day>
    )
    const today = container.querySelector('[class*="-calendarDay"]')

    expect(today).toHaveAttribute('aria-current', 'date')

    rerender(
      <Day date="2019-08-02" label="1 August 2019 Friday" isToday={false}>
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')

    expect(day).not.toHaveAttribute('aria-current', 'date')
  })

  it('should not set aria-selected without a role', async () => {
    const { container, rerender } = render(
      <Day date="2019-08-02" label="1 August 2019 Friday">
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')

    expect(day).not.toHaveAttribute('aria-selected')

    rerender(
      <Day date="2019-08-02" label="1 August 2019 Friday" isSelected={true}>
        8
      </Day>
    )
    const daySelected = container.querySelector('[class*="-calendarDay"]')

    expect(daySelected).not.toHaveAttribute('aria-selected')
  })

  it('should set aria-selected="true/false" when `isSelected` and `role` is `option` or `gridcell`', async () => {
    const { container, rerender } = render(
      <Day date="2019-08-02" label="1 August 2019 Friday" role="option">
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')
    expect(day).toHaveAttribute('aria-selected', 'false')

    rerender(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        role="option"
        isSelected={true}
      >
        8
      </Day>
    )
    const daySelected = container.querySelector('[class*="-calendarDay"]')
    expect(daySelected).toHaveAttribute('aria-selected', 'true')

    rerender(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        role="gridcell"
        isSelected={false}
      >
        8
      </Day>
    )
    const dayCell = container.querySelector('[class*="-calendarDay"]')
    expect(dayCell).toHaveAttribute('aria-selected', 'false')

    rerender(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
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

    const { container } = render(
      <Day date={date} label="1 August 2019 Friday" onClick={onClick}>
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')

    await userEvent.click(day!)

    await waitFor(() => {
      const args = onClick.mock.calls[0][1]

      expect(onClick).toHaveBeenCalledTimes(1)
      expect(args).toHaveProperty('date', date)
    })
  })

  it('should call onKeyDown with date', async () => {
    const onKeyDown = vi.fn()
    const date = '2019-08-02'

    const { container } = render(
      <Day
        date={date}
        label="1 August 2019 Friday"
        onKeyDown={onKeyDown}
        onClick={() => {}}
      >
        8
      </Day>
    )

    const day = container.querySelector('[class*="-calendarDay"]')!

    userEvent.type(day, '{enter}')

    await waitFor(() => {
      const args = onKeyDown.mock.calls[0][1]

      expect(onKeyDown).toHaveBeenCalledTimes(1)
      expect(args).toHaveProperty('date', date)
    })
  })

  it('should apply disabled when interaction is `disabled`', async () => {
    const onClick = vi.fn()

    const { container } = render(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
        onClick={onClick}
        interaction="disabled"
      >
        8
      </Day>
    )
    const day = container.querySelector('[class*="-calendarDay"]')!

    userEvent.click(day)

    await waitFor(() => {
      expect(onClick).not.toHaveBeenCalled()
      expect(day).toHaveAttribute('disabled')
    })
  })

  it('should provide an elementRef', async () => {
    let element
    const elementRef = (el: Element | null) => {
      element = el
    }
    const { container } = render(
      <Day
        date="2019-08-02"
        label="1 August 2019 Friday"
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
      const { container } = render(
        <Day date="2019-08-02" label="1 August 2019 Friday">
          8
        </Day>
      )
      const day = container.querySelector('[class*="-calendarDay"]')

      expect(day?.tagName).toEqual('SPAN')
    })

    it('should render as a button when onClick is provided', async () => {
      const { container } = render(
        <Day date="2019-08-02" label="1 August 2019 Friday" onClick={() => {}}>
          8
        </Day>
      )
      const day = container.querySelector('[class*="-calendarDay"]')

      expect(day?.tagName).toEqual('BUTTON')
    })

    it('default elementTypes should be overwritten when `as` prop is set', async () => {
      const { container } = render(
        <Day
          date="2019-08-02"
          label="1 August 2019 Friday"
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
