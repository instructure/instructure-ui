export default function ({ colors, typography }) {
  return {
    backgroundColor: colors.colorBackground,
    textColor: colors.colorText,
    fontFamily: typography.fontFamilyBase,
    secondaryTextColor: colors.colorTextSecondary
  }
}
