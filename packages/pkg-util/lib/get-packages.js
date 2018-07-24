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
const readPkg = require('read-pkg')
const path = require('path')
const glob = require('glob')
const Package = require('@lerna/package')

module.exports = () => {
    const packageConfigs = getWorkspacePackagesConfig()
    const packages = []
    const globOpts = {
      cwd: process.cwd(),
      strict: true,
      absolute: true
    }

    const hasNodeModules = packageConfigs.some(cfg => cfg.indexOf('node_modules') > -1)
    const hasGlobStar = packageConfigs.some(cfg => cfg.indexOf('**') > -1)

    if (hasGlobStar) {
      if (hasNodeModules) {
        const message = 'An explicit node_modules package path does not allow globstars (**)'
        console.error(message)
        throw new Error(message)
      }

      globOpts.ignore = [
        // allow globs like "packages/**",
        // but avoid picking up node_modules/**/package.json
        '**/node_modules/**'
      ]
    }

    packageConfigs.forEach(globPath => {
      glob.sync(path.join(globPath, '/package.json'), globOpts)
        .forEach(globResult => {
          const packageConfigPath = path.normalize(globResult)
          const packageDir = path.dirname(packageConfigPath)
          const packageJson = readPkg.sync({ cwd: packageDir, normalize: false })
          packages.push(new Package(packageJson, packageDir))
        })
    })

    return packages
  }

  function getWorkspacePackagesConfig () {
    const pkgJSON = readPkg.sync(process.cwd()) || {}
    const { workspaces } = pkgJSON
    if (Array.isArray(workspaces)) {
      return workspaces
    } else if (workspaces && Array.isArray(workspaces.packages)) {
      return workspaces.packages
    } else {
      return ['packages/*']
    }
  }
