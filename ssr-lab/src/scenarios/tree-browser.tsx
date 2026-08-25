'use client'

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

import { TreeBrowser as tb, View as vw } from '@instructure/ui/latest'

const TreeBrowser = tb as any
const View = vw as any

const collections = {
  1: {
    id: 1,
    name: 'Assignments',
    collections: [2, 3],
    items: [3],
    descriptor: 'Class assignments'
  },
  2: { id: 2, name: 'Literature', collections: [4], items: [] },
  3: { id: 3, name: 'Mathematics', collections: [5], items: [1, 2] },
  4: { id: 4, name: 'Reading', collections: [], items: [4] },
  5: { id: 5, name: 'Advanced mathematics', items: [5] }
}

const items = {
  1: { id: 1, name: 'Addition worksheet' },
  2: { id: 2, name: 'Subtraction worksheet' },
  3: { id: 3, name: 'General questions' },
  4: { id: 4, name: 'Vogon poetry' },
  5: { id: 5, name: 'Bistromath', descriptor: 'Explain the drive' }
}

export default function Scenario() {
  return (
    <View as="div" maxWidth="30rem">
      {/* `animation={false}` removes the transition, so what the meter reports
          is the style change itself and not the animation. */}
      {['small', 'medium', 'large'].map((size) => (
        <View as="div" key={size} margin="0 0 large">
          <TreeBrowser
            animation={false}
            size={size}
            rootId={1}
            defaultExpanded={[1, 3]}
            collections={collections}
            items={items}
          />
        </View>
      ))}
    </View>
  )
}
