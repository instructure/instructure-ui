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

const { error, info } = require('@instructure/command-utils')
const { getPackageJSON } = require('@instructure/pkg-utils')

const sandboxHost = require('@codesandbox/common/lib/utils/host').default

const {
  gitHubRepoPattern,
  gitHubToSandboxUrl,
  sandboxUrl
} = require('@codesandbox/common/lib/utils/url-generator')

module.exports = ({ repo, username, branch, path: sourcePath }) => {
  let url = sandboxHost()

  if (repo && username) {
    url += sandboxUrl({
      git: {
        username,
        repo,
        branch,
        path: path.normalize(sourcePath)
      }
    })
  } else {
    const { repository } = getPackageJSON()
    const repoUrl = (repository || {}).url

    if (!repoUrl) {
      error('In order to open with codesandbox both the GitHub repo name and username should be provided to this command, or the `url` in the `repository` field in this app\'s package.json should be specified.')
      process.exit(1)
    }

    if (!gitHubRepoPattern.test(repoUrl)) {
      error('Currently only projects hosted on GitHub can be opened with codesandbox.')
      process.exit(1)
    }

    url += gitHubToSandboxUrl(repoUrl)
  }

  info(`Opening sandbox at the following url:\n${url}\n\nIf you get an error accessing the url or don't see your changes:\n  *  Ensure that your GitHub repo exists and is set to public\n  *  Ensure you have pushed any local changes`)

  open(url, { app: ['google chrome'] })
}
