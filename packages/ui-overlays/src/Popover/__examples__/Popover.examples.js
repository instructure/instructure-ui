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

import { PopoverTrigger, PopoverContent } from '../'

export default {
  propValues: {
    withArrow: [true, false],
    placement: ['bottom center'],
    dir: [
      'rtl',
      'ltr'
    ]
  },
  getComponentProps: (props) => {
    return {
      defaultShow: true,
      placement: 'bottom center',
      children: [
        <PopoverTrigger key="trigger">
          <button>Show Popup</button>
        </PopoverTrigger>,
        <PopoverContent key="content">
          <h2>Hello World</h2>
        </PopoverContent>
      ]
    }
  },
  getExampleProps: (props) => {
    return {
      dir: props.dir,
      as: 'div',
      width: '100%',
      height: '10rem',
      margin: 'small',
      padding: 'small',
      textAlign: 'center'
    }
  }
}
