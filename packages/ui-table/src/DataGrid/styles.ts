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

import type { StyleObject } from '@instructure/emotion'
import type { DataGridStyle } from './props.js'

// this will be a style variable later
// the layout switches to stacked rows at and below this viewport width
const stackedLayoutQuery = '@media (max-width: 48rem)'

/**
 * ---
 * private: true
 * ---
 * Generates the style object of the component.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (stackedLayout: boolean): DataGridStyle => {
  // the media query is only added when the stacked layout is on
  const whenStacked = (styles: StyleObject): StyleObject =>
    stackedLayout ? { [stackedLayoutQuery]: styles } : {}

  return {
    expandableCell: {
      label: 'dataGrid__expandableCell',
      display: 'flex',
      alignItems: 'center'
    },
    sortButton: {
      label: 'dataGrid__sortButton',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: 0,
      border: 0,
      background: 'none',
      font: 'inherit',
      color: 'inherit',
      cursor: 'pointer'
    },
    sortControls: {
      label: 'dataGrid__sortControls',
      display: 'none',
      alignItems: 'flex-end',
      gap: '0.5rem',
      marginBlockEnd: '0.75rem',
      ...whenStacked({ display: 'flex' })
    },
    sortColumnSelect: {
      label: 'dataGrid__sortColumnSelect',
      flex: 1
    },
    table: {
      label: 'dataGrid__table',
      ...whenStacked({
        '&, & tbody, & tr, & td': { display: 'block' },
        // the column header is repeated in each cell, see stackedLabel
        '& thead': { display: 'none' },
        '& tr': { marginBlockEnd: '0.75rem' }
      })
    },
    stackedLabel: {
      label: 'dataGrid__stackedLabel',
      display: 'none',
      [stackedLayoutQuery]: { display: 'inline' }
    }
  }
}

export default generateStyle
