import { alpha } from '../../../util/color'

export default function generator ({ colors, borders, forms, spacing, typography }) {
  return {
    color: colors.lightest,
    background: colors.light,
    borderColor: colors.border,
    borderWidth: borders.widthMedium,
    borderRadius: '4rem',
    marginRight: spacing.medium,
    checkedBackground: colors.success,
    uncheckedIconColor: colors.slate,
    checkedIconColor: colors.success,
    shadowColor: alpha(colors.darkest, 25),
    focusOutlineColor: colors.brand,
    focusBorderWidth: borders.widthSmall,
    focusBorderStyle: borders.style,
    toggleBackground: colors.lightest,
    baseSizeSmall: forms.inputHeightSmall,
    baseSizeMedium: forms.inputHeightMedium,
    baseSizeLarge: forms.inputHeightLarge,
    labelColor: colors.dark,
    labelFontFamily: typography.fontFamily,
    labelFontSize: typography.fontSizeMedium,
    labelFontWeight: typography.fontWeightNormal,
    labelLineHeight: typography.lineHeightCondensed
  }
}

generator['canvas-a11y'] = generator['modern-a11y'] = generator.a11y = function ({ colors }) {
  return {
    uncheckedIconColor: colors.dark,
    background: colors.dark,
    borderColor: colors.dark
  }
}

generator.canvas = function (variables) {
  return {
    focusOutlineColor: variables['ic-brand-primary'],
    labelColor: variables['ic-brand-font-color-dark']
  }
}
