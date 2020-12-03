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
import { SimpleSelect } from '../../SimpleSelect'

export default {
  sectionProp: 'size',
  maxExamplesPerPage: 50,
  propValues: {
    children: [
      [
        <SimpleSelect.Option id="0" value="0" key="0">
          Option one
        </SimpleSelect.Option>,
        <SimpleSelect.Option id="1" value="1" key="1">
          Option two
        </SimpleSelect.Option>,
        <SimpleSelect.Option id="2" value="2" key="2">
          Option three
        </SimpleSelect.Option>,
        <SimpleSelect.Option id="3" value="3" key="3" isDisabled>
          Option four
        </SimpleSelect.Option>
      ],
      [
        <SimpleSelect.Option id="0" value="0" key="0">
          Item not in a group
        </SimpleSelect.Option>,
        <SimpleSelect.Group id="1" renderLabel="Group one" key="1">
          <SimpleSelect.Option id="2" value="2" key="2">
            Grouped item one
          </SimpleSelect.Option>
        </SimpleSelect.Group>,
        <SimpleSelect.Group id="3" renderLabel="Group two" key="3">
          <SimpleSelect.Option id="4" value="4" key="4">
            Grouped item two
          </SimpleSelect.Option>
        </SimpleSelect.Group>,
        <SimpleSelect.Option id="5" value="5" key="5">
          Item not in a group two
        </SimpleSelect.Option>
      ]
    ]
  },
  getComponentProps: (props) => {
    return {
      inputValue: !props.isEditable ? 'Option one' : '',
      renderLabel: 'Choose an option',
      constrain: 'scroll-parent'
    }
  },
  filter: (props) => {
    if (props.interaction === 'readonly') return true
    if (props.isRequired) return true

    return false
  }
}
