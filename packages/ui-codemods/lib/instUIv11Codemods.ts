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

import { Transform } from 'jscodeshift'
import instUICodemodExecutor from './utils/instUICodemodExecutor'
import { removeAsProp } from './removeAsFromInstUISettingsProvider'
import { renameCanvasThemes } from './renameCanvasThemesCodemod'
import { updateCodeEditor } from './updateCodeEditorImport'
import { removeMaxWidth } from './removeMaxWidthFromTag'

/**
 * Runs all InstUI v10 -> v11 upgrade codemods
 */
const InstUIv11Codemods: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  // TODO add other v11 codemods to this array
  return instUICodemodExecutor(
    [removeAsProp, renameCanvasThemes, updateCodeEditor, removeMaxWidth],
    file,
    api,
    options
  )
}

export default InstUIv11Codemods
