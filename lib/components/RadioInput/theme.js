export default function generator ({ spacing, borders, colors, forms, shadows, typography }) {
  return {
    labelColor: colors.oxford,
    labelFontFamily: typography.fontFamily,
    labelFontSize: typography.fontSizeSmall,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed,

    background: colors.white,
    borderColor: colors.oxford,
    hoverBorderColor: colors.oxford,

    focusBorderColor: colors.brand,
    focusBorderWidth: borders.widthSmall,
    focusBorderStyle: borders.style,

    toggleBorderRadius: borders.radiusSmall,
    toggleBorderWidth: borders.widthLarge,
    toggleBackgroundSuccess: colors.shamrock,
    toggleBackgroundOff: colors.slate,
    toggleBackgroundDanger: colors.crimson,
    toggleBackgroundWarning: colors.fire,
    toggleHandleText: colors.white,
    toggleSmallHeight: forms.inputHeightSmall,
    toggleMediumHeight: forms.inputHeightMedium,
    toggleLargeHeight: forms.inputHeightLarge,
    toggleShadow: shadows.depth1,
    toggleSmallFontSize: typography.fontSizeXSmall,
    toggleMediumFontSize: typography.fontSizeSmall,
    toggleLargeFontSize: typography.fontSizeMedium
  }
}

generator['canvas-a11y'] = generator['modern-a11y'] = generator.a11y = function ({ colors }) {
  return {
    toggleBackgroundOff: colors.oxford,
    borderColor: colors.oxford
  }
}

generator.canvas = function (variables) {
  return {
    focusBorderColor: variables['ic-brand-primary'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}

generator.modern = function ({ colors }) {
  return {
    borderColor: colors.brand,
    focusBorderColor: colors.brand,
    hoverBorderColor: colors.brand
  }
}
