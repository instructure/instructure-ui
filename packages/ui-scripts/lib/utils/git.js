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
const { runCommandSync, error, info } = require('@instructure/command-utils')
const validateMessage = require('validate-commit-msg')

const runGitCommand = (exports.runGitCommand = (args = []) => {
  const { stdout } = runCommandSync('git', args, [], { stdio: 'pipe' })
  return stdout && stdout.trim()
})

exports.setupGit = () => {
  runGitCommand(['config', 'user.email', 'instructure-ui-ci@instructure.com'])
  runGitCommand(['config', 'user.name', 'instructure-ui-ci'])
}

exports.isReleaseCommit = (version) => {
  try {
    const result = runGitCommand(['log', '-1', '--pretty=format:%B'])
    const formattedResult = result.split('\n')[0].trim()

    info(formattedResult)

    return !!formattedResult?.startsWith(`chore(release): ${version}`)
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

exports.commit = function () {
  try {
    runGitCommand(['commit', '--dry-run'])
  } catch (err) {
    error(err.stdout)
    process.exit(1)
  }

  try {
    runCommandSync('yarn', ['husky:pre-commit'])
  } catch (err) {
    error(err.stdout)
    process.exit(1)
  }

  return runCommandSync('git-cz')
}

exports.lintCommitMessage = function lintCommitMessage() {
  const commitMessage = runGitCommand(['log', '-1', '--pretty=%B'])
  return validateMessage(commitMessage)
}

exports.createGitTagForRelease = function createGitTagForRelease(version) {
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

exports.commitVersionBump = function commitVersionBump(releaseVersion) {
  runGitCommand(['commit', '-am', `chore(release): ${releaseVersion}`])
}

exports.resetToCommit = function resetToCommit(commitish = 'HEAD') {
  runGitCommand(['reset', '--hard', commitish])
}

function getPreviousReleaseCommit() {
  return runGitCommand(['rev-list', '--tags', '--skip=1', '--max-count=1'])
}
exports.getPreviousReleaseCommit = getPreviousReleaseCommit

function getCurrentReleaseTag() {
  return runGitCommand(['describe', '--exact-match'])
}
exports.getCurrentReleaseTag = getCurrentReleaseTag

function getPreviousReleaseTag() {
  return runGitCommand([
    'describe',
    '--abbrev=0',
    '--tags',
    getPreviousReleaseCommit()
  ])
}
exports.getPreviousReleaseTag = getPreviousReleaseTag

const jiraMatcher = /((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/g

exports.getIssuesInRelease = function getIssuesInRelease(jiraProjectKey) {
  info(`Looking up issues for the ${jiraProjectKey} project...`)
  let currentReleaseTag, previousReleaseTag

  try {
    currentReleaseTag = getCurrentReleaseTag()
    previousReleaseTag = getPreviousReleaseTag()
  } catch (e) {
    error(e)
    process.exit(1)
  }

  let result

  info(`${previousReleaseTag}..${currentReleaseTag}`)

  try {
    result = runGitCommand([
      'log',
      `${previousReleaseTag}..${currentReleaseTag}`
    ])
  } catch (e) {
    error(e)
    process.exit(1)
  }

  let issueKeys = result.match(jiraMatcher) || []

  issueKeys = issueKeys.filter((key) => key.indexOf(jiraProjectKey) != -1)

  if (issueKeys.length > 0) {
    issueKeys = Array.from(new Set(issueKeys))
    info(`Issues in this release: ${issueKeys.join(', ')}`)
  }

  return issueKeys
}

exports.getIssuesInCommit = function getIssuesInCommit(jiraProjectKey) {
  let result

  try {
    result = runGitCommand(['log', '-1', '--pretty=format:%B'])
  } catch (e) {
    error(e)
    process.exit(1)
  }

  let issueKeys = result.match(jiraMatcher) || []

  issueKeys = issueKeys.filter((key) => key.indexOf(jiraProjectKey) != -1)

  if (issueKeys.length > 0) {
    issueKeys = Array.from(new Set(issueKeys))
    info(`Issues in this commit: ${issueKeys.join(', ')}`)
  }

  return issueKeys
}
