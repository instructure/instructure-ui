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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'

import { FormPropTypes, FormFieldMessages } from '@instructure/ui-form-field'
import { View } from '@instructure/ui-view'
import { uid } from '@instructure/uid'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { callRenderProp, experimental, passthroughProps } from '@instructure/ui-react-utils'
import { isEdge } from '@instructure/ui-utils'

import { accepts, getAcceptList } from './utils/accepts'
import { getEventFiles } from './utils/getEventFiles'

import styles from './styles.css'
import theme from './theme'

function keyEventIsClickButton (e) {
  return (e.keyCode === keycode.codes.space || e.keyCode === keycode.codes.enter)
}

// Used try-catch due to missing document/navigator references in Jenkins
function isBrowserMS () {
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
experimental: true
---
**/
@testable()
@experimental()
@themeable(theme, styles)
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
    renderLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
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
    margin: ThemeablePropTypes.spacing
  }

  static defaultProps = {
    onClick: function(e) {},
    onDrop: function (event, { accepted, rejected }) {},
    onDropAccepted: function (event, { accepted }) {},
    onDropRejected: function (event, { rejected }) {},
    onDragEnter: function (event) {},
    onDragOver: function (event) {},
    onDragLeave: function (event) {},
    shouldEnablePreview: false,
    shouldAllowMultiple: false,
    shouldAllowRepeats: true,
    maxSize: Infinity,
    minSize: 0,
    interaction: 'enabled',
    messages: [],
    id: undefined,
    accept: undefined,
    display: 'block',
    width: undefined,
    minWidth: undefined,
    maxWidth: undefined,
    margin: undefined
  }

  constructor (props) {
    super(props)

    this.defaultId = uid('FileDrop')
    this.messagesId = uid('FileDrop-messages')
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

  get hasMessages () {
    return this.props.messages && (this.props.messages.length > 0)
  }

  get invalid () {
    return this.hasMessages && this.props.messages.findIndex((message) => {
      return message.type === 'error'
    }) >= 0
  }

  getDataTransferItems (event, shouldEnablePreview) {
    let list = Array.from(getEventFiles(event, this.fileInputEl))

    if (list.length > 1) {
      list = this.props.shouldAllowMultiple ? list : [list[0]]
    }

    if (shouldEnablePreview) {
      return list.map((file) => (
        Object.assign(file, { preview: window.URL.createObjectURL(file) })
      ))
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

    this.props.onDragEnter(event)
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

    this.props.onDragOver(event)

    return false
  }

  handleDragLeave = (event) => {
    event.preventDefault()
    this.enterCounter -= 1

    // Only deactivate once the dropzone and all children was left
    if (this.enterCounter > 0) {
      return
    }

    this.setState({
      isDragAccepted: false,
      isDragRejected: false
    })

    this.props.onDragLeave(event)
  }

  parseFiles (fileList) {
    const acceptedFiles = []
    const rejectedFiles = []

    fileList.forEach((file) => {
      if (this.fileAccepted(file) && this.fileMatchSize(file)) {
        acceptedFiles.push(file)
      } else {
        rejectedFiles.push(file)
      }
    })

    return [acceptedFiles, rejectedFiles]
  }

  handleChange = (event) => {
    const { onDrop, onDropAccepted, onDropRejected, shouldEnablePreview } = this.props
    const fileList = this.getDataTransferItems(event, shouldEnablePreview)
    const [accepted, rejected] = this.parseFiles(fileList)

    event.preventDefault()
    this.enterCounter = 0

    onDrop(event, { accepted, rejected })

    if (accepted.length > 0) {
      onDropAccepted(event, { accepted })
    }

    if (rejected.length > 0) {
      onDropRejected(event, { rejected })
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

  fileMatchSize (file) {
    return file.size <= this.props.maxSize && file.size >= this.props.minSize
  }

  allFilesAccepted (files) {
    return files.every(this.fileAccepted)
  }

  acceptStr () {
    const { accept } = this.props
    return accept ? getAcceptList(accept).join(',') : null
  }

  renderLabel () {
    const {
      renderLabel,
      interaction
    } = this.props

    return callRenderProp(renderLabel, {
      isDragAccepted: this.state.isDragAccepted,
      isDragRejected: this.state.isDragRejected,
      interaction
    })
  }

  handleRef = (el) => { this.fileInputEl = el }

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

  handleClick = (event) => {
    if (this.fileInputEl.value && this.props.shouldAllowRepeats) { this.fileInputEl.value = null }

    // focus the input (because FF won't)
    this.fileInputEl.focus()

    this.props.onClick(event)

    this.setState({
      isFileBrowserDisplayed: true
    })
  }

  handleKeyDown = (event) => {
    if (this.state.isFocused && keyEventIsClickButton(event)){
      if (this.props.shouldAllowRepeats){
        this.fileInputEl.value = null
      }
      // This bit of logic is necessary for MS browsers but causes unwanted warnings in Firefox
      // So we need to apply this logic only on MS browsers
      /* istanbul ignore if  */
      if (IS_MS) {
        event.stopPropagation()
        event.preventDefault()
        this.fileInputEl.click()
      }
    }
  }

  handleKeyUp = (event) => {
    // This is to handle the case where ESC is pressed inside a Dialog so that
    // closing the file browser dialog doesn't also close the Dialog.
    if (event.keyCode === keycode.codes.esc && this.state.isFileBrowserDisplayed) {
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()

      this.setState({
        isFileBrowserDisplayed: false
      })
    }
  }

  render () {
    const {
      shouldAllowMultiple,
      interaction,
      display,
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
    const functionallyDisabled = interaction === 'disabled' || interaction === 'readonly'

    const focusColor = (this.state.isDragRejected || this.invalid) ? 'danger' : undefined

    const classes = {
      [styles.label]: true,
      [styles.functionallyDisabled]: functionallyDisabled,
      [styles.visuallyDisabled]: interaction === 'disabled',
      [styles.dragRejected]: this.state.isDragRejected || this.invalid,
      [styles.dragAccepted]: this.state.isDragAccepted
    }

    return (
      <View
        display={display}
        position="relative" // contain visually hidden file input element
        width={width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        margin={margin}
        __dangerouslyIgnoreExperimentalWarnings
      >
        <label
          className={classnames(classes)}
          htmlFor={id}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleChange}
        >
          <View
            display="block"
            position="relative"
            isFocused={this.state.isFocused}
            borderRadius="large"
            focusColor={focusColor}
            __dangerouslyIgnoreExperimentalWarnings
          >
            <span className={styles.labelContent}>
              <span className={styles.layout}>
                {this.renderLabel()}
              </span>
            </span>
          </View>
        </label>
        <input
          {...passthroughProps(props)}
          onClick={this.handleClick}
          type="file"
          className={styles.input}
          id={id}
          ref={this.handleRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          multiple={shouldAllowMultiple}
          accept={this.acceptStr()}
          onChange={this.handleChange}
          aria-describedby={this.hasMessages ? this.messagesId : null}
          disabled={functionallyDisabled}
        />
        {(this.hasMessages) ?
          <View display="block" margin="small 0 0" __dangerouslyIgnoreExperimentalWarnings>
            <FormFieldMessages id={this.messagesId} messages={this.props.messages} />
          </View>
        : null}
      </View>
    )
  }
}

export default FileDrop
export { FileDrop }
