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
import type {
  OtherHTMLAttributes,
} from '@instructure/shared-types'

import type { OptionChild, SeparatorChild, GroupChild } from '../props'
import { Renderable } from '@instructure/shared-types'

type PageChildren = GroupChild | OptionChild | SeparatorChild

type DrilldownPageOwnProps = {
  id: string

  /**
   * Children of type:
   * `<Drilldown.Option />`, `<Drilldown.Separator />`, `<Drilldown.Group />`
   */
  children?: PageChildren | PageChildren[] // TODO: type Children.oneOf([DrilldownOption, DrilldownSeparator, DrilldownGroup ])

  /**
   * The title of the page displayed in the header
   */
  renderTitle?: Renderable

  /**
   * Label for the optional "action" option in the header (e.g.: "Select all")
   */
  renderActionLabel?: React.ReactNode | (() => React.ReactNode)

  /**
   * Label for the "back" navigation in the header.
   *
   * If a function is provided, the first parameter of the function
   * is the title of the previous page.
   */
  renderBackButtonLabel?:
    | React.ReactNode
    | ((prevPageTitle?: React.ReactNode) => React.ReactNode)

  /**
   * Callback fired when the "action" option is clicked in the header
   */
  onHeaderActionClicked?: (event: React.SyntheticEvent) => void

  /**
   * Callback fired when the "back" navigation option is clicked in the header
   */
  onBackButtonClicked?: (newPageId: string, prevPageId: string) => void

  /**
   * Hides the separator under the page header
   */
  withoutHeaderSeparator?: boolean

  /**
   * Is the page disabled
   */
  disabled?: boolean
}

type PropKeys = keyof DrilldownPageOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DrilldownPageProps = DrilldownPageOwnProps &
  OtherHTMLAttributes<DrilldownPageOwnProps>
const allowedProps: AllowedPropKeys = [
  'id',
  'children',
  'renderTitle',
  'renderActionLabel',
  'renderBackButtonLabel',
  'onHeaderActionClicked',
  'onBackButtonClicked',
  'withoutHeaderSeparator',
  'disabled'
]

export type { DrilldownPageProps, PageChildren }
export { allowedProps }
