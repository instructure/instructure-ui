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
const { runCommandSync } = require('@instructure/command-utils')
const { getPackage } = require('./get-package')
const readPkgUp = require('read-pkg-up')
const path = require('path')

module.exports = function getPackages() {
  // This Prolog black magic was made by a Yarn developer:
  // yarn constraints query "workspace(Cwd), \+ workspace_field(Cwd, 'private', true), workspace_ident(Cwd, Ident)" --json
  // it will list add the public workspaces
  const result = runCommandSync(
    'yarn',
    [
      'constraints',
      'query',
      "workspace(Cwd), \\+ workspace_field(Cwd, 'private', true), workspace_ident(Cwd, Ident)",
      '--json'
    ],
    [],
    {
      stdio: 'pipe'
    }
  )
  const resultArr = result.stdout.split(/\r?\n/)
  const packageData = resultArr.map((jsonString) => {
    return JSON.parse(jsonString).Cwd
  })
  const rootPath = path.dirname(findRootPackagePath())
  return packageData.map((location) =>
    getPackage({ cwd: path.join(rootPath, location) })
  )
}

// returns the root package.json
function findRootPackagePath() {
  let rootPackage
  const parentPackage = readPkgUp.sync({ cwd: '..' })
  if (parentPackage) {
    rootPackage = parentPackage
  } else {
    rootPackage = readPkgUp.sync()
  }
  if (rootPackage.packageJson.name !== 'instructure-ui') {
    throw new Error(
      'could not find root package. Found only ' + rootPackage.packageJson.name
    )
  }
  return rootPackage.path
}
