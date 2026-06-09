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

/*
 * Builds the ui-web-core (Lit + Web Components) Storybook and copies its
 * static output to packages/__docs__/__build__/storybook/parchment/, so the
 * docs app can iframe it at the `/parchment` route.
 *
 * Dev workflow is unaffected: `pnpm --filter @instructure/ui-web-core
 * storybook` runs at port 6006 for live development.
 */

import { spawnSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '../../../')
const docsBuildDir = path.resolve(__dirname, '../__build__')
const storybookOutDir = path.join(docsBuildDir, 'storybook')

const packages = [
  {
    name: '@instructure/ui-web-core',
    dir: 'ui-web-core',
    mountAs: 'parchment'
  }
]

function runBuildStorybook(packageName: string): void {
  // eslint-disable-next-line no-console
  console.log(`Building Storybook: ${packageName}`)
  const result = spawnSync(
    'pnpm',
    ['--filter', packageName, 'build-storybook'],
    { cwd: projectRoot, stdio: 'inherit' }
  )
  if (result.status !== 0) {
    throw new Error(
      `build-storybook failed for ${packageName} (exit ${result.status})`
    )
  }
}

function copyStorybookOutput(packageDir: string, mountAs: string): void {
  const src = path.join(projectRoot, 'packages', packageDir, 'storybook-static')
  const dest = path.join(storybookOutDir, mountAs)
  if (!fs.existsSync(src)) {
    throw new Error(`Expected Storybook output at ${src}`)
  }
  fs.rmSync(dest, { recursive: true, force: true })
  fs.mkdirSync(dest, { recursive: true })
  fs.cpSync(src, dest, { recursive: true })
  // eslint-disable-next-line no-console
  console.log(`Copied ${src} -> ${dest}`)
}

function main(): void {
  fs.mkdirSync(storybookOutDir, { recursive: true })
  for (const pkg of packages) {
    runBuildStorybook(pkg.name)
    copyStorybookOutput(pkg.dir, pkg.mountAs)
  }
  // eslint-disable-next-line no-console
  console.log('Storybook(s) built and copied under', storybookOutDir)
}

main()
