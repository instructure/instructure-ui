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
const fs = require('fs')
const fse = require('fs-extra')

const yargsInteractive = require('yargs-interactive')

const { info, error } = require('@instructure/command-utils')

const createFromTemplate = require('../utils/createFromTemplate')
const promptContentName = require('../utils/promptContentName')

module.exports = async ({
  template, // path the the /template folder
  name, // e.g. 'myApp'
  path: sourcePath = process.cwd(), // the path where it will be created
  values: rawValues,
  copyConfigFiles = false
} = {}) => {
  let values = rawValues

  if (typeof values === 'string') {
    try {
      values = JSON.parse(values)
    } catch (err) {
      error(
        `Unable to parse the JSON provided for the \`values\` argument. Encountered the follwing error:\n${err}`
      )
      process.exit(1)
    }
  }

  const contentName = await promptContentName({ name })

  const destPath = path.join(sourcePath, contentName)

  if (fse.existsSync(destPath)) {
    info(
      `\`${destPath}\` already exists. If you choose to continue and overwrite it, it's existing contents may be lost.`
    )
    const { overwrite } = await yargsInteractive().interactive({
      interactive: { default: true },
      overwrite: {
        type: 'confirm',
        describe: 'Would you like to continue and overwrite it?'
      }
    })

    if (!overwrite) {
      process.exit(0)
    }

    // Remove the destination if it's a dir. If it's a file, it will just be overwritten
    // when the createFromTemplate func executes
    if (fse.statSync(destPath).isDirectory()) {
      fse.emptyDirSync(destPath)
      fse.rmdirSync(destPath)
    }
  }

  info(`Creating \`${contentName}\` in \`${sourcePath}\``)

  try {
    const generatedValues =
      typeof values === 'function' ? values({ name: contentName }) : values
    createFromTemplate({
      template, // template-XX/template folder
      dest: destPath,
      values: generatedValues
    })
  } catch (err) {
    error('Encountered an error generating source from the template: ', err)
    process.exit(1)
  }

  if (copyConfigFiles) {
    copyFilesFromDependency(
      '@instructure/ui-babel-preset',
      destPath,
      'babel-preset'
    )
    copyFilesFromDependency(
      '@instructure/ui-eslint-config',
      destPath,
      'eslint-config'
    )
    copyFilesFromDependency(
      '@instructure/ui-stylelint-config',
      destPath,
      'stylelint-config'
    )
    copyFilesFromDependency(
      '@instructure/ui-webpack-config',
      destPath,
      'webpack-config'
    )
  }
  info('Success!')
}

function copyFilesFromDependency(dependencyId, destPath, destFolder) {
  const fullDestPath = path.join(destPath, destFolder)
  if (!fs.existsSync(fullDestPath)) {
    fs.mkdirSync(fullDestPath)
  }
  // path to index.js in the dependency
  const dependencyPath = require.resolve(dependencyId)
  fse.copySync(path.dirname(dependencyPath), fullDestPath)
}
