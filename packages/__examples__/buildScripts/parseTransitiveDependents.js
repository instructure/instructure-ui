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
const { getTransitiveDependents } = require('./getTransitiveDependents')
/**
 *  Returns the raw output from `lerna ls --scope @instructure/ui-view  --include-dependents`
 *  for all of the changed packages.
 *
 * @param {string[]} packages - packages to parse transitive dependents
 * @returns {Promise<[{name: string, version: string, private: boolean, location: string}]>}
 */
async function parseTransitiveDependents(packages = []) {
  const command = getCommand('lerna')

  try {
    const rawPackages = await Promise.all(
      packages.map((pckg) => {
        return execa(command.toString(), [
          'ls',
          '--scope',
          `@instructure/${pckg}`,
          '--include-dependents',
          '--json',
          '--loglevel',
          'silent'
        ])
      })
    )

    return rawPackages.map((output) => JSON.parse(output.stdout)).flat()
  } catch (error) {
    console.error(error)
    console.error('Possible undefined package given as input!')
    process.exit(error.exitCode)
  }
}

module.exports = {
  parseTransitiveDependents
}
