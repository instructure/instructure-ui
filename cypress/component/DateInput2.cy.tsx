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
import { DateInput2 } from '../../packages/ui'

describe('<DateInput/>', () => {
  // it('should set value when select date from calendar', () => {
  //   cy.mount(
  //     <DateInput2
  //       renderLabel="Choose a date"
  //       screenReaderLabels={{
  //         calendarIcon: 'Calendar',
  //         nextMonthButton: 'Next month',
  //         prevMonthButton: 'Previous month'
  //       }}
  //       value='2024-03-26'
  //     />
  //   )
  //   cy.get('input').should('have.value', '26 March 2024')

  //   cy.get('button[data-popover-trigger="true"]').click()
  //   cy.contains('button', '17').click()

  //   cy.get('input').should('have.value', '17 March 2024')
  // })

  // it('should select and highlight the correct day on Calendar when value is set', () => {
  //   cy.mount(
	// 		<DateInput2
	// 			renderLabel="Choose a date"
	// 			screenReaderLabels={{
	// 				calendarIcon: 'Calendar',
	// 				nextMonthButton: 'Next month',
	// 				prevMonthButton: 'Previous month'
	// 			}}
	// 			value='2024-03-08'
	// 		/>
  //   )
  //   cy.get('input').should('have.value', '8 March 2024')

  //   cy.get('button[data-popover-trigger="true"]').realClick()

  //   cy.get('div[class*="navigation-calendar"]')
  //     .should('contain.text', 'March')
  //     .and('contain.text', '2024')

  //   // Get day 01 background color for comparison
  //   cy.contains('button', '01')
  //   .within(() => {
  //     cy.get('span[class$="-calendarDay__day"]')
  //       .invoke('css', 'background-color')
  //       .as('controlDayBgColor')
  //   })

  //   // Compare it to the highlighted day
  //   cy.contains('button', '08')
  //   .within(() => {
  //     cy.get('span[class$="-calendarDay__day"]')
  //       .invoke('css', 'background-color')
  //       .then((highlightedDayBgColor) => {
  //         cy.get('@controlDayBgColor').should('not.equal', highlightedDayBgColor)
  //       })
  //   })
  // })

  // it('should set value through formatDate prop', async () => {
	// 	const formattedValue = 'formattedValue'
	// 	cy.mount(
	// 		<DateInput2
	// 			renderLabel="Choose a date"
	// 			screenReaderLabels={{
	// 				calendarIcon: 'Calendar',
	// 				nextMonthButton: 'Next month',
	// 				prevMonthButton: 'Previous month'
	// 			}}
	// 			value=''
	// 			formatDate={() => formattedValue}
	// 		/>
	// 	)
  //   cy.get('button[data-popover-trigger="true"]').click()
  //   cy.contains('button', '01').click()
  //   cy.get('input').should('have.value', 'formattedValue')
	// })

  // it('should have screen reader labels for weekday headers', () => {
  //   const expectedWeekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  //   cy.mount(
	// 		<DateInput2
	// 			renderLabel="Choose a date"
	// 			screenReaderLabels={{
	// 				calendarIcon: 'Calendar',
	// 				nextMonthButton: 'Next month',
	// 				prevMonthButton: 'Previous month'
	// 			}}
	// 			value='2024-03-08'
	// 		/>
  //   )

  //   cy.get('button[data-popover-trigger="true"]').click()

  //   cy.get('th[class*="-calendar__weekdayHeader"]').each(($header, index) => {
  //     cy.wrap($header)
  //       .find('span[class*="-screenReaderContent"]')
  //       .should('have.text', expectedWeekdays[index])
  //   })
  // })

  // it('should have screen reader labels for calendar days', () => {
  //   cy.mount(
	// 		<DateInput2
	// 			renderLabel="Choose a date"
	// 			screenReaderLabels={{
	// 				calendarIcon: 'Calendar',
	// 				nextMonthButton: 'Next month',
	// 				prevMonthButton: 'Previous month'
	// 			}}
	// 			value='2024-03-08'
	// 		/>
  //   )

  //   cy.get('button[data-popover-trigger="true"]').click()

  //   cy.get('button[class*="-calendarDay"]').each(($day) => {
  //     cy.wrap($day)
  //       .find('span[class*="-screenReaderContent"]')
  //       .should('exist')
  //       .and('not.be.empty')
  //   })

  //   cy.contains('button', '10')
  //     .within(() => {
  //       cy.get('span[class*="-screenReaderContent"]').should('have.text', '10 March 2024')
  //     })

  //   cy.contains('button', '17') 
  //     .within(() => {
  //       cy.get('span[class*="-screenReaderContent"]').should('have.text', '17 March 2024')
  //     })
  // })

  it('should render year picker based on the withYearPicker prop', () => {
    cy.mount(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value='2024-03-26'
        withYearPicker={{
          screenReaderLabel: 'Year picker',
          startYear: 2022,
          endYear: 2024
        }}
      />
    )
    cy.get('button[data-popover-trigger="true"]').click()

    cy.get('input[id^="Select_"]').as('yearPicker')

    cy.get('@yearPicker').should('have.value', '2024')

    cy.get('[id^="Selectable_"][id$="-description"]')
    .should('have.text', 'Year picker')

    cy.get('@yearPicker').click()

    cy.get('ul[id^="Selectable_"]').should('be.visible')
    cy.get('[class$="-optionItem"]').as('options')
    cy.get('@options').should('have.length', 3)
    cy.get('@options').eq(0).should('contain.text', '2024')
    cy.get('@options').eq(1).should('contain.text', '2023')
    cy.get('@options').eq(2).should('contain.text', '2022')
  })

  it('should set correct value using calendar year picker', () => {
    cy.mount(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value='2024-03-26'
        withYearPicker={{
          screenReaderLabel: 'Year picker',
          startYear: 2022,
          endYear: 2024
        }}
      />
    )
    cy.get('input').should('have.value', '26 March 2024')

    cy.get('button[data-popover-trigger="true"]').click()

    cy.get('input[id^="Select_"]').as('yearPicker')
    cy.get('@yearPicker').should('have.value', '2024')

    cy.get('@yearPicker').click()
    cy.get('[class$="-optionItem"]').eq(2).click()

    cy.get('@yearPicker').should('have.value', '2022')

    cy.contains('button', '17').click()

    cy.get('input').should('have.value', '17 March 2022')
  })
})
