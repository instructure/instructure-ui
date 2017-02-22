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
import stacking from './stacking'

const theme = {
  borders,
  colors,
  typography,
  spacing,
  forms,
  media,
  breakpoints,
  shadows,
  stacking,

  /* Begin defaults for Canvas account branding variables: */
  'ic-brand-primary': colors.brand,
  'ic-brand-font-color-dark': colors.licorice,

  'ic-link-color': colors.brand,

  'ic-brand-button--primary-bgd': colors.brand,
  'ic-brand-button--primary-text': colors.white,
  'ic-brand-button--secondary-bgd': colors.licorice,
  'ic-brand-button--secondary-text': colors.white
}

registerTheme('canvas', theme)
registerTheme('canvas-a11y', { ...theme, ...a11y })
registerTheme('a11y', { ...theme, ...a11y }) // TODO: remove this

export default theme
