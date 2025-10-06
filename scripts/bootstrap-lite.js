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
 * THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * bootstrap-lite.js
 *
 * A lightweight validation script optimized for AI tools to quickly validate
 * code changes without doing full builds. This is much faster than full bootstrap.
 *
 * PREREQUISITES:
 * - You must run full `npm run bootstrap` at least once before using this script
 * - This script is for validating changes in an already-bootstrapped repository
 * - It won't work on a clean repository as it depends on existing build artifacts
 *
 * What it does:
 * 1. Check TypeScript references consistency
 * 2. Build TypeScript types (.d.ts files) - also validates types during build
 *    - Uses TypeScript's incremental build cache for speed (rebuilds only changed files)
 * 3. Optional: Run linting on changed files
 *
 * What it skips (vs full bootstrap):
 * - Clean step
 * - Babel builds (transpilation to lib/ and es/)
 * - Icon generation
 * - Token generation
 *
 * Options:
 * --force  Bypass TypeScript build cache and rebuild all types from scratch
 * --lint   Run linting on changed files
 */

const { execSync } = require('child_process')
const chalk = require('chalk')

const opts = { stdio: 'inherit' }

function log(message, type = 'info') {
  const prefix = {
    info: chalk.blue('ℹ'),
    success: chalk.green('✓'),
    warning: chalk.yellow('⚠'),
    error: chalk.red('✖')
  }[type]
  console.log(`${prefix} ${message}`)
}

function runStep(name, command) {
  log(`${name}...`, 'info')
  const startTime = Date.now()
  try {
    execSync(command, opts)
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)
    log(`${name} completed in ${elapsed}s`, 'success')
    return true
  } catch {
    log(`${name} failed`, 'error')
    return false
  }
}

function bootstrapLite() {
  const startTime = Date.now()
  log('Starting bootstrap-lite (fast validation for AI tools)...', 'info')
  console.log('')

  // Step 1: Check TypeScript references consistency
  if (
    !runStep(
      'Checking TypeScript references',
      'node scripts/checkTSReferences.js'
    )
  ) {
    process.exit(1)
  }
  console.log('')

  // Step 2: Build TypeScript types
  // This generates .d.ts files AND validates types (build fails if type errors exist)
  log('Building TypeScript types (this also validates types)...', 'info')
  const args = process.argv.slice(2)
  const forceRebuild = args.includes('--force')
  const buildCommand = forceRebuild
    ? 'tsc -b tsconfig.references.json --force'
    : 'npm run build:types'

  if (forceRebuild) {
    log('Force rebuild enabled - bypassing TypeScript build cache', 'warning')
  }

  if (!runStep('Building TypeScript types', buildCommand)) {
    process.exit(1)
  }
  console.log('')

  // Step 3: Optional - Lint changed files only
  if (args.includes('--lint')) {
    if (!runStep('Linting changed files', 'npm run lint:changes')) {
      log('Linting failed but continuing...', 'warning')
    }
    console.log('')
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2)
  console.log('')
  log(`✨ bootstrap-lite completed successfully in ${totalTime}s!`, 'success')
  console.log('')
  log(
    'Note: This builds types but skips Babel transpilation. For full builds, run: npm run bootstrap',
    'info'
  )
}

bootstrapLite()
