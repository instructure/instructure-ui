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

function accepts(file: any, acceptProp: any) {
  if (file && acceptProp && file.type !== 'application/x-moz-file') {
    const acceptList = getAcceptList(acceptProp)
    const mimeType = file.type || ''
    const baseMimeType = mimeType.replace(/\/.*$/, '')

    return acceptList.some((type: any) => {
      if (type.charAt(0) === '.') {
        // type is an extension like .pdf
        if (!file.name) {
          return mimeType.endsWith(type.slice(1))
        }
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      } else if (/\/\*$/.test(type)) {
        // type is something like a image/* mime type
        return baseMimeType === type.replace(/\/.*$/, '')
      }
      return mimeType === type
    })
  }
  return true
}

function getAcceptList(accept: any) {
  const list = Array.isArray(accept) ? accept : accept.split(',')
  return list.map((a: any) => a.trim().replace(/^\w+$/, '.$&'))
}

export default accepts
export { accepts, getAcceptList }
