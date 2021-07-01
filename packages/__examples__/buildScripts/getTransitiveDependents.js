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
const { getCommand } = require('@instructure/command-utils')
const execa = require('execa')
/**
 * npx lerna ls --scope @instructure/ui-view  --include-dependents
 * @example const packages = getTransitiveDependents(['ui-view'])
 * @param {string[]} packages - packages that are changed
 * @returns {string[]} the packages with their transitive dependents included
 */
async function getTransitiveDependents(packages) {
  const command = getCommand('lerna')
  const res = packages.map((pckg) => {
    return new Promise((resolve) => {
      resolve(
        execa(command.toString(), [
          'ls',
          '--scope',
          `@instructure/${pckg}`,
          '--include-dependents',
          '--json',
          '--loglevel',
          'silent'
        ])
      )
    })
  })

  return Promise.all(res).then((res) => {
    const a = res
      .map((x) => JSON.parse(x.stdout))
      .map((x) => {
        const results = x.map((xz) => {
          const [, packageName] = xz.name.split('/')

          return packageName
        })

        return results
      })
    const b = a
      .flat()
      .filter(Boolean)
      .filter((key) => key.startsWith('ui-'))

    return Array.from(new Set(b))
  })
}

// getTransitiveDependents(['ui-badge'])

module.exports = {
  getTransitiveDependents
}
