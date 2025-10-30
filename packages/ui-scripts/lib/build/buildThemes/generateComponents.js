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

const boxShadowType = 'BoxShadow'

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
  if (value === '') {
    // token studio returns "" if a value is not set, but defaults to 0
    console.warn(
      `WARNING: key "${key}" has empty value, setting to 0. Is this intentional?`
    )
    return `0,\n`
  }
  if (!isNaN(Number(value))) {
    return `${value},\n`
  }

  return `"${value}",\n`
}

const generateComponent = (data) => {
  const formattedSemantic = formatComponent(data)

  return resolveReferences(formattedSemantic)
}

const getGenericType = (value) => {
  if (isReference(value)) {
    return `Semantics${value
      .slice(1, -1)
      .split('.')
      .map((val) => `['${val}']`)
      .join('')}`
  }
  return 'string'
}

const parseType = (key, tokenObject, acc) => {
  let ret = acc
  if (tokenObject.type) {
    switch (tokenObject.type) {
      case 'border':
        // This type is coming from Token Studio
        ret += '{ style: "solid" | "dashed" }'
        break
      case 'borderWidth':
      case 'borderRadius':
      case 'color':
      case 'fontFamilies':
      case 'fontSizes':
      case 'fontWeights':
      case 'lineHeights':
      case 'sizing':
      case 'spacing':
        ret += `${getGenericType(tokenObject.value)}`
        break
      case 'boxShadow': {
        // This type is coming from Token Studio,
        // by convention we always assign a default value to x,y,blur,spread
        if (Array.isArray(tokenObject.value)) {
          ret += '{'
          for (let i = 0; i < tokenObject.value.length; i++) {
            ret += `"${i}": ${boxShadowType}\n`
          }
          ret += '}'
        } else {
          ret += boxShadowType
        }
        break
      }
      case 'typography':
        ret += ` {
        fontFamily: ${getGenericType(tokenObject.value.fontFamily)}
        fontWeight: ${getGenericType(tokenObject.value.fontWeight)}
        fontSize: ${getGenericType(tokenObject.value.fontSize)}
        lineHeight: ${getGenericType(tokenObject.value.lineHeight)}
        textDecoration: "underline"
        }`
        break
      default:
        throw new Error(
          `unknown token type ${tokenObject.type} for key ${key}.`
        )
    }
    return ret
  } else {
    for (const key of Object.keys(tokenObject)) {
      if (tokenObject[key].type) {
        if (tokenObject[key].description) {
          ret += `/** ${tokenObject[key].description} */\n`
        }
        ret += `${key}: ${parseType(key, tokenObject[key], acc)}\n`
      } else {
        ret += `${key}: {${parseType(key, tokenObject[key], acc)}}\n`
      }
    }
  }
  return ret
}

/**
 * Generates the type for a component as a JSON string
 * @param data an object directly from a Tokens Studio JSON file.
 */
export const generateComponentType = (data) => {
  return `{${parseType('', data, '')}}`
}
export { boxShadowType }
export default generateComponent
