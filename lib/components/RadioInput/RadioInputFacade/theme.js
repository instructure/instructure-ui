export default function generator ({ borders, colors, forms, shadows, typography }) {
  return {
    labelColor: colors.dark,
    labelFontFamily: typography.fontFamily,
    labelFontSize: typography.fontSizeSmall,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed,

    focusOutlineColor: colors.brand,
    focusBorderWidth: borders.widthSmall,
    focusBorderStyle: borders.style,

    background: colors.lightest,
    borderColor: colors.border,
    hoverBorderColor: colors.brand,
    checkedOutlineColor: colors.dark,

    toggleBorderRadius: borders.radiusSmall,
    toggleBorderWidth: borders.widthLarge,
    toggleBackgroundSuccess: colors.success,
    toggleBackgroundOff: colors.medium,
    toggleBackgroundDanger: colors.danger,
    toggleBackgroundWarning: colors.warning,
    toggleHandleText: colors.lightest,
    toggleSmallHeight: forms.inputHeightSmall,
    toggleMediumHeight: forms.inputHeightMedium,
    toggleLargeHeight: forms.inputHeightLarge,
    toggleShadow: shadows.depth1,
    toggleSmallFontSize: typography.fontSizeXSmall,
    toggleMediumFontSize: typography.fontSizeSmall,
    toggleLargeFontSize: typography.fontSizeMedium
  }
}

generator.a11y = function ({ colors }) {
  return {
    toggleBackgroundOff: colors.dark,
    borderColor: colors.dark
  }
}

generator.canvas = function (variables) {
  return {
    hoverBorderColor: variables['ic-brand-primary'],
    focusOutlineColor: variables['ic-brand-primary'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}
