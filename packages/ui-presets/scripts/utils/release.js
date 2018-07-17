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
const path = require('path')

const { runCommandAsync } = require('./command')
const { confirm } = require('./confirm')
const { getPackageJSON } = require('./get-package')
const {
  hasJiraConfig,
  getIssuesInRelease,
  getJiraVersion,
  updateJiraIssues,
  getIssuesInCommit
} = require('./jira')
const {
  hasSlackConfig,
  postStableReleaseSlackMessage,
  postReleaseCandidateSlackMessage
} = require('./slack')
const {
  setupGit,
  checkWorkingDirectory,
  checkIfGitTagExists,
  checkIfCommitIsReviewed,
  isReleaseCommit,
  createGitTagForRelease
} = require('./git')
const { error, info } = require('./logger')
const { publishGithubPages } = require('./gh-pages')

async function checkPackagePublished (packageName, currentVersion) {
  const result = runCommandAsync(`npm info ${packageName}@${currentVersion} version`)
  if (result === currentVersion) {
    error(`${packageName}@${currentVersion} is already published!`)
    process.exit(1)
  }
}

async function createNPMRCFile (config = {}) {
  const {
   NPM_TOKEN,
   NPM_EMAIL,
   NPM_USERNAME
  } = process.env

  fs.writeFileSync(
    path.resolve(process.cwd(), '.npmrc'),
    `//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n${config.npm_scope}\nemail=${NPM_EMAIL}\nname=${NPM_USERNAME}`
  )

  await runCommandAsync('npm whoami')
}

const getReleaseVersion = async function getReleaseVersion (currentVersion) {
  let releaseVersion = currentVersion

  if (await isReleaseCommit(releaseVersion)) {
    await checkIfGitTagExists(releaseVersion)
    await checkIfCommitIsReviewed()
  } else {
    const description = await runCommandAsync(`git describe --match "v[0-9]*" --first-parent`)
    const index = await runCommandAsync(`echo ${description}| cut -d'-' -f 2`)
    await runCommandAsync('$(npm bin)/standard-version')
    const nextVersion = getPackageJSON().version
    releaseVersion = `${nextVersion}-rc.${index}`
  }

  info(releaseVersion)
  return releaseVersion
}
exports.getReleaseVersion = getReleaseVersion

