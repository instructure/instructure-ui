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
import { DateTimeInput } from '@instructure/ui'
import { DateTime } from '@instructure/ui-i18n'

describe('<DateInput/>', () => {
  it('should merge defaultValue and initialTimeForNewDate and handle onChange when the user clears date input and select another one', () => {
    const onChange = cy.spy()
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const initialTimeForNewDate = '16:16'
    const defaultValue = '2018-01-18T13:30'

    cy.mount(
      <DateTimeInput
        description="date time description"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        dateRenderLabel="date-input label"
        timeRenderLabel="time-input label"
        invalidDateTimeMessage="whoops"
        defaultValue={defaultValue}
        locale={locale}
        timezone={timezone}
        initialTimeForNewDate={initialTimeForNewDate}
        onChange={onChange}
      />
    )
    cy.contains('date time description')
    cy.contains('date-input label')
    cy.contains('time-input label')
    cy.contains('Thursday, January 18, 2018 1:30 PM')

    cy.get('input[id^="Selectable_"]').as('dateInput')
    cy.get('input[id^="Select_"]').as('timeInput')

    cy.get('@dateInput').should('have.value', 'January 18, 2018')
    cy.get('@timeInput').should('have.value', '1:30 PM')

    cy.get('@dateInput').clear().blur()

    cy.get('@timeInput').should('have.value', '')
    cy.wrap(onChange).should('have.been.called')

    cy.get('@dateInput').realClick().wait(100)

    cy.contains('button', '22')
      .realClick()
      .wait(100)
      .then(($btn) => {
        const selectedDateId = $btn.attr('id')!
        const selectedDateValue = DateTime.parse(
          selectedDateId,
          'en-US',
          'US/Eastern'
        ).format('LL')

        cy.get('@dateInput').should('have.value', selectedDateValue)
        cy.get('@timeInput').should('have.value', '4:16 PM')

        cy.wrap(onChange)
          .should('have.been.called')
          .then((spy) => {
            const lastCallFirstArg = spy.lastCall.args[1]

            const lastCallDatePart = lastCallFirstArg.split('T')[0]
            const expectedDatePart = selectedDateId.split('T')[0]

            expect(lastCallDatePart).to.equal(expectedDatePart)
          })
      })
  })

  it('should not fire the onDateChange event when DateInput value change is not a date change', () => {
    const onChange = cy.spy()

    cy.mount(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
      />
    )
    cy.get('input[id^="Selectable_"]').as('dateInput')
    cy.get('@dateInput').realClick().wait(100)
    cy.get('@dateInput').type('Not a date{enter}')
    cy.get('@dateInput').blur()
    cy.wrap(onChange).should('not.have.been.called')
  })

  it('should show an error message when setting a disabled date array', () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const errorMsg = 'Disabled date selected!'

    cy.mount(
      <DateTimeInput
        description="date_time"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={dateTime.toISOString()}
        disabledDates={[dateTime.toISOString()]}
        disabledDateTimeMessage={errorMsg}
      />
    )
    cy.get('input[id^="Selectable_"]').as('dateInput')
    cy.get('body').should('contain', errorMsg)
    cy.get('@dateInput').clear().type(`05/18/2017{enter}`)

    cy.get('body').should('not.contain', errorMsg)
  })

  it('should show an error message when setting a disabled date function', () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const errorMsgText = 'Disabled date selected!'
    const errorMsg = (_rawDate?: string) => errorMsgText
    const checker = (toCheck: string) => {
      return toCheck.includes('2017')
    }

    cy.mount(
      <DateTimeInput
        description="date_time"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        dateRenderLabel="date-input"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        defaultValue={dateTime.toISOString()}
        disabledDates={checker}
        disabledDateTimeMessage={errorMsg}
      />
    )
    cy.get('input[id^="Selectable_"]').as('dateInput')
    cy.get('body').should('contain', errorMsgText)
    cy.get('@dateInput').clear().type(`May 18, 2022{enter}`)

    cy.get('body').should('not.contain', errorMsgText)
  })

  it('should clear TimeSelect when DateInput is cleared', () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'
    const dateTime = DateTime.parse('2017-05-01T17:30Z', locale, timezone)
    const invalidDateTimeMessage = 'invalidDateTimeMessage'
    const props = {
      description: 'date_time',
      dateRenderLabel: 'date-input',
      prevMonthLabel: 'Previous month',
      nextMonthLabel: 'Next month',
      timeRenderLabel: 'time-input',
      invalidDateTimeMessage: 'whoops',
      locale,
      timezone
    }

    cy.mount(<DateTimeInput {...props} value={dateTime.toISOString()} />)

    cy.get('input[id^="Selectable_"]').as('dateInput')
    cy.get('input[id^="Select_"]').as('timeInput')

    cy.get('@dateInput').should('have.value', 'May 1, 2017')
    cy.get('@timeInput').should('have.value', '1:30 PM')
    cy.get('body').should('contain', 'May 1, 2017 1:30 PM')

    // 1. clear programmatically
    cy.mount(<DateTimeInput {...props} value={undefined} />)

    cy.get('@dateInput').should('have.value', '')
    cy.get('@timeInput').should('have.value', '')
    cy.get('body').should('not.contain', 'May 1, 2017 1:30 PM')

    // 2. clear via keyboard input
    const newDateStr = '2022-03-29T19:00Z'
    cy.mount(<DateTimeInput {...props} value={newDateStr} />)

    cy.get('@dateInput').should('have.value', 'March 29, 2022')
    cy.get('@timeInput').should('have.value', '3:00 PM')
    cy.get('body').should('contain', 'March 29, 2022 3:00 PM')

    cy.get('@dateInput').clear().type('{esc}')

    cy.get('@dateInput').should('have.value', '')
    cy.get('@timeInput').should('have.value', '')
    cy.get('body').should('not.contain', 'March 29, 2022 3:00 PM')
    cy.get('body').should('not.contain', invalidDateTimeMessage)
  })

  it('should allow the user to enter any time value if allowNonStepInput is true', () => {
    const onChange = cy.spy()

    cy.mount(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale="en-US"
        timezone="US/Eastern"
        onChange={onChange}
        allowNonStepInput={true}
      />
    )
    cy.get('input[id^="Selectable_"]').as('dateInput')
    cy.get('input[id^="Select_"]').as('timeInput')

    cy.get('@timeInput').clear().type(`7:34 PM`)

    cy.get('@dateInput').clear().type(`May 1, 2017{enter}`)

    cy.wrap(onChange)
      .should('have.been.called')
      .then((spy) => {
        const lastCallFirstArg = spy.lastCall.args[1]

        expect(lastCallFirstArg).to.equal('2017-05-01T23:34:00.000Z')
      })
  })

  it("should change value of TimeSelect to initialTimeForNewDate prop's value", async () => {
    const locale = 'en-US'
    const timezone = 'US/Eastern'

    cy.mount(
      <DateTimeInput
        description="date_time"
        dateRenderLabel="date-input"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month"
        timeRenderLabel="time-input"
        invalidDateTimeMessage="whoops"
        locale={locale}
        timezone={timezone}
        initialTimeForNewDate="05:05"
      />
    )
    cy.get('input[id^="Selectable_"]').as('dateInput')
    cy.get('input[id^="Select_"]').as('timeInput')

    cy.get('@dateInput').clear().type(`May 1, 2017{enter}`)

    cy.get('@timeInput').should('have.value', '5:05 AM')
  })
})
