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

module.exports = {
  features: [ // https://github.com/amilajack/eslint-plugin-compat/wiki/Adding-polyfills-(v2)
    'Array.from',
    'Array.prototype.find',
    'Array.prototype.findIndex',
    'Array.prototype.includes',
    'Map',
    'Number.isInteger',
    'Object.assign',
    'Object.entries',
    'Object.getOwnPropertySymbols',
    'Object.values',
    'Object.keys',
    'Promise',
    'Set',
    'String.prototype.startsWith',
    'Symbol',
    'WeakSet',
    'String.prototype.codePointAt',
    'String.prototype.fromCodePoint',
    'String.prototype.includes',
    'String.prototype.repeat'
  ],
  modules: [ // https://github.com/zloirock/core-js/tree/master/packages/core-js/modules
    'es.array.find',
    'es.array.find-index',
    'es.array.from',
    'es.array.includes',
    'es.map',
    'es.number.is-integer',
    'es.object.assign',
    'es.object.values',
    'es.object.keys',
    'es.object.entries',
    'es.promise',
    'es.promise.finally',
    'es.set',
    'es.string.code-point-at',
    'es.string.from-code-point',
    'es.string.includes',
    'es.string.repeat',
    'es.string.starts-with',
    'es.string.trim-end',
    'es.symbol',
    'es.symbol.iterator',
    'es.weak-set',
    'web.dom-collections.iterator',
    'web.dom-collections.for-each'
  ]
}
