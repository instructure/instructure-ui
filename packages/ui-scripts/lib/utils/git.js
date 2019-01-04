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
const { runCommandAsync, runCommandSync, resolveBin } = require('./command')
const { info, error } = require('./logger')
const validateMessage = require('validate-commit-msg')

const runGitCommand = exports.runGitCommand = async function runGitCommand (args = []) {
  let result

  try {
    const { stdout } = await runCommandAsync('git', args)
    result = stdout.trim()
  } catch (e) {
    error(e)
    process.exit(1)
  }

  return result
}

exports.commit = function () {
  return runCommandSync('git-cz')
}

exports.setupGit = async function setupGit () {
  const {
   GIT_EMAIL,
   GIT_USERNAME,
   GIT_REMOTE_URL,
   GIT_REMOTE_NAME
  } = process.env

  await runGitCommand(['config', '--list'])

  const origin = GIT_REMOTE_NAME || 'origin'

  if (GIT_REMOTE_URL) {
    if (!await runGitCommand(['remote', '|', resolveBin('grep'), origin])) {
      await runGitCommand(['remote', 'add', origin, GIT_REMOTE_URL])
    } else {
      await runGitCommand(['remote', 'set-url', origin, GIT_REMOTE_URL])
    }
  }

  await runGitCommand(['fetch', origin, '--tags', '--force'])

  if (GIT_EMAIL) {
    await runGitCommand(['config', 'user.email', `"${GIT_EMAIL}"`])
  }
  if (GIT_USERNAME) {
    await runGitCommand(['config', 'user.name', `"${GIT_USERNAME}"`])
  }

  await runGitCommand(['config', 'push.default', 'simple'])

  await runGitCommand(['config', '--list'])
}

exports.lintCommitMessage = async function lintCommitMessage () {
  const commitMessage = await runGitCommand(['log', '-1', '--pretty=%B'])
  return validateMessage(commitMessage)
}

exports.isReleaseCommit = async function isReleaseCommit (version) {
  let result

  try {
    const { stdout } = await runCommandAsync('git', [
      'log', '--oneline', '--format=%B', '-n', '1', 'HEAD', '|',
      resolveBin('head'), '-n', '1', '|',
      resolveBin('grep'), '"chore(release)"'
    ])
    result = stdout.trim()
  } catch (e) {
    info(`Not on a release commit - this is a release candidate`)
    return false
  }

  return ((typeof result === 'string') && (result.trim() === `chore(release): ${version}`))
}

exports.checkWorkingDirectory = async function checkWorkingDirectory () {
  const result = await runGitCommand(['status', '--porcelain'])

  if (result) {
    error(`Refusing to operate on unclean working directory!`)
    error(result)
    process.exit(1)
  }
}

exports.checkIfGitTagExists = async function checkIfGitTagExists (version) {
  const tag = `v${version}`
  const result = await runGitCommand(['tag', '--list', tag])

  if (result) {
    error(`Git tag ${tag} already exists!`)
    error('Run the bump "yarn bump" script to update the version prior to running a stable release.')
    process.exit(1)
  }
}

exports.checkIfCommitIsReviewed = async function checkIfCommitIsReviewed () {
  const result = await runGitCommand(['log', '-n', '1', '|', resolveBin('grep'), 'Reviewed-on'])

  if (!result) {
    error('The release commit must be reviewed and merged prior to running the release!')
    error('Use "git pull --rebase" to pull down the latest from the remote.')
    process.exit(1)
  }
}

exports.createGitTagForRelease = async function createGitTagForRelease (version) {
  const tag = `v${version}`
  const { GIT_REMOTE_NAME } = process.env
  const origin = GIT_REMOTE_NAME || 'origin'

  await runGitCommand(['tag', '-am', `"Version ${version}"`, tag])
  await runGitCommand(['push', origin, tag])
}

exports.getCurrentReleaseTag = async function getCurrentReleaseTag () {
  return runGitCommand(['describe', '--exact-match'])
}

exports.getNextReleaseTag = async function getCurrentReleaseTag () {
  return runGitCommand(['describe', '--exact-match'])
}

const getPreviousReleaseCommit = exports.getPreviousReleaseCommit = async function getPreviousReleaseCommit () {
  return runGitCommand(['rev-list', '--tags', '--skip=1', '--max-count=1'])
}

exports.getPreviousReleaseTag = async function getPreviousReleaseTag () {
  const previousReleaseCommit = await getPreviousReleaseCommit()
  return runGitCommand(['describe', '--abbrev=0', '--tags', previousReleaseCommit])
}

const getCommitDescription = exports.getCommitDescription = async function getCommitDescription () {
  return runGitCommand(['describe', '--match', '"v[0-9]*"', '--first-parent'])
}

exports.getCommitIndex = async function getCommitIndex () {
  const description = await getCommitDescription()
  const { stdout } = await runCommandAsync('echo', [description, '|', resolveBin('cut'), '-d\'-\'', '-f', '2'])
  return stdout.trim()
}
