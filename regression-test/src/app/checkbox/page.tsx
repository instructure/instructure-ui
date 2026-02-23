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
  View as vw,
  ScreenReaderContent as src,
  FormFieldGroup as ffg
} from '@instructure/ui/latest'

const Checkbox = cb as any
const View = vw as any
const ScreenReaderContent = src as any
const FormFieldGroup = ffg as any

export default function CheckboxPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* Default checked */}
      <Checkbox label="Default checked" value="medium" defaultChecked />

      {/* Disabled state examples */}
      <FormFieldGroup
        description={
          <ScreenReaderContent>Checkbox disabled examples</ScreenReaderContent>
        }
      >
        <Checkbox
          label="Disabled (checked)"
          value="medium"
          disabled
          defaultChecked
        />
        <Checkbox label="Disabled (unchecked)" value="small" disabled />
      </FormFieldGroup>

      {/* Indeterminate parent with children */}
      <FormFieldGroup
        description={
          <ScreenReaderContent>
            <span id="groupLabel">Courses to edit</span>
          </ScreenReaderContent>
        }
        rowSpacing="small"
      >
        <Checkbox
          aria-labelledby="groupLabel selectAllLabel"
          label={<span id="selectAllLabel">Select all courses</span>}
          value="all"
          indeterminate
        />
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            aria-labelledby="groupLabel eng203Label"
            label={<span id="eng203Label">English 203</span>}
            value="eng203"
            name="courses"
            checked
            readOnly
          />
        </View>
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            aria-labelledby="groupLabel sci101Label"
            label={<span id="sci101Label">Science 101</span>}
            value="sci101"
            name="courses"
          />
        </View>
        <View as="div" padding="0 0 0 medium">
          <Checkbox
            aria-labelledby="groupLabel hist111Label"
            label={<span id="hist111Label">History 111</span>}
            value="his111"
            name="courses"
            checked
            readOnly
          />
        </View>
      </FormFieldGroup>

      {/* Toggle variant sizes */}
      <FormFieldGroup
        description={
          <ScreenReaderContent>
            Checkbox toggle size examples
          </ScreenReaderContent>
        }
      >
        <Checkbox
          label="Small size"
          value="small"
          variant="toggle"
          size="small"
          defaultChecked
        />
        <Checkbox label="Medium size" value="medium" variant="toggle" />
        <Checkbox
          label="Large size"
          value="large"
          variant="toggle"
          size="large"
          defaultChecked
        />
      </FormFieldGroup>

      {/* Toggle label placement */}
      <FormFieldGroup
        description={
          <ScreenReaderContent>Toggle label examples</ScreenReaderContent>
        }
      >
        <Checkbox
          label="Top"
          variant="toggle"
          labelPlacement="top"
          defaultChecked
        />
        <Checkbox label="Start" variant="toggle" labelPlacement="start" />
        <Checkbox
          label="End"
          variant="toggle"
          labelPlacement="end"
          defaultChecked
        />
      </FormFieldGroup>

      <span>Screenreader-only label:</span>
      <Checkbox
        label={
          <ScreenReaderContent>
            Screenreader-accessible label
          </ScreenReaderContent>
        }
        value="accessible"
        variant="toggle"
      />
    </main>
  )
}
