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

import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { IconTrashSolid } from '@instructure/ui-icons'

const iconButton = (props) => {
  return props.variant && (props.variant.includes('icon') || props.variant.includes('circle'))
}

export default {
  sectionProp: 'variant',
  propValues: {
    icon: [null, IconTrashSolid]
  },
  getComponentProps: (props) => {
    return {
      children: props.variant.includes('icon') || props.variant.includes('circle')
        ? <ScreenReaderContent>Hello</ScreenReaderContent>
        : 'Hello'
    }
  },
  getExampleProps: (props) => {
    return {
      background: props.variant.includes('inverse') ? 'primary-inverse' : 'primary'
    }
  },
  filter: (props) => {
    return (
      iconButton(props) && props.icon === null ||
      iconButton(props) && props.fluidWidth ||
      props.type && props.type !== 'button' || props.disabled
    )
  }
}
