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

const { error } = require('@instructure/command-utils')
const getInstuiConfigPaths = require('./getInstuiConfigPaths')

const getPackageListPaths = ({ version } = {}) => getInstuiConfigPaths({
  type: 'package-lists',
  name: 'package-list.json',
  version
})

exports.getPackageList = ({ version } = {}) => {
  const packageListPaths = getPackageListPaths({ version })

  if (packageListPaths && packageListPaths.length > 0) {
    try {
      const packageList = require(packageListPaths[packageListPaths.length - 1])
      return packageList
    } catch (err) {
      error(err)
    }
  }

  return []
}

exports.getRemovedPackageList = ({ version } = {}) => {
  const packageListPaths = getPackageListPaths({ version })

  if (packageListPaths && packageListPaths.length > 1) {
    const removedPackageList = []
    try {
      for (let i = 0; i < packageListPaths.length - 1; i++) {
        const packageList = require(packageListPaths[i])
        const nextPackageList = require(packageListPaths[i + 1])

        packageList.forEach((pkg) => {
          if (!nextPackageList.includes(pkg)) {
            removedPackageList.push(pkg)
          }
        })
      }
      return removedPackageList
    } catch (err) {
      error(err)
    }
  }

  return []
}
