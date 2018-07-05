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
import TextArea from '../index'

export const fitContent = () => {
  return (
    <TextArea
      label="I expand to fit my content"
      placeholder="Go ahead and enter a bunch of text to watch me expand"
    />
  )
}

export const setWidth = () => {
  return (
    <TextArea
      layout="stacked"
      label="I am stacked with a set width"
      placeholder="Enter text to watch that my width will stay 20 rem (320px) and the height will grow as needed"
      width="20rem"
    />
  )
}

export const initialHeight = () => {
  return (
    <TextArea
      layout="inline"
      label="I am set to the Inline Layout"
      placeholder="I have a set height to start with but once text is entered I will expand to fit content"
      height="10rem"
    />
  )
}

export const maxHeight = () => {
  return (
    <TextArea
      label="I can't go any higher than 10rem (160px)"
      placeholder="Go ahead and enter a bunch of text and watch the scroll action kick in when I reach my max height"
      maxHeight="10rem"
    />
  )
}

export const autoGrowFalse = () => {
  return (
    <TextArea
      autoGrow={false}
      label="TextArea with autoGrow set to false"
      placeholder="Go ahead and enter a bunch of text and watch what happens"
    />
  )
}

export const small = () => {
  return (
    <TextArea
      size="small"
      label="I am a small TextArea"
      placeholder="Enter text within this small text area"
    />
  )
}

export const medium = () => {
  return (
    <TextArea
      size="medium"
      label="I am a medium TextArea"
      placeholder="Enter text within this medium text area"
    />
  )
}

export const large = () => {
  return (
    <TextArea
      size="large"
      label="I am a large TextArea"
      placeholder="Enter text within this large text area"
    />
  )
}

export const layoutStacked = () => {
  return (
    <TextArea
      layout="stacked"
      label="I am set to the default Stacked Layout"
      placeholder="I will display stacked with the label above the text area"
    />
  )
}

export const layoutInline = () => {
  return (
    <TextArea
      layout="inline"
      label="I am set to the Inline Layout"
      placeholder="I will display inline with the label to the left of the text area"
    />
  )
}

export const resizeNone = () => {
  return (
    <TextArea
      resize="none"
      layout="stacked"
      label="Resize none (default setting)"
      placeholder="I will still expand to fit content entered but I do not allow the user to drag resize vertical or horizontal"
    />
  )
}

export const resizeBoth = () => {
  return (
    <TextArea
      resize="both"
      layout="inline"
      label="Resize both directions (if broswer supported)"
      placeholder="I will still expand to fit content entered but I will also allow the user to drag resize vertical or horizontal"
    />
  )
}

export const resizeHorizontal = () => {
  return (
    <TextArea
      resize="horizontal"
      layout="stacked"
      label="Resize horizontal only (if browser supported)"
      placeholder="I will still expand to fit content entered but I do not allow the user to drag resize vertically"
    />
  )
}

export const resizeVertical = () => {
  return (
    <TextArea
      resize="vertical"
      layout="inline"
      label="Resize vertical only (if browser supported)"
      placeholder="I will still expand to fit content entered but I do not allow the user to drag resize horizontally"
    />
  )
}

export const error = () => {
  return (
    <TextArea
      required
      label="I am required"
      placeholder="I throw an error when you try to leave me blank"
      messages={[{text: 'You need to enter something, I cannot be left blank', type: 'error'}]}
    />
  )
}

export const hint = () => {
  return (
    <TextArea
      label="I am a hint message"
      placeholder="Go ahead and enter some text"
      messages={[{text: 'This is a great place to jot down your thoughts on the matter', type: 'hint'}]}
    />
  )
}

export const success = () => {
  return (
    <TextArea
      label="I am a success message"
      placeholder="Go ahead and enter some text"
      messages={[{text: 'You are fantastic at this', type: 'success'}]}
    />
  )
}

export const disabled = () => {
  return (
    <TextArea
      disabled
      label="I am disabled"
      placeholder="Go ahead and try to enter text"
    />
  )
}
