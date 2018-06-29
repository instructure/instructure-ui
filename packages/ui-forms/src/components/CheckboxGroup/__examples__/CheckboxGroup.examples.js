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
import CheckboxGroup from '../index'
import Checkbox from '../../Checkbox'

export const layoutStacked = () => {
  return (
    <CheckboxGroup
      name="sports"
      description="Select your favorite sports"
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const layoutColumns = () => {
  return (
    <CheckboxGroup
    layout="columns"
      name="sports"
      description="Select your favorite sports"
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const layoutInline = () => {
  return (
    <CheckboxGroup
      layout="inline"
      name="sports"
      description="Select your favorite sports"
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const sizeSmall = () => {
  return (
    <CheckboxGroup
      size="small"
      name="sports"
      description="Select your favorite sports"
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const sizeMedium = () => {
  return (
    <CheckboxGroup
      size="medium"
      name="sports"
      description="Select your favorite sports"
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const sizeLarge = () => {
  return (
    <CheckboxGroup
      size="large"
      name="sports"
      description="Select your favorite sports"
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const withToggle = () => {
  return (
    <CheckboxGroup
      name="sports"
      description="Select your favorite sports"
      size="small"
    >
      <Checkbox variant="toggle" label="Tennis" value="tennis" />
      <Checkbox variant="toggle" label="Lacrosse" value="lacrosse" />
      <Checkbox variant="toggle" label="Water Polo" value="water-polo" />
      <Checkbox variant="toggle" label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const error = () => {
  return (
    <CheckboxGroup
      name="sports"
      description="Select your favorite sports"
      messages={[
        { text: 'Please make a selection', type: 'error' }
      ]}
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const hint = () => {
  return (
    <CheckboxGroup
      name="sports"
      description="Select your favorite sports"
      messages={[
        { text: 'This is to help us decide on course offerings', type: 'hint' }
      ]}
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const success = () => {
  return (
    <CheckboxGroup
      name="sports"
      description="Select your favorite sports"
      messages={[
        { text: 'Woot... you did it', type: 'success' }
      ]}
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}

export const disabled = () => {
  return (
    <CheckboxGroup
      disabled
      name="sports"
      description="Select your favorite sports"
    >
      <Checkbox label="Tennis" value="tennis" />
      <Checkbox label="Lacrosse" value="lacrosse" />
      <Checkbox label="Water Polo" value="water-polo" />
      <Checkbox label="Golf" value="golf" />
    </CheckboxGroup>
  )
}
