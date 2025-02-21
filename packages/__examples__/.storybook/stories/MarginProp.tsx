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
  Button,
  ColorPicker,
  TextInput,
  TextArea,
  NumberInput,
  DateInput2
} from '@instructure/ui'

const exampleMargin = 'space36 21px 0 buttons'

function MarginProp() {
  return (
    <div>
      <Button margin={exampleMargin}>hello</Button>
      <TextInput margin={exampleMargin} />
      <TextArea margin={exampleMargin} label="label" />
      <NumberInput margin={exampleMargin} renderLabel="label" />
      <ColorPicker
        placeholderText="placeholder"
        label="label"
        margin={exampleMargin}
      />
      <DateInput2
        margin={exampleMargin}
        renderLabel="label"
        screenReaderLabels={{
          calendarIcon: 'asdf',
          prevMonthButton: 'asdf',
          nextMonthButton: 'asdf'
        }}
      />
    </div>
  )
}

export default MarginProp
