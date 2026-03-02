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
import { execSync } from 'node:child_process'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const metaPackageRoot = join(process.cwd(), 'packages', 'ui')
const metaPackageSrc = join(metaPackageRoot, 'src')
const metaPackageJsonPath = join(metaPackageRoot, 'package.json')

/**
 * Creates a new versioned export file (e.g. v11_9.ts) in the `ui` meta-package
 * by cloning the latest existing one and replacing version references. Also
 * updates the meta-package's package.json exports map with the new version
 * entry and points `./latest` to it. No-ops if the file already exists.
 *
 * @param {string} version - Semver string (e.g. "11.9.0")
 */
export const addNewExportFileToMetaPackage = async (version) => {
  const [major, minor] = version.split('.')
  const expectedFile = `v${major}_${minor}.ts`

  const files = await readdir(metaPackageSrc)
  if (files.includes(expectedFile)) {
    return
  }

  const latestExportFile = files
    .filter((f) => /^v\d+_\d+\.ts$/.test(f))
    .sort((a, b) => {
      const [aMaj, aMin] = a
        .replace(/^v|\.ts$/g, '')
        .split('_')
        .map(Number)
      const [bMaj, bMin] = b
        .replace(/^v|\.ts$/g, '')
        .split('_')
        .map(Number)
      return bMaj - aMaj || bMin - aMin
    })[0]

  const latestVersion = latestExportFile.replace(/^v|\.ts$/g, '')
  const newVersion = `${major}_${minor}`

  const content = await readFile(
    join(metaPackageSrc, latestExportFile),
    'utf-8'
  )
  const updated = content.replaceAll(latestVersion, newVersion)
  await writeFile(join(metaPackageSrc, expectedFile), updated)

  const pkgJson = JSON.parse(await readFile(metaPackageJsonPath, 'utf-8'))

  // 11_9->v11_9
  const formattedNewVersion = `v${newVersion}`
  const { ['./latest']: latest, ...withoutLatest } = pkgJson.exports
  const newExportPath = JSON.parse(
    JSON.stringify(latest).replaceAll(`v${latestVersion}`, formattedNewVersion)
  )

  const newPackageJSON = {
    ...pkgJson,
    exports: {
      ...withoutLatest,
      [`./${formattedNewVersion}`]: newExportPath,
      './latest': newExportPath
    }
  }

  await writeFile(
    metaPackageJsonPath,
    JSON.stringify(newPackageJSON, null, 2) + '\n'
  )
  execSync('git add -A', { stdio: 'inherit' })
}
