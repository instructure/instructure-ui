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

import { getJSDoc } from './getJSDoc.mjs'
import { getReactDoc } from './getReactDoc.mjs'
import { getFrontMatter } from './getFrontMatter.mjs'
import path from 'path'
import type { JsDocResult, YamlMetaInfo } from '../DataTypes.mjs'
import type { Documentation } from 'react-docgen'

export function parseDoc(
  resourcePath: string,
  source: Buffer,
  errorHandler: (err: Error) => void
): Documentation & YamlMetaInfo & JsDocResult | undefined {
  const extension = path.extname(resourcePath)
  let doc: Documentation | JsDocResult | undefined

  if (extension === '.md') {
    doc = { description: source as unknown as string}
  } else if (['.js', '.ts', '.tsx'].includes(extension)) {
    // parses React components
    doc = getReactDoc(source, resourcePath, errorHandler)
    if (!doc || !(doc as Documentation).props) {
      // parses JS modules
      doc = getJSDoc(resourcePath, errorHandler)
      if (!doc) {
        return
      }
    }
  } else {
    errorHandler(new Error('not allowed extension ' + extension))
    doc = { description: source as unknown as string}
  }
  // the YAML description in a JSDoc comment at the top of some files
  let frontMatter: YamlMetaInfo
  try {
    frontMatter = getFrontMatter(doc?.description)
  } catch (e) {
    throw `Failed to parse YAML "${doc?.description}" \nexception is \n${e}`
  }
  return {
    ...doc,
    ...frontMatter
  }
}
