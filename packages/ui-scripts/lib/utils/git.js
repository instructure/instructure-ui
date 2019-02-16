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
const { runCommandSync, resolveBin, error } = require('@instructure/command-utils')
const validateMessage = require('validate-commit-msg')

const runGitCommand = exports.runGitCommand = function runGitCommand (args = []) {
  const { stdout } = runCommandSync('git', args, [], { stdio: 'pipe' })
  return stdout && stdout.trim()
}

exports.commit = function () {
  return runCommandSync('git-cz')
}

exports.setupGit = function setupGit () {
  const {
   GIT_EMAIL,
   GIT_USERNAME,
   GIT_REMOTE_URL,
   GIT_REMOTE_NAME
  } = process.env

  const origin = GIT_REMOTE_NAME || 'origin'

  let remotes = []

  try {
    remotes = runGitCommand(['remote']).split(/(\s+)/)
  } catch (err) {
    error(err)
    process.exit()
  }

  if (GIT_REMOTE_URL) {
    if (!remotes.includes(origin)) {
      runGitCommand(['remote', 'add', origin, GIT_REMOTE_URL])
    } else {
      runGitCommand(['remote', 'set-url', origin, GIT_REMOTE_URL])
    }
  }

  if (GIT_EMAIL) {
    runGitCommand(['config', 'user.email', `"${GIT_EMAIL}"`])
  }
  if (GIT_USERNAME) {
    runGitCommand(['config', 'user.name', `"${GIT_USERNAME}"`])
  }

  runGitCommand(['fetch', origin, '--tags', '--force'])
}

exports.lintCommitMessage = function lintCommitMessage () {
  const commitMessage = runGitCommand(['log', '-1', '--pretty=%B'])
  return validateMessage(commitMessage)
}

exports.isReleaseCommit = function isReleaseCommit (version) {
  let result

  try {
    const { stdout } = runCommandSync('git', [
      'log', '--oneline', '--format=%B', '-n', '1', 'HEAD', '|',
      resolveBin('head'), '-n', '1', '|',
      resolveBin('grep'), '"chore(release)"'
    ], [], { stdio: 'pipe' })
    result = stdout
  } catch (e) {
    return false
  }

  return result && (result.trim() === `chore(release): ${version}`)
}

exports.checkWorkingDirectory = function checkWorkingDirectory () {
  const result = runGitCommand(['status', '--porcelain'])

  if (result) {
    error(`Refusing to operate on unclean working directory!`)
    error(result)
    process.exit(1)
  }
}

exports.checkIfGitTagExists = function checkIfGitTagExists (version) {
  const tag = `v${version}`
  const result = runGitCommand(['tag', '--list', tag])

  if (result) {
    error(`Git tag ${tag} already exists!`)
    error('Run the bump "yarn bump" script to update the version prior to running a stable release.')
    process.exit(1)
  }
}

exports.checkIfCommitIsReviewed = function checkIfCommitIsReviewed () {
  const result = runGitCommand(['log', '-n', '1', '|', resolveBin('grep'), 'Reviewed-on'])

  if (!result) {
    error('The release commit must be reviewed and merged prior to running the release!')
    error('Use "git pull --rebase" to pull down the latest from the remote.')
    process.exit(1)
  }
}

exports.createGitTagForRelease = function createGitTagForRelease (version) {
  const tag = `v${version}`
  const { GIT_REMOTE_NAME } = process.env
  const origin = GIT_REMOTE_NAME || 'origin'

  runGitCommand(['tag', '-am', `Version ${version}`, tag])

  runGitCommand(['push', origin, tag])
}

exports.commitVersionBump = function commitVersionBump (releaseVersion) {
  runGitCommand(['commit', '-am', `chore(release): ${releaseVersion}`])
}

exports.resetToCommit = function resetToCommit (commitish = 'HEAD') {
  runGitCommand(['reset', '--hard', commitish])
}
