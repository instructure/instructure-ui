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

import {
  cursorCharLeft,
  cursorCharRight,
  cursorGroupLeft,
  cursorGroupRight,
  cursorLineBoundaryBackward,
  cursorLineBoundaryForward,
  cursorSyntaxLeft,
  cursorSyntaxRight,
  deleteCharBackward,
  deleteCharForward,
  deleteGroupBackward,
  deleteGroupForward,
  deleteToLineEnd,
  deleteToLineStart,
  selectCharLeft,
  selectCharRight,
  selectGroupLeft,
  selectGroupRight,
  selectLineBoundaryBackward,
  selectLineBoundaryForward,
  selectSyntaxLeft,
  selectSyntaxRight
} from '@codemirror/commands'
import type { KeyBinding } from '@codemirror/view'

const rtlHorizontalArrowKeymap: KeyBinding[] = [
  // Left/Start/Forward
  {
    key: 'ArrowLeft',
    run: cursorCharRight,
    shift: selectCharRight,
    preventDefault: true
  },
  {
    key: 'Mod-ArrowLeft',
    mac: 'Alt-ArrowLeft',
    run: cursorGroupRight,
    shift: selectGroupRight
  },
  {
    key: 'Alt-ArrowLeft',
    mac: 'Ctrl-ArrowLeft',
    run: cursorSyntaxRight,
    shift: selectSyntaxRight
  },
  {
    mac: 'Cmd-ArrowLeft',
    run: cursorLineBoundaryForward,
    shift: selectLineBoundaryForward
  },
  {
    key: 'Home',
    run: cursorLineBoundaryForward,
    shift: selectLineBoundaryForward
  },

  // Right/End/Backward
  {
    key: 'ArrowRight',
    run: cursorCharLeft,
    shift: selectCharLeft,
    preventDefault: true
  },
  {
    key: 'Mod-ArrowRight',
    mac: 'Alt-ArrowRight',
    run: cursorGroupLeft,
    shift: selectGroupLeft
  },
  {
    key: 'Alt-ArrowRight',
    mac: 'Ctrl-ArrowRight',
    run: cursorSyntaxLeft,
    shift: selectSyntaxLeft
  },
  {
    mac: 'Cmd-ArrowRight',
    run: cursorLineBoundaryBackward,
    shift: selectLineBoundaryBackward
  },
  {
    key: 'End',
    run: cursorLineBoundaryBackward,
    shift: selectLineBoundaryBackward
  },

  // Delete/Backspace
  { key: 'Delete', run: deleteCharBackward },
  { key: 'Mod-Delete', mac: 'Alt-Delete', run: deleteGroupBackward },
  { key: 'Backspace', run: deleteCharForward, shift: deleteCharForward },
  { key: 'Mod-Backspace', mac: 'Alt-Backspace', run: deleteGroupForward },
  { mac: 'Mod-Delete', run: deleteToLineStart },
  { mac: 'Mod-Backspace', run: deleteToLineEnd }
]

export { rtlHorizontalArrowKeymap }
