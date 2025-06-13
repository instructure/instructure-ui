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

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const ignoredPackages = ['__docs__']

function getChangedPackages() {
  try {
    const output = execSync('git diff --cached --name-only', {
      encoding: 'utf-8'
    })
    return Array.from(
      new Set(
        output
          .split('\n')
          .filter((line) => line.startsWith('packages/'))
          .map((line) => line.split('/')[1])
          .filter((pkg) => !ignoredPackages.includes(pkg))
      )
    )
  } catch (error) {
    console.error(error.message)
    return []
  }
}

function getAllPackages() {
  try {
    const packagesDir = path.resolve('packages')
    return fs
      .readdirSync(packagesDir)
      .filter(
        (pkg) =>
          fs.statSync(path.join(packagesDir, pkg)).isDirectory() &&
          !ignoredPackages.includes(pkg)
      )
  } catch (error) {
    console.error(error.message)
    return []
  }
}

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserOpts: {
    headerPattern: /^(\w*)\((\w*)\)-(\w*)\s(.*)$/,
    headerCorrespondence: ['type', 'scope', 'subject']
  },
  // https://commitlint.js.org/reference/rules.html
  rules: {
    'header-max-length': [0, 'always', 150], // 0 === rule is disabled
    'subject-max-length': [2, 'always', 150]
  },

  // https://cz-git.qbb.sh/config/
  prompt: {
    enableMultipleScopes: true,
    scopeEnumSeparator: ',',
    scopes: getAllPackages(),
    defaultScope: getChangedPackages(),
    skipQuestions: ['footerPrefix', 'confirmCommit'],
    // If more than 3 packages are selected display 'many', e.g. `refactor(many): some message`
    formatMessageCB: ({ scope, defaultMessage }) => {
      return scope.split(',').length > 3
        ? defaultMessage.replace(scope, 'many')
        : defaultMessage
    }
  }
}
