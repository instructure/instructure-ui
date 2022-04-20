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

import { tags } from '@lezer/highlight'

import type { SourceCodeEditorTheme } from '@instructure/shared-types'
import type { SourceCodeEditorProps, SourceCodeEditorStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: SourceCodeEditorTheme,
  props: SourceCodeEditorProps
): SourceCodeEditorStyle => {
  const { attachment } = props

  const attachmentBorderRadius = {
    top: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    bottom: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  }

  const attachmentVariants = {
    top: {
      marginBottom: 0,
      marginTop: '0.25rem'
    },
    bottom: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      marginBottom: '0.25rem'
    }
  }

  return {
    codeEditor: {
      label: 'codeEditor',
      position: 'relative'
    },
    codeEditorContainer: {
      label: 'codeEditorContainer',
      borderColor: componentTheme?.borderColor,
      borderStyle: 'solid',
      borderWidth: componentTheme?.borderWidth,
      borderRadius: componentTheme.borderRadius,
      marginBottom: '1rem',
      ...(attachment && {
        ...attachmentVariants[attachment],
        ...attachmentBorderRadius[attachment]
      })
    },
    theme: {
      '&': {
        overflow: 'hidden',
        background: componentTheme.background,
        height: 'auto',
        fontFamily: componentTheme.fontFamily,
        fontSize: componentTheme.fontSize,
        color: componentTheme.color,
        border: 0,
        lineHeight: 1.4375,
        minHeight: '1.4375rem',
        borderRadius: componentTheme.borderRadius,
        ...(attachment && {
          ...attachmentBorderRadius[attachment]
        })
      },

      '&.cm-editor.cm-focused': {
        // Provide a simple default outline to make sure a focused
        // editor is visually distinct. Can't leave the default behavior
        // because that will apply to the content element, which is
        // inside the scrollable container and doesn't include the
        // gutters. We also can't use an 'auto' outline, since those
        // are, for some reason, drawn behind the element content, which
        // will cause things like the active line background to cover
        // the outline (#297).
        outline: `${componentTheme?.borderWidth} solid ${componentTheme?.focusBorderColor}`
      },

      '.cm-content': {
        padding: `${componentTheme.verticalPadding} 0`
      },

      '.cm-scroller': {
        fontFamily: componentTheme.fontFamily,
        lineHeight: 1.4375
      },

      '.cm-gutters': {
        background: componentTheme.gutterBackground,
        borderColor: componentTheme.borderColor
      },

      '.cm-line': {
        padding: `0 ${componentTheme.horizontalPadding}`
      },

      '.cm-selectionBackground': {
        background: 'transparent'
      },
      '.cm-focused .cm-selectionBackground': {
        background: '#d7d4f0'
      },

      '.cm-placeholder': {
        // for better contrast
        color: '#707070'
      }
    },

    highlightStyle: [
      /**
       * Copy of `defaultHighlightStyle` from '@codemirror/language'
       */
      // { tag: tags.meta, color: '#7a757a' },
      { tag: tags.link, textDecoration: 'underline' },
      { tag: tags.heading, textDecoration: 'underline', fontWeight: 'bold' },
      { tag: tags.emphasis, fontStyle: 'italic' },
      { tag: tags.strong, fontWeight: 'bold' },
      { tag: tags.strikethrough, textDecoration: 'line-through' },
      { tag: tags.keyword, color: '#708' },
      {
        tag: [
          tags.atom,
          tags.bool,
          tags.url,
          tags.contentSeparator,
          tags.labelName
        ],
        color: '#219'
      },
      { tag: [tags.literal, tags.inserted], color: '#164' },
      { tag: [tags.string, tags.deleted], color: '#a11' },
      // {
      //   tag: [tags.regexp, tags.escape, tags.special(tags.string)],
      //   color: '#e40'
      // },
      { tag: tags.definition(tags.variableName), color: '#00f' },
      { tag: tags.local(tags.variableName), color: '#30a' },
      // { tag: [tags.typeName, tags.namespace], color: '#085' },
      { tag: tags.className, color: '#167' },
      {
        tag: [tags.special(tags.variableName), tags.macroName],
        color: '#256'
      },
      { tag: tags.definition(tags.propertyName), color: '#00c' },
      { tag: tags.comment, color: '#940' },
      // { tag: tags.invalid, color: '#f00' },

      /**
       * Custom highlighting overrides
       * (where original colors don't have enough contrast against #fff
       * or active highlight background)
       */
      { tag: tags.meta, color: '#757075' },
      {
        tag: [tags.regexp, tags.escape, tags.special(tags.string)],
        color: '#d13b00'
      },
      { tag: [tags.typeName, tags.namespace], color: '#008051' },
      { tag: tags.invalid, color: '#e60000' }
    ]
  }
}

export default generateStyle
