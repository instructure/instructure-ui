import { darken } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ borders, colors, forms, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    heightSmall: '1.3125rem', // matches Pill component height
    heightMedium: forms.inputHeightSmall,
    heightLarge: forms.inputHeightMedium,
    fontSizeSmall: typography.fontSizeXSmall,
    fontSizeMedium: typography.fontSizeSmall,
    fontSizeLarge: typography.fontSizeMedium,
    background: colors.porcelain,
    backgroundHover: darken(colors.porcelain, 5),
    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderColor: colors.tiara,
    borderRadius: '999rem',
    textColor: colors.licorice,
    padding: `0 ${spacing.small}`,
    paddingSmall: `0 ${spacing.xSmall}`,
    focusOutlineColor: colors.brand,
    maxWidth: '10rem',
    iconMargin: spacing.xxSmall,
    iconColor: colors.licorice,
    iconHoverColor: colors.brand,
    transitionTiming: '0.2s'
  }
}

generator['canvas-a11y'] = function ({ colors }) {
  return {
    background: colors.white,
    borderColor: colors.licorice
  }
}

generator.canvas = function (variables) {
  return {
    focusOutlineColor: variables['ic-brand-primary'],
    iconColor: variables['ic-brand-font-color-dark'],
    iconHoverColor: variables['ic-brand-primary'],
    textColor: variables['ic-brand-font-color-dark']
  }
}
