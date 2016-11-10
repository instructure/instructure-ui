import invariant from 'invariant'
import mergeDeep from './mergeDeep'

const makeGeneratorFunction = function (generator, brand) {
  return function (variables) {
    let theme = {}

    if (generator && typeof generator === 'function') {
      theme = generator(variables)
    }

    // so that the brand specific generators for each component can
    // just specify overrides we merge them here
    if (generator[brand] && typeof generator[brand] === 'function') {
      theme = {...theme, ...generator[brand](variables)}
    }

    return theme
  }
}

export default class ThemeManager {
  constructor (brands = {}, defaultBrand = 'canvas') {
    this._DEFAULT_BRAND = defaultBrand
    this._GENERATORS = {}
    this._BRANDS = brands
  }

  mergeBrandVariables (brand, vars = {}) {
    const { _BRANDS, _DEFAULT_BRAND } = this

    // fall back to the default brand variables
    return mergeDeep(
      _BRANDS[_DEFAULT_BRAND],
      (_BRANDS[brand] || {}),
      vars
    )
  }

  /**
   * Register a theme generator function
   *
   * @param {Symbol} key The theme key for the component (e.g., Link.theme)
   * @param {function} generator The function to use for preparing this component's theme
   */
  registerThemeGenerator (key, generator) {
    const { _BRANDS, _GENERATORS } = this

    if (!generator || typeof generator !== 'function') {
      return
    }

    Object.keys(_BRANDS).forEach((brand) => {
      if (!_GENERATORS.hasOwnProperty(brand)) {
        _GENERATORS[brand] = {}
      }

      _GENERATORS[brand][key] = makeGeneratorFunction(generator, brand)
    })
  }

  /**
   * Generate theme variables to be used by `<ApplyTheme />`.
   *
   * @param {String} brand The brand to use to generate the variables
   * @param {Object} vars Brand specific theme variables (usually for user defined values)
   * @return {Object} A theme config to use with `<ApplyTheme />`
   */
  generateTheme = (brand, vars = {}) => {
    const { _GENERATORS, _DEFAULT_BRAND } = this
    const b = brand || _DEFAULT_BRAND
    let generators

    if (typeof b === 'string') {
      generators = _GENERATORS[b]
      invariant(generators, `No theme generators have been registered for brand: '${b}'.`)
    }

    // fall back to the default brand generators
    generators = generators || _GENERATORS[_DEFAULT_BRAND]

    const theme = {}

    Object.getOwnPropertySymbols(generators).forEach((key) => {
      theme[key] = generators[key](this.mergeBrandVariables(b, vars))
    })

    return theme
  }

  /**
   * Generate branded theme variables for a component.
   * If no brand is provided, the default theme will be generated.
   *
   * @param {Symbol} key The theme key for the component (e.g., Link.theme)
   * @param {String} brand The brand to use to generate the variables
   * @param {Object} vars Brand specific theme variables
   * @return {Object} A theme config to use with `<ApplyTheme />`
   */
  generateComponentTheme (key, brand, vars = {}) {
    const { _GENERATORS, _DEFAULT_BRAND } = this
    const b = brand || _DEFAULT_BRAND
    const variables = this.mergeBrandVariables(b, vars)
    const generator = _GENERATORS[b] && _GENERATORS[b][key]

    let theme = {}

    if (generator && typeof generator === 'function') {
      theme = generator(variables)
    }

    return theme
  }
}
