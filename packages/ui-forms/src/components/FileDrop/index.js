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

import View from '@instructure/ui-layout/lib/components/View'
import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'

import FormPropTypes from '../../utils/FormPropTypes'
import FormFieldMessages from '../FormField/FormFieldMessages'

import styles from './styles.css'
import theme from './theme'

// Used try-catch due to missing document/navigator references in Jenkins
function isBrowserMS () {
  let result = false
  try {
    result = document.documentMode || /Edge/.test(navigator.userAgent)
  } catch (e) {} // eslint-disable-line no-empty

  return result
}

function getAcceptList (accept) {
  const list = Array.isArray(accept) ? accept : accept.split(',')
  return list.map(a => a.trim().replace(/^\w+$/, '.$&'))
}

export function getEventFiles (event, inputEl) {
  const dt = event.dataTransfer

  if (dt) {
    if (dt.files && dt.files.length) {
      return dt.files
    } else if (dt.items && dt.items.length) {
      return dt.items
    }
  } else if (inputEl && inputEl.files) {
    return inputEl.files
  }

  return []
}

export function accepts (file, acceptProp) {
  if (file && acceptProp && file.type !== 'application/x-moz-file') {
    const acceptList = getAcceptList(acceptProp)
    const mimeType = file.type || ''
    const baseMimeType = mimeType.replace(/\/.*$/, '')

    return acceptList.some(type => {
      if (type.charAt(0) === '.') {
        // type is an extension like .pdf
        if (!file.name) {
          return mimeType.endsWith(type.slice(1))
        }
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      } else if (/\/\*$/.test(type)) {
        // type is something like a image/* mime type
        return baseMimeType === type.replace(/\/.*$/, '')
      }
      return mimeType === type
    })
  }
  return true
}

const ENTER_KEY = 'Enter'
const IS_MS = isBrowserMS()

/**
---
category: components/forms
---
**/
@themeable(theme, styles)
export default class FileDrop extends Component {
  static propTypes = {
    /**
    * the id of the input (to link it to its label for a11y)
    */
    id: PropTypes.string,
    /**
    * the content of FileDrop, can be a component or an react node.
    * If given a component, it will receive isDragAccepted and isDragRejected as props
    */
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
    /**
    * the mime media type/s or file extension/s allowed to be dropped inside
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
    * callback called when dropping files or when the file dialog window exits successfully
    */
    onDrop: PropTypes.func,
    /**
    * callback called when dropping allowed files
    */
    onDropAccepted: PropTypes.func,
    /**
    * callback called when dropping rejected files
    */
    onDropRejected: PropTypes.func,
    /**
    * callback called when dragging files
    * and passing through FileDrop's content for the first time
    */
    onDragEnter: PropTypes.func,
    /**
    * callback called when dragging files and passing through FileDrop's content
    */
    onDragOver: PropTypes.func,
    /**
    * callback called when dragging files and leaving FileDrop's content
    */
    onDragLeave: PropTypes.func,
    /**
    * flag to use window.URL.createObjectURL for each dropped file and passing it through file.preview
    */
    enablePreview: PropTypes.bool,
    /**
    * flag to allow selection multiple files to drop at once
    */
    allowMultiple: PropTypes.bool,
    /**
    * the maximum file size allowed
    */
    maxSize: PropTypes.number,
    /**
    * the minimum file size allowed
    */
    minSize: PropTypes.number,
    /**
     * Whether or not to disable the input
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool
  }

  static defaultProps = {
    onDrop: function (acceptedFiles, rejectedFiles, e) {},
    onDropAccepted: function (acceptedFiles, e) {},
    onDropRejected: function (rejectedFiles, e) {},
    onDragEnter: function (e) {},
    onDragOver: function (e) {},
    onDragLeave: function (e) {},

    enablePreview: false,
    allowMultiple: false,
    maxSize: Infinity,
    minSize: 0,
    readOnly: false,
    messages: []
  }

  constructor (props) {
    super(props)

    this.defaultId = generateElementId('FileDrop')
    this.messagesId = generateElementId('FileDrop-messages')
  }

  state = {
    isDragAccepted: false,
    isDragRejected: false,
    focused: false
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

  getDataTransferItems (event, enablePreview) {
    let list = Array.prototype.slice.call(getEventFiles(event, this.fileInputEl))
    this.fileInputEl.value = null

    if (list.length > 1) {
      list = this.props.allowMultiple ? list : [list[0]]
    }

    if (enablePreview) {
      return list.map((file) => (
        Object.assign({}, file, { preview: window.URL.createObjectURL(file) })
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

  handleDrop = (e) => {
    const { onDrop, onDropAccepted, onDropRejected, enablePreview } = this.props
    const fileList = this.getDataTransferItems(e, enablePreview)
    const [acceptedFiles, rejectedFiles] = this.parseFiles(fileList)

    e.preventDefault()
    this.enterCounter = 0

    onDrop(acceptedFiles, rejectedFiles, e)

    if (rejectedFiles.length > 0) {
      onDropRejected(rejectedFiles, e)
    }

    if (acceptedFiles.length > 0) {
      onDropAccepted(acceptedFiles, e)
    }

    this.setState({
      isDragAccepted: false,
      isDragRejected: false
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
    const Label = this.props.label
    if (typeof Label !== 'function') {
      return Label
    }

    return (
      <Label
        isDragAccepted={this.state.isDragAccepted}
        isDragRejected={this.state.isDragRejected}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
      />
    )
  }

  handleRef = (el) => { this.fileInputEl = el }
  handleFocus = () => this.setState({ focused: true })
  handleBlur = () => this.setState({ focused: false })
  handleKeyDown = (event) => {
    // This bit of logic is necessary for MS browsers but causes unwanted warnings in Firefox
    // So we need to apply this logic only on MS browsers
    /* istanbul ignore if  */
    if (IS_MS && this.state.focused && event.key === ENTER_KEY) {
      event.stopPropagation()
      event.preventDefault()
      this.fileInputEl.click()
    }
  }

  render () {
    const { allowMultiple, disabled, readOnly } = this.props
    const id = this.props.id || this.defaultId
    const classes = {
      [styles.label]: true,
      [styles.dragRejected]: this.state.isDragRejected || this.invalid,
      [styles.dragAccepted]: this.state.isDragAccepted,
      [styles.focused]: this.state.focused
    }
    const props = omitProps(this.props, FileDrop.propTypes)

    return (
      <div className={styles.root}>
        <label
          className={classnames(classes)}
          htmlFor={id}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
        >
          <span className={styles.labelContent}>
            <span className={styles.layout}>
              {this.renderLabel()}
            </span>
          </span>
        </label>
        <input
          {...props}
          type="file"
          className={styles.input}
          id={id}
          ref={this.handleRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          multiple={allowMultiple}
          accept={this.acceptStr()}
          onChange={this.handleDrop}
          aria-describedby={this.hasMessages ? this.messagesId : null}
          disabled={disabled || readOnly}
          aria-disabled={disabled || readOnly ? 'true' : null}
        />
        {(this.hasMessages) ?
          <View display="block" margin="small 0 0">
            <FormFieldMessages id={this.messagesId} messages={this.props.messages} />
          </View>
        : null}
      </div>
    )
  }
}
