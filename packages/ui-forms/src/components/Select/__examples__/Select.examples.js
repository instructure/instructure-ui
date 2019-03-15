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

import IconHeart from '@instructure/ui-icons/lib/Line/IconHeart'
import IconApple from '@instructure/ui-icons/lib/Line/IconApple'
import IconBank from '@instructure/ui-icons/lib/Line/IconBank'

import generateMessages from '../../../__tests__/generateMessages'

const getOptions = (withIcon = false) => {
  return [
    <option key="foo" value="foo" icon={withIcon && IconHeart}>Foo</option>,
    <option key="bar" value="bar" icon={withIcon && IconApple}>Bar</option>,
    <option key="baz" value="baz" icon={withIcon && IconBank}>Baz</option>,
  ]
}

export default {
  sectionProp: 'size',
  maxExamplesPerPage: 50,
  propValues: {
    children: [
      getOptions(),
      getOptions(true),
      [
        <optgroup key="one" label="Group One">
          <option value="item1">Item One</option>
          <option value="item2">Item Two</option>
        </optgroup>,
        <optgroup key="two" label="Group Two">
          <option value="item3">Item Three</option>
        </optgroup>,
        <optgroup key="three" label="Group Three" icon={IconHeart}>
          <option value="item4">Item Four</option>
          <option value="item5">Item Five</option>
        </optgroup>,
      ]
    ],
    messages: generateMessages()
  },
  getComponentProps: (props) => {
    return {
      layout: 'stacked',
      label: 'Hello from select!',
      assistiveText: '3 options available. Use arrow keys to navigate options.',
      readOnly: false,
      closeOnSelect: false,
      allowEmpty: false,
      allowCustom: false
    }
  },
  filter: (props) => {
    return props.editable || (props.allowCustom && props.multiple) || props.vAlign
  }
}
