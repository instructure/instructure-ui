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

import type { DocsTokens } from '../withStyleForDocs'
import type { AppStyle } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} tokens The theme's semantic and shared tokens.
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  _props: unknown,
  { semantics }: DocsTokens
): AppStyle => {
  const { spaceSm, spaceXl } = semantics.spacing
  return {
    app: {
      label: 'app',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      display: 'flex',
      position: 'relative',
      flexShrink: 1,
      flexGrow: 1
    },
    content: {
      label: 'app__content',
      flexShrink: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      width: '100%'
    },
    legacyVersionAlert: {
      label: 'app__legacyVersionAlert',
      flexShrink: 0,
      flexGrow: 0
    },
    hamburger: {
      label: 'app__hamburger',
      position: 'fixed',
      zIndex: 1,
      top: '1.25rem',
      insetInlineStart: '0.75rem'
    },
    inlineNavigation: {
      label: 'app__inlineNavigation',
      overflowY: 'auto',
      overflowX: 'hidden',
      minHeight: '100%',
      flexShrink: 0,
      borderInlineEndColor: semantics.color.stroke.muted,
      borderInlineEndWidth: semantics.borderWidth.sm,
      borderInlineEndStyle: 'solid'
    },
    skipToMainButton: {
      label: 'skipToMainButton',
      position: 'absolute',
      left: '-9999px',
      zIndex: 999,
      marginTop: '6px',
      opacity: 0,
      height: '60px',
      fontSize: '150%',
      '&:focus': {
        left: '11.5rem',
        transform: 'translateX(-50%)',
        opacity: 1
      }
    },
    globalStyles: {
      html: {
        height: '100%',
        fontSize: '100%'
      },
      body: {
        height: '100%',
        overflow: 'hidden',
        margin: 0,
        color: semantics.color.text.base,
        fontFamily: semantics.fontFamily.base,
        lineHeight: semantics.lineHeight.paragraph.base,
        fontWeight: semantics.fontWeight.body.base,
        background: semantics.color.background.container
      },
      code: {
        fontFamily: semantics.fontFamily.code,
        backgroundColor: '#eee',
        borderRadius: semantics.borderRadius.xs,
        padding: '0.125em'
      },
      'code[class^="lang-"]': {
        padding: '0.5em',
        display: 'block'
      },
      'h3 code': {
        margin: '0 0.5em 0 0'
      },
      'table code': {
        background: 'transparent',
        border: 'none'
      },
      blockquote: {
        display: 'block',
        background: semantics.color.background.container,
        padding: `${spaceSm} ${spaceXl}`,
        margin: `2.25rem ${spaceXl}`,
        borderTop: `${semantics.borderWidth.lg} ${'solid'} ${
          semantics.color.stroke.muted
        }`,
        borderBottom: `${semantics.borderWidth.lg} ${'solid'} ${
          semantics.color.stroke.muted
        }`
      }
    }
  }
}

export default generateStyle
