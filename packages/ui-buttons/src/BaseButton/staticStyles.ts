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

const staticStyles = {
  baseButton: {
    appearance: 'none',
    textDecoration: 'none' /* for links styled as buttons */,
    touchAction: 'manipulation',

    '&::-moz-focus-inner': {
      border: 0 /* removes default dotted focus outline in Firefox */
    },

    '*': {
      pointerEvents:
        'none' /* Ensures that button or link is always the event target */
    }
  },

  content: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'block',
    direction: 'inherit',
    userSelect: 'none',
    transition: 'background 0.2s, transform 0.2s'
  },

  children: {
    display: 'block'
  },

  iconSVG: {
    display: 'flex',
    alignItems: 'center'
  },

  childrenLayout: {
    display: 'flex',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: '100%',
    overflowX: 'visible',
    overflowY: 'visible',
    unicodeBidi: 'isolate'
  },

  iconOnly: {
    boxSizing: 'border-box',
    minWidth: '0.0625rem',
    flexShrink: 0,
    maxWidth: '100%',
    overflowX: 'visible',
    overflowY: 'visible',
    unicodeBidi: 'isolate'
  },

  iconWrapper: {
    boxSizing: 'border-box',
    minWidth: '0.0625rem',
    flexShrink: 0,
    maxWidth: '100%',
    overflowX: 'visible',
    overflowY: 'visible',
    unicodeBidi: 'isolate'
  },

  childrenWrapper: {
    boxSizing: 'border-box',
    minWidth: '0.0625rem',
    flexShrink: 1,
    maxWidth: '100%',
    overflowX: 'visible',
    overflowY: 'visible',
    unicodeBidi: 'isolate'
  }
}

export default staticStyles
export { staticStyles }
