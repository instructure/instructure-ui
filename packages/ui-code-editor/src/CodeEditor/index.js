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

import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { uid } from '@instructure/uid'
import { passthroughProps } from '@instructure/ui-react-utils'

import styles from './styles.css'
import theme from './theme'
import CodeMirror from './codemirror'

/**
---
category: components
---
**/

@testable()
@themeable(theme, styles)
class CodeEditor extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    language: PropTypes.oneOf([
      'sh',
      'js',
      'json',
      'javascript',
      'jsx',
      'shell',
      'css',
      'html',
      'markdown',
      'yaml',
      'yml',
      'bash'
    ]),
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.object,
    attachment: PropTypes.oneOf(['bottom', 'top']),
    /**
    * the selected value (when controlled via the `onChange` prop)
    */
    value: PropTypes.string
  }

  static defaultProps = {
    language: 'jsx',
    readOnly: false,
    options: {
      styleActiveLine: true
    },
    onChange: (value) => {},
    attachment: undefined,
    value: undefined
  }

  constructor (props) {
    super()
    this._id = uid('CodeEditor')
  }

  focus () {
    if (this.codeMirror) {
      this.codeMirror.focus()
    }
  }

  get mode () {
    const { language } = this.props

    if (language === 'json' || language === 'js') {
      return 'jsx'
    } else if (language === 'sh') {
      return 'shell'
    } else if (language === 'html') {
      return 'htmlmixed'
    } else if (language === 'yml') {
      return 'yaml'
    } else {
      return language
    }
  }

  get options () {
    return {
      ...this.props.options,
      readOnly: this.props.readOnly,
      mode: this.mode
    }
  }

  render () {
    const {
      value,
      label,
      attachment,
      readOnly,
      onChange,
      ...rest
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles['attached--' + attachment]]: attachment
    }

    return (
      <div className={classnames(classes)}>
        <label htmlFor={this._id}>
          <ScreenReaderContent>{label}</ScreenReaderContent>
          <CodeMirror
            {...passthroughProps(rest)}
            id={this._id}
            options={this.options}
            value={value}
            onBeforeChange={(editor, data, value) => {
              onChange(value)
            }}
            ref={(el) => { this.codeMirror = el }}
          />
        </label>
      </div>
    )
  }
}

export default CodeEditor
export { CodeEditor }
