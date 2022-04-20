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

import PropTypes from 'prop-types'

import type { TagStyle } from '@codemirror/language'

import { controllable } from '@instructure/ui-prop-types'

import type {
  PropValidators,
  CodeEditorTheme,
  OtherHTMLAttributes
} from '@instructure/shared-types'
import type {
  WithStyleProps,
  StyleObject,
  ComponentStyle
} from '@instructure/emotion'
import type { WithDeterministicIdProps } from '@instructure/ui-react-utils'
import type { BidirectionalProps } from '@instructure/ui-i18n'

type SourceCodeEditorOwnProps = {
  /**
   * The label text that screen readers will read when this component gets
   * focus.
   */
  label: string

  /**
   * The language to use (adds autocomplete and syntax highlighting).
   */
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

  /**
   * This disables editing of the editor content by the user and API calls.
   *
   * __Note:__ The editor is still focusable in readOnly mode. Read more at the [codemirror documentation](https://codemirror.net/6/docs/ref/#state.EditorState%5EreadOnly).
   */
  readOnly?: boolean

  /**
   * Controls whether the editor content DOM is editable.
   *
   * __Note:__ When set to false, the editor is not focusable.
   * (This doesn't affect API calls that change the editor content, e.g.: copy-paste,
   * even when those are bound to keys or buttons.) Read more at the [codemirror documentation](https://codemirror.net/6/docs/ref/#view.EditorView%5Eeditable).
   */
  editable?: boolean

  /**
   * Whether to display the line numbers in the gutter
   */
  lineNumbers?: boolean

  /**
   * Whether to show a fold status indicator before foldable lines (which can be clicked to fold or unfold the line)
   */
  foldGutter?: boolean

  /**
   * Whether to highlight gutter elements on the active line (visible only when a gutter is visible)
   */
  highlightActiveLineGutter?: boolean

  /**
   * Highlights the lines that have a cursor on them
   */
  highlightActiveLine?: boolean

  /**
   * Whether it should scroll or wrap for long lines. Defaults to false (scroll)
   */
  lineWrapping?: boolean

  /**
   * Whether the editor should focus itself on initialization
   */
  autofocus?: boolean

  /**
   * Whether spellcheck will be enabled on the input
   */
  spellcheck?: boolean

  /**
   * Whether the editor should auto-indent the code on this initial load
   * and when the `value` is changed
   */
  indentOnLoad?: boolean

  /**
   * When this feature is on, Tab and Shift-Tab will indent the code. By default, it is turned off, and tabbing will focus the next element in the tab order.
   *
   * __Note__: Even if this feature is on, pressing Escape before tabbing will not handle indentation and will handle focus instead.
   */
  indentWithTab?: boolean

  /**
   * Overrides the unit by which indentation happens (defaults to 2 spaces).
   * Should be a string consisting either entirely of spaces or entirely of tabs.
   */
  indentUnit?: string

  /**
   * Flips overall layout and selects base paragraph direction to be "LTR" or "RTL".
   */
  direction?: 'ltr' | 'rtl'

  /**
   * Whether horizontal cursor movement through "RTL" text is visual
   * (pressing the left arrow moves the cursor left) or logical
   * (pressing the left arrow moves to the next lower index in the string,
   * which is visually right in "RTL" text)
   */
  rtlMoveVisually?: boolean

  /**
   * The default value of the editor (in uncontrolled mode)
   */
  defaultValue?: string

  /**
   * The selected value for the controlled version
   * (needs an onChange handler to work)
   */
  value?: string

  /**
   * Called when the value of the component changes.
   */
  onChange?: (value: string) => void

  /**
   * Called when the editor receives focus
   */
  onFocus?: () => void

  /**
   * Called when the editor loses focus
   */
  onBlur?: () => void

  /**
   * Sets minor visual styles (border radius & top/bottom margin)
   */
  attachment?: 'bottom' | 'top'

  // TODO: discuss the future of the dark theme with the Design theme
  // We decided not to use the dark theme yet, the colors need to be configured
  // (e.g. color contrast)
  // Also, probably a `theme` oneOf prop would be better with more options
  // darkTheme?: boolean

  /**
   * provides a reference to the underlying html root element
   */
  elementRef?: (element: HTMLDivElement | null) => void

  /**
   * provides a reference to the html element of the editor's container
   */
  containerRef?: (element: HTMLDivElement | null) => void
}

type PropKeys = keyof SourceCodeEditorOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type SourceCodeEditorProps = SourceCodeEditorOwnProps &
  WithStyleProps<
    CodeEditorTheme,
    // The highlightStyle is a unique one, not compatible with our style syntax,
    // but isn't used for the css prop anyway
    Record<keyof SourceCodeEditorStyle, any>
  > &
  BidirectionalProps &
  OtherHTMLAttributes<SourceCodeEditorOwnProps> &
  WithDeterministicIdProps

type SourceCodeEditorStyle = ComponentStyle<
  'codeEditor' | 'codeEditorContainer'
> & {
  theme: StyleObject
  highlightStyle: TagStyle[]
}

const propTypes: PropValidators<PropKeys> = {
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
  editable: PropTypes.bool,
  lineNumbers: PropTypes.bool,
  foldGutter: PropTypes.bool,
  highlightActiveLineGutter: PropTypes.bool,
  highlightActiveLine: PropTypes.bool,
  lineWrapping: PropTypes.bool,
  autofocus: PropTypes.bool,
  spellcheck: PropTypes.bool,
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  rtlMoveVisually: PropTypes.bool,
  indentOnLoad: PropTypes.bool,
  indentWithTab: PropTypes.bool,
  indentUnit: PropTypes.string,
  defaultValue: PropTypes.string,
  value: controllable(PropTypes.string, 'onChange', 'defaultValue'),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  attachment: PropTypes.oneOf(['bottom', 'top']),
  // darkTheme: PropTypes.bool,
  elementRef: PropTypes.func,
  containerRef: PropTypes.func
}

const allowedProps: AllowedPropKeys = [
  'label',
  'language',
  'readOnly',
  'editable',
  'lineNumbers',
  'foldGutter',
  'highlightActiveLineGutter',
  'highlightActiveLine',
  'lineWrapping',
  'autofocus',
  'spellcheck',
  'direction',
  'rtlMoveVisually',
  'indentOnLoad',
  'indentWithTab',
  'indentUnit',
  'defaultValue',
  'value',
  'onChange',
  'onFocus',
  'onBlur',
  'attachment',
  // 'darkTheme',
  'elementRef',
  'containerRef'
]

export type { SourceCodeEditorProps, SourceCodeEditorStyle }
export { propTypes, allowedProps }
