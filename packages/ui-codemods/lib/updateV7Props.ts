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

import type { API, Collection, FileInfo, JSCodeshift } from 'jscodeshift'
import formatSource from './utils/formatSource'
import { findImport } from './helpers/v7PropsUpdateHelpers'
import updateV7ButtonsMisc from './utils/updateV7ButtonsMisc'
import updateV7ButtonsWithText from './utils/updateV7ButtonsWithText'
import updateV7ButtonsIconCircle from './utils/updateV7ButtonsIconCircle'
import updateV7ButtonsClose from './utils/updateV7ButtonsClose'
import UpdateV7ButtonsLink from './utils/UpdateV7ButtonsLink'
import updateV7Heading from './utils/updateV7Heading'
import updateV7Lists from './utils/updateV7Lists'

/**
 * Updates <Button> from the InstUI v7 syntax to the v8 syntax.
 * This script contains the codemods referenced in
 * https://instructure.design/v7/#button-upgrade-guide
 * It can handle if the button and its attributes are defined in JSX; if the
 * Button is imported via an alias (`import {Button as BBB}`) is OK too.
 * It cannot handle if props are added via the spread operator or programmatically.
 * @param file Holds information about the currently processed file.
 * @param api This object exposes the JSCodeshift library and helper functions
 *            from the runner.
 * @returns {*|null} null if there was nothing to reformat
 */
export default function updateV7Props(file: FileInfo, api: API) {
  const j = api.jscodeshift
  const root = j(file.source)
  const hasModifications = updateProps(j, root, file.path)
  return hasModifications ? formatSource(root.toSource(), file.path) : null
}

function updateProps(j: JSCodeshift, root: Collection, filePath: string) {
  const buttonImportName = findImport(j, root, 'Button', [
    '@instructure/ui-buttons',
    '@instructure/ui'
  ])
  if (buttonImportName) {
    updateV7ButtonsMisc(j, root, buttonImportName, filePath)
    updateV7ButtonsWithText(j, root, buttonImportName, filePath)
    updateV7ButtonsIconCircle(j, root, buttonImportName, filePath)
    UpdateV7ButtonsLink(j, root, buttonImportName, filePath)
  }
  const closeButtonImportName = findImport(j, root, 'CloseButton', [
    '@instructure/ui-buttons',
    '@instructure/ui'
  ])
  if (closeButtonImportName) {
    updateV7ButtonsClose(j, root, closeButtonImportName, filePath)
  }
  const headingUpdated = updateV7Heading(j, root, filePath)
  const listsUpdated = updateV7Lists(j, root, filePath)
  // TODO could be a better modification check...
  if (
    buttonImportName ||
    closeButtonImportName ||
    headingUpdated ||
    listsUpdated
  ) {
    return formatSource(root.toSource(), filePath)
  }
  return null
}
