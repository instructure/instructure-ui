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

import { Children, controllable } from '@instructure/ui-prop-types'

import { Page } from './Page'

import type {
  Spacing,
  WithStyleProps,
  ComponentStyle
} from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type { PropValidators, PagesTheme } from '@instructure/shared-types'
import type { PagesContextType } from './PagesContext'

type PagesOwnProps = {
  /**
   * Children are type of `<Pages.Page>`
   */
  children?: React.ReactNode // TODO: oneOf([Page])

  defaultPageIndex?: number

  /**
   * The currently active page index
   */
  activePageIndex?: number // TODO: controllable( PropTypes.number, 'onPageIndexChange', 'defaultPageIndex' )

  /**
   * Event handler fired anytime page index has changed due to back button being clicked
   */
  onPageIndexChange?: (newPageIndex: number, oldPageIndex?: number) => void

  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
}

type PropKeys = keyof PagesOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type PagesProps = PagesOwnProps &
  WithStyleProps<PagesTheme, PagesStyle> &
  WithDeterministicIdProps

type PagesStyle = ComponentStyle<'pages'>

type PagesState = {
  history: PagesContextType['history']
}

const propTypes: PropValidators<PropKeys> = {
  children: Children.oneOf([Page]),
  defaultPageIndex: PropTypes.number,
  activePageIndex: controllable(
    PropTypes.number,
    'onPageIndexChange',
    'defaultPageIndex'
  ),
  onPageIndexChange: PropTypes.func,
  margin: PropTypes.string
}

const allowedProps: AllowedPropKeys = [
  'children',
  'defaultPageIndex',
  'activePageIndex',
  'onPageIndexChange',
  'margin'
]

export type { PagesProps, PagesState, PagesStyle }
export { propTypes, allowedProps }
