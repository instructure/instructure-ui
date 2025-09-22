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

const isReference = (expression) =>
  expression[0] === '{' && expression[expression.length - 1] === '}'

const formatComponent = (collection, key) => {
  const value = key ? collection[key] : collection
  if (typeof value === 'object' && !value.value && !value.type) {
    return Object.keys(value).reduce((acc, key) => {
      return { ...acc, [key]: formatComponent(value, key) }
    }, {})
  }
  return value.value
}

const formatReference = (reference) => {
  const referenceArr = reference.slice(1, -1).split('.')
  const lastElement = referenceArr[referenceArr.length - 1]

  if (!isNaN(Number(lastElement))) {
    return `semantics.${referenceArr.slice(0, -1).join('.')}[${lastElement}],\n`
  }
  return `semantics.${reference.slice(1, -1)},\n`
}

export const resolveReferences = (semantics, key) => {
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

export const resolveTypeReferences = (semantics, key) => {
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
    return `Semantics${value
      .slice(1, -1)
      .split('.')
      .map((val) => `['${val}']`)
      .join('')}, `
  }

  if (!isNaN(Number(value))) {
    return 'number, '
  }
  return `${typeof value}, `
}

//this will just convert everything to string type, which is sufficient but could be better, since sometimes number makes sense
// export const resolveTypeReferences = (semantics, key) => {
//   const value = key ? semantics[key] : semantics
//   if (typeof value === 'object') {
//     return Object.keys(value).reduce((acc, key, index) => {
//       if (typeof value[key] === 'object') {
//         return (
//           acc +
//           `"${key}": {${resolveTypeReferences(value, key)}}${
//             index + 1 === Object.keys(value).length ? '' : ',\n'
//           }`
//         )
//       }
//       return acc + `"${key}": ${resolveTypeReferences(value, key)}`
//     }, '')
//   }

//   return `string, `
// }


const generateComponent = (data) => {
  const formattedSemantic = formatComponent(data)

  return resolveReferences(formattedSemantic)
}

export const generateComponentType = (data) => {
  const formattedSemantic = formatComponent(data)

  return `{${resolveTypeReferences(formattedSemantic)}}`
}

export default generateComponent
