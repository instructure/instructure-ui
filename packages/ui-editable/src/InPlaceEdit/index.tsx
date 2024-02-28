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

import { Flex } from '@instructure/ui-flex'
import { IconButton } from '@instructure/ui-buttons'
import type { IconButtonProps } from '@instructure/ui-buttons'
import { IconEditLine } from '@instructure/ui-icons'
import { logWarn as warn } from '@instructure/console'
import { createChainedFunction } from '@instructure/ui-utils'
import { withStyle } from '@instructure/emotion'
import { View } from '@instructure/ui-view'

import { Editable } from '../Editable'
import generateStyle from './styles'

import { propTypes, allowedProps } from './props'
import type { InPlaceEditProps } from './props'
import type { EditableRenderProps } from '../Editable/props'

/**
---
category: components
---
**/
@withStyle(generateStyle, null)
class InPlaceEdit extends Component<InPlaceEditProps> {
  static readonly componentId = 'InPlaceEdit'
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    readOnly: false,
    showFocusRing: true,
    inline: true,
    editButtonPlacement: 'end'
  }

  ref: Element | null = null
  _editButtonRef: HTMLButtonElement | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  constructor(props: InPlaceEditProps) {
    super(props)

    warn(
      props.readOnly ? props.mode === 'view' : true,
      '[InPlaceEdit] When readOnly is true, mode is forced to "view"'
    )
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  handleEditButtonRef = (el: HTMLButtonElement) => {
    this._editButtonRef = el
  }

  renderEditor({
    mode,
    onBlur,
    editorRef,
    readOnly
  }: ReturnType<EditableRenderProps['getEditorProps']>) {
    const { showFocusRing, renderEditor } = this.props
    const isEditMode = !readOnly && mode === 'edit'

    return isEditMode ? (
      <View
        as="span"
        display="block"
        withFocusOutline={showFocusRing}
        position="relative"
        css={this.props.styles?.inPlaceEdit}
        borderRadius="medium"
        margin="auto"
      >
        {renderEditor({ onBlur, editorRef })}
      </View>
    ) : null
  }

  renderViewer({
    readOnly,
    mode
  }: ReturnType<EditableRenderProps['getViewerProps']>) {
    return readOnly || mode === 'view' ? this.props.renderViewer() : null
  }

  renderEditButton({
    buttonRef,
    ...rest
  }: ReturnType<EditableRenderProps['getEditButtonProps']>) {
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
  }: {
    isVisible: boolean
    readOnly?: boolean
    label: string
  } & Partial<IconButtonProps>) => {
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
  }: EditableRenderProps) => {
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
        elementRef={this.handleRef}
      />
    )
  }
}

export default InPlaceEdit
export { InPlaceEdit }
