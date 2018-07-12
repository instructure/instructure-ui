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
const { info, error } = require('./logger')

const {
 SLACK_USERNAME,
 SLACK_WEBHOOK
} = process.env

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
  postSlackMessage(
    `PSA!\n *<${jiraVersion.url}|${jiraVersion.name}> has been published!* :party:${changelog}`,
    issueKeys,
    config
  )
}

exports.postReleaseCandidateSlackMessage = (packageName, releaseVersion, issueKeys, config = {}) => {
  postSlackMessage(
    `*A release candidate, ${releaseVersion}, for ${packageName} has been published!* :party:`,
    issueKeys,
    config
  )
}
