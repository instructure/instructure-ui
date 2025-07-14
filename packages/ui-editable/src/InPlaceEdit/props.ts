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



import type { PropValidators } from '@instructure/shared-types'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { EditableProps } from '../Editable/props'
import React from 'react'
type ExtendedRenderEditButton = {
  elementRef?: (el: HTMLButtonElement) => void
  onClick: () => void
  onFocus: () => void
  onBlur: () => void
  isVisible: boolean
  readOnly?: boolean
}

type InPlaceEditOwnProps = {
  /**
   * Function to render the view mode component.
   * It is the consumer's responsibility to provide the
   * current value or children.
   *
   * Return value:
   * - element: the viewer DOM sub-tree.
   */
  renderViewer: () => React.ReactNode
  /**
   * Function to render the edit mode component
   * It is the consumer's responsibility to provide the
   * current value, and to attach the appropriate onChange
   * event handler needed to capture the updated value. This
   * new value must then be forwarded to the view mode component.
   *
   * Return value:
   * - element: the editor DOM sub-tree.
   */
  renderEditor: (data: {
    onBlur: () => void
    editorRef: (el: HTMLElement | null) => void
  }) => React.ReactNode
  /**
   * Function to render the edit button.
   *
   * Parameters:
   * - object: { isVisible, onClick, onFocus, onBlur, buttonRef }
   *
   * Return value:
   *
   * - element:  the edit button DOM sub-tree
   *
   * If you choose to use the default edit button, add `label` to the
   * incoming `props` parameter and call `InPlaceEdit.renderDefaultEditButton(props)`
   *
   * If you choose to render a custom button, attach the on* event handlers
   * and set `buttonRef` as a `ref` type property on the `button` element.
   *
   * `isVisible` is a hint as to whether the button is _typically_ shown,
   * but you're free to ignore it for your use-case.
   */
  renderEditButton: (props: ExtendedRenderEditButton) => React.ReactNode | null
  /**
   * If `'view'`: the view component is rendered,
   * if `'edit'`: the edit component is rendered
   */
  mode: 'view' | 'edit'
  /**
   * Called when the component's mode changes
   * Parameter:
   * - newMode: string
   */
  onChangeMode: EditableProps['onChangeMode']
  /**
   * The current value.
   * The value is managed by the consuming app, but we need to tell InPlaceEdit
   * it's changed or it won't re-render
   */
  value?: any
  /**
   * Called when Editable switches from edit to view mode and the value has changed.
   * Parameter:
   * - value: any
   */
  onChange?: EditableProps['onChange']
  /**
   * The mode is fixed as 'view'
   */
  readOnly?: boolean
  /**
   * Show a focus outline when the input is focused
   */
  showFocusRing?: boolean
  /**
   * Put the edit button before or after the view
   */
  editButtonPlacement?: 'start' | 'end'
  /**
   * Render outermost element inline v. block
   */
  inline?: boolean
}

type PropKeys = keyof InPlaceEditOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type InPlaceEditProps = InPlaceEditOwnProps &
  WithStyleProps<null, InPlaceEditStyle>

type InPlaceEditStyle = ComponentStyle<'inPlaceEdit'>
const allowedProps: AllowedPropKeys = [
  'renderViewer',
  'renderEditor',
  'renderEditButton',
  'mode',
  'onChangeMode',
  'value',
  'onChange',
  'readOnly',
  'showFocusRing',
  'editButtonPlacement',
  'inline'
]

export type { InPlaceEditProps, InPlaceEditStyle }
export { allowedProps }
