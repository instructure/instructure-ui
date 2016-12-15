import invariant from 'invariant'
import mergeDeep from './util/mergeDeep'

let DEFAULT_THEME_KEY
let DEFAULT_THEME_OVERRIDES = {}

const GENERATORS = {}
const THEMES = {}
const REGISTERED = []

const getDefaultThemeKey = function () {
  invariant((REGISTERED.length > 0), 'No themes have been registered.')

  return DEFAULT_THEME_KEY || REGISTERED[0]
}

const getDefaultTheme = function () {
  const defaultTheme = THEMES[getDefaultThemeKey()] || {}
  return { ...defaultTheme, ...DEFAULT_THEME_OVERRIDES }
}

export const setDefaultTheme = function (themeKey, overrides) {
  DEFAULT_THEME_KEY = themeKey
  DEFAULT_THEME_OVERRIDES = overrides || {}
}

export function registerTheme (themeKey, theme, makeDefault) {
  THEMES[themeKey] = theme

  if (makeDefault) {
    setDefaultTheme(themeKey)
  }

  REGISTERED.push(themeKey)
}

/**
 * Merge theme variables for 'themeKey' with the defaults (and overrides)
 *
 * @param {string} themeKey
 * @param {Object} variable overrides
 */
const mergeWithDefaultTheme = function (themeKey, overrides = {}) {
  // fall back to the default theme variables + overrides
  return mergeDeep(getDefaultTheme(), THEMES[themeKey] || {}, overrides)
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
  if (!generator || typeof generator !== 'function') {
    return
  }

  Object.keys(THEMES).forEach((themeKey) => {
    if (!GENERATORS.hasOwnProperty(themeKey)) {
      GENERATORS[themeKey] = {}
    }

    GENERATORS[themeKey][componentKey] = makeGeneratorFunction(generator, themeKey)
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
  const t = themeKey || getDefaultThemeKey()
  let generators = GENERATORS[t]

  invariant(generators, `No generators have been registered for theme: '${t}'.`)

  // fall back to the default theme generators
  generators = generators || GENERATORS[getDefaultThemeKey()] || {}

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
  return mergeWithDefaultTheme(themeKey)
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
  const t = themeKey || getDefaultThemeKey()
  const variables = mergeWithDefaultTheme(themeKey, overrides)
  const generator = GENERATORS[t] && GENERATORS[t][componentKey]

  let theme = {}

  if (generator && typeof generator === 'function') {
    theme = generator(variables)
  }

  return theme
}
