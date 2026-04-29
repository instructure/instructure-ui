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

export const PARCHMENT_CATEGORIES = ['icons', 'graphics', 'vectors'] as const
type Category = (typeof PARCHMENT_CATEGORIES)[number]

// Prefix prepended to every generated export name so Parchment-sourced assets
// are visually distinct from InstUI icons at the call site, regardless of
// category.
const PARCH_PREFIX = 'Parch'

function svgToJsxPaths(svgContent: string): {
  jsxContent: string
  viewBox?: string
} {
  const svgTagMatch = svgContent.match(/<svg\s+([\s\S]*?)>/)
  const viewBoxMatch = svgTagMatch?.[1].match(/viewBox\s*=\s*"([^"]*)"/)
  const viewBox = viewBoxMatch?.[1] || undefined

  const inner = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg\s*>/, '')
    .trim()

  let jsxContent = svg2jsx(inner)

  // Convert inline style="prop: val" attributes into direct SVG/JSX attributes.
  // JSX rejects style="..." string syntax (it expects style={{}} object form).
  jsxContent = jsxContent.replace(
    /\sstyle="([^"]*)"/g,
    (_full: string, css: string) => {
      const attrs: string[] = []
      for (const decl of css.split(';')) {
        const idx = decl.indexOf(':')
        if (idx < 0) continue
        const k = decl.slice(0, idx).trim()
        const v = decl.slice(idx + 1).trim()
        if (!k || !v) continue
        const jsxK = k.replace(/-([a-z])/g, (_: string, c: string) =>
          c.toUpperCase()
        )
        attrs.push(`${jsxK}="${v.replace(/"/g, '&quot;')}"`)
      }
      return attrs.length ? ' ' + attrs.join(' ') : ''
    }
  )

  // Inject fill="currentColor" on shape elements without an explicit fill so
  // they participate in theming. Elements with explicit fill (brand hex codes
  // or fills inlined from style="...") are left untouched.
  jsxContent = jsxContent.replace(
    /<(path|circle|rect|polygon|polyline|ellipse|line)\b(?![^>]*\sfill=)/g,
    '<$1 fill="currentColor"'
  )

  jsxContent = jsxContent.replace(/="currentColor"/g, '={color}')

  return { jsxContent, viewBox }
}

function fileNameToIconName(fileName: string): string {
  return fileName
    .replace('.svg', '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function generateCategory(svgSourceDir: string, category: Category): number {
  const svgDir = path.join(svgSourceDir, 'Parchment', category)
  if (!fs.existsSync(svgDir)) return 0

  const svgFiles = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'))
  const iconBlocks: string[] = []

  for (const fileName of svgFiles) {
    const svgContent = fs.readFileSync(path.join(svgDir, fileName), 'utf-8')
    const baseName = fileNameToIconName(fileName)
    // Skip the prefix when the source name already starts with Parch/Parchment
    // so we don't produce names like ParchParchmentNetworkLine.
    const exportName = baseName.startsWith(PARCH_PREFIX)
      ? baseName
      : PARCH_PREFIX + baseName

    try {
      const { jsxContent, viewBox } = svgToJsxPaths(svgContent)
      const viewBoxArg = viewBox ? `'${viewBox}'` : "'0 0 24 24'"

      const usesColorProp = jsxContent.includes('={color}')
      const paramSig = usesColorProp
        ? `({ color = 'currentColor' }: { color?: string })`
        : `(_props: { color?: string })`

      iconBlocks.push(
        `const ${exportName}Paths = ${paramSig} => (\n` +
          `  <>\n` +
          `    ${jsxContent}\n` +
          `  </>\n` +
          `)\n` +
          `export const ${exportName} = wrapCustomIcon(${exportName}Paths, '${exportName}', ${viewBoxArg})`
      )
    } catch (err) {
      throw new Error(
        `Error processing Parchment/${category}/${fileName}: ${err}`
      )
    }
  }

  const content = `${HEADER}
import { wrapCustomIcon } from '../../../custom/wrapCustomIcon'

// Parchment ${category} with InstUI theming
// Each icon is a JSX component that accepts a color prop
${iconBlocks.join('\n\n')}
`

  const outputDir = path.join(
    process.cwd(),
    'src/generated/parchment',
    category
  )
  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(path.join(outputDir, 'index.tsx'), content, 'utf-8')

  return iconBlocks.length
}

export default function generateParchmentIndex(svgSourceDir: string) {
  const parchmentDir = path.join(svgSourceDir, 'Parchment')
  if (!fs.existsSync(parchmentDir)) return

  // Remove the old top-level parchment/index.tsx if it lingers from a prior
  // single-file generator run, since we now emit one file per category.
  const legacyOutput = path.join(
    process.cwd(),
    'src/generated/parchment/index.tsx'
  )
  if (fs.existsSync(legacyOutput)) fs.unlinkSync(legacyOutput)

  for (const category of PARCHMENT_CATEGORIES) {
    const count = generateCategory(svgSourceDir, category)
    console.log(
      `Generated src/generated/parchment/${category}/index.tsx with ${count} ${category}`
    )
  }
}
