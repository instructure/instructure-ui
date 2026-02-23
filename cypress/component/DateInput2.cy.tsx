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
import { useState } from 'react'
import 'cypress-real-events'

import '../support/component'
import { DateInput2, ApplyLocale } from '@instructure/ui/latest'
import { SinonSpy } from 'cypress/types/sinon'

const TIMEZONES_DST = [
  { timezone: 'UTC', expectedDateIsoString: '2020-04-17T00:00:00.000Z' }, // Coordinated Universal Time UTC
  {
    timezone: 'America/New_York',
    expectedDateIsoString: '2020-04-17T04:00:00.000Z'
  }, // Eastern Time (US & Canada) UTC -4 (Daylight Saving Time)
  {
    timezone: 'America/Los_Angeles',
    expectedDateIsoString: '2020-04-17T07:00:00.000Z'
  }, // Pacific Time (US & Canada) UTC -7 (Daylight Saving Time)
  {
    timezone: 'Europe/London',
    expectedDateIsoString: '2020-04-16T23:00:00.000Z'
  }, // United Kingdom Time UTC +1 (Daylight Saving Time)
  {
    timezone: 'Europe/Paris',
    expectedDateIsoString: '2020-04-16T22:00:00.000Z'
  }, // Central European Time UTC +2 (Daylight Saving Time)
  { timezone: 'Asia/Tokyo', expectedDateIsoString: '2020-04-16T15:00:00.000Z' }, // Japan Standard Time UTC +9 (No DST)
  {
    timezone: 'Australia/Sydney',
    expectedDateIsoString: '2020-04-16T14:00:00.000Z'
  }, // Australia Eastern Time UTC +10 (Daylight Saving Time ended in April)
  {
    timezone: 'Asia/Kolkata',
    expectedDateIsoString: '2020-04-16T18:30:00.000Z'
  }, // India Standard Time UTC +5:30 (No DST)
  {
    timezone: 'Africa/Johannesburg',
    expectedDateIsoString: '2020-04-16T22:00:00.000Z'
  }, // South Africa Standard Time UTC +2 (No DST)
  {
    timezone: 'Asia/Kathmandu',
    expectedDateIsoString: '2020-04-16T18:15:00.000Z'
  } // Nepal Standard Time UTC +5:45 (No DST)
]

const TIMEZONES_NON_DST = [
  { timezone: 'UTC', expectedDateIsoString: '2020-02-17T00:00:00.000Z' }, // Coordinated Universal Time UTC
  {
    timezone: 'America/New_York',
    expectedDateIsoString: '2020-02-17T05:00:00.000Z'
  }, // Eastern Time (US & Canada) UTC -5 (Standard Time)
  {
    timezone: 'America/Los_Angeles',
    expectedDateIsoString: '2020-02-17T08:00:00.000Z'
  }, // Pacific Time (US & Canada) UTC -8 (Standard Time)
  {
    timezone: 'Europe/London',
    expectedDateIsoString: '2020-02-17T00:00:00.000Z'
  }, // United Kingdom Time UTC +0 (Standard Time)
  {
    timezone: 'Europe/Paris',
    expectedDateIsoString: '2020-02-16T23:00:00.000Z'
  }, // Central European Time UTC +1 (Standard Time)
  { timezone: 'Asia/Tokyo', expectedDateIsoString: '2020-02-16T15:00:00.000Z' }, // Japan Standard Time UTC +9 (No DST)
  {
    timezone: 'Australia/Sydney',
    expectedDateIsoString: '2020-02-16T13:00:00.000Z'
  }, // Australia Eastern Time UTC +11 (Standard Time)
  {
    timezone: 'Asia/Kolkata',
    expectedDateIsoString: '2020-02-16T18:30:00.000Z'
  }, // India Standard Time UTC +5:30 (No DST)
  {
    timezone: 'Africa/Johannesburg',
    expectedDateIsoString: '2020-02-16T22:00:00.000Z'
  }, // South Africa Standard Time UTC +2 (No DST)
  {
    timezone: 'Asia/Kathmandu',
    expectedDateIsoString: '2020-02-16T18:15:00.000Z'
  } // Nepal Standard Time UTC +5:45 (No DST)
]

