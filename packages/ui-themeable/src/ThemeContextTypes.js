/**
 * ---
 * category: utilities/themes
 * ---
 * @module ThemeContextTypes
 */
import PropTypes from 'prop-types'

const CONTEXT_KEY = '@@themeable'

/**
 * React context types for [themeable](#themeable) components and
 * the [ApplyTheme](#ApplyTheme) component.
 */
export const ThemeContextTypes = {
  [CONTEXT_KEY]: PropTypes.object
}

/**
 * create theme context
 * @param {Object} theme an object containing [themeable](#themeable) component themes
 * @param {Boolean} immutable prevent theme overrides?
 */
export function makeThemeContext (theme, immutable) {
  return {[CONTEXT_KEY]: {
    theme,
    immutable
  }}
}

/**
 * get a theme context
 * @param {ReactContext} context React context object
 */
export function getThemeContext (context) {
  return context ? context[CONTEXT_KEY] : undefined
}
