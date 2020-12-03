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
const semver = require('semver')
const { getPackage } = require('@instructure/pkg-utils')
const { runCommandSync, error, info } = require('@instructure/command-utils')

const { argv } = process

try {
  installReact()
} catch (err) {
  error(err)
  process.exit(1)
}

async function installReact() {
  const pkgInfo = JSON.parse(
    runCommandSync('yarn', ['info', 'react', '--json'], [], { stdio: 'pipe' })
      .stdout
  ).data

  const latest = pkgInfo['dist-tags'].latest

  let version = `${argv[argv.indexOf('--install-react') + 1]}`.trim()
  version = semver.coerce(version) || latest

  info(`Version: ${version}`)

  let originalResolutions, pkg

  if ([15, 16].includes(semver.major(version))) {
    pkg = getPackage()
    originalResolutions = { ...pkg.get('resolutions') }

    pkg.set('resolutions', {
      ...(originalResolutions || {}),
      react: `^${version}`,
      'react-dom': `^${version}`
    })

    info(`Updating resolutions for React to ${version}...`)

    await pkg.serialize()
  }

  try {
    info(`Installing React...`)
    runCommandSync('yarn', ['--pure-lockfile', '--force'])
  } catch (err) {
    error(err)
    process.exit(1)
  }

  runCommandSync('yarn', ['list', 'react'])

  if (pkg) {
    info(`Resetting resolutions...`)
    pkg.refresh()
    pkg.set('resolutions', originalResolutions)
    await pkg.serialize()
  }
}
