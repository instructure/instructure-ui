#! /usr/bin/env node
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
const { execSync, fork, spawn } = require('child_process')
const path = require('path')

const opts = { stdio: 'inherit' }

function runInParallel(commands) {
  return Promise.all(
    commands.map(({ name, command }) => {
      return new Promise((resolve, reject) => {
        console.info(`${name}...`)
        const child = spawn('pnpm', ['run', command], {
          stdio: 'inherit',
          shell: true
        })
        child.on('close', (code) => {
          if (code !== 0) {
            reject(new Error(`'${command}' failed with exit code ${code}`))
          } else {
            resolve()
          }
        })
        child.on('error', reject)
      })
    })
  )
}

function buildProject() {
  execSync('pnpm --filter @instructure/ui-icons prepare-build', opts)

  console.info('Building packages with SWC...')
  try {
    execSync('pnpm run build', opts)
  } catch (error) {
    console.error("'pnpm run build' failed", error)
    process.exit(1)
  }

  console.info('Running token generation and TypeScript compilation in parallel...')
  return runInParallel([
    { name: 'Generating tokens', command: 'build:tokens' },
    { name: 'Building TypeScript declarations', command: 'build:types' }
  ]).catch((error) => {
    console.error('Parallel build failed:', error)
    process.exit(1)
  })
}
async function bootstrap() {
  try {
    fork(path.resolve('scripts/clean.js'), opts)
  } catch (error) {
    console.error('clean failed with error:', error)
    process.exit(1)
  }

  await buildProject()
}

bootstrap()
