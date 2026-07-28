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

/**
 * An oxlint JS-plugin that reimplements `eslint-plugin-notice`'s `notice/notice` rule
 * (https://oxc.rs/docs/guide/usage/linter/js-plugins.html) for this repo's exact config:
 *
 * ```js
 * 'notice/notice': ['error', { template: COPYRIGHT_NOTICE }]
 * ```
 *
 * this requires the file to start with the exact `COPYRIGHT_NOTICE` text - a
 * header that merely resembles the real one (e.g. a subtly reworded clause)
 * is treated as missing.
 *
 * Usage (in `.oxlintrc.json`):
 * ```json
 * {
 *   "jsPlugins": ["./scripts/oxlint/notice-plugin.mjs"],
 *   "rules": { "notice/notice": "error" }
 * }
 * ```
 */

export const COPYRIGHT_NOTICE = '/*\n' +
  ' * The MIT License (MIT)\n' +
  ' *\n' +
  ' * Copyright (c) 2015 - present Instructure, Inc.\n' +
  ' *\n' +
  ' * Permission is hereby granted, free of charge, to any person obtaining a copy\n' +
  ' * of this software and associated documentation files (the "Software"), to deal\n' +
  ' * in the Software without restriction, including without limitation the rights\n' +
  ' * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n' +
  ' * copies of the Software, and to permit persons to whom the Software is\n' +
  ' * furnished to do so, subject to the following conditions:\n' +
  ' *\n' +
  ' * The above copyright notice and this permission notice shall be included in all\n' +
  ' * copies or substantial portions of the Software.\n' +
  ' *\n' +
  ' * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
  ' * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n' +
  ' * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n' +
  ' * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n' +
  ' * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n' +
  ' * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n' +
  ' * SOFTWARE.\n' +
  ' */'

/**
 * Pure rule logic, independent of oxlint's context/AST shape, so it can be unit-tested directly.
 */
export function hasNoticeHeader(sourceText) {
  return String(sourceText).replace(/\r\n/g, '\n').startsWith(COPYRIGHT_NOTICE)
}

/**
 * Prepends the real MIT header to `sourceText`. Mirrors eslint-plugin-notice's default
 * `onNonMatchingHeader: "prepend"` behavior - always inserted at the very start of the file.
 */
export function insertNoticeHeader(sourceText) {
  return COPYRIGHT_NOTICE + '\n' + sourceText
}

const plugin = {
  meta: {
    name: 'notice',
    version: '1.0.0'
  },
  rules: {
    notice: {
      meta: { fixable: 'code' },
      create(context) {
        return {
          Program(node) {
            const sourceCode = context.sourceCode
            const text = sourceCode.getText()
            if (hasNoticeHeader(text)) return
            context.report({
              node,
              message: 'Missing notice header',
              fix(fixer) {
                return fixer.insertTextBefore(node, COPYRIGHT_NOTICE + '\n')
              }
            })
          }
        }
      }
    }
  }
}

export default plugin
