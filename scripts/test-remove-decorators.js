#!/usr/bin/env node

/*
 * Test script to verify decorator removal on a single file
 */

import { readFileSync, writeFileSync } from 'fs'

const testFile = '/Users/balazs.saros/work/instructure-ui/packages/ui-buttons/src/Button/index.tsx'

function transformFile(content) {
  const decoratorPattern = /^(\s*)@withStyle\(([^)]+)\)\s*\n(\s*)(export\s+)?(class\s+(\w+))/m
  const match = content.match(decoratorPattern)

  if (!match) {
    console.log('No decorator found')
    return null
  }

  const [fullMatch, indent, decoratorArgs, classIndent, exportKeyword, classDecl, className] = match
  console.log('Found decorator:', { className, decoratorArgs })

  // Remove decorator line
  let transformed = content.replace(fullMatch, `${classIndent}${classDecl}`)

  // Find existing export statements
  const namedExportPattern = new RegExp(`export\\s*\\{\\s*${className}\\s*\\}`)
  const defaultExportPattern = new RegExp(`export\\s+default\\s+${className}`)

  const hasNamedExport = namedExportPattern.test(transformed)
  const hasDefaultExport = defaultExportPattern.test(transformed)

  console.log('Export info:', { hasNamedExport, hasDefaultExport })

  const wrapperLine = `const Styled${className} = withStyle(${decoratorArgs})(${className})`

  // Find the last export in the file to place the wrapper before it
  const lastExportMatch = transformed.match(/(export\s+default\s+\w+|export\s+\{[^}]+\})/g)
  if (!lastExportMatch || lastExportMatch.length === 0) {
    console.log('No exports found')
    return null
  }

  // Get the position of the first export
  const firstExportPos = transformed.search(/(export\s+default\s+|export\s+\{)/)

  // Insert wrapper before first export
  const before = transformed.slice(0, firstExportPos)
  const after = transformed.slice(firstExportPos)
  transformed = before + wrapperLine + '\n' + after

  // Now replace export statements
  if (hasNamedExport) {
    transformed = transformed.replace(
      namedExportPattern,
      `export { Styled${className} as ${className} }`
    )
  }

  if (hasDefaultExport) {
    transformed = transformed.replace(
      defaultExportPattern,
      `export default Styled${className}`
    )
  }

  return transformed
}

const content = readFileSync(testFile, 'utf-8')
const transformed = transformFile(content)

if (transformed) {
  writeFileSync(testFile, transformed, 'utf-8')
  console.log('\n✓ File transformed successfully')
  console.log('\nTo see the diff, run:')
  console.log(`  diff ${testFile}.backup ${testFile}`)
} else {
  console.log('✗ Transformation failed')
}
