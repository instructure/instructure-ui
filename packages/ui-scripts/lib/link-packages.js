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

const getPackages = require('@instructure/pkg-utils/lib/get-packages')

const { info, error } = require('./utils/logger')
const { runCommandAsync } = require('./utils/command')

info(
`This script checks for packages used by a consuming app and then sets up (or removes, if you pass the --unlink flag) a yarn link for each package that it does use.

Usage: yarn ui-scripts --link-packages ../path/to/app/that/consumes/lib [--unlink]`
)

const linkCommand = process.argv.includes('--unlink') ? 'unlink' : 'link'
const appDir = process.argv[3]

if (!appDir) fail("must provide a path to the app you want to set up links in")

linkPackages().catch(fail)

function fail(reason){
  error(reason)
  process.exit(1)
}

async function linkPackages () {
  const usedPackages = await getUsedPackages()
  return Promise.all(usedPackages.map(async pkg => {
    if (linkCommand === 'link') {
      await runCommandAsync('lerna', ['exec', '--scope', pkg.name, '--', 'yarn', linkCommand])
    }
    await runCommandAsync('yarn', [linkCommand, pkg.name, '--cwd', appDir])
    info(`${linkCommand}ing ${pkg.name} in ${appDir}`)
  }))
}

async function getUsedPackages() {
  const usedPackages = (await Promise.all(
    getPackages().map(async pkg => {
      let packageIsUsed = false
      try {
        const { stdout } = await runCommandAsync('yarn', ['why', pkg.name, '--cwd', appDir])
        info(stdout)
        packageIsUsed = stdout.includes(' Found')
      } catch (err) {
        info(`${pkg.name} is not used. ${err}`)
      }
      if (packageIsUsed) return pkg
    })
  )).filter(Boolean)
  return usedPackages
}
