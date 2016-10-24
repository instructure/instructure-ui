import Brands from '../theme/brands'

const DEFAULT_BRAND = 'inst'
const GENERATORS = {}

const mergeBrandVariables = function (brand, vars = {}) {
  if (Brands[brand] && brand !== DEFAULT_BRAND) {
    return {...Brands[DEFAULT_BRAND], ...Brands[brand], ...vars}
  } else {
    return {...Brands[DEFAULT_BRAND], ...vars}
  }
}

/**
 * Register a theme generator function
 *
 * @param {Symbol} key The theme key for the component (e.g., Link.theme)
 * @param {function} generator The function to use for preparing this component's theme
 */
export function registerThemeGenerator (key, generator) {
  if (!generator || typeof generator !== 'function') {
    return
  }

  Object.keys(Brands).forEach((brand) => {
    if (!GENERATORS.hasOwnProperty(brand)) {
      GENERATORS[brand] = {}
    }
    GENERATORS[brand][key] = generator[brand] || generator
  })
}

/**
 * Generate theme variables to be used by `<ApplyTheme />`.
 *
 * @param {String} brand The brand to use to generate the variables
 * @param {Object} vars Brand specific theme variables
 * @return {Object} A theme config to use with `<ApplyTheme />`
 */
export function generateTheme (brand = DEFAULT_BRAND, vars = {}) {
  const generators = GENERATORS[brand]
  const theme = {}

  Object.getOwnPropertySymbols(generators).forEach((key) => {
    const generator = generators[key]

    if (generator && typeof generator === 'function') {
      theme[key] = generator(mergeBrandVariables(brand, vars))
    }
  })

  return theme
}

/**
 * Generate branded theme variables for a component.
 *
 * @param {Symbol} key The theme key for the component (e.g., Link.theme)
 * @param {String} brand The brand to use to generate the variables
 * @param {Object} vars Brand specific theme variables
 * @return {Object} A theme config to use with `<ApplyTheme />`
 */
export function generateComponentTheme (key, brand = DEFAULT_BRAND, vars = {}) {
  const generator = GENERATORS[brand][key]
  return (generator && typeof generator === 'function')
    ? generator(mergeBrandVariables(brand, vars)) : undefined
}
