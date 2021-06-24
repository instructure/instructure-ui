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
  name // e.g. 'myApp'
}) => {
  const pkgPath = require.resolve(
    `@instructure/template-${contentType}/package.json`
  )
  const pkg = require(pkgPath)

  const dependencies = formatDependencies(pkg.dependencies)
  const pkgDependencies = Object.assign({}, pkg.devDependencies)
  if (contentType === 'app') {
    mergeInDependencies(pkgDependencies, '@instructure/ui-babel-preset')
    mergeInDependencies(pkgDependencies, '@instructure/ui-eslint-config')
    mergeInDependencies(pkgDependencies, '@instructure/ui-stylelint-config')
    mergeInDependencies(pkgDependencies, '@instructure/ui-webpack-config')
  }
  const devDependencies = formatDependencies(pkgDependencies)

  const peerDependencies = formatDependencies({
    dependencies: pkg.peerDependencies
  })

  const template = path.join(path.dirname(pkgPath), 'template')

  if (contentType === 'app') {
    await handleCreateFromTemplate({
      template,
      path: sourcePath,
      name,
      values: ({ name }) => ({
        NAME: name,
        DEPENDENCIES: dependencies,
        DEV_DEPENDENCIES: devDependencies
      }),
      copyConfigFiles: true
    })
  } else if (contentType === 'package') {
    await handleCreatePackage({
      template,
      path: sourcePath,
      name,
      values: ({ name, version }) => ({
        NAME: name,
        VERSION: version,
        DEPENDENCIES: dependencies,
        DEV_DEPENDENCIES: devDependencies
      })
    })
  } else if (contentType === 'component') {
    await handleCreateComponent({
      componentTemplate: path.join(template, 'src', '{NAME}'),
      packageTemplate: template,
      path: sourcePath,
      name,
      values: ({ name, packageName, version }) => ({
        NAME: name,
        STYLE_NAME: name.charAt(0).toLowerCase() + name.substring(1),
        PACKAGE: packageName,
        VERSION: version,
        DEPENDENCIES: dependencies,
        DEV_DEPENDENCIES: devDependencies,
        PEER_DEPENDENCIES: peerDependencies
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

const mergeInDependencies = (currentDependencies, packageToMerge) => {
  const pkgPath = require.resolve(`${packageToMerge}/package.json`)
  const pkg = require(pkgPath)
  Object.assign(currentDependencies, pkg.dependencies)
}
