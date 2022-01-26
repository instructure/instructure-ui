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

import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'

import type { PropValidators } from '@instructure/shared-types'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'

type SelectableOwnProps = {
  /**
   * The id of the trigger element. Set automatically if not provided
   */
  id?: string

  /**
   * The id of the option in the list that should be considered highlighted
   */
  highlightedOptionId?: string

  /**
   * The id of the option(s) in the list that should be considered selected
   */
  selectedOptionId?: string | string[]

  /**
   * Whether or not the options should be visible
   */
  isShowingOptions?: boolean

  /**
   * Callback fired when the options want to become visible
   */
  onRequestShowOptions?: (event: React.SyntheticEvent) => void

  /**
   * Callback fired when the options no longer want to be visible
   */
  onRequestHideOptions?: (event: React.SyntheticEvent) => void

  /**
   * Callback fired when option is hovered or highlighted via keyboard.
   * Either the `id` or the `direction` parameter is supplied
   */
  onRequestHighlightOption?: (
    event: React.SyntheticEvent,
    data: { id?: string; direction?: 1 | -1 }
  ) => void

  /**
   * Callback fired when first option should be highlighted
   */
  onRequestHighlightFirstOption?: (event: React.SyntheticEvent) => void

  /**
   * Callback fired when last option should be highlighted
   */
  onRequestHighlightLastOption?: (event: React.SyntheticEvent) => void

  /**
   * Callback fired when option clicked or selected via keyboard
   */
  onRequestSelectOption?: (
    event: React.SyntheticEvent,
    data: { id?: string }
  ) => void

  /**
   * A function with prop getters
   */
  render?: (propGetters: SelectableRender) => ReactNode

  /**
   * A function with prop getters
   */
  children?: (propGetters: SelectableRender) => ReactNode
}

type SelectableRender = {
  /**
   * Prop getter for root element
   */
  getRootProps: (props?: {
    onMouseDown?: React.MouseEventHandler
    onClick?: React.MouseEventHandler
    [restProps: string]: any
  }) => Record<string, any>

  /**
   * Prop getter for label element
   */
  getLabelProps: (props?: Record<string, any>) => Record<string, any>

  /**
   * Prop getter for trigger element
   */
  getTriggerProps: (props?: {
    ref?: (element: Element | null) => void
    onKeyDown?: (event: React.KeyboardEvent) => void
    onKeyUp?: (event: React.KeyboardEvent) => void
    [restProps: string]: any
  }) => Record<string, any>

  /**
   * Prop getter for input element
   */
  getInputProps: (props?: {
    readOnly?: boolean
    [restProps: string]: any
  }) => Record<string, any>

  /**
   * Prop getter for list element
   */
  getListProps: (props?: {
    onMouseDown?: React.MouseEventHandler
    onClick?: React.MouseEventHandler
    [restProps: string]: any
  }) => Record<string, any>

  /**
   * Prop getter for option elements
   */
  getOptionProps: (props?: {
    id?: string // TODO this is not optional
    onMouseOver?: React.MouseEventHandler
    onClick?: React.MouseEventHandler
    [restProps: string]: any
  }) => Record<string, any>

  /**
   * Prop getter for disabled option elements
   */
  getDisabledOptionProps: (props?: Record<string, any>) => Record<string, any>

  /**
   * Prop getter for screenreader description element
   */
  getDescriptionProps: (props?: Record<string, any>) => Record<string, any>
}

type PropKeys = keyof SelectableOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SelectableProps = SelectableOwnProps & WithDeterministicIdProps

const propTypes: PropValidators<PropKeys> = {
  id: PropTypes.string,
  highlightedOptionId: PropTypes.string,
  selectedOptionId: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isShowingOptions: PropTypes.bool,
  onRequestShowOptions: PropTypes.func,
  onRequestHideOptions: PropTypes.func,
  onRequestHighlightOption: PropTypes.func,
  onRequestHighlightFirstOption: PropTypes.func,
  onRequestHighlightLastOption: PropTypes.func,
  onRequestSelectOption: PropTypes.func,
  children: PropTypes.func,
  render: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'id',
  'highlightedOptionId',
  'selectedOptionId',
  'isShowingOptions',
  'onRequestShowOptions',
  'onRequestHideOptions',
  'onRequestHighlightOption',
  'onRequestHighlightFirstOption',
  'onRequestHighlightLastOption',
  'onRequestSelectOption',
  'children',
  'render'
]

export type { SelectableProps, SelectableRender }
export { propTypes, allowedProps }
