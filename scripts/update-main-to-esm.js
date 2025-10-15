#!/usr/bin/env node

/*
 * Script to update "main" field in package.json files to point to ESM
 * Changes "main": "./lib/index.js" to "main": "./es/index.js"
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
    const pkg = JSON.parse(content)

    // Check if this file has a "main" field pointing to lib
    if (pkg.main && pkg.main.includes('./lib/')) {
      pkg.main = pkg.main.replace('./lib/', './es/')

      // Write back with pretty formatting
      writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')

      const packageName = path.basename(path.dirname(filePath))
      console.log(`✓ Updated ${packageName}: ${pkg.main}`)
      updatedCount++
    }
  } catch (err) {
    // Skip directories without package.json
    if (err.code !== 'ENOENT') {
      console.error(`Error processing ${filePath}:`, err.message)
    }
  }
}

console.log(`\n✅ Updated ${updatedCount} packages to use ESM entry point`)
console.log('\nAll "main" fields now point to ./es/ directory')
