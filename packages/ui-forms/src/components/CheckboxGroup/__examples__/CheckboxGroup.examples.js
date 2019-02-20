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
import Checkbox from '../../Checkbox'

import generateMessages from '../../../__tests__/generateMessages'

const getChildren = (variant) => {
  return [
    <Checkbox variant={variant} key="tennis" label="Tennis" value="tennis" />,
    <Checkbox variant={variant} key="lacrosse" label="Lacrosse" value="lacrosse" />,
    <Checkbox variant={variant} key="water-polo" label="Water Polo" value="water-polo" />,
    <Checkbox variant={variant} key="golf" label="Golf" value="golf" />
  ]
}

export default {
  sectionProp: 'layout',
  maxExamplesPerPage: 50,
  propValues: {
    children: [getChildren('simple'), getChildren('toggle')],
    messages: generateMessages()
  },
  getComponentProps: (props) => {
    return {
      name: 'sports',
      description: 'Select your favorite sports'
    }
  }
}
