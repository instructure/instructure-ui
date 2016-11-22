import invariant from 'invariant'
import mergeDeep from './mergeDeep'
import Themes from '../themes'

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

class ThemeManager {
  constructor (themes, defaultTheme) {
    this._DEFAULT_THEME = defaultTheme || 'canvas'
    this._GENERATORS = {}
    this._THEMES = themes || Themes
  }

  mergeThemeVariables (themeKey, overrides = {}) {
    const { _THEMES, _DEFAULT_THEME } = this

    // fall back to the default theme variables
    return mergeDeep(
      _THEMES[_DEFAULT_THEME],
      (_THEMES[themeKey] || {}),
      overrides
    )
  }

  /**
   * Register a theme generator function
   *
   * @param {Symbol} key The theme key for the component (e.g., [Link.theme])
   * @param {function} generator The function to use for preparing this component's theme
   */
  registerThemeGenerator (componentKey, generator) {
    const { _THEMES, _GENERATORS } = this

    if (!generator || typeof generator !== 'function') {
      return
    }

    Object.keys(_THEMES).forEach((themeKey) => {
      if (!_GENERATORS.hasOwnProperty(themeKey)) {
        _GENERATORS[themeKey] = {}
      }

      _GENERATORS[themeKey][componentKey] = makeGeneratorFunction(generator, themeKey)
    })
  }

  /**
   * Generate theme variables to be used by `<ApplyTheme />`.
   *
   * @param {String} themeKey The theme to use to generate the variables
   * @param {Object} overrides theme variable overrides (usually for user defined values)
   * @return {Object} A theme config to use with `<ApplyTheme />`
   */
  generateTheme = (themeKey, overrides = {}) => {
    const { _GENERATORS, _DEFAULT_THEME } = this
    const t = themeKey || _DEFAULT_THEME
    let generators

    if (typeof t === 'string') {
      generators = _GENERATORS[t]
      invariant(generators, `No generators have been registered for theme: '${t}'.`)
    }

    // fall back to the default theme generators
    generators = generators || _GENERATORS[_DEFAULT_THEME]

    const theme = {}

    Object.getOwnPropertySymbols(generators).forEach((componentKey) => {
      theme[componentKey] = generators[componentKey](this.mergeThemeVariables(t, overrides))
    })

    return theme
  }

  getTheme = (themeKey) => {
    const { _THEMES, _DEFAULT_THEME } = this
    return mergeDeep(_THEMES[_DEFAULT_THEME], _THEMES[themeKey] || {})
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
  generateComponentTheme (componentKey, themeKey, overrides = {}) {
    const { _GENERATORS, _DEFAULT_THEME } = this
    const t = themeKey || _DEFAULT_THEME
    const variables = this.mergeThemeVariables(t, overrides)
    const generator = _GENERATORS[t] && _GENERATORS[t][componentKey]

    let theme = {}

    if (generator && typeof generator === 'function') {
      theme = generator(variables)
    }

    return theme
  }
}

export default ThemeManager
