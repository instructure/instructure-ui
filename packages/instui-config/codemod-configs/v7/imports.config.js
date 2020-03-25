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
        packageName: '@instructure/ui-elements',
        moduleName: 'Avatar'
      },
      transform: {
        importPath: '@instructure/ui-avatar'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Badge'
      },
      transform: {
        importPath: '@instructure/ui-badge'
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
        importPath: '@instructure/ui-metric'
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
        importPath: '@instructure/ui-list'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Pill'
      },
      transform: {
        importPath: '@instructure/ui-pill'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Progress'
      },
      transform: {
        importPath: '@instructure/ui-progress'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Rating'
      },
      transform: {
        importPath: '@instructure/ui-rating'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Img'
      },
      transform: {
        importPath: '@instructure/ui-img'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Text'
      },
      transform: {
        importPath: '@instructure/ui-text'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'TruncateText'
      },
      transform: {
        importPath: '@instructure/ui-truncate-text'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Link'
      },
      transform: {
        importPath: '@instructure/ui-link'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Heading'
      },
      transform: {
        importPath: '@instructure/ui-heading'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Tag'
      },
      transform: {
        importPath: '@instructure/ui-tag'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-elements',
        moduleName: 'Spinner'
      },
      transform: {
        importPath: '@instructure/ui-spinner'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleName: 'Media'
      },
      transform: {
        moduleName: 'Byline',
        importPath: '@instructure/ui-byline'
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
        importPath: '@instructure/ui-view'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleNames: [
          'Position',
          'PositionContent',
          'PositionTarget',
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
        importPath: '@instructure/ui-drawer-layout'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-layout',
        moduleNames: [
          'Responsive',
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
        importPath: '@instructure/ui-flex'
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
        importPath: '@instructure/ui-grid'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'TextInput'
      },
      transform: {
        importPath: '@instructure/ui-text-input'
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
        importPath: '@instructure/ui-checkbox'
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
        importPath: '@instructure/ui-radio-input'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'RangeInput'
      },
      transform: {
        importPath: '@instructure/ui-range-input'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'TextArea'
      },
      transform: {
        importPath: '@instructure/ui-text-area'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'FileDrop'
      },
      transform: {
        importPath: '@instructure/ui-file-drop'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-forms',
        moduleName: 'TimeInput'
      },
      transform: {
        moduleName: 'TimeSelect',
        importPath: '@instructure/ui-time-select'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-toggle-details',
        moduleName: 'Expandable'
      },
      transform: {
        importPath: '@instructure/ui-expandable'
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
        importPath: '@instructure/ui-popover'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-overlays',
        moduleName: 'Tooltip'
      },
      transform: {
        importPath: '@instructure/ui-tooltip'
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
        importPath: '@instructure/ui-modal'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-overlays',
        moduleName: 'Tray'
      },
      transform: {
        importPath: '@instructure/ui-tray'
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
        importPath: '@instructure/ui-a11y-content'
      }
    },
    {
      where: {
        packageName: '@instructure/ui-a11y',
        moduleName: 'Dialog'
      },
      transform: {
        importPath: '@instructure/ui-dialog'
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
}
