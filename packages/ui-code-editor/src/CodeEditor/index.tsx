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

import { testable } from '@instructure/ui-testable'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { passthroughProps, withSSR } from '@instructure/ui-react-utils'

import { withStyle, jsx, Global } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import CodeMirror from './codemirror'

import { propTypes, allowedProps } from './props'
import type { CodeEditorProps } from './props'
import type { EditorConfiguration } from 'codemirror'

import { hashInstance } from '@instructure/ui-utils'

/**
---
category: components
---
@tsProps
**/
@withSSR()
@withStyle(generateStyle, generateComponentTheme)
@testable()
class CodeEditor extends Component<CodeEditorProps> {
  static readonly componentId = 'CodeEditor'
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    language: 'jsx',
    readOnly: false,
    options: {
      styleActiveLine: true
    }
  }
  private readonly _id: string
  private codeMirror: CodeMirror | null = null
  ref: Element | null = null

  constructor(props: CodeEditorProps) {
    super(props)
    //@ts-expect-error props.ssr
    this._id = hashInstance('CodeEditor', this.props.ssr)
  }

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  focus() {
    if (this.codeMirror) {
      ;((this.codeMirror as unknown) as HTMLElement).focus()
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

  get options(): EditorConfiguration {
    return {
      ...this.props.options,
      readOnly: this.props.readOnly,
      mode: this.mode,
      extraKeys: this.props.readOnly ? { Tab: false, 'Shift-Tab': false } : {}
    }
  }

  render() {
    const {
      value,
      label,
      attachment,
      readOnly,
      onChange,
      styles,
      ...rest
    } = this.props
    return (
      <div css={styles?.codeEditor} ref={this.handleRef}>
        <Global styles={styles?.globalStyles} />
        <label htmlFor={this._id}>
          <ScreenReaderContent>{label}</ScreenReaderContent>
          <CodeMirror
            {...passthroughProps(rest)}
            // @ts-expect-error we should delete this..
            id={this._id}
            options={this.options}
            value={value!}
            onBeforeChange={(_editor, _data, value) => {
              onChange?.(value)
            }}
            ref={(el) => {
              this.codeMirror = el ? el : null
            }}
          />
        </label>
      </div>
    )
  }
}

export default CodeEditor
export { CodeEditor }
