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

import type { StoryConfig } from '@instructure/ui-test-utils'
import type { DateTimeInputProps } from '../props'

export default {
  sectionProp: 'layout',
  propValues: {
    datePlaceholder: [undefined, 'date placeholder'],
    colSpacing: ['small', 'medium'],
    rowSpacing: ['small', 'medium'],
    defaultValue: [undefined, '2018-01-18T16:00', 'intentionally wrong'],
    invalidDateTimeMessage: ['invalid date'],
    timeStep: [10],
    messages: [
      undefined,
      [
        { text: 'error message', type: 'error' },
        { text: 'success message', type: 'success' }
      ]
    ],
    interaction: ['enabled', 'disabled'],
    disabledDates: [undefined, ['2018-01-18T16:00']]
  },
  getComponentProps: (props) => {
    const defaultPropsForLayout =
      props.interaction === 'enabled' &&
      !props.datePlaceholder &&
      !props.defaultValue &&
      !props.isRequired &&
      !props.messages

    const defaultColSpacing = 'medium'
    const defaultRowSpacing = 'small'

    return {
      description: 'desc',
      dateRenderLabel: 'date render label',
      timeRenderLabel: 'time render label',
      isRequired: false,
      prevMonthLabel: 'prev month',
      nextMonthLabel: 'next month',
      timeLabel: 'time label',
      timeStep: 10,
      timezone: 'America/Tijuana',
      locale: 'de-AT',
      disabledDateTimeMessage: 'Disabled Date!',
      colSpacing:
        defaultPropsForLayout &&
        props.rowSpacing === defaultRowSpacing &&
        props.layout === 'columns'
          ? props.colSpacing
          : defaultColSpacing,
      rowSpacing:
        defaultPropsForLayout &&
        props.colSpacing === defaultColSpacing &&
        props.layout !== 'columns'
          ? props.rowSpacing
          : defaultRowSpacing
    }
  }
} as StoryConfig<DateTimeInputProps>
