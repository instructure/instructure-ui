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
import TimeInput from '../index'

export const basic = () => {
  return (
    <TimeInput label='Time' />
  )
}

export const withValue = () => {
  return (
    <TimeInput
      label='Time with value'
      value='1986-05-17T19:00:00.000Z'
      onChange={(e) => { console.log('onChange', e) }} // eslint-disable-line no-console

    />
  )
}

export const withDefaultValue = () => {
  return (
    <TimeInput
      label='Time with defaultValue'
      defaultValue='1986-05-17T14:00:00.000Z'
      onChange={(e) => { console.log('onChange', e) }} // eslint-disable-line no-console
    />
  )
}

export const withStep = () => {
  return (
    <TimeInput
      label='Time with step'
      step={60}
      format='LTS'
    />
  )
}

export const withTimeZone = () => {
  return (
    <div style={{height: 500, width: 500}}>
      <TimeInput
        label='Eastern'
        value={new Date().toISOString()}
        timezone='US/Eastern'
        onChange={(e) => { console.log('onChange', e) }} // eslint-disable-line no-console
      /><br/>
      <TimeInput
        label='Central'
        value={new Date().toISOString()}
        timezone='US/Central'
        onChange={(e) => { console.log('onChange', e) }} // eslint-disable-line no-console
      /><br/>
      <TimeInput
        label='Mountain'
        value={new Date().toISOString()}
        timezone='US/Mountain'
        onChange={(e) => { console.log('onChange', e) }} // eslint-disable-line no-console
      /><br/>
      <TimeInput
        label='Western'
        value={new Date().toISOString()}
        timezone='US/Pacific'
        onChange={(e) => { console.log('onChange', e) }} // eslint-disable-line no-console
      />
    </div>
  )
}

export const withLocale = () => {
  return (
    <TimeInput
      label='Time with French locale'
      format='LTS'
      locale="fr"
    />
  )
}

export const defaultToFirstOption = () => {
  return (
    <TimeInput
      label='Time with defaultToFirstOption'
      defaultToFirstOption
    />
  )
}

export const disabled = () => {
  return (
    <TimeInput
      label='Disabled Time'
      format='LTS'
      defaultValue='1986-05-17T18:00:00.000Z'
      disabled
    />
  )
}

export const readOnly = () => {
  return (
    <TimeInput
      label='Readonly Time'
      format='LTS'
      defaultValue='1986-05-17T18:00:00.000Z'
      readOnly
    />
  )
}
