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
import svg2jsx from 'svg-to-jsx'

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
  const jsxSource = await svg2jsx(source)
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
  let content = glyphs.map((glyph) => {
    return `export { ${glyph.name}${glyph.variant} } from './${glyph.name}${glyph.variant}'`
  })
  //TODO: this is a temp solution it will be removed when icon generation will be overhauled
  content.push(`export { IconAiColoredLine } from './IconAiColoredLine'`)
  content.push(`export { IconAiColoredSolid } from './IconAiColoredSolid'`)
  content = content.join('\n\n')
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

  //TODO: this is a temp solution it will be removed when icon generation will be overhauled
  fs.writeFile(
    './__build__/IconAiColoredSolid.tsx',
    `/*
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
  import { Component } from 'react'
  import { SVGIcon } from '@instructure/ui-svg-images'
  import type { SVGIconProps } from '@instructure/ui-svg-images'

  class IconAiColoredSolid extends Component<SVGIconProps> {
    static glyphName = 'ai-colored'
    static variant = 'Solid'
    static displayName = 'IconAiColoredSolid'

    // eslint-disable-next-line react/forbid-foreign-prop-types
    static propTypes = { ...SVGIcon.propTypes }
    static allowedProps = [...SVGIcon.allowedProps]

    ref: Element | null = null

    handleRef = (el: Element | null) => {
      const { elementRef } = this.props

      this.ref = el

      if (typeof elementRef === 'function') {
        elementRef(el)
      }
    }

    render() {

      return (
        <SVGIcon
          {...this.props}
          name="IconAiColored"
          viewBox="0 0 1920 1920"
          elementRef={this.handleRef}

        >
          <g clipPath="url(#a)">
            <path
              fill="url(#b)"
              d="m960 0 259.29 700.713L1920 960l-700.71 259.29L960 1920l-259.287-700.71L0 960l700.713-259.287L960 0Z"
            />
            <path
              fill="url(#c)"
              d="m1600 0 86.43 233.571L1920 320l-233.57 86.429L1600 640l-86.43-233.571L1280 320l233.57-86.429L1600 0Z"
            />
          </g>
          <defs>
            <linearGradient
              id="b"
              x1={-476.25}
              x2={-7.617}
              y1={-392.727}
              y2={3078.25}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9E58BD" />
              <stop offset={1} stopColor="#00828E" />
            </linearGradient>
            <linearGradient
              id="c"
              x1={1121.25}
              x2={1277.46}
              y1={-130.909}
              y2={1026.08}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9E58BD" />
              <stop offset={1} stopColor="#00828E" />
            </linearGradient>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h1920v1920H0z" />
            </clipPath>
          </defs>
        </SVGIcon>
      )
    }
  }

  export default IconAiColoredSolid
  export { IconAiColoredSolid }
  `,
    (err) => {
      if (err) {
        console.error(err)
      }
      // file written successfully
    }
  )
  fs.writeFile(
    './__build__/IconAiColoredLine.tsx',
    `/*
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
  import { Component } from 'react'
  import { SVGIcon } from '@instructure/ui-svg-images'
  import type { SVGIconProps } from '@instructure/ui-svg-images'

  class IconAiColoredLine extends Component<SVGIconProps> {
    static glyphName = 'ai-colored'
    static variant = 'Line'
    static displayName = 'IconAiColoredLine'

    // eslint-disable-next-line react/forbid-foreign-prop-types
    static propTypes = { ...SVGIcon.propTypes }
    static allowedProps = [...SVGIcon.allowedProps]

    ref: Element | null = null

    handleRef = (el: Element | null) => {
      const { elementRef } = this.props

      this.ref = el

      if (typeof elementRef === 'function') {
        elementRef(el)
      }
    }

    render() {

      return (
        <SVGIcon
          {...this.props}
          name="IconAiColored"
          viewBox="0 0 1920 1920"
          elementRef={this.handleRef}

        >
          <g clipPath="url(#a)">
            <path
              fill="url(#b)"
              d="m960 0 259.29 700.713L1920 960l-700.71 259.29L960 1920l-259.287-700.71L0 960l700.713-259.287L960 0Z"
            />
            <path
              fill="url(#c)"
              d="m1600 0 86.43 233.571L1920 320l-233.57 86.429L1600 640l-86.43-233.571L1280 320l233.57-86.429L1600 0Z"
            />
          </g>
          <defs>
            <linearGradient
              id="b"
              x1={-476.25}
              x2={-7.617}
              y1={-392.727}
              y2={3078.25}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9E58BD" />
              <stop offset={1} stopColor="#00828E" />
            </linearGradient>
            <linearGradient
              id="c"
              x1={1121.25}
              x2={1277.46}
              y1={-130.909}
              y2={1026.08}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9E58BD" />
              <stop offset={1} stopColor="#00828E" />
            </linearGradient>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h1920v1920H0z" />
            </clipPath>
          </defs>
        </SVGIcon>
      )
    }
  }

  export default IconAiColoredLine
  export { IconAiColoredLine }
  `,
    (err) => {
      if (err) {
        console.error(err)
      }
      // file written successfully
    }
  )
  const indexFilePath = `${destination}index.ts`
  const indexContent = generateIconIndex(glyphs)
  fs.writeFile(indexFilePath, indexContent, (err) => {
    if (err) {
      console.error(err)
    }
    // file written successfully
  })
}
