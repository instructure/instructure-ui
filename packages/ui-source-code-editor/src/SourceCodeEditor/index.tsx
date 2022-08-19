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
import { merge, cloneDeep, isEqual } from 'lodash'

import { EditorSelection, EditorState, StateEffect } from '@codemirror/state'
import type { Transaction, TransactionSpec } from '@codemirror/state'
import {
  EditorView,
  highlightSpecialChars,
  highlightActiveLine,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  lineNumbers,
  highlightActiveLineGutter,
  keymap
} from '@codemirror/view'
import type { KeyBinding } from '@codemirror/view'
import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap
} from '@codemirror/autocomplete'
import {
  highlightSelectionMatches
  // Search feature is turned off for now, see note at keymaps
  // searchKeymap
} from '@codemirror/search'
import {
  indentSelection,
  defaultKeymap,
  indentWithTab,
  history,
  historyKeymap
} from '@codemirror/commands'
import { lintKeymap } from '@codemirror/lint'
import {
  indentOnInput,
  indentRange,
  indentUnit,
  StreamLanguage,
  bracketMatching,
  foldGutter,
  foldKeymap,
  defaultHighlightStyle,
  syntaxHighlighting,
  HighlightStyle
} from '@codemirror/language'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { markdown } from '@codemirror/lang-markdown'
import { json } from '@codemirror/lang-json'
import { shell } from '@codemirror/legacy-modes/mode/shell'
import { yaml } from '@codemirror/legacy-modes/mode/yaml'
// import { oneDarkTheme, oneDarkHighlightStyle } from '@codemirror/theme-one-dark'

import { testable } from '@instructure/ui-testable'
import {
  omitProps,
  passthroughProps,
  withDeterministicId
} from '@instructure/ui-react-utils'
import { requestAnimationFrame } from '@instructure/ui-dom-utils'
import type { RequestAnimationFrameType } from '@instructure/ui-dom-utils'

import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { rtlHorizontalArrowKeymap } from './customKeybinding'

import { propTypes, allowedProps } from './props'
import type { SourceCodeEditorProps } from './props'

