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

import { ReactNode } from 'react'

export type SelectableProps = {
  /**
   * The id of the trigger element. Set automatically if not provided
   */
  id?: string | null

  /**
   * The id of the option in the list that should be considered highlighted
   */
  highlightedOptionId?: string | null

  /**
   * The id of the option(s) in the list that should be considered selected
   */
  selectedOptionId?: string | string[] | null

  /**
   * Whether or not the options should be visible
   */
  isShowingOptions?: boolean

  /**
   * Callback fired when the options want to become visible
   */
  onRequestShowOptions: (event: Event) => void

  /**
   * Callback fired when the options no longer want to be visible
   */
  onRequestHideOptions: (event: Event) => void

  /**
   * Callback fired when option is hovered or highlighted via keyboard.
   * Either the `id` or the `direction` parameter is supplied
   */
  onRequestHighlightOption: (
    event: Event,
    data: { id?: string; direction?: 1 | -1 }
  ) => void

  /**
   * Callback fired when first option should be highlighted
   */
  onRequestHighlightFirstOption: (event: Event) => void

  /**
   * Callback fired when last option should be highlighted
   */
  onRequestHighlightLastOption: (event: Event) => void

  /**
   * Callback fired when option clicked or selected via keyboard
   */
  onRequestSelectOption: (event: Event, data: { id?: string }) => void

  /**
   * A function with prop getters
   */
  render?: (propGetters: SelectableRender) => ReactNode

  /**
   * A function with prop getters
   */
  children: (propGetters: SelectableRender) => ReactNode
}

type MouseEventFunction = (event: MouseEvent) => void

export type SelectableRender = {
  /**
   * Prop getter for root element
   */
  getRootProps: (methods?: {
    onMouseDown?: MouseEventFunction
    onClick?: MouseEventFunction
    [restProps: string]: any
  }) => Record<string, any>

  /**
   * Prop getter for label element
   */
  getLabelProps: (props?: Record<string, any>) => Record<string, any>

  /**
   * Prop getter for trigger element
   */
  getTriggerProps: (methods?: {
    ref?: (...args: any) => void
    onKeyDown?: (event: KeyboardEvent) => void
    onKeyUp?: (event: KeyboardEvent) => void
    [restProps: string]: any
  }) => Record<string, any>

  /**
   * Prop getter for input element
   */
  getInputProps: (methods?: {
    readOnly?: boolean
    [restProps: string]: any
  }) => Record<string, any>

  /**
   * Prop getter for list element
   */
  getListProps: (methods?: {
    onMouseDown?: MouseEventFunction
    onClick?: MouseEventFunction
    [restProps: string]: any
  }) => Record<string, any>

  /**
   * Prop getter for option elements
   */
  getOptionProps: (methods?: {
    id?: string // TODO this is not optional
    onMouseOver?: MouseEventFunction
    onClick?: MouseEventFunction
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
