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
 * A global theme registry
 * @module ThemeRegistry
 */
import { error, warn } from '@instructure/console/macro'
import { mergeDeep, isEmpty } from '@instructure/ui-utils'
import { StyleSheet } from '@instructure/ui-stylesheet'
import { uid } from '@instructure/uid'

import { getCssText } from './getCssText'
import { toRules } from './transformCss'

const DEFAULT_THEME_KEY = '@@themeableDefaultTheme'
const GLOBAL_THEME_REGISTRY = 'GLOBAL_THEME_REGISTRY'

// initialize the registry:
if (global[GLOBAL_THEME_REGISTRY]) {
  error(
    false,
    `[themeable] A theme registry has already been initialized. Ensure that you are importing only one copy of '@instructure/ui-themeable'.`
  )
  // initialize the registry using whatever has been previously defined:
  setRegistry(validateRegistry(global[GLOBAL_THEME_REGISTRY]))
} else {
  // initialize the registry to the default/empty state:
  clearRegistry()
}

function makeRegistry() {
  return {
    styleSheet: StyleSheet,
    defaultThemeKey: null,
    components: {
      [DEFAULT_THEME_KEY]: {}
    },
    themes: {},
    registered: [] // the theme keys in the order they are registered
  }
}

function validateRegistry(registry) {
  const defaultRegistry = makeRegistry()

  if (typeof registry === 'undefined') {
    return defaultRegistry
  }

  let valid = true

  Object.keys(defaultRegistry).forEach((key) => {
    if (typeof registry[key] === 'undefined') {
      valid = false
    }
  })

  error(valid, '[themeable] Invalid global theme registry!')

  return registry
}

/**
 * Get the global theme registry
 * @return {object} The theme registry
 */
function getRegistry() {
  return global[GLOBAL_THEME_REGISTRY]
}

/**
 * Set the global theme registry
 */
function setRegistry(registry) {
  global[GLOBAL_THEME_REGISTRY] = registry
}

/**
 * Clear/reset the global theme registry
 */
function clearRegistry() {
  setRegistry(makeRegistry())
}

/**
 * Get the default theme key
 * @return {String} the default theme key
 */
function getDefaultThemeKey() {
  const { defaultThemeKey, registered } = getRegistry()
  return (
    defaultThemeKey || registered[registered.length - 1] || DEFAULT_THEME_KEY
  )
}

/**
 * Get the default theme key
 * @param {String} the default theme key
 * @param {Object} overrides for the theme variables
 */
function setDefaultTheme(themeKey, overrides) {
  const registry = getRegistry()
  let theme = registry.themes[themeKey]

  if (!theme) {
    if (themeKey !== DEFAULT_THEME_KEY) {
      error(
        theme,
        `[themeable] Could not find theme: '${themeKey}' in the registry.`
      )
    }
    theme = {}
  }

  registry.defaultThemeKey = themeKey
  registry.overrides = overrides

  return theme
}

/**
 * Wraps a theme and provides a method to set as default and toggle between a11y and base
 *
 * @param {String} themeKey
 * @param {Object} options Provide the base theme and an optional accessible version
 */
function makeTheme({ key, variables, a11y, immutable, description }) {
  const themeKey = key || uid()
  return {
    key: themeKey,
    immutable,
    variables: { ...variables },
    description,
    use: function ({ accessible, overrides } = {}) {
      if (accessible) {
        warn(
          a11y && a11y.key,
          `[themeable] No accessible theme provided for ${themeKey}.`
        )
        if (a11y && a11y.key) {
          setDefaultTheme(a11y.key)
        }
      } else {
        setDefaultTheme(themeKey, overrides)
      }
    }
  }
}

function registerTheme(theme) {
  const registry = getRegistry()
  let registeredTheme

  if (theme.key && registry.themes[theme.key]) {
    registeredTheme = registry.themes[theme.key]
  } else {
    registeredTheme = makeTheme(theme)
    registry.themes[registeredTheme.key] = registeredTheme
    registry.registered.push(registeredTheme.key)
  }

  return registeredTheme
}

