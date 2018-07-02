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
import RadioInput from '../../RadioInput'
import RadioInputGroup from '../index'

export const layoutStacked = () => {
  return (
    <RadioInputGroup
      name="example1"
      description="Select something">
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const layoutColumns = () => {
  return (
    <RadioInputGroup
      name="example2"
      description="Select something"
      layout="columns">
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const layoutInline = () => {
  return (
    <RadioInputGroup
      name="example3"
      description="Select something"
      layout="inline">
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const defaultValue = () => {
  return (
    <RadioInputGroup
      name="example3"
      defaultValue="mickey"
      description="Select something"
      layout="inline">
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const variantToggle = () => {
  return (
    <RadioInputGroup
      name="example4"
      defaultValue="goofy"
      description="Select something"
      variant="toggle">
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const sizeSmall = () => {
  return (
    <RadioInputGroup
      name="example5"
      defaultValue="minnie"
      description="Select something"
      size="small">
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const sizeMedium = () => {
  return (
    <RadioInputGroup
      name="example6"
      defaultValue="minnie"
      description="Select something"
      size="medium">
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const sizeLarge = () => {
  return (
    <RadioInputGroup
      name="example7"
      defaultValue="minnie"
      description="Select something"
      size="large">
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const error = () => {
  return (
    <RadioInputGroup
      name="example8"
      description="Select something"
      messages={[{ text: 'Please make a selection.', type: 'error' }]}
      >
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const hint = () => {
  return (
    <RadioInputGroup
      name="example9"
      description="Select something"
      messages={[{ text: 'Who would you like to meet at Disneyland?', type: 'hint' }]}
      >
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}

export const success = () => {
  return (
    <RadioInputGroup
      name="example10"
      description="Select something"
      messages={[{ text: 'Great choice, thanks for participating', type: 'success' }]}
      >
        <RadioInput
          key="minnie"
          value="minnie"
          label="Minnie"
        />
        <RadioInput
          key="mickey"
          value="mickey"
          label="Mickey"
        />
        <RadioInput
          key="goofy"
          value="goofy"
          label="Goofy"
        />
    </RadioInputGroup>
  )
}
