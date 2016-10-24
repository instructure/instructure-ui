import { PropTypes } from 'react'

const CONTEXT_KEY = '@@themeable'

export const ThemeContextTypes = {
  [CONTEXT_KEY]: PropTypes.object
}

export function makeThemeContext (theme) {
  return {[CONTEXT_KEY]: {
    theme
  }}
}

export function getThemeContext (context) {
  return context ? context[CONTEXT_KEY] : undefined
}

