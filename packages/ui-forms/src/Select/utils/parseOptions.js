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

import React, { Children } from 'react'
import { error } from '@instructure/console/macro'

/**
---
parent: Select
id: parseOptions
---
*/
export default function parseOptions (children) {
  const options = Children.map(children, (child) => {
    const { label, value, children } = child.props
    if (child.type === 'optgroup') {
      const group = []
      const groupValue = value || label
      group.push(
        <option
          {...child.props}
          value={groupValue}
          group={groupValue}
          groupLabel
          disabled
        >
          {label}
        </option>
      )
      Children.forEach(children, (option, index) => {
        group.push(
          <option
            {...option.props}
            group={groupValue}
            groupItem
          >
            {option.props.children}
          </option>
        )
      })
      return group
    } else {
      return child
    }
  })

  return Children.map(options, (option) => {
    const { label, id, value, children, disabled, icon, group, groupLabel, groupItem } = option.props

    error(typeof value === 'string', `[Select] The 'value' prop on <option> must be a string.`)

    return {
      id: id || value,
      label: label || children,
      children: children || label,
      disabled: disabled || false,
      value,
      icon: icon || null,
      // the value or label of the group this option belongs to
      group: group || null,
      // whether or not this option is just a label for a group
      groupLabel: groupLabel || false,
      // whether or not this option is an item in a group
      groupItem: groupItem || false
    }
  }) || []
}
