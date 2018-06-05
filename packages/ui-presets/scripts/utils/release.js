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

const { runCommandAsync } = require('./command')
const { getPackageJSON } = require('./get-package')
const fs = require('fs')
const path = require('path')

const {
  fetchGitTags,
  checkWorkingDirectory,
  createGitTagForRelease,
  checkIfGitTagExists,
  checkIfCommitIsReviewed,
  isReleaseCommit
} = require('./git')

const {
  getIssuesInRelease,
  createJiraVersion,
  updateJiraIssues
} = require('./jira')

const { publishGithubPages } = require('./gh-pages')
const { postReleaseSlackMessage } = require('./slack')
const { error, info } = require('./logger')

async function checkPackagePublished (name, version) {
  const result = runCommandAsync(`npm info ${name}@${version} version`)
  if (result === version) {
    error(`$package@$version is already published!`)
    process.exit(1)
  }
}

async function createNPMRCFile () {
  const {
   NPM_TOKEN,
   NPM_SCOPE,
   NPM_EMAIL,
   NPM_USERNAME
  } = process.env

  fs.writeFileSync(
    path.resolve(process.cwd(), '.npmrc'),
    `//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n${NPM_SCOPE}\nemail=${NPM_EMAIL}\nname=${NPM_USERNAME}`
  )

  await runCommandAsync('npm whoami')
}

exports.prePublish = async function prePublish () {
  let releaseVersion = getPackageJSON().version

  await checkWorkingDirectory()
  await fetchGitTags()

  if (await isReleaseCommit()) {
    await checkIfGitTagExists(releaseVersion)
    await checkIfCommitIsReviewed()
  } else {
    const commit = await runCommandAsync(`git rev-parse --short HEAD`)
    const description = await runCommandAsync(`git describe --match "v[0-9]*" --first-parent`)
    const index = await runCommandAsync(`echo ${description}| cut -d'-' -f 2`)
    await runCommandAsync('$(npm bin)/standard-version')
    const nextVersion = getPackageJSON().version
    await runCommandAsync(`git reset --hard ${commit}`)
    releaseVersion = `${nextVersion}-rc.${index}+${commit}`
  }

  info(releaseVersion)
  return releaseVersion
}

exports.publish = async function publish (releaseVersion) {
  await createNPMRCFile()
  const { name, version } = getPackageJSON()
  const releaseCommit = await isReleaseCommit()
  const npmTag = (version === releaseVersion) ? 'latest' : null
  const args = [
    '--yes',
    '--skip-git',
    '--force-publish=*',
    `--repo-version ${releaseVersion}`
  ]

  await checkWorkingDirectory()

  if (version === releaseVersion) {
    if (releaseCommit) {
      checkIfCommitIsReviewed()
    } else {
      error('Latest release should be run from a merged version bump commit!')
      process.exit(1)
    }
  }

  info(`📦  Publishing ${npmTag} ${releaseVersion} of ${name}...`)

  if (npmTag) {
    args.concat([
      `--npm-tag ${npmTag}`,
    ])
  }

  try {
    await runCommandAsync(`$(npm bin)/lerna publish ${args.join(' ')}`)
  } catch (err) {
    error(err)
    process.exit(1)
  }

  info(`📦  Version ${npmTag} ${releaseVersion} of ${name} was successfully published!`)
}

exports.publishPackage = async function publishPackage (releaseVersion) {
  await createNPMRCFile()
  const { name, version } = getPackageJSON()
  const releaseCommit = await isReleaseCommit()
  const npmTag = (version === releaseVersion) ? 'latest' : null
  const args = npmTag ? `--tag ${npmTag}` : ''

  await checkWorkingDirectory()
  await checkPackagePublished(name, releaseVersion)

  if (version === releaseVersion) {
    if (releaseCommit) {
      checkIfCommitIsReviewed()
    } else {
      error('Latest release should be run from a merged version bump commit!')
      process.exit(1)
    }
  }

  info(`📦  Publishing ${npmTag} ${releaseVersion} of ${name}...`)
  await runCommandAsync(`$(npm bin)/yarn publish ${args}`)
  info(`📦  Version ${releaseVersion} of ${name} was successfully published!`)
}

exports.deprecatePackage = async function deprecatePackage (message) {
  await createNPMRCFile()
  const { name, version } = getPackageJSON()
  const pkg = `${name}@${version}`

  info(`📦  Deprecating ${pkg}...`)
  await runCommandAsync(`npm deprecate ${pkg} ${message}`)
}

exports.postPublish = async function postPublish () {
  if (!await isReleaseCommit()) {
    error(`Post publish should only run on release commits!`)
    return
  }

  await checkIfCommitIsReviewed()

  const { name, version } = getPackageJSON()

  await createGitTagForRelease(version)

  const issueKeys = await getIssuesInRelease()
  const jiraVersion = await createJiraVersion(name, version)

  await updateJiraIssues(issueKeys, jiraVersion.name)

  publishGithubPages()

  postReleaseSlackMessage(jiraVersion, issueKeys)
}

exports.bump = async function bump (releaseType) {
  await checkWorkingDirectory()
  await fetchGitTags()

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

  await runCommandAsync(`git commit -a -m "chore(release): ${version}" --no-verify`)
}
