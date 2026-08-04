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

// @ts-check
'use strict'

/**
 * Prints a `Component-Versions:` git-trailer line for the currently staged files,
 * e.g. `Component-Versions: v11.6, v11.7`, or nothing when the staged changes do
 * not touch a versioned component folder.
 */

const { execFileSync } = require('node:child_process')
const { resolveComponentVersions } = require('./resolveComponentVersions.cjs')

try {
  const repoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
    encoding: 'utf-8'
  }).trim()

  const staged = execFileSync('git', ['diff', '--cached', '--name-only'], {
    encoding: 'utf-8'
  })
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)

  const versions = resolveComponentVersions(staged, { repoRoot })
  if (versions.length > 0) {
    process.stdout.write(`Component-Versions: ${versions.join(', ')}\n`)
  }
} catch {}
