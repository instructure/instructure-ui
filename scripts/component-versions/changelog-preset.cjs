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

'use strict'

/**
 * conventional-changelog preset used by `lerna version` (see
 * packages/ui-scripts/lib/utils/npm.ts). It is the stock angular preset with one
 * addition: every changelog entry is prefixed with the published component
 * version(s) the change touched, e.g.
 *
 *     * [v11.6, v11.7] **ui-form-field:** keep messages out of the accessible name ([abc1234](...))
 *
 * The versions are computed at changelog-generation time from each commit's
 * changed files (./resolveComponentVersions.cjs), so there is nothing to remember
 * when committing and historical commits are annotated too. A change that does not
 * touch a versioned component folder gets no prefix ("if applicable").
 *
 * See docs/contributing/multi-version-system.md for the rationale.
 */

const { execFileSync } = require('node:child_process')
const { resolveComponentVersions } = require('./resolveComponentVersions.cjs')

const HASH_RE = /^[0-9a-f]{7,40}$/i

let cachedRepoRoot
function repoRoot() {
  if (!cachedRepoRoot) {
    cachedRepoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
      encoding: 'utf-8'
    }).trim()
  }
  return cachedRepoRoot
}

/** Resolve the component versions a commit touched, from its changed files. */
function versionsForCommit(hash) {
  if (typeof hash !== 'string' || !HASH_RE.test(hash)) return []
  try {
    const out = execFileSync(
      'git',
      ['diff-tree', '--no-commit-id', '--name-only', '-r', hash],
      { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }
    )
    const files = out
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    return resolveComponentVersions(files, { repoRoot: repoRoot() })
  } catch {
    // Never let changelog generation fail over a missing/odd commit.
    return []
  }
}

/** Insert the component-versions segment right after the leading bullet. */
function withVersionPartial(commitPartial) {
  return commitPartial.replace(
    /^\*/,
    '*{{#if componentVersions}} [{{componentVersions}}]{{/if}}'
  )
}

module.exports = async function createPreset(presetConfig) {
  const angular = require('conventional-changelog-angular')
  const base = await (typeof angular === 'function'
    ? angular(presetConfig)
    : angular)

  const baseTransform = base.writerOpts.transform

  base.writerOpts = {
    ...base.writerOpts,
    commitPartial: withVersionPartial(base.writerOpts.commitPartial),
    transform(commit, context) {
      // Capture the hash before angular's transform shortens it in place.
      const hash = commit.hash
      const transformed = baseTransform(commit, context)
      // angular's transform returns undefined for discarded commit types
      if (!transformed) return transformed
      const versions = versionsForCommit(hash)
      if (versions.length > 0) {
        transformed.componentVersions = versions.join(', ')
      }
      return transformed
    }
  }

  // Keep conventionalChangelog.writerOpts pointed at the same wrapped object so
  // both the recommended-bump and changelog paths use our template/transform.
  if (base.conventionalChangelog) {
    base.conventionalChangelog.writerOpts = base.writerOpts
  }

  return base
}

// Exposed for unit testing without spinning up the whole changelog pipeline.
module.exports._internal = {
  versionsForCommit,
  withVersionPartial
}
