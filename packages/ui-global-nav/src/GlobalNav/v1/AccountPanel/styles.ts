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

import type { NewComponentTypes } from '@instructure/ui-themes'
import type { AccountPanelStyle } from './props.js'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['SubNav']>
): AccountPanelStyle => {
  return {
    panel: {
      label: 'accountPanel',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme.gap,
      minHeight: '100%'
    },
    card: {
      label: 'accountPanel__card',
      display: 'flex',
      flexDirection: 'column'
    },
    cardHeader: {
      label: 'accountPanel__cardHeader',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBlockEnd: componentTheme.gap
    },
    cardBody: {
      label: 'accountPanel__cardBody',
      display: 'flex',
      alignItems: 'center',
      gap: componentTheme.gap
    },
    cardText: {
      label: 'accountPanel__cardText',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minWidth: 0
    },
    option: {
      label: 'accountPanel__option',
      display: 'flex',
      alignItems: 'center',
      gap: componentTheme.gap
    },
    divider: {
      label: 'accountPanel__divider',
      // SubNav has no divider width token
      borderTop: `0.0625rem solid ${componentTheme.strokeColor}`
    },
    items: {
      label: 'accountPanel__items',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme.navItemsGap,
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    footer: {
      label: 'accountPanel__footer',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme.gap,
      // pushes the toggles and log out to the end of the panel
      marginBlockStart: 'auto'
    },
    toggles: {
      label: 'accountPanel__toggles',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme.gap
    },
    togglesTitle: {
      label: 'accountPanel__togglesTitle',
      margin: 0
    },
    toggleLabel: {
      label: 'accountPanel__toggleLabel',
      display: 'flex',
      alignItems: 'center',
      gap: componentTheme.gap
    }
  }
}

export default generateStyle
