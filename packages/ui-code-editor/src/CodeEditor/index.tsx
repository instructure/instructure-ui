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
import { Component, createRef } from 'react'

import { testable } from '@instructure/ui-testable'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import {
  deprecated,
  passthroughProps,
  withDeterministicId
} from '@instructure/ui-react-utils'

import { withStyle, jsx, Global } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import CodeMirror from './codemirror'

import { propTypes, allowedProps } from './props'
import type { CodeEditorProps } from './props'
import type { EditorConfiguration } from 'codemirror'
import { Controlled } from 'react-codemirror2'

/**
---
category: components/deprecated
---
@tsProps
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@testable()
@deprecated(
  '[TBD]',
  null,
  'This component is deprecated and will be removed in a later version. Use <SourceCodeEditor /> instead, which is the wrapper for the newer version of the CodeMirror code editor.'
)
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
  private codeMirror
  ref
  editor

  constructor(props: CodeEditorProps) {
    super(props)
    this._id = props.deterministicId!()
    this.ref = createRef<HTMLDivElement>()
    this.editor = createRef<CodeMirror.Editor>()
    this.codeMirror = createRef<Controlled>()
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  focus() {
    if (this.codeMirror) {
      ;(this.codeMirror as unknown as HTMLElement).focus()
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
    const { value, label, attachment, readOnly, onChange, styles, ...rest } =
      this.props
    return (
      <div css={styles?.codeEditor} ref={this.ref}>
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
            ref={this.codeMirror}
            // @ts-expect-error hack:
            editorDidMount={(e) => (this.editor.current = e)}
            editorWillUnmount={() => {
              // @ts-expect-error hack:
              this.editor.current.display.wrapper.remove()
              if (this.codeMirror.current) {
                // @ts-expect-error hack:
                this.codeMirror.current.hydrated = false
              }
            }}
          />
        </label>
      </div>
    )
  }
}

export default CodeEditor
export { CodeEditor }