const LOCALES = [
  { locale: 'af', textDirection: 'ltr' }, // Afrikaans
  { locale: 'am', textDirection: 'ltr' }, // Amharic
  { locale: 'ar-SA', textDirection: 'rtl' }, // Arabic (Saudi Arabia) - Arabic-Indic numerals
  { locale: 'ar-DZ', textDirection: 'rtl' }, // Arabic (Algeria)
  { locale: 'ar-EG', textDirection: 'rtl' }, // Arabic (Egypt)
  { locale: 'ar-SY', textDirection: 'rtl' }, // Arabic (Syria)
  { locale: 'ar-AE', textDirection: 'rtl' }, // Arabic (United Arab Emirates)
  { locale: 'ar-IQ', textDirection: 'rtl' }, // Arabic (Iraq)
  { locale: 'ar-PS', textDirection: 'rtl' }, // Arabic (Palestine)
  { locale: 'az', textDirection: 'ltr' }, // Azerbaijani
  { locale: 'be', textDirection: 'ltr' }, // Belarusian
  { locale: 'bg', textDirection: 'ltr' }, // Bulgarian
  { locale: 'bn-BD', textDirection: 'ltr' }, // Bengali (Bangladesh) - Bengali numerals
  { locale: 'bs', textDirection: 'ltr' }, // Bosnian
  { locale: 'ca', textDirection: 'ltr' }, // Catalan
  { locale: 'cs', textDirection: 'ltr' }, // Czech
  { locale: 'cy', textDirection: 'ltr' }, // Welsh
  { locale: 'da', textDirection: 'ltr' }, // Danish
  { locale: 'de-DE', textDirection: 'ltr' }, // German (Germany)
  { locale: 'de-AT', textDirection: 'ltr' }, // German (Austria)
  { locale: 'el', textDirection: 'ltr' }, // Greek
  { locale: 'en-US', textDirection: 'ltr' }, // English (United States)
  { locale: 'en-GB', textDirection: 'ltr' }, // English (United Kingdom)
  { locale: 'es-ES', textDirection: 'ltr' }, // Spanish (Spain)
  { locale: 'es-MX', textDirection: 'ltr' }, // Spanish (Mexico)
  { locale: 'et', textDirection: 'ltr' }, // Estonian
  { locale: 'fa', textDirection: 'ltr' }, // Persian - Persian numerals
  { locale: 'fi', textDirection: 'ltr' }, // Finnish
  { locale: 'fr-FR', textDirection: 'ltr' }, // French (France)
  { locale: 'fr-CA', textDirection: 'ltr' }, // French (Canada)
  { locale: 'ga', textDirection: 'ltr' }, // Irish
  { locale: 'gl', textDirection: 'ltr' }, // Galician
  { locale: 'gu', textDirection: 'ltr' }, // Gujarati
  { locale: 'he', textDirection: 'ltr' }, // Hebrew
  { locale: 'hi', textDirection: 'ltr' }, // Hindi - Devanagari numerals
  { locale: 'hr', textDirection: 'ltr' }, // Croatian
  { locale: 'hu', textDirection: 'ltr' }, // Hungarian
  { locale: 'hy', textDirection: 'ltr' }, // Armenian
  { locale: 'id', textDirection: 'ltr' }, // Indonesian
  { locale: 'is', textDirection: 'ltr' }, // Icelandic
  { locale: 'it-IT', textDirection: 'ltr' }, // Italian (Italy)
  { locale: 'ja', textDirection: 'ltr' }, // Japanese
  { locale: 'ka', textDirection: 'ltr' }, // Georgian
  { locale: 'kk', textDirection: 'ltr' }, // Kazakh
  { locale: 'km', textDirection: 'ltr' }, // Khmer - Khmer numerals
  { locale: 'kn', textDirection: 'ltr' }, // Kannada
  { locale: 'ko', textDirection: 'ltr' }, // Korean
  { locale: 'lt', textDirection: 'ltr' }, // Lithuanian
  { locale: 'lv', textDirection: 'ltr' }, // Latvian
  { locale: 'mk', textDirection: 'ltr' }, // Macedonian
  { locale: 'ml', textDirection: 'ltr' }, // Malayalam
  { locale: 'mn', textDirection: 'ltr' }, // Mongolian
  { locale: 'mr', textDirection: 'ltr' }, // Marathi
  { locale: 'ms', textDirection: 'ltr' }, // Malay
  { locale: 'mt', textDirection: 'ltr' }, // Maltese
  { locale: 'nb', textDirection: 'ltr' }, // Norwegian Bokmål
  { locale: 'ne', textDirection: 'ltr' }, // Nepali
  { locale: 'nl', textDirection: 'ltr' }, // Dutch
  { locale: 'nn', textDirection: 'ltr' }, // Norwegian Nynorsk
  { locale: 'pa', textDirection: 'ltr' }, // Punjabi
  { locale: 'pl', textDirection: 'ltr' }, // Polish
  { locale: 'pt-PT', textDirection: 'ltr' }, // Portuguese (Portugal)
  { locale: 'pt-BR', textDirection: 'ltr' }, // Portuguese (Brazil)
  { locale: 'ro', textDirection: 'ltr' }, // Romanian
  { locale: 'ru', textDirection: 'ltr' }, // Russian
  { locale: 'si', textDirection: 'ltr' }, // Sinhala
  { locale: 'sk', textDirection: 'ltr' }, // Slovak
  { locale: 'sl', textDirection: 'ltr' }, // Slovenian
  { locale: 'sq', textDirection: 'ltr' }, // Albanian
  { locale: 'sr', textDirection: 'ltr' }, // Serbian
  { locale: 'sv-SE', textDirection: 'ltr' }, // Swedish (Sweden)
  { locale: 'sw', textDirection: 'ltr' }, // Swahili
  { locale: 'ta', textDirection: 'ltr' }, // Tamil
  { locale: 'te', textDirection: 'ltr' }, // Telugu
  { locale: 'th', textDirection: 'ltr' }, // Thai - Thai numerals
  { locale: 'tr', textDirection: 'ltr' }, // Turkish
  { locale: 'uk', textDirection: 'ltr' }, // Ukrainian
  { locale: 'ur', textDirection: 'ltr' }, // Urdu - Arabic script
  { locale: 'uz', textDirection: 'ltr' }, // Uzbek
  { locale: 'vi', textDirection: 'ltr' }, // Vietnamese
  { locale: 'zh-CN', textDirection: 'ltr' }, // Chinese (Simplified)
  { locale: 'zh-TW', textDirection: 'ltr' }, // Chinese (Traditional)
  { locale: 'zu', textDirection: 'ltr' } // Zulu
]

