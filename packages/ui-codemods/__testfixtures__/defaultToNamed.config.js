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
        packageName: 'instructure-ui'
      },
      transform: {
        importPath: '@instructure/ui-foo'
      }
    },
    {
      where: {
        moduleName: 'Bar',
        packageName: 'instructure-ui'
      },
      transform: {
        importPath: '@instructure/ui-bar'
      }
    },
    {
      where: {
        importPath: 'instructure-ui/lib/components/Baz'
      },
      transform: {
        importPath: '@instructure/ui-qux'
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/utils/Rad'
      },
      transform: {
        importPath: '@instructure/ui-fad'
      }
    },
    {
      where: {
        moduleName: 'themeable',
        packageName: 'instructure-ui'
      },
      transform: {
        importPath: '@instructure/ui-themeable'
      }
    },
    {
      where: {
        moduleNames: ['View', 'ContextView', 'Flex', 'Grid'],
        packageName: 'instructure-ui'
      },
      transform: {
        importPath: '@instructure/ui-layout'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-themes',
        moduleName: 'base'
      },
      transform: {
        moduleName: 'theme',
        importPath: '@instructure/canvas-theme'
      }
    }
  ]
}
