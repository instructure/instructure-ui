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
import {
  expect,
  mount,
  stub,
  generateA11yTests
} from '@instructure/ui-test-utils'

import { Calendar } from '../index'
import { CalendarLocator } from '../CalendarLocator'
import CalendarExamples from '../__examples__/Calendar.examples'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Calendar />', async () => {
  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const generateDays = (count = Calendar.DAY_COUNT) => {
    const days = []
    const date = new Date('2019-07-28')

    while (days.length < count) {
      days.push(
        <Calendar.Day
          key={date.toISOString()}
          date={date.toISOString()}
          label={date.toISOString()}
          isOutsideMonth={date.getMonth() !== 7}
        >
          {date.getDate()}
        </Calendar.Day>
      )
      date.setDate(date.getDate() + 1)
    }

    return days
  }

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render children', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Calendar renderWeekdayLabels={weekdayLabels}>{generateDays()}</Calendar>
    )

    const calendar = await CalendarLocator.find()
    expect(calendar).to.exist()

    const days = await calendar.findAllDays()
    expect(days.length).to.equal(Calendar.DAY_COUNT)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it(`should warn if the correct number of children are not provided`, async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    const consoleError = stub(console, 'error')
    const count = Calendar.DAY_COUNT - 1

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Calendar renderWeekdayLabels={weekdayLabels}>
        {generateDays(count)}
      </Calendar>
    )

    expect(consoleError).to.have.been.calledWithMatch(
      `should have exactly ${Calendar.DAY_COUNT} children. ${count} provided.`
    )
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render weekday labels', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Calendar renderWeekdayLabels={weekdayLabels}>{generateDays()}</Calendar>
    )

    const calendar = await CalendarLocator.find()
    expect(calendar).to.exist()

    const originalHeaders = await calendar.findAll('th')
    expect(originalHeaders.length).to.equal(7)

    weekdayLabels.forEach((label, i) => {
      expect(label).to.equal(originalHeaders[i].getTextContent())
    })

    const functionalWeekdayLabels = [
      () => 'S',
      () => 'M',
      () => 'T',
      () => 'W',
      () => 'T',
      () => 'F',
      () => 'S'
    ]

    await subject.setProps({
      renderWeekdayLabels: functionalWeekdayLabels
    })

    const updatedHeaders = await calendar.findAll('th')

    functionalWeekdayLabels.forEach((functionalLabel, i) => {
      expect(functionalLabel()).to.equal(updatedHeaders[i].getTextContent())
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should warn if 7 weekday labels are not provided', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    const consoleError = stub(console, 'error')

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Calendar renderWeekdayLabels={[]}>{generateDays()}</Calendar>)

    expect(consoleError).to.have.been.calledWithMatch(
      '`renderWeekdayLabels` should be an array with 7 labels (one for each weekday). 0 provided.'
    )
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should format the weekday labels and days correctly', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Calendar renderWeekdayLabels={weekdayLabels}>{generateDays()}</Calendar>
    )

    const calendar = await CalendarLocator.find()
    expect(calendar).to.exist()

    const headerRow = await calendar.findAll('thead > tr')
    expect(headerRow.length).to.equal(1)

    const headers = await headerRow[0].findAll('th')
    expect(headers.length).to.equal(7)

    const bodyRows = await calendar.findAll('tbody > tr')
    expect(bodyRows.length).to.equal(Calendar.DAY_COUNT / 7)

    for (const row of bodyRows) {
      const days = await row.findAll('td')
      expect(days.length).to.equal(7)
    }
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render navigation label', async () => {
    const navLabel = (
      <span>
        <div>March</div>
        <div>2019</div>
      </span>
    )

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Calendar
        renderWeekdayLabels={weekdayLabels}
        renderNavigationLabel={navLabel}
      >
        {generateDays()}
      </Calendar>
    )

    const calendar = await CalendarLocator.find()
    expect(await calendar.findWithText('March')).to.exist()
    expect(await calendar.findWithText('2019')).to.exist()

    await subject.setProps({
      renderNavigationLabel: () => navLabel
    })

    expect(await calendar.findWithText('March')).to.exist()
    expect(await calendar.findWithText('2019')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render next and prev buttons', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <Calendar
        renderWeekdayLabels={weekdayLabels}
        renderPrevMonthButton={<button>prev month</button>}
        renderNextMonthButton={<button>next month</button>}
      >
        {generateDays()}
      </Calendar>
    )

    const calendar = await CalendarLocator.find()
    expect(await calendar.findWithLabel('prev month')).to.exist()
    expect(await calendar.findWithLabel('next month')).to.exist()

    /* eslint-disable react/display-name */
    await subject.setProps({
      renderPrevMonthButton: () => <button>prev month</button>,
      renderNextMonthButton: () => <button>next month</button>
    })
    /* eslint-enable react/display-name */

    expect(await calendar.findWithLabel('prev month')).to.exist()
    expect(await calendar.findWithLabel('next month')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should call onRequestRenderNextMonth and onRequestRenderPrevMonth', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onRequestRenderPrevMonth = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const onRequestRenderNextMonth = stub()

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Calendar
        renderWeekdayLabels={weekdayLabels}
        renderPrevMonthButton={<button>prev month</button>}
        renderNextMonthButton={<button>next month</button>}
        onRequestRenderPrevMonth={onRequestRenderPrevMonth}
        onRequestRenderNextMonth={onRequestRenderNextMonth}
      >
        {generateDays()}
      </Calendar>
    )

    const calendar = await CalendarLocator.find()
    const prevButton = await calendar.findWithText('prev month')
    const nextButton = await calendar.findWithText('next month')

    expect(onRequestRenderPrevMonth).to.have.not.been.called()
    expect(onRequestRenderNextMonth).to.have.not.been.called()

    await prevButton.click()
    expect(onRequestRenderPrevMonth).to.have.been.calledOnce()

    await nextButton.click()
    expect(onRequestRenderNextMonth).to.have.been.calledOnce()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when role="listbox"', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set role="listbox" on table root and role="presentation" on the correct elements', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <Calendar renderWeekdayLabels={weekdayLabels} role="listbox">
          {generateDays()}
        </Calendar>
      )

      const calendar = await CalendarLocator.find()
      const table = await calendar.find('table')
      expect(table.getAttribute('role')).to.equal('listbox')

      const rows = await calendar.findAll('tbody > tr')
      for (const row of rows) {
        expect(row.getAttribute('role')).to.equal('presentation')

        const tds = await row.findAll('td')
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'td' implicitly has an 'any' type.
        tds.forEach((td) => {
          expect(td.getAttribute('role')).to.equal('presentation')
        })
      }
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should link each day with it's weekday header via `aria-describedby`", async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <Calendar renderWeekdayLabels={weekdayLabels} role="listbox">
          {generateDays()}
        </Calendar>
      )

      const calendar = await CalendarLocator.find()
      const days = await calendar.findAllDays()
      const headers = await calendar.findAll('th')

      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'day' implicitly has an 'any' type.
      days.forEach((day, i) => {
        const index = i % 7
        expect(day.getAttribute('aria-describedby')).to.equal(
          headers[index].getAttribute('id')
        )
      })
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render root as designated by the `as` prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Calendar renderWeekdayLabels={weekdayLabels} as="ul">
        {generateDays()}
      </Calendar>
    )

    const calendar = await CalendarLocator.find()
    expect(calendar.getTagName()).to.equal('ul')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('with generated examples', async () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ propValues: { children: Elemen... Remove this comment to see the full error message
    generateA11yTests(CalendarExamples)
  })
})
