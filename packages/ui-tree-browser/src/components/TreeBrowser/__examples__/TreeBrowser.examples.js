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

import IconCollapse from '@instructure/ui-icons/lib/Solid/IconCollapse'
import IconExpand from '@instructure/ui-icons/lib/Solid/IconExpand'
import IconAnnotate from '@instructure/ui-icons/lib/Solid/IconAnnotate'

export default {
  sectionProp: 'size',
  propValues: {

    itemIcon: [undefined, IconAnnotate],

    collectionIcon: [undefined, IconCollapse],

    collectionIconExpanded: [undefined, IconExpand],
    selectionType: ['none', 'single']
  },
  getComponentProps: (props) => {
    const rootCollectionName = (props.selectionType === 'single') ? 'Grade 1 (selectable items)' : 'Grade 1'
    const COLLECTIONS_DATA = {
      1: { id: 1, name: rootCollectionName, collections: [2,3,6] },
      2: { id: 2, name: "Math Outcomes", collections: [4], items: [3,4], descriptor: "1 Group | 2 Outcomes" },
      3: { id: 3, name: "Reading Outcome", collections: [5], items: [1,2], descriptor: "1 Group | 2 Outcomes" },
      4: { id: 4, name: "Advanced Math", items: [6], descriptor: "1 Outcome" },
      5: { id: 5, name: "Advanced Reading", items: [5], descriptor: "1 Group | 2 Outcomes" },
      6: { id: 6, name: "Advanced Outcomes", items: [5,6], descriptor: "2 Outcomes" }
    }
    const ITEMS_DATA = {
      1: { id: 1, name: "Can read" },
      2: { id: 2, name: "Can write" },
      3: { id: 3, name: "Can add" },
      4: { id: 4, name: "Can subtract" },
      5: { id: 5, name: "Can read Shakespeare" },
      6: { id: 6, name: "Can do quantum physics" }
    }
    return {
      collections: COLLECTIONS_DATA,
      items: ITEMS_DATA,
      rootId: 1,
      defaultExpanded: [1]
    }
  },
  filter: (props) => {
    return (
      // prevent unecessary icon permutations

      (props.collectionIcon === undefined && props.collectionIconExpanded === IconExpand) ||

      (props.collectionIcon === IconCollapse && props.collectionIconExpanded === undefined)
    )
  }
}
