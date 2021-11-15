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
import { InlineList } from '../index'
import { InlineListProps } from '../props'

export default {
  sectionProp: 'size',
  getComponentProps: () => {
    return {
      children: [
        <InlineList.Item key="1">Oranges</InlineList.Item>,
        <InlineList.Item key="2">Pineapples</InlineList.Item>,
        <InlineList.Item key="3">Bananas</InlineList.Item>
      ]
    }
  },
  filter: (props: InlineListProps) => {
    return (
      // itemSpacing has no affect on the list if the delimiter prop is set
      // to anything other than 'none' so filter the others
      props.delimiter !== 'none' && props.itemSpacing !== 'none'
    )
  }
}
