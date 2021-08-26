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

import type {
  ThemeOrOverride,
  Overrides,
  ComponentOverride
} from './EmotionTypes'
import type { ComponentTheme } from '@instructure/shared-types'
import type { WithStyleProps } from './withStyle'

type ComponentName = keyof ComponentOverride | undefined

/**
 * ---
 * private: true
 * ---
 * This is a utility function which calculates the correct component theme
 * based on every possible override there is.

 * @param {object} theme - Theme object
 * @param {*} displayName - Name of the component
 * @param {*} componentId - componentId of the component
 * @param {*} props - The component's props object
 * @returns {object} The calculated theme override object
 */
const getComponentThemeOverride = (
  theme: ThemeOrOverride,
  displayName: string,
  componentId?: string,
  props?: { [k: string]: unknown } & WithStyleProps
): ComponentTheme => {
  let componentOverride: ComponentTheme = {}
  const overrides = (theme as Overrides).componentOverrides
  const name = displayName as ComponentName
  const id = componentId as ComponentName

  if (overrides) {
    componentOverride = (name && overrides[name]) || (id && overrides[id]) || {}
  }

  return {
    ...componentOverride,
    ...(props?.themeOverride ?? {})
  }
}

export default getComponentThemeOverride
export { getComponentThemeOverride }
