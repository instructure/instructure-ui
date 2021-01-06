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
import PropTypes from 'prop-types'
import keycode from 'keycode'

import { FormPropTypes, FormFieldMessages } from '@instructure/ui-form-field'
import { View } from '@instructure/ui-view'
import { uid } from '@instructure/uid'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import {
  callRenderProp,
  deprecated,
  passthroughProps,
  getInteraction
} from '@instructure/ui-react-utils'
import { isEdge } from '@instructure/ui-utils'

import { accepts, getAcceptList } from './utils/accepts'
import { getEventFiles } from './utils/getEventFiles'

import { withStyle, jsx } from '@instructure/emotion'
import generateStyle from './styles'

function keyEventIsClickButton(e) {
  return e.keyCode === keycode.codes.space || e.keyCode === keycode.codes.enter
}

// Used try-catch due to missing document/navigator references in Jenkins
function isBrowserMS() {
  let result = false
  try {
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
@withStyle(generateStyle)
@deprecated('8.0.0', {
  label: 'renderLabel',
  enablePreview: 'shouldEnablePreview',
  allowRepeatFileSelection: 'shouldAllowRepeats',
  allowMultiple: 'shouldAllowMultiple'
})
@testable()
class FileDrop extends Component {
  static propTypes = {
    /**
     * The id of the input (to link it to its label for a11y)
     */
    id: PropTypes.string,
    /**
     * The content of FileDrop; can be a component or React node.
     * Components receive `isDragAccepted` and `isDragRejected` as props.
     */
    renderLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
      .isRequired,
    /**
     * The mime media type/s or file extension/s allowed to be dropped inside
     */
    accept: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * object with shape: `{
     * text: PropTypes.string,
     * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
     *   }`
     */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
     * Called when clicking on drop area to select files to upload
     */
    onClick: PropTypes.func,
    /**
     * Called when dropping files or when file dialog window exits successfully
     */
    onDrop: PropTypes.func,
    /**
     * Called when dropping allowed files
     */
    onDropAccepted: PropTypes.func,
    /**
     * Called when dropping rejected files
     */
    onDropRejected: PropTypes.func,
    /**
     * Called when dragging files
     * and passing through FileDrop's content for the first time
     */
    onDragEnter: PropTypes.func,
    /**
     * Called when dragging files and passing through FileDrop's content
     */
    onDragOver: PropTypes.func,
    /**
     * Called when dragging files and leaving FileDrop's content
     */
    onDragLeave: PropTypes.func,
    /**
     * Flag to use window.URL.createObjectURL for each dropped file and pass it through file.preview
     */
    shouldEnablePreview: PropTypes.bool,
    /**
     * Flag to allow multiple files to drop at once
     */
    shouldAllowMultiple: PropTypes.bool,
    /**
     * Flag to allow upload of the same file more than once
     */
    shouldAllowRepeats: PropTypes.bool,
    /**
     * the maximum file size allowed
     */
    maxSize: PropTypes.number,
    /**
     * the minimum file size allowed
     */
    minSize: PropTypes.number,
    /**
     * Specifies if interaction with the input is enabled, disabled, or readonly.
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * Set the CSS `display` property on FileInput's outermost element
     */
    display: PropTypes.oneOf(['block', 'inline-block']),
    /**
     * Set the CSS `height` property on FileInput's outermost element
     */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Set the CSS `width` property on FileInput's outermost element
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Set the CSS `maxWidth` property on FileInput's outermost element
     */
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Set the CSS `minWidth` property on FileInput's outermost element
     */
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Valid values are 0, none, auto, xxx-small, xx-small, x-small, small,
     * medium, large, x-large, xx-large. Apply these values via familiar
     * CSS-like shorthand. For example: margin="small auto large".
     */
    margin: ThemeablePropTypes.spacing,

    /* eslint-disable react/require-default-props */

    /**
     * __deprecated: use `renderLabel`__
     */
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /**
     * __deprecated: use `shouldEnablePreview`__
     */
    enablePreview: PropTypes.bool,
    /**
     * __deprecated: use `shouldAllowRepeats`__
     */
    allowRepeatFileSelection: PropTypes.bool,
    /**
     * __deprecated: use `shouldAllowMultiple`__
     */
    allowMultiple: PropTypes.bool,

    /* eslint-enable react/require-default-props */

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    onClick: function (e) {},
    onDrop: function (accepted, rejected, e) {},
    onDropAccepted: function (accepted, e) {},
    onDropRejected: function (rejected, e) {},
    onDragEnter: function (e) {},
    onDragOver: function (e) {},
    onDragLeave: function (e) {},
    shouldEnablePreview: false,
    shouldAllowMultiple: false,
    shouldAllowRepeats: true,
    maxSize: Infinity,
    minSize: 0,
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    messages: [],
    id: undefined,
    accept: undefined,
    display: 'block',
    height: undefined,
    width: undefined,
    minWidth: undefined,
    maxWidth: undefined,
    margin: undefined
  }

  constructor(props) {
    super(props)

    this.defaultId = uid('FileDrop')
    this.messagesId = uid('FileDrop-messages')
  }

  componentDidMount() {
    this.props.makeStyles(this.makeStyleProps())
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles(this.makeStyleProps())
  }

  makeStyleProps = () => {
    return {
      functionallyDisabled:
        this.interaction === 'disabled' || this.interaction === 'readonly',
      visuallyDisabled: this.interaction === 'disabled',
      dragRejected: this.state.isDragRejected || this.invalid,
      dragAccepted: this.state.isDragAccepted
    }
  }

  state = {
    isDragAccepted: false,
    isDragRejected: false,
    isFocused: false,
    isFileBrowserDisplayed: false
  }

  enterCounter = 0
  fileInputEl = null
  defaultId = null

  get hasMessages() {
    return this.props.messages && this.props.messages.length > 0
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get shouldEnablePreview() {
    // TODO: no longer nec. when `enablePreview` is removed
    return this.props.enablePreview || this.props.shouldEnablePreview
  }

  get shouldAllowRepeats() {
    // TODO: no longer nec. when `allowRepeatFileSelection` is removed
    return this.props.allowRepeatFileSelection || this.props.shouldAllowRepeats
  }

  get shouldAllowMultiple() {
    // TODO: no longer nec. when `allowMultiple` is removed
    return this.props.allowMultiple || this.props.shouldAllowMultiple
  }

  get invalid() {
    return (
      this.hasMessages &&
      this.props.messages.findIndex((message) => {
        return message.type === 'error'
      }) >= 0
    )
  }

  getDataTransferItems(e, shouldEnablePreview) {
    let list = Array.from(getEventFiles(e, this.fileInputEl))

    if (list.length > 1) {
      list = this.shouldAllowMultiple ? list : [list[0]]
    }

    if (shouldEnablePreview) {
      return list.map((file) =>
        Object.assign(file, { preview: window.URL.createObjectURL(file) })
      )
    }

    return list
  }

  handleDragEnter = (e) => {
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

    this.props.onDragEnter(e)
  }

  handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const event = e
      event.dataTransfer.dropEffect = 'copy'
    } catch (err) {
      // continue regardless of error
    }

    this.props.onDragOver(e)

    return false
  }

  handleDragLeave = (e) => {
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

    this.props.onDragLeave(e)
  }

  parseFiles(fileList) {
    const accepted = []
    const rejected = []

    fileList.forEach((file) => {
      if (this.fileAccepted(file) && this.fileMatchSize(file)) {
        accepted.push(file)
      } else {
        rejected.push(file)
      }
    })

    return [accepted, rejected]
  }

  handleChange = (e) => {
    const { onDrop, onDropAccepted, onDropRejected } = this.props
    const fileList = this.getDataTransferItems(e, this.shouldEnablePreview)
    const [accepted, rejected] = this.parseFiles(fileList)

    e.preventDefault()
    this.enterCounter = 0

    onDrop(accepted, rejected, e)

    if (rejected.length > 0) {
      onDropRejected(rejected, e)
    }

    if (accepted.length > 0) {
      onDropAccepted(accepted, e)
    }

    this.setState({
      isDragAccepted: false,
      isDragRejected: false,
      isFileBrowserDisplayed: false
    })
  }

  fileAccepted = (file) => {
    return accepts(file, this.props.accept)
  }

  fileMatchSize(file) {
    return file.size <= this.props.maxSize && file.size >= this.props.minSize
  }

  allFilesAccepted(files) {
    return files.every(this.fileAccepted)
  }

  acceptStr() {
    const { accept } = this.props
    return accept ? getAcceptList(accept).join(',') : null
  }

  renderLabel() {
    const { label, renderLabel } = this.props

    return callRenderProp(label || renderLabel, {
      isDragAccepted: this.state.isDragAccepted,
      isDragRejected: this.state.isDragRejected,
      interaction: this.interaction
    })
  }

  handleRef = (el) => {
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

  handleClick = (e) => {
    if (this.fileInputEl.value && this.shouldAllowRepeats) {
      this.fileInputEl.value = null
    }

    // focus the input (because FF won't)
    this.fileInputEl.focus()

    this.props.onClick(e)

    this.setState({
      isFileBrowserDisplayed: true
    })
  }

  handleKeyDown = (e) => {
    if (this.state.isFocused && keyEventIsClickButton(e)) {
      if (this.shouldAllowRepeats) {
        this.fileInputEl.value = null
      }
      // This bit of logic is necessary for MS browsers but causes unwanted warnings in Firefox
      // So we need to apply this logic only on MS browsers
      /* istanbul ignore if  */
      if (IS_MS) {
        e.stopPropagation()
        e.preventDefault()
        this.fileInputEl.click()
      }
    }
  }

  handleKeyUp = (e) => {
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
    const id = this.props.id || this.defaultId

    // make readonly input functionally disabled
    const functionallyDisabled =
      this.interaction === 'disabled' || this.interaction === 'readonly'

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
      >
        <label
          css={this.props.styles.fileDropLabel}
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
            <span css={this.props.styles.fileDropLabelContent}>
              <span css={this.props.styles.fileDropLayout}>
                <View height={height}>{this.renderLabel()}</View>
              </span>
            </span>
          </View>
        </label>
        <input
          {...passthroughProps(props)}
          onClick={this.handleClick}
          type="file"
          css={this.props.styles.fileDropInput}
          id={id}
          ref={this.handleRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          multiple={this.shouldAllowMultiple}
          accept={this.acceptStr()}
          onChange={this.handleChange}
          aria-describedby={this.hasMessages ? this.messagesId : null}
          disabled={functionallyDisabled}
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
