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
import { info } from '@instructure/command-utils'

function toPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('')
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

export default async function generateLucideIndex() {
  // Custom icons automatically shadow Lucide icons of the same name.
  // Derived at build time from svg/Custom/ so it stays in sync automatically.
  const customSvgDir = path.join(process.cwd(), 'svg/Custom')
  const EXCLUDED_ICONS = new Set(
    fs
      .readdirSync(customSvgDir)
      .filter((f) => f.endsWith('.svg'))
      .map((f) => toPascalCase(f.replace('.svg', '')))
  )

  const lucideReact = await import('lucide-react')
  const allLucideIcons = Object.keys(lucideReact).filter((key) => {
    const value = lucideReact[key as keyof typeof lucideReact] as any
    return (
      typeof value === 'object' &&
      value !== null &&
      value.displayName &&
      !key.endsWith('Icon') &&
      !key.startsWith('Lucide') &&
      !key.startsWith('create') &&
      !EXCLUDED_ICONS.has(key)
    )
  })

  if (allLucideIcons.length === 0) {
    throw new Error('No Lucide icons found — check lucide-react import')
  }

  const iconExports = allLucideIcons
    .map(
      (iconName) =>
        `export const ${iconName}InstUIIcon = wrapLucideIcon(Lucide.${iconName})`
    )
    .join('\n')

  // Output goes to src/generated/lucide/ so the import is relative to that:
  // ../../lucide/wrapLucideIcon resolves to src/lucide/wrapLucideIcon
  const content = `${HEADER}
import * as Lucide from 'lucide-react'
import { wrapLucideIcon } from '../../lucide/wrapLucideIcon'

${iconExports}
`

  const outputPath = path.join(process.cwd(), 'src/generated/lucide/index.ts')
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, content, 'utf-8')
  info(
    `Generated src/generated/lucide/index.ts with ${allLucideIcons.length} icons`
  )
}
