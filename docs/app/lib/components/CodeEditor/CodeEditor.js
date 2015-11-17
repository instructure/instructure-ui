import React, { Component, PropTypes } from 'react'
import debounce from 'lodash/function/debounce'

import CodeMirrorEditor from '../CodeMirrorEditor'

import styles from './CodeEditor.css'
import 'codemirror/theme/base16-light.css'

const UPDATE_DELAY = 200

export default class CodeEditor extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    readOnly: false,
    onChange: function () {}
  }

  static codemirrorOptions = {
    mode: 'jsx',
    theme: 'base16-light',
    lineNumbers: false,
    lineWrapping: true,
    smartIndent: false,
    matchBrackets: true,
    viewportMargin: Infinity,
    readOnly: false
  }

  constructor () {
    super()
    this._handleChange = debounce(this.handleChange.bind(this), UPDATE_DELAY)
  }

  handleChange (newCode) {
    const { onChange } = this.props

    if (onChange) {
      onChange(newCode)
    }
  }

  render () {
    return (
      <div className={styles.root}>
        <CodeMirrorEditor value={this.props.code} onChange={this._handleChange} options={CodeEditor.codemirrorOptions}/>
      </div>
    )
  }
}
