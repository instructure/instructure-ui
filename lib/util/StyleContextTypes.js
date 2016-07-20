import { PropTypes } from 'react'

const CONTEXTKEY = '@@styleable'

export const StyleContextTypes = {
  [CONTEXTKEY]: PropTypes.shape({
    injectStyle: PropTypes.func
  })
}

export function makeStyleContext ({ injectStyle }) {
  return {[CONTEXTKEY]: { injectStyle }}
}

export function getStyleContext (context) {
  return context ? context[CONTEXTKEY] : undefined
}
