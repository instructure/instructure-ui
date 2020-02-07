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

const { getPackage } = require('@instructure/pkg-utils')
const { info, error, runCommandSync } = require('@instructure/command-utils')

const verifyPackageJson = require('./verify-package-json')

async function updateResolutions({ pkg, packages, path, version }) {
  const originalResolutions = { ...pkg.get('resolutions') }
  const packageResolutions = {}

  info(`${packages.length} packages to upgrade. Updating package.json resolutions...`)

  packages.forEach((packageName) => {
    try {
      let upgradeVersion = version
      if (!upgradeVersion) {
        const { stdout } = runCommandSync('yarn', ['info', `${packageName}`, 'dist-tags', '--json'], [], { stdio: 'pipe' })
        const { data } = JSON.parse(stdout)
        if (data) {
          upgradeVersion = data.latest
        }
      }
      packageResolutions[packageName] = upgradeVersion
    } catch (err) {
      error(err)
    }
  })

  pkg.set('resolutions', {
    ...(originalResolutions || {}),
    ...packageResolutions
  })

  await pkg.serialize()

  try {
    runCommandSync('yarn', ['--cwd', path])
  } catch (err) {
    error(err)
  }

  if (pkg) {
    pkg.refresh()
    pkg.set('resolutions', originalResolutions)
    await pkg.serialize()
  }
}

module.exports = function upgradePackages({ useResolutions = false, packageList = [], version, path, ignoreWorkspaceRootCheck, npmClient } = {}) {
  verifyPackageJson({ sourcePath: path })

  const pkg = getPackage({ cwd: path })

  const pkgDependencies = Object.keys(pkg.get('dependencies') || {})
  const pkgDevDependencies = Object.keys(pkg.get('devDependencies') || {})

  const dependencies = packageList.filter(pkg => pkgDependencies.includes(pkg))
  const devDependencies = packageList.filter(pkg => pkgDevDependencies.includes(pkg))

  const allDependencies = [...dependencies, ...devDependencies]

  if (allDependencies.length === 0) return

  if (useResolutions && npmClient == 'yarn') {
    info(`Updating resolutions in ${path}...`)
    return updateResolutions({ pkg, packages: allDependencies, path, version })
  } else {
    info(`Upgrading ${allDependencies} in ${path} to ${version || 'latest'}`)

    const mapVersion = dependencies => dependencies.map(dep => `${dep}@${version || 'latest'}`)

    try {
      if (npmClient === 'yarn') {
        const composeYarnArgs = args => ignoreWorkspaceRootCheck ? [...args, '--ignore-workspace-root-check'] : args

        runCommandSync('yarn', composeYarnArgs(['remove', ...allDependencies, '--cwd', path]))

        if (dependencies.length > 0) {
          runCommandSync('yarn', composeYarnArgs(['add', ...mapVersion(dependencies), '--cwd', path]))
        }

        if (devDependencies.length > 0) {
          runCommandSync('yarn', composeYarnArgs(['add', ...mapVersion(devDependencies), '--cwd', path, '--dev']))
        }
      } else if (npmClient === 'npm') {
        runCommandSync('npm', ['uninstall', '--prefix', path, ...allDependencies])

        if (dependencies.length > 0) {
          runCommandSync('npm', ['install', '--prefix', path, ...mapVersion(dependencies)])
        }

        if (devDependencies.length > 0) {
          runCommandSync('npm', ['install', '--save-dev', '--prefix', path, ...mapVersion(devDependencies)])
        }
      }
    } catch (err) {
      error(err)
    }
  }
}