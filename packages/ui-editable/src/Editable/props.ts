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

import type { PropValidators } from '@instructure/shared-types'

type GetContainerProps = (props?: Record<string, any>) => {
  ref: React.RefCallback<any>
  onMouseOver: (event: React.MouseEvent) => void
  onMouseOut: (event: React.MouseEvent) => void
  onMouseDown?: (event: React.MouseEvent) => void
  onKeyUp?: (event: React.KeyboardEvent) => void
  readOnly?: boolean
} & Record<string, any>

type GetViewerProps = (props?: Record<string, any>) => {
  mode: 'view' | 'edit'
  readOnly?: boolean
} & Record<string, any>

type GetEditorProps = (props?: Record<string, any>) => {
  mode: 'view' | 'edit'
  onBlur: () => void
  editorRef: (el: HTMLElement | null) => void
  readOnly?: boolean
} & Record<string, any>

type GetEditButtonProps = (props?: Record<string, any>) => {
  onClick: () => void
  onFocus: () => void
  onBlur: () => void
  isVisible: boolean
  buttonRef: (el: Element) => void
  readOnly?: boolean
} & Record<string, any>

type EditableRenderProps = {
  mode: string
  getContainerProps: GetContainerProps
  getViewerProps: GetViewerProps
  getEditorProps: GetEditorProps
  getEditButtonProps: GetEditButtonProps
}

type EditableOwnProps = {
  /**
   * If `'view'`: the view component is rendered,
   * if `'edit'`: the edit component is rendered
   */
  mode: 'view' | 'edit'
  /**
   * Called when the component's mode changes.
   */
  onChangeMode: (newMode: string) => void
  /**
   * Function that you can supply that will return the children of this component.
   * It has one parameter has the following fields:
   * - mode: `view` or `edit`, depending on whether the view or the editor should be rendered.
   * - getContainerProps(props) - Props to be spread onto the container element
   * - getEditorProps(props) - Props to be spread onto the editor element
   * - getEditButtonProps(props) - Props to be spread onto the edit button element
   */
  children?: (props: EditableRenderProps) => React.ReactNode
  /**
   * Identical to children
   */
  render?: (props: EditableRenderProps) => React.ReactNode
  /**
   * The current value.
   * The value is managed by the consuming app, but we need to tell Editable
   * it's changed or it won't re-render
   */
  value?: any
  /**
   * Called when Editable switches from edit to view mode and the value has changed.
   */
  onChange?: (value: any) => void
  /**
   * The mode is fixed as 'view'
   */
  readOnly?: boolean
  /**
   * provides a reference to the underlying html root element (container)
   */
  elementRef?: (element: Element | null) => void
}

type PropKeys = keyof EditableOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type EditableProps = EditableOwnProps

const propTypes: PropValidators<PropKeys> = {
  mode: PropTypes.oneOf(['view', 'edit']).isRequired,
  onChangeMode: PropTypes.func.isRequired,
  children: PropTypes.func,
  render: PropTypes.func,
  value: PropTypes.any,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
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

type EditableState = {
  showModeToggle: boolean
  valueOnEdit: any
}
export type {
  EditableProps,
  EditableRenderProps,
  EditableState,
  GetContainerProps,
  GetEditButtonProps,
  GetEditorProps,
  GetViewerProps
}
export { propTypes, allowedProps }
