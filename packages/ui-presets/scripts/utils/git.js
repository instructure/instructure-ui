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
const { info, error } = require('./logger')
const validateMessage = require('validate-commit-msg')

exports.commit = function () {
  return runCommand('git-cz')
}

exports.setupGit = async function setupGit () {
  const {
   GIT_EMAIL,
   GIT_USERNAME,
   GIT_REMOTE_URL,
   GIT_REMOTE_NAME
  } = process.env

  try {
    await runCommandAsync(`git config --list`)

    const origin = GIT_REMOTE_NAME || 'origin'

    if (GIT_REMOTE_URL) {
      if (!await runCommandAsync(`git remote | grep ${origin}`)) {
        await runCommandAsync(`git remote add ${origin} ${GIT_REMOTE_URL}`)
      } else {
        await runCommandAsync(`git remote set-url ${origin} ${GIT_REMOTE_URL}`)
      }
    }

    await runCommandAsync(`git fetch ${origin} --tags --force`)

    if (GIT_EMAIL) {
      await runCommandAsync(`git config user.email "${GIT_EMAIL}"`)
    }
    if (GIT_USERNAME) {
      await runCommandAsync(`git config user.name "${GIT_USERNAME}"`)
    }

    await runCommandAsync(`git config push.default simple`)

    await runCommandAsync(`git config --list`)
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

exports.lintCommitMessage = async function lintCommitMessage () {
  let commitMessage

  try {
    commitMessage = await runCommandAsync(`git log -1 --pretty=%B`)
  } catch (e) {
    error(e)
    process.exit(1)
  }

  return validateMessage(commitMessage)
}

exports.isReleaseCommit = async function isReleaseCommit (version) {
  let result

  try {
    result = await runCommandAsync(`git log --oneline --format=%B -n 1 HEAD | head -n 1 | grep "chore(release)"`)
  } catch (e) {
    info(`Not on a release commit - this is a release candidate`)
    return false
  }

  return ((typeof result === 'string') && (result.trim() === `chore(release): ${version}`))
}

exports.checkWorkingDirectory = async function checkWorkingDirectory () {
  let result

  try {
    result = await runCommandAsync(`git status --porcelain`)
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

exports.checkIfGitTagExists = async function checkIfGitTagExists (version) {
  const tag = `v${version}`
  let result

  try {
    result = await runCommandAsync(`git tag --list ${tag}`)
  } catch (e) {
    error(e)
    process.exit(1)
  }

  if (result) {
    error(`Git tag ${tag} already exists!`)
    error('Run the bump "yarn bump" script to update the version prior to running a stable release.')
    process.exit(1)
  }
}

exports.checkIfCommitIsReviewed = async function checkIfCommitIsReviewed () {
  let result

  try {
    result = await runCommandAsync('git log -n 1 | grep Reviewed-on')
  } catch (e) {
    error(e)
    process.exit(1)
  }

  if (!result) {
    error('The version bump commit must be merged prior to running the release!')
    error('Use "git pull --rebase" to pull down the latest from the remote.')
    process.exit(1)
  }
}

exports.createGitTagForRelease = async function createGitTagForRelease (version) {
  const tag = `v${version}`
  const { GIT_REMOTE_NAME } = process.env
  const origin = GIT_REMOTE_NAME || 'origin'

  try {
    await runCommandAsync(`git tag -am "Version ${version}" ${tag}`)
    await runCommandAsync(`git push ${origin} ${tag}`)
  } catch (e) {
    error(e)
    process.exit(1)
  }
}
