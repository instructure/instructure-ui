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
const fs = require('fs')
const ghpages = require('gh-pages')
const { getPackageJSON } = require('@instructure/pkg-util')

const { runCommandAsync } = require('./command')
const { error, info } = require('./logger')

const {
 GIT_REMOTE_URL,
 GIT_USERNAME,
 GIT_EMAIL
} = process.env

exports.publishGithubPages = async function publishGithubPages (config = {
  gh_pages_dir: '.',
  gh_pages_branch: 'gh-pages'
}) {
  if (!fs.existsSync(`${config.gh_pages_dir}`)) {
    error(`GH pages directory doesn't exist! Do you need to build the documentation?`)
    process.exit(1)
  }

  info(`📖   Deploying '${config.gh_pages_dir}' to Github pages...`)
  info(`📖   Repository: ${GIT_REMOTE_URL}...`)
  info(`📖   Branch: ${config.gh_pages_branch}...`)

  await runCommandAsync('touch', [`${config.gh_pages_dir}/.nojekyll`])

  if (config.gh_pages_cname) {
    await runCommandAsync('echo', [`"${config.gh_pages_cname}"`, '>>', `${config.gh_pages_dir}/CNAME`])
  }

  return new Promise((resolve, reject) => {
    ghpages.publish(config.gh_pages_dir, {
      branch: config.gh_pages_branch,
      repo: GIT_REMOTE_URL,
      user: {
        name: GIT_USERNAME,
        email: GIT_EMAIL
      }
    }, (err) => {
      if (err) {
        if (typeof reject === 'function') {
          reject(err)
        }
      } else {
        const { name, version } = getPackageJSON()
        info(`📖   Deployed version ${version} of the ${name} documentation...`)

        if (typeof resolve === 'function') {
          resolve()
        }
      }
    })
  })
}
