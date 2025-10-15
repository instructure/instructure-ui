#!/usr/bin/env node

/*
 * Script to disable CommonJS builds and only build ESM modules
 * Changes all package.json files from "--modules es,cjs" to "--modules es"
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Find all package.json files in the packages directory
const packagesDir = path.join(rootDir, 'packages')
const packageDirs = readdirSync(packagesDir).filter((name) => {
  const dirPath = path.join(packagesDir, name)
  return statSync(dirPath).isDirectory()
})

const packageJsonFiles = packageDirs.map((dir) =>
  path.join(packagesDir, dir, 'package.json')
)

console.log(`Found ${packageJsonFiles.length} package.json files\n`)

let updatedCount = 0

for (const filePath of packageJsonFiles) {
  try {
    const content = readFileSync(filePath, 'utf-8')

    // Check if this file has the CJS build configuration or any --modules flag
    if (content.includes('--modules')) {
      // Remove --modules flag entirely (SWC doesn't use it, only builds ESM)
      const updatedContent = content.replace(/ --modules (es,cjs|es|cjs)/g, '')

      writeFileSync(filePath, updatedContent, 'utf-8')

      const packageName = path.basename(path.dirname(filePath))
      console.log(`✓ Updated ${packageName}`)
      updatedCount++
    }
  } catch (err) {
    // Skip directories without package.json
    if (err.code !== 'ENOENT') {
      throw err
    }
  }
}

console.log(`\n✅ Updated ${updatedCount} packages to ESM-only builds`)
console.log('\nTo build with the new configuration, run: pnpm run build')
