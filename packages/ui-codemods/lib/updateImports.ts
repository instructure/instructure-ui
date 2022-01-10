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
import replaceDeprecatedImports from './helpers/replaceDeprecatedImports'
import type { API, FileInfo } from 'jscodeshift'
import { ParsedImport } from './utils/parseImport'

/**
 * updates imports to the new per-package or the metapackage syntax.
 * @param file Holds information about the currently processed file.
 * @param api This object exposes the jscodeshift library and helper functions from the runner.
 * @param options Contains all options that have been passed to runner
 * @returns {*|null} null if there was nothing to reformat
 */
export default function updateImports(file: FileInfo, api: API, options: any) {
  const j = api.jscodeshift
  const c = path.resolve(process.cwd(), options.config)
  let config:
    | ConfigObject
    | ((opts: { isMetaComponentPackageMigration: boolean }) => ConfigObject) =
    fs.existsSync(c) ? requireUncached(c) : null
  if (!config) {
    throw new Error(`Invalid config file "${c}", is this the correct path?`)
  }
  if (typeof config === 'function') {
    const configOptions = {
      isMetaComponentPackageMigration: options.isMetaComponentPackageMigration
    }
    config = config(configOptions)
  }
  const root = j(file.source)
  let hasModifications = false

  hasModifications =
    replaceDeprecatedImports(j, root, config, api) || hasModifications

  return hasModifications ? formatSource(root.toSource(), file.path) : null
}

export type ConfigObject = {
  transformDefaults: TransformObj
  transforms: Transform[]
}

export type TransformObj = {
  importType?: string
  importPath: string | ((path: string, parsedImport?: ParsedImport) => string)
  moduleName: string | ((path?: string) => string)
}

export type Transform = {
  where: {
    importPath?: string
    importPattern?: string
    packageName?: string
    packageNames?: string[]
    moduleName?: string
    moduleNames?: string[]
  }
  transform: TransformObj
}
