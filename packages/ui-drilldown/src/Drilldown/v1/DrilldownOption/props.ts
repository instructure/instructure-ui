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
  OptionsItemTheme,
  AsElementType
} from '@instructure/shared-types'
import type { WithStyleProps } from '@instructure/emotion'
import type {
  OptionsItemRenderProps,
  OptionsItemProps
} from '@instructure/ui-options'

import Drilldown from '../index'
import { Renderable } from '@instructure/shared-types'

type DrilldownOptionValue = string | number | undefined

type RenderContentVAlign = 'start' | 'center' | 'end'

type ShouldCloseOnClick = 'auto' | 'always' | 'never'

type DrilldownOptionVariant = Exclude<OptionsItemProps['variant'], 'selected'>

type RenderContentProps = {
  as: DrilldownOptionOwnProps['as']
  role: DrilldownOptionOwnProps['role']
  variant: DrilldownOptionVariant
  vAlign?: RenderContentVAlign
  isSelected: boolean
}

type DrilldownOptionOwnProps = {
  id: string

  /**
   * Label of the Drilldown option.
   */
  children?:
    | React.ReactNode
    | ((props: {
        id: string
        variant: DrilldownOptionVariant
        isSelected: boolean
      }) => React.ReactNode)

  /**
   * The id of the sub-page the option navigates to.
   */
  subPageId?: string

  /**
   * Is the option disabled.
   */
  disabled?: boolean

  /**
   * Whether the option is selected or not. (Setting this property assumes controlled behaviour)
   */
  selected?: boolean

  /**
   * The value of the option. Should be set for options in selectable groups.
   */
  value?: DrilldownOptionValue

  /**
   * Providing href will render the option as `<a>`. Doesn't work, if subPageId is provided or is in a selectable group.
   */
  href?: string

  /**
   * Element type to render as. Will be set to `<a>` if href is provided. If the parent is "ul" or "ol", the option is forced to be "li" element. *Important*: `Drilldown` is rendered as `ul` by default so you *have to* change that as well if you want to use this prop.
   */
  as?: AsElementType

  /**
   * The ARIA role of the element
   */
  role?: string

  /**
   * Info content to render after the label.
   *
   * If a function is provided, it has a `props` parameter.
   */
  renderLabelInfo?: Renderable<RenderContentProps>

  /**
   * Content to render before the label.
   *
   * If a function is provided, it has a `props` parameter.
   */
  renderBeforeLabel?: Renderable<OptionsItemRenderProps>

  /**
   * Content to render after the label.
   *
   * If a function is provided, it has a `props` parameter.
   */
  renderAfterLabel?: Renderable<OptionsItemRenderProps>

  /**
   * Sets the vAlign of renderBeforeLabel content
   */
  beforeLabelContentVAlign?: RenderContentVAlign

  /**
   * Sets the vAlign of renderAfterLabel content and renderLabelInfo
   */
  afterLabelContentVAlign?: RenderContentVAlign

  /**
   * Additional "secondary" description text
   */
  description?: React.ReactNode | (() => React.ReactNode)

  /**
   * The ARIA role of the description element
   */
  descriptionRole?: string

  /**
   * Callback fired when the option is clicked.
   */
  onOptionClick?: (
    event: React.SyntheticEvent,
    args: {
      optionId: string
      drilldown: Drilldown
      pageHistory: string[]
      goToPage: (
        pageId: string
      ) => { prevPageId: string; newPageId: string } | undefined
      goToPreviousPage: () =>
        | { prevPageId: string; newPageId: string }
        | undefined
    }
  ) => void

  /**
   * Whether the option is selected by default.
   */
  defaultSelected?: boolean

  /**
   * Provides a reference to the underlying html root element
   */
  elementRef?: (element: Element | null) => void

  /**
   * Should close the container menu component, if clicked on the option marked with this prop
   */
  shouldCloseOnClick?: ShouldCloseOnClick
}

type PropKeys = keyof DrilldownOptionOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DrilldownOptionProps = DrilldownOptionOwnProps &
  WithStyleProps<OptionsItemTheme, null> &
  OtherHTMLAttributes<DrilldownOptionOwnProps>
const allowedProps: AllowedPropKeys = [
  'id',
  'children',
  'subPageId',
  'disabled',
  'selected',
  'value',
  'href',
  'as',
  'role',
  'renderLabelInfo',
  'renderBeforeLabel',
  'renderAfterLabel',
  'beforeLabelContentVAlign',
  'afterLabelContentVAlign',
  'description',
  'descriptionRole',
  'onOptionClick',
  'defaultSelected',
  'elementRef',
  'shouldCloseOnClick'
]

export type { DrilldownOptionProps, DrilldownOptionValue }
export { allowedProps }
