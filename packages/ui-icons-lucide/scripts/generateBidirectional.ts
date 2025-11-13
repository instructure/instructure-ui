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
 * List of Lucide icon names that should flip horizontally in RTL contexts.
 *
 * This list is automatically generated from mapping.json based on the
 * bidirectional flag set by designers.
 *
 * Generated from mapping.json version {{VERSION}} (updated {{UPDATED}})
 */
`

function generateBidirectional() {
  // Read mapping.json
  const mappingPath = path.join(__dirname, '../src/mapping.json')
  const mappingData: MappingData = JSON.parse(
    fs.readFileSync(mappingPath, 'utf-8')
  )

  // Extract bidirectional icons
  const bidirectionalIcons = mappingData.mappings
    .filter((m) => m.bidirectional)
    .map((m) => ({
      name: m.lucide.name,
      notes: m.notes || ''
    }))

  // Generate content
  const header = HEADER.replace('{{VERSION}}', mappingData.version).replace(
    '{{UPDATED}}',
    mappingData.lastUpdated
  )

  const content = `${header}
export const BIDIRECTIONAL_ICONS = [
${bidirectionalIcons
  .map((icon) => `  '${icon.name}', // ${icon.notes}`)
  .join('\n')}
]
`

  const outputPath = path.join(__dirname, '../src/bidirectional.ts')
  fs.writeFileSync(outputPath, content, 'utf-8')

  console.error(
    `✓ Generated bidirectional.ts with ${bidirectionalIcons.length} icons`
  )
}

generateBidirectional()
