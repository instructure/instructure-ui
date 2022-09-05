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

const {
  handleCreateComponent,
  handleCreateFromTemplate,
  handleCreatePackage
} = require('@instructure/ui-template-scripts/lib/handlers')

module.exports = async ({
  contentType, // e.g. 'package' or 'app'
  path: sourcePath, // the path where it will be created
  name, // e.g. 'myApp',
  formatInstructions
}) => {
  const pkgPath = require.resolve(
    `@instructure/template-${contentType}/package.json`
  )
  const pkg = require(pkgPath)

  const dependencies = formatDependencies(pkg.dependencies)
  const pkgDependencies = Object.assign({}, pkg.devDependencies)
  const devDependencies = formatDependencies(pkgDependencies)
  const peerDependencies = formatDependencies(pkg.peerDependencies)
  const tsDependencies = formatTsDependencies(
    pkg.dependencies,
    pkg.devDependencies
  )

  const template = path.join(path.dirname(pkgPath), 'template')

  if (contentType === 'package') {
    await handleCreatePackage({
      template,
      path: sourcePath,
      name,
      formatInstructions,
      values: ({ name, version }) => ({
        NAME: name,
        VERSION: version,
        DEPENDENCIES: dependencies,
        DEV_DEPENDENCIES: devDependencies,
        PEER_DEPENDENCIES: peerDependencies,
        TS_DEPENDENCIES: tsDependencies
      })
    })
  } else if (contentType === 'component') {
    await handleCreateComponent({
      componentTemplate: path.join(template, 'src', '{NAME}'),
      packageTemplate: template,
      path: sourcePath,
      name,
      formatInstructions,
      values: ({ name, packageName, version }) => ({
        NAME: name,
        STYLE_NAME: name.charAt(0).toLowerCase() + name.substring(1),
        PACKAGE: packageName,
        VERSION: version,
        DEPENDENCIES: dependencies,
        DEV_DEPENDENCIES: devDependencies,
        PEER_DEPENDENCIES: peerDependencies,
        TS_DEPENDENCIES: tsDependencies
      })
    })
  }
}

const formatDependencies = (dependencies) => {
  if (!dependencies) return ''
  return Object.keys(dependencies)
    .map((dependency) => `    "${dependency}": "${dependencies[dependency]}"`)
    .join(',\n')
}

const formatTsDependencies = (dependencies = {}, devDependencies = {}) => {
  const deps = { ...dependencies, ...devDependencies }
  const tsDeps = []

  Object.keys(deps).forEach((dependency) => {
    if (dependency.indexOf('@instructure/') > -1) {
      tsDeps.push(
        `    { "path": "../${dependency.replace(
          '@instructure/',
          ''
        )}/tsconfig.build.json" }`
      )
    }
  })

  return tsDeps.join(',\n')
}
