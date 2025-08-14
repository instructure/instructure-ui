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

'use client'
import React, { useState } from 'react'
import { TreeBrowser as tb } from 'instructure-ui/ui-tree-browser/es/index'
import {
  RadioInput as ri,
  RadioInputGroup as rig
} from 'instructure-ui/ui-radio-input/es/index'
import { View as vw } from 'instructure-ui/ui-view/es/index'
import { ScreenReaderContent as src } from 'instructure-ui/ui-a11y-content/es/index'
import {
  IconGradebookLine as igl,
  IconXSolid as ixs,
  IconUserSolid as ius,
  IconModuleLine as iml,
  IconVideoLine as ivl
} from 'instructure-ui/ui-icons/es/index'

const TreeBrowser = tb as any
const RadioInput = ri as any
const RadioInputGroup = rig as any
const View = vw as any
const ScreenReaderContent = src as any
const IconGradebookLine = igl as any
const IconXSolid = ixs as any
const IconUserSolid = ius as any
const IconModuleLine = iml as any
const IconVideoLine = ivl as any

export default function TreeBrowserPage() {
  const [size, setSize] = useState('medium')
  const sizes = ['small', 'medium', 'large']

  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      <section>
        <TreeBrowser
          size="large"
          collections={{
            1: {
              id: 1,
              name: 'Assignments',
              collections: [2, 3],
              items: [3],
              descriptor: 'Class Assignments'
            },
            2: {
              id: 2,
              name: 'English Assignments',
              collections: [4],
              items: []
            },
            3: {
              id: 3,
              name: 'Math Assignments',
              collections: [5],
              items: [1, 2]
            },
            4: {
              id: 4,
              name: 'Reading Assignments',
              collections: [],
              items: [4]
            },
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
      </section>

      {/* Customizing icons example */}
      <section>
        <TreeBrowser
          collections={{
            1: { id: 1, name: 'Grades', collections: [], items: [1, 2, 3] }
          }}
          items={{
            1: { id: 1, name: 'Sarah' },
            2: { id: 2, name: 'Jenny' },
            3: { id: 3, name: 'Juan' }
          }}
          defaultExpanded={[1]}
          collectionIcon={IconGradebookLine}
          collectionIconExpanded={IconXSolid}
          itemIcon={IconUserSolid}
          rootId={1}
          size="medium"
        />
      </section>

      {/* Different icons per item via getItemProps */}
      <section>
        <TreeBrowser
          collections={{
            1: { id: 1, name: 'Saved', collections: [], items: [1, 2, 3] }
          }}
          items={{
            1: { id: 1, name: 'Modules' },
            2: { id: 2, name: 'Videos' },
            3: { id: 3, name: 'Students' }
          }}
          defaultExpanded={[1]}
          itemIcon={IconUserSolid}
          rootId={1}
          size="large"
          getItemProps={({ name, ...props }: any) => {
            let itemIcon = IconUserSolid
            if (name === 'Modules') itemIcon = IconModuleLine
            if (name === 'Videos') itemIcon = IconVideoLine
            return { ...props, itemIcon, name }
          }}
        />
      </section>
    </main>
  )
}
