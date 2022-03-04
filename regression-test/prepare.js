#!/usr/bin/env node
/* eslint-disable no-console */
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

const { exec } = require('node:child_process')
const { promisify } = require('node:util')
const { readFile, writeFile } = require('node:fs/promises')
const { resolve } = require('node:path')
const execAsync = promisify(exec)

console.info('Retrieving latest snapshot version...')
;(async () => {
  try {
    // get the latest snapshot version from npm
    const result = await execAsync('npm view @instructure/ui --json')

    if (result.stderr) {
      throw new Error(result.stderr)
    }
    const parsedStdOut = JSON.parse(result.stdout)
    const latestSnapshotVersion = parsedStdOut['dist-tags']['snapshot']

    console.info(`Snapshot version is: ${latestSnapshotVersion}`)

    const packageJson = JSON.parse(
      await readFile(resolve('package.json'), {
        encoding: 'utf-8'
      })
    )
    // add dependencies with the correct snapshot version
    Object.assign(packageJson, {
      dependencies: {
        ...packageJson.dependencies,
        '@instructure/ui': latestSnapshotVersion
      },
      devDependencies: {
        ...packageJson.devDependencies,
        '@instructure/browserslist-config-instui': latestSnapshotVersion
      }
    })

    // override the package json
    await writeFile('package.json', JSON.stringify(packageJson), {
      flag: 'w'
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
