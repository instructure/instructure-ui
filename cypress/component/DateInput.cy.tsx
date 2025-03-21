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

import 'cypress-real-events'

import '../support/component'
import { DateInput, Calendar } from '@instructure/ui'

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const generateDays = (count = Calendar.DAY_COUNT) => {
  const days: any[] = []
  const date = new Date('2019-07-28')

  while (days.length < count) {
    days.push(
      <Calendar.Day
        key={date.toISOString()}
        date={date.toISOString()}
        label={date.toISOString()}
      >
        {date.getDate()}
      </Calendar.Day>
    )
    date.setDate(date.getDate() + 1)
  }

  return days
}

describe('<DateInput/>', () => {
  it('should render label', () => {
    const onChange = cy.spy()
    cy.mount(
      <DateInput
        renderLabel="Choose a date"
        assistiveText="Type a date or use arrow keys to navigate date picker."
        width="20rem"
        isInline
        value={'2023-11-23'}
        onChange={onChange}
        currentDate="2023-11-25"
        disabledDates={['2023-12-22', '2023-12-12', '2023-12-11']}
        disabledDateErrorMessage="disabled date"
        invalidDateErrorMessage="invalid date"
      ></DateInput>
    )

    cy.contains('Choose a date')
  })

  it('should select the correct day on Calendar when value is set', () => {
    const onChange = cy.spy()

    cy.mount(
      <DateInput
        renderLabel="Choose a date"
        assistiveText="Type a date or use arrow keys to navigate date picker."
        width="20rem"
        isInline
        value={'2022-11-01'}
        onChange={onChange}
        currentDate="2022-11-25"
        disabledDates={['2022-12-22', '2022-12-12', '2022-12-11']}
        disabledDateErrorMessage="disabled date"
        invalidDateErrorMessage="invalid date"
      ></DateInput>
    )

    cy.contains('Choose a date').realClick().wait(100)
    cy.contains('button', '01')
      .should('contain.text', '1 November 2022')
      .within(() => {
        cy.get('span[class$="-calendarDay__day"]').should(
          'have.css',
          'background-color',
          'rgb(3, 137, 61)'
        )
      })
  })

  it('should call onRequestHideCalendar and onRequestValidateDate when date is selected', () => {
    const onRequestHideCalendar = cy.spy()
    const onRequestValidateDate = cy.spy()

    cy.mount(
      <DateInput
        renderLabel="Choose a date"
        assistiveText="Type a date or use arrow keys to navigate date picker."
        value={''}
        onChange={cy.spy()}
        width="20rem"
        isInline
        isShowingCalendar
        onRequestValidateDate={onRequestValidateDate}
        onRequestShowCalendar={cy.spy()}
        onRequestHideCalendar={onRequestHideCalendar}
        onRequestSelectNextDay={cy.spy()}
        onRequestSelectPrevDay={cy.spy()}
        renderWeekdayLabels={weekdayLabels}
      >
        {generateDays()}
      </DateInput>
    )

    cy.contains('button', '22')
      .click()
      .then(() => {
        cy.wrap(onRequestHideCalendar).should('have.been.calledOnce')
        cy.wrap(onRequestValidateDate).should('have.been.calledOnce')
      })
  })

  it('should call onRequestHideCalendar and onRequestValidateDate when date is selected and is outside month', () => {
    const days = generateDays()
    days[5] = (
      <Calendar.Day key="5" label="5" date="2019-09-28" isOutsideMonth>
        outside
      </Calendar.Day>
    )

    const onRequestHideCalendar = cy.spy()
    const onRequestValidateDate = cy.spy()

    cy.mount(
      <DateInput
        renderLabel="Choose date"
        renderWeekdayLabels={weekdayLabels}
        onRequestHideCalendar={onRequestHideCalendar}
        onRequestValidateDate={onRequestValidateDate}
        isShowingCalendar
      >
        {days}
      </DateInput>
    )
    cy.contains('Choose date')
    cy.contains('button', 'outside')
      .click()
      .then(() => {
        cy.wrap(onRequestHideCalendar).should('have.been.calledOnce')
        cy.wrap(onRequestValidateDate).should('have.been.calledOnce')
      })
  })

  it('should call onRequestSelectNextDay on down arrow if calendar is showing', () => {
    const onRequestSelectNextDay = cy.spy()
    cy.mount(
      <DateInput
        renderLabel="Choose date"
        renderWeekdayLabels={weekdayLabels}
        onRequestSelectNextDay={onRequestSelectNextDay}
        isShowingCalendar
      >
        {generateDays()}
      </DateInput>
    )
    cy.contains('Choose date')
      .type('{downarrow}')
      .then(() => {
        cy.wrap(onRequestSelectNextDay).should('have.been.called')
      })
  })

  it('should not call onRequestSelectNextDay on down arrow if calendar is not showing', () => {
    const onRequestSelectNextDay = cy.spy()
    cy.mount(
      <DateInput
        renderLabel="Choose date"
        renderWeekdayLabels={weekdayLabels}
        onRequestSelectNextDay={onRequestSelectNextDay}
      >
        {generateDays()}
      </DateInput>
    )
    cy.contains('Choose date')
      .type('{downarrow}')
      .then(() => {
        cy.wrap(onRequestSelectNextDay).should('not.have.been.called')
      })
  })

  it('should call onRequestSelectPrevDay on up arrow if calendar is showing', () => {
    const onRequestSelectPrevDay = cy.spy()

    cy.mount(
      <DateInput
        renderLabel="Choose date"
        renderWeekdayLabels={weekdayLabels}
        onRequestSelectPrevDay={onRequestSelectPrevDay}
        isShowingCalendar
      >
        {generateDays()}
      </DateInput>
    )
    cy.contains('Choose date')
      .type('{uparrow}')
      .then(() => {
        cy.wrap(onRequestSelectPrevDay).should('have.been.calledOnce')
      })
  })

  it('should not call onRequestSelectPrevDay on up arrow if calendar is not showing', () => {
    const onRequestSelectPrevDay = cy.spy()

    cy.mount(
      <DateInput
        renderLabel="Choose date"
        renderWeekdayLabels={weekdayLabels}
        onRequestSelectPrevDay={onRequestSelectPrevDay}
      >
        {generateDays()}
      </DateInput>
    )
    cy.contains('Choose date')
      .type('{uparrow}')
      .then(() => {
        cy.wrap(onRequestSelectPrevDay).should('not.have.been.called')
      })
  })

  it('should call onRequestRenderNextMonth and onRequestRenderPrevMonth when calendar arrow buttons are clicked', () => {
    const onRequestRenderNextMonth = cy.spy()
    const onRequestRenderPrevMonth = cy.spy()

    cy.mount(
      <DateInput
        renderLabel="Choose date"
        renderWeekdayLabels={weekdayLabels}
        onRequestRenderNextMonth={onRequestRenderNextMonth}
        onRequestRenderPrevMonth={onRequestRenderPrevMonth}
        renderNextMonthButton={<button>next</button>}
        renderPrevMonthButton={<button>prev</button>}
        isShowingCalendar
      >
        {generateDays()}
      </DateInput>
    )
    cy.contains('Choose date')
    cy.contains('button', 'next')
      .click()
      .then(() => {
        cy.wrap(onRequestRenderNextMonth).should('have.been.calledOnce')
      })

    cy.contains('button', 'prev')
      .click()
      .then(() => {
        cy.wrap(onRequestRenderPrevMonth).should('have.been.calledOnce')
      })
  })
})
