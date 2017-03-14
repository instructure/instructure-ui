import { registerTheme, makeTheme } from '../../themeable/registry'
import KEYS from '../keys'

import borders from './borders'
import colors from './colors'
import typography from './typography'
import spacing from './spacing'
import forms from './forms'
import media from './media'
import breakpoints from './breakpoints'
import shadows from './shadows'
import stacking from './stacking'

const key = KEYS.CANVAS

const variables = {
  borders,
  colors,
  typography,
  spacing,
  forms,
  media,
  breakpoints,
  shadows,
  stacking
}

export const brandVariables = {
  /* Defaults for Canvas account branding variables: */
  'ic-brand-primary': colors.brand,
  'ic-brand-font-color-dark': colors.licorice,

  'ic-link-color': colors.brand,

  'ic-brand-button--primary-bgd': colors.brand,
  'ic-brand-button--primary-text': colors.white,
  'ic-brand-button--secondary-bgd': colors.licorice,
  'ic-brand-button--secondary-text': colors.white
}

const theme = {
  key,
  variables
}

// register the brand variables but don't export them because we don't want canvas-a11y to inherit them
registerTheme({ key, variables: { ...variables, ...brandVariables } })

export default makeTheme({ theme })
