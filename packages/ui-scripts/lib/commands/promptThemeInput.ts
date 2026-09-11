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
import inquirer from 'inquirer'
import { existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import buildFrozenThemes from '../build/buildThemes/extractThemeComponentData.ts'

// Anchor on the workspace file so paths are independent of where this runs from.
const repoRoot = (() => {
  let dir = dirname(fileURLToPath(import.meta.url))
  while (!existsSync(join(dir, 'pnpm-workspace.yaml'))) dir = dirname(dir)
  return dir
})()

// styles.ts sits either directly in the component folder or under a version
// folder, so this looks anywhere inside.
const hasStyles = (dir: string): boolean =>
  readdirSync(dir, { withFileTypes: true }).some((entry) =>
    entry.isDirectory()
      ? hasStyles(join(dir, entry.name))
      : entry.name === 'styles.ts'
  )

// Version folders are `v1`, `v2`, and so on. Sorted numerically so `v10` does
// not sort before `v2`.
const versionsOf = (componentDir: string) =>
  readdirSync(componentDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^v\d+$/.test(entry.name))
    .map((entry) => Number(entry.name.slice(1)))
    .sort((a, b) => a - b)

/**
 * A valid component is a capitalized folder under src/ that is versioned, whose
 * latest version has a styles.ts and has not been frozen yet. A latest version
 * that already holds a frozenThemes folder has nothing left to generate.
 */
const componentsIn = (packageName: string) => {
  const src = join(repoRoot, 'packages', packageName, 'src')
  if (!existsSync(src)) return []
  return readdirSync(src, { withFileTypes: true })
    .filter((entry) => {
      if (!entry.isDirectory() || !/^[A-Z]/.test(entry.name)) return false
      const componentDir = join(src, entry.name)
      const versions = versionsOf(componentDir)
      if (versions.length === 0) return false
      const latest = join(componentDir, `v${versions.at(-1)}`)
      return !existsSync(join(latest, 'frozenThemes')) && hasStyles(latest)
    })
    .map((entry) => entry.name)
}

const promptThemeInput = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'themes',
      message: 'Themes:',
      choices: ['dark', 'light', 'legacyCanvas', 'legacyCanvasHighContrast'],
      validate: (selected: unknown[]) =>
        selected.length > 0 || 'Select at least one theme.'
    },
    {
      type: 'select',
      name: 'componentPackageName',
      message: 'Component package name:',
      choices: readdirSync(join(repoRoot, 'packages'), { withFileTypes: true })
        .filter(
          (entry) => entry.isDirectory() && componentsIn(entry.name).length > 0
        )
        .map((entry) => entry.name)
    },
    {
      type: 'select',
      name: 'componentName',
      message: 'Component name:',
      choices: (answers: { componentPackageName: string }) =>
        componentsIn(answers.componentPackageName)
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version number (e.g. v2):',
      validate: (
        value: string,
        answers: { componentPackageName: string; componentName: string }
      ) => {
        // Without this an empty answer becomes the folder `v`, which never
        // exists, so the frozenThemes check below would wave it through.
        const trimmed = value.trim()
        if (!/^v?\d+$/.test(trimmed)) {
          return 'Enter a version number, e.g. v2.'
        }

        // Accept either `v2` or `2` so a missing prefix can't skip the check.
        const folder = `v${trimmed.replace(/^v/, '')}`
        return (
          !existsSync(
            join(
              repoRoot,
              'packages',
              answers.componentPackageName,
              'src',
              answers.componentName,
              folder,
              'frozenThemes'
            )
          ) ||
          `${answers.componentName} ${folder} already has a frozenThemes folder.`
        )
      }
    }
  ])

  await buildFrozenThemes(answers)
}

export default promptThemeInput
