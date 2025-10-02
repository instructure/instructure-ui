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
  OptionsTheme,
  AsElementType
} from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'

import Drilldown from '../index'
import type { DrilldownOptionValue } from '../DrilldownOption/props'
import type { OptionChild, SeparatorChild } from '../props'

type GroupChildren = OptionChild | SeparatorChild

type DrilldownGroupOwnProps = {
  id: string

  /**
   * Children of type:
   * `<Drilldown.Option />`, `<Drilldown.Separator />`
   */
  children?: GroupChildren | GroupChildren[] // TODO: type Children.oneOf([DrilldownOption, DrilldownSeparator])

  /**
   * The label of the option group.
   */
  renderGroupTitle?: React.ReactNode | (() => React.ReactNode)

  /**
   * Hides the separators around the group.
   */
  withoutSeparators?: boolean

  /**
   * Is the option group disabled.
   */
  disabled?: boolean

  /**
   * The ARIA role of the element.
   */
  role?: string

  /**
   * Element type to render as. By default, it inherits Drilldown's `as` prop.
   */
  as?: AsElementType

  /**
   * Provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void

  // selection props
  /**
   * Makes the option group selectable (with "check" icon indicators).
   * Can be set to a single-select (radio) or a multi-select (checkbox) group.
   */
  selectableType?: 'single' | 'multiple'

  /**
   * An array of the values for the selected items on initial render. Works only with "selectableType" set. If "selectableType" is "single", the array has to have 1 item.
   */
  defaultSelected?: DrilldownOptionValue[]

  /**
   * An array of the values for the selected items. If defined, the component will act controlled and will not manage its own state. Works only with "selectableType" set.
   * If "selectableType" is "single", the array has to have 1 item.
   */
  selectedOptions?: DrilldownOptionValue[]

  /**
   * Callback fired when an option within the `<Drilldown.Group />` is selected
   */
  onSelect?: (
    event: React.SyntheticEvent,
    args: {
      value: DrilldownOptionValue[]
      isSelected: boolean
      selectedOption: OptionChild
      drilldown: Drilldown
    }
  ) => void
}

type PropKeys = keyof DrilldownGroupOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DrilldownGroupProps = DrilldownGroupOwnProps &
  WithStyleProps<OptionsTheme, null> &
  OtherHTMLAttributes<DrilldownGroupOwnProps>
const allowedProps: AllowedPropKeys = [
  'id',
  'children',
  'renderGroupTitle',
  'withoutSeparators',
  'disabled',
  'role',
  'as',
  'elementRef',
  'selectableType',
  'defaultSelected',
  'selectedOptions',
  'onSelect'
]

export type { DrilldownGroupProps, GroupChildren }
export { allowedProps }
