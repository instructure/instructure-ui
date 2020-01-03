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
import { expect, mount, stub, generateA11yTests } from '@instructure/ui-test-utils'

import { Calendar } from '../index'
import { CalendarLocator } from '../CalendarLocator'
import CalendarExamples from '../__examples__/Calendar.examples'

describe('<Calendar />', async () => {
  beforeEach(async () => {
    stub(console, 'warn') // suppress experimental warnings
  })
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

  it('should render children', async () => {
    await mount(
      <Calendar renderWeekdayLabels={weekdayLabels}>
        {generateDays()}
      </Calendar>
    )

    const calendar = await CalendarLocator.find()
    expect(calendar).to.exist()

    const days = await calendar.findAllDays()
    expect(days.length).to.equal(Calendar.DAY_COUNT)
  })

  it(`should warn if the correct number of children are not provided`, async () => {
    const consoleError = stub(console, 'error')
    const count = Calendar.DAY_COUNT - 1

    await mount(
      <Calendar renderWeekdayLabels={weekdayLabels}>
        {generateDays(count)}
      </Calendar>
    )

    expect(consoleError).to.have.been.calledWithMatch(
      `should have exactly ${Calendar.DAY_COUNT} children. ${count} provided.`
    )
  })

  it('should render weekday labels', async () => {
    const subject = await mount(
      <Calendar renderWeekdayLabels={weekdayLabels}>
        {generateDays()}
      </Calendar>
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
      () => 'S',
    ]

    await subject.setProps({
      renderWeekdayLabels: functionalWeekdayLabels
    })

    const updatedHeaders = await calendar.findAll('th')

    functionalWeekdayLabels.forEach((functionalLabel, i) => {
      expect(functionalLabel()).to.equal(updatedHeaders[i].getTextContent())
    })
  })

  it('should warn if 7 weekday labels are not provided', async () => {
    const consoleError = stub(console, 'error')

    await mount(
      <Calendar renderWeekdayLabels={[]}>
        {generateDays()}
      </Calendar>
    )

    expect(consoleError).to.have.been.calledWithMatch(
      '`renderWeekdayLabels` should be an array with 7 labels (one for each weekday). 0 provided.'
    )
  })

  it('should format the weekday labels and days correctly', async () => {
    await mount(
      <Calendar renderWeekdayLabels={weekdayLabels}>
        {generateDays()}
      </Calendar>
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

  it('should render navigation label', async () => {
    const navLabel = (
      <span>
        <div>March</div>
        <div>2019</div>
      </span>
    )

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

  it('should render next and prev buttons', async () => {
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

  it('should call onRequestRenderNextMonth and onRequestRenderPrevMonth', async () => {
    const onRequestRenderPrevMonth = stub()
    const onRequestRenderNextMonth = stub()

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

  describe('when role="listbox"', async () => {
    it('should set role="listbox" on table root and role="presentation" on the correct elements', async () => {
      await mount(
        <Calendar
          renderWeekdayLabels={weekdayLabels}
          role="listbox"
        >
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
        tds.forEach((td) => {
          expect(td.getAttribute('role')).to.equal('presentation')
        })
      }
    })

    it('should link each day with it\'s weekday header via `aria-describedby`', async () => {
      await mount(
        <Calendar
          renderWeekdayLabels={weekdayLabels}
          role="listbox"
        >
          {generateDays()}
        </Calendar>
      )

      const calendar = await CalendarLocator.find()
      const days = await calendar.findAllDays()
      const headers = await calendar.findAll('th')

      days.forEach((day, i) => {
        const index = i % 7
        expect(day.getAttribute('aria-describedby'))
          .to.equal(headers[index].getAttribute('id'))
      })
    })
  })

  it('should render root as designated by the `as` prop', async () => {
    await mount(
      <Calendar
        renderWeekdayLabels={weekdayLabels}
        as="ul"
      >
        {generateDays()}
      </Calendar>
    )

    const calendar = await CalendarLocator.find()
    expect(calendar.getTagName()).to.equal('ul')
  })

  describe('with generated examples', async () => {
    generateA11yTests(CalendarExamples)
  })
})
