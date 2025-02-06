/* eslint-disable jsx-a11y/label-has-associated-control */
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
/** @jsx jsx */
import React, { Component } from 'react'
import keycode from 'keycode'
import { FormFieldMessages } from '@instructure/ui-form-field'
import type { FormMessage } from '@instructure/ui-form-field'
import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'
import {
  callRenderProp,
  passthroughProps,
  getInteraction,
  withDeterministicId
} from '@instructure/ui-react-utils'

import { accepts, getAcceptList } from './utils/accepts'
import { getEventFiles } from './utils/getEventFiles'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { FileDropProps, FileDropState, FileDropStyleProps } from './props'

function keyEventIsClickButton(e: React.KeyboardEvent) {
  return e.keyCode === keycode.codes.space || e.keyCode === keycode.codes.enter
}

/**
---
category: components
---
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class FileDrop extends Component<FileDropProps, FileDropState> {
  static readonly componentId = 'FileDrop'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    onClick: function (_e: React.MouseEvent) {},
    shouldEnablePreview: false,
    shouldAllowMultiple: false,
    shouldAllowRepeats: true,
    maxSize: Infinity,
    minSize: 0,
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    messages: [],
    display: 'block'
  }

  constructor(props: FileDropProps) {
    super(props)
    this.defaultId = props.deterministicId!()
    this.messagesId = props.deterministicId!('FileDrop-messages')
  }
  componentDidMount() {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStyleProps())
  }

  convertToFile(fileLikeItem: DataTransferItem | File) {
    if (fileLikeItem instanceof DataTransferItem)
      return fileLikeItem.getAsFile()
    else return fileLikeItem
  }

  makeStyleProps = (): FileDropStyleProps => {
    return {
      functionallyDisabled: this.functionallyDisabled,
      visuallyDisabled: this.interaction === 'disabled',
      dragRejected: this.state.isDragRejected || this.invalid,
      dragAccepted: this.state.isDragAccepted
    }
  }

  state: FileDropState = {
    isDragAccepted: false,
    isDragRejected: false,
    isFocused: false,
    isFileBrowserDisplayed: false
  }

  enterCounter = 0
  fileInputEl?: HTMLInputElement
  defaultId: string | null = null
  messagesId = ''

  ref: Element | null = null

  handleElementRef = (el: Element | null) => {
    this.ref = el
  }

  get functionallyDisabled() {
    return this.interaction === 'disabled' || this.interaction === 'readonly'
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get hasMessages() {
    return this.props.messages ? this.props.messages.length > 0 : false
  }

  get invalid() {
    if (this.hasMessages) {
      return (
        this.props.messages!.findIndex((message: FormMessage) => {
          return message.type === 'error' || message.type === 'newError'
        }) >= 0
      )
    }
    return false
  }

  getDataTransferItems(
    e: React.ChangeEvent | React.DragEvent,
    shouldEnablePreview?: boolean
  ): Array<File> {
    let list: Array<File> = []
    Array.from(getEventFiles(e, this.fileInputEl)).forEach((file) => {
      const fileObj = this.convertToFile(file)
      if (fileObj) list.push(fileObj)
    })
    if (list.length > 1) {
      list = this.props.shouldAllowMultiple ? list : [list[0]]
    }
    if (shouldEnablePreview) {
      return list.map((file: File) =>
        Object.assign(file, { preview: window.URL.createObjectURL(file) })
      )
    }
    return list
  }

  handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    // Count the dropzone and any children that are entered.
    this.enterCounter += 1
    // Don't trigger onDragEnter for each children after the first one
    if (this.enterCounter > 1) {
      return
    }
    const allFilesAccepted = this.allFilesAccepted(this.getDataTransferItems(e))
    this.setState({
      isDragAccepted: allFilesAccepted,
      isDragRejected: !allFilesAccepted
    })
    this.props.onDragEnter?.(e)
  }

  handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const event = e
      event.dataTransfer.dropEffect = 'copy'
    } catch (err) {
      // continue regardless of error
    }
    this.props.onDragOver?.(e)
    return false
  }

  handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    this.enterCounter -= 1
    // Only deactivate once the dropzone and all children was left
    if (this.enterCounter > 0) {
      return
    }
    this.setState({
      isDragAccepted: false,
      isDragRejected: false
    })
    this.props.onDragLeave?.(e)
  }

  parseFiles(fileList: Array<DataTransferItem | File>) {
    const accepted: typeof fileList = []
    const rejected: typeof fileList = []
    fileList.forEach((file: DataTransferItem | File) => {
      const fileObj = this.convertToFile(file)
      if (
        fileObj &&
        this.fileAccepted(fileObj) &&
        this.fileMatchSize(fileObj)
      ) {
        accepted.push(file)
      } else {
        rejected.push(file)
      }
    })
    return [accepted, rejected]
  }

  handleChange = (e: React.ChangeEvent | React.DragEvent) => {
    const { onDrop, onDropAccepted, onDropRejected, shouldEnablePreview } =
      this.props
    const fileList = this.getDataTransferItems(e, shouldEnablePreview)
    const [accepted, rejected] = this.parseFiles(fileList)
    e.preventDefault()
    this.enterCounter = 0
    onDrop && onDrop(accepted, rejected, e as React.DragEvent)
    if (rejected.length > 0 && onDropRejected) {
      onDropRejected(rejected, e)
    }
    if (accepted.length > 0 && onDropAccepted) {
      onDropAccepted(accepted, e)
    }
    this.setState({
      isDragAccepted: false,
      isDragRejected: false,
      isFileBrowserDisplayed: false
    })
  }

  fileAccepted = (file: File) => {
    if (this.props.accept) return accepts(file, this.props.accept)
    else return true
  }

  fileMatchSize(file: File) {
    return file.size <= this.props.maxSize! && file.size >= this.props.minSize!
  }

  allFilesAccepted(files: Array<File>) {
    return files.every(this.fileAccepted)
  }

  acceptStr() {
    const { accept } = this.props
    return accept ? getAcceptList(accept).join(',') : undefined
  }

  renderLabel() {
    const { renderLabel } = this.props
    return callRenderProp(renderLabel, {
      isDragAccepted: this.state.isDragAccepted,
      isDragRejected: this.state.isDragRejected,
      interaction: this.interaction
    })
  }

  handleRef = (el: HTMLInputElement) => {
    this.fileInputEl = el
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(el)
    }
  }

  handleBlur = () => {
    this.setState({
      isFocused: false,
      isFileBrowserDisplayed: false
    })
  }

  handleFocus = () => {
    this.setState({
      isFocused: true,
      isFileBrowserDisplayed: false
    })
  }

  handleClick = (e: React.MouseEvent) => {
    if (this.fileInputEl!.value && this.props.shouldAllowRepeats) {
      this.fileInputEl!.value = null as unknown as string
    }
    // focus the input (because FF won't)
    this.fileInputEl?.focus()
    this.props.onClick!(e)
    this.setState({
      isFileBrowserDisplayed: true
    })
  }

  handleKeyDown = (e: React.KeyboardEvent) => {
    if (this.state.isFocused && keyEventIsClickButton(e)) {
      if (this.props.shouldAllowRepeats) {
        this.fileInputEl!.value = null as unknown as string
      }
    }
  }

  handleKeyUp = (e: React.KeyboardEvent) => {
    // This is to handle the case where ESC is pressed inside a Dialog so that
    // closing the file browser dialog doesn't also close the Dialog.
    if (e.keyCode === keycode.codes.esc && this.state.isFileBrowserDisplayed) {
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
      this.setState({
        isFileBrowserDisplayed: false
      })
    }
  }

  render() {
    const {
      display,
      height,
      width,
      minWidth,
      maxWidth,
      margin,
      onDropAccepted,
      onDropRejected,
      ...props
    } = this.props
    const id = this.props.id || this.defaultId!
    const focusColor =
      this.state.isDragRejected || this.invalid ? 'danger' : undefined

    return (
      <View
        display={display}
        position="relative" // contain visually hidden file input element
        width={width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        margin={margin}
        height={height}
        elementRef={this.handleElementRef}
      >
        <label
          css={this.props.styles?.fileDropLabel}
          htmlFor={id}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleChange}
        >
          <View
            display="block"
            position="relative"
            withFocusOutline={this.state.isFocused}
            borderRadius="large"
            focusColor={focusColor}
            height={height}
          >
            <span css={this.props.styles?.fileDropLabelContent}>
              <span css={this.props.styles?.fileDropLayout}>
                <View height={height}>{this.renderLabel()}</View>
              </span>
            </span>
          </View>
        </label>
        <input
          {...passthroughProps(props)}
          onClick={this.handleClick}
          type="file"
          css={this.props.styles?.fileDropInput}
          id={id}
          ref={this.handleRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          multiple={this.props.shouldAllowMultiple}
          accept={this.acceptStr()}
          onChange={this.handleChange}
          aria-describedby={this.hasMessages ? this.messagesId : undefined}
          aria-invalid={this.invalid}
          disabled={this.functionallyDisabled}
        />
        {this.hasMessages ? (
          <View display="block" margin="small 0 0">
            <FormFieldMessages
              id={this.messagesId}
              messages={this.props.messages}
            />
          </View>
        ) : null}
      </View>
    )
  }
}

export default FileDrop
export { FileDrop }
