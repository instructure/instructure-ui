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
import { execSync } from 'child_process'
import path from 'path'

const opts = { stdio: 'inherit' }

function format(ms) {
  return `${(ms / 1000).toFixed(1)}s`
}

function mark(name) {
  console.log(`\n================================================`)
  console.log(`${name}...`)
  if (steps.length) {
    steps[steps.length - 1].duration =
      Date.now() - steps[steps.length - 1].start
  }
  steps.push({ name, start: Date.now(), duration: 0 })
}

const steps = []
const bootstrapStart = Date.now()

mark('Deleting build artifacts')
execSync(path.resolve('scripts/clean.mjs'), opts)

mark('Building themes')
execSync('pnpm run build:themes', opts)

mark('Preparing icons')
execSync('pnpm --filter @instructure/ui-icons prepare-build', opts)

mark('Generating package list for codemods')
execSync(
  'pnpm --filter @instructure/ui-codemods generate:versioned-exports',
  opts
)

// The Babel build and the TypeScript declaration build
// (tsc -b, src -> .d.ts) are mutually independent, so we
// run them concurrently. `--kill-others-on-fail` aborts the whole step (and
// thus bootstrap) the moment either branch fails.
mark('Building packages + types (parallel)')
execSync(
  'pnpm exec concurrently --kill-others-on-fail -n build,types -c blue,green ' +
    '"pnpm run build" "pnpm run build:types"',
  opts
)

mark('Generating design tokens')
execSync('pnpm run build:tokens', opts)

// Log build time summary (the parallel build above is measured as one section).
steps[steps.length - 1].duration = Date.now() - steps[steps.length - 1].start

const total = Date.now() - bootstrapStart
const nameW = Math.max(...steps.map((s) => s.name.length))
const durW = Math.max(
  ...steps.map((s) => format(s.duration).length),
  format(total).length
)
const tableWidth = nameW + durW + 7

console.log('\n' + '='.repeat(tableWidth))
console.log(' Bootstrap Summary')
console.log('='.repeat(tableWidth))
for (const s of steps) {
  console.log(` ${s.name.padEnd(nameW)}  ${format(s.duration).padStart(durW)}`)
}
console.log('-'.repeat(tableWidth))
console.log(` ${'Total'.padEnd(nameW)}  ${format(total).padStart(durW)}`)
console.log('='.repeat(tableWidth))
