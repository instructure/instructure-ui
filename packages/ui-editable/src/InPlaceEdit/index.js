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

/** @jsx jsx */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Flex } from '@instructure/ui-flex'
import { IconButton } from '@instructure/ui-buttons'
import { IconEditLine } from '@instructure/ui-icons'
import { warn } from '@instructure/console/macro'
import { createChainedFunction } from '@instructure/ui-utils'
import { withStyle, jsx } from '@instructure/emotion'
import { View } from '@instructure/ui-view'

import { Editable } from '../Editable'
import generateStyle from './styles'

/**
---
category: components
---
**/
@withStyle(generateStyle, null)
class InPlaceEdit extends Component {
  static propTypes = {
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
    inline: PropTypes.bool,

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    readOnly: false,
    showFocusRing: true,
    inline: true,
    value: undefined,
    editButtonPlacement: 'end',
    onChange: undefined
  }

  constructor(props) {
    super(props)

    warn(
      props.readOnly ? props.mode === 'view' : true,
      '[InPlaceEdit] When readOnly is true, mode is forced to "view"'
    )
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  handleEditButtonRef = (el) => {
    this._editButtonRef = el
  }

  renderEditor({ mode, onBlur, editorRef, readOnly }) {
    const { showFocusRing, renderEditor } = this.props
    const isEditMode = !readOnly && mode === 'edit'

    return isEditMode ? (
      <View
        as="span"
        display="block"
        withFocusOutline={showFocusRing}
        position="relative"
        css={this.props.styles.inPlaceEdit}
        borderRadius="medium"
      >
        {renderEditor({ onBlur, editorRef })}
      </View>
    ) : null
  }

  renderViewer({ readOnly, mode }) {
    return readOnly || mode === 'view' ? this.props.renderViewer() : null
  }

  renderEditButton({ buttonRef, ...rest }) {
    return this.props.renderEditButton({
      elementRef: createChainedFunction(this.handleEditButtonRef, buttonRef),
      ...rest
    })
  }

  // Render a default edit button, an icon button with the edit icon
  // the margin makes room for the focus ring
  static renderDefaultEditButton = ({
    isVisible,
    readOnly,
    label,
    ...buttonProps
  }) => {
    if (readOnly) {
      return null
    }
    return (
      <IconButton
        size="small"
        screenReaderLabel={label}
        withBackground={false}
        withBorder={false}
        {...buttonProps}
      >
        {isVisible ? IconEditLine : null}
      </IconButton>
    )
  }

  renderAll = ({
    getContainerProps,
    getViewerProps,
    getEditorProps,
    getEditButtonProps
  }) => {
    const flexDir =
      this.props.editButtonPlacement === 'start' ? 'row-reverse' : 'row'
    const justifyItems = flexDir === 'row-reverse' ? 'end' : 'start'
    const buttonMargin =
      this.props.editButtonPlacement === 'start'
        ? '0 xx-small 0 0'
        : '0 0 0 xx-small'
    return (
      <Flex
        display={this.props.inline ? 'inline-flex' : 'flex'}
        direction={flexDir}
        justifyItems={justifyItems}
        {...getContainerProps()}
      >
        <Flex.Item shouldGrow shouldShrink>
          {this.renderEditor(getEditorProps())}
          {this.renderViewer(getViewerProps())}
        </Flex.Item>
        <Flex.Item margin={buttonMargin}>
          {this.renderEditButton(getEditButtonProps())}
        </Flex.Item>
      </Flex>
    )
  }

  render() {
    const { mode, value, onChange, onChangeMode, readOnly } = this.props

    return (
      <Editable
        mode={mode}
        onChangeMode={onChangeMode}
        render={this.renderAll}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    )
  }
}

export default InPlaceEdit
export { InPlaceEdit }
