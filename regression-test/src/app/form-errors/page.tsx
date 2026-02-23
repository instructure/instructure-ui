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

'use client'
import React from 'react'
import {
  TextInput as ti,
  NumberInput as ni,
  TextArea as ta,
  Checkbox as cb,
  CheckboxGroup as cg,
  RadioInput as ri,
  RadioInputGroup as rig,
  FileDrop as fd,
  ColorPicker as cp,
  DateTimeInput as dti
} from '@instructure/ui/latest'

const TextInput = ti as any
const NumberInput = ni as any
const TextArea = ta as any
const Checkbox = cb as any
const CheckboxGroup = cg as any
const RadioInput = ri as any
const RadioInputGroup = rig as any
const FileDrop = fd as any
const ColorPicker = cp as any
const DateTimeInput = dti as any

export default function FormErrorsPage() {
  const messages = [{ type: 'newError', text: 'Short error message' }]

  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
        <TextInput renderLabel="TextInput" messages={messages} isRequired />
        <NumberInput renderLabel="NumberInput" messages={messages} isRequired />
        <TextArea label="TextArea" messages={messages} required />

        <Checkbox label="Checkbox" isRequired messages={messages} />
        <Checkbox
          label='Checkbox (variant="toggle")'
          variant="toggle"
          isRequired
          messages={messages}
        />

        <CheckboxGroup
          name="CheckboxGroup"
          messages={messages}
          description="CheckboxGroup"
        >
          <Checkbox label="Checkbox 1" value="checkbox1" />
          <Checkbox label="Checkbox 2" value="checkbox2" />
          <Checkbox label="Checkbox 3" value="checkbox3" />
        </CheckboxGroup>

        <RadioInputGroup
          name="radioInputGroup"
          description="RadioInputGroup"
          messages={messages}
          isRequired
        >
          <RadioInput label="RadioInput 1" value="radioInput1" />
          <RadioInput label="RadioInput 2" value="radioInput2" />
          <RadioInput label="RadioInput 3" value="radioInput3" />
        </RadioInputGroup>

        <FileDrop messages={messages} renderLabel="FileDrop" />

        <ColorPicker
          label="ColorPicker"
          placeholderText="Enter HEX"
          isRequired
          renderMessages={() => messages}
        />

        <DateTimeInput
          description={`DateTimeInput (layout="columns")`}
          datePlaceholder="Choose a date"
          dateRenderLabel="Date"
          timeRenderLabel="Time"
          invalidDateTimeMessage="Invalid date!"
          prevMonthLabel="Previous month"
          nextMonthLabel="Next month"
          defaultValue="2018-01-18T13:30"
          layout="columns"
          isRequired
          messages={messages}
        />

        <DateTimeInput
          description={`DateTimeInput (layout="stacked")`}
          datePlaceholder="Choose a date"
          dateRenderLabel="Date"
          timeRenderLabel="Time"
          invalidDateTimeMessage="Invalid date!"
          prevMonthLabel="Previous month"
          nextMonthLabel="Next month"
          defaultValue="2018-01-18T13:30"
          layout="stacked"
          isRequired
          messages={messages}
        />
      </div>
    </main>
  )
}
