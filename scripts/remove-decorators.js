#!/usr/bin/env node

/*
 * Script to remove @withStyle decorators and convert them to wrapper functions
 * This makes the code compatible with SWC compiler
 */

import { readFileSync, writeFileSync } from 'fs'
import { readdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

/**
 * Transform a file by removing decorator and wrapping export
 *
 * Example transformation:
 *
 * Before:
 *   @withStyle(generateStyles, generateComponentTheme)
 *   class BaseButton extends Component<BaseButtonProps> {
 *   ...
 *   export { BaseButton }
 *   export default BaseButton
 *
 * After:
 *   class BaseButton extends Component<BaseButtonProps> {
 *   ...
 *   const StyledBaseButton = withStyle(generateStyles, generateComponentTheme)(BaseButton)
 *   export { StyledBaseButton as BaseButton }
 *   export default StyledBaseButton
 */
function transformFile(content, filePath) {
  // Match the decorator pattern: @withStyle(...) on line before class
  const decoratorPattern = /^(\s*)@withStyle\(([^)]+)\)\s*\n(\s*)(export\s+)?(class\s+(\w+))/m

  const match = content.match(decoratorPattern)
  if (!match) {
    return null // No decorator found
  }

  const [fullMatch, indent, decoratorArgs, classIndent, exportKeyword, classDecl, className] = match

  // Remove decorator line (keep the class line)
  let transformed = content.replace(fullMatch, `${classIndent}${classDecl}`)

  // Find existing export statements
  const namedExportPattern = new RegExp(`export\\s*\\{\\s*${className}\\s*\\}`, 'g')
  const defaultExportPattern = new RegExp(`export\\s+default\\s+${className}`, 'g')

  const hasNamedExport = namedExportPattern.test(transformed)
  const hasDefaultExport = defaultExportPattern.test(transformed)

  if (!hasNamedExport && !hasDefaultExport) {
    console.warn(`  ⚠️  No exports found for ${className} in ${filePath}`)
    return null
  }

  // Create the wrapper constant
  const wrapperLine = `const Styled${className} = withStyle(${decoratorArgs})(${className})`

  // Replace exports
  if (hasNamedExport) {
    transformed = transformed.replace(
      namedExportPattern,
      `${wrapperLine}\nexport { Styled${className} as ${className} }`
    )
  }

  if (hasDefaultExport) {
    if (hasNamedExport) {
      // Already added wrapper above, just replace default export
      transformed = transformed.replace(
        defaultExportPattern,
        `export default Styled${className}`
      )
    } else {
      // Only has default export
      transformed = transformed.replace(
        defaultExportPattern,
        `${wrapperLine}\nexport default Styled${className}`
      )
    }
  }

  return transformed
}

async function processDirectory(dir, stats = { processed: 0, transformed: 0, errors: 0 }) {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // Skip node_modules and hidden directories
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
        continue
      }
      await processDirectory(fullPath, stats)
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      stats.processed++

      try {
        const content = readFileSync(fullPath, 'utf-8')

        if (!content.includes('@withStyle')) {
          continue
        }

        const transformed = transformFile(content, fullPath)

        if (transformed) {
          writeFileSync(fullPath, transformed, 'utf-8')
          const relativePath = path.relative(rootDir, fullPath)
          console.log(`✓ ${relativePath}`)
          stats.transformed++
        }
      } catch (error) {
        console.error(`✗ Error processing ${fullPath}:`, error.message)
        stats.errors++
      }
    }
  }

  return stats
}

async function main() {
  console.log('Removing @withStyle decorators...\n')

  const packagesDir = path.join(rootDir, 'packages')
  const stats = await processDirectory(packagesDir)

  console.log(`\n${'='.repeat(50)}`)
  console.log(`Files processed: ${stats.processed}`)
  console.log(`Files transformed: ${stats.transformed}`)
  console.log(`Errors: ${stats.errors}`)
  console.log(`${'='.repeat(50)}`)

  if (stats.transformed > 0) {
    console.log(`\n✅ Successfully removed decorators from ${stats.transformed} files!`)
    console.log('\nNext step: Test build with SWC')
    console.log('  cd packages/ui-buttons && time npx swc src --out-dir es')
  }
}

main().catch(console.error)
