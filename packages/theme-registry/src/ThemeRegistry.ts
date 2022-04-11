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

import { error } from '@instructure/console'
import {
  BaseTheme,
  BaseThemeVariables,
  DeepPartial
} from '@instructure/shared-types'
import { mergeDeep } from '@instructure/ui-utils'

declare global {
  // eslint-disable-next-line no-var
  var GLOBAL_THEME_REGISTRY: Registry<Theme>
}
/**
 * ---
 * category: utilities/themes
 * ---
 * A global theme registry
 * @module ThemeRegistry
 */

const DEFAULT_THEME_KEY = '@@themeRegistryDefaultTheme'
const GLOBAL_THEME_REGISTRY = 'GLOBAL_THEME_REGISTRY'

// initialize the registry:
if (globalThis[GLOBAL_THEME_REGISTRY]) {
  error(
    false,
    `[theme-registry] A theme registry has already been initialized. Ensure that you are importing only one copy of '@instructure/theme-registry'.`
  )
  // initialize the registry using whatever has been previously defined:

  setRegistry(validateRegistry(globalThis[GLOBAL_THEME_REGISTRY]))
} else {
  // initialize the registry to the default/empty state:
  clearRegistry()
}

type Registry<T extends Theme> = {
  currentThemeKey: string | null
  themes: Record<string, T>
  registered: Array<T['key']>
}
function makeRegistry(): Registry<Theme> {
  const registry = {
    currentThemeKey: null,
    themes: {},
    registered: [] // the theme keys in the order they are registered,
  }

  return registry
}
function validateRegistry(registry: Registry<Theme<BaseTheme>>) {
  const defaultRegistry = makeRegistry()

  if (typeof registry === 'undefined') {
    return defaultRegistry
  }

  let valid = true

  Object.keys(defaultRegistry).forEach((key) => {
    if (
      typeof registry[key as keyof Registry<Theme<BaseTheme>>] === 'undefined'
    ) {
      valid = false
    }
  })

  error(valid, '[theme-registry] Invalid global theme registry!')

  return registry
}

/**
 * Get the global theme registry
 * @return The theme registry
 */
function getRegistry(): Registry<Theme> {
  return globalThis[GLOBAL_THEME_REGISTRY]
}

/**
 * Set the global theme registry
 */
function setRegistry(registry: Registry<Theme>) {
  globalThis[GLOBAL_THEME_REGISTRY] = registry
}

/**
 * Clear/reset the global theme registry
 */
function clearRegistry() {
  setRegistry(makeRegistry())
}

/**
 * Get the default theme
 * @return the default theme
 */
function getCurrentTheme(): Theme | undefined {
  const registry = getRegistry()
  const { currentThemeKey } = registry

  if (currentThemeKey) {
    return registry.themes[currentThemeKey]
  }

  return undefined
}

/**
 * Get the default theme key
 * @param {String} the default theme key
 * @param {Object} overrides for the theme variables
 */
function setDefaultTheme(
  themeKey: string,
  overrides: DeepPartial<BaseThemeVariables>
) {
  const registry = getRegistry()
  const theme = registry.themes[themeKey]

  if (!theme) {
    if (themeKey !== DEFAULT_THEME_KEY) {
      error(
        theme,
        `[theme-registry] Could not find theme: '${themeKey}' in the registry.`
      )
    }
  }

  registry.currentThemeKey = themeKey
  const themeWithOverrides = mergeDeep(theme, overrides) as Theme<BaseTheme>
  registry.themes[themeKey] = themeWithOverrides

  return themeWithOverrides
}

type Theme<T extends BaseTheme = BaseTheme> = T & {
  use(arg?: { overrides: DeepPartial<BaseThemeVariables> }): void
  variables: BaseThemeVariables
}
/**
 * Wraps a theme and provides a method to set as default
 */
function makeTheme<T extends BaseTheme>(theme: T): Theme<T> {
  const { key, description, ...rest } = theme
  const wrappedTheme = {
    key,
    description,
    ...rest,
    use(arg?: { overrides: DeepPartial<BaseThemeVariables> }): void {
      setDefaultTheme(key, arg?.overrides || {})
    }
  }

  return new Proxy(wrappedTheme, {
    get(target, property) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { key, description, use, ...variables } = target
      // this is needed for backwards compatible reasons,
      // themes used to have a 'variables' property on it that we deleted in v8 but is actually needed for canvas
      if (property === 'variables') {
        return variables as BaseThemeVariables
      }
      // eslint-disable-next-line prefer-rest-params
      return Reflect.get(target, property)
    }
  }) as Theme<T>
}

function registerTheme<T extends BaseTheme>(theme: T): Theme<T> {
  const registry = getRegistry()

  if (theme.key && registry.themes[theme.key]) {
    return registry.themes[theme.key] as Theme<T>
  } else {
    const registeredTheme = makeTheme(theme)
    registry.themes[registeredTheme.key] = registeredTheme
    registry.registered.push(registeredTheme.key)

    return registeredTheme
  }
}

const ThemeRegistry = {
  getRegistry,
  clearRegistry,
  setRegistry,
  registerTheme,
  getCurrentTheme
}

export default ThemeRegistry
export {
  ThemeRegistry,
  getRegistry,
  clearRegistry,
  setRegistry,
  getCurrentTheme,
  registerTheme
}
