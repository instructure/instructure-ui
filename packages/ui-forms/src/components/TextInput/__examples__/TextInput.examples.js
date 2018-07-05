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
import IconEmail from '@instructure/ui-icons/lib/Line/IconEmail'
import IconUser from '@instructure/ui-icons/lib/Line/IconUser'
import IconSearch from '@instructure/ui-icons/lib/Line/IconSearch'
import TextInput from '../index'

export const small = () => {
  return (
    <TextInput
      size="small"
      type="text"
      label="Small TextInput"
      placeholder="notice the font size" />
  )
}

export const medium = () => {
  return (
    <TextInput
      size="medium"
      type="text"
      label="Medium (default) TextInput"
      placeholder="notice the font size" />
  )
}

export const large = () => {
  return (
    <TextInput
      size="large"
      type="text"
      label="Large TextInput"
      placeholder="notice the font size" />
  )
}

export const layoutStacked = () => {
  return (
    <TextInput
      layout="stacked"
      type="text"
      label="Default Stacked TextInput"
      placeholder="label will appear above the input field" />
  )
}

export const layoutInline = () => {
  return (
    <TextInput
      layout="inline"
      type="text"
      label="Inline TextInput"
      placeholder="label will appear to the left of the input field" />
  )
}

export const inline = () => {
  return (
    <TextInput
      layout="inline"
      icon={IconSearch}
      inline={true}
      width="20rem"
      type="text"
      label="Inline TextInput"
      placeholder="inline true must have a width" />
  )
}

export const withIcon = () => {
  return (
    <TextInput
      type="text"
      icon={IconUser}
      label="Icon TextInput"
      placeholder="an icon will appear at the far right of the input" />
  )
}

export const error = () => {
  return (
    <TextInput
      type="email"
      icon={IconEmail}
      label="Stacked TextInput with error"
      placeholder="please enter a valid email address"
      messages={[{text: 'that does not appear to be a valid email address', type: 'error'}]}
    />
  )
}

export const hint = () => {
  return (
    <TextInput
      type="search"
      icon={IconSearch}
      label="Stacked TextInput with hint"
      placeholder="this is actually a search box"
      messages={[{text: 'go ahead and search for what you need', type: 'hint'}]}
    />
  )
}

export const success = () => {
  return (
    <TextInput
      layout="inline"
      type="tel"
      label="Inline TextInput with success"
      placeholder="please enter a valid phone number"
      messages={[{text: 'that appears to be a valid phone number', type: 'success'}]}
    />
  )
}
