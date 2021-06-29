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
import { runCommandsConcurrently, getCommand } from '@instructure/command-utils'

export const lint = () => {
  const paths = process.argv.slice(2).filter((arg) => !arg.includes('--')) || []
  let jspaths = ['.']
  let csspaths = ['**/*.css']

  if (paths.length) {
    jspaths = paths.filter((path) => path.includes('.js'))
    csspaths = paths.filter((path) => path.includes('.css'))
  }

  const commands: Partial<
    Record<'eslint' | 'stylelint', ReturnType<typeof getCommand>>
  > = {}

  if (jspaths.length) {
    commands['eslint'] = getCommand('eslint', [
      ...jspaths,
      '--ext .js,.jsx,.ts,.tsx,js.ejs'
    ])
  }

  if (csspaths.length) {
    commands['stylelint'] = getCommand('stylelint', [
      ...csspaths,
      '--allow-empty-input'
    ])
  }

  process.exit(runCommandsConcurrently(commands).status)
}
