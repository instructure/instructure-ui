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

import themeable from '@instructure/ui-themeable'
import ScreenReaderContent from '@instructure/ui-a11y/lib/ScreenReaderContent'
import uid from '@instructure/uid'
import { omitProps } from '@instructure/ui-react-utils/lib/passthroughProps'

import styles from './styles.css'
import theme from './theme'
import CodeMirror from './codemirror'

/**
---
category: components
---
**/

@themeable(theme, styles)
export default class CodeEditor extends Component {
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
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
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
    onChange: undefined,
    attachment: undefined,
    defaultValue: undefined,
    value: undefined
  }

  constructor (props) {
    super()
    this._id = uid('CodeEditor')

    if (typeof props.value === 'undefined') {
      this.state = {
        value: props.defaultValue
      }
    }
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

  get value () {
    return (typeof this.props.value === 'undefined') ? this.state.value : this.props.value
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles['attached--' + this.props.attachment]]: this.props.attachment
    }

    return (
      <div className={classnames(classes)}>
        <label htmlFor={this._id}>
          <ScreenReaderContent>{this.props.label}</ScreenReaderContent>
          <CodeMirror
            {...omitProps(this.props, CodeEditor.propTypes)}
            id={this._id}
            options={this.options}
            value={this.value}
            onBeforeChange={(editor, data, value) => {
              if (typeof this.props.value === 'undefined') {
                this.setState({ value })
              }
            }}
            onChange={(editor, data, value) => {
              if (typeof this.props.onChange === 'function') {
                this.props.onChange(value)
              }
            }}
            ref={(el) => { this.codeMirror = el }}
          />
        </label>
      </div>
    )
  }
}
