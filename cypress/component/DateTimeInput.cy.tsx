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
import 'cypress-real-events'

import '../support/component'
import { DateTimeInput } from '../../packages/ui'
import { DateTime } from '../../packages/ui-i18n'

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

    cy.get('input[id^="Selectable_"]').should('have.value', 'January 18, 2018')
    cy.get('input[id^="Select_"]').should('have.value', '1:30 PM')

    cy.get('input[id^="Selectable_"]').clear().blur()

    cy.get('input[id^="Select_"]').should('have.value', '')
    cy.wrap(onChange).should('have.been.called')

    cy.get('input[id^="Selectable_"]').realClick().wait(100)

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

        cy.get('input[id^="Selectable_"]').should(
          'have.value',
          selectedDateValue
        )
        cy.get('input[id^="Select_"]').should('have.value', '4:16 PM')

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
})
