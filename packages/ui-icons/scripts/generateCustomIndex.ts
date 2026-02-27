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
import { parseSync, type INode } from 'svgson'
import { info, error } from '@instructure/command-utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

/**
 * Parse SVG into iconNode format: [[tagName, attributes], ...]
 */
function svgToIconNode(svgContent: string): {
  iconNode: Array<[string, Record<string, string>]>
  viewBox?: string
} {
  const iconNode: Array<[string, Record<string, string>]> = []
  const parsed = parseSync(svgContent, { camelcase: true })

  function extract(node: INode): void {
    if (node.type !== 'element') return
    iconNode.push([node.name, { ...node.attributes }])
    node.children.forEach(extract)
  }
  parsed.children.forEach(extract)

  return { iconNode, viewBox: parsed.attributes.viewBox || undefined }
}

/**
 * Convert kebab-case filename to PascalCase icon name.
 * Examples: ai-info.svg → AiInfo, canvas-logo.svg → CanvasLogo
 */
function fileNameToIconName(fileName: string): string {
  return fileName
    .replace('.svg', '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function generateCustomIndex() {
  const svgDir = path.join(__dirname, '../svg/Custom')

  if (!fs.existsSync(svgDir)) {
    throw new Error(`SVG directory not found: ${svgDir}`)
  }

  const svgFiles = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'))
  const exports: string[] = []

  for (const fileName of svgFiles) {
    const svgContent = fs.readFileSync(path.join(svgDir, fileName), 'utf-8')
    const iconName = fileNameToIconName(fileName)

    try {
      const { iconNode, viewBox } = svgToIconNode(svgContent)
      const viewBoxArg = viewBox ? `, '${viewBox}'` : ''

      exports.push(
        `export const ${iconName}InstUIIcon = wrapCustomIcon(${JSON.stringify(
          iconNode
        )} as IconNode, '${iconName}'${viewBoxArg})`
      )
    } catch (err) {
      throw new Error(`Error processing ${fileName}: ${err}`)
    }
  }

  const content = `${HEADER}
import { type IconNode } from 'lucide-react'
import { wrapCustomIcon } from './wrapCustomIcon'

// Custom icons with InstUI theming
// wrapCustomIcon(iconNode, displayName, viewBox?)
${exports.join('\n')}
`

  const outputPath = path.join(__dirname, '../src/custom/index.ts')
  fs.writeFileSync(outputPath, content, 'utf-8')

  info(
    `Generated custom/index.ts with ${exports.length} / ${svgFiles.length} custom icons`
  )
}

try {
  generateCustomIndex()
} catch (err) {
  error('Error generating custom index:', err)
  process.exit(1)
}
