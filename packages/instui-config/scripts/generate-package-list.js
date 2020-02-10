#!/usr/bin/env node

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

const path = require('path')
const semver = require('semver')
const { getPackageJSON } = require('@instructure/pkg-utils')
const { error } = require('@instructure/console')
const generatePackageList = require('@instructure/ui-upgrade-scripts/lib/utils/generate-package-list')

try {
  const { version } = getPackageJSON()

  // Any package list changes will always apply to the next major version. We take
  // the current version, and run `semver.inc` which will increase it by one major version.
  // Use that version to determine where the generated package list should live
  const pkgListDir = `v${semver.coerce(semver.inc(version, 'major')).major}`

  generatePackageList({ outputDir: path.join(process.cwd(), 'package-lists', pkgListDir )})
} catch (err) {
  error(err)
  process.exit(1)
}
