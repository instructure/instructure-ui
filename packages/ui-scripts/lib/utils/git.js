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
import { runCommandSync, error, info, warn } from '@instructure/command-utils'

import validateMessage from 'validate-commit-msg'

const USERNAME = 'instructure-ui-ci'
const EMAIL = 'instui-dev@instructure.com'

export const runGitCommand = (args = []) => {
  const { stdout } = runCommandSync('git', args, [], { stdio: 'pipe' })
  return stdout && stdout.toString().trim()
}

const setupGit = () => {
  try {
    const email = runGitCommand(['config', 'user.email'])
    const username = runGitCommand(['config', 'user.name'])
    if (!email || !username) {
      warn('No git username/email is set, using values for CI.')
      runGitCommand(['config', 'user.email', 'instui-dev@instructure.com'])
      runGitCommand(['config', 'user.name', 'instructure-ui-ci'])
    }
  } catch (e) {
    error(e.stack ? e.stack : e)
    process.exit(1)
  }
}

export const isReleaseCommit = (version) => {
  try {
    const result = runGitCommand(['log', '-1', '--pretty=format:%B'])
    const formattedResult = result.split('\n')[0].trim()

    info(formattedResult)

    return (
      formattedResult &&
      formattedResult.startsWith(`chore(release): ${version}`)
    )
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

export function checkWorkingDirectory() {
  let result
  try {
    result = runGitCommand(['status', '--porcelain'])
  } catch (e) {
    error(e)
    process.exit(1)
  }

  if (result) {
    error(`Refusing to operate on unclean working directory!`)
    error(result)
    process.exit(1)
  }
}

export function checkIfGitTagExists(version) {
  const tag = `v${version}`
  let result

  try {
    result = runGitCommand(['tag', '--list', tag])
  } catch (e) {
    error(e)
    process.exit(1)
  }

  if (result) {
    error(`Git tag ${tag} already exists!`)
    error(
      'Run the bump "yarn bump" script to update the version prior to running a stable release.'
    )
    process.exit(1)
  }
}

export function commit() {
  setupGit()
  try {
    runGitCommand(['commit', '--dry-run'])
  } catch (err) {
    error(err)
    process.exit(1)
  }
  try {
    runCommandSync('yarn', ['husky:pre-commit'])
  } catch (err) {
    error(err)
    process.exit(1)
  }
  return runCommandSync('git-cz')
}

export function lintCommitMessage() {
  const commitMessage = runGitCommand(['log', '-1', '--pretty=%B'])
  return validateMessage(commitMessage)
}

export function createGitTagForRelease(version) {
  const tag = `v${version}`
  const { GIT_REMOTE_NAME } = process.env
  const origin = GIT_REMOTE_NAME || 'origin'

  try {
    runGitCommand(['tag', '-am', `Version ${version}`, tag])
    runGitCommand(['push', origin, tag])
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

export function commitVersionBump(releaseVersion) {
  setupGit()
  runGitCommand(['commit', '-am', `chore(release): ${releaseVersion}`])
}

export function resetToCommit(commitish = 'HEAD') {
  runGitCommand(['reset', '--hard', commitish])
}

export function getPreviousReleaseCommit() {
  return runGitCommand(['rev-list', '--tags', '--skip=1', '--max-count=1'])
}

export function getCurrentReleaseTag() {
  return runGitCommand(['describe', '--exact-match'])
}

export function getPreviousReleaseTag() {
  return runGitCommand([
    'describe',
    '--abbrev=0',
    '--tags',
    getPreviousReleaseCommit()
  ])
}
