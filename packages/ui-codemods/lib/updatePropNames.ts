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

import fs from 'fs'
import path from 'path'
import formatSource from './utils/formatSource'
import requireUncached from './utils/requireUncached'
import replaceDeprecatedProps from './helpers/replaceDeprecatedProps'
import { API, FileInfo } from 'jscodeshift'

export default function updatePropNames(
  file: FileInfo,
  api: API,
  options: any
) {
  const j = api.jscodeshift
  const c = path.resolve(process.cwd(), options.config)
  const config: UpdatePropNamesOptions = fs.existsSync(c)
    ? requireUncached(c)
    : null

  if (!config) {
    throw new Error(`Invalid config file "${c}"`)
  }

  const root = j(file.source)
  let hasModifications = false

  hasModifications =
    replaceDeprecatedProps(file.path, j, root, config) || hasModifications

  return hasModifications ? formatSource(root.toSource(), file.path) : null
}

export type UpdatePropNamesOptions = {
  [ComponentNames: string]: {
    [versionNumber: string]: ComponentUpdateData[]
  }
}

export type ComponentUpdateData = {
  old: string
  new: string
  values: { old: string | boolean; new: string | null }[]
}
