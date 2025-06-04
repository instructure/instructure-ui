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

// this is a custom svg to jsx converter function which should be able to handle all of our svgs with some assumptions:
// - the root tag is always <svg>
// - there are no inline styles
// - there are no classnames
// - there is no `for` of `htmlFor` attr
export function svg2jsx(svgString) {
  if (!svgString || !svgString.trim()) {
    return ''
  }

  let jsxString = svgString

  // Convert attribute names
  const convertAttrName = (name) => {
    // Specific SVG attributes that often need direct camelCase even with colons
    if (name === 'xlink:href') return 'xlinkHref'
    if (name === 'xml:space') return 'xmlSpace'
    if (name === 'xml:lang') return 'xmlLang'

    // General kebab-case to camelCase, excluding data-*, aria-*, and xmlns attributes
    if (
      name.startsWith('data-') ||
      name.startsWith('aria-') ||
      name.startsWith('xmlns')
    ) {
      return name
    }
    return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  }

  // Process tags and attributes
  jsxString = jsxString.replace(
    /<([a-zA-Z0-9:]+)([^>]*?)(\/?)>/g,
    (match, tagName, attrsStr, selfClosing) => {
      let newAttrs = ''
      if (attrsStr) {
        attrsStr.replace(
          /([a-zA-Z0-9:_-]+)\s*=\s*(["'])(.*?)\2/g,
          (attrMatch, name, quote, value) => {
            const newName = convertAttrName(name)
            // Escape curly braces within attribute values for JSX
            const escapedValue = value
              .replace(/{/g, '&#123;')
              .replace(/}/g, '&#125;')
            newAttrs += ` ${newName}="${escapedValue}"`
            return '' // Necessary for replace to work properly when iterating
          }
        )
      }

      return `<${tagName}${newAttrs}${
        selfClosing ||
        [
          'area',
          'base',
          'br',
          'col',
          'embed',
          'hr',
          'img',
          'input',
          'link',
          'meta',
          'param',
          'path',
          'source',
          'track',
          'wbr',
          'circle',
          'ellipse',
          'line',
          'polygon',
          'polyline',
          'rect',
          'stop',
          'use'
        ].includes(tagName)
          ? ' /'
          : ''
      }>`
    }
  )

  return jsxString.trim()
}
