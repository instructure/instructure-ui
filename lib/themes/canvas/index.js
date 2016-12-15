import { registerTheme } from '../../themeable/registry'

import borders from './borders'
import colors from './colors'
import a11y from './a11y'
import typography from './typography'
import spacing from './spacing'
import forms from './forms'
import media from './media'
import breakpoints from './breakpoints'
import shadows from './shadows'

const theme = {
  borders,
  colors,
  typography,
  spacing,
  forms,
  media,
  breakpoints,
  shadows,

  /* Begin Canvas account branding variables: */
  'ic-brand-primary': colors.brand,
  'ic-brand-font-color-dark': colors.darkest,

  'ic-link-color': colors.brand,

  'ic-brand-button--primary-bgd': colors.brand,
  'ic-brand-button--primary-text': colors.lightest,
  'ic-brand-button--secondary-bgd': colors.darkest,
  'ic-brand-button--secondary-text': colors.lightest
}

registerTheme('canvas', theme)
registerTheme('canvas-a11y', { ...theme, ...a11y })
registerTheme('a11y', { ...theme, ...a11y }) // deprecated

export default theme
