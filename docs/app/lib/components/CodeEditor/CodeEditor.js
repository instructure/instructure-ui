import React, { Component, PropTypes } from 'react'
import debounce from 'lodash.debounce'

import CodeMirrorEditor from '../CodeMirrorEditor'

import 'codemirror/theme/zenburn.css'

const UPDATE_DELAY = 200

export default class CodeEditor extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    readOnly: false,
    onChange: function () {}
  };

  static codemirrorOptions = {
    mode: 'jsx',
    theme: 'zenburn',
    lineNumbers: true,
    lineWrapping: true,
    smartIndent: true,
    matchBrackets: true,
    viewportMargin: Infinity,
    readOnly: false
  };

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
      <CodeMirrorEditor value={this.props.code} onChange={this._handleChange} options={CodeEditor.codemirrorOptions}/>
    )
  }
}
