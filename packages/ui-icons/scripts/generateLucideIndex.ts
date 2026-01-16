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
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface IconMapping {
  instUI: {
    line: string
    solid: string
  }
  lucide: {
    name: string
  }
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
`

async function generateIndex() {
  const mappingPath = path.join(__dirname, '../lucide/mapping.json')
  const mappingData: MappingData = JSON.parse(
    fs.readFileSync(mappingPath, 'utf-8')
  )

  const lucideReact = await import('lucide-react')
  const allLucideIcons = Object.keys(lucideReact).filter((key) => {
    const value = lucideReact[key as keyof typeof lucideReact]
    return (
      typeof value === 'object' &&
      value !== null &&
      value.displayName &&
      !key.endsWith('Icon') &&
      !key.startsWith('Lucide') &&
      !key.startsWith('create')
    )
  })

  const iconExports = allLucideIcons
    .map((iconName) => {
      return `export const ${iconName}InstUIIcon = wrapLucideIcon(Lucide.${iconName})`
    })
    .join('\n')

  const content = `${HEADER}
import * as Lucide from 'lucide-react'
import { wrapLucideIcon } from './wrapLucideIcon'

export type { LucideIconWrapperProps } from './wrapLucideIcon/props'
export { renderIconWithProps } from './IconPropsProvider'

${iconExports}
`

  const outputPath = path.join(__dirname, '../lucide/index.ts')
  fs.writeFileSync(outputPath, content, 'utf-8')

  console.error(`Generated index.ts with ${allLucideIcons.length} icons`)
  console.error(`Mapped ${mappingData.mappings.length} InstUI icons to Lucide`)
}

generateIndex().catch((error) => {
  console.error('Error generating index:', error)
  process.exit(1)
})
