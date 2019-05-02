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

function getOptKeyFromSource (source, opts) {
  if (opts[source]) {
    return source
  } else {
    return Object.keys(opts).find(optKey => new RegExp(optKey).test(source))
  }
}

function getMatchesFromSource (source, regex) {
  const matches = []
  let match
  let matcher = regex

  matcher.lastIndex = 0
  matcher = new RegExp(matcher.source, 'g')

  while ((match = matcher.exec(source)) !== null) {
    match.forEach((m) => {
      matches.push(m)
    })

    if (matcher.lastIndex === match.index) {
      matcher.lastIndex++
    }
  }
  return matches
}

function transform (transformOption, importName, matches) {
  const isFunction = typeof transformOption === 'function'
  if (/\.js$/i.test(transformOption) || isFunction) {
    let transformFn
    try {
      transformFn = isFunction ? transformOption : require(transformOption)
    } catch (error) {
      console.error('[babel-plugin-transform-imports] failed to require transform file ' + transformOption)
    }

    if (typeof transformFn !== 'function') {
      console.error('[babel-plugin-transform-imports] expected transform function to be exported from ' + transformOption)
    }

    return transformFn(importName, matches)
  }

  return transformOption.replace(/\$\{\s?([\w\d]*)\s?\}/ig, (str, g1) => {
    if (g1 === 'member') return importName
    return matches[g1]
  })
}

module.exports = function transformImports ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration: function (path, state) {
        const { source, specifiers } = path.node
        const optKey = getOptKeyFromSource(source.value, state.opts)
        const opts = state.opts[optKey]

        if (!opts) return

        if (!opts.transform) {
          console.error('[babel-plugin-transform-imports] transform option is required for module ' + source.value)
          return
        }

        const matches = getMatchesFromSource(source.value, new RegExp(optKey, 'g')) || []

        let transforms = []

        const defaultImports = specifiers.filter(specifier => (specifier.type !== 'ImportSpecifier'))
        const memberImports = specifiers.filter(specifier => (specifier.type === 'ImportSpecifier'))

        if (defaultImports.length > 0) {
          if (memberImports.length > 0) {
            transforms.push(t.importDeclaration(defaultImports, t.stringLiteral(source)))
          }
        }

        memberImports.forEach((memberImport) => {
          const importName = memberImport.imported.name
          const newImportPath = transform(opts.transform, importName, matches)

          if (newImportPath) {
            transforms.push(t.importDeclaration(
              [memberImport],
              t.stringLiteral(newImportPath)
            ))
          }
        })

        if (transforms.length > 0) {
          path.replaceWithMultiple(transforms)
        }
      }
    }
  }
}
