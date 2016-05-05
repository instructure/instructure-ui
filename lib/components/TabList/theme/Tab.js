import Color from 'color'

export default function ({ colors, typography, spacing }) {
  return {
    fontSize: typography.fontSizeSmall,
    fontFamily: typography.fontFamilyBase,
    spacingExtraSmall: spacing.spacingExtraSmall,
    spacingSmall: spacing.spacingSmall,

    simpleTextColor: colors.colorBrand,
    simpleTextDecoration: 'none',
    simpleTextDecorationFocused: 'underline',
    simpleBackgroundColorSelected: colors.colorBackground,
    simpleBorderColorSelected: colors.colorNeutralMedium,
    simpleTextColorSelected: colors.colorText,

    minimalTextColor: colors.colorText,
    minimalTextDecoration: 'none',
    minimalBorderColorHover: colors.colorNeutralAccent,
    minimalBorderColorSelected: colors.colorBrandAccent,
    minimalTextDecorationFocused: 'underline',

    accordionTextColor: colors.colorText,
    accordionBackgroundColor: colors.colorNeutralInverse,
    accordionBorderColor: darken(colors.colorNeutralInverse, 0.2),
    accordionBackgroundColorHover: darken(colors.colorNeutralInverse, 0.1),
    accordionBorderColorSelected: colors.colorNeutral,
    accordionTextColorSelected: colors.colorTextInverse,
    accordionBackgroundColorSelected: colors.colorNeutral,
    accordionBorderColorFocused: colors.colorFocusInverse
  }
}

function darken (color, percent) {
  return Color(color).darken(percent).hexString()
}
