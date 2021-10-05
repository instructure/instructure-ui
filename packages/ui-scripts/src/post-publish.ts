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
import { getPackageJSON } from '@instructure/pkg-utils'
import { error, info } from '@instructure/command-utils'

import { getConfig } from './utils/config'
import { hasSlackConfig, postStableReleaseSlackMessage } from './utils/slack'
import { hasJiraConfig, getJiraVersion, updateJiraIssues } from './utils/jira'
import {
  isReleaseCommit,
  createGitTagForRelease,
  setupGit,
  checkWorkingDirectory,
  getIssuesInRelease
} from './utils/git'

try {
  const pkgJSON = getPackageJSON(undefined)
  postPublish(pkgJSON.name, pkgJSON.version, getConfig(pkgJSON))
} catch (err: any) {
  error(err)
  process.exit(1)
}

async function postPublish(
  packageName: string,
  releaseVersion: string,
  config: any = {}
) {
  setupGit()

  const jiraProjectKey = `${config.jira_project_key}`

  info(
    `📦  Running post-publish steps for ${releaseVersion} of ${packageName}...`
  )

  let jiraVersion: any = { name: `${packageName} v${releaseVersion}` }
  let issueKeys: any[] = []

  if (isReleaseCommit(releaseVersion)) {
    checkWorkingDirectory()
    createGitTagForRelease(releaseVersion)

    if (hasJiraConfig(config)) {
      issueKeys = await getIssuesInRelease(jiraProjectKey)
      jiraVersion = await getJiraVersion(jiraVersion.name, config)
      if (issueKeys.length > 0 && jiraVersion.id) {
        await updateJiraIssues(issueKeys, jiraVersion.name, config)
      }
    }

    if (hasSlackConfig(config)) {
      postStableReleaseSlackMessage(jiraVersion, issueKeys, config)
    }
  }

  info(
    `📦  Post-publish steps for ${releaseVersion} of ${packageName} complete!`
  )
}
