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

import * as fs from 'fs'
import * as path from 'path'

interface IconMapping {
  instUI: {
    line: string
    solid: string
  }
  lucide: {
    name: string
  }
  bidirectional: boolean
  notes?: string
}

interface MappingData {
  version: string
  lastUpdated: string
  mappings: IconMapping[]
  unmapped?: Array<{
    instUI: {
      line: string
      solid: string
    }
    reason: string
  }>
}

const HEADER = `/*
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

/**
 * @packageDocumentation
 * Lucide icons for Instructure UI with RTL support.
 *
 * This package provides access to all 1,500+ Lucide icons with automatic
 * RTL (right-to-left) support for bidirectional icons.
 *
 * ## Usage
 *
 * \`\`\`tsx
 * import { ArrowLeft, Plus, Check } from '@instructure/ui-icons-lucide'
 *
 * const MyComponent = () => (
 *   <div>
 *     <ArrowLeft size={24} />
 *     <Plus size={24} />
 *   </div>
 * )
 * \`\`\`
 *
 * ## RTL Support
 *
 * Bidirectional icons (arrows, chevrons, etc.) automatically flip horizontally
 * in RTL contexts. Non-directional icons render normally in all contexts.
 *
 * ## API
 *
 * All icons accept the standard Lucide props:
 * - \`size\`: number - Icon size in pixels
 * - \`color\`: string - Icon color (defaults to currentColor)
 * - \`strokeWidth\`: number - Stroke width
 * - Plus all standard SVG attributes
 *
 * See https://lucide.dev for complete icon list and documentation.
 */
`

function generateIndex() {
  // Read mapping.json
  const mappingPath = path.join(__dirname, '../src/mapping.json')
  const mappingData: MappingData = JSON.parse(
    fs.readFileSync(mappingPath, 'utf-8')
  )

  // Extract bidirectional icons from mapping
  const bidirectionalIconsSet = new Set(
    mappingData.mappings
      .filter((m) => m.bidirectional)
      .map((m) => m.lucide.name)
  )

  // Get all Lucide icon names by importing the package
  const lucideReact = require('lucide-react')
  const allLucideIcons = Object.keys(lucideReact).filter((key) => {
    const value = lucideReact[key]
    // Filter for actual icon components (they're objects with displayName)
    // Exclude:
    // - *Icon suffix duplicates (e.g., "AArrowDownIcon")
    // - Lucide* prefix duplicates (e.g., "LucideAArrowDown")
    // - createLucideIcon utility
    return (
      typeof value === 'object' &&
      value !== null &&
      value.displayName &&
      !key.endsWith('Icon') &&
      !key.startsWith('Lucide') &&
      !key.startsWith('create')
    )
  })

  // Generate export statements for all icons
  const iconExports = allLucideIcons
    .map((iconName) => {
      const isBidirectional = bidirectionalIconsSet.has(iconName)
      return `export const ${iconName} = withRTL(Lucide.${iconName}, { flipsInRTL: ${isBidirectional} })`
    })
    .join('\n')

  // Generate index.ts content
  const content = `${HEADER}
import * as Lucide from 'lucide-react'
import { withRTL } from './withRTL'

// Re-export types
export type { LucideProps, LucideIcon } from 'lucide-react'

// Re-export utilities
export { withRTL }
export { BIDIRECTIONAL_ICONS } from './bidirectional'

/**
 * All Lucide icons wrapped with RTL support
 *
 * All icons are wrapped with the withRTL utility. Bidirectional icons
 * (arrows, chevrons, etc.) automatically flip horizontally in RTL contexts.
 * Non-directional icons pass through unchanged.
 *
 * Based on mapping.json version ${mappingData.version} (updated ${mappingData.lastUpdated})
 * Total icons: ${allLucideIcons.length}
 * Bidirectional: ${bidirectionalIconsSet.size}
 */

${iconExports}
`

  const outputPath = path.join(__dirname, '../src/index.ts')
  fs.writeFileSync(outputPath, content, 'utf-8')

  console.error(`✓ Generated index.ts`)
  console.error(`✓ Total Lucide icons: ${allLucideIcons.length}`)
  console.error(`✓ Bidirectional icons: ${bidirectionalIconsSet.size}`)
  console.error(
    `✓ Non-directional icons: ${
      allLucideIcons.length - bidirectionalIconsSet.size
    }`
  )
  console.error(
    `✓ Total mapped icons from InstUI: ${mappingData.mappings.length}`
  )
}

generateIndex()
