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
import debounce from '@instructure/ui-utils/lib/debounce'

import CodeMirrorEditor from '../CodeMirrorEditor'

const UPDATE_DELAY = 200

export default class CodeEditor extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
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
        label={this.props.label}
        variant={this.props.variant}
        value={this.props.code}
        onChange={this._handleChange}
        options={options}
      />
    )
  }
}
