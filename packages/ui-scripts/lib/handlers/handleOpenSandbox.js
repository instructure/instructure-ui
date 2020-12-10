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
const open = require('open')

const { error, info, runCommandSync } = require('@instructure/command-utils')

const sandboxHost = require('@codesandbox/common/lib/utils/host').default
const { sandboxUrl } = require('@codesandbox/common/lib/utils/url-generator')

const parseGitUrl = require('git-url-parse')

module.exports = ({ branch, remote, path: sourcePath, scope }) => {
  if (!scope) {
    openSandbox({ branch, remote, sourcePath })
  } else {
    const result = runCommandSync('lerna', ['list', '--json'], [], {
      stdio: 'pipe'
    }).stdout
    const pkg = JSON.parse(result).find(({ name }) => name === scope)

    if (!pkg) {
      error(`No project found with the name ${scope}`)
      process.exit(1)
    }

    const { location } = pkg

    const appPath = path.relative(sourcePath, location)

    openSandbox({
      branch,
      remote,
      sourcePath: appPath
    })
  }
}

const openSandbox = ({ branch, remote, sourcePath }) => {
  const repository = runCommandSync(
    'git',
    ['config', '--get', `remote.${remote}.url`],
    [],
    { stdio: 'pipe' }
  ).stdout

  if (!repository) {
    error(
      'Could not find a git url corresponding to this project. In order to open with Codesandbox, your project should be hosted in a public GitHub repository.'
    )
    process.exit(1)
  }

  let parsedUrl = {}
  try {
    parsedUrl = parseGitUrl(repository)
  } catch {
    error(
      `Could not retrieve the information necessary to open in Codesandbox from the following git repository url: ${repository}.`
    )
    process.exit(1)
  }

  const url = `${sandboxHost()}${sandboxUrl({
    git: {
      username: parsedUrl.owner,
      repo: parsedUrl.name,
      branch,
      path: path.normalize(sourcePath)
    }
  })}`

  info(
    `Opening sandbox at the following url:\n${url}\n\nIf you get an error accessing the url or don't see your changes:\n  *  Ensure that your GitHub repo exists and is set to public\n  *  Ensure you have pushed any local changes`
  )

  open(url, { app: ['google chrome'] })
}
