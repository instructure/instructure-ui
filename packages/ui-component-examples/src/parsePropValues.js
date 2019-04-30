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
import { resolver, parse } from 'react-docgen'

/**
 * Given a relative path and the React component source, returns an object of all
 * enumerated and boolean prop names mapped to arrays of their possible values.
 *
 * #### Example
 *
 * Given the following component:
 *
 * ```js
 * class MyComponent extends React.Component {
 *   static propTypes = {
 *     shape: PropTypes.oneOf(['square', 'rectangle', 'circle']),
 *     display: PropTypes.bool,
 *     children: PropTypes.node
 *   }
 * }
 * ```
 *
 * The prop values could be parsed via the `parsePropValues` function as follows:
 *
 * ```js
 * import parsePropValues from '@instructure/ui-component-examples'
 *
 * const sourceFilePath = 'path/to/MyComponent'
 * const propValues = parsePropValues(fs.readFileSync(sourceFilePath, 'utf8'))
 * ```
 *
 * The result of the `parsePermutations` call above would be the following object
 *
 * ```js
 * {
 *   shape: ['square', 'rectangle', 'circle'],
 *   display: [true, false]
 * }
 * ```
 */
export default function parsePropValues (fileSource) {
  let parsedSrc = {}
  try {
    parsedSrc = parse(
     fileSource,
     resolver.findAllExportedComponentDefinitions
    )
    if (Array.isArray(parsedSrc)) {
      parsedSrc = parsedSrc.pop()
    }
  } catch (error) {
    throw new Error(
      `[ui-component-examples] Could not parse component source: ${error}`
    )
  }

  return getPropValuesFromParsedProps(parsedSrc.props)
}

function getPropValuesFromParsedProps (parsedProps) {
  if (!parsedProps) return []

  const propValues = {}

  Object.keys(parsedProps)
    .forEach((propName) => {
      const prop = parsedProps[propName]

      if (!(prop && prop.type)) {
        return
      }

      const { name, value } = prop.type

      if (name === 'enum') {
        propValues[propName] = Array.isArray(value) ? value.map((entry) => {
          const result = entry.value.replace(/['"]+/g, '')
          return result === 'null' ? null : result
        }) : []
      } else if (name === 'bool') {
        propValues[propName] = [false, true]
      }
    })

  return propValues
}
