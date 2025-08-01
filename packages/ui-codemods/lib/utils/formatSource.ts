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

import prettier from 'prettier'

export default function formatSource(source: string, sourcePath: string) {
  let options = null
  const extension = sourcePath.split('.').pop()
  let parser = 'babel'
  if (extension === 'ts' || extension === 'tsx') {
    parser = 'typescript'
  }
  try {
    options = prettier.resolveConfig.sync(sourcePath)
    if (options) {
      // Set the parser argument if the consumer did not set one to avoid a console warning
      options = {
        ...options,
        parser: options.parser || parser
      }
    }
  } catch (err) {
    // Will revert to the default prettier options if a config cannot be parsed
  }
  let result = source
  try {
    result = prettier.format(
      source,
      options || {
        parser: parser,
        semi: false,
        singleQuote: true,
        trailingComma: 'none'
      }
    )
  } catch (e) {
    console.warn('Prettier could not format the codemod result')
  }
  return result
}
