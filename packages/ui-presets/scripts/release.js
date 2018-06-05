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

const rl = require('readline')
const { getReleaseVersion, publish, postPublish } = require('./utils/release')
const { info, error } = require('./utils/logger')
const { getPackageJSON } = require('./utils/get-package')

async function release () {
  const { name, version } = getPackageJSON()
  const releaseVersion = await getReleaseVersion()

  const confirm = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  info(`Releasing version ${releaseVersion} of ${name}...`)

  confirm.question('Continue? [y/n]\n', function (reply) {
    confirm.close()
    if (!['Y', 'y'].includes(reply.trim())) {
      process.exit(0)
    }
  })

  await publish(releaseVersion)

  if (releaseVersion === version) {
    await postPublish()
  }

  info(`Version ${releaseVersion} of ${name} was successfully released!`)
}

try {
  release()
} catch (err) {
  error(err)
  process.exit(1)
}
