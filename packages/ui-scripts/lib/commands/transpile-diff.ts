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

import { execFileSync, execSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync
} from 'node:fs'
import { dirname, join, relative } from 'node:path'

type Status = 'changed' | 'added' | 'removed'
type ModuleDir = 'es' | 'lib' | 'types'

type Snapshot = {
  ref: string
  sha: string
  /** normalized output tree, mirrors packages/<pkg>/<es|lib|types>/... */
  dir: string
  fileCount: number
  cached: boolean
}

// ---------------------------------------------------------------------------
// git helpers
// ---------------------------------------------------------------------------

function git(args: string[], cwd: string): string {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
}

/** Run `git diff --no-index`, which exits 1 when files differ — capture stdout anyway. */
function gitDiff(args: string[], cwd: string): string {
  try {
    return execFileSync('git', ['diff', '--no-index', ...args], {
      cwd,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 512
    })
  } catch (err: any) {
    // exit code 1 simply means "differences found"
    if (err && typeof err.stdout === 'string') return err.stdout
    throw err
  }
}

// ---------------------------------------------------------------------------
// normalization — the pluggable noise-reduction layer
//
// Each normalizer is a pure (content) => content. They strip everything that
// changes between builds without reflecting a real transpiler difference.
// To add AST-level normalization later (e.g. reprint through dprint so pure
// formatting collapses), append a normalizer here — nothing else changes.
// ---------------------------------------------------------------------------

const LICENSE_BANNER =
  /^\/\*[\s\S]*?Permission is hereby granted[\s\S]*?\*\/\n?/

