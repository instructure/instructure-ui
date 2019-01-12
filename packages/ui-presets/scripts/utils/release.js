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

const { getPackageJSON } = require('@instructure/pkg-utils')
const getChangedPackages = require('@instructure/pkg-utils/lib/get-changed-packages')

const { runCommandAsync } = require('./command')
const { confirm } = require('./confirm')

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
  createGitTagForRelease,
  getCommitIndex
} = require('./git')
const { error, info } = require('./logger')
const { publishGithubPages } = require('./gh-pages')

async function createNPMRCFile (config = {}) {
  const {
   NPM_TOKEN,
   NPM_EMAIL,
   NPM_USERNAME
  } = process.env

  // Only write an npmrc file if these are defined, otherwise assume the system is properly configured
  if (NPM_TOKEN) {
    fs.writeFileSync(
      path.resolve(process.cwd(), '.npmrc'),
      `//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n${config.npm_scope}\nemail=${NPM_EMAIL}\nname=${NPM_USERNAME}`
    )
  }

  await runCommandAsync('npm', ['whoami'])
}

const getReleaseVersion = async function getReleaseVersion (currentVersion) {
  let releaseVersion = currentVersion

  if (await isReleaseCommit(releaseVersion)) {
    await checkIfGitTagExists(releaseVersion)
    await checkIfCommitIsReviewed()
  } else {
    const index = await getCommitIndex()
    await runCommandAsync('standard-version')
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
    await checkIfCommitIsReviewed()

    if (currentVersion !== releaseVersion) {
      error('Version mismatch for stable release!')
      process.exit(1)
    }
  } else {
    args.push('--conventional-commits')
  }

  info(`📦  Publishing ${npmTag} ${releaseVersion} of ${packageName}...`)

  try {
    await runCommandAsync('lerna', ['publish'].concat(args))
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
      issueKeys = await getIssuesInCommit(config)
    }
    if (hasSlackConfig(config) && issueKeys.length > 0) {
      postReleaseCandidateSlackMessage(version.name, issueKeys, config)
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

  if (currentVersion === releaseVersion) {
    if (releaseCommit) {
      await checkIfCommitIsReviewed()
    } else {
      error('Latest release should be run from a merged version bump commit!')
      process.exit(1)
    }
  }

  let packageInfo = { versions: [] }

  try {
    const { stdout } = await runCommandAsync('npm', ['info', '--json'])
    packageInfo = JSON.parse(stdout)
  } catch (e) {
    error(e)
    process.exit(1)
  }

  if (packageInfo.versions.includes(currentVersion)) {
    info(`📦  v${currentVersion} is already published!`)
  } else {
    try {
      await runCommandAsync('yarn', ['publish', '--tag', npmTag])
      info(`📦  Version ${releaseVersion} of ${packageName} was successfully published!`)
    } catch (err) {
      error(err)
    }
  }
}

exports.deprecatePackage = async function deprecatePackage (packageName, currentVersion, message, config = {}) {
  await createNPMRCFile(config)
  const pkg = `${packageName}@${currentVersion}`

  info(`📦  Deprecating ${pkg}...`)
  await runCommandAsync('npm', ['deprecate', pkg, message])
}

async function updateCrossPackageDependencies (name, version) {
  const majorVersion = version.split('.')[0]
  const changedPackages = await getChangedPackages()
  const changedPackagesNames = changedPackages.map(pkg => pkg.name)

  info(`💾  Updating cross-package dependencies for ${name} to ^${majorVersion}...`)

  await Promise.all(
    changedPackages.map(pkg => {
      let packageChanged = false

      const depCollections = [
        'dependencies',
        'devDependencies',
        'optionalDependencies',
        'peerDependencies'
      ]

      depCollections.forEach(depCollection => {
        if (!pkg[depCollection]) return

        const newDependencies = Object.keys(pkg[depCollection])
          .filter(dep => {
            return (
              changedPackagesNames.includes(dep) &&
              pkg[depCollection][dep] === `^${version}`
            )
          })
          .reduce((obj, dep) => ({ ...obj, [dep]: `^${majorVersion}` }), {})

        if (Object.entries(newDependencies).length > 0) {
          pkg.set(
            depCollection,
            Object.assign(pkg[depCollection], newDependencies)
          )
          packageChanged = true
        }
      })

      if (packageChanged) return pkg.serialize()
    })
  )
}

exports.bump = async function bump (releaseType, config = {}) {
  await setupGit()
  await checkWorkingDirectory()

  await runCommandAsync('standard-version', (releaseType ? ['--release-as', releaseType] : []))

  const { name, version } = getPackageJSON()

  info(`📦  Updating ${name} packages and generating the changelog for ${version}...`)

  try {
    await runCommandAsync('lerna', ['publish',
      '--yes',
      '--skip-git',
      '--skip-npm',
      '--force-publish=*',
      '--conventional-commits',
      '--repo-version',
      version
    ])
  } catch (err) {
    error(err)
    process.exit(1)
  }

  try {
    await updateCrossPackageDependencies(name, version)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  info(`💾  Committing version bump commit for ${name} ${version}...`)

  await runCommandAsync('git', ['commit', '-am', `"chore(release): ${version}"`])
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
