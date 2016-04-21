import React, { Component, PropTypes } from 'react'
import debounce from 'lodash.debounce'

import CodeMirrorEditor from '../CodeMirrorEditor'

import 'codemirror/theme/zenburn.css'

const UPDATE_DELAY = 200

export default class CodeEditor extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    mode: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    style: PropTypes.oneOf(['playground', 'standalone'])
  };

  static defaultProps = {
    readOnly: false,
    mode: 'jsx',
    onChange: function () {},
    style: 'standalone'
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
    const options = {
      mode: this.props.mode,
      theme: 'zenburn',
      lineNumbers: false,
      lineWrapping: true,
      matchBrackets: true,
      viewportMargin: Infinity,
      readOnly: this.props.readOnly ? 'nocursor' : false,
      tabindex: -1// ,
      // extraKeys: {
      //   Tab: false
      // }
    }

    return (
      <CodeMirrorEditor
        style={this.props.style} value={this.props.code} onChange={this._handleChange} options={options}/>
    )
  }
}
