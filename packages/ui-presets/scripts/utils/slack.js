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
const { info } = require('./logger')

const {
 SLACK_CHANNEL,
 SLACK_USERNAME,
 SLACK_EMOJI,
 CHANGELOG_URL,
 SLACK_WEBHOOK
} = process.env

exports.postReleaseSlackMessage = function postReleaseSlackMessage (jiraVersion, issueKeys) {
  if (SLACK_CHANNEL && SLACK_WEBHOOK) {
    info(`💬  Pinging slack channel: ${SLACK_CHANNEL}`) // eslint-disable-line no-console

    const message = `PSA!\n *<${jiraVersion.url}|${jiraVersion.name}> has been published!* :party:`
    const changelog = CHANGELOG_URL ? `\n ${CHANGELOG_URL}` : ''
    const issues = (issueKeys.length > 0) ? `\n\nIssues in this release: ${issueKeys.join(', ')}` : ''

    const payload = {
      'channel': SLACK_CHANNEL,
      'username': SLACK_USERNAME,
      'icon_emoji': SLACK_EMOJI,
      'text': message + changelog + issues,
      'link_names': 1
    }

    const req = https.request({
      path: `/services/${SLACK_WEBHOOK}`,
      hostname: 'hooks.slack.com',
      method: 'POST'
    })

    req.write(JSON.stringify(payload))
    req.end()

    info(`💬  Posted Slack Message: "${message}"`) // eslint-disable-line no-console
  }
}
