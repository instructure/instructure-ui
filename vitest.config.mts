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

/// <reference types="vitest" />

import { defineConfig, configDefaults } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import path from 'path'
import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const momentTimezoneDir = path.dirname(require.resolve('moment-timezone'))
const momentDir = path.dirname(
  require.resolve('moment', { paths: [momentTimezoneDir] })
)
const momentWithLocales = path.join(momentDir, 'min', 'moment-with-locales.js')

// Build Vite resolve aliases for every @instructure/* workspace package,
// pointing bare/subpath specifiers at TypeScript source.
// This lets browser-mode tests run without pre-building the library — Vite
// transforms source on demand.
function getWorkspaceAliases() {
  const packagesDir = path.resolve(__dirname, 'packages')
  const aliases: { find: string | RegExp; replacement: string }[] = []

  for (const pkg of fs.readdirSync(packagesDir)) {
    const pkgPath = path.join(packagesDir, pkg)
    if (!fs.statSync(pkgPath).isDirectory()) continue
    const pkgJsonPath = path.join(pkgPath, 'package.json')
    if (!fs.existsSync(pkgJsonPath)) continue

    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
    const pkgName: string | undefined = pkgJson.name
    if (!pkgName || !pkgName.startsWith('@instructure/')) continue
    if (pkgJson.exports) {
      for (const [subpath, target] of Object.entries<any>(pkgJson.exports)) {
        if (subpath.includes('*')) continue
        const importPath =
          (typeof target === 'object' ? target.import : target) || ''
        // Map built output path (./es/X.js) back to source (./src/X.ts)
        const srcPath = importPath
          .replace(/^\.\/es\//, './src/')
          .replace(/\.js$/, '.ts')
        const resolved = path.join(pkgPath, srcPath)
        if (!fs.existsSync(resolved)) continue
        if (subpath === '.') {
          // exact bare-name match: `@instructure/ui-x`
          aliases.push({
            find: new RegExp(`^${pkgName}$`),
            replacement: resolved
          })
        } else {
          // exact subpath match: `@instructure/ui-x/latest`
          const sub = subpath.replace(/^\.\//, '')
          aliases.push({
            find: new RegExp(`^${pkgName}/${sub}$`),
            replacement: resolved
          })
        }
      }
    }
    // source imports: `@instructure/ui-x/src/...` -> package src dir
    aliases.push({
      find: `${pkgName}/src`,
      replacement: path.join(pkgPath, 'src')
    })

  }

  return aliases
}

export default defineConfig({
  test: {
    globals: true,
    watchTriggerPatterns: [
      {
        // matches any file inside the __testfixtures__ directory
        pattern: /^.*\/ui-codemods\/.*\/__testfixtures__\/.*$/,
        // file is the full path. e.g.  /Users/MyUser/code/instructure-ui/packages/ui-codemods/lib/__node_tests__/__testfixtures__/colors.input.ts
        testsToRun: (file, _match) => {
          const dirName = path.basename(path.dirname(file))
          // reruns all tests that match the directory name of the test fixture
          return `packages/ui-codemods/lib/__node_tests__/${dirName}.test.ts`
        }
      }
    ],
    projects: [
      {
        // DOM-based unit tests
        test: {
          // Allows using APIs like Jest without importing them
          globals: true,
          include: ['**/__tests__/**/*.test.tsx'],
          // these packages' tests run in the `browser` project,
          // so exclude them here to avoid double-running.
          exclude: [
            ...configDefaults.exclude,
            'packages/emotion/**',
            'packages/ui-a11y-content/**',
            'packages/ui-a11y-utils/**',
            'packages/ui-alerts/**',
            'packages/ui-avatar/**',
            'packages/ui-badge/**',
            'packages/ui-dialog/**'
          ],
          environment: 'jsdom',
          setupFiles: './vitest.setup.ts',
          name: { label: 'web', color: 'blue' }
        }
      },
      {
        // tests for node scripts
        test: {
          globals: true,
          include: ['**/__node_tests__/**/*.test.{ts,tsx}'],
          environment: 'node',
          name: { label: 'node', color: 'magenta' }
        }
      },
      {
        // Real-browser component tests (Vitest browser mode via Playwright).
        // Run just these with: pnpm exec vitest --project browser
        resolve: {
          alias: [
            // Bare `moment` -> the all-locales build (see above). Matches
            // `moment` exactly, never `moment-timezone` or `moment/<subpath>`.
            { find: /^moment$/, replacement: momentWithLocales },
            // `moment/<subpath>` -> resolved package dir (e.g. moment/locale/*).
            { find: /^moment\/(.*)$/, replacement: path.join(momentDir, '$1') },
            ...getWorkspaceAliases()
          ]
        },
        test: {
          globals: true, // TODO try to set it to false
          include: [
            'packages/emotion/**/__tests__/**/*.test.tsx',
            'packages/ui-a11y-content/**/__tests__/**/*.test.tsx',
            'packages/ui-a11y-utils/**/__tests__/**/*.test.tsx',
            'packages/ui-alerts/**/__tests__/**/*.test.tsx',
            'packages/ui-avatar/**/__tests__/**/*.test.tsx',
            'packages/ui-badge/**/__tests__/**/*.test.tsx',
            'packages/ui-dialog/**/__tests__/**/*.test.tsx'
          ],
          setupFiles: './vitest.setup.browser.ts',
          name: { label: 'browser', color: 'green' },
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
            screenshotFailures: false
          }
        }
      }
    ]

  }
})
