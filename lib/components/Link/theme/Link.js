export default function ({ colors, typography }) {
  return {
    textColor: colors.colorBrand,
    textDecoration: 'none',
    textDecorationHover: 'underline',
    fontFamily: typography.fontFamilyBase,

    menuItemTextDecoration: 'none',
    menuItemBackground: colors.colorBackground,
    menuItemTextColor: colors.colorText,
    menuItemBackgroundHover: colors.colorFocus,
    menuItemTextColorHover: colors.colorTextInverse,
    menuItemTextDecorationHover: 'none'

  }
}
