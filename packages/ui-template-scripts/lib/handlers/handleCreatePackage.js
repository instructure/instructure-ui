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

const yargsInteractive = require('yargs-interactive')
const { info, error } = require('@instructure/command-utils')
const Project = require('@lerna/project').Project

const handleCreateFromTemplate = require('./handleCreateFromTemplate')
const promptContentName = require('../utils/promptContentName')
const getWorkspacePaths = require('../utils/getWorkspacePaths')

module.exports = async ({ template, path, name, values } = {}) => {
  let inputPath = path

  const project = new Project(path)
  const version = project.version

  const packageName = await promptContentName({ name, contentType: 'package' })

  // No path provided, look at workspaces
  if (!inputPath) {
    inputPath = process.cwd()
    const workspacePaths = getWorkspacePaths({ path: inputPath })

    // Verify if there are any workspace paths available. If there aren't, we just go with cwd.
    if (workspacePaths.length > 0) {
      info(
        'The following paths were detected in the current workspace using the "workspaces" entry in your root package.json.'
      )

      const alternative = 'Other (manually enter an alternative location)'

      inputPath = (
        await yargsInteractive().interactive({
          interactive: { default: true },
          path: {
            type: 'list',
            describe: 'Choose a location for this package:',
            choices: [...workspacePaths, alternative]
          }
        })
      ).path

      if (inputPath === alternative) {
        error(
          'Note: you may need to modify the "workspaces" entry in your package.json to detect this package.'
        )
        inputPath = (
          await yargsInteractive().interactive({
            interactive: { default: true },
            path: {
              type: 'input',
              describe: 'Enter a location for this package:'
            }
          })
        ).path
      }
    }
  }

  handleCreateFromTemplate({
    template,
    path: inputPath,
    name: packageName,
    values: generateValues({ values, name: packageName, version })
  })
}

const generateValues = ({ values, name, version }) =>
  typeof values === 'function' ? values({ name, version }) : values
