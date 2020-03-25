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

const generateRemoveComponentsDirTransforms = (packages = []) => {
  const transforms = []

  const generateTransform = (packageName, sourceDir) => {
    const importPattern = `^${packageName}/${sourceDir}/components`

    return {
      where: {
        importPattern
      },
      transform: {
        importType: undefined,
        importPath: importPath => importPath.replace(new RegExp(importPattern), `${packageName}/${sourceDir}`)
      }
    }
  }

  packages.forEach((packageName) => {
    transforms.push(generateTransform(packageName, 'lib'))
    transforms.push(generateTransform(packageName, 'es'))
  })

  return transforms
}

module.exports = {
  transformDefaults: {
    importType: 'named'
  },
  transforms: [
    {
      // Remove the `components` portion of the path for any locators
      where: {
        importPattern: '^@instructure/ui-.*/(lib|es)/components/.*/locator$'
      },
      transform: {
        importType: 'default',
        importPath: importPath => importPath.replace(new RegExp('/components/'), '/')
      }
    },
    {
      where: {
        moduleName: 'Autocomplete',
        packageName: '@instructure/ui-core'
      },
      transform: {
        moduleName: 'Select',
        importPath: '@instructure/ui-forms'
      }
    },
    {
      where: {
        moduleNames: [
          'Checkbox',
          'CheckboxFacade',
          'ToggleFacade',
          'CheckboxGroup',
          'DateInput',
          'DatePicker',
          'FileDrop',
          'RadioInput',
          'RadioInputGroup',
          'RangeInput',
          'Select',
          'TextArea',
          'TextInput',
          'TimeInput'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-forms'
        ]
      },
      transform: {
        importPath: '@instructure/ui-forms'
      }
    },
    {
      where: {
        moduleName: 'NumberInput',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-forms',
          '@instructure/ui-number-input'
        ]
      },
      transform: {
        importPath: '@instructure/ui-number-input'
      }
    },
    {
      where: {
        moduleName: 'ApplyTheme',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-themeable'
        ]
      },
      transform: {
        importPath: '@instructure/ui-themeable'
      }
    },
    {
      where: {
        moduleName: 'ApplyLocale',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-i18n'
        ]
      },
      transform: {
        importPath: '@instructure/ui-i18n'
      }
    },
    {
      where: {
        moduleName: 'Alert',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-alerts'
        ]
      },
      transform: {
        importPath: '@instructure/ui-alerts'
      }
    },
    {
      where: {
        moduleNames: [
          'Avatar',
          'Badge',
          'Heading',
          'Link',
          'List',
          'ListItem',
          'MetricsList',
          'MetricsListItem',
          'Pill',
          'Progress',
          'Rating',
          'Spinner',
          'Table',
          'Tag',
          'Text'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-elements'
        ]
      },
      transform: {
        importPath: '@instructure/ui-elements'
      }
    },
    {
      where: {
        moduleName: 'Image',
        packageName: '@instructure/ui-core'
      },
      transform: {
        moduleName: 'Img',
        importPath: '@instructure/ui-elements'
      }
    },
    {
      where: {
        moduleName: 'Billboard',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-billboard'
        ]
      },
      transform: {
        importPath: '@instructure/ui-billboard'
      }
    },
    {
      where: {
        moduleNames: [
          'Breadcrumb',
          'BreadcrumbLink'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-breadcrumb'
        ]
      },
      transform: {
        importPath: '@instructure/ui-breadcrumb'
      }
    },
    {
      where: {
        moduleNames: [
          'Button',
          'CloseButton'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-buttons'
        ]
      },
      transform: {
        importPath: '@instructure/ui-buttons'
      }
    },
    {
      where: {
        moduleName: 'Container',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-container'
        ]
      },
      transform: {
        moduleName: 'View',
        importPath: '@instructure/ui-layout'
      }
    },
    {
      where: {
        moduleName: 'ContextBox',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-elements'
        ]
      },
      transform: {
        moduleName: 'ContextView',
        importPath: '@instructure/ui-layout'
      }
    },
    {
      where: {
        moduleNames: [
          'Grid',
          'GridCol',
          'GridRow',
          'Media',
          'Position',
          'PositionContent',
          'PositionTarget',
          'ContextView',
          'DrawerLayout',
          'DrawerContent',
          'Flex',
          'FlexItem',
          'Media',
          'Responsive',
          'View'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-layout'
        ]
      },
      transform: {
        importPath: '@instructure/ui-layout'
      }
    },
    {
      where: {
        moduleNames: [
          'AccessibleContent',
          'Dialog',
          'PresentationContent',
          'ScreenReaderContent',
          'findFocusable',
          'findTabbable',
          'FocusRegion',
          'FocusRegionManager',
          'KeyboardFocusRegion',
          'ScreenReaderFocusRegion',
          'scopeTab',
          'hasVisibleChildren'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-a11y'
        ]
      },
      transform: {
        importPath: '@instructure/ui-a11y'
      }
    },
    {
      where: {
        moduleNames: [
          'InlineSVG',
          'SVGIcon'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-svg-images'
        ]
      },
      transform: {
        importPath: '@instructure/ui-svg-images'
      }
    },
    {
      where: {
        moduleNames: [
          'Mask',
          'Overlay',
          'Modal',
          'ModalHeader',
          'ModalBody',
          'ModalFooter',
          'Popover',
          'PopoverTrigger',
          'PopoverContent',
          'Tooltip',
          'Tray'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-overlays'
        ]
      },
      transform: {
        importPath: '@instructure/ui-overlays'
      }
    },
    {
      where: {
        moduleName: 'PopoverMenu',
        packageName: '@instructure/ui-core'
      },
      transform: {
        moduleNames: 'Menu',
        importPath: '@instructure/ui-menu'
      }
    },
    {
      where: {
        moduleName: 'Portal',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-portal'
        ]
      },
      transform: {
        importPath: '@instructure/ui-portal'
      }
    },
    {
      where: {
        moduleNames: [
          'TabList',
          'TabPanel'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-tabs'
        ]
      },
      transform: {
        importPath: '@instructure/ui-tabs'
      }
    },
    {
      where: {
        moduleName: 'ToggleDetails',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-toggle-details'
        ]
      },
      transform: {
        importPath: '@instructure/ui-toggle-details'
      }
    },
    {
      where: {
        moduleName: 'Transition',
        packageName: '@instructure/ui-core'
      },
      transform: {
        importPath: '@instructure/ui-motion'
      }
    },
    {
      where: {
        moduleName: 'TreeBrowser',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-tree-browser'
        ]
      },
      transform: {
        importPath: '@instructure/ui-tree-browser'
      }
    },
    {
      where: {
        moduleName: 'Pagination',
        packageName: '@instructure/ui-core'
      },
      transform: {
        importPath: '@instructure/ui-pagination'
      }
    },
    {
      where: {
        moduleNames: [
          'Menu',
          'MenuItem'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-menu'
        ]
      },
      transform: {
        importPath: '@instructure/ui-menu'
      }
    },
    {
      where: {
        moduleNames: [
          'FormField',
          'FormFieldLabel',
          'FormFieldMessage',
          'FormFieldMessages',
          'FormFieldLayout',
          'FormFieldGroup',
          'FormPropTypes'
        ],
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-forms',
          '@instructure/ui-form-field'
        ]
      },
      transform: {
        importPath: '@instructure/ui-form-field'
      }
    },
    {
      where: {
        moduleName: 'hasVisibleChildren',
        packageNames: [
          '@instructure/ui-core',
          '@instructure/ui-a11y'
        ]
      },
      transform: {
        importPath: '@instructure/ui-a11y'
      }
    },
    {
      where: {
        moduleName: 'calculateElementPosition',
        packageName: '@instructure/ui-utils'
      },
      transform: {
        importPath: '@instructure/ui-layout'
      }
    },
    {
      where: {
        moduleName: 'debounce',
        packageName: '@instructure/ui-utils'
      },
      transform: {
        importPath: '@instructure/debounce'
      }
    },
    {
      where: {
        moduleName: 'CustomPropTypes',
        packageName: '@instructure/ui-utils'
      },
      transform: {
        importType: 'default',
        importPath: '@instructure/ui-prop-types'
      }
    },
    {
      where: {
        importPattern: '^@instructure/ui-icons/(lib|es)/Line/(.*)$'
      },
      transform: {
        moduleName: moduleName => `${moduleName}Line`,
        importPath: '@instructure/ui-icons'
      }
    },
    {
      where: {
        importPattern: '^@instructure/ui-icons/(lib|es)/Solid/(.*)$'
      },
      transform: {
        moduleName: moduleName => `${moduleName}Solid`,
        importPath: '@instructure/ui-icons'
      }
    },
    {
      where: {
        importPattern: '^@instructure/ui-themes/(lib|es)/canvas(/base)?$',
      },
      transform: {
        importType: undefined, // Leave importType undefined to preserve whatever import style was already being used here
        importPath: '@instructure/canvas-theme'
      }
    },
    {
      where: {
        importPattern: '^@instructure/ui-themes/(lib|es)/canvas/(high-contrast|a11y)$',
      },
      transform: {
        importType: undefined,
        importPath: '@instructure/canvas-high-contrast-theme'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-utils',
        moduleNames: [
          'ComponentIdentifier',
          'callRenderProp',
          'deprecated',
          'ensureSingleChild',
          'experimental',
          'getDisplayName',
          'getElementType',
          'matchComponentTypes',
          'omitProps',
          'pickProps',
          'safeCloneElement',
          'windowMessageListener'
        ]
      },
      transform: {
        importPath: '@instructure/ui-react-utils'
      }
    },
    {
      where: {
        packageNames: [
          '@instructure/ui-utils',
          '@instructure/ui-i18n'
        ],
        moduleNames: [
          'DateTime',
          'Locale'
        ]
      },
      transform: {
        importPath: '@instructure/ui-i18n'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-utils',
        moduleNames: [
          'findTabbable',
          'scopeTab'
        ]
      },
      transform: '@instructure/ui-a11y'
    },
    {
      where: {
        packageName: '@instructure/ui-utils',
        moduleNames: [
          'InputModeListener',
          'addEventListener',
          'addPositionChangeListener',
          'addResizeListener',
          'calculateElementPosition',
          'canUseDOM',
          'contains',
          'containsActiveElement',
          'elementMatches',
          'findDOMNode',
          'generateElementId',
          'getActiveElement',
          'getBoundingClientRect',
          'getClassList',
          'getComputedStyle',
          'getFontSize',
          'getOffsetParents',
          'getScrollParents',
          'handleMouseOverOut',
          'isActiveElement',
          'isVisible',
          'matchMedia',
          'ownerDocument',
          'ownerWindow',
          'requestAnimationFrame',
          'supportsObjectFit',
          'transformSelection'
        ]
      },
      transform: {
        importPath: '@instructure/ui-dom-utils'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-themeable',
        moduleNames: [
          'alpha',
          'darken',
          'lighten',
          'contrast',
          'isValid'
        ]
      },
      transform: {
        importPath: '@instructure/ui-color-utils'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-calendar',
        moduleName: 'Calendar'
      },
      transform: {
        importPath: '@instructure/ui-calendar'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-code-editor',
        moduleName: 'CodeEditor'
      },
      transform: {
        importPath: '@instructure/ui-code-editor'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-date-input',
        moduleName: 'DateInput'
      },
      transform: {
        importPath: '@instructure/ui-date-input'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-editable',
        moduleNames: [
          'Editable',
          'InPlaceEdit'
        ]
      },
      transform: {
        importPath: '@instructure/ui-editable'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-focusable',
        moduleNames: [
          'Focusable',
          'FocusableView'
        ]
      },
      transform: {
        importPath: '@instructure/ui-focusable'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-i18n',
        moduleNames: [
          'I18nPropTypes',
          'getTextDirection',
          'Decimal',
          'bidirectional',
          'ApplyTextDirection'
        ]
      },
      transform: {
        importPath: '@instructure/ui-i18n'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-i18n',
        moduleName: 'TextDirectionContextTypes'
      },
      transform: {
        moduleName: 'TextDirectionContext',
        importPath: '@instructure/ui-i18n'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-menu',
        moduleName: 'MenuContextTypes'
      },
      transform: {
        moduleName: 'MenuContext',
        importPath: '@instructure/ui-i18n'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-pages',
        moduleName: 'Pages'
      },
      transform: {
        importPath: '@instructure/ui-pages'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-selectable',
        moduleName: 'Selectable'
      },
      transform: {
        importPath: '@instructure/ui-selectable'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-table',
        moduleName: 'Table'
      },
      transform: {
        importPath: '@instructure/ui-table'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-text-input',
        moduleName: 'TextInput'
      },
      transform: {
        importPath: '@instructure/ui-text-input'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-themeable',
        moduleNames: [
          'ThemeablePropTypes',
          'applyCustomMediaToCss',
          'applyVariablesToNode',
          'customPropertiesSupported',
          'formatVariableName',
          'formatVariableNames',
          'getCssText',
          'getShorthandPropValue',
          'makeThemeVars',
          'mirrorShorthandEdges',
          'mirrorShorthandCorners',
          'parseCss',
          'pickOverrides',
          'replaceValuesWithVariableNames',
          'scopeStylesToNode',
          'setTextDirection',
          'transformCss'
        ]
      },
      transform: {
        importPath: '@instructure/ui-themeable'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-toggle-details',
        moduleNames: [
          'Expandable',
          'ToggleGroup'
        ]
      },
      transform: {
        importPath: '@instructure/ui-toggle-details'
      }
    },
    {
      where: {
        importPattern: '^@instructure/ui-prop-types/(lib|es)/'
      },
      transform: {
        importPath: '@instructure/ui-prop-types'
      }
    },
    // These transforms account for any modules that are not exported in the upgraded packages. The import path
    // to said modules will have changed because the `components` dir was removed.
    ...generateRemoveComponentsDirTransforms([
      '@instructure/ui-calendar',
      '@instructure/ui-code-editor',
      '@instructure/ui-elements',
      '@instructure/ui-forms',
      '@instructure/ui-layout',
      '@instructure/ui-menu',
      '@instructure/ui-motion',
      '@instructure/ui-navigation',
      '@instructure/ui-overlays',
      '@instructure/ui-pages',
      '@instructure/ui-pagination',
      '@instructure/ui-table',
      '@instructure/ui-tabs',
      '@instructure/ui-tree-browser'
    ])
  ]
}
