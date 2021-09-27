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
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'

type InPlaceEditOwnProps = {
  renderViewer: (...args: any[]) => any
  renderEditor: (...args: any[]) => any
  renderEditButton: (...args: any[]) => any
  mode: 'view' | 'edit'
  onChangeMode: (...args: any[]) => any
  value?: any
  onChange?: (...args: any[]) => any
  readOnly?: boolean
  showFocusRing?: boolean
  editButtonPlacement?: 'start' | 'end'
  inline?: boolean
}

type PropKeys = keyof InPlaceEditOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type InPlaceEditProps = InPlaceEditOwnProps &
  WithStyleProps<null, InPlaceEditStyle>

type InPlaceEditStyle = ComponentStyle<'inPlaceEdit'>

const propTypes: PropValidators<PropKeys> = {
  /**
   * Function to render the view mode component.
   * It is the consumer's responsibility to provide the
   * current value or children.
   *
   * @returns {element} the viewer DOM sub-tree.
   */
  renderViewer: PropTypes.func.isRequired,
  /**
   * Function to render the edit mode component
   * It is the consumer's responsibility to provide the
   * current value, and to attach the appropriate onChange
   * event handler needed to capture the updated value. This
   * new value must then be forwarded to the view mode component.
   *
   * @returns {element} the editor DOM sub-tree.
   */
  renderEditor: PropTypes.func.isRequired,
  /**
   * Function to render the edit button.
   *
   * @param {Object} { isVisible, onClick, onFocus, onBlur, buttonRef }
   * @returns {element} the edit button DOM sub-tree
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
  renderEditButton: PropTypes.func.isRequired,
  /**
   * If `'view'`: the view component is rendered,
   * if `'edit'`: the edit component is rendered
   */
  mode: PropTypes.oneOf(['view', 'edit']).isRequired,
  /**
   * Called when the component's mode changes
   * @param {string} newMode
   */
  onChangeMode: PropTypes.func.isRequired,
  /**
   * The current value.
   * The value is managed by the consuming app, but we need to tell InPlaceEdit
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
   * Show a focus outline when the input is focused
   */
  showFocusRing: PropTypes.bool,
  /**
   * Put the edit button before or after the view
   */
  editButtonPlacement: PropTypes.oneOf(['start', 'end']),
  /**
   * Render outermost element inline v. block
   */
  inline: PropTypes.bool
}

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
export { propTypes, allowedProps }
