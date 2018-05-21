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
import Alert from '../index'

export const variantInfo = () => {
  return (
    <Alert
      variant="info"
      closeButtonLabel="Close"
      margin="small"
      transition="none"
    >
      Sample info alert text. I will close w/o a transition out if you close me
    </Alert>
  )
}

export const variantSuccess = () => {
  return (
    <Alert
      variant="success"
      closeButtonLabel="Close"
      margin="small"
      transition="none"
    >
      Sample success alert text. I will close w/o a transition out if you close me
    </Alert>
  )
}

export const variantError = () => {
  return(
    <Alert
      variant="error"
      closeButtonLabel="Close"
      margin="small"
    >
      Sample error text that continues for a while
      to demonstrate what happens when the content stretches over
      several lines. It really does take a lot of prose to get the
      text to wrap when you are on a high resolution screen.
    </Alert>
  )
}

export const variantWarning = () => {
  return(
    <Alert
      variant="warning"
      margin="small"
    >
      Sample warning text. This alert is not dismissible and cannot be closed.
    </Alert>
  )
}
