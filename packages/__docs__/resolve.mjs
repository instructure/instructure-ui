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

import path from 'path'

const alias = {
  // set up aliases to get webpack to rebuild when we make changes to these packages
  '@instructure/debounce$:': path.resolve(import.meta.dirname, '../debounce/src/'),
  '@instructure/ui-a11y-content$': path.resolve(
    import.meta.dirname,
    '../ui-a11y-content/src/'
  ),
  '@instructure/ui-alerts$': path.resolve(import.meta.dirname, '../ui-alerts/src/exports/a'),
  '@instructure/ui-avatar$': path.resolve(import.meta.dirname, '../ui-avatar/src/exports/a'),
  '@instructure/ui-badge$': path.resolve(import.meta.dirname, '../ui-badge/src/exports/a'),
  '@instructure/ui-billboard$': path.resolve(
    import.meta.dirname,
    '../ui-billboard/src/exports/a'
  ),
  '@instructure/ui-breadcrumb$': path.resolve(
    import.meta.dirname,
    '../ui-breadcrumb/src/exports/a'
  ),
  '@instructure/ui-buttons$': path.resolve(import.meta.dirname, '../ui-buttons/src/exports/a'),
  '@instructure/ui-byline$': path.resolve(import.meta.dirname, '../ui-byline/src/exports/a'),
  '@instructure/ui-calendar$': path.resolve(import.meta.dirname, '../ui-calendar/src/exports/a'),
  '@instructure/ui-checkbox$': path.resolve(import.meta.dirname, '../ui-checkbox/src/exports/a'),
  '@instructure/ui-color-picker$': path.resolve(
    import.meta.dirname,
    '../ui-color-picker/src/exports/a'
  ),
  '@instructure/ui-date-input$': path.resolve(
    import.meta.dirname,
    '../ui-date-input/src/exports/a'
  ),
  '@instructure/ui-date-time-input$': path.resolve(
    import.meta.dirname,
    '../ui-date-time-input/src/exports/a'
  ),
  '@instructure/ui-decorator$': path.resolve(import.meta.dirname, '../ui-decorator/src/'),
  '@instructure/ui-dialog$': path.resolve(import.meta.dirname, '../ui-dialog/src/'),
  '@instructure/ui-docs-client$': path.resolve(
    import.meta.dirname,
    '../ui-docs-client/src/'
  ),
  '@instructure/ui-drawer-layout$': path.resolve(
    import.meta.dirname,
    '../ui-drawer-layout/src/exports/a'
  ),
  '@instructure/ui-drilldown$': path.resolve(
    import.meta.dirname,
    '../ui-drilldown/src/exports/a'
  ),
  '@instructure/ui-editable$': path.resolve(import.meta.dirname, '../ui-editable/src/exports/a'),
  '@instructure/ui-expandable$': path.resolve(
    import.meta.dirname,
    '../ui-expandable/src/'
  ),
  '@instructure/ui-flex$': path.resolve(import.meta.dirname, '../ui-flex/src/exports/a'),
  '@instructure/ui-focusable$': path.resolve(
    import.meta.dirname,
    '../ui-focusable/src/'
  ),
  '@instructure/ui-a11y-utils$': path.resolve(
    import.meta.dirname,
    '../ui-a11y-utils/src/'
  ),
  '@instructure/ui-form-field$': path.resolve(
    import.meta.dirname,
    '../ui-form-field/src/exports/a'
  ),
  '@instructure/ui-grid$': path.resolve(import.meta.dirname, '../ui-grid/src/exports/a'),
  '@instructure/ui-i18n$': path.resolve(import.meta.dirname, '../ui-i18n/src/'),
  '@instructure/ui-icons$': path.resolve(import.meta.dirname, '../ui-icons/src/'),
  '@instructure/ui-img$': path.resolve(import.meta.dirname, '../ui-img/src/exports/a'),
  '@instructure/ui-instructure$': path.resolve(import.meta.dirname, '../ui-instructure/src/exports/a'),
  '@instructure/ui-link$': path.resolve(import.meta.dirname, '../ui-link/src/exports/a'),
  '@instructure/ui-list$': path.resolve(import.meta.dirname, '../ui-list/src/exports/a'),
  '@instructure/ui-menu$': path.resolve(import.meta.dirname, '../ui-menu/src/exports/a'),
  '@instructure/ui-metric$': path.resolve(import.meta.dirname, '../ui-metric/src/exports/a'),
  '@instructure/ui-modal$': path.resolve(import.meta.dirname, '../ui-modal/src/exports/a'),
  '@instructure/ui-motion$': path.resolve(import.meta.dirname, '../ui-motion/src/'),
  '@instructure/ui-navigation$': path.resolve(
    import.meta.dirname,
    '../ui-navigation/src/exports/a'
  ),
  '@instructure/ui-number-input$': path.resolve(
    import.meta.dirname,
    '../ui-number-input/src/exports/a'
  ),
  '@instructure/ui-text-area$': path.resolve(
    import.meta.dirname,
    '../ui-text-area/src/exports/a'
  ),
  '@instructure/ui-text-input$': path.resolve(
    import.meta.dirname,
    '../ui-text-input/src/exports/a'
  ),
  '@instructure/ui-options$': path.resolve(import.meta.dirname, '../ui-options/src/'),
  '@instructure/ui-overlays$': path.resolve(import.meta.dirname, '../ui-overlays/src/exports/a'),
  '@instructure/ui-pagination$': path.resolve(
    import.meta.dirname,
    '../ui-pagination/src/exports/a'
  ),
  '@instructure/ui-pages$': path.resolve(import.meta.dirname, '../ui-pages/src/exports/a'),
  '@instructure/ui-pill$': path.resolve(import.meta.dirname, '../ui-pill/src/exports/a/'),
  '@instructure/ui-popover$': path.resolve(import.meta.dirname, '../ui-popover/src/exports/a'),
  '@instructure/ui-position$': path.resolve(import.meta.dirname, '../ui-position/src/'),
  '@instructure/ui-portal$': path.resolve(import.meta.dirname, '../ui-portal/src/'),
  '@instructure/ui-progress$': path.resolve(import.meta.dirname, '../ui-progress/src/exports/a'),
  '@instructure/ui-radio-input$': path.resolve(
    import.meta.dirname,
    '../ui-radio-input/src/exports/a'
  ),
  '@instructure/ui-range-input$': path.resolve(
    import.meta.dirname,
    '../ui-range-input/src/exports/a'
  ),
  '@instructure/ui-rating$': path.resolve(import.meta.dirname, '../ui-rating/src/exports/a'),
  '@instructure/ui-responsive$': path.resolve(
    import.meta.dirname,
    '../ui-responsive/src/exports/a'
  ),
  '@instructure/ui-select$': path.resolve(import.meta.dirname, '../ui-select/src/exports/a'),
  '@instructure/ui-selectable$': path.resolve(
    import.meta.dirname,
    '../ui-selectable/src/'
  ),
  '@instructure/ui-side-nav-bar$': path.resolve(
    import.meta.dirname,
    '../ui-side-nav-bar/src/exports/a'
  ),
  '@instructure/ui-simple-select$': path.resolve(
    import.meta.dirname,
    '../ui-simple-select/src/exports/a'
  ),
  '@instructure/ui-source-code-editor$': path.resolve(
    import.meta.dirname,
    '../ui-source-code-editor/src/exports/a/'
  ),
  '@instructure/ui-spinner$': path.resolve(import.meta.dirname, '../ui-spinner/src/exports/a'),
  '@instructure/ui-svg-images$': path.resolve(
    import.meta.dirname,
    '../ui-svg-images/src/'
  ),
  '@instructure/ui-table$': path.resolve(import.meta.dirname, '../ui-table/src//exports/a'),
  '@instructure/ui-tabs$': path.resolve(import.meta.dirname, '../ui-tabs/src/exports/a'),
  '@instructure/ui-tag$': path.resolve(import.meta.dirname, '../ui-tag/src/exports/a'),
  '@instructure/ui-text$': path.resolve(import.meta.dirname, '../ui-text/src/exports/a'),
  '@instructure/ui-time-select$': path.resolve(
    import.meta.dirname,
    '../ui-time-select/src/exports/a'
  ),
  '@instructure/ui-toggle-details$': path.resolve(
    import.meta.dirname,
    '../ui-toggle-details/src/exports/a'
  ),
  '@instructure/ui-tooltip$': path.resolve(import.meta.dirname, '../ui-tooltip/src/exports/a'),
  '@instructure/ui-top-nav-bar$': path.resolve(
    import.meta.dirname,
    '../ui-top-nav-bar/src/exports/a'
  ),
  '@instructure/ui-tray$': path.resolve(import.meta.dirname, '../ui-tray/src/exports/a'),
  '@instructure/ui-tree-browser$': path.resolve(
    import.meta.dirname,
    '../ui-tree-browser/src/exports/a'
  ),
  '@instructure/ui-truncate-list$': path.resolve(
    import.meta.dirname,
    '../ui-truncate-list/src'
  ),
  '@instructure/ui-truncate-text$': path.resolve(
    import.meta.dirname,
    '../ui-truncate-text/src/exports/a'
  ),
  '@instructure/ui-utils$': path.resolve(import.meta.dirname, '../ui-utils/src/'),
  '@instructure/ui-view$': path.resolve(import.meta.dirname, '../ui-view/src/exports/a'),
  '@instructure/canvas-theme$': path.resolve(
    import.meta.dirname,
    '../canvas-theme/src/'
  ),
  '@instructure/canvas-high-contrast-theme$': path.resolve(
    import.meta.dirname,
    '../canvas-high-contrast-theme/src/'
  ),
  '@instructure/ui-react-utils$': path.resolve(
    import.meta.dirname,
    '../ui-react-utils/src/'
  ),
  '@instructure/ui-dom-utils$': path.resolve(
    import.meta.dirname,
    '../ui-dom-utils/src/'
  ),
  '@instructure/ui-color-utils$': path.resolve(
    import.meta.dirname,
    '../ui-color-utils/src/'
  ),
  '@instructure/ui-file-drop$': path.resolve(
    import.meta.dirname,
    '../ui-file-drop/src/exports/a'
  ),
  '@instructure/ui-heading$': path.resolve(import.meta.dirname, '../ui-heading/src/exports/a'),
  '@instructure/emotion$': path.resolve(import.meta.dirname, '../emotion/src/')
}

export default { alias }
