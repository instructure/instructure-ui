/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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
import React, { Component } from 'react'

import { deepEqual } from '@instructure/ui-utils'
import { logWarn as warn } from '@instructure/console'
import { requestAnimationFrame } from '@instructure/ui-dom-utils'

import { propTypes, allowedProps, EditableState } from './props'
import type {
  EditableProps,
  GetContainerProps,
  GetEditButtonProps,
  GetEditorProps,
  GetViewerProps
} from './props'

/**
---
category: components
---
@tsProps
**/
class Editable extends Component<EditableProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    readOnly: false,
    children: null
  }

  state: EditableState = {
    showModeToggle: false,
    valueOnEdit: null // the value when mode flips from view -> edit
  }

  _editorRef: HTMLInputElement | null = null
  _editButtonRef: HTMLButtonElement | null = null

  constructor(props: EditableProps) {
    super(props)

    warn(
      props.readOnly ? props.mode === 'view' : true,
      '[Editable] When readOnly is true, mode must be "view"'
    )
  }

  componentDidMount() {
    if (this.props.mode === 'edit') {
      this.focusEditor()
    }
  }

  componentDidUpdate(prevProps: EditableProps) {
    const { mode, value, onChange } = this.props

    // on the switch from view -> edit
    if (prevProps.mode !== 'edit' && mode === 'edit') {
      this.setState({ valueOnEdit: value })
      this.focusEditor()
    }

    // on the switch from edit to view
    if (prevProps.mode === 'edit' && mode !== 'edit') {
      this._editButtonRef && this._editButtonRef.focus()
      if (onChange && !deepEqual(this.state.valueOnEdit, value)) {
        onChange(value)
      }
    }
  }

  focusEditor() {
    warn(
      !!this._editorRef && !this.props.readOnly,
      '[Editable] Did you forget to connect editorRef to your editor component?'
    )
    if (this._editorRef) {
      this._editorRef.focus()
    }
  }

  enterView() {
    if (this.props.mode !== 'view') {
      this.setState({ showModeToggle: true })
      this.props.onChangeMode('view')
    }
  }

  enterEdit() {
    if (!this.props.readOnly) {
      this.setState({ showModeToggle: false })
      if (this.props.mode !== 'edit') {
        this.props.onChangeMode('edit')
      }
    }
  }

  handleEditESC = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.enterView()
    }
  }

  handleViewMouseOver = (event: React.MouseEvent) => {
    if (this.props.mode === 'view') {
      // because the mouse event handlers are on the container, not the view
      event.stopPropagation()
      this.setState({ showModeToggle: true })
    }
  }

  handleViewMouseOut = (event: React.MouseEvent) => {
    if (this.props.mode === 'view') {
      event.stopPropagation()
      this.setState({
        showModeToggle: document.activeElement === this._editButtonRef
      })
    }
  }

  handleViewClick = (event: React.MouseEvent) => {
    if (event.buttons === 1) {
      requestAnimationFrame(() => {
        this.enterEdit()
      })
    }
  }

  handleEditBlur = () => {
    this.enterView()
  }

  handleEditButtonFocus = () => {
    this.setState({ showModeToggle: true })
  }

  handleEditButtonBlur = () => {
    this.setState({ showModeToggle: false })
  }

  handleEditButtonClick = () => {
    this.enterEdit()
  }

  ref: Element | null = null

  handleContainerRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  // ------- prop getters ------
  getContainerProps: GetContainerProps = (props = {}) => {
    const { mode, readOnly } = this.props
    return {
      onMouseOver: this.handleViewMouseOver,
      onMouseOut: this.handleViewMouseOut,
      onMouseDown: mode !== 'edit' ? this.handleViewClick : undefined,
      onKeyUp: mode === 'edit' ? this.handleEditESC : undefined,
      readOnly,
      ...props,
      ref: this.handleContainerRef
    }
  }

  getViewerProps: GetViewerProps = (props = {}) => {
    return {
      mode: this.props.mode,
      readOnly: this.props.readOnly,
      ...props
    }
  }

  getEditorProps: GetEditorProps = (props = {}) => {
    return {
      mode: this.props.mode,
      onBlur: this.handleEditBlur,
      editorRef: (el: HTMLElement | null) => {
        this._editorRef = el as HTMLInputElement
      },
      readOnly: this.props.readOnly,
      ...props
    }
  }

  getEditButtonProps: GetEditButtonProps = (props = {}) => {
    return {
      onClick: this.handleEditButtonClick,
      onFocus: this.handleEditButtonFocus,
      onBlur: this.handleEditButtonBlur,
      isVisible: this.state.showModeToggle,
      buttonRef: (el: Element) => {
        this._editButtonRef = el as HTMLButtonElement
      },
      readOnly: this.props.readOnly,
      ...props
    }
  }

  render() {
    const { children, render = children, mode } = this.props

    if (typeof render === 'function') {
      return render({
        mode,
        getContainerProps: this.getContainerProps,
        getViewerProps: this.getViewerProps,
        getEditorProps: this.getEditorProps,
        getEditButtonProps: this.getEditButtonProps
      })
    } else {
      return null
    }
  }
}

export default Editable
export { Editable }
