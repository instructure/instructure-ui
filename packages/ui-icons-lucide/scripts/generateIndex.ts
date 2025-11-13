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

  // JavaScript built-ins that need to be renamed to avoid conflicts
  const CONFLICTING_NAMES = ['Infinity', 'Map']

  // Generate export statements for all icons (all bidirectional by default)
  const iconExports = allLucideIcons
    .map((iconName) => {
      // Rename icons that conflict with JavaScript built-ins
      if (CONFLICTING_NAMES.includes(iconName)) {
        return `// Renamed from '${iconName}' to avoid conflict with JavaScript built-in\nexport const Icon${iconName} = wrapLucideIcon(Lucide.${iconName})`
      }
      return `export const ${iconName} = wrapLucideIcon(Lucide.${iconName})`
    })
    .join('\n')

  // Generate index.ts content
  const content = `${HEADER}
import * as Lucide from 'lucide-react'
import { wrapLucideIcon } from './wrapLucideIcon'

// Re-export types
export type { LucideProps, LucideIcon } from 'lucide-react'
export type {
  LucideIconWrapperProps,
  InstUIIconProps,
  LucideIconTheme
} from './wrapLucideIcon'

// Re-export utilities
export { wrapLucideIcon }

/**
 * All Lucide icons wrapped with InstUI theming and RTL support
 *
 * All icons are wrapped with wrapLucideIcon and are bidirectional by default.
 * Icons automatically flip horizontally in RTL contexts.
 *
 * To disable RTL flipping for a specific instance:
 * \\\`\\\`\\\`tsx
 * <IconName bidirectional={false} />
 * \\\`\\\`\\\`
 *
 * InstUI-style usage:
 * \\\`\\\`\\\`tsx
 * <IconName size="large" color="primary" rotate="90" />
 * \\\`\\\`\\\`
 *
 * Lucide-style usage (still supported):
 * \\\`\\\`\\\`tsx
 * <IconName size={24} strokeWidth={2} color="#ff0000" />
 * \\\`\\\`\\\`
 *
 * Based on mapping.json version ${mappingData.version} (updated ${mappingData.lastUpdated})
 * Total icons: ${allLucideIcons.length}
 */

${iconExports}
`

  const outputPath = path.join(__dirname, '../src/index.ts')
  fs.writeFileSync(outputPath, content, 'utf-8')

  console.error(`✓ Generated index.ts`)
  console.error(`✓ Total Lucide icons: ${allLucideIcons.length}`)
  console.error(
    `✓ All icons are bidirectional by default (can be disabled per-instance)`
  )
  console.error(
    `✓ Total mapped icons from InstUI: ${mappingData.mappings.length}`
  )
}

generateIndex()
