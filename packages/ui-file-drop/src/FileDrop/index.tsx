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
import { Component } from 'react'
import keycode from 'keycode'

import { FormFieldMessages } from '@instructure/ui-form-field'
import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'
import {
  callRenderProp,
  passthroughProps,
  getInteraction,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { isEdge, generateId } from '@instructure/ui-utils'

import { accepts, getAcceptList } from './utils/accepts'
import { getEventFiles } from './utils/getEventFiles'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { FileDropProps, FileDropState, FileDropStyleProps } from './props'

function keyEventIsClickButton(e: any) {
  return e.keyCode === keycode.codes.space || e.keyCode === keycode.codes.enter
}

// Used try-catch due to missing document/navigator references in Jenkins
function isBrowserMS() {
  let result = false
  try {
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'documentMode' does not exist on type 'Do... Remove this comment to see the full error message
    result = document.documentMode || isEdge
  } catch (e) {} // eslint-disable-line no-empty
  return result
}

const IS_MS = isBrowserMS()

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
    // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
    onClick: function (e: any) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'accepted' is declared but its value is never read... Remove this comment to see the full error message
    onDrop: function (accepted: any, rejected: any, e: any) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'accepted' is declared but its value is never read... Remove this comment to see the full error message
    onDropAccepted: function (accepted: any, e: any) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'rejected' is declared but its value is never read... Remove this comment to see the full error message
    onDropRejected: function (rejected: any, e: any) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
    onDragEnter: function (e: any) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
    onDragOver: function (e: any) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
    onDragLeave: function (e: any) {},
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'null'.
    this.defaultId = props.deterministicId!
    this.messagesId = generateId(
      'FileDrop-messages',
      //@ts-expect-error props.instanceMapCounter
      props.instanceMapCounter
    )
  }
  componentDidMount() {
    ;(this.props as any).makeStyles(this.makeStyleProps())
  }

  componentDidUpdate() {
    ;(this.props as any).makeStyles(this.makeStyleProps())
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
  fileInputEl = null
  defaultId = null
  messagesId = ''

  ref: Element | null = null

  handleElementRef = (el: Element | null) => {
    this.ref = el
  }

  get functionallyDisabled() {
    return this.interaction === 'disabled' || this.interaction === 'readonly'
  }

  get hasMessages() {
    return (
      (this.props as any).messages && (this.props as any).messages.length > 0
    )
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get invalid() {
    return (
      this.hasMessages &&
      (this.props as any).messages.findIndex((message: any) => {
        return message.type === 'error'
      }) >= 0
    )
  }

  getDataTransferItems(e: any, shouldEnablePreview: any) {
    let list = Array.from(getEventFiles(e, this.fileInputEl))
    if (list.length > 1) {
      list = (this.props as any).shouldAllowMultiple ? list : [list[0]]
    }
    if (shouldEnablePreview) {
      return list.map((file: any) =>
        Object.assign(file, { preview: window.URL.createObjectURL(file) })
      )
    }
    return list
  }

  handleDragEnter = (e: any) => {
    e.preventDefault()
    // Count the dropzone and any children that are entered.
    this.enterCounter += 1
    // Don't trigger onDragEnter for each children after the first one
    if (this.enterCounter > 1) {
      return
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const allFilesAccepted = this.allFilesAccepted(this.getDataTransferItems(e))
    this.setState({
      isDragAccepted: allFilesAccepted,
      isDragRejected: !allFilesAccepted
    })
    ;(this.props as any).onDragEnter(e)
  }

  handleDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const event = e
      event.dataTransfer.dropEffect = 'copy'
    } catch (err) {
      // continue regardless of error
    }
    ;(this.props as any).onDragOver(e)
    return false
  }

  handleDragLeave = (e: any) => {
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
    ;(this.props as any).onDragLeave(e)
  }

  parseFiles(fileList: any) {
    const accepted: any = []
    const rejected: any = []
    fileList.forEach((file: any) => {
      if (this.fileAccepted(file) && this.fileMatchSize(file)) {
        accepted.push(file)
      } else {
        rejected.push(file)
      }
    })
    return [accepted, rejected]
  }

  handleChange = (e: any) => {
    const {
      onDrop,
      onDropAccepted,
      onDropRejected,
      shouldEnablePreview
    } = this.props
    const fileList = this.getDataTransferItems(e, shouldEnablePreview)
    const [accepted, rejected] = this.parseFiles(fileList)
    e.preventDefault()
    this.enterCounter = 0
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefined'.
    onDrop(accepted, rejected, e)
    if (rejected.length > 0) {
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefined'.
      onDropRejected(rejected, e)
    }
    if (accepted.length > 0) {
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefined'.
      onDropAccepted(accepted, e)
    }
    this.setState({
      isDragAccepted: false,
      isDragRejected: false,
      isFileBrowserDisplayed: false
    })
  }

  fileAccepted = (file: any) => {
    return accepts(file, (this.props as any).accept)
  }

  fileMatchSize(file: any) {
    return (
      file.size <= (this.props as any).maxSize &&
      file.size >= (this.props as any).minSize
    )
  }

  allFilesAccepted(files: any) {
    return files.every(this.fileAccepted)
  }

  acceptStr() {
    const { accept } = this.props
    return accept ? getAcceptList(accept).join(',') : null
  }

  renderLabel() {
    const { renderLabel } = this.props
    return callRenderProp(renderLabel, {
      isDragAccepted: this.state.isDragAccepted,
      isDragRejected: this.state.isDragRejected,
      interaction: this.interaction
    })
  }

  handleRef = (el: any) => {
    this.fileInputEl = el
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

  handleClick = (e: any) => {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (this.fileInputEl.value && (this.props as any).shouldAllowRepeats) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this.fileInputEl.value = null
    }
    // focus the input (because FF won't)
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this.fileInputEl.focus()
    ;(this.props as any).onClick(e)
    this.setState({
      isFileBrowserDisplayed: true
    })
  }

  handleKeyDown = (e: any) => {
    if (this.state.isFocused && keyEventIsClickButton(e)) {
      if ((this.props as any).shouldAllowRepeats) {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        this.fileInputEl.value = null
      }
      // This bit of logic is necessary for MS browsers but causes unwanted warnings in Firefox
      // So we need to apply this logic only on MS browsers
      /* istanbul ignore if  */
      if (IS_MS) {
        e.stopPropagation()
        e.preventDefault()
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        this.fileInputEl.click()
      }
    }
  }

  handleKeyUp = (e: any) => {
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
    const id = (this.props as any).id || this.defaultId
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
          css={(this.props as any).styles.fileDropLabel}
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
            <span css={(this.props as any).styles.fileDropLabelContent}>
              <span css={(this.props as any).styles.fileDropLayout}>
                <View height={height}>{this.renderLabel()}</View>
              </span>
            </span>
          </View>
        </label>
        <input
          {...passthroughProps(props)}
          onClick={this.handleClick}
          type="file"
          css={(this.props as any).styles.fileDropInput}
          id={id}
          ref={this.handleRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          multiple={(this.props as any).shouldAllowMultiple}
          accept={this.acceptStr()}
          onChange={this.handleChange}
          aria-describedby={this.hasMessages ? (this as any).messagesId : null}
          disabled={this.functionallyDisabled}
        />
        {this.hasMessages ? (
          <View display="block" margin="small 0 0">
            <FormFieldMessages
              id={(this as any).messagesId}
              messages={(this.props as any).messages}
            />
          </View>
        ) : null}
      </View>
    )
  }
}

export default FileDrop
export { FileDrop }
