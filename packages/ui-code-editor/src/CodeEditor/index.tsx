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

/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import { testable } from '@instructure/ui-testable'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { uid } from '@instructure/uid'
import { passthroughProps } from '@instructure/ui-react-utils'

import { withStyle, jsx, Global } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import CodeMirror from './codemirror'
type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  label: string
  language?:
    | 'sh'
    | 'js'
    | 'json'
    | 'javascript'
    | 'jsx'
    | 'shell'
    | 'css'
    | 'html'
    | 'markdown'
    | 'yaml'
    | 'yml'
    | 'bash'
  readOnly?: boolean
  onChange?: (...args: any[]) => any
  options?: any
  attachment?: 'bottom' | 'top'
  value?: string
}

/**
---
category: components
---
**/

@withStyle(generateStyle, generateComponentTheme, ['attachment'])
@testable()
class CodeEditor extends Component<Props> {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
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
    onChange: () => {},
    attachment: undefined,
    value: undefined
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'props' is declared but its value is never read.
  constructor(props) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'CodeEditor'... Remove this comment to see the full error message
    this._id = uid('CodeEditor')
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'codeMirror' does not exist on type 'Code... Remove this comment to see the full error message
    if (this.codeMirror) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'codeMirror' does not exist on type 'Code... Remove this comment to see the full error message
      this.codeMirror.focus()
    }
  }

  get mode() {
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

  get options() {
    return {
      ...this.props.options,
      readOnly: this.props.readOnly,
      mode: this.mode
    }
  }

  render() {
    const { value, label, attachment, readOnly, onChange, styles, ...rest } =
      this.props

    return (
      <div css={styles.codeEditor}>
        <Global styles={styles.globalStyles} />
        {/* @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'CodeEditor'... Remove this comment to see the full error message */}
        <label htmlFor={this._id}>
          <ScreenReaderContent>{label}</ScreenReaderContent>
          <CodeMirror
            {...passthroughProps(rest)}
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'CodeEditor'... Remove this comment to see the full error message
            id={this._id}
            options={this.options}
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            value={value}
            // @ts-expect-error ts-migrate(6133) FIXME: 'editor' is declared but its value is never read.
            onBeforeChange={(editor, data, value) => {
              // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              onChange(value)
            }}
            ref={(el) => {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'codeMirror' does not exist on type 'Code... Remove this comment to see the full error message
              this.codeMirror = el
            }}
          />
        </label>
      </div>
    )
  }
}

export default CodeEditor
export { CodeEditor }
