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

import { execSync } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import pkgUtils from './pkg-utils/index.js'

/**
 * Adds a new versioned export entry (e.g. `./v11_9`) to every ui-* package's
 * package.json exports map by duplicating the current `./latest` entry.
 * Also updates `./latest` to point to the same value. Skips packages that
 * have no exports field or already contain the target version.
 *
 * @param {string} version - Semver string (e.g. "11.9.0")
 */
export const addNewExportsEntiresToPackageJSONs = async (version) => {
  const formattedVersion = `v${version.split('.').slice(0, 2).join('_')}`
  const packages = await pkgUtils.getDetailedPackageList()

  const res = packages.map(({ data, path }) => {
    //if no exports field, do nothing
    if (!data.exports) {
      return
    }
    //if the currently releasing version is already exists, do nothing
    if (data.exports[`./${formattedVersion}`]) {
      return
    }

    if (data.exports['./latest']) {
      const { ['./latest']: latest, ...withoutLatest } = data.exports

      return {
        data: {
          ...data,
          exports: {
            ...withoutLatest,
            [`./${formattedVersion}`]: latest,
            './latest': latest
          }
        },
        path
      }
    }
  })

  await Promise.all(
    res
      .filter(Boolean)
      .map(({ data, path }) =>
        writeFile(path, JSON.stringify(data, null, 2) + '\n')
      )
  )

  execSync('git add -A', { stdio: 'inherit' })
}