const publish = async function publish (packageName, currentVersion, releaseVersion, config = {}) {
  await setupGit()
  await createNPMRCFile(config)

  const releaseCommit = await isReleaseCommit(releaseVersion)
  const npmTag = (currentVersion === releaseVersion) ? 'latest' : 'rc'
  const args = [
    '--yes',
    '--skip-git',
    '--force-publish=*',
    `--repo-version ${releaseVersion}`,
    `--npm-tag ${npmTag}`
  ]

  if (releaseCommit) {
    try {
      await checkIfCommitIsReviewed()
    } catch (e) {
      error('Latest release should be run from a merged version bump commit!')
      error(e)
      process.exit(1)
    }
    if (currentVersion !== releaseVersion) {
      error('Version mismatch for stable release!')
      process.exit(1)
    }
  } else {
    args.push('--conventional-commits')
  }

  info(`📦  Publishing ${npmTag} ${releaseVersion} of ${packageName}...`)

  try {
    await runCommandAsync(`$(npm bin)/lerna publish ${args.join(' ')}`)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  info(`📦  Version ${npmTag} ${releaseVersion} of ${packageName} was successfully published!`)
}
exports.publish = publish

const postPublish = async function postPublish (packageName, releaseVersion, config = {}) {
  info(`📦  Running post-publish steps for ${releaseVersion} of ${packageName}...`)

  let version = {
    name: `${packageName} v${releaseVersion}`
  }
  let issueKeys = []

  if (await isReleaseCommit(releaseVersion)) {
    await checkIfCommitIsReviewed()
    await createGitTagForRelease(releaseVersion)

    if (hasJiraConfig(config)) {
      issueKeys = await getIssuesInRelease(config)
      version = await getJiraVersion(version.name, config)
      if (issueKeys.length > 0 && version.id) {
        await updateJiraIssues(issueKeys, version.name, config)
      }
    }

    if (hasSlackConfig(config)) {
      postStableReleaseSlackMessage(version, issueKeys, config)
    }
  } else {
    if (hasJiraConfig(config)) {
      const issueKeys = await getIssuesInCommit(config)
      if (issueKeys.length > 0) {
        postReleaseCandidateSlackMessage(version.name, issueKeys, config)
      }
    }
  }
}
exports.postPublish = postPublish

const deployDocs = async function deployDocs (packageName, currentVersion, config = {}) {
  if (await isReleaseCommit(currentVersion)) {
    info(`📖   Deploying documentation for ${currentVersion} of ${packageName}...`)
    try {
      await publishGithubPages(config)
    } catch (err) {
      error(err)
      process.exit(1)
    }
    info(`📖   Documentation for ${currentVersion} of ${packageName} was successfully deployed!`)
  }
}
exports.deployDocs = deployDocs

exports.publishPackage = async function publishPackage (packageName, currentVersion, releaseVersion, config = {}) {
  await setupGit()
  await createNPMRCFile(config)

  const releaseCommit = await isReleaseCommit(releaseVersion)
  const npmTag = (currentVersion === releaseVersion) ? 'latest' : 'rc'

  await checkWorkingDirectory()
  await checkPackagePublished(packageName, releaseVersion)

  if (currentVersion === releaseVersion) {
    if (releaseCommit) {
      checkIfCommitIsReviewed()
    } else {
      error('Latest release should be run from a merged version bump commit!')
      process.exit(1)
    }
  }

  info(`📦  Publishing ${npmTag} ${releaseVersion} of ${packageName}...`)
  await runCommandAsync(`$(npm bin)/yarn publish --tag ${npmTag}`)
  info(`📦  Version ${releaseVersion} of ${packageName} was successfully published!`)
}

exports.deprecatePackage = async function deprecatePackage (packageName, currentVersion, message, config = {}) {
  await createNPMRCFile(config)
  const pkg = `${packageName}@${currentVersion}`

  info(`📦  Deprecating ${pkg}...`)
  await runCommandAsync(`npm deprecate ${pkg} ${message}`)
}

exports.bump = async function bump (releaseType, config = {}) {
  await setupGit()
  await checkWorkingDirectory()

  const versionArgs = releaseType ? `--release-as ${releaseType}` : ''
  await runCommandAsync(`$(npm bin)/standard-version ${versionArgs}`)

  const { name, version } = getPackageJSON()

  info(`📦  Updating ${name} packages and generating the changelog for ${version}...`)

  const args = [
    '--yes',
    '--skip-git',
    '--skip-npm',
    '--force-publish=*',
    '--conventional-commits',
    `--repo-version ${version}`
  ]

  try {
    await runCommandAsync(`$(npm bin)/lerna publish ${args.join(' ')}`)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  info(`💾  Committing version bump commit for ${name} ${version}...`)

  await runCommandAsync(`git commit -a -m "chore(release): ${version}"`)
}

exports.release = async function release (packageName, currentVersion, releaseVersion, config = {}) {
  await setupGit()
  await checkWorkingDirectory()

  let versionToRelease = releaseVersion

  if (!versionToRelease) {
    info(`Determining release version for ${packageName}...`)
    versionToRelease = await getReleaseVersion(currentVersion)
  }

  info(`📦  Releasing version ${versionToRelease} of ${packageName}...`)

  if (!process.env.CI) {
    const reply = await confirm('Continue? [y/n]\n')
    if (!['Y', 'y'].includes(reply.trim())) {
      process.exit(0)
    }
  }

  await publish(packageName, currentVersion, versionToRelease, config)

  await postPublish(packageName, versionToRelease, config)

  info(`📦  Version ${versionToRelease} of ${packageName} was successfully released!`)
}
