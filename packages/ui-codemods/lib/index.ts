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

import updateV10Breaking from './updateV10Breaking'
import instUIv11Codemods from './instUIv11Codemods'
import removeAsFromInstUISettingsProvider from './removeAsFromInstUISettingsProvider'
import { renameCanvasThemes } from './renameCanvasThemesCodemod'
import renameGetComputedStyleToGetCSSStyleDeclaration from './renameGetComputedStyleToGetCSSStyleDeclaration'
import warnTableCaptionMissing from './warnTableCaptionMissing'
import warnCodeEditorRemoved from './warnCodeEditorRemoved'
import migrateToNewIcons from './migrateToNewIcons'
import updateInstUIImportVersions from './updateInstUIImportVersions'
import multiVersionThemeVariablesCodemod from './multiVersionThemeVariablesCodemod/multiVersionThemeVariablesCodemod'

export {
  // Codemods for InstUI v9 -> v10
  updateV10Breaking,
  // Codemods for InstUI v10 -> v11
  instUIv11Codemods,
  removeAsFromInstUISettingsProvider,
  renameCanvasThemes,
  warnTableCaptionMissing,
  renameGetComputedStyleToGetCSSStyleDeclaration,
  warnCodeEditorRemoved,
  // Codemods for new theming/multi version (used by InstUI v11.7.2 and above)
  migrateToNewIcons,
  multiVersionThemeVariablesCodemod,
  updateInstUIImportVersions
}
