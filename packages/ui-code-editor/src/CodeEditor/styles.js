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

import { keyframes } from '@instructure/emotion'

// keyframes have to be outside of 'generateStyle',
// since it is causing problems in style recalculation
const blink = keyframes`
  0% {}
  50% { background-color: transparent; }
  100% {}`

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (componentTheme, props, state) => {
  const { attachment } = props

  const attachmentVariants = {
    top: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
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
      label: 'codeEditor'
    },
    globalStyles: {
      '.CodeMirror': {
        direction: 'ltr',
        position: 'relative',
        overflow: 'hidden',
        background: componentTheme.background,
        height: 'auto',
        fontFamily: componentTheme.fontFamily,
        fontSize: componentTheme.fontSize,
        borderRadius: componentTheme.borderRadius,
        border: componentTheme.border,
        color: componentTheme.color,
        lineHeight: 1.4375,
        minHeight: '1.4375rem',
        marginBottom: '1rem',
        ...attachmentVariants[attachment]
      },

      /* PADDING */

      '.CodeMirror-lines': {
        padding: `${componentTheme.verticalPadding} 0`,
        cursor: 'text',
        minHeight: '0.0625rem'
      },
      '.CodeMirror pre': {
        padding: `0 ${componentTheme.horizontalPadding}`,
        borderRadius: '0',
        borderWidth: '0',
        background: 'transparent',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        margin: '0',
        whiteSpace: 'pre',
        wordWrap: 'normal',
        lineHeight: 'inherit',
        color: 'inherit',
        zIndex: `calc(${componentTheme.zIndex} + 3)`,
        position: 'relative',
        overflow: 'visible',
        WebkitTapHighlightColor: 'transparent',
        fontVariantLigatures: 'contextual'
      },
      '.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler': {
        background: componentTheme.background
      },

      /* CURSOR */

      '.CodeMirror-cursor': {
        borderLeft: `0.0625rem solid ${componentTheme.cursorColor}`,
        borderRight: 'none',
        width: '0',
        position: 'absolute',
        pointerEvents: 'none'
      },
      '.CodeMirror-cursors': {
        visibility: 'hidden',
        position: 'relative',
        zIndex: `calc(${componentTheme.zIndex} + 4)`
      },
      '.CodeMirror-dragcursors': { visibility: 'visible' },
      '.CodeMirror-focused .CodeMirror-cursors': { visibility: 'visible' },
      '.CodeMirror-crosshair': { cursor: 'crosshair' },
      '.cm-fat-cursor .CodeMirror-cursor': {
        width: 'auto',
        border: '0 !important',
        background: componentTheme.fatCursorBackground
      },
      '.cm-fat-cursor .CodeMirror-cursors': {
        zIndex: `calc(${componentTheme.zIndex} + 2)`
      },
      '.CodeMirror .CodeMirror-secondarycursor': {
        borderLeft: `0.0625rem solid ${componentTheme.secondaryCursorColor}`
      },
      '.cm-fat-cursor-mark': {
        background: componentTheme.fatCursorMarkBackground,
        animation: `${blink} 1.06s steps(1) infinite`
      },
      '.cm-animate-fat-cursor': {
        width: 'auto',
        border: '0',
        animation: `${blink} 1.06s steps(1) infinite`,
        backgroundColor: componentTheme.fatCursorBackground
      },
      '.cm-tab': { display: 'inline-block', textDecoration: 'inherit' },
      '.CodeMirror-rulers': {
        position: 'absolute',
        left: '0',
        right: '0',
        top: '-50px',
        bottom: '-20px',
        overflow: 'hidden'
      },
      '.CodeMirror-ruler': {
        borderLeft: `0.0625rem solid ${componentTheme.rulerColor}`,
        top: '0',
        bottom: '0',
        position: 'absolute'
      },
      'div.CodeMirror span.CodeMirror-matchingbracket': {
        outline: `0.0625rem solid ${componentTheme.matchingBracketOutline}`
      },
      'div.CodeMirror span.CodeMirror-nonmatchingbracket': {
        color: componentTheme.nonMatchingBracketColor
      },
      '.CodeMirror-matchingtag': {
        background: componentTheme.matchingTagBackground
      },
      'div.CodeMirror-activeline-background': {
        background: componentTheme.activeLineBackground
      },
      '.CodeMirror-scroll': {
        overflow: 'scroll !important',
        marginBottom: '-30px',
        marginRight: '-30px',
        paddingBottom: '30px',
        height: '100%',
        outline: 'none',
        position: 'relative'
      },
      '.CodeMirror-sizer': {
        position: 'relative',
        borderRight: '30px solid transparent'
      },
      '.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler': {
        position: 'absolute',
        zIndex: `calc(${componentTheme.zIndex} + 7)`,
        display: 'none'
      },
      '.CodeMirror-vscrollbar': {
        right: '0',
        top: '0',
        overflowX: 'hidden',
        overflowY: 'scroll'
      },
      '.CodeMirror-hscrollbar': {
        bottom: '0',
        left: '0',
        overflowY: 'hidden',
        overflowX: 'scroll'
      },
      '.CodeMirror-scrollbar-filler': { right: '0', bottom: '0' },
      '.CodeMirror-gutter-filler': { left: '0', bottom: '0' },

      /* GUTTER */

      '.CodeMirror-gutters': {
        borderTopLeftRadius: componentTheme.borderRadius,
        borderBottomLeftRadius: componentTheme.borderRadius,
        borderRight: `0.0625rem solid ${componentTheme.gutterBorder}`,
        overflow: 'hidden',
        background: componentTheme.gutterBackground,
        whiteSpace: 'nowrap',
        position: 'absolute',
        left: '0',
        top: '0',
        minHeight: '100%',
        zIndex: `calc(${componentTheme.zIndex} + 4)`
      },
      '.CodeMirror-linenumber': {
        padding: '0 0.1875rem 0 0.3125rem',
        minWidth: '1.25rem',
        textAlign: 'right',
        color: componentTheme.lineNumberColor,
        whiteSpace: 'nowrap'
      },
      '.CodeMirror-guttermarker': { color: componentTheme.gutterMarkerColor },
      '.CodeMirror-guttermarker-subtle': {
        color: componentTheme.gutterMarkerSubtleColor
      },
      '.CodeMirror-gutter': {
        whiteSpace: 'normal',
        height: '100%',
        display: 'inline-block',
        verticalAlign: 'top',
        marginBottom: '-30px'
      },
      '.CodeMirror-gutter-wrapper': {
        position: 'absolute',
        zIndex: `calc(${componentTheme.zIndex} + 5)`,
        background: 'none !important',
        border: 'none !important'
      },
      '.CodeMirror-gutter-background': {
        position: 'absolute',
        top: '0',
        bottom: '0',
        zIndex: `calc(${componentTheme.zIndex} + 5)`
      },
      '.CodeMirror-gutter-elt': {
        position: 'absolute',
        cursor: 'default',
        zIndex: `calc(${componentTheme.zIndex} + 5)`
      },
      '.CodeMirror-gutter-wrapper ::selection': {
        backgroundColor: 'transparent'
      },
      '.CodeMirror-wrap pre': {
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        wordBreak: 'normal'
      },
      '.CodeMirror-linebackground': {
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        zIndex: `calc(${componentTheme.zIndex} + 1)`
      },
      '.CodeMirror-linewidget': {
        position: 'relative',
        zIndex: `calc(${componentTheme.zIndex} + 3)`,
        padding: '0.1px'
      },
      '.CodeMirror-rtl pre': { direction: 'rtl' },
      '.CodeMirror-code': { outline: 'none' },
      '.CodeMirror-scroll, .CodeMirror-sizer, .CodeMirror-gutter, .CodeMirror-gutters, .CodeMirror-linenumber': {
        boxSizing: 'content-box'
      },
      '.CodeMirror-measure': {
        position: 'absolute',
        width: '100%',
        height: '0',
        overflow: 'hidden',
        visibility: 'hidden'
      },
      '.CodeMirror-measure pre': { position: 'static' },
      '.CodeMirror-selected, .CodeMirror-focused .CodeMirror-selected, .CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection': {
        background: componentTheme.selectedBackground
      },
      '.cm-searching': { background: componentTheme.searchingBackground },
      '.cm-force-border': { paddingRight: '0.1px' },
      '@media print': {
        '.CodeMirror .CodeMirror-cursors': { visibility: 'hidden' }
      },
      '.cm-tab-wrap-hack::after': { content: '""' },
      '.CodeMirror-selectedtext': { background: 'none' },
      '.CodeMirror-focused': {
        boxShadow: componentTheme.focusBoxShadow,
        borderColor: componentTheme.focusBorderColor
      },

      /* THEME */

      '.cm-keyword': {
        color: componentTheme.keywordColor,
        fontWeight: 'bold'
      },
      '.cm-atom': { color: componentTheme.atomColor },
      '.cm-number': { color: componentTheme.numberColor },
      '.cm-def': { color: componentTheme.defColor },
      'span.cm-variable-2,   span.cm-tag': { color: componentTheme.tagColor },
      'span.cm-variable-3,   span.cm-def,   span.cm-type': {
        color: componentTheme.typeColor
      },
      '.cm-variable': { color: componentTheme.variableColor },
      '.cm-property': { color: componentTheme.propertyColor },
      '.cm-qualifier': { color: componentTheme.qualifierColor },
      '.cm-operator': { color: componentTheme.operatorColor },
      '.cm-comment': {
        color: componentTheme.commentColor,
        fontWeight: 'normal'
      },
      '.cm-string': {
        color: componentTheme.stringColor,
        fontStyle: 'italic'
      },
      '.cm-string-2': { color: componentTheme.secondaryStringColor },
      '.cm-meta': { color: componentTheme.metaColor },
      '.cm-builtin': { color: componentTheme.builtInColor },
      '.cm-tag': { color: componentTheme.tagColor },
      '.cm-attribute': { color: componentTheme.attributeColor },
      '.cm-header': { color: componentTheme.headerColor },
      '.cm-hr': { color: componentTheme.hrColor },
      '.cm-link': {
        color: componentTheme.linkColor,
        fontStyle: 'italic',
        textDecoration: 'none'
      },
      '.cm-error': {}
    }
  }
}

export default generateStyle