/**
---
category: components
---
@tsProps
**/
@withDeterministicId()
@withStyle(generateStyle, generateComponentTheme)
@textDirectionContextConsumer()
@testable()
class SourceCodeEditor extends Component<SourceCodeEditorProps> {
  static readonly componentId = 'SourceCodeEditor'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    language: 'jsx',
    readOnly: false,
    editable: true,
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLine: false,
    highlightActiveLineGutter: false,
    lineWrapping: false,
    autofocus: false,
    spellcheck: false,
    rtlMoveVisually: true,
    indentOnLoad: false,
    indentWithTab: false,
    defaultValue: ''
  }

  private readonly _id: string

  ref: HTMLDivElement | null = null

  private _containerRef?: HTMLDivElement
  private _editorView?: EditorView

  private _raf: RequestAnimationFrameType[] = []

  private _newSelectionAfterValueChange?: EditorSelection

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  handleContainerRef = (el: HTMLDivElement | null) => {
    const { containerRef } = this.props

    this._containerRef = el || undefined

    if (typeof containerRef === 'function') {
      containerRef(el)
    }
  }

  private addAnimationFrame(callback?: FrameRequestCallback) {
    if (typeof callback === 'function') {
      this._raf.push(requestAnimationFrame(callback))
    }
  }

  private cancelAnimationFrames() {
    this._raf.forEach((request) => request.cancel())
    this._raf = []
  }

  public focus() {
    this.addAnimationFrame(() => {
      this._editorView?.focus()
    })
  }

  public get hasFocus() {
    return this._editorView?.hasFocus
  }

  public selectAll() {
    if (this._editorView) {
      this.addAnimationFrame(() => {
        this.dispatchViewSelection({
          anchor: 0,
          head: this.currentDocValue?.length
        })
      })
    }
  }

  public deselectAll() {
    if (this._editorView) {
      this.addAnimationFrame(() => {
        this.dispatchViewSelection({
          anchor: 0,
          head: 0
        })
      })
    }
  }

  public indentCurrentSelection() {
    this.addAnimationFrame(() => {
      if (this._editorView) {
        indentSelection({
          state: this._editorView.state,
          dispatch: (transaction) => {
            this._editorView?.update([transaction])
          }
        })
      }
    })
  }

  public indentAll() {
    this.addAnimationFrame(() => {
      if (this._editorView && this.currentDocValue) {
        this.indentCodeRange(0, this.currentDocValue.length)
      }
    })
  }

  private indentCodeRange(from: number, to: number) {
    this.addAnimationFrame(() => {
      if (this._editorView && this.currentDocValue) {
        this.dispatchViewChanges({
          changes: indentRange(this._editorView.state, from, to)
        })
      }
    })
  }

  // Attach state effects
  private dispatchViewEffects(effects?: TransactionSpec['effects']) {
    if (!this._editorView || !effects) return

    this._editorView.dispatch({ effects })
  }

  // Dispatch changes to the document
  private dispatchViewChanges({
    changes,
    selection,
    userEvent
  }: TransactionSpec) {
    if (!this._editorView || !changes) return

    this._editorView.dispatch({
      changes,
      ...(selection ? { selection } : undefined),
      ...(userEvent ? { userEvent } : undefined)
    })
  }

  // Select a portion of the document
  private dispatchViewSelection(selection?: TransactionSpec['selection']) {
    if (!this._editorView || !selection) return

    this._editorView.dispatch({ selection })
  }

  get currentDocValue() {
    return this._editorView?.state.doc
  }

  // when value is passed, the editor should be controlled
  get isControlled() {
    return typeof this.props.value === 'string'
  }

  constructor(props: SourceCodeEditorProps) {
    super(props)
    this._id = props.deterministicId!()
  }

  componentDidMount() {
    const { value, defaultValue, autofocus, indentOnLoad } = this.props

    this.props.makeStyles?.()

    const state = EditorState.create({
      doc: value || defaultValue,
      extensions: this.extensions
    })
    this._editorView = new EditorView({
      state,
      parent: this._containerRef
    })

    if (autofocus) {
      this.focus()
    }

    if (indentOnLoad) {
      this.indentAll()
    }
  }

  componentWillUnmount() {
    this._editorView?.destroy()

    this.cancelAnimationFrames()
  }

  componentDidUpdate(prevProps: SourceCodeEditorProps) {
    this.props.makeStyles?.()

    if (this._editorView) {
      if (this.props.value !== prevProps.value) {
        this.refreshEditorValue()
      }

      if (this.shouldUpdateExtensions(prevProps)) {
        this.refreshExtensions()
      }
    }
  }

  private shouldUpdateExtensions(prevProps: SourceCodeEditorProps) {
    const propsToObserve: (keyof SourceCodeEditorProps)[] = [
      'styles', // needed for theme update
      'themeOverride',
      'language',
      'readOnly',
      'editable',
      'lineNumbers',
      'highlightActiveLineGutter',
      'foldGutter',
      'lineWrapping',
      'autofocus',
      'spellcheck',
      'direction',
      'dir',
      'rtlMoveVisually',
      'indentOnLoad',
      'indentWithTab',
      'indentUnit',
      'highlightActiveLine',
      'attachment'
    ]

    for (const prop of propsToObserve) {
      if (!isEqual(this.props[prop], prevProps[prop])) {
        return true
      }
    }

    return false
  }

  get direction() {
    // comes from the `direction` prop and
    // falls back to the `dir` prop coming from the bidirectional decorator
    return this.props.direction || this.props.dir
  }

  get extensions() {
    const extensions = [
      ...this.baseExtensions,

      // our custom extensions
      this.languageExtension,
      this.onChangeExtension,
      this.focusListenerExtension,
      this.announceLineNumberExtension
    ]

    if (this.themeExtension) {
      extensions.push(this.themeExtension)
    }
    if (this.props.lineNumbers) {
      extensions.push(lineNumbers())
    }
    if (this.props.highlightActiveLine) {
      extensions.push(highlightActiveLine())
    }
    if (this.props.highlightActiveLineGutter) {
      extensions.push(highlightActiveLineGutter())
    }
    if (this.props.foldGutter) {
      extensions.push(foldGutter())
    }
    if (this.props.lineWrapping) {
      extensions.push(EditorView.lineWrapping)
    }
    if (this.props.editable === false) {
      extensions.push(EditorView.editable.of(false))
    }
    if (this.props.readOnly) {
      extensions.push(EditorState.readOnly.of(true))
    }
    if (this.props.spellcheck) {
      extensions.push(EditorView.contentAttributes.of({ spellcheck: 'true' }))
    }
    if (this.direction) {
      extensions.push(
        EditorView.contentAttributes.of({
          dir: this.direction
        })
      )
    }
    if (this.props.indentUnit) {
      extensions.push(indentUnit.of(this.props.indentUnit))
    }

    return extensions
  }

  get baseExtensions() {
    return [
      // The extensions are based on codemirrors basic setup from 'codemirror'.
      // It is recommended by CodeMirror, that if we want to configure
      // our editor more precisely, we have to copy the source
      // and adjust it as desired.
      highlightSpecialChars(),
      history(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightSelectionMatches(),
      indentOnInput(),

      keymap.of(this.keymaps)
    ]
  }

  get keymaps(): KeyBinding[] {
    // TODO: if more keymaps are added, list them in the docs as well (#Command keybinding)
    const keymaps: KeyBinding[] = [
      ...closeBracketsKeymap,
      ...this.commandKeybinding,
      ...historyKeymap,
      ...foldKeymap,
      ...completionKeymap,
      ...lintKeymap

      // TODO: style and include search & replace toolbar feature
      // Note: the search & replace toolbar is not styled.
      // If this feature is needed in the future, we need a decision about the styling.
      // For now we turned the feature off, since RCE doesn't need it.
      // ...searchKeymap
    ]

    if (this.props.indentWithTab) {
      keymaps.push(indentWithTab)
    }

    return keymaps
  }

  get commandKeybinding() {
    const { rtlMoveVisually } = this.props

    if (this.direction === 'rtl' && !rtlMoveVisually) {
      // we need to clone the original so that it doesn't get overridden
      return merge(
        cloneDeep(defaultKeymap),
        rtlHorizontalArrowKeymap
      ) as KeyBinding[]
    }

    return defaultKeymap
  }

  get themeExtension() {
    const { styles } = this.props

    if (!styles?.theme || !styles.highlightStyle) {
      return
    }

    const theme = EditorView.theme(styles?.theme)
    const highlightStyle = syntaxHighlighting(
      HighlightStyle.define(styles?.highlightStyle)
    )

    // see notes in props.ts
    // if (darkTheme) {
    //   theme = oneDarkTheme
    //   highlightStyle = syntaxHighlighting(oneDarkHighlightStyle)
    // }

    return [theme, highlightStyle]
  }

  get languageExtension() {
    const { language } = this.props

    switch (language) {
      case 'json':
        return json()
      case 'js':
      case 'jsx':
      case 'javascript':
        return javascript({ jsx: true, typescript: true })
      case 'html':
        return html({ matchClosingTags: true, autoCloseTags: true })
      case 'css':
        return css()
      case 'markdown':
        return markdown()
      case 'sh':
      case 'shell':
      case 'bash': // ????
        return StreamLanguage.define(shell)
      case 'yml':
      case 'yaml':
        return StreamLanguage.define(yaml)
      default:
        return javascript({ jsx: true, typescript: true })
    }
  }

  callOnChangeHandler(newValue: string) {
    const { onChange, value } = this.props

    this.addAnimationFrame(() => {
      if (typeof onChange === 'function' && newValue !== value) {
        onChange(newValue)
      }
    })
  }

  get onChangeExtension() {
    return EditorState.changeFilter.of((transaction: Transaction) => {
      if (!this._editorView) {
        return false
      }

      if (transaction.docChanged) {
        const newDoc = transaction.newDoc.toString()

        if (this.isControlled) {
          // the value will be changed by the onChange handler,
          // refreshEditorValue has to run first
          if (newDoc !== this.props.value) {
            this._newSelectionAfterValueChange = transaction.selection
            this.cancelAnimationFrames()
            this.callOnChangeHandler(newDoc)
            return false
          } else {
            return true
          }
        } else {
          this.callOnChangeHandler(newDoc)
        }
      }

      return true
    })
  }

  get focusListenerExtension() {
    const { onFocus, onBlur } = this.props

    return EditorView.updateListener.of((update) => {
      if (update.focusChanged && this._editorView) {
        if (this.hasFocus) {
          if (typeof onFocus === 'function') {
            onFocus()
          }
        } else {
          if (typeof onBlur === 'function') {
            onBlur()
          }
        }
      }
    })
  }

  get announceLineNumberExtension() {
    return EditorState.transactionExtender.of((tr) => {
      const selection = tr.selection
      const oldSelection = tr.startState.selection.main

      if (selection && selection.main.empty && oldSelection.empty) {
        const oldLine = tr.startState.doc.lineAt(oldSelection.head)
        const newLine = tr.newDoc.lineAt(selection.main.head)
        if (oldLine.number != newLine.number)
          return {
            effects: EditorView.announce.of(
              tr.startState.phrase('line ') + newLine.number + '.'
            )
          }
      }
      return null
    })
  }

  refreshExtensions() {
    this.dispatchViewEffects(StateEffect.reconfigure.of(this.extensions))
  }

  refreshEditorValue() {
    if (!this._editorView) return

    const { value } = this.props

    const currentValue = this._editorView.state.doc!.toString()

    if (value && currentValue !== value) {
      let userEvent
      const lengthDiff = value.length - currentValue.length

      // setting user events are needed for the autocomplete to work
      // (only these 2 events, autocomplete doesn't work on paste, etc.)
      if (lengthDiff === 1) {
        userEvent = 'input.type'
      } else if (lengthDiff === -1) {
        userEvent = 'delete.backward'
      }

      this.dispatchViewChanges({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: value || ''
        },
        selection: this._newSelectionAfterValueChange,
        userEvent: userEvent
      })
      this._newSelectionAfterValueChange = undefined
    }

    if (this.props.indentOnLoad) {
      this.indentAll()
    }
  }

  render() {
    const { label, styles, ...restProps } = this.props

    return (
      <div
        ref={this.handleRef}
        css={styles?.codeEditor}
        {...passthroughProps(
          omitProps(restProps, SourceCodeEditor.allowedProps)
        )}
      >
        <label htmlFor={this._id}>
          <ScreenReaderContent>{label}</ScreenReaderContent>
          <div
            ref={this.handleContainerRef}
            css={styles?.codeEditorContainer}
          />
        </label>
      </div>
    )
  }
}

export default SourceCodeEditor
export { SourceCodeEditor }