function getRegisteredTheme(themeKey, defaultTheme = {}) {
  if (!themeKey) return defaultTheme

  const theme = getRegistry().themes[themeKey]
  if (theme) {
    return theme
  } else {
    if (themeKey !== DEFAULT_THEME_KEY) {
      error(
        theme,
        `[themeable] Could not find theme: '${themeKey}' in the registry.`
      )
    }
    return defaultTheme
  }
}

function getVariablesWithOverrides(themeKey, overrides) {
  const theme = getRegisteredTheme(themeKey)
  const variables = theme.variables || {}
  const overridesIsEmpty = isEmpty(overrides)

  if (!overridesIsEmpty && theme.immutable) {
    warn(
      false,
      `[themeable] Theme, '${
        theme.key
      }', is immutable. Cannot apply overrides: ${JSON.stringify(overrides)}`
    )
    return variables
  }

  const variablesIsEmpty = isEmpty(variables)
  if (!variablesIsEmpty && !overridesIsEmpty)
    return mergeDeep(variables, overrides)
  if (variablesIsEmpty) return overrides || {}
  return variables
}

/**
 * Merge theme variables for 'themeKey' with the defaults (and overrides)
 * @private
 * @param {String} themeKey
 * @param {Object} variable Theme overrides
 * @return {Object} A merged variables object
 */
function mergeWithDefaultThemeVariables(themeKey, overrides) {
  let variables

  if (themeKey) {
    variables = getVariablesWithOverrides(themeKey, overrides)
  } else {
    // fall back to defaults, but still apply overrides
    const defaultOverrides = getRegistry().overrides
    const defaultOverridesIsEmpty = isEmpty(defaultOverrides)
    if (!defaultOverridesIsEmpty && !isEmpty(overrides)) {
      variables = mergeDeep(defaultOverrides, overrides)
    } else if (defaultOverridesIsEmpty) {
      variables = overrides
    } else {
      variables = defaultOverrides
    }
  }

  return getVariablesWithOverrides(getDefaultThemeKey(), variables)
}

/**
 * Wraps a component theme function to merge its return values with the return
 * values of the default function
 * @private
 * @param {Function} componentThemeFunction
 * @param {String} themeKey
 * @return {Object} A wrapped theme object
 */
function makeComponentTheme(componentThemeFunction, themeKey) {
  return function (variables) {
    let theme = {}

    if (typeof componentThemeFunction === 'function') {
      theme = componentThemeFunction(variables)
    }

    // so that the components for the themeKey can
    // just specify overrides we merge them with defaults here
    let defaultComponentTheme = {}

    if (typeof componentThemeFunction[themeKey] === 'function') {
      defaultComponentTheme = componentThemeFunction[themeKey](variables)
    }

    if (!isEmpty(defaultComponentTheme) && !isEmpty(theme)) {
      theme = { ...theme, ...defaultComponentTheme }
    } else if (isEmpty(theme)) {
      theme = defaultComponentTheme
    }

    return theme
  }
}

/**
 * Register a component theme function
 *
 * @param {String} key The theme key for the component (e.g., [Link.theme])
 * @param {Function} componentThemeFunction The function to use for preparing this component's theme
 */
function registerComponentTheme(componentKey, componentThemeFunction) {
  const { components } = getRegistry()

  if (typeof componentThemeFunction !== 'function') {
    return
  }

  components[DEFAULT_THEME_KEY][componentKey] = componentThemeFunction

  Object.keys(componentThemeFunction).forEach((themeKey) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!components.hasOwnProperty(themeKey)) {
      components[themeKey] = {}
    }

    components[themeKey][componentKey] = makeComponentTheme(
      componentThemeFunction,
      themeKey
    )
  })
}

function getRegisteredComponents(themeKey) {
  const { components } = getRegistry()
  const t = themeKey || getDefaultThemeKey()

  // fall back to the default component theme functions
  return {
    ...components[DEFAULT_THEME_KEY],
    ...components[t]
  }
}

