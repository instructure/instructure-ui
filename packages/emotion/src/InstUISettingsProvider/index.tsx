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

import React, { useContext } from 'react'
import { TextDirectionContext } from '@instructure/ui-i18n'
import { ThemeProvider } from '@emotion/react'
import { ThemeOrOverride } from '../EmotionTypes'
import { getTheme } from '../EmotionThemeProvider'
import { DeterministicIdContextProvider } from '@instructure/ui-react-utils'
import type { DeterministicIdProviderValue } from '@instructure/ui-react-utils'

type InstUIProviderProps = {
  theme?: ThemeOrOverride
  dir?: 'ltr' | 'rtl' // TODO allow "auto" too
  instanceMapCounter?: DeterministicIdProviderValue
}

/**
 * @typedef InstUISettingsProviderSettings
 * @type {object}
 * @property {string} theme - A full theme or an override object
 * @property {string} dir - The text direction to use in the descendants. If not
 * given it uses the following in this priority order:
 *   - The value given in a parent `TextDirectionContext`
 *   - The `dir` prop of `document.documentElement` or its `direction` CSS prop
 *   - `ltr`
 * @property {Map<string, number>} instanceMapCounter - a Map to keep track of instances
 */

/**
 * ---
 * category: components/utilities
 * ---
 *
 * Wrapper for emotion js's [ThemeProvider](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype).
 *
 * Applies the given theme. It handles either a full theme, or an overrides object.
 * You can also specify the requested text direction for its descendants.
 *
 * It accepts the following props:
 * - theme - A full theme or an override object.
 * - dir - The text direction to use in the descendants. If not
 * given it uses the following in this priority order:
 *   - The value given in a parent `TextDirectionContext`
 *   - The `dir` prop of `document.documentElement` or its `direction` CSS prop
 *   - `ltr`
 * - instanceMapCounter - A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * which keeps track of specific InstUI components. (generally this is used for deterministic id generation for [SSR](https://instructure.design/#server-side-rendering))
 *
 * ```js
 *
 * import { canvas, instructure } from '@instructure/ui-themes'
 * import { InstUISettingsProvider } from '@instructure/emotion'
 *
 * <InstUISettingsProvider theme={canvas}>
 *   <div>Canvas themed part</div>
 *
 *   <InstUISettingsProvider
 *     theme={{
 *       themeOverrides: {
 *         canvas: {
 *           colors: {
 *             backgroundLightest: '#fefefe'
 *           },
 *           borders: {
 *             style: 'dashed'
 *           }
 *         }
 *       }
 *     }}
 *   >
 *     <div>Canvas with new 'backgroundLightest'</div>
 *   </InstUISettingsProvider>
 *
 *   <InstUISettingsProvider theme={instructure} dir="rtl">
 *     <div>Instructure themed part with RTL text</div>
 *   </InstUISettingsProvider>
 * </InstUISettingsProvider>
 * ```
 *
 * @module InstUISettingsProvider
 *
 * @param {InstUISettingsProviderSettings} settings - A settings object
 * @returns {ReactElement} The settings provider
 */
function InstUISettingsProvider({
  children,
  theme = {},
  dir,
  instanceMapCounter
}: React.PropsWithChildren<InstUIProviderProps>) {
  const finalDir = dir || useContext(TextDirectionContext)

  if (process.env.NODE_ENV !== 'production' && finalDir === 'auto') {
    console.warn(
      "'auto' is not an supported value for the 'dir' prop. Please pass 'ltr' or 'rtl'"
    )
  }

  return (
    <DeterministicIdContextProvider instanceMapCounter={instanceMapCounter!}>
      <ThemeProvider theme={getTheme(theme)}>
        <TextDirectionContext.Provider value={finalDir}>
          {children}
        </TextDirectionContext.Provider>
      </ThemeProvider>
    </DeterministicIdContextProvider>
  )
}

InstUISettingsProvider.defaultProps = {
  theme: {},
  dir: undefined,
  instanceMapCounter: undefined
}
export default InstUISettingsProvider
export { InstUISettingsProvider }
