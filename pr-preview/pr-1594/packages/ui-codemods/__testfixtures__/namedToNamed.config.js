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
        importPattern: '^ui-foo'
      },
      transform: {
        importPath: 'ui-bar'
      }
    },
    {
      where: {
        moduleName: 'Baz',
        importPath: 'ui-baz'
      },
      transform: {
        importPath: 'ui-qux'
      }
    },
    {
      where: {
        moduleName: 'themeable',
        importPath: 'themeable'
      },
      transform: {
        importPath: '@instructure/ui-themeable'
      }
    },
    {
      where: {
        moduleName: 'something',
        packageName: 'ui-something'
      },
      transform: {
        moduleName: 'somethingElse',
        importPath: 'ui-something-else'
      }
    },
    {
      where: {
        moduleName: 'LayoutPropTypes',
        packageName: '@instructure/ui-layout'
      },
      transform: {
        importPath: '@instructure/ui-prop-types'
      }
    },
    {
      where: {
        moduleName: 'Flex',
        packageName: '@instructure/ui-layout'
      },
      transform: {
        importPath: '@instructure/ui-flex'
      }
    },
    {
      where: {
        moduleName: 'View',
        packageName: '@instructure/ui-layout'
      },
      transform: {
        importPath: '@instructure/ui-view'
      }
    },
    {
      where: {
        moduleNames: ['Modal', 'Tray', 'Popover']
      },
      transform: {
        importPath: '@instructure/ui-overlays'
      }
    }
  ]
}
