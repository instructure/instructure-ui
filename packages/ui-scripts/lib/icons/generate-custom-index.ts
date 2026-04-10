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

import fs from 'fs'
import path from 'path'
import { svg2jsx } from './svg2jsx.js'

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
 * Extract viewBox and convert inner SVG content to JSX with dynamic color.
 */
function svgToJsxPaths(svgContent: string): {
  jsxContent: string
  viewBox?: string
} {
  // Extract viewBox from the <svg> root tag
  const svgTagMatch = svgContent.match(/<svg\s+([\s\S]*?)>/)
  const viewBoxMatch = svgTagMatch?.[1].match(/viewBox\s*=\s*"([^"]*)"/)
  const viewBox = viewBoxMatch?.[1] || undefined

  // Strip the <svg> wrapper to get inner content
  const inner = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg\s*>/, '')
    .trim()

  // Convert SVG attributes to JSX
  let jsxContent = svg2jsx(inner)

  // Make currentColor values dynamic via the color prop
  jsxContent = jsxContent.replace(/="currentColor"/g, '={color}')

  return { jsxContent, viewBox }
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

export default function generateCustomIndex() {
  const svgDir = path.join(process.cwd(), 'svg/Custom')

  if (!fs.existsSync(svgDir)) {
    throw new Error(`SVG directory not found: ${svgDir}`)
  }

  const svgFiles = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'))
  const iconBlocks: string[] = []

  for (const fileName of svgFiles) {
    const svgContent = fs.readFileSync(path.join(svgDir, fileName), 'utf-8')
    const iconName = fileNameToIconName(fileName)

    try {
      const { jsxContent, viewBox } = svgToJsxPaths(svgContent)
      const viewBoxArg = viewBox ? `'${viewBox}'` : "'0 0 24 24'"

      iconBlocks.push(
        `const ${iconName}Paths = ({ color = 'currentColor' }: { color?: string }) => (\n` +
          `  <>\n` +
          `    ${jsxContent}\n` +
          `  </>\n` +
          `)\n` +
          `export const ${iconName}InstUIIcon = wrapCustomIcon(${iconName}Paths, '${iconName}', ${viewBoxArg})`
      )
    } catch (err) {
      throw new Error(`Error processing ${fileName}: ${err}`)
    }
  }

  // Output goes to src/generated/custom/ so the import is relative to that:
  // ../../custom/wrapCustomIcon resolves to src/custom/wrapCustomIcon
  const content = `${HEADER}
import { wrapCustomIcon } from '../../custom/wrapCustomIcon'

// Custom icons with InstUI theming
// Each icon is a JSX component that accepts a color prop
${iconBlocks.join('\n\n')}
`

  const outputDir = path.join(process.cwd(), 'src/generated/custom')
  fs.mkdirSync(outputDir, { recursive: true })

  const outputPath = path.join(outputDir, 'index.tsx')
  fs.writeFileSync(outputPath, content, 'utf-8')

  console.log(
    `Generated src/generated/custom/index.tsx with ${iconBlocks.length} / ${svgFiles.length} custom icons`
  )
}
