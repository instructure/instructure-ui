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
import { TreeBrowser } from '@instructure/ui'
import React from 'react'

const TREEBROWSER_IUI = () => {
  return (
    <TreeBrowser
      collections={{
        1: {
          id: 1,
          name: 'Assignments',
          collections: [2, 3],
          items: [3, 5],
          descriptor: 'Class Assignments'
        },
        2: { id: 2, name: 'English Assignments', collections: [4], items: [] },
        3: { id: 3, name: 'Math Assignments', collections: [5], items: [1, 2] },
        4: { id: 4, name: 'Reading Assignments', collections: [], items: [4] },
        5: { id: 5, name: 'Advanced Math Assignments', items: [5] }
      }}
      items={{
        1: { id: 1, name: 'Addition Worksheet' },
        2: { id: 2, name: 'Subtraction Worksheet' },
        3: { id: 3, name: 'General Questions' },
        4: { id: 4, name: 'Vogon Poetry' },
        5: {
          id: 5,
          name: 'Bistromath',
          descriptor: 'Explain the Bistromathic Drive'
        }
      }}
      defaultExpanded={[1, 3]}
      rootId={1}
    />
  )
}

export default TREEBROWSER_IUI