type DateInputExampleProps = {
  initialValue?: string
  timezone?: string
  locale?: string
  onChange?: SinonSpy
  onRequestValidateDate?: SinonSpy
}

const DateInputExample = ({
  initialValue = '',
  timezone = 'UTC',
  locale = 'en-GB',
  onChange = cy.spy(),
  onRequestValidateDate
}: DateInputExampleProps) => {
  const [inputValue, setInputValue] = useState(initialValue)

  return (
    <DateInput2
      renderLabel="Choose a date"
      screenReaderLabels={{
        calendarIcon: 'Calendar',
        nextMonthButton: 'Next month',
        prevMonthButton: 'Previous month'
      }}
      value={inputValue}
      timezone={timezone}
      locale={locale}
      onChange={(_e, newInputValue, newDateString) => {
        setInputValue(newInputValue)
        onChange(_e, newInputValue, newDateString)
      }}
      {...(onRequestValidateDate && { onRequestValidateDate })}
    />
  )
}

const RtlExample = (props) => {
  const [inputValue, setInputValue] = useState(props.initialValue)
  return (
    <div dir={props.textDirection}>
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value={inputValue}
        timezone="UTC"
        locale={props.locale}
        onChange={(_e, newInputValue, newDateString) => {
          setInputValue(newInputValue)
          props.onChange?.(_e, newInputValue, newDateString)
        }}
      />
    </div>
  )
}

