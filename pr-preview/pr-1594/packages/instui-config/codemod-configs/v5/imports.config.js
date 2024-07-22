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
    importType: 'default'
  },
  transforms: [
    {
      where: {
        importPattern: '^instructure-ui/lib/components'
      },
      transform: {
        importPath: (importPath, parsedImport) => {
          let { moduleName } = parsedImport

          if (moduleName === 'Typography') {
            moduleName = 'Text'
          }

          return `@instructure/ui-core/lib/components/${moduleName}`
        }
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/themes'
      },
      transform: {
        importPath: (importPath) =>
          importPath.replace(
            new RegExp('^instructure-ui/lib/themes'),
            '@instructure/ui-themes/lib'
          )
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/themeable'
      },
      transform: {
        importPath: (importPath) =>
          importPath.replace(
            new RegExp('^instructure-ui/lib/themeable'),
            '@instructure/ui-themeable/lib'
          )
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/util/dom'
      },
      transform: {
        importPath: (importPath) =>
          importPath.replace(
            new RegExp('^instructure-ui/lib/util/dom'),
            '@instructure/ui-utils/lib/dom'
          )
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/util',
        moduleName: 'BaseTransition'
      },
      transform: {
        importPath: '@instructure/ui-motion/lib/components/BaseTransition'
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/util',
        moduleName: 'hasVisibleChildren'
      },
      transform: {
        importPath: '@instructure/ui-a11y/lib/utils/hasVisibleChildren'
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/util',
        moduleName: 'color'
      },
      transform: {
        importPath: '@instructure/ui-themeable/lib/utils/color'
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/util',
        moduleName: 'handleMouseOverOut'
      },
      transform: {
        importPath: '@instructure/ui-utils/lib/dom/handleMouseOverOut'
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/util',
        moduleNames: [
          'capitalizeFirstLetter',
          'createChainedFunction',
          'debounce',
          'mergeDeep',
          'shallowEqual',
          'warning'
        ]
      },
      transform: {
        importPath: (importPath, { moduleName }) =>
          `@instructure/ui-utils/lib/${moduleName}`
      }
    },
    {
      where: {
        importPattern: '^instructure-ui/lib/util',
        moduleNames: [
          'ComponentIdentifier',
          'containerQuery',
          'CustomPropTypes',
          'deprecated',
          'ensureSingleChild',
          'getDisplayName',
          'getElementType',
          'matchComponentTypes',
          'passthroughProps',
          'safeCloneElement',
          'windowMessageListener'
        ]
      },
      transform: {
        importPath: (importPath, { moduleName }) =>
          `@instructure/ui-utils/lib/react/${moduleName}`
      }
    },
    {
      where: {
        packageName: 'instructure-icons'
      },
      transform: {
        importType: 'named',
        importPath: '@instructure/ui-icons'
      }
    }
  ]
}
