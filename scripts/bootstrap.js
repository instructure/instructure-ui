#! /usr/bin/env node

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
const { execSync, fork } = require('child_process')
const { spawn } = require('cross-spawn')
const path = require('path')

const opts = { stdio: 'inherit' }
function buildProject() {
  // this config lets us use the existing shell session for the sub processes stdins and stdouts
  // and lets us handle the stderrs of sub processes
  // if one of the sub processes fails, then we terminate the other sub process and exit the main process
  const spawnStdIoOpts = { stdio: ['inherit', 'inherit', 'pipe'] }
  execSync(
    'lerna run prepare-build --scope @instructure/ui-icons --loglevel silent',
    opts
  )
  // eslint-disable-next-line no-console
  console.info('Starting Babel and TSC...')
  const tsBuild = spawn('npm', ['run', 'build:types'], spawnStdIoOpts)
  const babelBuild = spawn('npm', ['run', 'build'], spawnStdIoOpts)
  tsBuild.on('exit', (code) => {
    if (code !== 0) {
      babelBuild.kill()
      console.error("'npm run build:ts' failed :(")
      process.exit(code)
    }
  })
  tsBuild.stderr.on('data', (data) => {
    console.error('tsc stderr', data.toString())
  })
  babelBuild.stderr.on('data', (data) => {
    console.error('babel stderr', data.toString())
  })
  babelBuild.on('exit', (code) => {
    if (code !== 0) {
      tsBuild.kill()
      console.error("'npm run build' failed :(")
      process.exit(code)
    }
    execSync('npm run build:tokens', opts)
  })
}
function bootstrap() {
  try {
    fork(path.resolve('scripts/clean.js'), opts)
  } catch (error) {
    console.error('clean failed with error:', error)
    process.exit(1)
  }

  buildProject()
}

bootstrap()
