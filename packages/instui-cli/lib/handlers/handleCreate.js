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
} = require('@instructure/ui-scripts/lib/handlers')

module.exports = async ({ contentType, path: sourcePath, name, initialVersion }) => {
  const pkgPath = require.resolve(`@instructure/template-${contentType}/package.json`)
  const pkg = require(pkgPath)

  const dependencies = formatDependencies({ dependencies: pkg.dependencies })
  const devDependencies = formatDependencies({ dependencies: pkg.devDependencies })

  const templateDirname = 'template'

  const template = path.join(path.dirname(pkgPath), templateDirname)

  if (contentType === 'app') {
    handleCreateFromTemplate({
      template,
      path: sourcePath,
      name,
      values: ({ name }) => ({
        'NAME': name,
        'DEPENDENCIES': dependencies,
        'DEV_DEPENDENCIES': devDependencies
      })
    })
  } else if (contentType === 'package') {
    handleCreatePackage({
      template,
      path: sourcePath,
      name,
      values: ({ name, version }) => ({
        'NAME': name,
        'VERSION': version,
        'DEPENDENCIES': dependencies,
        'DEV_DEPENDENCIES': devDependencies
      })
    })
  } else if (contentType === 'component') {
    await handleCreateComponent({
      componentTemplate: path.join(template, 'src', '{NAME}'),
      packageTemplate: template,
      path: sourcePath,
      name,
      values: ({ name, packageName, version }) => ({
        'NAME': name,
        'PACKAGE': packageName,
        'VERSION': version,
        'DEPENDENCIES': dependencies,
        'DEV_DEPENDENCIES': devDependencies
      })
    })
  }
}

const formatDependencies = ({ dependencies }) => {
  return Object.keys(dependencies).map((dependency) => `\t\t"${dependency}": "${dependencies[dependency]}"`).join(',\n')
}
