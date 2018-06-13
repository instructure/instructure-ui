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
const { runCommandAsync, runCommand } = require('./command')
const { error, info } = require('./logger')
const validateMessage = require('validate-commit-msg')

exports.commit = function () {
  return runCommand('git-cz')
}

exports.createGitConfig = function createGitConfig () {
  const {
   GIT_EMAIL,
   GIT_USERNAME,
   GIT_REMOTE
  } = process.env

  info('Writing git config with environment variables...')

  runCommand(`git config user.email ${GIT_EMAIL}`)
  runCommand(`git config user.name ${GIT_USERNAME}`)
  runCommand(`git remote add origin ${GIT_REMOTE}`)
  runCommand(`git config push.default simple`)
}

exports.lintCommitMessage = async function lintCommitMessage () {
  const commitMessage = await runCommandAsync(`git log -1 --pretty=%B`)
  return validateMessage(commitMessage)
}

exports.isReleaseCommit = async function isReleaseCommit (version) {
  const result = await runCommandAsync(`git log --oneline --format=%B -n 1 HEAD | head -n 1 | grep "chore(release)"`)
  return (result.trim() === `chore(release): ${version}`)
}

exports.checkWorkingDirectory = async function checkWorkingDirectory () {
  const result = await runCommandAsync(`git status --porcelain`)
  if (result) {
    error(`Refusing to operate on unclean working directory!`)
    error(result)
    process.exit(1)
  }
}

exports.checkIfGitTagExists = async function checkIfGitTagExists (version) {
  const tag = `v${version}`
  const result = await runCommandAsync(`git tag --list ${tag}`)
  if (result) {
    error(`Git tag ${tag} already exists!`)
    error('Run the bump "yarn bump" script to update the version prior to running a stable release.')
    process.exit(1)
  }
}

exports.checkIfCommitIsReviewed = async function checkIfCommitIsReviewed () {
  const result = await runCommandAsync('git log -n 1 | grep Reviewed-on')
  if (!result) {
    error('The version bump commit must be merged prior to running the release!')
    error('Use "git pull --rebase" to pull down the latest from the remote.')
    process.exit(1)
  }
}

exports.fetchGitTags = async function fetchGitTags () {
  info(`🚚   Fetching tags from remote...`)
  await runCommandAsync(`git fetch origin --tags --force`)
}

exports.createGitTagForRelease = async function createGitTagForRelease (version) {
  const tag = `v${version}`
  await runCommandAsync(`git tag -am "Version ${version}" ${tag}`)
  await runCommandAsync(`git push origin ${tag}`)
}
