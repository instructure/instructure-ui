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

import { getJSDoc } from './getJSDoc'
import { getCodeDoc } from './getCodeDoc'
import { getReactDoc } from './getReactDoc'
import { getFrontMatter, MetaInfo } from './getFrontMatter'
import path from 'path'

export type Block = {
  type: 'doc' | 'single' | 'multi' | null
  line: number
  text: string
  raw: string
  description?: string
}

export type CodeDoc = {
  description: string | undefined
  sections?: Block[]
  undocumented?: boolean
  props?: any
  methods?: CodeMethod[]
}

export type CodeMethod = {
  name: string
  docblock: any
  modifiers: string[]
  params: any[]
}

export function parseDoc(
  resourcePath: string,
  source: string,
  errorHandler: (err: Error) => void
) {
  const extension = path.extname(resourcePath)
  const allowedExtensions = ['.js', '.ts', '.tsx']
  let doc: CodeDoc

  if (extension === '.md') {
    doc = { description: source }
  } else if (allowedExtensions.includes(extension)) {
    doc = getReactDoc(source, resourcePath, errorHandler) // ~18 secs
    if (!doc.props) {
      doc = getJSDoc(source, errorHandler) // ~37 secs
    }
  } else {
    doc = getCodeDoc(source, errorHandler) // ~<1 secs
  }

  // the YAML description in a JSDoc comment at the top of some files
  let frontMatter: MetaInfo
  try {
    frontMatter = getFrontMatter(doc.description)
  } catch (e) {
    throw `Failed to parse YAML "${doc.description}" \nexception is \n${e}`
  }
  return {
    ...doc,
    ...frontMatter
  }
}
