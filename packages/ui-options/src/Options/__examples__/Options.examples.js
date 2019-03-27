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
import { IconCheckSolid, IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { Options } from '../index'

export default {
  maxExamplesPerPage: 50,
  propValues: {
    children: [
      [
        <Options.Item key="option-1">
          Option one
        </Options.Item>,
        <Options.Item key="option-2" variant="highlighted">
          Option two
        </Options.Item>,
        <Options.Item key="option-3">
          Option three
        </Options.Item>,
        <Options.Item key="option-4">
          Option four
        </Options.Item>
      ],
      [
        <Options.Item key="option-1">
          Option one
        </Options.Item>,
        <Options.Item
          key="option-2"
          variant="highlighted"
          renderAfterLabel={IconArrowOpenEndSolid}
        >
          Flyout menu option
        </Options.Item>,
        <Options.Separator key="sep-1" />,
        <Options key="options-nest" renderLabel={'Nested List'}>
          <Options.Item renderBeforeLabel={IconCheckSolid}>
            Nested option one
          </Options.Item>
          <Options.Item renderBeforeLabel={
            <IconCheckSolid style={{opacity: 0}} />
          }>
            Nested option two
          </Options.Item>
        </Options>,
        <Options.Separator key="sep-2" />,
        <Options.Item key="option-3">
          Option two
        </Options.Item>
      ]
    ]
  }
}
