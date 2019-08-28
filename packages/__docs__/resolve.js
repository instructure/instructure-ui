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

const path = require('path')

module.exports = {
  alias: {
    // set up aliases to get webpack to rebuild when we make changes to these packages
    '@instructure/ui-a11y$': path.resolve(__dirname, '../ui-a11y/src/'),
    '@instructure/ui-alerts$': path.resolve(__dirname, '../ui-alerts/src/'),
    '@instructure/ui-avatar$': path.resolve(__dirname, '../ui-avatar/src/'),
    '@instructure/ui-billboard$': path.resolve(__dirname, '../ui-billboard/src/'),
    '@instructure/ui-breadcrumb$': path.resolve(__dirname, '../ui-breadcrumb/src/'),
    '@instructure/ui-buttons$': path.resolve(__dirname, '../ui-buttons/src/'),
    '@instructure/ui-calendar$': path.resolve(__dirname, '../ui-calendar/src/'),
    '@instructure/ui-code-editor$': path.resolve(__dirname, '../ui-code-editor/src/'),
    '@instructure/ui-date-input$': path.resolve(__dirname, '../ui-date-input/src/'),
    '@instructure/ui-docs-client$': path.resolve(__dirname, '../ui-docs-client/src/'),
    '@instructure/ui-editable$': path.resolve(__dirname, '../ui-editable/src/'),
    '@instructure/ui-elements$': path.resolve(__dirname, '../ui-elements/src/'),
    '@instructure/ui-focusable$': path.resolve(__dirname, '../ui-focusable/src/'),
    '@instructure/ui-forms$': path.resolve(__dirname, '../ui-forms/src/'),
    '@instructure/ui-form-field$': path.resolve(__dirname, '../ui-form-field/src/'),
    '@instructure/ui-i18n$': path.resolve(__dirname, '../ui-i18n/src/'),
    '@instructure/ui-img$': path.resolve(__dirname, '../ui-img/src/'),
    '@instructure/ui-layout$': path.resolve(__dirname, '../ui-layout/src/'),
    '@instructure/ui-menu$': path.resolve(__dirname, '../ui-menu/src/'),
    '@instructure/ui-motion$': path.resolve(__dirname, '../ui-motion/src/'),
    '@instructure/ui-navigation$': path.resolve(__dirname, '../ui-navigation/src/'),
    '@instructure/ui-number-input$': path.resolve(__dirname, '../ui-number-input/src/'),
    '@instructure/ui-text-input$': path.resolve(__dirname, '../ui-text-input/src/'),
    '@instructure/ui-options$': path.resolve(__dirname, '../ui-options/src/'),
    '@instructure/ui-overlays$': path.resolve(__dirname, '../ui-overlays/src/'),
    '@instructure/ui-pagination$': path.resolve(__dirname, '../ui-pagination/src/'),
    '@instructure/ui-pages$': path.resolve(__dirname, '../ui-pages/src/'),
    '@instructure/ui-portal$': path.resolve(__dirname, '../ui-portal/src/'),
    '@instructure/ui-select$': path.resolve(__dirname, '../ui-select/src/'),
    '@instructure/ui-selectable$': path.resolve(__dirname, '../ui-selectable/src/'),
    '@instructure/ui-svg-images$': path.resolve(__dirname, '../ui-svg-images/src/'),
    '@instructure/ui-table$': path.resolve(__dirname, '../ui-table/src/'),
    '@instructure/ui-tabs$': path.resolve(__dirname, '../ui-tabs/src/'),
    '@instructure/ui-text$': path.resolve(__dirname, '../ui-text/src/'),
    '@instructure/ui-toggle-details$': path.resolve(__dirname, '../ui-toggle-details/src/'),
    '@instructure/ui-tree-browser$': path.resolve(__dirname, '../ui-tree-browser/src/'),
    '@instructure/ui-utils$': path.resolve(__dirname, '../ui-utils/src/'),
    '@instructure/ui-view$': path.resolve(__dirname, '../ui-view/src'),
    '@instructure/canvas-theme$': path.resolve(__dirname, '../canvas-theme/src/'),
    '@instructure/canvas-high-contrast-theme$': path.resolve(__dirname, '../canvas-high-contrast-theme/src/'),
    '@instructure/ui-themeable$': path.resolve(__dirname, '../ui-themeable/src/'),
    '@instructure/ui-react-utils$': path.resolve(__dirname, '../ui-react-utils/src/'),
    '@instructure/ui-dom-utils$': path.resolve(__dirname, '../ui-dom-utils/src/'),
    '@instructure/ui-color-utils$': path.resolve(__dirname, '../ui-color-utils/src/')
  }
}
