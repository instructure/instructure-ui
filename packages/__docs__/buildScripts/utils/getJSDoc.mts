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

// @ts-ignore no typing :(
import jsdoc from 'jsdoc-api'
import type { JsDocResult } from '../DataTypes.mjs'

export function getJSDoc(source: Buffer, error: (err: Error) => void) {
  // note: JSDoc seems to be abandoned, we should use TypeScript:
  // https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
  let doc: Partial<JsDocResult> = {}
  try {
    // JSDoc only creates these sections if the file has a @module or @namespace annotation
    let sections: JsDocResult[] = jsdoc
      .explainSync({
        // note: Do not use cache:true here, its buggy
        configure: './jsdoc.config.json',
        source
      })
      sections = sections.filter((section) => {
        return (
          section.undocumented !== true &&
          section.access !== 'private' &&
          section.kind !== 'package'
        )
      })
    const module =
      sections.filter((section) => section.kind === 'module')[0] ||
      sections[0] ||
      {}
    if (process.platform === 'win32' && module.description) {
      // JSDoc bug https://github.com/jsdoc/jsdoc/issues/2067
      module.description = module.description.replace(/\r/g, "\r\n")
    }
    doc = {
      ...module,
      undocumented: sections.length <= 0
    }
  } catch (err: any) {
    error(err)
  }
  return doc
}
