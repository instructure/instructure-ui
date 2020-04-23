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

module.exports = ({ isMetaComponentPackageMigration = false } = {}) => {
  const getImportPath = (importPath) => {
    return isMetaComponentPackageMigration ? '@instructure/ui' : importPath
  }

  let transforms = [
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Avatar'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-avatar')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Badge'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-badge')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleNames: [
          'MetricsList',
          'MetricsListItem'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-metric')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleNames: [
          'List',
          'ListItem'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-list')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Pill'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-pill')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Progress'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-progress')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Rating'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-rating')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Img'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-img')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Text'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-text')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'TruncateText'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-truncate-text')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Link'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-link')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Heading'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-heading')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Tag'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-tag')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Spinner'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-spinner')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleName: 'Media'
      },
      transform: {
        moduleName: 'Byline',
        importPath: getImportPath('@instructure/ui-byline')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleNames: [
          'View',
          'ContextView'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-view')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleNames: [
          'Position',
          'PositionContent',
          'PositionTarget'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-position')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleNames: [
          'calculateElementPosition',
          'executeMirrorFunction',
          'mirrorHorizontalPlacement',
          'mirrorPlacement',
          'parsePlacement'
        ]
      },
      transform: {
        importPath: '@instructure/ui-position'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleNames: [
          'DrawerLayout',
          'DrawerContent'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-drawer-layout')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleName: 'Responsive'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-responsive')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleNames: [
          'addElementQueryMatchListener',
          'addMediaQueryMatchListener',
          'parseQuery',
          'jsonToMediaQuery'
        ]
      },
      transform: {
        importPath: '@instructure/ui-responsive'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleNames: [
          'Flex',
          'FlexItem'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-flex')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleNames: [
          'Grid',
          'GridCol',
          'GridRow'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-grid')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'TextInput'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-text-input')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleNames: [
          'Checkbox',
          'CheckboxFacade',
          'ToggleFacade',
          'CheckboxGroup'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-checkbox')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleNames: [
          'RadioInput',
          'RadioInputGroup'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-radio-input')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'RangeInput'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-range-input')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'TextArea'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-text-area')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'FileDrop'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-file-drop')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'TimeInput'
      },
      transform: {
        moduleName: 'TimeSelect',
        importPath: getImportPath('@instructure/ui-time-select')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-toggle-details',
        moduleName: 'Expandable'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-expandable')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-overlays',
        moduleNames: [
          'Popover',
          'PopoverTrigger',
          'PopoverContent'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-popover')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-overlays',
        moduleName: 'Tooltip'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-tooltip')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-overlays',
        moduleNames: [
          'Modal',
          'ModalHeader',
          'ModalBody',
          'ModalFooter',
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-modal')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-overlays',
        moduleName: 'Tray'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-tray')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-a11y',
        moduleNames: [
          'AccessibleContent',
          'PresentationContent',
          'ScreenReaderContent'
        ]
      },
      transform: {
        importPath: getImportPath('@instructure/ui-a11y-content')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-a11y',
        moduleName: 'Dialog'
      },
      transform: {
        importPath: getImportPath('@instructure/ui-dialog')
      }
    },
    {
      where: {
        packageName: '@instructure/ui-a11y',
        moduleNames: [
          'findFocusable',
          'findTabbable',
          'scopeTab',
          'hasVisibleChildren',
          'FocusRegion',
          'FocusRegionManager',
          'KeyboardFocusRegion',
          'ScreenReaderFocusRegion'
        ]
      },
      transform: {
        importPath: '@instructure/ui-a11y-utils'
      }
    },
  ]

  if (isMetaComponentPackageMigration) {
    transforms = [
      ...transforms,
      {
        where: {
          packageName: '@instructure/ui-alerts',
          moduleName: 'Alert',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-billboard',
          moduleName: 'Billboard',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-breadcrumb',
          moduleName: 'Breadcrumb',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-buttons',
          moduleNames: [
            'BaseButton',
            'Button',
            'CloseButton',
            'CondensedButton',
            'IconButton',
            'ToggleButton'
          ]
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-calendar',
          moduleName: 'Calendar',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-code-editor',
          moduleName: 'CodeEditor',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-date-input',
          moduleName: 'DateInput',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-editable',
          moduleNames: [
            'InPlaceEdit',
            'Editable'
          ],
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-focusable',
          moduleName: 'Focusable',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-form-field',
          moduleNames: [
            'FormField',
            'FormFieldLabel',
            'FormFieldMessage',
            'FormFieldMessages',
            'FormFieldLayout',
            'FormFieldGroup',
          ],
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-i18n',
          moduleNames: [
            'ApplyLocale',
            'ApplyTextDirection'
          ],
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-icons'
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-list',
          moduleNames: [
            'List',
            'InlineList'
          ],
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-menu',
          moduleNames: [
            'Menu',
            'MenuItemGroup',
            'MenuItemSeparator',
            'MenuItem'
          ],
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-metric',
          moduleNames: [
            'MetricGroup',
            'Metric'
          ],
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-motion',
          moduleName: 'Transition',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-navigation',
          moduleNames: [
            'Navigation',
            'AppNav'
          ]
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-number-input',
          moduleName: 'NumberInput',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-options',
          moduleName: 'Options',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-overlays',
          moduleNames: [
            'Mask',
            'Overlay'
          ]
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-pages',
          moduleName: 'Pages',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-pagination',
          moduleName: 'Pagination',
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-progress',
          moduleNames: [
            'ProgressBar',
            'ProgressCircle'
          ],
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-select',
          moduleName: 'Select'
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-selectable',
          moduleName: 'Selectable'
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-svg-images',
          moduleNames: [
            'InlineSVG',
            'SVGIcon'
          ]
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-table',
          moduleName: 'Table'
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-tabs',
          moduleName: 'Tabs'
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-select',
          moduleName: 'Select'
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-themeable',
          moduleNames: [
            'themeable',
            'ApplyTheme'
          ]
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-toggle-details',
          moduleNames: [
            'ToggleDetails',
            'ToggleGroup'
          ]
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-tree-browser',
          moduleName: 'TreeBrowser'
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
      {
        where: {
          packageName: '@instructure/ui-portal',
          moduleName: 'Portal'
        },
        transform: {
          importPath: '@instructure/ui'
        }
      },
    ]
  }

  return {
    transformDefaults: {
      importType: 'named'
    },
    transforms
  }
}