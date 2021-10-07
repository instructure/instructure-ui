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

import PropTypes from 'prop-types'

import type { PropValidators } from '@instructure/shared-types'

type EditableOwnProps = {
  mode: 'view' | 'edit'
  onChangeMode: (...args: any[]) => any
  children?: (...args: any[]) => any
  render?: (...args: any[]) => any
  value?: any
  onChange?: (...args: any[]) => any
  readOnly?: boolean
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof EditableOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type EditableProps = EditableOwnProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * If `'view'`: the view component is rendered,
   * if `'edit'`: the edit component is rendered
   */
  mode: PropTypes.oneOf(['view', 'edit']).isRequired,
  /**
   * Called when the component's mode changes
   * @param {string} new_mode
   */
  onChangeMode: PropTypes.func.isRequired,

  /**
   * @param {Object} renderProps
   * @param {Boolean} mode
   * @param {Function} renderProps.getContainerProps - Props to be spread onto the container element
   * @param {Function} renderProps.getEditorProps - Props to be spread onto the editor element
   * @param {Function} renderProps.getEditButtonProps - Props to be spread onto the edit button element
   */
  children: PropTypes.func,
  /**
   * Identical to children
   */
  render: PropTypes.func,

  /**
   * The current value.
   * The value is managed by the consuming app, but we need to tell Editable
   * it's changed or it won't re-render
   */
  value: PropTypes.any,
  /**
   * Called when Editable switches from edit to view mode and the value has changed.
   * @param {any} value
   */
  onChange: PropTypes.func,
  /**
   * The mode is fixed as 'view'
   */
  readOnly: PropTypes.bool,
  /**
   * provides a reference to the underlying html root element (container)
   */
  elementRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'mode',
  'onChangeMode',
  'children',
  'render',
  'value',
  'onChange',
  'readOnly',
  'elementRef'
]

export type { EditableProps }
export { propTypes, allowedProps }
