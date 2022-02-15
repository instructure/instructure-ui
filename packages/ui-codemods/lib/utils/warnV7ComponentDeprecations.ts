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

import type { Collection, JSCodeshift } from 'jscodeshift'
import {
  findElements,
  findImport,
  printWarning
} from '../helpers/v7PropsUpdateHelpers'

/**
 * Warns about the deprecation of DeprecatedButton, Media, MetricsList,
 * Position.Content, Position.Target, Progress components.
 */
export default function warnV7ComponentDeprecations(
  j: JSCodeshift,
  root: Collection,
  filePath: string
) {
  warnDeprecation(j, root, filePath, 'DeprecatedButton', [
    '@instructure/ui',
    '@instructure/ui-buttons'
  ])
  warnDeprecation(j, root, filePath, 'Media', [
    '@instructure/ui',
    '@instructure/ui-byline'
  ])
  warnDeprecation(j, root, filePath, 'MetricsList', [
    '@instructure/ui',
    '@instructure/ui-metric'
  ])
  const importName = findImport(j, root, 'Position', [
    '@instructure/ui',
    '@instructure/ui-position'
  ])
  if (importName) {
    findElements(filePath, j, root, importName + '.Content').forEach((path) => {
      printWarning(
        filePath,
        path.value.loc?.start.line,
        'Position.Content needs to be upgraded manually at line.'
      )
    })
    findElements(filePath, j, root, importName + '.Target').forEach((path) => {
      printWarning(
        filePath,
        path.value.loc?.start.line,
        'Position.Target needs to be upgraded manually at line.'
      )
    })
  }
  warnDeprecation(j, root, filePath, 'Progress', [
    '@instructure/ui',
    '@instructure/ui-progress'
  ])
}

function warnDeprecation(
  j: JSCodeshift,
  root: Collection,
  filePath: string,
  name: string,
  importPath: string[]
) {
  const importName = findImport(j, root, name, importPath)
  if (importName) {
    findElements(filePath, j, root, importName).forEach((path) => {
      printWarning(
        filePath,
        path.value.loc?.start.line,
        name + ' needs to be upgraded manually.'
      )
    })
  }
}
