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

// The per-locale matrix, kept in its own file so it runs in a separate worker
// from the rest of the DateInput tests. Component behaviour lives in
// `DateInput.test.tsx`.

import { useState } from 'react'
import { render } from 'vitest-browser-react'
import { describe, it, expect, vi } from 'vitest'

import { DateInput } from '@instructure/ui-date-input/latest'

import {
  clickElement,
  dateInputElement,
  dayButton,
  mockConsole,
  openCalendar,
  waitFor2ms
} from './dateInputTestHelpers'

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
  { locale: 'nb', textDirection: 'ltr' }, // Norwegian Bokmal
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

type RtlExampleProps = {
  initialValue?: string
  textDirection?: string
  locale?: string
  onChange?: (...args: any[]) => void
}

const RtlExample = (props: RtlExampleProps) => {
  const [inputValue, setInputValue] = useState(props.initialValue)
  return (
    <div dir={props.textDirection}>
      <DateInput
        renderLabel="Choose a date"
        screenReaderLabels={{
          calendarIcon: 'Calendar',
          nextMonthButton: 'Next month',
          prevMonthButton: 'Previous month',
          datePickerDialog: 'Date picker',
          selectedLabel: 'Selected'
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

describe('<DateInput /> with various locales', () => {
  mockConsole()

  const getDayInOriginalLanguage = (date: Date, locale: string) => {
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

  const formatDate = (date: Date, locale: string) => {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      calendar: 'gregory'
    }).format(date)
  }

  const normalizeWesternDigits = (dateText: string) => {
    // Define numeral mappings for different numeral systems
    const numeralMappings: Record<string, string> = {
      // Arabic-Indic
      '٠': '0',
      '١': '1',
      '٢': '2',
      '٣': '3',
      '٤': '4',
      '٥': '5',
      '٦': '6',
      '٧': '7',
      '٨': '8',
      '٩': '9',
      // Persian
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9',
      // Bengali
      '০': '0',
      '১': '1',
      '২': '2',
      '৩': '3',
      '৪': '4',
      '৫': '5',
      '৬': '6',
      '৭': '7',
      '৮': '8',
      '৯': '9',
      // Devanagari (Hindi)
      '०': '0',
      '१': '1',
      '२': '2',
      '३': '3',
      '४': '4',
      '५': '5',
      '६': '6',
      '७': '7',
      '८': '8',
      '९': '9',
      // Thai
      '๐': '0',
      '๑': '1',
      '๒': '2',
      '๓': '3',
      '๔': '4',
      '๕': '5',
      '๖': '6',
      '๗': '7',
      '๘': '8',
      '๙': '9',
      // Khmer
      '០': '0',
      '១': '1',
      '២': '2',
      '៣': '3',
      '៤': '4',
      '៥': '5',
      '៦': '6',
      '៧': '7',
      '៨': '8',
      '៩': '9'
    }

    // Return the date with western digits
    return dateText.replace(
      /[٠-٩۰-۹০-৯०-९๐-๙០-៩]/g,
      (d) => numeralMappings[d] || d
    )
  }

  const removeRtlMarkers = (dateText: string) => {
    return dateText.replace(/‏/g, '')
  }

  const hasRtlMarkers = (inputValue: string) => {
    return inputValue.includes('‏')
  }

  const transformDate = ({
    date,
    locale,
    shouldRemoveRTL = true
  }: {
    date: Date
    locale: string
    shouldRemoveRTL?: boolean
  }) => {
    const formatted = formatDate(date, locale)
    const normalized = normalizeWesternDigits(formatted)
    const rtlFree = removeRtlMarkers(normalized)

    return shouldRemoveRTL ? rtlFree : normalized
  }

  LOCALES.forEach(({ locale, textDirection }) => {
    it(`should call onChange with the correct formatted value and ISO date string for locale: ${locale}`, async () => {
      const onChange = vi.fn()
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
      const dayForSelect = getDayInOriginalLanguage(dateForExpectSelect, locale) // 17 (in local language)

      await render(
        <RtlExample
          textDirection={textDirection}
          initialValue={initialDate}
          onChange={onChange}
          locale={locale}
        />
      )

      await openCalendar()

      expect(document.querySelector('table')).toBeVisible()

      const day = dayButton(dayForSelect)

      expect(day).toBeEnabled()

      clickElement(day)

      await waitFor2ms(() => {
        const inputValue = dateInputElement().value
        const inputValueRTLFree = removeRtlMarkers(inputValue)

        // the text direction has to match the locale
        expect((textDirection === 'rtl') === hasRtlMarkers(inputValue)).toBe(
          true
        )
        expect(inputValueRTLFree).toEqual(expectedFormattedValue)
      })

      expect(onChange).toHaveBeenCalledWith(
        expect.anything(),
        expectedOnChangeValue,
        expectedDateIsoString
      )
    })
  })
})
