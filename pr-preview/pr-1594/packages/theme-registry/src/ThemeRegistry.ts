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

/**
 * ---
 * category: utilities/themes
 * ---
 * A global theme registry used for registering theme objects, setting globally available themes
 * and receiving the currently used theme.
 * @module ThemeRegistry
 */

import { error } from '@instructure/console'
import { mergeDeep } from '@instructure/ui-utils'
import { isBaseTheme } from '@instructure/ui-utils'
import type {
  BaseTheme,
  BaseThemeVariables,
  DeepPartial
} from '@instructure/shared-types'

declare global {
  // eslint-disable-next-line no-var
  var __GLOBAL_THEME_REGISTRY__: Registry<RegisteredTheme>
}

type Registry<T extends RegisteredTheme> = {
  currentThemeKey: string | null
  themes: Record<string, T>
  registered: Array<T['key']>
}

type RegisteredTheme<T extends BaseTheme = BaseTheme> = T & {
  use(arg?: { overrides: DeepPartial<BaseThemeVariables> }): void
  variables: BaseThemeVariables
}

const DEFAULT_THEME_KEY = '@@themeRegistryDefaultTheme'
const GLOBAL_THEME_REGISTRY = '__GLOBAL_THEME_REGISTRY__'

// initialize the registry:
if (globalThis[GLOBAL_THEME_REGISTRY]) {
  // initialize the registry using whatever has been previously defined:
  setRegistry(validateRegistry(globalThis[GLOBAL_THEME_REGISTRY]))
} else {
  // initialize the registry to the default/empty state:
  clearRegistry()
}

/**
 * Creates and returns a new empty registry.
 * @returns {Registry} the empty registry object
 * @module makeRegistry
 * @private
 */
function makeRegistry(): Registry<RegisteredTheme> {
  const registry = {
    currentThemeKey: null,
    themes: {},
    registered: [] // the theme keys in the order they are registered,
  }

  return registry
}

/**
 * Validates the passed registry, if the passed registry is undefined, then it will create an empty registry.
 * @param registry - the registry to validate
 * @returns {Registry} the registry
 * @private
 */
function validateRegistry(registry: Registry<RegisteredTheme<BaseTheme>>) {
  const defaultRegistry = makeRegistry()

  if (typeof registry === 'undefined') {
    return defaultRegistry
  }

  let valid = true

  Object.keys(defaultRegistry).forEach((key) => {
    if (
      typeof registry[key as keyof Registry<RegisteredTheme<BaseTheme>>] ===
      'undefined'
    ) {
      valid = false
    }
  })

  error(valid, '[theme-registry] Invalid global theme registry!')

  return registry
}

/**
 * Get the global theme registry.
 * @return {Registry}  the theme registry
 * @module getRegistry
 */
function getRegistry(): Registry<RegisteredTheme> {
  return globalThis[GLOBAL_THEME_REGISTRY]
}

/**
 * Set the global theme registry.
 * @param {Registry} registry - the registry to set/replace the current registry with.
 * @returns {void}
 * @module setRegistry
 */
function setRegistry(registry: Registry<RegisteredTheme>): void {
  globalThis[GLOBAL_THEME_REGISTRY] = registry
}

/**
 * Clear/reset the global theme registry.
 * @module clearRegistry
 * @returns {void}
 */
function clearRegistry(): void {
  setRegistry(makeRegistry())
}

/**
 * Get the activated theme object.
 * @return {RegisteredTheme} the default theme object
 * @module getCurrentTheme
 */
function getCurrentTheme(): RegisteredTheme | undefined {
  const registry = getRegistry()
  const { currentThemeKey } = registry

  if (currentThemeKey) {
    return registry.themes[currentThemeKey]
  }

  return undefined
}

/**
 * Activate a theme by the given themeKey.
 * @param {String} themeKey - the default theme key
 * @param {DeepPartial<BaseThemeVariables>} overrides - the overrides for the theme variables
 * @returns {RegisteredTheme} the registered theme object
 * @module activateTheme
 * @private
 */
function activateTheme(
  themeKey: string,
  overrides: DeepPartial<BaseThemeVariables>
): RegisteredTheme {
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
  const themeWithOverrides = mergeDeep(
    theme,
    overrides
  ) as RegisteredTheme<BaseTheme>
  registry.themes[themeKey] = themeWithOverrides

  return themeWithOverrides
}
/**
 * Wraps a theme and provides a method to activate the theme.
 * @returns the wrapped theme object
 * @module makeTheme
 * @private
 */
function makeTheme<T extends BaseTheme>(theme: T): RegisteredTheme<T> {
  const { key, description, ...rest } = theme
  const wrappedTheme = {
    key,
    description,
    ...rest,
    use(arg?: { overrides: DeepPartial<BaseThemeVariables> }): void {
      activateTheme(key, arg?.overrides || {})
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
  }) as RegisteredTheme<T>
}

/**
 * Registers the passed theme into the ThemeRegistry.
 * @param {BaseTheme} theme - the theme object to register into the ThemeRegistry
 * @returns {RegisteredTheme} If the given theme is already in the ThemeRegistry then simply return that theme.
 * Otherwise returns the theme with a wrapper around it, so it can be `.use()`-ed to activate the given theme from the registry.
 * @module registerTheme
 */
function registerTheme<T extends BaseTheme>(theme: T): RegisteredTheme<T> {
  const registry = getRegistry()

  if (theme.key && registry.themes[theme.key]) {
    return registry.themes[theme.key] as RegisteredTheme<T>
  } else {
    if (!isBaseTheme(theme)) {
      error(
        false,
        "[theme-registry] The theme provided to 'registerTheme' is not a valid theme object!\nFor it to be valid some properties have to be present, check out https://instructure.design/#canvas as a reference."
      )
      throw new Error()
    }
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
export type { RegisteredTheme as Theme, Registry }
