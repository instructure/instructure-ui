import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from '@instructure/ui-core/lib/util/debounce'

import CodeMirrorEditor from '../CodeMirrorEditor'

const UPDATE_DELAY = 200

export default class CodeEditor extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    mode: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    variant: PropTypes.oneOf(['playground', 'standalone'])
  }

  static defaultProps = {
    readOnly: false,
    mode: 'jsx',
    onChange: function () {},
    variant: 'standalone'
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
    const options = {
      mode: this.props.mode,
      lineNumbers: false,
      lineWrapping: true,
      matchBrackets: true,
      viewportMargin: Infinity,
      readOnly: this.props.readOnly,
      tabSize: 2,
      tabindex: -1
    }

    return (
      <CodeMirrorEditor
        variant={this.props.variant}
        value={this.props.code}
        onChange={this._handleChange}
        options={options}
      />
    )
  }
}
