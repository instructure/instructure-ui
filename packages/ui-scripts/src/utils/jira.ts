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

import fs from 'fs'
//@ts-expect-error FIXME:
import Jira from 'jira-client'

import { info, error } from '@instructure/command-utils'

const { JIRA_PEM_PATH, JIRA_TOKEN, JIRA_CONSUMER_KEY, JIRA_SECRET } =
  process.env

let JIRA: any

function jiraClient(config: any = {}) {
  if (!JIRA) {
    JIRA = new Jira({
      host: config.jira_host,
      protocol: 'https',
      oauth: {
        consumer_key: JIRA_CONSUMER_KEY,
        consumer_secret: fs.readFileSync(JIRA_PEM_PATH as string),
        access_token: JIRA_TOKEN,
        access_token_secret: JIRA_SECRET
      }
    })
  }
  return JIRA
}

export function hasJiraConfig(config: any = {}) {
  const { jira_project_id, jira_project_key } = config

  const hasConfig = jira_project_id && jira_project_key

  info(`jira_project_key: '${jira_project_key}'`)
  info(`jira_project_id: '${jira_project_id}'`)

  const hasEnv = JIRA_PEM_PATH && JIRA_TOKEN && JIRA_CONSUMER_KEY && JIRA_SECRET

  if (!hasEnv) {
    info(`Skipping Jira update.\
Set ENV the following environment variables to enable:\
JIRA_PEM_PATH, JIRA_TOKEN, JIRA_CONSUMER_KEY, JIRA_SECRET`)
  }

  return hasConfig && hasEnv
}

export async function findJiraVersion(
  jiraVersionName: string,
  config: any = {}
) {
  let result = []

  try {
    info(
      `Looking for ${jiraVersionName} in Jira project: ${config.jira_project_key}...`
    )
    result = await jiraClient(config).getVersions(config.jira_project_key)
  } catch (e) {
    error(`Could not get Jira versions for project: ${config.jira_project_key}`)
    error(e)
  }

  return result[
    result.findIndex((version: any) => version.name === jiraVersionName)
  ]
}

export async function getJiraVersion(jiraVersionName: string, config = {}) {
  let version = await findJiraVersion(jiraVersionName, config)
  if (version && version.id) {
    info(`Found ${version.name}:`, JSON.stringify(version))
    return version
  } else {
    version = await createJiraVersion(jiraVersionName, config)
  }
  return version || { name: jiraVersionName }
}

export async function createJiraVersion(
  jiraVersionName: string,
  config: any = {}
) {
  let result: any = {
    name: jiraVersionName
  }

  try {
    info(
      `Creating ${jiraVersionName} in Jira project: ${config.jira_project_id}...`
    )
    result = await jiraClient(config).createVersion({
      name: `${jiraVersionName}`,
      archived: false,
      released: true,
      projectId: config.jira_project_id
    })
  } catch (e) {
    error(`An error occured creating Jira Release version: ${jiraVersionName}!`)
    error(e)
  }

  // result = {
  //   "self":"https://instructure.atlassian.net/rest/api/2/version/46639",
  //   "id":"46639",
  //   "name":"instructure-ui v5.10.0",
  //   "archived":false,
  //   "released":true,
  //   "projectId":17900
  // }

  if (result && result.id) {
    info(`Created ${result.name}:`, JSON.stringify(result))

    return {
      ...result,
      url: `https://${config.jira_host}/projects/${config.jira_project_key}/versions/${result.id}`
    }
  }
}

export async function updateJiraIssues(
  issueKeys: any[],
  jiraVersionName: string,
  config: any
) {
  await Promise.all(
    issueKeys.map((issueKey) => {
      let result
      try {
        result = jiraClient(config).updateIssue(issueKey, {
          update: {
            fixVersions: [{ add: { name: jiraVersionName } }]
          }
        })
      } catch (err) {
        error(`An error occured updating Jira issue ${issueKey}!`)
        error(err)
        result = Promise.resolve()
      }

      return result
    })
  )

  info(
    `Updated ${issueKeys.join(
      ', '
    )} to reflect the fix version: ${jiraVersionName}.`
  )
}
