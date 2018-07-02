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
/* eslint-disable instructure-ui/no-relative-package-imports */
import Select from '../../../../../ui-forms/lib/components/Select'
import View from '../../../../../ui-layout/lib/components/View'
/* eslint-disable instructure-ui/no-relative-package-imports */
import NumberInput from '../index'

export const standard = () => {
  return (
    <NumberInput
      label="Age (in years)"
      placeholder="Your age goes here"
    />
  )
}

export const disabled = () => {
  return (
    <NumberInput
      label="Age (in years)"
      placeholder="Your age goes here"
      disabled
    />
  )
}

export const noArrows = () => {
  return (
    <NumberInput
      label="Age (in years)"
      placeholder="Your age goes here"
      showArrows={false}
    />
  )
}

export const layoutInline = () => {
  return (
    <NumberInput
      label="Age (in years)"
      placeholder="Your age goes here"
      layout="inline"
    />
  )
}

export const layoutStacked = () => {
  return (
    <NumberInput
      label="Age (in years)"
      placeholder="Your age goes here"
      layout="stacked"
    />
  )
}

export const inline = () => {
  return (
    <NumberInput
      label="Age (in years)"
      placeholder="Your age goes here"
      layout="inline"
      width="12rem"
      inline={true}
    />
  )
}

export const withWidth = () => {
  return (
    <NumberInput
      label="Age (in years)"
      placeholder="Your age goes here"
      width="15rem"
    />
  )
}

export const minNumber = () => {
  return (
    <NumberInput
      label="Pick a number above 7"
      placeholder="Your number goes here"
      min={7}
    />
  )
}

export const maxNumber = () => {
  return (
    <NumberInput
      label="Pick a number below 21"
      placeholder="Your number goes here"
      max={21}
    />
  )
}

export const step = () => {
  return (
    <NumberInput
      label="Pick a number divisible by 5"
      placeholder="Your number goes here"
      step={5}
    />
  )
}

export const defaultValue = () => {
  return (
    <NumberInput
      label="What is your favorite number?"
      placeholder="Your number goes here"
      defaultValue="7"
    />
  )
}

class LocaleExample extends React.Component {
  state = { locale: 'de' };

  render () {
    const label = this.state.locale === 'de' ? "Comma separator" : "Period separator"
    return (
      <div>
        <Select
          label="Choose locale"
          onChange={(e, o) => this.setState({ locale: o.value })}>
            <option key="de" value="de">de</option>
            <option key="en" value="en">en</option>
        </Select>
        <View padding="small">
          <NumberInput
            label={label}
            step={0.1}
            min={0.1}
            locale={this.state.locale}
            defaultValue={2.4}
          />
        </View>
      </div>
    )
  }
}

export const locale = () => {
  return (
    <LocaleExample />
  )
}

export const error = () => {
  return (
    <NumberInput
      label="Pick a number above 7"
      placeholder="Your number goes here"
      messages={[{ text: 'You must enter a number', type: 'error' }]}
      required
    />
  )
}

export const hint = () => {
  return (
    <NumberInput
      label="Pick a number above 7"
      placeholder="Your number goes here"
      messages={[{ text: 'Your number must be 7 or higher', type: 'hint' }]}
      min={7}
    />
  )
}

export const success = () => {
  return (
    <NumberInput
      label="Pick a number below 21"
      placeholder="Your number goes here"
      messages={[{ text: 'Thanks for entering a number below 21', type: 'success' }]}
      max={21}
    />
  )
}
