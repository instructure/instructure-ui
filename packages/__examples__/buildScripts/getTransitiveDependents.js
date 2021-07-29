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
 * @typedef {Object} Package
 * @property {string} package.name - name of the package
 *
 * @param {Package[]} packages - packages that are changed
 * @returns {string[]} the packages with their transitive dependents included
 * @module getTransitiveDependents
 * @private
 */
function getTransitiveDependents(packages) {
  const parsedOutput = packages.map((pckg) => {
    const [, packageName] = pckg.name.split('/')

    return packageName
  })

  const uiPackages = parsedOutput
    .filter(Boolean)
    .filter((key) => key.startsWith('ui-'))

  // remove duplicates
  return Array.from(new Set(uiPackages))
}

module.exports = {
  getTransitiveDependents
}
