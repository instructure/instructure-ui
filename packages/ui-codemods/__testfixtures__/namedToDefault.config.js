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
  transformDefaults: {
    importType: 'named'
  },
  transforms: [
    {
      where: {
        moduleName: 'Foo',
        packageName: '@instructure/ui-foo'
      },
      transform: {
        importType: 'default'
      }
    },
    {
      where: {
        moduleName: 'Baz',
        packageName: 'stuff'
      },
      transform: {
        importPath: '@other/stuff',
        importType: 'default'
      }
    },
    {
      where: {
        moduleName: 'Qux',
        packageName: 'stuff'
      },
      transform: {
        importPath: 'more-stuff',
        importType: 'default'
      }
    },
    {
      where: {
        importPath: 'thing1'
      },
      transform: {
        importPath: 'thing2',
        importType: 'default'
      }
    },
    {
      where: {
        moduleName: 'themeable',
        importPath: 'themeable'
      },
      transform: {
        importPath: '@instructure/ui-themeable',
        importType: 'default'
      }
    }
  ]
}
