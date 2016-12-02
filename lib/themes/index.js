import a11y from './a11y'
import canvas from './canvas'
import modern from './modern'

import invariant from 'invariant'
import mergeDeep from '../util/mergeDeep'

const DEFAULT_THEME_KEY = 'canvas'
const GENERATORS = {}

const THEMES = {
  a11y,
  canvas,
  modern
}

let DEFAULT_THEME_OVERRIDE

export function getDefaultTheme () {
  return DEFAULT_THEME_OVERRIDE || THEMES[DEFAULT_THEME_KEY] || {}
}

export function setDefaultTheme (theme) {
  invariant(!DEFAULT_THEME_OVERRIDE, 'The default theme should be set only once before mounting the application.')
  DEFAULT_THEME_OVERRIDE = theme
}

export function addTheme (themeKey, theme) {
  THEMES[themeKey] = theme
}

/**
 * Merge theme variables for 'themeKey' with the defaults (and overrides)
 *
 * @param {string} themeKey
 * @param {Object} variable overrides
 */
export function mergeThemeVariables (themeKey, overrides = {}) {
  // fall back to the default theme variables
  return mergeDeep(
    THEMES[DEFAULT_THEME_KEY],
    (THEMES[themeKey] || {}),
    overrides
  )
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
 * Generate theme variables to be used by `<ApplyTheme />`.
 *
 * @param {String} themeKey The theme to use to generate the variables
 * @param {Object} overrides theme variable overrides (usually for user defined values)
 * @return {Object} A theme config to use with `<ApplyTheme />`
 */
export function generateTheme (themeKey, overrides = {}) {
  const t = themeKey || DEFAULT_THEME_KEY
  let generators

  if (typeof t === 'string') {
    generators = GENERATORS[t]
    invariant(generators, `No generators have been registered for theme: '${t}'.`)
  }

  // fall back to the default theme generators
  generators = generators || GENERATORS[DEFAULT_THEME_KEY]

  const theme = {}

  Object.getOwnPropertySymbols(generators).forEach((componentKey) => {
    theme[componentKey] = generators[componentKey](mergeThemeVariables(t, overrides))
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
  return mergeDeep(THEMES[DEFAULT_THEME_KEY], THEMES[themeKey] || {})
}

/**
 * Generate theme variables for all keys. (used for documentation)
 *
 * @return {Object} A theme config to use with `<ApplyTheme />`
 */
export function getThemes () {
  const themes = {}

  Object.keys(THEMES).forEach(function (key) {
    themes[key] = getTheme(key)
  })

  return themes
}

/**
 * Generate theme variables for a component.
 * If no themeKey is provided, the default theme will be generated.
 *
 * @param {Symbol} key The theme key for the component (e.g., [Link.theme])
 * @param {String} themeKey The theme to use to generate the variables
 * @param {Object} overrides overrides for theme variables (usually user defined)
 * @return {Object} A theme config for the component
 */
export function generateComponentTheme (componentKey, themeKey, overrides = {}) {
  const t = themeKey || DEFAULT_THEME_KEY
  const variables = mergeThemeVariables(t, overrides)
  const generator = GENERATORS[t] && GENERATORS[t][componentKey]

  let theme = {}

  if (generator && typeof generator === 'function') {
    theme = generator(variables)
  }

  return theme
}
