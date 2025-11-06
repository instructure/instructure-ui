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
  Checkbox as cb,
  CheckboxGroup as cg,
  FormFieldGroup as ffg,
  ScreenReaderContent as src
} from '@instructure/ui'

const Checkbox = cb as any
const CheckboxGroup = cg as any
const FormFieldGroup = ffg as any
const ScreenReaderContent = src as any

export default function CheckboxGroupPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* FormFieldGroup with two CheckboxGroup examples */}
      <FormFieldGroup
        description={
          <ScreenReaderContent>CheckboxGroup examples</ScreenReaderContent>
        }
      >
        <CheckboxGroup
          name="sports"
          onChange={() => {}}
          defaultValue={['football', 'volleyball']}
          description="Select your favorite sports"
        >
          <Checkbox label="Football" value="football" />
          <Checkbox label="Basketball" value="basketball" />
          <Checkbox label="Volleyball" value="volleyball" />
          <Checkbox label="Other" value="other" />
        </CheckboxGroup>

        <CheckboxGroup
          name="sports"
          size="small"
          layout="columns"
          onChange={() => {}}
          defaultValue={['football', 'volleyball']}
          description="Select your favorite sports"
        >
          <Checkbox label="Football" value="football" />
          <Checkbox label="Basketball" value="basketball" />
          <Checkbox label="Volleyball" value="volleyball" />
          <Checkbox label="Other" value="other" />
        </CheckboxGroup>
      </FormFieldGroup>

      {/* Toggle variant with inline layout and error message */}
      <CheckboxGroup
        name="sports2"
        layout="inline"
        messages={[{ text: 'Invalid name', type: 'error' }]}
        onChange={() => {}}
        defaultValue={['soccer', 'volleyball']}
        description="I wish to receive score alerts for"
      >
        <Checkbox label="Football" value="football" variant="toggle" />
        <Checkbox label="Basketball" value="basketball" variant="toggle" />
        <Checkbox label="Volleyball" value="volleyball" variant="toggle" />
        <Checkbox label="Soccer" value="soccer" variant="toggle" />
      </CheckboxGroup>

      {/* Disabled CheckboxGroup */}
      <CheckboxGroup
        name="sports4"
        onChange={() => {}}
        defaultValue={['soccer', 'volleyball']}
        description="I wish to receive score alerts for"
        disabled
      >
        <Checkbox label="Football" value="football" variant="toggle" />
        <Checkbox label="Basketball" value="basketball" variant="toggle" />
        <Checkbox label="Volleyball" value="volleyball" variant="toggle" />
        <Checkbox label="Soccer" value="soccer" variant="toggle" />
      </CheckboxGroup>
    </main>
  )
}
