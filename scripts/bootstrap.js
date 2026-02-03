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
const { execSync, fork } = require('child_process')
const path = require('path')

const opts = { stdio: 'inherit' }
function buildProject() {
  console.info('Building themes...')
  try {
    execSync('pnpm run build:themes', opts)
  } catch (error) {
    console.error("'pnpm run build:themes' failed", error)
    process.exit(1)
  }

  execSync('pnpm --filter @instructure/ui-icons prepare-build', opts)

  console.info('Building packages with Babel...')
  try {
    execSync('pnpm run build', opts)
  } catch (error) {
    console.error("'pnpm run build' failed", error)
    process.exit(1)
  }

  console.info('Generating tokens...')
  try {
    execSync('pnpm run build:tokens', opts)
  } catch (error) {
    console.error("'pnpm run build:tokens' failed", error)
    process.exit(1)
  }

  console.info('Building TypeScript declarations...')
  try {
    execSync('pnpm run build:types', opts)
  } catch (error) {
    console.error("'pnpm run build:types' failed", error)
    process.exit(1)
  }
}

function bootstrap() {
  execSync(path.resolve('scripts/clean.js'), opts)
  buildProject()
}

bootstrap()
