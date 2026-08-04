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

import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { View } from '@instructure/ui-view/latest'
import { Pagination, PaginationButton } from '@instructure/ui-pagination/latest'
import type { ViewOwnProps } from '@instructure/ui-view/latest'

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
    await render(<Pagination variant="compact">{buildPages(5)}</Pagination>)

    const buttons = page.getByRole('button').elements()
    const pagination = page.getByRole('navigation').element()

    expect(buttons.length).toEqual(5)
    expect(pagination).toHaveTextContent('#0#1#2#3#4')
  })

  describe('with 5 or less pages', () => {
    it('should not render next/prev buttons', async () => {
      await render(
        <Pagination
          label="Example"
          variant="compact"
          labelNext="Next"
          labelPrev="Prev"
        >
          {buildPages(5)}
        </Pagination>
      )

      const pagination = page.getByText('Example').query()
      const nextButton = page.getByText('Next').query()
      const prevButton = page.getByText('Prev').query()

      expect(pagination).toBeInTheDocument()
      expect(nextButton).not.toBeInTheDocument()
      expect(prevButton).not.toBeInTheDocument()
    })

    it('should not render first/last buttons', async () => {
      await render(
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

      const pagination = page.getByText('Example').query()
      const firstButton = page.getByText('First').query()
      const lastButton = page.getByText('Last').query()

      expect(pagination).toBeInTheDocument()
      expect(firstButton).not.toBeInTheDocument()
      expect(lastButton).not.toBeInTheDocument()
    })
  })

  describe('should meet a11y standards', () => {
    it('by default', async () => {
      const { container } = await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
          {buildPages(5)}
        </Pagination>
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('by default with more pages', async () => {
      const { container } = await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
          {buildPages(8)}
        </Pagination>
      )
      const axeCheck = await runAxeCheck(container)
      expect(axeCheck).toBe(true)
    })

    it('with first/last arrows', async () => {
      const { container } = await render(
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
      const { container } = await render(
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
    await render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(5)}
      </Pagination>
    )
    const buttons = page.getByRole('button').elements()
    const pagination = page.getByRole('navigation').element()

    expect(buttons.length).toEqual(5)
    expect(pagination).toHaveTextContent('#0#1#2#3#4')
  })

  it('should render a single page button', async () => {
    await render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(1)}
      </Pagination>
    )
    const buttons = page.getByRole('button').elements()
    const pagination = page.getByRole('navigation').element()

    expect(buttons.length).toEqual(1)
    expect(pagination).toHaveTextContent('#0')
  })

  it('should render nothing if there are no pages', async () => {
    await render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev" />
    )
    const pagination = page.getByRole('navigation').element()
    const buttons = page.getByRole('button').elements()

    expect(pagination).toBeInTheDocument()
    expect(buttons.length).toEqual(0)
  })

  it('should truncate pages to context', async () => {
    await render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(9, 3)}
      </Pagination>
    )
    const pagination = page.getByRole('navigation').element()
    const allButtons = page.getByRole('button').elements()
    const paginationButtons = page
      .getByRole('button', { name: /^#\d$/ })
      .elements()
    const ellipses = document.querySelectorAll('li[aria-hidden="true"]')

    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveTextContent('Prev#0…#2#3#4#5#6…#8Next')

    expect(allButtons.length).toEqual(9)
    expect(paginationButtons.length).toEqual(7)
    expect(ellipses.length).toEqual(2)
    expect(Array.from(ellipses).every((el) => el.textContent === '…')).toBe(
      true
    )
  })

  it('should truncate start', async () => {
    await render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(9, 8)}
      </Pagination>
    )

    const pagination = page.getByRole('navigation').element()
    const allButtons = page.getByRole('button').elements()
    const paginationButtons = page
      .getByRole('button', { name: /^#\d$/ })
      .elements()
    const ellipses = document.querySelectorAll('li[aria-hidden="true"]')

    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveTextContent('Prev#0…#5#6#7#8')

    expect(allButtons.length).toEqual(6)
    expect(paginationButtons.length).toEqual(5)
    expect(ellipses.length).toEqual(1)
    expect(Array.from(ellipses).every((el) => el.textContent === '…')).toBe(
      true
    )
  })

  it('should truncate end', async () => {
    await render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(6)}
      </Pagination>
    )

    const pagination = page.getByRole('navigation').element()
    const allButtons = page.getByRole('button').elements()
    const paginationButtons = page
      .getByRole('button', { name: /^#\d$/ })
      .elements()
    const ellipses = document.querySelectorAll('li[aria-hidden="true"]')

    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveTextContent('#0#1#2#3…#5Next')

    expect(allButtons.length).toEqual(6)
    expect(paginationButtons.length).toEqual(5)
    expect(ellipses.length).toEqual(1)
    expect(Array.from(ellipses).every((el) => el.textContent === '…')).toBe(
      true
    )
  })

  it('should omit ellipses when bounds included in context', async () => {
    await render(
      <Pagination variant="compact" labelNext="Next" labelPrev="Prev">
        {buildPages(7, 2)}
      </Pagination>
    )

    const pagination = page.getByRole('navigation').element()
    const allButtons = page.getByRole('button').elements()
    const paginationButtons = page
      .getByRole('button', { name: /^#\d$/ })
      .elements()
    const ellipses = document.querySelectorAll('li[aria-hidden="true"]')

    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveTextContent('Prev#0#1#2#3#4#5#6Next')

    expect(allButtons.length).toEqual(9)
    expect(paginationButtons.length).toEqual(7)
    expect(ellipses.length).toEqual(0)
  })

  describe('when updating with the FIRST page becoming current', () => {
    it('should move focus from the Previous Page button to the first page button', async () => {
      const { rerender } = await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 1)}
        </Pagination>
      )

      const prevButton = page
        .getByRole('button', { name: 'Previous' })
        .element()

      prevButton.focus()
      expect(prevButton).toHaveFocus()

      // Set children: buildPages(7, 0)
      await rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 0)}
        </Pagination>
      )

      const button0 = page.getByRole('button', { name: '#0' }).element()
      expect(button0).toHaveFocus()
    })

    it('should move focus from the First Page button to the first page button', async () => {
      const { rerender } = await render(
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

      const firstButton = page.getByRole('button', { name: 'First' }).element()

      firstButton.focus()
      expect(firstButton).toHaveFocus()

      // Set children: buildPages(7, 0)
      await rerender(
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
      const button0 = page.getByRole('button', { name: '#0' }).element()
      expect(button0).toHaveFocus()
    })

    it('should not change focus when the Previous Page button did not have focus', async () => {
      const { rerender } = await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 1)}
        </Pagination>
      )

      const button1 = page.getByRole('button', { name: '#1' }).element()

      button1.focus()
      expect(button1).toHaveFocus()

      await rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 0)}
        </Pagination>
      )

      expect(button1).toHaveFocus()
    })

    it('should not change focus when the First Page button did not have focus', async () => {
      const { rerender } = await render(
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
      const button1 = page.getByRole('button', { name: '#1' }).element()

      button1.focus()
      expect(button1).toHaveFocus()

      await rerender(
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
      const { rerender } = await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 1)}
        </Pagination>
      )

      const prevButton = page
        .getByRole('button', { name: 'Previous' })
        .element()

      prevButton.focus()
      expect(prevButton).toHaveFocus()

      // Set children: buildPages(7, 0)
      await rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 0)}
        </Pagination>
      )
      const button1 = page.getByRole('button', { name: '#1' }).element()

      button1.focus()
      expect(button1).toHaveFocus()

      // Set children: buildPages(7, 0)
      await rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 0)}
        </Pagination>
      )

      expect(button1).toHaveFocus()
    })
  })

  describe('when updating with the LAST page becoming current', () => {
    it('should move focus from the Next Page button to the last page button', async () => {
      const { rerender } = await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )
      const nextButton = page.getByRole('button', { name: 'Next' }).element()

      nextButton.focus()
      expect(nextButton).toHaveFocus()

      // Set children: buildPages(7, 6)
      await rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 6)}
        </Pagination>
      )
      const button6 = page.getByRole('button', { name: '#6' }).element()

      expect(button6).toHaveFocus()
    })

    it('should move focus from the Last Page button to the last page button', async () => {
      const { rerender } = await render(
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
      const lastButton = page.getByRole('button', { name: 'Last' }).element()

      lastButton.focus()
      expect(lastButton).toHaveFocus()

      // Set children: buildPages(7, 6)
      await rerender(
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
      const button6 = page.getByRole('button', { name: '#6' }).element()

      expect(button6).toHaveFocus()
    })

    it('should not change focus when the Next Page button did not have focus', async () => {
      const { rerender } = await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )
      const button5 = page.getByRole('button', { name: '#5' }).element()

      button5.focus()
      expect(button5).toHaveFocus()

      // Set children: buildPages(7, 5)
      await rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )
      expect(button5).toHaveFocus()
    })

    it('should not change focus when the Last Page button did not have focus', async () => {
      const { rerender } = await render(
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
      const button5 = page.getByRole('button', { name: '#5' }).element()

      button5.focus()
      expect(button5).toHaveFocus()

      // Set children: buildPages(7, 6)
      await rerender(
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
      const { rerender } = await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 5)}
        </Pagination>
      )
      const nextButton = page.getByRole('button', { name: 'Next' }).element()

      nextButton.focus()
      expect(nextButton).toHaveFocus()

      // Set children: buildPages(7, 6)
      await rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(7, 6)}
        </Pagination>
      )
      const button5 = page.getByRole('button', { name: '#5' }).element()

      button5.focus()
      expect(button5).toHaveFocus()

      // Set children: buildPages(7, 6)
      await rerender(
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
        const { rerender } = await render(
          <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
            {buildPages(6)}
          </Pagination>
        )
        const prevButton = page
          .getByRole('button', { name: 'Previous' })
          .query()
        const nextButton = page.getByRole('button', { name: 'Next' }).query()

        expect(prevButton).not.toBeInTheDocument()
        expect(nextButton).toBeInTheDocument()

        // Set children: buildPages(6, 5)
        await rerender(
          <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
            {buildPages(6, 5)}
          </Pagination>
        )
        const prevButtonUpdated = page
          .getByRole('button', {
            name: 'Previous'
          })
          .query()
        const nextButtonUpdated = page
          .getByRole('button', { name: 'Next' })
          .query()

        expect(prevButtonUpdated).toBeInTheDocument()
        expect(nextButtonUpdated).not.toBeInTheDocument()
      })

      it('the First and Last arrows withFirstAndLastButton', async () => {
        const { rerender } = await render(
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
        const firstButton = page.getByRole('button', { name: 'First' }).query()
        const lastButton = page.getByRole('button', { name: 'Last' }).query()

        expect(firstButton).not.toBeInTheDocument()
        expect(lastButton).toBeInTheDocument()

        // Set children: buildPages(6, 5)
        await rerender(
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
        const firstButtonUpdated = page
          .getByRole('button', {
            name: 'First'
          })
          .query()
        const lastButtonUpdated = page
          .getByRole('button', { name: 'Last' })
          .query()

        expect(firstButtonUpdated).toBeInTheDocument()
        expect(lastButtonUpdated).not.toBeInTheDocument()
      })

      it('the disabled arrows with showDisabledButtons', async () => {
        const { rerender } = await render(
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

        const firstButton = page
          .getByRole('button', { name: 'First' })
          .element()
        const prevButton = page
          .getByRole('button', { name: 'Previous' })
          .element()
        const nextButton = page.getByRole('button', { name: 'Next' }).element()
        const lastButton = page.getByRole('button', { name: 'Last' }).element()

        expect(firstButton).toBeDisabled()
        expect(prevButton).toBeDisabled()
        expect(nextButton).not.toBeDisabled()
        expect(lastButton).not.toBeDisabled()

        // Go to last item
        // Set children: buildPages(6, 5)
        await rerender(
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
        const firstButtonUpdated = page
          .getByRole('button', { name: 'First' })
          .element()
        const prevButtonUpdated = page
          .getByRole('button', {
            name: 'Previous'
          })
          .element()
        const nextButtonUpdated = page
          .getByRole('button', { name: 'Next' })
          .element()
        const lastButtonUpdated = page
          .getByRole('button', { name: 'Last' })
          .element()

        expect(firstButtonUpdated).not.toBeDisabled()
        expect(prevButtonUpdated).not.toBeDisabled()
        expect(nextButtonUpdated).toBeDisabled()
        expect(lastButtonUpdated).toBeDisabled()
      })
    })

    it('should not continue to change focus on subsequent updates', async () => {
      const { rerender } = await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(6)}
        </Pagination>
      )

      const prevButton = page.getByRole('button', { name: 'Previous' }).query()
      expect(prevButton).not.toBeInTheDocument()

      const nextButton = page.getByRole('button', { name: 'Next' }).query()
      expect(nextButton).toBeInTheDocument()

      // Set children: buildPages(6, 5)
      await rerender(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {buildPages(6, 5)}
        </Pagination>
      )

      const prevButtonUpdated = page
        .getByRole('button', {
          name: 'Previous'
        })
        .query()
      expect(prevButtonUpdated).toBeInTheDocument()

      const nextButtonUpdated = page
        .getByRole('button', { name: 'Next' })
        .query()
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

              await render(
                <Pagination
                  variant="compact"
                  labelNext="Next"
                  labelPrev="Previous"
                  {...props}
                >
                  {buildPages(6)}
                </Pagination>
              )
              await vi.waitFor(() => {
                expect(consoleErrorMock.mock.calls[0][0]).toMatch(
                  expectedErrorMessageRegExp
                )
              })
            })
          } else {
            it(`should allow the '${prop}' prop`, async () => {
              const props = { [prop]: allowedProps[prop] }

              await render(
                <Pagination
                  variant="compact"
                  labelNext="Next"
                  labelPrev="Previous"
                  {...props}
                >
                  {buildPages(6)}
                </Pagination>
              )
              await vi.waitFor(() => {
                expect(consoleErrorMock).not.toHaveBeenCalled()
              })
            })
          }
        })
    })

    it(`should pass down the elementRef prop`, async () => {
      const elementRef = vi.fn()

      const { container } = await render(
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

      await render(
        <Pagination variant="compact" labelNext="Next" labelPrev="Previous">
          {[
            ...buildPages(6, 5),
            <PaginationButton key="last" onClick={onClick}>
              Last
            </PaginationButton>
          ]}
        </Pagination>
      )
      const nextButton = page.getByRole('button', { name: 'Next' }).element()

      await userEvent.click(nextButton)

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalled()
      })
    })
  })

  describe('input variant', () => {
    it('should display number input', async () => {
      const { container } = await render(
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
      await render(
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

      const firstButton = page.getByRole('button', { name: 'First' }).element()
      const prevButton = page.getByRole('button', { name: 'Prev' }).element()
      const nextButton = page.getByRole('button', { name: 'Next' }).element()
      const lastButton = page.getByRole('button', { name: 'Last' }).element()

      expect(firstButton).toBeVisible()
      expect(prevButton).toBeVisible()
      expect(nextButton).toBeVisible()
      expect(lastButton).toBeVisible()
    })

    it('should pass label', async () => {
      const { container } = await render(
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
      const { container } = await render(
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

      const { container } = await render(
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

      await userEvent.fill(numberInput!, '2')
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(onClick2).toHaveBeenCalled()
      })
    })

    it('should update page number when currentPage changes', async () => {
      const { container, rerender } = await render(
        <Pagination
          variant="input"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
        >
          {[...buildPages(10, 3)]}
        </Pagination>
      )
      const numberInput = container.querySelector('input')

      expect(numberInput).toHaveValue(4)

      await rerender(
        <Pagination
          variant="input"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
        >
          {[...buildPages(10, 6)]}
        </Pagination>
      )

      expect(numberInput).toHaveValue(7)
    })

    it('should disable the input when disabled', async () => {
      const { container } = await render(
        <Pagination
          variant="input"
          labelNext="Next"
          labelPrev="Previous"
          labelFirst="First"
          labelLast="Last"
          disabled
        >
          {[...buildPages(6, 2)]}
        </Pagination>
      )
      const numberInput = container.querySelector('input')

      expect(numberInput).toBeDisabled()
    })
  })

  describe('with minimal config', () => {
    it('should render the correct pages - 1', async () => {
      const { container } = await render(
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={9}
        />
      )
      expect(container.firstChild).toHaveTextContent('12…9Next Page')
    })
    it('should render the correct pages - 2', async () => {
      const { container } = await render(
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
    it('should render the correct pages - 3', async () => {
      const { container } = await render(
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
    it('should render the correct pages - 4', async () => {
      const { container } = await render(
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
    it('should render the correct pages - 5', async () => {
      const { container } = await render(
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
    it('should render the correct pages - 6', async () => {
      const { container } = await render(
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
    it('should render the correct pages - 7', async () => {
      const { container } = await render(
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
    it('should render the correct ellipsis', async () => {
      const { container } = await render(
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
    it('should render custom buttons', async () => {
      const pageMap = ['A-G', 'H-J', 'K-M', 'N-Q', 'R-Z']
      const { container } = await render(
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
    it('should render huge "totalPageNumber"s properly', async () => {
      const { container } = await render(
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
    it('should render first and last buttons', async () => {
      const { container } = await render(
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
    it('should render every page if boundary and sibling counts are big enough', async () => {
      const { container } = await render(
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

    it('should add aria-label when screenReaderLabelPageButton is set', async () => {
      await render(
        <Pagination
          labelNext="Next Page"
          labelPrev="Previous Page"
          totalPageNumber={5}
          screenReaderLabelPageButton={(currentPage, totalPageNumber) =>
            `Page ${currentPage} of ${totalPageNumber}`
          }
        />
      )
      const paginationButtons = page
        .getByRole('button', { name: /\d$/ })
        .elements()

      for (let i: number = 0; i < paginationButtons.length; i++) {
        expect(paginationButtons[i]).toHaveAttribute(
          'aria-label',
          `Page ${i + 1} of ${paginationButtons.length}`
        )
      }
    })
  })

  describe('Component tests', () => {
    it('should render no additional space when label text is hidden', async () => {
      const { rerender } = await render(
        <Pagination
          as="nav"
          margin="small"
          variant="compact"
          labelNext="Next"
          labelPrev="Prev"
          currentPage={3}
          totalPageNumber={10}
          onPageChange={vi.fn()}
        />
      )
      const pagination = page.getByRole('navigation').element()
      const heightWithNoLabel = getComputedStyle(pagination).height

      await rerender(
        <Pagination
          as="nav"
          margin="small"
          variant="compact"
          labelNext="Next"
          labelPrev="Prev"
          currentPage={3}
          totalPageNumber={10}
          onPageChange={vi.fn()}
          label={<ScreenReaderContent>I am a hidden label</ScreenReaderContent>}
        />
      )
      const paginationWithLabel = page.getByRole('navigation').element()

      expect(getComputedStyle(paginationWithLabel).height).toEqual(
        heightWithNoLabel
      )
      expect(paginationWithLabel).toHaveTextContent('I am a hidden label')
    })

    it('should wrap at a small viewport width', async () => {
      const hasWrapped = () => {
        const items = page
          .getByRole('navigation')
          .getByRole('button')
          .elements()
        const firstItemTop = items[0].getBoundingClientRect().top

        return items.some(
          (item, index) =>
            index > 0 && item.getBoundingClientRect().top > firstItemTop
        )
      }

      await render(
        <Pagination
          as="nav"
          margin="small"
          variant="compact"
          currentPage={4}
          totalPageNumber={100000}
          siblingCount={3}
          boundaryCount={2}
        />
      )

      await page.viewport(1000, 800)
      await vi.waitFor(() => {
        expect(hasWrapped()).toBe(false)
      })

      await page.viewport(100, 800)
      await vi.waitFor(() => {
        expect(hasWrapped()).toBe(true)
      })
    })
  })
})