const normalizers: Array<(content: string) => string> = [
  // drop the fixed MIT license banner that prefixes every emitted file
  (c) => c.replace(LICENSE_BANNER, ''),
  // sourcemap references change every build and are not semantic
  (c) => c.replace(/^\/\/# sourceMappingURL=.*$/gm, ''),
  (c) => c.replace(/\/\*# sourceMappingURL=.*?\*\//g, ''),
  // normalize line endings + trailing whitespace
  (c) => c.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, ''),
  // collapse runs of blank lines and trim file edges
  (c) => c.replace(/\n{3,}/g, '\n\n').trim() + '\n'
]

function normalize(content: string, raw: boolean): string {
  if (raw) return content
  return normalizers.reduce((acc, fn) => fn(acc), content)
}

// ---------------------------------------------------------------------------
// snapshotting
// ---------------------------------------------------------------------------

function walk(dir: string): string[] {
  if (!existsSync(dir)) return []
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

/** Copy every package's built output through the normalizers into `destRoot`. */
function collect(
  worktree: string,
  destRoot: string,
  modules: ModuleDir[],
  raw: boolean
): number {
  const packagesDir = join(worktree, 'packages')
  let count = 0
  for (const pkg of readdirSync(packagesDir)) {
    for (const mod of modules) {
      const srcDir = join(packagesDir, pkg, mod)
      for (const file of walk(srcDir)) {
        if (file.endsWith('.map')) continue // sourcemaps are not semantic
        const rel = relative(worktree, file)
        const dest = join(destRoot, rel)
        const isText = /\.(js|jsx|ts|tsx|mjs|cjs|d\.ts)$/.test(file)
        const content = readFileSync(file, isText ? 'utf8' : null)
        mkdirSync(dirname(dest), { recursive: true })
        writeFileSync(
          dest,
          isText ? normalize(content as string, raw) : (content as Buffer)
        )
        count++
      }
    }
  }
  return count
}

/**
 * Reprint the whole snapshot tree with the repo's dprint config (already a
 * ui-scripts dependency — no new dep). This collapses pure-formatting
 * differences so that swapping transpilers (Babel → SWC) or compilers
 * (tsc → tsgo) shows only *real* code changes, not whitespace/quote churn.
 *
 * IMPORTANT: dprint resolves its file globs relative to `cwd`, NOT to the
 * config location — so we always run it *inside* the snapshot dir. Running it
 * from the repo root would reformat the actual source tree.
 */
function dprintFormat(dir: string, repoRoot: string): void {
  try {
    execFileSync(
      'npx',
      [
        'dprint',
        'fmt',
        '--config',
        join(repoRoot, 'dprint.json'),
        '--allow-no-files',
        '**/*.js',
        '**/*.jsx',
        '**/*.ts',
        '**/*.tsx',
        '**/*.mjs',
        '**/*.cjs'
      ],
      { cwd: dir, stdio: 'ignore' }
    )
  } catch {
    // a file SWC/tsgo emits may use syntax dprint's parser rejects — don't
    // fail the whole run, just leave those files in their regex-normalized form
    console.warn(
      '  dprint reprint reported issues; some files left un-reprinted'
    )
  }
}

function buildSnapshot(
  ref: string,
  repoRoot: string,
  workRoot: string,
  modules: ModuleDir[],
  raw: boolean,
  semantic: boolean,
  frozen: boolean
): Snapshot {
  const sha = git(['rev-parse', ref], repoRoot)
  const mode = raw ? 'raw' : semantic ? 'semantic' : 'norm'
  const cacheKey = `${sha}-${mode}-${modules.join('+')}`
  const cacheDir = join(workRoot, 'cache', cacheKey)

  // SHA-keyed cache: an unchanged ref (e.g. a tag, or master) is reused.
  if (existsSync(cacheDir) && walk(cacheDir).length > 0) {
    console.info(`✓ reusing cached snapshot for ${ref} (${sha.slice(0, 9)})`)
    return {
      ref,
      sha,
      dir: cacheDir,
      fileCount: walk(cacheDir).length,
      cached: true
    }
  }

  const worktree = join(workRoot, 'worktrees', sha)
  rmSync(worktree, { recursive: true, force: true })

  console.info(`\n▸ ${ref} (${sha.slice(0, 9)}) — creating worktree`)
  git(['worktree', 'add', '--force', '--detach', worktree, sha], repoRoot)

  try {
    const opts = { cwd: worktree, stdio: 'inherit' as const }

    console.info(`▸ ${ref} — installing dependencies`)
    try {
      execSync('pnpm install --frozen-lockfile', opts)
    } catch (err) {
      if (frozen) throw err
      console.warn(
        '  frozen install failed, retrying without --frozen-lockfile'
      )
      execSync('pnpm install', opts)
    }

    console.info(`▸ ${ref} — running bootstrap (clean + full build)`)
    try {
      execSync('pnpm run bootstrap', opts)
    } catch {
      throw new Error(
        `ref "${ref}" (${sha.slice(
          0,
          9
        )}) failed to build — "pnpm run bootstrap" exited non-zero (see output above).\n` +
          `  This is the ref's own build, not transpile-diff. Common causes: the ref does not type-check under the\n` +
          `  current toolchain (bootstrap runs a strict "build:types"), or its lockfile/Node version has drifted.`
      )
    }

    rmSync(cacheDir, { recursive: true, force: true })
    const fileCount = collect(worktree, cacheDir, modules, raw)
    if (fileCount === 0) {
      throw new Error(
        `ref "${ref}" produced no output in ${modules.join(
          '/'
        )} — its build likely failed`
      )
    }
    if (semantic && !raw) {
      console.info(`▸ ${ref} — reprinting with dprint (semantic compare)`)
      dprintFormat(cacheDir, repoRoot)
    }
    console.info(`✓ ${ref} — captured ${fileCount} files`)
    return { ref, sha, dir: cacheDir, fileCount, cached: false }
  } finally {
    git(['worktree', 'remove', '--force', worktree], repoRoot)
  }
}

// ---------------------------------------------------------------------------
// reporting
// ---------------------------------------------------------------------------

function bucketStatus(
  repoRoot: string,
  a: Snapshot,
  b: Snapshot
): Record<Status, number> {
  const out: Record<Status, number> = { changed: 0, added: 0, removed: 0 }
  const nameStatus = gitDiff(['--name-status', a.dir, b.dir], repoRoot)
  for (const line of nameStatus.split('\n')) {
    const code = line.trim()[0]
    if (code === 'M') out.changed++
    else if (code === 'A') out.added++
    else if (code === 'D') out.removed++
  }
  return out
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderHtml(a: Snapshot, b: Snapshot, diff: string): string {
  const files = diff
    .split(/^diff --git /m)
    .slice(1)
    .map((chunk) => {
      const header = chunk.split('\n', 1)[0]
      const body = chunk
        .split('\n')
        .map((l) => {
          const cls =
            l.startsWith('+') && !l.startsWith('+++')
              ? 'add'
              : l.startsWith('-') && !l.startsWith('---')
              ? 'del'
              : l.startsWith('@@')
              ? 'hunk'
              : ''
          return `<span class="${cls}">${esc(l)}</span>`
        })
        .join('\n')
      return `<details><summary>${esc(
        header
      )}</summary><pre>${body}</pre></details>`
    })
    .join('\n')

  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Transpile diff</title>
<style>
  body { font: 13px ui-monospace, SFMono-Regular, Menlo, monospace; margin: 0; background: #fafafa; color: #222; }
  header { position: sticky; top: 0; background: #fff; border-bottom: 1px solid #e5e5e5; padding: 16px 24px; }
  h1 { margin: 0 0 8px; font: 600 18px system-ui, sans-serif; }
  .meta { font: 13px system-ui, sans-serif; color: #666; }
  main { padding: 16px 24px; }
  details { background: #fff; border: 1px solid #e5e5e5; border-radius: 6px; margin-bottom: 8px; }
  summary { cursor: pointer; padding: 8px 12px; font-weight: 600; }
  pre { margin: 0; padding: 12px; overflow-x: auto; border-top: 1px solid #f0f0f0; white-space: pre; }
  pre span { display: block; }
  .add { background: #e6ffec; }
  .del { background: #ffebe9; }
  .hunk { color: #0969da; }
  .empty { padding: 24px; color: #1a7f37; font: 600 15px system-ui, sans-serif; }
</style></head>
<body>
  <header>
    <h1>Transpile diff</h1>
    <div class="meta">${esc(a.ref)} (${a.sha.slice(0, 9)}, ${
    a.fileCount
  } files) → ${esc(b.ref)} (${b.sha.slice(0, 9)}, ${b.fileCount} files)</div>
  </header>
  <main>${
    files || '<div class="empty">No differences — output is identical.</div>'
  }</main>
</body></html>`
}

// ---------------------------------------------------------------------------
// command
// ---------------------------------------------------------------------------

export default {
  command: 'transpile-diff [refA] [refB]',
  desc: 'Compare the transpiled output (es/lib/types) of two git refs',
  builder: (yargs: any) => {
    yargs.positional('refA', {
      describe: 'baseline ref (branch, tag or commit)',
      default: 'master'
    })
    yargs.positional('refB', {
      describe: 'ref to compare against the baseline',
      default: 'HEAD'
    })
    yargs.option('modules', {
      string: true,
      desc: 'Which output dirs to compare',
      default: 'es,lib,types',
      coerce: (v: string) => v.split(',') as ModuleDir[]
    })
    yargs.option('raw', {
      boolean: true,
      default: false,
      desc: 'Skip normalization (compare raw bytes incl. banner/whitespace)'
    })
    yargs.option('semantic', {
      boolean: true,
      default: false,
      desc: 'Reprint with dprint before diffing so formatting differs are ignored (recommended for Babel→SWC / tsc→tsgo)'
    })
    yargs.option('no-frozen', {
      boolean: true,
      desc: 'Allow lockfile changes when installing (useful for old refs)'
    })
    yargs.option('open', {
      boolean: true,
      default: true,
      desc: 'Open the HTML report when done'
    })
    yargs.strictOptions(true)
  },
  handler: async (argv: any) => {
    const repoRoot = git(['rev-parse', '--show-toplevel'], process.cwd())
    const workRoot = join(repoRoot, '.transpile-diff')
    const modules: ModuleDir[] = argv.modules
    const raw: boolean = argv.raw
    const semantic: boolean = argv.semantic
    const frozen: boolean = argv.frozen !== false

    if (argv.refA === argv.refB) {
      console.error(`Nothing to compare: refA and refB are both "${argv.refA}"`)
      process.exit(1)
    }

    mkdirSync(workRoot, { recursive: true })

    let a: Snapshot
    let b: Snapshot
    try {
      a = buildSnapshot(
        argv.refA,
        repoRoot,
        workRoot,
        modules,
        raw,
        semantic,
        frozen
      )
      b = buildSnapshot(
        argv.refB,
        repoRoot,
        workRoot,
        modules,
        raw,
        semantic,
        frozen
      )
    } catch (err: any) {
      console.error(`\n✗ ${err && err.message ? err.message : String(err)}`)
      process.exit(1)
    }

    const counts = bucketStatus(repoRoot, a, b)
    const total = counts.changed + counts.added + counts.removed

    console.info('\n──────────────────────────────────────────')
    console.info(`  ${a.ref} → ${b.ref}`)
    console.info(
      `  changed: ${counts.changed}  added: ${counts.added}  removed: ${counts.removed}`
    )
    console.info('──────────────────────────────────────────\n')

    // git prints the absolute snapshot paths (a/<cacheDir>/packages/...); strip
    // the cache-dir prefixes so the report shows clean packages/... paths.
    const fullDiff = gitDiff([a.dir, b.dir], repoRoot)
      .split(`${a.dir.replace(/^\//, '')}/`)
      .join('')
      .split(`${b.dir.replace(/^\//, '')}/`)
      .join('')
    const reportPath = join(
      workRoot,
      `report-${a.sha.slice(0, 9)}-${b.sha.slice(0, 9)}.html`
    )
    writeFileSync(reportPath, renderHtml(a, b, fullDiff))
    console.info(`Report: ${reportPath}`)

    if (total > 0 && argv.open) {
      try {
        const opener =
          process.platform === 'darwin'
            ? 'open'
            : process.platform === 'win32'
            ? 'start'
            : 'xdg-open'
        execFileSync(opener, [reportPath], { stdio: 'ignore' })
      } catch {
        /* opening is best-effort */
      }
    }

    // non-zero exit when anything differs, so it is usable in scripts
    process.exit(total > 0 ? 1 : 0)
  }
}
