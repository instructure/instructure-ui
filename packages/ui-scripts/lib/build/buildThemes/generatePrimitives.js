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

export const generatePrimitives = (collection, key) => {
  const value = key ? collection[key] : collection
  if (typeof value === 'object' && !value.value && !value.type) {
    return Object.keys(value).reduce((acc, key) => {
      return { ...acc, [key]: generatePrimitives(value, key) }
    }, {})
  }

  if (!isNaN(Number(value.value))) {
    return Number(value.value)
  }

  return value.value
}

const generateTypeData = (primitives, key) => {
  const value = key ? primitives[key] : primitives
  if (typeof value === 'object' && !value.value && !value.type) {
    return Object.keys(value).reduce((acc, key, index) => {
      if (typeof value[key] === 'object') {
        return (
          acc +
          `${key}: {${generateTypeData(value, key)}}${
            index + 1 === Object.keys(value).length ? '' : ', '
          }`
        )
      }
      return acc + `${key}: ${generateTypeData(value, key)}`
    }, '')
  }
  if (!isNaN(Number(value))) {
    return 'number, '
  }

  return `${typeof value}, `
}

export const generateType = (primitives, key) => {
  const typeData = generateTypeData(primitives, key)

  return `{${typeData}}`
}
export default generatePrimitives
