/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const util = require(`util`)
const exec = util.promisify(require(`child_process`).exec)
const { info } = require(`@instructure/command-utils`)
const { setupGit } = require('./utils/git')

exports.publishGithubPages = async function publishGithubPages() {
  //Set up git user.name and user.email
  setupGit()

  info(`Remove __build__ folder`)
  await exec(`rm -rf packages/__docs__/__build__`)

  info(`Create __build__ folder`)
  await exec(`mkdir packages/__docs__/__build__`)

  info(`Switch to gh-pages branch`)
  await exec(`git checkout gh-pages`)

  info(`Switch to master branch`)
  await exec(`git checkout master`)

  info(`Clone gh-pages branch to __build__ folder`)
  await exec(`git clone .git --branch gh-pages packages/__docs__/__build__`)

  info(`Build docs`)
  await exec(`yarn build:docs`)

  info(`Commit and push changes to local copy`)
  await exec(
    `cd ./packages/__docs__/__build__  && git add --all && git commit -m "Publishing to gh-pages" && git push origin gh-pages`
  )

  await exec(`cd ../../..`)
  info(`Publish`)
  await exec(
    `git checkout gh-pages && git push origin gh-pages && git checkout master`
  )
}
