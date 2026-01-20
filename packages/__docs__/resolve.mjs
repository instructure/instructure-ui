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
  '@instructure/ui-alerts$': path.resolve(import.meta.dirname, '../ui-alerts/src/'),
  '@instructure/ui-avatar$': path.resolve(import.meta.dirname, '../ui-avatar/src/'),
  '@instructure/ui-badge$': path.resolve(import.meta.dirname, '../ui-badge/src/'),
  '@instructure/ui-billboard$': path.resolve(
    import.meta.dirname,
    '../ui-billboard/src/'
  ),
  '@instructure/ui-breadcrumb$': path.resolve(
    import.meta.dirname,
    '../ui-breadcrumb/src/'
  ),
  '@instructure/ui-buttons$': path.resolve(import.meta.dirname, '../ui-buttons/src/'),
  '@instructure/ui-byline$': path.resolve(import.meta.dirname, '../ui-byline/src/'),
  '@instructure/ui-calendar$': path.resolve(import.meta.dirname, '../ui-calendar/src/'),
  '@instructure/ui-checkbox$': path.resolve(import.meta.dirname, '../ui-checkbox/src/'),
  '@instructure/ui-color-picker$': path.resolve(
    import.meta.dirname,
    '../ui-color-picker/src/'
  ),
  '@instructure/ui-date-input$': path.resolve(
    import.meta.dirname,
    '../ui-date-input/src/'
  ),
  '@instructure/ui-date-time-input$': path.resolve(
    import.meta.dirname,
    '../ui-date-time-input/src/'
  ),
  '@instructure/ui-decorator$': path.resolve(import.meta.dirname, '../ui-decorator/src/'),
  '@instructure/ui-dialog$': path.resolve(import.meta.dirname, '../ui-dialog/src/'),
  '@instructure/ui-docs-client$': path.resolve(
    import.meta.dirname,
    '../ui-docs-client/src/'
  ),
  '@instructure/ui-drawer-layout$': path.resolve(
    import.meta.dirname,
    '../ui-drawer-layout/src/'
  ),
  '@instructure/ui-drilldown$': path.resolve(
    import.meta.dirname,
    '../ui-drilldown/src/'
  ),
  '@instructure/ui-editable$': path.resolve(import.meta.dirname, '../ui-editable/src/'),
  '@instructure/ui-expandable$': path.resolve(
    import.meta.dirname,
    '../ui-expandable/src/'
  ),
  '@instructure/ui-flex$': path.resolve(import.meta.dirname, '../ui-flex/src'),
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
    '../ui-form-field/src/'
  ),
  '@instructure/ui-grid$': path.resolve(import.meta.dirname, '../ui-grid/src/'),
  '@instructure/ui-i18n$': path.resolve(import.meta.dirname, '../ui-i18n/src/'),
  '@instructure/ui-icons$': path.resolve(import.meta.dirname, '../ui-icons/src/'),
  '@instructure/ui-img$': path.resolve(import.meta.dirname, '../ui-img/src/'),
  '@instructure/ui-instructure$': path.resolve(import.meta.dirname, '../ui-instructure/src/'),
  '@instructure/ui-link$': path.resolve(import.meta.dirname, '../ui-link/src/'),
  '@instructure/ui-list$': path.resolve(import.meta.dirname, '../ui-list/src/'),
  '@instructure/ui-menu$': path.resolve(import.meta.dirname, '../ui-menu/src/'),
  '@instructure/ui-metric$': path.resolve(import.meta.dirname, '../ui-metric/src/'),
  '@instructure/ui-modal$': path.resolve(import.meta.dirname, '../ui-modal/src/'),
  '@instructure/ui-motion$': path.resolve(import.meta.dirname, '../ui-motion/src/'),
  '@instructure/ui-navigation$': path.resolve(
    import.meta.dirname,
    '../ui-navigation/src/'
  ),
  '@instructure/ui-number-input$': path.resolve(
    import.meta.dirname,
    '../ui-number-input/src/'
  ),
  '@instructure/ui-text-area$': path.resolve(
    import.meta.dirname,
    '../ui-text-area/src/'
  ),
  '@instructure/ui-text-input$': path.resolve(
    import.meta.dirname,
    '../ui-text-input/src/'
  ),
  '@instructure/ui-options$': path.resolve(import.meta.dirname, '../ui-options/src/'),
  '@instructure/ui-overlays$': path.resolve(import.meta.dirname, '../ui-overlays/src/'),
  '@instructure/ui-pagination$': path.resolve(
    import.meta.dirname,
    '../ui-pagination/src/'
  ),
  '@instructure/ui-pages$': path.resolve(import.meta.dirname, '../ui-pages/src/'),
  '@instructure/ui-pill$': path.resolve(import.meta.dirname, '../ui-pill/src/'),
  '@instructure/ui-popover$': path.resolve(import.meta.dirname, '../ui-popover/src/'),
  '@instructure/ui-position$': path.resolve(import.meta.dirname, '../ui-position/src/'),
  '@instructure/ui-portal$': path.resolve(import.meta.dirname, '../ui-portal/src/'),
  '@instructure/ui-progress$': path.resolve(import.meta.dirname, '../ui-progress/src'),
  '@instructure/ui-radio-input$': path.resolve(
    import.meta.dirname,
    '../ui-radio-input/src/'
  ),
  '@instructure/ui-range-input$': path.resolve(
    import.meta.dirname,
    '../ui-range-input/src/'
  ),
  '@instructure/ui-rating$': path.resolve(import.meta.dirname, '../ui-rating/src/'),
  '@instructure/ui-responsive$': path.resolve(
    import.meta.dirname,
    '../ui-responsive/src/'
  ),
  '@instructure/ui-select$': path.resolve(import.meta.dirname, '../ui-select/src/'),
  '@instructure/ui-selectable$': path.resolve(
    import.meta.dirname,
    '../ui-selectable/src/'
  ),
  '@instructure/ui-side-nav-bar$': path.resolve(
    import.meta.dirname,
    '../ui-side-nav-bar/src/'
  ),
  '@instructure/ui-simple-select$': path.resolve(
    import.meta.dirname,
    '../ui-simple-select/src/'
  ),
  '@instructure/ui-source-code-editor$': path.resolve(
    import.meta.dirname,
    '../ui-source-code-editor/src/'
  ),
  '@instructure/ui-spinner$': path.resolve(import.meta.dirname, '../ui-spinner/src/'),
  '@instructure/ui-svg-images$': path.resolve(
    import.meta.dirname,
    '../ui-svg-images/src/'
  ),
  '@instructure/ui-table$': path.resolve(import.meta.dirname, '../ui-table/src/'),
  '@instructure/ui-tabs$': path.resolve(import.meta.dirname, '../ui-tabs/src/'),
  '@instructure/ui-tag$': path.resolve(import.meta.dirname, '../ui-tag/src/'),
  '@instructure/ui-text$': path.resolve(import.meta.dirname, '../ui-text/src/'),
  '@instructure/ui-time-select$': path.resolve(
    import.meta.dirname,
    '../ui-time-select/src/'
  ),
  '@instructure/ui-toggle-details$': path.resolve(
    import.meta.dirname,
    '../ui-toggle-details/src/'
  ),
  '@instructure/ui-tooltip$': path.resolve(import.meta.dirname, '../ui-tooltip/src/'),
  '@instructure/ui-top-nav-bar$': path.resolve(
    import.meta.dirname,
    '../ui-top-nav-bar/src/'
  ),
  '@instructure/ui-tray$': path.resolve(import.meta.dirname, '../ui-tray/src/'),
  '@instructure/ui-tree-browser$': path.resolve(
    import.meta.dirname,
    '../ui-tree-browser/src/'
  ),
  '@instructure/ui-truncate-list$': path.resolve(
    import.meta.dirname,
    '../ui-truncate-list/src/'
  ),
  '@instructure/ui-truncate-text$': path.resolve(
    import.meta.dirname,
    '../ui-truncate-text/src/'
  ),
  '@instructure/ui-utils$': path.resolve(import.meta.dirname, '../ui-utils/src/'),
  '@instructure/ui-view$': path.resolve(import.meta.dirname, '../ui-view/src/'),
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
    '../ui-file-drop/src/'
  ),
  '@instructure/ui-heading$': path.resolve(import.meta.dirname, '../ui-heading/src/'),
  '@instructure/emotion$': path.resolve(import.meta.dirname, '../emotion/src/')
}

export default { alias }
