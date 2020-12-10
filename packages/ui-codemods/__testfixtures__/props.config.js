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

module.exports = {
  Modal: {
    '3.0.0': [
      { old: 'onReady', new: 'onOpen' },
      { old: 'isOpen', new: 'open' },
      { old: 'getDefaultFocusElement', new: 'defaultFocusElement' },
      { old: 'closeButtonVariant', new: null }
    ]
  },

  Overlay: {
    '3.0.0': [{ old: 'onRequestClose', new: 'onDismiss' }]
  },

  Popover: {
    '3.0.0': [
      { old: 'onReady', new: 'onShow' },
      { old: 'rootClose', new: 'shouldCloseOnDocumentClick' },
      { old: 'renderOffscreen', new: 'shouldRenderOffscreen' }
    ]
  },

  Position: {
    '3.0.0': [{ old: 'onReady', new: 'onPositioned' }]
  },

  TestComponent: {
    '3.0.0': [
      {
        old: 'isSquare',
        new: 'shape',
        values: [
          { old: true, new: 'square' },
          { old: false, new: 'circle' }
        ]
      },
      {
        old: 'alertType',
        new: 'shouldDisplayAlert',
        values: [
          { old: 'visible', new: true },
          { old: 'hidden', new: false },
          { old: 'screenreader' }
        ]
      },
      {
        old: 'errorCode',
        new: 'errorType',
        values: [
          { old: 0, new: 'low' },
          { old: 1, new: 'moderate' },
          { old: 2, new: 'severe' },
          { old: 3, new: 'critical' }
        ]
      },
      {
        old: 'testNull',
        new: 'testNull',
        values: [{ old: 'toNull', new: null }]
      }
    ]
  }
}
