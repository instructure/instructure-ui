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

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, (text) =>
    text.replace(/-/, '').toUpperCase()
  )
}

export default function getGlyphData(
  svgSourceDir,
  deprecatedMap,
  bidirectionalList,
  prefix
) {
  const glyphs = []
  // variants are in different sub directories
  const subdirs = fs.readdirSync(svgSourceDir)
  // we only care about subdirs named "Solid" or "Line"
  const relevantSubdirs = subdirs.filter(
    (dir) => dir === 'Solid' || dir === 'Line'
  )

  relevantSubdirs.forEach((subdir) => {
    const fileNames = fs.readdirSync(svgSourceDir + subdir)
    fileNames.forEach((fileName) => {
      const { name, ext } = path.parse(fileName)
      if (ext !== '.svg') return

      const filepath = path.resolve(svgSourceDir + subdir, fileName)
      const fileContent = fs.readFileSync(filepath, { encoding: 'utf8' })
      glyphs.push({
        name: prefix + toPascalCase(name),
        glyphName: name,
        variant: subdir,
        src: fileContent,
        bidirectional: bidirectionalList.includes(name),
        deprecated: deprecatedMap[name] ?? false
      })
    })
  })
  return glyphs
}