describe('<DateInput2/>', () => {
  it('should have screen reader labels for weekday headers', async () => {
    const expectedWeekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
    cy.mount(<DateInputExample />)

    cy.get('button[data-popover-trigger="true"]').click()

    cy.get('th[class*="-calendar__weekdayHeader"]').each(($header, index) => {
      cy.wrap($header)
        .find('span[class*="-screenReaderContent"]')
        .should('have.text', expectedWeekdays[index])
    })
  })

  it('should have screen reader labels for calendar days', async () => {
    cy.mount(<DateInputExample />)

    // set system date to 2022 march
    const testDate = new Date(2022, 2, 26)
    cy.clock(testDate.getTime())

    cy.get('button[data-popover-trigger="true"]').click()
    cy.tick(1000)

    cy.get('button[class*="-calendarDay"]').each(($day) => {
      cy.wrap($day)
        .find('span[class*="-screenReaderContent"]')
        .should('exist')
        .and('not.be.empty')
    })

    cy.contains('button', '10').within(() => {
      cy.get('span[class*="-screenReaderContent"]').should(
        'have.text',
        '10 March 2022'
      )
    })

    cy.contains('button', '17').within(() => {
      cy.get('span[class*="-screenReaderContent"]').should(
        'have.text',
        '17 March 2022'
      )
    })
  })

  it('should open and close calendar properly and set value when select date from calendar', async () => {
    cy.mount(<DateInputExample />)

    cy.get('input').should('have.value', '')
    cy.get('table').should('not.exist')

    cy.get('button[data-popover-trigger="true"]').click()
    cy.get('table').should('exist')

    cy.contains('button', '17').click()

    cy.get('input').should('have.value', '17/10/2024')
    cy.get('table').should('not.exist')
  })

  it('should select and highlight the correct day on Calendar when value is set', async () => {
    cy.mount(
      <DateInputExample
        initialValue="17/03/2022"
        timezone="UTC"
        locale="en-GB"
      />
    )

    cy.get('input').should('have.value', '17/03/2022')

    cy.get('button[data-popover-trigger="true"]').click().wait(100)

    cy.get('div[class*="navigation-calendar"]')
      .should('contain.text', 'March')
      .and('contain.text', '2022')

    // Get day 16 background color for comparison
    cy.contains('button', '16').within(() => {
      cy.get('span[class$="-calendarDay__day"]')
        .invoke('css', 'background-color')
        .as('controlDayBgColor')
    })

    // Compare it to the highlighted day 17
    cy.contains('button', '17').within(() => {
      cy.get('span[class$="-calendarDay__day"]')
        .invoke('css', 'background-color')
        .then((highlightedDayBgColor) => {
          cy.get('@controlDayBgColor').should(
            'not.equal',
            highlightedDayBgColor
          )
        })
    })
  })

  it('should call onChange with the new typed value', async () => {
    const newValue = '26/03/2021'
    const expectedDateIsoString = new Date(Date.UTC(2021, 2, 26)).toISOString()
    const onChange = cy.spy()
    cy.mount(
      <DateInputExample onChange={onChange} locale={'en-GB'} timezone={'UTC'} />
    )

    cy.get('input').clear().realType('26/03/2021')
    cy.get('input').blur()

    cy.wrap(onChange).should(
      'have.been.calledWith',
      Cypress.sinon.match.any,
      newValue,
      expectedDateIsoString
    )
  })

  it('should respect given local and timezone', async () => {
    const expectedFormattedValue = '17/10/2022'
    const expectedDateIsoString = '2022-10-16T21:00:00.000Z' // Africa/Nairobi is GMT +3
    const onChange = cy.spy()
    cy.mount(
      <ApplyLocale locale="hu" timezone="UTC">
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          locale="fr"
          timezone="Africa/Nairobi"
          value="26/10/2022"
          onChange={onChange}
        />
      </ApplyLocale>
    )

    cy.get('button[data-popover-trigger="true"]').click()

    cy.get('thead th')
      .eq(2)
      .within(() => {
        cy.get('.plugin-cache-1sr5vj2-screenReaderContent').should(
          'have.text',
          'mercredi'
        )
        cy.get('[aria-hidden="true"]').should('have.text', 'me')
      })

    cy.contains('button', '17').click()

    cy.wrap(onChange).should(
      'have.been.calledWith',
      Cypress.sinon.match.any,
      expectedFormattedValue,
      expectedDateIsoString
    )
  })

  it('should read local and timezone information from environment context', async () => {
    const expectedFormattedValue = '2022. 10. 17.'
    const expectedDateIsoString = '2022-10-17T00:00:00.000Z'
    const onChange = cy.spy()

    cy.mount(
      <ApplyLocale locale="hu" timezone="UTC">
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value="2022. 10. 26."
          onChange={onChange}
        />
      </ApplyLocale>
    )

    cy.get('button[data-popover-trigger="true"]').click()

    cy.get('thead th')
      .eq(2)
      .within(() => {
        cy.get('.plugin-cache-1sr5vj2-screenReaderContent').should(
          'have.text',
          'szerda'
        )
        cy.get('[aria-hidden="true"]').should('have.text', 'sze')
      })

    cy.contains('button', '17').click()

    cy.wrap(onChange).should(
      'have.been.calledWith',
      Cypress.sinon.match.any,
      expectedFormattedValue,
      expectedDateIsoString
    )
  })

  describe('with various locales', () => {
    const getDayInOriginalLanguage = (date, locale) => {
      // Early guards for locales where Intl.DateTimeFormat can't formatting
      if (locale === 'gu') return '૧૭' // Return hardcoded Gujarati numeral for 17
      if (locale === 'hi') return '१७' // Return hardcoded Hindi - Devanagari numeral for 17
      if (locale === 'km') return '១៧' // Return hardcoded Khmer numeral for 17
      if (locale === 'kn') return '೧೭' // Return hardcoded Kannada numeral for 17
      if (locale === 'ne') return '१७' // Return hardcoded Nepali numeral for 17
      if (locale === 'ta') return '௧௭' // Return hardcoded Tamil numeral for 17
      if (locale === 'ar-AE') return '١٧' // Return hardcoded Arabic-Indic numeral for 17

      const dayString = new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        calendar: 'gregory'
      }).format(date)

      // Trim extra non-digit characters,
      // but preserve the first sequence of numbers even if they are in a non-Western numeral system
      return dayString.replace(/[^\p{N}]+$/u, '')
    }

    const formatDate = (date, locale) => {
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        calendar: 'gregory'
      }).format(date)
    }

    const normalizeWesternDigits = (dateText) => {
      // Define numeral mappings for different numeral systems
      const numeralMappings = {
        // Arabic-Indic
        '\u0660': '0',
        '\u0661': '1',
        '\u0662': '2',
        '\u0663': '3',
        '\u0664': '4',
        '\u0665': '5',
        '\u0666': '6',
        '\u0667': '7',
        '\u0668': '8',
        '\u0669': '9',
        // Persian
        '\u06F0': '0',
        '\u06F1': '1',
        '\u06F2': '2',
        '\u06F3': '3',
        '\u06F4': '4',
        '\u06F5': '5',
        '\u06F6': '6',
        '\u06F7': '7',
        '\u06F8': '8',
        '\u06F9': '9',
        // Bengali
        '\u09E6': '0',
        '\u09E7': '1',
        '\u09E8': '2',
        '\u09E9': '3',
        '\u09EA': '4',
        '\u09EB': '5',
        '\u09EC': '6',
        '\u09ED': '7',
        '\u09EE': '8',
        '\u09EF': '9',
        // Devanagari (Hindi)
        '\u0966': '0',
        '\u0967': '1',
        '\u0968': '2',
        '\u0969': '3',
        '\u096A': '4',
        '\u096B': '5',
        '\u096C': '6',
        '\u096D': '7',
        '\u096E': '8',
        '\u096F': '9',
        // Thai
        '\u0E50': '0',
        '\u0E51': '1',
        '\u0E52': '2',
        '\u0E53': '3',
        '\u0E54': '4',
        '\u0E55': '5',
        '\u0E56': '6',
        '\u0E57': '7',
        '\u0E58': '8',
        '\u0E59': '9',
        // Khmer
        '\u17E0': '0',
        '\u17E1': '1',
        '\u17E2': '2',
        '\u17E3': '3',
        '\u17E4': '4',
        '\u17E5': '5',
        '\u17E6': '6',
        '\u17E7': '7',
        '\u17E8': '8',
        '\u17E9': '9'
      }

      // Return the date with western digits
      return dateText.replace(
        /[\u0660-\u0669\u06F0-\u06F9\u09E6-\u09EF\u0966-\u096F\u0E50-\u0E59\u17E0-\u17E9]/g,
        (d) => numeralMappings[d] || d
      )
    }

    const removeRtlMarkers = (dateText) => {
      return dateText.replace(/\u200f/g, '')
    }

    const hasRtlMarkers = (inputValue: string) => {
      return inputValue.includes('‏')
    }

    const transformDate = ({ date, locale, shouldRemoveRTL = true }) => {
      const formatted = formatDate(date, locale) // ١٧/٣/٢٠٢٢
      const normalized = normalizeWesternDigits(formatted) // 172022/3/  RTL:(17[U+200F]/3[U+200F]/2022)
      const rtlFree = removeRtlMarkers(normalized) // 17/3/2022

      return shouldRemoveRTL ? rtlFree : normalized
    }

    LOCALES.forEach(({ locale, textDirection }) => {
      it(`should call onChange with the correct formatted value and ISO date string for locale: ${locale}`, () => {
        const onChange = cy.spy()
        // Setting the initial date ensures that the calendar opening on the desired position
        const dateForSetInitial = new Date(Date.UTC(2022, 2, 26))
        const dateForExpectSelect = new Date(Date.UTC(2022, 2, 17)) // Thu, 17 Mar 2022 00:00:00 GMT
        const expectedDateIsoString = dateForExpectSelect.toISOString() // '2022-03-17T00:00:00.000Z'
        const expectedOnChangeValue = transformDate({
          date: dateForExpectSelect,
          locale,
          shouldRemoveRTL: false
        })
        const expectedFormattedValue = transformDate({
          date: dateForExpectSelect,
          locale
        })
        const initialDate = transformDate({ date: dateForSetInitial, locale })
        const dayForSelect = getDayInOriginalLanguage(
          dateForExpectSelect,
          locale
        ) // 17 (in local language)

        cy.mount(
          <RtlExample
            dir={textDirection}
            textDirection={textDirection}
            initialValue={initialDate}
            onChange={onChange}
            locale={locale}
          />
        )

        cy.get('button[data-popover-trigger="true"]').click()

        cy.get('table').should('be.visible')

        cy.contains('button', dayForSelect)
          .should('be.enabled')
          .click()
          .wait(500)

        cy.get('input')
          .invoke('val')
          .then((inputValue) => {
            const inputValueRTLFree = removeRtlMarkers(inputValue)
            const hasCorrectDirection =
              (textDirection === 'rtl') === hasRtlMarkers(inputValue as string)

            cy.wrap(hasCorrectDirection).should('be.true')
            cy.wrap(inputValueRTLFree).should('equal', expectedFormattedValue)
            cy.wrap(onChange).should(
              'have.been.calledWith',
              Cypress.sinon.match.any,
              expectedOnChangeValue,
              expectedDateIsoString
            )
          })
      })
    })
  })

  it('should change separators according to locale', async () => {
    cy.mount(<DateInputExample locale={'hu'} />)

    cy.get('input').as('input')
    cy.get('@input').clear().realType('2022-03 26')
    cy.get('@input').blur()
    cy.get('input').should('have.value', '2022. 03. 26.')

    cy.get('@input').clear().realType('2022,03/26')
    cy.get('@input').blur()
    cy.get('input').should('have.value', '2022. 03. 26.')
  })

  it('should change leading zero according to locale', async () => {
    cy.mount(<DateInputExample locale={'es-ES'} />)

    cy.get('input').as('input')
    cy.get('@input').clear().realType('06.03.2022')
    cy.get('@input').blur()
    cy.get('input').should('have.value', '6/3/2022')

    cy.mount(<DateInputExample locale={'pl'} />)

    cy.get('input').as('input')
    cy.get('@input').clear().realType('06/3/2022')
    cy.get('@input').blur()
    cy.get('input').should('have.value', '6.03.2022')

    cy.mount(<DateInputExample locale={'af'} />)

    cy.get('input').as('input')
    cy.get('@input').clear().realType('2022,3,6')
    cy.get('@input').blur()
    cy.get('input').should('have.value', '2022-03-06')
  })

  it('should dateFormat prop respect the provided local', async () => {
    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          dateFormat="hu"
          onChange={(_e, value) => setValue(value)}
        />
      )
    }

    cy.mount(<Example />)

    // set system date to 2022 march
    const testDate = new Date(2022, 2, 26)
    cy.clock(testDate.getTime())

    cy.get('input').should('have.value', '')

    cy.get('button[data-popover-trigger="true"]').click()
    cy.tick(1000)
    cy.contains('button', '17').click()
    cy.tick(1000)

    cy.get('input').should('have.value', '2022. 03. 17.')
  })

  TIMEZONES_DST.forEach(({ timezone, expectedDateIsoString }) => {
    it(`should apply correct timezone and daylight saving adjustments in DST period for: ${timezone}`, () => {
      const onChange = cy.spy()
      const initialDate = new Date(Date.UTC(2020, 3, 26)).toLocaleDateString(
        'en-GB'
      )
      const expectedFormattedValue = '17/04/2020'

      cy.mount(
        <DateInputExample
          initialValue={initialDate}
          onChange={onChange}
          locale={'en-GB'}
          timezone={timezone}
        />
      )

      cy.get('button[data-popover-trigger="true"]').click()
      cy.contains('button', '17').click()

      cy.get('input').should('have.value', expectedFormattedValue)
      cy.wrap(onChange).should(
        'have.been.calledWith',
        Cypress.sinon.match.any,
        expectedFormattedValue,
        expectedDateIsoString
      )
    })
  })

  TIMEZONES_NON_DST.forEach(({ timezone, expectedDateIsoString }) => {
    it(`should apply correct timezone and daylight saving adjustments in non-DST period for: ${timezone}`, () => {
      const onChange = cy.spy()
      const initialDate = new Date(Date.UTC(2020, 1, 26)).toLocaleDateString(
        'en-GB'
      )
      const expectedFormattedValue = '17/02/2020'

      cy.mount(
        <DateInputExample
          initialValue={initialDate}
          onChange={onChange}
          locale={'en-GB'}
          timezone={timezone}
        />
      )

      cy.get('button[data-popover-trigger="true"]').click()
      cy.contains('button', '17').click()

      cy.get('input').should('have.value', expectedFormattedValue)
      cy.wrap(onChange).should(
        'have.been.calledWith',
        Cypress.sinon.match.any,
        expectedFormattedValue,
        expectedDateIsoString
      )
    })
  })

  it('should set custom value through formatter callback', async () => {
    const customValue = 'customValue'
    const date = new Date(2020, 10, 10)

    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          dateFormat={{
            parser: () => date,
            formatter: () => customValue
          }}
          onChange={(_e, value) => setValue(value)}
        />
      )
    }
    cy.mount(<Example />)

    cy.get('input').should('have.value', '')

    cy.get('button[data-popover-trigger="true"]').click()
    cy.contains('button', '17').click()

    cy.get('input').should('have.value', customValue)
  })

  it('should render year picker based on the withYearPicker prop', async () => {
    cy.mount(
      <DateInput2
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month'
        }}
        value=""
        locale="en-GB"
        timezone="UTC"
        withYearPicker={{
          screenReaderLabel: 'Year picker',
          startYear: 2022,
          endYear: 2024
        }}
      />
    )
    // set system date to 2023 march
    const testDate = new Date(2023, 2, 26)
    cy.clock(testDate.getTime())

    cy.get('button[data-popover-trigger="true"]').click()
    cy.tick(1000)

    cy.get('input[id^="Select_"]').as('yearPicker')

    cy.get('@yearPicker').should('have.value', '2023')

    cy.get('[id^="Selectable_"][id$="-description"]').should(
      'have.text',
      'Year picker'
    )

    cy.get('@yearPicker').click()
    cy.tick(1000)

    cy.get('ul[id^="Selectable_"]').should('be.visible')
    cy.get('[class$="-optionItem"]').as('options')
    cy.get('@options').should('have.length', 3)
    cy.get('@options').eq(0).should('contain.text', '2024')
    cy.get('@options').eq(1).should('contain.text', '2023')
    cy.get('@options').eq(2).should('contain.text', '2022')
  })

  it('should set correct value using calendar year picker', async () => {
    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          onChange={(_e, value) => setValue(value)}
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 2022,
            endYear: 2024
          }}
        />
      )
    }

    cy.mount(<Example />)

    // set system date to 2023 march
    const testDate = new Date(2023, 2, 26)
    cy.clock(testDate.getTime())

    cy.get('input').should('have.value', '')

    cy.get('button[data-popover-trigger="true"]').click()
    cy.tick(1000)

    cy.get('input[id^="Select_"]').as('yearPicker')
    cy.get('@yearPicker').should('have.value', '2023')

    cy.get('@yearPicker').click()
    cy.tick(1000)

    cy.get('[class$="-optionItem"]').eq(2).click()
    cy.tick(1000)

    cy.get('@yearPicker').should('have.value', '2022')

    cy.contains('button', '17').click()
    cy.tick(1000)

    cy.get('input').should('have.value', '17/03/2022')
  })

  it('should display correct year in year picker after date is typed into input', async () => {
    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          onChange={(_e, value) => setValue(value)}
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 2020,
            endYear: 2024
          }}
        />
      )
    }

    cy.mount(<Example />)

    cy.get('input').should('have.value', '')

    cy.get('input').clear().realType('26/03/2021')
    cy.get('input').blur()

    cy.get('input').should('have.value', '26/03/2021')

    cy.get('button[data-popover-trigger="true"]').click()

    cy.get('input[id^="Select_"]').as('yearPicker')
    cy.get('@yearPicker').should('have.value', '2021')
  })

  it('should display -- sign in yearPicker if no date value or date is out of range', async () => {
    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          onChange={(_e, value) => setValue(value)}
          withYearPicker={{
            screenReaderLabel: 'Year picker',
            startYear: 2020,
            endYear: 2022
          }}
        />
      )
    }

    cy.mount(<Example />)

    cy.get('button[data-popover-trigger="true"]').as('calendarBtn')
    cy.get('input[id^="TextInput_"]').as('input')

    cy.get('@input').should('have.value', '')

    cy.get('@calendarBtn').click()

    cy.get('input[id^="Select_"]').as('yearPicker')
    cy.get('@yearPicker').should('have.value', '')
    cy.get('@yearPicker').should('have.attr', 'placeholder', '--')

    cy.get('@input').click().wait(100)
    cy.get('@input').clear().realType('26/03/1500')
    cy.get('@input').blur()

    cy.get('@input').should('have.value', '26/03/1500')

    cy.get('@calendarBtn').click()

    cy.get('@yearPicker').should('have.value', '')
    cy.get('@yearPicker').should('have.attr', 'placeholder', '--')
  })

  it('should trigger onRequestValidateDate callback on date selection or blur event', async () => {
    const dateValidationSpy = cy.spy()

    cy.mount(<DateInputExample onRequestValidateDate={dateValidationSpy} />)

    cy.get('button[data-popover-trigger="true"]').as('calendarBtn')
    cy.get('input[id^="TextInput_"]').as('input')

    cy.get('@calendarBtn').click()
    cy.contains('button', '17').click()

    cy.wrap(dateValidationSpy).should('have.been.calledOnce')

    cy.get('@input').clear().realType('26/03/2020')
    cy.get('@input').blur()

    cy.wrap(dateValidationSpy).should('have.been.calledTwice')
  })

  it('should pass necessary props to parser and formatter via dateFormat prop', async () => {
    const userDate = '26/03/2021'
    const parserReturnedDate = new Date(1111, 11, 11)

    const parserSpy = cy.spy(() => parserReturnedDate)
    const formatterSpy = cy.spy(() => '11/11/1111')

    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          dateFormat={{
            parser: parserSpy,
            formatter: formatterSpy
          }}
          onChange={(_e, value) => setValue(value)}
        />
      )
    }

    cy.mount(<Example />)

    cy.get('input').as('input')
    cy.get('@input').clear().realType(userDate)
    cy.get('@input').blur()

    cy.wrap(parserSpy).should('have.been.calledWith', userDate)
    cy.wrap(formatterSpy).should('have.been.calledWith', parserReturnedDate)
  })

  it('should onRequestValidateDate prop pass necessary props to the callback when input value is not a valid date', async () => {
    const dateValidationSpy = cy.spy()
    const newValue = 'not a date'
    const expectedDateIsoString = ''

    cy.mount(<DateInputExample onRequestValidateDate={dateValidationSpy} />)

    cy.get('input').clear().realType(newValue)
    cy.get('input').blur()

    cy.wrap(dateValidationSpy).should(
      'have.been.calledWith',
      Cypress.sinon.match.any,
      newValue,
      expectedDateIsoString
    )
  })

  it('should onRequestValidateDate prop pass necessary props to the callback when input value is a valid date', async () => {
    const dateValidationSpy = cy.spy()
    const newValue = '26/03/2021'
    const expectedDateIsoString = new Date(Date.UTC(2021, 2, 26)).toISOString()

    cy.mount(<DateInputExample onRequestValidateDate={dateValidationSpy} />)

    cy.get('input').clear().realType(newValue)
    cy.get('input').blur()

    cy.wrap(dateValidationSpy).should(
      'have.been.calledWith',
      Cypress.sinon.match.any,
      newValue,
      expectedDateIsoString
    )
  })

  const expectedPlaceholders = [
    { locale: 'hu', expectedPlaceHolder: 'YYYY. MM. DD.' },
    { locale: 'fr', expectedPlaceHolder: 'DD/MM/YYYY' },
    { locale: 'en-US', expectedPlaceHolder: 'M/D/YYYY' },
    { locale: 'ar-SA', expectedPlaceHolder: 'D‏/M‏/YYYY' }
  ]

  expectedPlaceholders.forEach(({ locale, expectedPlaceHolder }) => {
    it(`should set proper placeholder with locale: ${locale}`, () => {
      cy.mount(<DateInputExample locale={locale} />)

      cy.get('input[id^="TextInput_"]').should(
        'have.attr',
        'placeholder',
        expectedPlaceHolder
      )
    })
  })

  it(`should set proper placeholder with dateFormat prop formatter callback`, () => {
    const expectedPlaceHolder = 'YYYY*M*D'

    const Example = () => {
      const [value, setValue] = useState('')

      return (
        <DateInput2
          renderLabel="Choose a date"
          screenReaderLabels={{
            calendarIcon: 'Calendar',
            nextMonthButton: 'Next month',
            prevMonthButton: 'Previous month'
          }}
          value={value}
          locale="en-GB"
          timezone="UTC"
          dateFormat={{
            parser: (_input) => {
              return new Date(Date.UTC(1111, 11, 11))
            },
            formatter: (date) => {
              const year = date.getFullYear()
              const month = date.getMonth() + 1
              const day = date.getDate()

              // set placeholder according to created date structure 'YYYY*M*D'
              return `${year}*${month}*${day}`
            }
          }}
          onChange={(_e, value) => setValue(value)}
        />
      )
    }
    cy.mount(<Example />)

    cy.get('input[id^="TextInput_"]').should(
      'have.attr',
      'placeholder',
      expectedPlaceHolder
    )
  })
})
