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
import { runAxeCheck } from '@instructure/ui-axe-check'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { Pagination, PaginationButton } from '../index'
import { View } from '@instructure/ui-view'
import type { ViewOwnProps } from '@instructure/ui-view'

const buildPages = (count = 4, current = 0) => {
  return Array.from(Array(count)).map((_v, i) => {
    return (
      <PaginationButton key={i} current={i === current}>
        #{i}
      </PaginationButton>
    )
  })
}

describe('<Pagination />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
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

  it('should render all pages buttons', async () => {
    render(<Pagination variant="compact">{buildPages(5)}</Pagination>)

    const buttons = screen.getAllByRole('button')
    const pagination = screen.getByRole('navigation')

    expect(buttons.length).toEqual(5)
    expect(pagination).toHaveTextContent('#0#1#2#3#4')
  })

  describe('with 5 or less pages', () => {
    it('should not render next/prev buttons', async () => {
      render(
        <Pagination
          label="Example"
          variant="compact"
          labelNext="Next"
          labelPrev="Prev"
        >
          {buildPages(5)}
        </Pagination>
      )

      const pagination = screen.queryByText('Example')
      const nextButton = screen.queryByText('Next')
      const prevButton = screen.queryByText('Prev')

      expect(pagination).toBeInTheDocument()
      expect(nextButton).not.toBeInTheDocument()
      expect(prevButton).not.toBeInTheDocument()
    })

    it('should not render first/last buttons', async () => {
      render(
        <Pagination
          label="Example"
          variant="compact"
          labelNext="Next"
          labelPrev="Prev"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(5)}
        </Pagination>
      )

      const pagination = screen.queryByText('Example')
      const firstButton = screen.queryByText('First')
      const lastButton = screen.queryByText('Last')

      expect(pagination).toBeInTheDocument()
      expect(firstButton).not.toBeInTheDocument()
      expect(lastButton).not.toBeInTheDocument()
    })
  })

  describe('should meet a11y standards', () => {
    it('by default', async () => {
      const { container } = render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
          {buildPages(5)}
        </Pagination>
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('by default with more pages', async () => {
      const { container } = render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
          {buildPages(8)}
        </Pagination>
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('with first/last arrows', async () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Prev"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(8)}
        </Pagination>
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('with disabled arrows', async () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Prev"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
          showDisabledButtons
        >
          {buildPages(8)}
        </Pagination>
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })
  })

  it('should render page buttons', async () => {
    render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(5)}
      </Pagination>
    )
    const buttons = screen.getAllByRole('button')
    const pagination = screen.getByRole('navigation')

    expect(buttons.length).toEqual(5)
    expect(pagination).toHaveTextContent('#0#1#2#3#4')
  })

  it('should render a single page button', async () => {
    render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(1)}
      </Pagination>
    )
    const buttons = screen.getAllByRole('button')
    const pagination = screen.getByRole('navigation')

    expect(buttons.length).toEqual(1)
    expect(pagination).toHaveTextContent('#0')
  })

  it('should render nothing if there are no pages', async () => {
    render(<Pagination variant="compact" labelNext="Next" labelPrev="Prev" />)
    const pagination = screen.getByRole('navigation')
    const buttons = screen.queryAllByRole('button')

    expect(pagination).toBeInTheDocument()
    expect(buttons.length).toEqual(0)
  })

  it('should truncate pages to context', async () => {
    render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(9, 3)}
      </Pagination>
    )
    const pagination = screen.getByRole('navigation')
    const allButtons = screen.queryAllByRole('button')
    const paginationButtons = screen.getAllByRole('button', { name: /^#\d$/ })
    const ellipses = screen.getAllByText('…', {
      selector: '[aria-hidden="true"]'
    })

    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveTextContent('Prev#0…#2#3#4#5#6…#8Next')

    expect(allButtons.length).toEqual(9)
    expect(paginationButtons.length).toEqual(7)
    expect(ellipses.length).toEqual(2)
  })

  it('should truncate start', async () => {
    render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(9, 8)}
      </Pagination>
    )

    const pagination = screen.getByRole('navigation')
    const allButtons = screen.queryAllByRole('button')
    const paginationButtons = screen.getAllByRole('button', { name: /^#\d$/ })
    const ellipses = screen.getAllByText('…', {
      selector: '[aria-hidden="true"]'
    })

    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveTextContent('Prev#0…#5#6#7#8')

    expect(allButtons.length).toEqual(6)
    expect(paginationButtons.length).toEqual(5)
    expect(ellipses.length).toEqual(1)
  })

  it('should truncate end', async () => {
    render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(6)}
      </Pagination>
    )

    const pagination = screen.getByRole('navigation')
    const allButtons = screen.queryAllByRole('button')
    const paginationButtons = screen.getAllByRole('button', { name: /^#\d$/ })
    const ellipses = screen.getAllByText('…', {
      selector: '[aria-hidden="true"]'
    })

    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveTextContent('#0#1#2#3…#5Next')

    expect(allButtons.length).toEqual(6)
    expect(paginationButtons.length).toEqual(5)
    expect(ellipses.length).toEqual(1)
  })

  it('should omit ellipses when bounds included in context', async () => {
    render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(7, 2)}
      </Pagination>
    )

    const pagination = screen.getByRole('navigation')
    const allButtons = screen.queryAllByRole('button')
    const paginationButtons = screen.getAllByRole('button', { name: /^#\d$/ })
    const ellipses = screen.queryAllByText('…', {
      selector: '[aria-hidden="true"]'
    })

    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveTextContent('Prev#0#1#2#3#4#5#6Next')

    expect(allButtons.length).toEqual(9)
    expect(paginationButtons.length).toEqual(7)
    expect(ellipses.length).toEqual(0)
  })

  describe('when updating with the FIRST page becoming current', () => {
    it('should move focus from the Previous Page button to the first page button', async () => {
      const { rerender } = render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 1)}
        </Pagination>
      )

      const prevButton = screen.getByRole('button', { name: 'Previous' })

      prevButton.focus()
      expect(prevButton).toHaveFocus()

      // Set children: buildPages(7, 0)
      rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 0)}
        </Pagination>
      )

      const button0 = screen.getByRole('button', { name: '#0' })
      expect(button0).toHaveFocus()
    })

    it('should move focus from the First Page button to the first page button', async () => {
      const { rerender } = render(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(7, 2)}
        </Pagination>
      )

      const firstButton = screen.getByRole('button', { name: 'First' })

      firstButton.focus()
      expect(firstButton).toHaveFocus()

      // Set children: buildPages(7, 0)
      rerender(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(7, 0)}
        </Pagination>
      )
      const button0 = screen.getByRole('button', { name: '#0' })
      expect(button0).toHaveFocus()
    })

    it('should not change focus when the Previous Page button did not have focus', async () => {
      const { rerender } = render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 1)}
        </Pagination>
      )

      const button1 = screen.getByRole('button', { name: '#1' })

      button1.focus()
      expect(button1).toHaveFocus()

      rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 0)}
        </Pagination>
      )

      expect(button1).toHaveFocus()
    })

    it('should not change focus when the First Page button did not have focus', async () => {
      const { rerender } = render(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(7, 1)}
        </Pagination>
      )
      const button1 = screen.getByRole('button', { name: '#1' })

      button1.focus()
      expect(button1).toHaveFocus()

      rerender(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(7, 0)}
        </Pagination>
      )

      expect(button1).toHaveFocus()
    })

    it('should not continue to change focus on subsequent updates', async () => {
      const { rerender } = render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 1)}
        </Pagination>
      )

      const prevButton = screen.getByRole('button', { name: 'Previous' })

      prevButton.focus()
      expect(prevButton).toHaveFocus()

      // Set children: buildPages(7, 0)
      rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 0)}
        </Pagination>
      )
      const button1 = screen.getByRole('button', { name: '#1' })

      button1.focus()
      expect(button1).toHaveFocus()

      // Set children: buildPages(7, 0)
      rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 0)}
        </Pagination>
      )

      expect(button1).toHaveFocus()
    })
  })

  describe('when updating with the LAST page becoming current', () => {
    it('should move focus from the Next Page button to the last page button', async () => {
      const { rerender } = render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )
      const nextButton = screen.getByRole('button', { name: 'Next' })

      nextButton.focus()
      expect(nextButton).toHaveFocus()

      // Set children: buildPages(7, 6)
      rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 6)}
        </Pagination>
      )
      const button6 = screen.getByRole('button', { name: '#6' })

      expect(button6).toHaveFocus()
    })

    it('should move focus from the Last Page button to the last page button', async () => {
      const { rerender } = render(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(7, 4)}
        </Pagination>
      )
      const lastButton = screen.getByRole('button', { name: 'Last' })

      lastButton.focus()
      expect(lastButton).toHaveFocus()

      // Set children: buildPages(7, 6)
      rerender(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(7, 6)}
        </Pagination>
      )
      const button6 = screen.getByRole('button', { name: '#6' })

      expect(button6).toHaveFocus()
    })

    it('should not change focus when the Next Page button did not have focus', async () => {
      const { rerender } = render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )
      const button5 = screen.getByRole('button', { name: '#5' })

      button5.focus()
      expect(button5).toHaveFocus()

      // Set children: buildPages(7, 5)
      rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )
      expect(button5).toHaveFocus()
    })

    it('should not change focus when the Last Page button did not have focus', async () => {
      const { rerender } = render(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(7, 5)}
        </Pagination>
      )
      const button5 = screen.getByRole('button', { name: '#5' })

      button5.focus()
      expect(button5).toHaveFocus()

      // Set children: buildPages(7, 6)
      rerender(
        <Pagination
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          withFirstAndLastButton
        >
          {buildPages(7, 6)}
        </Pagination>
      )

      expect(button5).toHaveFocus()
    })

    it('should not continue to change focus on subsequent updates', async () => {
      const { rerender } = render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )
      const nextButton = screen.getByRole('button', { name: 'Next' })

      nextButton.focus()
      expect(nextButton).toHaveFocus()

      // Set children: buildPages(7, 6)
      rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 6)}
        </Pagination>
      )
      const button5 = screen.getByRole('button', { name: '#5' })

      button5.focus()
      expect(button5).toHaveFocus()

      // Set children: buildPages(7, 6)
      rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 6)}
        </Pagination>
      )
      expect(button5).toHaveFocus()
    })
  })

  describe('arrows', () => {
    describe('should render', () => {
      it('only the stepper arrows when available', async () => {
        const { rerender } = render(
          <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
            {buildPages(6)}
          </Pagination>
        )
        const prevButton = screen.queryByRole('button', { name: 'Previous' })
        const nextButton = screen.queryByRole('button', { name: 'Next' })

        expect(prevButton).not.toBeInTheDocument()
        expect(nextButton).toBeInTheDocument()

        // Set children: buildPages(6, 5)
        rerender(
          <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
            {buildPages(6, 5)}
          </Pagination>
        )
        const prevButtonUpdated = screen.queryByRole('button', {
          name: 'Previous'
        })
        const nextButtonUpdated = screen.queryByRole('button', { name: 'Next' })

        expect(prevButtonUpdated).toBeInTheDocument()
        expect(nextButtonUpdated).not.toBeInTheDocument()
      })

      it('the First and Last arrows withFirstAndLastButton', async () => {
        const { rerender } = render(
          <Pagination
            variant="compact"
            labelNext="Next"
            labelPrev="Previous"
            labelFirst="First"
            labelLast="Last"
            withFirstAndLastButton
          >
            {buildPages(6)}
          </Pagination>
        )
        const firstButton = screen.queryByRole('button', { name: 'First' })
        const lastButton = screen.queryByRole('button', { name: 'Last' })

        expect(firstButton).not.toBeInTheDocument()
        expect(lastButton).toBeInTheDocument()

        // Set children: buildPages(6, 5)
        rerender(
          <Pagination
            variant="compact"
            labelNext="Next"
            labelPrev="Previous"
            labelFirst="First"
            labelLast="Last"
            withFirstAndLastButton
          >
            {buildPages(6, 5)}
          </Pagination>
        )
        const firstButtonUpdated = screen.queryByRole('button', {
          name: 'First'
        })
        const lastButtonUpdated = screen.queryByRole('button', { name: 'Last' })

        expect(firstButtonUpdated).toBeInTheDocument()
        expect(lastButtonUpdated).not.toBeInTheDocument()
      })

      it('the disabled arrows with showDisabledButtons', async () => {
        const { rerender } = render(
          <Pagination
            variant="compact"
            labelNext="Next"
            labelPrev="Previous"
            labelFirst="First"
            labelLast="Last"
            withFirstAndLastButton
            showDisabledButtons
          >
            {buildPages(6)}
          </Pagination>
        )

        const firstButton = screen.getByRole('button', { name: 'First' })
        const prevButton = screen.getByRole('button', { name: 'Previous' })
        const nextButton = screen.getByRole('button', { name: 'Next' })
        const lastButton = screen.getByRole('button', { name: 'Last' })

        expect(firstButton).toBeDisabled()
        expect(prevButton).toBeDisabled()
        expect(nextButton).not.toBeDisabled()
        expect(lastButton).not.toBeDisabled()

        // Go to last item
        // Set children: buildPages(6, 5)
        rerender(
          <Pagination
            variant="compact"
            labelNext="Next"
            labelPrev="Previous"
            labelFirst="First"
            labelLast="Last"
            withFirstAndLastButton
            showDisabledButtons
          >
            {buildPages(6, 5)}
          </Pagination>
        )
        const firstButtonUpdated = screen.getByRole('button', { name: 'First' })
        const prevButtonUpdated = screen.getByRole('button', {
          name: 'Previous'
        })
        const nextButtonUpdated = screen.getByRole('button', { name: 'Next' })
        const lastButtonUpdated = screen.getByRole('button', { name: 'Last' })

        expect(firstButtonUpdated).not.toBeDisabled()
        expect(prevButtonUpdated).not.toBeDisabled()
        expect(nextButtonUpdated).toBeDisabled()
        expect(lastButtonUpdated).toBeDisabled()
      })
    })

    it('should not continue to change focus on subsequent updates', async () => {
      const { rerender } = render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(6)}
        </Pagination>
      )

      const prevButton = screen.queryByRole('button', { name: 'Previous' })
      expect(prevButton).not.toBeInTheDocument()

      const nextButton = screen.queryByRole('button', { name: 'Next' })
      expect(nextButton).toBeInTheDocument()

      // Set children: buildPages(6, 5)
      rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(6, 5)}
        </Pagination>
      )

      const prevButtonUpdated = screen.queryByRole('button', {
        name: 'Previous'
      })
      expect(prevButtonUpdated).toBeInTheDocument()

      const nextButtonUpdated = screen.queryByRole('button', { name: 'Next' })
      expect(nextButtonUpdated).not.toBeInTheDocument()
    })

    describe('when passing down props to View', () => {
      const allowedProps: Partial<ViewOwnProps> = {
        margin: 'small',
        as: 'section'
      }

      View.allowedProps
        .filter((prop) => prop !== 'elementRef' && prop !== 'children')
        .forEach((prop) => {
          if (Object.keys(allowedProps).indexOf(prop) < 0) {
            it(`should NOT allow the '${prop}' prop`, async () => {
              const expectedErrorMessageRegExp = new RegExp(
                `^Warning: \\[(undefined|Pagination)\\] prop '${prop}' is not allowed\\.$`,
                'i'
              )
              const props = { [prop]: 'foo' }

              render(
                <Pagination
                  variant="compact"
                  labelNext="Next"
                  labelPrev="Previous"
                  {...props}
                >
                  {buildPages(6)}
                </Pagination>
              )
              await waitFor(() => {
                expect(consoleErrorMock.mock.calls[0][0]).toMatch(
                  expectedErrorMessageRegExp
                )
              })
            })
          } else {
            it(`should allow the '${prop}' prop`, async () => {
              const props = { [prop]: allowedProps[prop] }

              render(
                <Pagination
                  variant="compact"
                  labelNext="Next"
                  labelPrev="Previous"
                  {...props}
                >
                  {buildPages(6)}
                </Pagination>
              )
              await waitFor(() => {
                expect(consoleErrorMock).not.toHaveBeenCalled()
              })
            })
          }
        })
    })

    it(`should pass down the elementRef prop`, async () => {
      const elementRef = vi.fn()

      const { container } = render(
        <Pagination
          elementRef={elementRef}
          variant="compact"
          labelNext="Next"
          labelPrev="Previous"
        >
          {buildPages(6)}
        </Pagination>
      )
      expect(elementRef).toHaveBeenCalledWith(container.firstChild)
    })

    it('should navigate to adjacent pages', async () => {
      const onClick = vi.fn()

      render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {[
            ...buildPages(6, 5),
            <PaginationButton key="last" onClick={onClick}>
              Last
            </PaginationButton>
          ]}
        </Pagination>
      )
      const nextButton = screen.getByRole('button', { name: 'Next' })

      await userEvent.click(nextButton)

      await waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })
  })

  describe('input variant', () => {
    it('should display number input', async () => {
      const { container } = render(
        <Pagination
          variant="input"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
        >
          {[...buildPages(6, 2)]}
        </Pagination>
      )
      const numberInput = container.querySelector('input')

      expect(numberInput).toHaveValue(3)
    })

    it('should display all arrow buttons', async () => {
      render(
        <Pagination
          variant="input"
          labelNext="Next"
          labelPrev="Prev"
          labelFirst="First"
          labelLast="Last"
        >
          {[...buildPages(6, 2)]}
        </Pagination>
      )

      const firstButton = screen.getByRole('button', { name: 'First' })
      const prevButton = screen.getByRole('button', { name: 'Prev' })
      const nextButton = screen.getByRole('button', { name: 'Next' })
      const lastButton = screen.getByRole('button', { name: 'Last' })

      expect(firstButton).toBeVisible()
      expect(prevButton).toBeVisible()
      expect(nextButton).toBeVisible()
      expect(lastButton).toBeVisible()
    })

    it('should pass label', async () => {
      const { container } = render(
        <Pagination
          variant="input"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          labelNumberInput={(numberOfPages) =>
            `custom-input-label: ${numberOfPages}`
          }
        >
          {[...buildPages(6, 2)]}
        </Pagination>
      )

      expect(container).toHaveTextContent('custom-input-label: 6')
    })

    it('should pass ScreenReaderLabel', async () => {
      const { container } = render(
        <Pagination
          variant="input"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          screenReaderLabelNumberInput={(currentPage, numberOfPages) =>
            `number: ${numberOfPages}, current: ${currentPage}`
          }
        >
          {[...buildPages(6, 2)]}
        </Pagination>
      )

      expect(container).toHaveTextContent('number: 6, current: 3')
    })

    it('should change pages on input change', async () => {
      const onClick1 = vi.fn()
      const onClick2 = vi.fn()

      const { container } = render(
        <Pagination
          variant="input"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          screenReaderLabelNumberInput={(currentPage, numberOfPages) =>
            `number: ${numberOfPages}, current: ${currentPage}`
          }
        >
          <PaginationButton key={1} onClick={onClick1} current>
            1
          </PaginationButton>
          <PaginationButton key={2} onClick={onClick2}>
            2
          </PaginationButton>
        </Pagination>
      )
      const numberInput = container.querySelector('input')

      await userEvent.type(numberInput!, '2{enter}')

      await waitFor(() => {
        expect(onClick2).toHaveBeenCalled()
      })
    })
  })

  describe('with minimal config', () => {
    it('should render the correct pages - 1', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
        />
      )
      expect(container.firstChild).toHaveTextContent('12…9Next Page')
    })
    it('should render the correct pages - 2', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page1…456…9Next Page'
      )
    })
    it('should render the correct pages - 3', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
          siblingCount={1}
          boundaryCount={3}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page123456789Next Page'
      )
    })
    it('should render the correct pages - 4', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
          siblingCount={1}
          boundaryCount={2}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page12…456…89Next Page'
      )
    })
    it('should render the correct pages - 5', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
          siblingCount={100}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page123456789Next Page'
      )
    })
    it('should render the correct pages - 6', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={5}
          boundaryCount={100}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page123456789Next Page'
      )
    })
    it('should render the correct pages - 7', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={1}
          boundaryCount={3}
          siblingCount={1}
        />
      )
      expect(container.firstChild).toHaveTextContent('123…789Next Page')
    })
    it('should render the correct ellipsis', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
          currentPage={1}
          boundaryCount={3}
          siblingCount={1}
          ellipsis="<->"
        />
      )
      expect(container.firstChild).toHaveTextContent('123<->789Next Page')
    })
    it('should render custom buttons', () => {
      const pageMap = ['A-G', 'H-J', 'K-M', 'N-Q', 'R-Z']
      const { container } = render(
        <Pagination
          variant="full"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={5}
          currentPage={1}
          renderPageIndicator={(page) => pageMap[page - 1]}
        />
      )
      expect(container.firstChild).toHaveTextContent('A-GH-JK-MN-QR-Z')
    })
    it('should render huge "totalPageNumber"s properly', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={1000000000000000}
          currentPage={5678}
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'Previous Page1…567756785679…1000000000000000Next Page'
      )
    })
    it('should render first and last buttons', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          labelFirst="First Page"
          labelLast="Last Page"
          totalPageNumber={100}
          currentPage={5}
          withFirstAndLastButton
        />
      )
      expect(container.firstChild).toHaveTextContent(
        'First PagePrevious Page1…456…100Next PageLast Page'
      )
    })
    it('should render every page if boundary and sibling counts are big enough', () => {
      const { container } = render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={10}
          currentPage={1}
          siblingCount={5}
          boundaryCount={4}
        />
      )
      expect(container.firstChild).toHaveTextContent('12345678910Next Page')
    })
  })
})