function getRegisteredComponent(themeKey, componentKey) {
  const { components } = getRegistry()
  return (
    (components[themeKey] && components[themeKey][componentKey]) ||
    components[DEFAULT_THEME_KEY][componentKey]
  )
}

/**
 * Generate themes for all registered [@themeable](#themeable) components,
 * to be used by [`<ApplyTheme />`](#ApplyTheme).
 *
 * @param {String} themeKey The theme to use (for global theme variables across components)
 * @param {Object} overrides theme variable overrides (usually for user defined values)
 * @return {Object} A theme config to use with `<ApplyTheme />`
 */
function generateTheme(themeKey, overrides) {
  const registry = getRegistry()

  error(
    registry.registered.length > 0,
    '[themeable] No themes have been registered. ' +
      'Import a theme from @instructure/ui-themes or register a custom theme with registerTheme ' +
      '(see @instructure/ui-themeable).'
  )

  const components = getRegisteredComponents(themeKey)
  const theme = {}

  const variables = mergeWithDefaultThemeVariables(themeKey, overrides)

  if (isEmpty(variables)) {
    return
  }

  Object.getOwnPropertySymbols(components).forEach((componentKey) => {
    theme[componentKey] = components[componentKey](variables)
  })

  return theme
}

/**
 * Generate theme variables for a @themeable component.
 * If no themeKey is provided, the default theme will be generated.
 *
 * @param {Symbol} key The theme key for the component (e.g., [Link.theme])
 * @param {String} themeKey The theme to use to generate the variables (falls back to the default theme)
 * @param {Object} overrides overrides for component level theme variables (usually user defined)
 * @return {Object} A theme config for the component
 */
function generateComponentTheme(componentKey, themeKey, overrides) {
  const t = themeKey || getDefaultThemeKey()
  const theme = getRegisteredTheme(t)

  let componentTheme = {}
  let cachedComponentTheme = theme[componentKey]

  if (cachedComponentTheme) {
    // use the cached component theme if it exists
    componentTheme = cachedComponentTheme
  } else {
    const variables = {
      borders: {},
      breakpoints: {},
      colors: {},
      forms: {},
      media: {},
      shadows: {},
      spacing: {},
      stacking: {},
      transitions: {},
      typography: {},
      ...mergeWithDefaultThemeVariables(themeKey)
    }

    const componentThemeFunction = getRegisteredComponent(t, componentKey)

    if (typeof componentThemeFunction === 'function') {
      try {
        componentTheme = componentThemeFunction(variables)
      } catch (e) {
        error(false, `[themeable] ${e}`)
      }
    }
  }

  if (isEmpty(overrides)) {
    return (theme[componentKey] = componentTheme)
  } else if (theme.immutable) {
    warn(
      false,
      `[themeable] Theme '${t}' is immutable. Cannot apply overrides for '${componentKey.toString()}': ${JSON.stringify(
        overrides
      )}`
    )
    return componentTheme
  } else if (isEmpty(componentTheme)) {
    return overrides
  } else {
    return { ...componentTheme, ...overrides }
  }
}

function getRegisteredThemes() {
  return getRegistry().themes
}

function mountComponentStyles(template, defaultTheme, componentId) {
  const { styleSheet } = getRegistry()

  if (styleSheet && !styleSheet.mounted(componentId)) {
    const cssText = getCssText(template, defaultTheme, componentId)
    styleSheet.mount(componentId, toRules(cssText))
  }
}

function flushComponentStyles() {
  const { styleSheet } = getRegistry()
  styleSheet && styleSheet.flush()
}

const ThemeRegistry = {
  getRegistry,
  clearRegistry,
  setRegistry,
  generateComponentTheme,
  generateTheme,
  getRegisteredThemes,
  registerComponentTheme,
  registerTheme,
  mountComponentStyles,
  flushComponentStyles
}

export default ThemeRegistry
export {
  ThemeRegistry,
  getRegistry,
  clearRegistry,
  setRegistry,
  generateComponentTheme,
  generateTheme,
  getRegisteredThemes,
  registerComponentTheme,
  registerTheme,
  mountComponentStyles,
  flushComponentStyles
}
