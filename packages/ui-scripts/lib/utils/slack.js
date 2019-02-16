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

const https = require('https')
const { info, error } = require('@instructure/command-utils')

const {
 SLACK_USERNAME,
 SLACK_WEBHOOK
} = process.env

function hasSlackConfig (config = {}) {
  const hasEnv = SLACK_USERNAME && SLACK_WEBHOOK
  const hasConfig = !!config.slack_channel

  info(`slack_channel: '${config.slack_channel}'`)

  if (!hasEnv) {
    info(`Skipping Slack update.\
Set SLACK_USERNAME and SLACK_WEBHOOK environment variables to enable.`)
  }

  return hasEnv && hasConfig
}
exports.hasSlackConfig = hasSlackConfig

function postSlackMessage (message, issueKeys = [], config = { slack_emoji: ':robot_face:'}) {
  if (config.slack_channel && SLACK_WEBHOOK) {
    info(`💬  Pinging slack channel: ${config.slack_channel}`)

    const issues = (issueKeys.length > 0) ? `\n\nIssues in this release: ${issueKeys.join(', ')}` : ''

    const payload = {
      'channel': config.slack_channel,
      'username': SLACK_USERNAME,
      'icon_emoji': config.slack_emoji,
      'text': message + issues,
      'link_names': 1
    }

    const req = https.request({
      path: `/services/${SLACK_WEBHOOK}`,
      hostname: 'hooks.slack.com',
      method: 'POST'
    })

    req.write(JSON.stringify(payload))
    req.end()

    info(`💬  Posted Slack Message: "${message + issues}"`)
  } else if (config.slack_channel && !SLACK_WEBHOOK) {
    error(`'SLACK_WEBHOOK' env variable isn't set for ${config.slack_channel}!`)
  }
}

exports.postStableReleaseSlackMessage = (jiraVersion = {}, issueKeys = [], config = {}) => {
  const changelog = config.changelog_url ? `\n ${config.changelog_url}` : ''
  const releaseName = jiraVersion.url ? `<${jiraVersion.url}|${jiraVersion.name}>` : jiraVersion.name
  postSlackMessage(
    `PSA!\n *${releaseName} has been published!* :party:${changelog}`,
    issueKeys,
    config
  )
}

exports.postReleaseCandidateSlackMessage = (releaseName, issueKeys, config = {}) => {
  postSlackMessage(
    `*A release candidate, ${releaseName} has been published!* :party:`,
    issueKeys,
    config
  )
}
