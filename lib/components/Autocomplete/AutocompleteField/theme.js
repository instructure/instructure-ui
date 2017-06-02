import { alpha, darken } from '../../../util/color'

export default function generator ({ colors, typography, borders, spacing, stacking, forms }) {
  return {
    listZIndex: stacking.topmost,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,

    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderColor: colors.tiara,
    borderRadius: borders.radiusMedium,

    color: colors.oxford,
    labelColor: colors.oxford,
    iconColor: colors.oxford,
    background: colors.white,

    highlightedBackground: colors.brand,
    activeBackground: darken(colors.brand, 10),
    activeLabelColor: colors.white,

    inputPadding: spacing.small,
    padding: `${spacing.xSmall} ${spacing.small}`,

    focusBorderColor: colors.brand,
    focusOutlineColor: alpha(colors.brand, 50),

    errorBorderColor: colors.crimson,
    errorOutlineColor: alpha(colors.crimson, 50),

    placeholderColor: colors.slate,

    smallFontSize: typography.fontSizeXSmall,
    smallHeight: forms.inputHeightSmall,

    mediumFontSize: typography.fontSizeSmall,
    mediumHeight: forms.inputHeightMedium,

    largeFontSize: typography.fontSizeMedium,
    largeHeight: forms.inputHeightLarge
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    focusBorderColor: variables['ic-brand-primary'],
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50),
    labelColor: variables['ic-brand-font-color-dark'],
    activeBackground: darken(variables['ic-brand-primary'], 10),
    highlightedBackground: variables['ic-brand-primary']
  }
}

generator['canvas-a11y'] = generator['modern-a11y'] = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    focusBorderColor: variables['ic-brand-primary'],
    focusOutlineColor: alpha(variables['ic-brand-primary'], 50),
    labelColor: variables['ic-brand-font-color-dark'],
    activeBackground: darken(variables['ic-brand-primary'], 20),
    highlightedBackground: darken(variables['ic-brand-primary'], 10)
  }
}
