import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

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
  FileDrop is a consistent way to drag and drop, as well as browse your computer to upload a media file.

  The `isDragAccepted` and `isDragRejected` props can be used to signal to the user if
  the dragged files are going to be accepted or not (unfortunately, this only works as intended in Chrome
  and Firefox).

  ```jsx_example
  <FileDrop
    accept="image/*"
    onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
    onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
    label={
      <Billboard
        heading="Upload your image"
        message="Drag and drop, or click to browse your computer"
        hero={<Image src={placeholderImage(1200, 300)} />}
      />
    }
  />
  ```

  ### Accept

  The `accept` prop dictates what type of files are allowed. It can be an array or comma-separated string of
  [MIME type formats](https://en.wikipedia.org/wiki/Media_type#Common_examples) and/or file extensions

  ```jsx_example
  <Grid startAt="medium" vAlign="middle">
    <GridRow>
      <GridCol>

        <FileDrop
          accept=".jpg"
          onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
          onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
          label={
            <Billboard
              size="small"
              message="Only .jpg files"
              hero={<IconPlus />}
            />
          }
        />

      </GridCol>
      <GridCol>

        <FileDrop
          accept=".png"
          onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
          onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
          label={
            <Billboard
              size="small"
              message="Only .png files"
              hero={<IconPlus />}
            />
          }
        />

      </GridCol>
      <GridCol>

        <FileDrop
          accept="video/*"
          onDropAccepted={([file]) => { console.log(`File accepted ${file.name}`) }}
          onDropRejected={([file]) => { console.log(`File rejected ${file.name}`) }}
          label={
            <Billboard
              size="small"
              message="All video file types"
              hero={<IconPlus />}
            />
          }
        />

      </GridCol>
    </GridRow>
  </Grid>
  ```

  ### AllowMultiple

  If the `allowMultiple` prop is set to `true`, FileDrop accepts multiple files.

  ```jsx_example
  <Grid startAt="medium" vAlign="middle">
    <GridRow>
      <GridCol>

        <FileDrop
          allowMultiple={true}
          label={
            <Billboard
              size="small"
              heading="Upload your files"
              headingLevel="h3"
              message="Allow multiple files"
              hero={<IconPlus />}
            />
          }
        />

      </GridCol>
      <GridCol>

        <FileDrop
          label={
            <Billboard
              size="small"
              heading="Upload your file"
              message="Allow only one file"
              headingLevel="h3"
              hero={<IconPlus />}
            />
          }
        />

      </GridCol>
    </GridRow>
  </Grid>
  ```
**/
@themeable(theme, styles)
export default class FileDrop extends Component {
  /* eslint-disable react/require-default-props */
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
    minSize: PropTypes.number
  }
  /* eslint-enable react/require-default-props */

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
    minSize: 0
  }

  constructor (props) {
    super(props)

    this.defaultId = `FileDrop__${shortid.generate()}`
  }

  state = {
    isDragAccepted: false,
    isDragRejected: false,
    focused: false
  }

  enterCounter = 0
  fileInputEl = null
  defaultId = null

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
    const { allowMultiple } = this.props
    const id = this.props.id || this.defaultId
    const classes = {
      [styles.root]: true,
      [styles.dragRejected]: this.state.isDragRejected,
      [styles.dragAccepted]: this.state.isDragAccepted,
      [styles.focused]: this.state.focused
    }
    const props = omitProps(this.props, FileDrop.propTypes)

    return (
      <div>
        <label
          className={classnames(classes)}
          htmlFor={id}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
        >
          <span className={styles.label}>
            {this.renderLabel()}
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
        />
      </div>
    )
  }
}
