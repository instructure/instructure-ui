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
import { parseQuery } from '../../parseQuery'

export default class MediaQueryListProxy {
  constructor (query, listenerCallback, initialSize = { width: 0, height: 0}) {
    // Convert query string back to a json object
    let [key, value] = query.replace(/\(|\)|\s/g, '').split(':')
    key = key.replace(/-([a-z])/g, g => g[1].toUpperCase())

    const namedQuery = { 'query': {} }
    namedQuery.query[key] = value

    this.queryMatches = parseQuery(namedQuery)
    this.listenerCallback = listenerCallback
    this.size = initialSize
  }

  addListener(cb) {
    this.listenerCallback((width, height) => {
      this.size = { width, height }
      cb()
    })
  }

  get matches () {
    return this.queryMatches(this.size).query
  }
}
