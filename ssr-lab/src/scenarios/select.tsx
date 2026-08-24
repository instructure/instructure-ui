'use client'

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

import {
  SimpleSelect as ss,
  View as vw,
  Text as tx
} from '@instructure/ui/latest'

const SimpleSelect = ss as any
const View = vw as any
const Text = tx as any

const options = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado'
]

/**
 * SimpleSelect is used here rather than the fully controlled Select, because the
 * uncontrolled version needs no state wiring and still exercises the same input
 * measuring code path.
 */
export default function Scenario() {
  return (
    <View as="div" maxWidth="30rem">
      <SimpleSelect renderLabel="Alap">
        {options.map((option) => (
          <SimpleSelect.Option id={option} key={option} value={option}>
            {option}
          </SimpleSelect.Option>
        ))}
      </SimpleSelect>

      <View as="div" margin="medium 0">
        <SimpleSelect
          renderLabel="Hibaüzenettel"
          messages={[{ type: 'newError', text: 'Válassz egy elemet' }]}
        >
          {options.map((option) => (
            <SimpleSelect.Option id={`e-${option}`} key={option} value={option}>
              {option}
            </SimpleSelect.Option>
          ))}
        </SimpleSelect>
      </View>

      <View as="div" margin="medium 0">
        <SimpleSelect renderLabel="Inline layout" layout="inline">
          {options.map((option) => (
            <SimpleSelect.Option id={`i-${option}`} key={option} value={option}>
              {option}
            </SimpleSelect.Option>
          ))}
        </SimpleSelect>
      </View>

      <Text as="p">Ez a bekezdés a mezők alatt van.</Text>
    </View>
  )
}
