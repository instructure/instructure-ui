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
import { svg2jsx } from './svg2jsx.js'

const NOTICE_HEADER = `/*
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

async function generateIconComponent(glyph) {
  const { name, variant, glyphName, deprecated, bidirectional, src } = glyph

  const source = src.match(
    /<svg\b[^>]*?(?:viewBox="(\b[^"]*)")?>([\s\S]*?)<\/svg>/
  )[2]
  const jsxSource = svg2jsx(source)
  const viewBox = src.match(/viewBox="(.*?)"/)[1]

  const content = `import { Component } from 'react'
import { SVGIcon } from '@instructure/ui-svg-images'
import type { SVGIconProps } from '@instructure/ui-svg-images'

class ${name}${variant} extends Component<SVGIconProps> {
  static glyphName = '${glyphName}'
  static variant = '${variant}'
  static displayName = '${name}${variant}'
  ${deprecated ? `static deprecated = true` : ''}
  // eslint-disable-next-line react/forbid-foreign-prop-types
  static propTypes = { ...SVGIcon.propTypes }
  static allowedProps = [ ...SVGIcon.allowedProps ]

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  render () {
    ${
      deprecated
        ? `if (process.env.NODE_ENV !== 'production') {
      console.warn('<${name}${variant} /> is deprecated. Please use <${deprecated}${variant} /> instead.')
    }`
        : ''
    }
    return (
      <SVGIcon
        {...this.props}
        name="${name}"
        viewBox="${viewBox}"
        elementRef={this.handleRef}
        ${bidirectional ? `bidirectional` : ''}
      >
        ${jsxSource}
      </SVGIcon>
    )
  }
}

export default ${name}${variant}
export { ${name}${variant} }
`
  return NOTICE_HEADER + content
}

function generateIconIndex(glyphs) {
  const content = glyphs
    .map((glyph) => {
      return `export { ${glyph.name}${glyph.variant} } from './${glyph.name}${glyph.variant}'`
    })
    .join('\n\n')
  return NOTICE_HEADER + content
}

export default function generateReactComponents(glyphs, destination) {
  glyphs.forEach(async (glyph) => {
    const fileName = `${destination}${glyph.name}${glyph.variant}.tsx`

    const componentContent = await generateIconComponent(glyph)

    fs.writeFile(fileName, componentContent, (err) => {
      if (err) {
        console.error(err)
      }
      // file written successfully
    })
  })

  const indexFilePath = `${destination}index.ts`
  const indexContent = generateIconIndex(glyphs)
  fs.writeFile(indexFilePath, indexContent, (err) => {
    if (err) {
      console.error(err)
    }
    // file written successfully
  })
}
