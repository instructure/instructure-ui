import invariant from 'invariant'
import mergeDeep from './util/mergeDeep'

const DEFAULT_REGISTRY = {
  defaultTheme: {
    key: undefined,
    overrides: {}
  },
  generators: {},
  themes: {},
  keys: []
}

const validateRegistry = function (registry) {
  let valid = true
  Object.keys(DEFAULT_REGISTRY).forEach((key) => {
    if (!registry || !registry[key]) {
      valid = false
    }
  })
  return valid ? registry : DEFAULT_REGISTRY
}

// TODO: get rid of this when we drop requirejs/umd support
if (!window.GLOBAL_THEME_REGISTRY) {
  window.GLOBAL_THEME_REGISTRY = DEFAULT_REGISTRY
}

const getRegistry = function () {
  return validateRegistry(window.GLOBAL_THEME_REGISTRY)
}

const getDefaultThemeKey = function () {
  const registry = getRegistry()
  const registered = registry.keys
  const defaultThemeKey = registry.defaultTheme.key

  invariant((registered.length > 0), 'No themes have been registered.')

  return defaultThemeKey || registered[0]
}

const getDefaultTheme = function () {
  const registry = getRegistry()
  const defaultTheme = registry.themes[getDefaultThemeKey()] || {}

  return { ...defaultTheme, ...registry.defaultTheme.overrides }
}

export const setDefaultTheme = function (themeKey, overrides) {
  const registry = getRegistry()

  registry.defaultTheme.key = themeKey
  registry.defaultTheme.overrides = overrides || {}

  return registry
}

export function registerTheme (themeKey, theme, makeDefault) {
  const registry = getRegistry()

  registry.themes[themeKey] = theme

  if (makeDefault) {
    setDefaultTheme(themeKey)
  }

  registry.keys.push(themeKey)
}

/**
 * Merge theme variables for 'themeKey' with the defaults (and overrides)
 *
 * @param {string} themeKey
 * @param {Object} variable overrides
 */
const mergeWithDefaultTheme = function (themeKey, overrides = {}) {
  // fall back to the default theme variables + overrides
  return mergeDeep(getDefaultTheme(), getRegistry().themes[themeKey] || {}, overrides)
}

/**
 * Wraps a generator function to merge its return values with the default theme
 *
 * @param {function} generator
 * @param {string} themeKey
 */
const makeGeneratorFunction = function (generator, themeKey) {
  return function (variables) {
    let theme = {}

    if (generator && typeof generator === 'function') {
      theme = generator(variables)
    }

    // so that the generators for the themeKey can
    // just specify overrides we merge them here
    if (generator[themeKey] && typeof generator[themeKey] === 'function') {
      theme = {...theme, ...generator[themeKey](variables)}
    }

    return theme
  }
}

/**
 * Register a theme generator function
 *
 * @param {Symbol} key The theme key for the component (e.g., [Link.theme])
 * @param {function} generator The function to use for preparing this component's theme
 */
export function registerThemeGenerator (componentKey, generator) {
  const registry = getRegistry()

  if (!generator || typeof generator !== 'function') {
    return
  }

  Object.keys(registry.themes).forEach((themeKey) => {
    if (!registry.generators.hasOwnProperty(themeKey)) {
      registry.generators[themeKey] = {}
    }

    registry.generators[themeKey][componentKey] = makeGeneratorFunction(generator, themeKey)
  })
}

/**
 * Generate all component level theme variables, to be used by `<ApplyTheme />`.
 *
 * @param {String} themeKey The theme to use to generate the variables
 * @param {Object} overrides theme variable overrides (usually for user defined values)
 * @return {Object} A theme config to use with `<ApplyTheme />`
 */
export function generateTheme (themeKey, overrides = {}) {
  const registry = getRegistry()
  const t = themeKey || getDefaultThemeKey()
  let generators = registry.generators[t]

  invariant(generators, `No generators have been registered for theme: '${t}'.`)

  // fall back to the default theme generators
  generators = generators || registry.generators[getDefaultThemeKey()] || {}

  const theme = {}
  const variables = mergeWithDefaultTheme(themeKey, overrides)

  Object.getOwnPropertySymbols(generators).forEach((componentKey) => {
    theme[componentKey] = generators[componentKey](variables)
  })

  return theme
}

/**
 * Generate theme variables for themeKey. (used for documentation)
 *
 * @param {String} themeKey The theme to use to generate the variables
 * @return {Object} A theme config to use with `<ApplyTheme />`
 */
export function getTheme (themeKey) {
  return getRegistry().themes[themeKey] || {}
}

/**
 * Generate theme variables for a component. Used in @themeable
 * If no themeKey is provided, the default theme will be generated.
 *
 * @param {Symbol} key The theme key for the component (e.g., [Link.theme])
 * @param {String} themeKey The theme to use to generate the variables (falls back to the default theme)
 * @param {Object} overrides overrides for theme variables (usually user defined)
 * @return {Object} A theme config for the component
 */
export function generateComponentTheme (componentKey, themeKey, overrides = {}) {
  const registry = getRegistry()
  const t = themeKey || getDefaultThemeKey()
  const variables = mergeWithDefaultTheme(themeKey, overrides)
  const generator = registry.generators[t] && registry.generators[t][componentKey]

  let theme = {}

  if (generator && typeof generator === 'function') {
    theme = generator(variables)
  }

  return theme
}
