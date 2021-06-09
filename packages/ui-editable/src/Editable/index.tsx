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
import { Component } from 'react'
import PropTypes from 'prop-types'

type Props = {
  mode: 'view' | 'edit'
  onChangeMode: (...args: any[]) => any
  render?: (...args: any[]) => any
  value?: any
  onChange?: (...args: any[]) => any
  readOnly?: boolean
}

import { deepEqual } from '@instructure/ui-utils'
import { logWarn as warn } from '@instructure/console'
import { requestAnimationFrame } from '@instructure/ui-dom-utils'

/**
---
category: components
experimental: true
---
**/
class Editable extends Component<Props> {
  static propTypes = {
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
    readOnly: PropTypes.bool
  }

  static defaultProps = {
    readOnly: false,
    onChange: undefined,
    value: undefined,
    render: undefined,
    children: null
  }

  state = {
    showModeToggle: false,
    valueOnEdit: null // the value when mode flips from view -> edit
  }

  _editorRef = null
  _editButtonRef = null

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
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
  componentWillUnmount() {}

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    const { mode, value, onChange } = this.props

    // on the switch from view -> edit
    if (prevProps.mode !== 'edit' && mode === 'edit') {
      this.setState({ valueOnEdit: value })
      this.focusEditor()
    }

    // on the switch from edit to view
    if (prevProps.mode === 'edit' && mode !== 'edit') {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleEditESC = (event) => {
    if (event.key === 'Escape') {
      this.enterView()
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleViewMouseOver = (event) => {
    if (this.props.mode === 'view') {
      // because the mouse event handlers are on the container, not the view
      event.stopPropagation()
      this.setState({ showModeToggle: true })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleViewMouseOut = (event) => {
    if (this.props.mode === 'view') {
      event.stopPropagation()
      this.setState({
        showModeToggle: document.activeElement === this._editButtonRef
      })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleViewClick = (event) => {
    if (event.buttons === 1) {
      requestAnimationFrame(() => {
        this.enterEdit()
      })
    }
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
  handleEditBlur = (event) => {
    this.enterView()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
  handleEditButtonFocus = (event) => {
    this.setState({ showModeToggle: true })
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
  handleEditButtonBlur = (event) => {
    this.setState({ showModeToggle: false })
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
  handleEditButtonClick = (event) => {
    this.enterEdit()
  }

  // ------- prop getters ------
  getContainerProps = (props = {}) => {
    const { mode, readOnly } = this.props
    return {
      onMouseOver: this.handleViewMouseOver,
      onMouseOut: this.handleViewMouseOut,
      onMouseDown: mode !== 'edit' ? this.handleViewClick : null,
      onKeyUp: mode === 'edit' ? this.handleEditESC : null,
      readOnly,
      ...props
    }
  }

  getViewerProps = (props = {}) => {
    return {
      mode: this.props.mode,
      readOnly: this.props.readOnly,
      ...props
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  getEditorProps = (props) => {
    return {
      mode: this.props.mode,
      onBlur: this.handleEditBlur,
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
      editorRef: (el) => {
        this._editorRef = el
      },
      readOnly: this.props.readOnly,
      ...props
    }
  }

  getEditButtonProps = (props = {}) => {
    return {
      onClick: this.handleEditButtonClick,
      onFocus: this.handleEditButtonFocus,
      onBlur: this.handleEditButtonBlur,
      isVisible: this.state.showModeToggle,
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
      buttonRef: (el) => {
        this._editButtonRef = el
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
