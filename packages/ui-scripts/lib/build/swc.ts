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

import fs from 'node:fs'
import path from 'node:path'
import { parseFile, transform, transformFile, type Options } from '@swc/core'
import type { Argv } from 'yargs'

const SOURCE_EXTENSIONS = /\.(ts|tsx|js|jsx)$/
const IGNORED = /(\.test\.(js|jsx|ts|tsx)$|[\\/]__tests__[\\/])/
// These packages need their console calls in the published output
// (e.g. deprecation warnings), so they are never stripped.
const KEEP_CONSOLE = new Set([
  '@instructure/debounce',
  '@instructure/ui-axe-check',
  '@instructure/ui-icons'
])

const SWC_OPTIONS: Options = {
  swcrc: false,
  sourceMaps: false,
  module: { type: 'es6' },
  env: {
    targets: [
      'last 2 chrome versions',
      'last 2 firefox versions',
      'last 2 edge versions',
      'last 2 ios versions',
      'last 2 opera versions',
      'last 2 safari versions',
      'last 2 ChromeAndroid versions'
    ]
  },
  jsc: {
    externalHelpers: true,
    transform: {
      legacyDecorator: true,
      useDefineForClassFields: false,
      react: { runtime: 'automatic', importSource: '@emotion/react' }
    }
  }
}

// Replaces every `console.*(...)` call (including `console[level](...)`)
// with `void 0`, so production builds ship without console output.
function stripConsoleCalls(node: any): any {
  if (Array.isArray(node)) return node.map(stripConsoleCalls)
  if (!node || typeof node !== 'object') return node
  if (
    node.type === 'CallExpression' &&
    node.callee?.type === 'MemberExpression' &&
    node.callee.object?.type === 'Identifier' &&
    node.callee.object.value === 'console'
  ) {
    return {
      type: 'UnaryExpression',
      span: node.span,
      operator: 'void',
      argument: { type: 'NumericLiteral', span: node.span, value: 0 }
    }
  }
  // The AST is edited in place: SWC panics (`NoFileFor(BytePos)`) when it gets
  // a copied AST back from `parseFile`.
  // oxlint-disable-next-line no-param-reassign
  for (const key of Object.keys(node)) node[key] = stripConsoleCalls(node[key])
  return node
}

function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return (fs.readdirSync(dir, { recursive: true }) as string[])
    .map((f) => path.join(dir, f))
    .filter((f) => fs.statSync(f).isFile())
}

function findPackages(root: string): string[] {
  const packagesDir = path.join(root, 'packages')
  return fs
    .readdirSync(packagesDir)
    .map((name) => path.join(packagesDir, name))
    .filter((dir) => {
      const pkgFile = path.join(dir, 'package.json')
      if (!fs.existsSync(pkgFile)) return false
      const build = JSON.parse(fs.readFileSync(pkgFile, 'utf8')).scripts?.build
      return typeof build === 'string' && build.startsWith('ui-scripts build')
    })
}

async function compileFile(
  pkgDir: string,
  file: string,
  stripConsole: boolean,
  copyFiles: boolean
) {
  const rel = path.relative(path.join(pkgDir, 'src'), file)
  if (IGNORED.test(rel)) return
  const isSource = SOURCE_EXTENSIONS.test(file) && !file.endsWith('.d.ts')
  if (!isSource && !copyFiles) return
  const out = path.join(
    pkgDir,
    'es',
    isSource ? rel.replace(SOURCE_EXTENSIONS, '.js') : rel
  )
  fs.mkdirSync(path.dirname(out), { recursive: true })
  if (isSource) {
    const parser = {
      syntax: 'typescript',
      tsx: !file.endsWith('.ts'),
      decorators: true
    } as const
    const options = {
      ...SWC_OPTIONS,
      filename: file,
      jsc: { ...SWC_OPTIONS.jsc, parser }
    }
    try {
      const { code } = stripConsole
        ? await transform(
            stripConsoleCalls(await parseFile(file, parser)),
            options
          )
        : await transformFile(file, options)
      fs.writeFileSync(out, code)
    } catch (e) {
      throw new Error(`Failed to compile ${file}`, { cause: e })
    }
  } else {
    fs.copyFileSync(file, out)
  }
}

// Runs `fn` over `items` with at most `limit` in flight at once.
async function pool<T>(items: T[], limit: number, fn: (item: T) => unknown) {
  let next = 0
  const workers = Array.from({ length: limit }, async () => {
    while (next < items.length) await fn(items[next++])
  })
  await Promise.all(workers)
}

function shouldStripConsole(pkgDir: string, production: boolean) {
  const { name } = JSON.parse(
    fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8')
  )
  return (
    production &&
    process.env.GITHUB_PULL_REQUEST_PREVIEW !== 'true' &&
    !KEEP_CONSOLE.has(name)
  )
}

export default {
  command: 'build',
  desc: 'Build the packages with SWC',
  builder: (yargs: Argv) => {
    yargs.option('all', {
      boolean: true,
      desc: 'Build every package in the monorepo in a single process'
    })
    yargs.option('copy-files', {
      boolean: true,
      desc: 'Copy files that will not be compiled'
    })
    yargs.option('watch', {
      boolean: true,
      desc: 'Run constantly and recompile on changes'
    })
    yargs.strictOptions(true)
  },
  handler: async (argv: any) => {
    const production =
      !argv.watch && (process.env.NODE_ENV || 'production') === 'production'
    const packages = argv.all ? findPackages(process.cwd()) : [process.cwd()]

    const jobs: [string, string, boolean][] = []
    for (const pkgDir of packages) {
      const stripConsole = shouldStripConsole(pkgDir, production)
      for (const file of listFiles(path.join(pkgDir, 'src'))) {
        jobs.push([pkgDir, file, stripConsole])
      }
    }

    const start = Date.now()
    await pool(jobs, 64, ([pkgDir, file, stripConsole]) =>
      compileFile(pkgDir, file, stripConsole, argv.copyFiles)
    )
    console.info(
      `Compiled ${jobs.length} files in ${packages.length} package(s) in ${
        Date.now() - start
      }ms`
    )

    if (argv.watch) {
      for (const pkgDir of packages) {
        const srcDir = path.join(pkgDir, 'src')
        fs.watch(srcDir, { recursive: true }, (_event, filename) => {
          if (!filename) return
          const file = path.join(srcDir, filename.toString())
          if (!fs.existsSync(file)) return
          compileFile(pkgDir, file, false, argv.copyFiles).catch((e) =>
            console.error(e)
          )
        })
      }
    }
  }
}
