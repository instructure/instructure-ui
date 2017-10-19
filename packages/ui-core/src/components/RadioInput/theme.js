export default function generator ({ spacing, borders, colors, forms, shadows, typography }) {
  return {
    labelColor: colors.oxford,
    labelFontFamily: typography.fontFamily,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed,

    background: colors.white,
    borderColor: colors.oxford,
    hoverBorderColor: colors.oxford,
    controlSize: '0.1875rem',

    focusBorderColor: colors.brand,
    focusBorderWidth: borders.widthSmall,
    focusBorderStyle: borders.style,

    simpleFacadeSmallSize: '1rem',
    simpleFacadeMediumSize: '1.25rem',
    simpleFacadeLargeSize: '1.75rem',
    simpleCheckedInsetSmall: '0.1875rem',
    simpleCheckedInsetMedium: '0.25rem',
    simpleCheckedInsetLarge: '0.375rem',
    simpleFontSizeSmall: typography.fontSizeSmall,
    simpleFontSizeMedium: typography.fontSizeMedium,
    simpleFontSizeLarge: typography.fontSizeLarge,
    simpleFacadeMarginEnd: spacing.xSmall,

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
    // toggle font is uppercase, so sizes are smaller below
    toggleSmallFontSize: typography.fontSizeXSmall,
    toggleMediumFontSize: typography.fontSizeSmall,
    toggleLargeFontSize: typography.fontSizeMedium
  }
}

generator['canvas-a11y'] = function ({ colors }) {
  return {
    toggleBackgroundOff: colors.oxford
  }
}

generator.canvas = function (variables) {
  return {
    focusBorderColor: variables['ic-brand-primary'],
    borderColor: variables['ic-brand-font-color-dark'],
    hoverBorderColor: variables['ic-brand-font-color-dark'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}
