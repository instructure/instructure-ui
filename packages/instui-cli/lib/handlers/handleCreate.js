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
const { handleCreateFromTemplate, handleCreatePackage } = require('@instructure/ui-scripts/lib/handlers')

module.exports = async ({ contentType, path: sourcePath, name }) => {
  const pkgPath = `@instructure/template-${contentType}/package.json`
  const version = require(pkgPath).version

  const templateDirname = 'template'
  const composeTemplatePath = pkgPath => path.join(path.dirname(pkgPath), templateDirname)

  const options = {
    template: composeTemplatePath(require.resolve(pkgPath)),
    path: sourcePath,
    name,
    values: {
      'NAME': name,
      'VERSION': version
    }
  }

  if (contentType === 'app') {
    handleCreateFromTemplate(options)
  } else if (contentType === 'package') {
    handleCreatePackage(options)
  }
}
