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

//////////////////////////////////////////////////////////////////////////////////
// START OF MERGEDEEP
//////////////////////////////////////////////////////////////////////////////////
//This is needed because scripts can't have dependencies (e.g. ui-utils) because it needs to be resolved before build

function mergeDeep(...args: Record<string, unknown>[]): Record<string, any> {
  // note: This could be typed as the union of its args, but since
  // its barely used its not worth the effort currently
  let target = {}
  args.forEach((arg) => {
    target = mergeSourceIntoTarget(target, arg)
  })
  return target
}

function mergeSourceIntoTarget(
  target: Record<string, any>,
  source: Record<string, any>
) {
  if (isObject(source)) {
    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source)
    ]
    const merged = { ...target }

    keys.forEach((key: any) => {
      if (isObject(target[key]) && isObject(source[key])) {
        merged[key] = mergeSourceIntoTarget(target[key], source[key])
      } else if (isArray(source[key]) && isArray(target[key])) {
        merged[key] = [...new Set([...target[key], ...source[key]])]
      } else if (isArray(target[key])) {
        merged[key] = [...new Set([...target[key], ...[source[key]]])]
      } else {
        merged[key] = source[key]
      }
    })
    return merged
  } else {
    return { ...target }
  }
}

function isObject(item: unknown) {
  return (
    item &&
    (typeof item === 'object' || typeof item === 'function') &&
    !Array.isArray(item)
  )
}

function isArray(item: unknown): boolean {
  return Array.isArray(item)
}

//////////////////////////////////////////////////////////////////////////////////
// END OF MERGEDEEP
//////////////////////////////////////////////////////////////////////////////////

const isReference = (expression: any): boolean =>
  expression[0] === '{' && expression[expression.length - 1] === '}'

const formatSemantic = (collection: any, key?: any): any => {
  const value = key ? collection[key] : collection
  if (typeof value === 'object' && !value.value && !value.type) {
    return Object.keys(value).reduce((acc, key) => {
      return { ...acc, [key]: formatSemantic(value, key) }
    }, {})
  }
  // `$extensions` is the Design Tokens Format spec's escape hatch for tool-specific
  // metadata. Tokens Studio writes color modifiers there under `studio.tokens.modify`
  // (e.g. `{ type: 'darken', value: 0.1 }`); we forward that payload so the runtime
  // (`applyColorModifiers`) can resolve the final color at theme apply time.
  if (
    value['$extensions'] &&
    value['$extensions']['studio.tokens'] &&
    value['$extensions']['studio.tokens'].modify
  ) {
    return {
      value: value.value,
      modify: value['$extensions']['studio.tokens'].modify
    }
  }
  return value.value
}

const formatReference = (reference: string): string => {
  const referenceArr = reference.slice(1, -1).split('.')
  const lastElement = referenceArr[referenceArr.length - 1]

  if (!isNaN(Number(lastElement))) {
    return `primitives.${referenceArr
      .slice(0, -1)
      .join('.')}[${lastElement}],\n`
  }
  return `primitives.${reference.slice(1, -1)},\n`
}

export const resolveReferences = (semantics: any, key?: any): string => {
  const value = key ? semantics[key] : semantics
  if (typeof value === 'object') {
    return Object.keys(value).reduce((acc, key, index) => {
      if (typeof value[key] === 'object') {
        return (
          acc +
          `"${key}": {${resolveReferences(value, key)}}${
            index + 1 === Object.keys(value).length ? '' : ',\n'
          }`
        )
      }
      return acc + `"${key}": ${resolveReferences(value, key)}`
    }, '')
  }

  if (isReference(value)) {
    return formatReference(value)
  }

  if (!isNaN(Number(value))) {
    return `${value},\n`
  }

  return `"${value}",\n`
}

export const resolveTypeReferences = (semantics: any, key?: any): string => {
  const value = key ? semantics[key] : semantics
  if (typeof value === 'object') {
    return Object.keys(value).reduce((acc, key, index) => {
      if (typeof value[key] === 'object') {
        return (
          acc +
          `"${key}": {${resolveTypeReferences(value, key)}}${
            index + 1 === Object.keys(value).length ? '' : ',\n'
          }`
        )
      }
      return acc + `"${key}": ${resolveTypeReferences(value, key)}`
    }, '')
  }

  if (isReference(value)) {
    return `Primitives${value
      .slice(1, -1)
      .split('.')
      .map((val: string) => `['${val}']`)
      .join('')}, `
  }

  if (!isNaN(Number(value))) {
    return 'number, '
  }
  return `${typeof value}, `
}

export const mergeSemanticSets = (semanticList: any[]) => {
  return semanticList.reduce((acc, semantic) => {
    return mergeDeep(acc, semantic)
  }, {})
}

const generateSemantics = (data: any): string => {
  const formattedSemantic = formatSemantic(data)

  return resolveReferences(formattedSemantic)
}

export const generateSemanticsType = (data: any): string => {
  const formattedSemantic = formatSemantic(data)

  return `{${resolveTypeReferences(formattedSemantic)}}`
}

export default generateSemantics
