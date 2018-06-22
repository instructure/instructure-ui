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

const ghpages = require('gh-pages')
const { runCommandAsync } = require('./command')
const { getPackageJSON } = require('./get-package')
const { error, info } = require('./logger')
const fs = require('fs')

const {
 GH_PAGES_DIR,
 GH_PAGES_BRANCH,
 GH_PAGES_REPO,
 GH_PAGES_CNAME
} = process.env

exports.publishGithubPages = async function publishGithubPages () {
  if (!fs.existsSync(`${GH_PAGES_DIR}`)) {
    error(`GH pages directory doesn't exist!`)
    process.exit(1)
  }

  info(`📖   Deploying ${GH_PAGES_DIR} to Github pages...`)
  info(`📖   Repository: ${GH_PAGES_REPO}...`)
  info(`📖   Branch: ${GH_PAGES_BRANCH}...`)

  await runCommandAsync(`touch ${GH_PAGES_DIR}/.nojekyll`)

  if (GH_PAGES_CNAME) {
    await runCommandAsync(`echo "${GH_PAGES_CNAME}" >> ${GH_PAGES_DIR}/CNAME`)
  }

  return new Promise((resolve, reject) => {
    ghpages.publish(GH_PAGES_DIR, {
      branch: GH_PAGES_BRANCH,
      repo: GH_PAGES_REPO
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
