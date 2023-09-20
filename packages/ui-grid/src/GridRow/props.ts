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
import PropTypes from 'prop-types'

import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { GridCol } from '../GridCol'

import type {
  PropValidators,
  GridTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { GridBreakpoints } from '../GridTypes'

type GridRowOwnProps = {
  /**
   * One of: `Grid.Col`, `ScreenReaderContent`
   */
  children?: React.ReactNode // TODO: oneOf([GridCol, ScreenReaderContent])
  rowSpacing?: 'none' | 'small' | 'medium' | 'large'
  colSpacing?: 'none' | 'small' | 'medium' | 'large'
  hAlign?: 'start' | 'center' | 'end' | 'space-around' | 'space-between'
  vAlign?: 'top' | 'middle' | 'bottom' | 'stretch'
  startAt?: GridBreakpoints
  visualDebug?: boolean
  isLastRow?: boolean
}

type PropKeys = keyof GridRowOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type GridRowProps = GridRowOwnProps &
  WithStyleProps<GridTheme, GridRowStyle> &
  OtherHTMLAttributes<GridRowOwnProps>

type GridRowStyle = ComponentStyle<'gridRow'>

const propTypes: PropValidators<PropKeys> = {
  children: ChildrenPropTypes.oneOf([GridCol, ScreenReaderContent]),
  rowSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  colSpacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  hAlign: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'space-around',
    'space-between'
  ]),
  vAlign: PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),
  startAt: PropTypes.oneOf(['small', 'medium', 'large', 'x-large', null]),
  visualDebug: PropTypes.bool,
  isLastRow: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'children',
  'rowSpacing',
  'colSpacing',
  'hAlign',
  'vAlign',
  'startAt',
  'visualDebug',
  'isLastRow'
]

export type { GridRowProps, GridRowStyle }
export { propTypes, allowedProps }
